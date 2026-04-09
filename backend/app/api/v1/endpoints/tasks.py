from fastapi import APIRouter, HTTPException
from app.schemas.task import TaskRunRequest, TaskRunResponse
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/run", response_model=TaskRunResponse)
async def run_task(payload: TaskRunRequest) -> TaskRunResponse:
    try:
        service = TaskService()
        return await service.run_task(payload)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
