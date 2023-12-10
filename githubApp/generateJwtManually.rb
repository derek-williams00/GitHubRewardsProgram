require "openssl"
require "jwt"  # https://rubygems.org/gems/jwt

# Private key contents
private_pem = File.read("./gitrewardsprogram.2023-12-09.private-key.pem")
private_key = OpenSSL::PKey::RSA.new(private_pem)

# Generate the JWT
payload = {
  # issued at time, 60 seconds in the past to allow for clock drift
  iat: Time.now.to_i - 60,
  # JWT expiration time (10 minute maximum)
  exp: Time.now.to_i + (10 * 60),
  # GitHub App's identifier
  iss: "689240",
}

jwt = JWT.encode(payload, private_key, "RS256")
puts jwt
