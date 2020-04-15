from fastapi import FastAPI

from .resources import models, tests, vocab, results

app = FastAPI(
    title="HBP Model Validation Service",
    description="description goes here",
    version="2.0")


app.include_router(models.router, tags=["Models"])
app.include_router(tests.router, tags=["Validation Tests"])
app.include_router(results.router, tags=["Validation Results"])
app.include_router(vocab.router, tags=["Controlled vocabularies"])
