from pydantic import BaseModel
from app.utils.enums import PaymentStatus


class PaymentRecord(BaseModel):
    id: str
    agent_id: str
    task_id: str
    provider: str
    amount: str
    status: PaymentStatus
    receipt_ref: str
