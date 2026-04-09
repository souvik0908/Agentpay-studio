from pydantic import BaseModel


class KiteConnectionStatus(BaseModel):
    connected: bool
    mcp_url: str
    session_status: str
    wallet_address: str | None = None
