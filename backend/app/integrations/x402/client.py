class X402Client:
    """
    Stub x402 service client for local bootstrapping.
    """

    async def call_paid_service(self, location: str, x_payment: str | None = None) -> dict:
        if not x_payment:
            return {
                "status_code": 402,
                "payment_info": {
                    "payee_addr": "0x4A50DCA63d541372ad36E5A36F1D542d51164F19",
                    "amount": "1000000000000000000",
                    "token_type": "USDT",
                    "merchant_name": "Weather Service",
                    "provider": "Weather API",
                },
            }

        return {
            "status_code": 200,
            "data": {
                "location": location,
                "temperature": 22,
                "conditions": "Cloudy",
                "source": "x402 weather demo",
            },
        }
