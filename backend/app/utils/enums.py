from enum import Enum


class AgentStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"


class TaskStatus(str, Enum):
    PENDING = "pending"
    REQUIRES_PAYMENT = "requires_payment"
    PAID = "paid"
    SUCCESS = "success"
    FAILED = "failed"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    BLOCKED = "blocked"
