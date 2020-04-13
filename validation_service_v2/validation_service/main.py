from fastapi import FastAPI

from .resources import models

app = FastAPI(
    title="HBP Model Validation Service",
    description="description goes here",
    version="2.0")

app.include_router(models.router, tags=["models"])
