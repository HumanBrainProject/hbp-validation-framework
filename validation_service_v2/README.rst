================================
EBRAINS Model Validation Service
================================

Version 2, work in progress

To run development web server::

    $ uvicorn validation_service.main:app --reload

To run tests::

    $ export VF_TEST_TOKEN=<oidc-access-token>
    $ pytest validation_service/tests.py
