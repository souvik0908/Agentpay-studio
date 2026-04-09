from pydantic import BaseModel, Field
from app.utils.enums import AgentStatus


class AgentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    daily_budget: float = Field(..., gt=0)
    max_spend_per_action: float = Field(..., gt=0)
    allowed_providers: list[str] = Field(default_factory=list)
    max_paid_actions_per_minute: int = Field(default=5, ge=1)
    kill_switch: bool = False


class AgentResponse(AgentCreate):
    id: str
    status: AgentStatus
