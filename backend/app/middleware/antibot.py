from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
import re

SUSPICIOUS_AGENTS = [
    r"bot", r"crawl", r"spider", r"slurp", r"facebook", r"whatsapp", r"python-requests", 
    r"aiohttp", r"urllib", r"wget", r"curl"
]

class AntiBotMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_host = request.client.host if request.client else ""
        # Allow localhost/127.0.0.1 to bypass checks
        if client_host in ["127.0.0.1", "::1", "localhost"]:
            return await call_next(request)

        user_agent = request.headers.get("user-agent", "").lower()
        
        # 1. Check for missing User-Agent
        if not user_agent:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No User-Agent provided")
            
        # 2. Check for suspicious keywords
        for pattern in SUSPICIOUS_AGENTS:
            if re.search(pattern, user_agent):
                # Allow Googlebot/Bingbot if verified (omitted for MVP simplicity, but strict otherwise)
                if "googlebot" in user_agent or "bingbot" in user_agent:
                    pass # TODO: Verify IP
                else:
                    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        response = await call_next(request)
        return response
