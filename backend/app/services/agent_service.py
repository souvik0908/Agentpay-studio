from uuid import uuid4
from app.schemas.agent import AgentCreate, AgentResponse
from app.utils.enums import AgentStatus

AGENTS: dict[str, AgentResponse] = {}


class AgentService:
    @staticmethod
    def list_agents() -> list[AgentResponse]:
        return list(AGENTS.values())

    @staticmethod
    def create_agent(payload: AgentCreate) -> AgentResponse:
        agent = AgentResponse(
            id=str(uuid4()),
            status=AgentStatus.ACTIVE,
            **payload.model_dump(),
        )
        AGENTS[agent.id] = agent
        return agent

    @staticmethod
    def get_agent(agent_id: str) -> AgentResponse | None:
        return AGENTS.get(agent_id)
