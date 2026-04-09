from fastapi import APIRouter
from app.schemas.agent import AgentCreate, AgentResponse
from app.services.agent_service import AgentService

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("", response_model=list[AgentResponse])
def list_agents() -> list[AgentResponse]:
    return AgentService.list_agents()


@router.post("", response_model=AgentResponse)
def create_agent(payload: AgentCreate) -> AgentResponse:
    return AgentService.create_agent(payload)
