from fastapi import APIRouter
from app.schemas.payment import PaymentRecord
from app.services.ledger_service import LedgerService

router = APIRouter(prefix="/ledger", tags=["ledger"])


@router.get("", response_model=list[PaymentRecord])
def list_ledger() -> list[PaymentRecord]:
    return LedgerService.list_payments()
