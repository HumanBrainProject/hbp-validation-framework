from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.cors import CORSMiddleware

from .resources import models, tests, vocab, results, auth, simulations, livepapers
from . import settings


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
Please [login here](https://validation-v2.brainsimulation.eu/login), then copy the "access token" into the dialog that appears when you click "Authorize" below.
(this workflow will be simplified in the near future).
"""

service_status = getattr(settings, "SERVICE_STATUS", "ok")
if service_status != "ok":
    warning_message = f"---\n> ⚠️ **_NOTE:_**  _{service_status}_\n---\n\n"
    description = warning_message + description


app = FastAPI(title="EBRAINS Model Validation Service", description=description, version="2.5")

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
app.include_router(simulations.router, tags=["Simulations"])
app.include_router(livepapers.router, tags=["Live Papers"])
app.include_router(vocab.router, tags=["Controlled vocabularies"])
