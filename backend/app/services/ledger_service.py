from uuid import uuid4
from app.schemas.payment import PaymentRecord
from app.utils.enums import PaymentStatus

LEDGER: list[PaymentRecord] = []


class LedgerService:
    @staticmethod
    def list_payments() -> list[PaymentRecord]:
        return LEDGER

    @staticmethod
    def add_payment(
        agent_id: str,
        task_id: str,
        provider: str,
        amount: str,
        status: PaymentStatus,
        receipt_ref: str,
    ) -> PaymentRecord:
        payment = PaymentRecord(
            id=str(uuid4()),
            agent_id=agent_id,
            task_id=task_id,
            provider=provider,
            amount=amount,
            status=status,
            receipt_ref=receipt_ref,
        )
        LEDGER.append(payment)
        return payment
