from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from .resources import models, tests, vocab, results, auth
from . import settings

app = FastAPI(
    title="HBP Model Validation Service",
    description="description goes here",
    version="2.0")


app.add_middleware(SessionMiddleware, secret_key=settings.SESSIONS_SECRET_KEY)
app.include_router(auth.router)
app.include_router(models.router, tags=["Models"])
app.include_router(tests.router, tags=["Validation Tests"])
app.include_router(results.router, tags=["Validation Results"])
app.include_router(vocab.router, tags=["Controlled vocabularies"])
