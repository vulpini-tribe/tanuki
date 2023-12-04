use env_logger::Env;
use std::io::Write;

pub fn init_logger() -> () {
    std::env::set_var("RUST_BACKTRACE", "0");

    env_logger::Builder::from_env(Env::default().default_filter_or("info"))
        .format(|buf, record| {
            writeln!(
                buf,
                "{} [{}] [thread:{:?}] -> {}",
                chrono::Local::now().format("%d %b %y %H:%M:%S"),
                record.level(),
                std::thread::current().id(),
                record.args()
            )
        })
        .init();
}
