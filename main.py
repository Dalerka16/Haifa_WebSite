from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.routers import courses,reviews
"""from db.database import create_tables

create_tables()
"""

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#connecting routers
app.include_router(courses.router,prefix=settings.api_prefix)
"""app.include_router(home_page.router)"""
app.include_router(reviews.router,prefix=settings.api_prefix)