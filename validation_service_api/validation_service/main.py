import asyncio
import functools
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.cors import CORSMiddleware
from fairgraph.errors import AuthenticationError

from .resources import models, tests, vocab, results, auth, comments
from . import settings
from .auth import get_kg_client_for_service_account

logger = logging.getLogger("validation_service_api")


description = """
The EBRAINS Model Validation Service is a web service to support
the structured [validation](https://en.wikipedia.org/wiki/Verification_and_validation_of_computer_simulation_models)
of neuroscience models.

Using the [EBRAINS Knowledge Graph](https://kg.ebrains.eu) as its data store, the Model Validation Service provides:

  - a catalog of models, each linked to validations of that model;
  - a library of validation tests, implemented in Python, each linked to reference data;
  - a database of validation results.

The Model Validation Service is used by the EBRAINS Model Catalog web app.
A [Python client](https://hbp-validation-client.readthedocs.io/) for the service is also available.

These pages provide interactive documentation. To try out queries, you will need an [EBRAINS user account](https://ebrains.eu/register/).
Please [login here](/login), then copy the "access token" into the dialog that appears when you click "Authorize" below.
(this workflow will be simplified in the near future).
"""

service_status = getattr(settings, "SERVICE_STATUS", "ok")
if service_status != "ok":
    warning_message = f"---\n> ⚠️ **_NOTE:_**  _{service_status}_\n---\n\n"
    description = warning_message + description


@asynccontextmanager
async def lifespan(app: FastAPI):
    get_kg_client_for_service_account()  # fail fast if credentials are missing
    yield


app = FastAPI(title="EBRAINS Model Validation Service", description=description, version="3beta", lifespan=lifespan)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    if isinstance(exc, AuthenticationError):
        logger.warning("Unauthenticated KG request (likely expired token): %s", exc)
        return JSONResponse(
            status_code=401,
            content={"detail": "Authentication failed. Your token may have expired."},
        )
    if "code=500" in str(exc):
        logger.warning("KG upstream 500: %s", exc)
        return JSONResponse(
            status_code=503,
            content={"detail": "The upstream data service is temporarily unavailable. Please try again in a few minutes."},
        )
    logger.exception("Unhandled exception", exc_info=exc)
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})


@app.get("/health", tags=["Health"])
async def health_check():
    service_status = getattr(settings, "SERVICE_STATUS", "ok")
    if service_status != "ok":
        return JSONResponse(
            status_code=503,
            content={"status": "unavailable", "reason": service_status},
        )

    kg_client = get_kg_client_for_service_account()
    query = kg_client.retrieve_query("VF_ScientificModelSummary")
    if query is None:
        return JSONResponse(status_code=503, content={"status": "unavailable"})

    probe = functools.partial(
        kg_client.query,
        query,
        {"space": "model"},
        size=1,
        from_index=0,
        release_status="released",
        use_stored_query=True,
    )

    last_exc = None
    for attempt in range(3):
        if attempt > 0:
            await asyncio.sleep(2)
        try:
            loop = asyncio.get_running_loop()
            await asyncio.wait_for(loop.run_in_executor(None, probe), timeout=5.0)
            return {"status": "ok"}
        except Exception as exc:
            last_exc = exc
            logger.warning("Health check attempt %d/3 failed: %s", attempt + 1, exc)

    logger.error("Health check: KG unavailable after 3 attempts. Last error: %s", last_exc)
    return JSONResponse(status_code=503, content={"status": "unavailable"})


app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SESSIONS_SECRET_KEY
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentication and authorization"])
app.include_router(models.router, tags=["Models"])
app.include_router(tests.router, tags=["Validation Tests"])
app.include_router(results.router, tags=["Validation Results"])
#app.include_router(simulations.router, tags=["Simulations"])
app.include_router(comments.router, tags=["Comments"])
app.include_router(vocab.router, tags=["Controlled vocabularies"])
