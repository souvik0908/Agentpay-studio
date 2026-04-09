class KiteMCPClient:
    """
    Stub client for now.
    Replace with real MCP transport later.
    """

    async def get_payer_addr(self) -> dict:
        return {"payer_addr": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"}

    async def approve_payment(
        self,
        payer_addr: str,
        payee_addr: str,
        amount: str,
        token_type: str,
        merchant_name: str | None = None,
    ) -> dict:
        return {
            "x_payment": f"mock-x-payment::{payer_addr}::{payee_addr}::{amount}::{token_type}",
            "merchant_name": merchant_name or "Demo Merchant",
        }
