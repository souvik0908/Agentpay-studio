from uuid import uuid4

from app.integrations.mcp.client import KiteMCPClient
from app.integrations.x402.client import X402Client
from app.schemas.task import ExecutionStep, TaskRunRequest, TaskRunResponse
from app.services.agent_service import AgentService
from app.services.ledger_service import LedgerService
from app.utils.enums import PaymentStatus, TaskStatus


class TaskService:
    def __init__(self) -> None:
        self.mcp = KiteMCPClient()
        self.x402 = X402Client()

    async def run_task(self, payload: TaskRunRequest) -> TaskRunResponse:
        agent = AgentService.get_agent(payload.agent_id)
        if not agent:
            raise ValueError("Agent not found")

        task_id = str(uuid4())
        provider = "Weather API"
        estimated_cost = "1.0 Test USDT"

        steps: list[ExecutionStep] = [
            ExecutionStep(
                title="Task received",
                description=payload.prompt,
                state="done",
            ),
            ExecutionStep(
                title="Provider selected",
                description=f"{provider} selected based on allowed provider policy.",
                state="done",
            ),
            ExecutionStep(
                title="Initial service call",
                description="Service called without payment header to inspect requirements.",
                state="done",
            ),
        ]

        first_attempt = await self.x402.call_paid_service(location=payload.location)

        if first_attempt["status_code"] != 402:
            return TaskRunResponse(
                task_id=task_id,
                status=TaskStatus.SUCCESS,
                estimated_cost=estimated_cost,
                provider=provider,
                steps=steps,
                result=first_attempt.get("data"),
            )

        payment_info = first_attempt["payment_info"]

        payer = await self.mcp.get_payer_addr()
        steps.append(
            ExecutionStep(
                title="Fetched payer address",
                description=f"AA wallet: {payer['payer_addr']}",
                state="done",
            )
        )

        auth = await self.mcp.approve_payment(
            payer_addr=payer["payer_addr"],
            payee_addr=payment_info["payee_addr"],
            amount=payment_info["amount"],
            token_type=payment_info["token_type"],
            merchant_name=payment_info["merchant_name"],
        )
        steps.append(
            ExecutionStep(
                title="Payment approved",
                description="Signed X-Payment payload generated through Kite MCP stub.",
                state="done",
            )
        )

        second_attempt = await self.x402.call_paid_service(
            location=payload.location,
            x_payment=auth["x_payment"],
        )

        if second_attempt["status_code"] == 200:
            LedgerService.add_payment(
                agent_id=agent.id,
                task_id=task_id,
                provider=provider,
                amount=estimated_cost,
                status=PaymentStatus.SUCCESS,
                receipt_ref=f"rcpt_{task_id[:8]}",
            )
            steps.append(
                ExecutionStep(
                    title="Service delivered",
                    description="Paid service returned a successful result.",
                    state="done",
                )
            )
            return TaskRunResponse(
                task_id=task_id,
                status=TaskStatus.SUCCESS,
                estimated_cost=estimated_cost,
                provider=provider,
                steps=steps,
                result=second_attempt["data"],
            )

        LedgerService.add_payment(
            agent_id=agent.id,
            task_id=task_id,
            provider=provider,
            amount=estimated_cost,
            status=PaymentStatus.FAILED,
            receipt_ref=f"failed_{task_id[:8]}",
        )
        steps.append(
            ExecutionStep(
                title="Payment failed",
                description="Service did not return a valid response after payment.",
                state="failed",
            )
        )

        return TaskRunResponse(
            task_id=task_id,
            status=TaskStatus.FAILED,
            estimated_cost=estimated_cost,
            provider=provider,
            steps=steps,
            result=None,
        )
