import asyncio
from sqlalchemy import text
from app.core.database import engine

async def list_tables():
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = result.scalars().all()
        print("Tables:", tables)

if __name__ == "__main__":
    asyncio.run(list_tables())
