# Running tests for the Model Validation API


To run the test suite, an authorization token is needed. This can be obtained from https://model-validation-api.apps.ebrains.eu/login. The account used to obtain the token should have minimal permissions
(in particular, the user must not be a member of any "curator" group), but should have admin permissions
for the collab with identifier "TEST_PROJECT" in `validation_service/tests/fixtures.py`.

The token should be stored in an environment variable `VF_TEST_TOKEN`.

## Test requirements

- pytest
- pytest-asyncio

## Running tests

From the "validation_service_api" subdirectory, run:

  $ pytest validation_service/tests

To measure test coverage, run as follows:

  $ pytest validation_service/tests --cov=validation_service --cov-report term --cov-report html
