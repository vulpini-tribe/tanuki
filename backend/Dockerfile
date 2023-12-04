# build stage
FROM rust:1.71-bullseye as builder
WORKDIR /tanuki
COPY . /tanuki
RUN rustup default stable
RUN cargo build --release

# Prod stage
FROM debian:bullseye-slim
COPY ./migrations ./migrations
COPY ./.env .
RUN apt-get update && apt-get -y install ca-certificates libssl-dev && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install libpq5 -y
COPY --from=builder /tanuki/target/release/tanuki /usr/bin
CMD ["tanuki"]