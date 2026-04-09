from fastapi import APIRouter
from app.core.config import settings
from app.schemas.kite import KiteConnectionStatus

router = APIRouter(prefix="/kite", tags=["kite"])


@router.get("/status", response_model=KiteConnectionStatus)
def kite_status() -> KiteConnectionStatus:
    return KiteConnectionStatus(
        connected=False,
        mcp_url=settings.kite_mcp_url,
        session_status="not_connected",
        wallet_address=None,
    )
