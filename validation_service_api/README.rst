================================
EBRAINS Model Validation Service
================================

Version 3, work in progress

To run development web server::

    $ uvicorn validation_service.main:app --reload

To run tests::

    $ export VF_TEST_TOKEN=<oidc-access-token>
    $ pytest validation_service/tests

Note that the access token should be for a test account which
does not have curator access, but should be a member of the
"model-validation" collab.
