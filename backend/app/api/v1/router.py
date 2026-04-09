from fastapi import APIRouter
from app.api.v1.endpoints import agents, kite, ledger, tasks

api_router = APIRouter()
api_router.include_router(agents.router)
api_router.include_router(kite.router)
api_router.include_router(ledger.router)
api_router.include_router(tasks.router)
