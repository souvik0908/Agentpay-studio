from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AgentPay Studio API"
    app_env: str = "development"
    api_v1_prefix: str = "/api/v1"
    frontend_url: str = "http://localhost:3000"
    kite_mcp_url: str = "https://neo.dev.gokite.ai/v1/mcp"
    x402_demo_service_url: str = "https://x402.dev.gokite.ai/api/weather"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
