use lettre::transport::smtp::authentication::Credentials;
use lettre::{AsyncSmtpTransport, AsyncTransport, Tokio1Executor};
use minijinja::Environment;
use r2d2_redis::RedisConnectionManager;

pub async fn send_email(
    subject: String,
    name: String,
    email_to: String,
    template_name: String,

    user_id: uuid::Uuid,
    redis: r2d2::Pool<RedisConnectionManager>,
) -> Result<(), String> {
    let web_address: String = "https://app.tanuki.health".to_string();

    let mut env = Environment::new();
    let verification_email_template = include_str!("../templates/verification_email.html");
    env.add_template("verification_email", verification_email_template)
        .unwrap();

    let envs = crate::service::env::EnvConfig::new();

    let to = format!("{} <{}>", name, email_to);

    let issued_token =
        match crate::utils::auth::tokens::issue_confirmation_token_paseto(user_id, redis, None)
            .await
        {
            Ok(t) => t,
            Err(e) => {
                tracing::event!(target: "backend", tracing::Level::ERROR, "{}", e);
                return Err(format!("{}", e));
            }
        };

    let confirmation_link = {
        if template_name == "password_reset_email.html" {
            format!(
                "{}/auth/change-password?token={}",
                web_address, issued_token,
            )
        } else {
            format!("{}/auth/validate?token={}", web_address, issued_token,)
        }
    };

    let template = env.get_template("verification_email").unwrap();
    let current_date_time = chrono::Local::now();
    let dt = current_date_time + chrono::Duration::minutes(envs.token_expiration);
    let ctx = minijinja::context! {
        title => &subject,
        confirmation_link => &confirmation_link,
        domain => &web_address,
        expiration_time => &envs.token_expiration,
        exact_time => &dt.format("%A %B %d, %Y at %r").to_string()
    };
    let html_text = template.render(ctx).unwrap();

    let text_content: String = format!(
        r#"
        Tap the link below to confirm your email address.
        {}
        "#,
        format!("{}", confirmation_link)
    );

    let email = lettre::Message::builder()
        .from(envs.email_from.clone().parse().unwrap())
        .to(to.parse().unwrap())
        .subject(subject)
        .multipart(
            lettre::message::MultiPart::alternative()
                .singlepart(
                    lettre::message::SinglePart::builder()
                        .content_type(lettre::message::header::ContentType::TEXT_PLAIN)
                        .body(text_content),
                )
                .singlepart(
                    lettre::message::SinglePart::builder()
                        .content_type(lettre::message::header::ContentType::TEXT_HTML)
                        .body(html_text),
                ),
        )
        .unwrap();

    // assign credentials
    let smtp_creds = Credentials::new(envs.smtp.username.clone(), envs.smtp.token.clone());
    // create mailer
    let mailer: AsyncSmtpTransport<Tokio1Executor> =
        AsyncSmtpTransport::<Tokio1Executor>::relay(&envs.smtp.server)
            .unwrap()
            .credentials(smtp_creds)
            .build();

    // Send the email
    match mailer.send(email).await {
        Ok(_) => {
            let success_msg = format!("Email sent to {}", email_to);
            tracing::event!(target: "backend", tracing::Level::INFO, success_msg);

            Ok(())
        }

        Err(e) => {
            let fail_msg = format!("Could not send email: {:#?}", e);
            tracing::event!(target: "backend", tracing::Level::ERROR, fail_msg);

            Err(fail_msg)
        }
    }
}
