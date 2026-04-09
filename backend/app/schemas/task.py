from pydantic import BaseModel, Field
from app.utils.enums import TaskStatus


class TaskRunRequest(BaseModel):
    agent_id: str
    prompt: str = Field(..., min_length=5, max_length=2000)
    location: str = "San Francisco"


class ExecutionStep(BaseModel):
    title: str
    description: str
    state: str


class TaskRunResponse(BaseModel):
    task_id: str
    status: TaskStatus
    estimated_cost: str
    provider: str
    steps: list[ExecutionStep]
    result: dict | None = None
