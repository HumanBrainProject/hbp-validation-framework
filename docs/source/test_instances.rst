##############
Test Instances
##############

.. _get_test_instance_definition_uuid:

Get test instance definition using instance UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/test-instances/?id=(string:test_instance_uuid)

   Retrieve test instance specific information from the test library using test instance UUID

   **Example request**:

   .. sourcecode:: http

      GET /test-instances/?id=c7602a18-267d-4c1e-8c6d-4e5079e50441 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"test_codes": [
      		{
      			"id": "c7602a18-267d-4c1e-8c6d-4e5079e50441",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "1.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-03-08T15:11:07.527599Z",
      			"test_definition_id": "8296508f-ad81-4927-83ff-499b8ee1c6ba"
      		}
      	]
      }

   :param test_instance_uuid: UUID of the test instance to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test instance definition successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_test_instance_definition_test_uuid_version:

Get test instance definition using test UUID and version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/test-instances/?test_definition_id=(string:test_uuid)&version=(string:version)

   Retrieve test instance specific information from the test library using test's UUID and version

   **Example request**:

   .. sourcecode:: http

      GET /test-instances/?test_definition_id=8296508f-ad81-4927-83ff-499b8ee1c6ba&version=1.0 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"test_codes": [
      		{
      			"id": "c7602a18-267d-4c1e-8c6d-4e5079e50441",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "1.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-03-08T15:11:07.527599Z",
      			"test_definition_id": "8296508f-ad81-4927-83ff-499b8ee1c6ba"
      		}
      	]
      }

   :param test_uuid: UUID of the test whose instance is to be retrieved
   :param version: version of the test to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test instance definition successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_test_instance_definition_test_alias_version:

Get test instance definition using test alias and version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/test-instances/?test_alias=(string:test_alias)&version=(string:version)

   Retrieve test instance specific information from the test library using test's UUID

   **Example request**:

   .. sourcecode:: http

      GET /test-instances/?test_alias=hippo_somafeat_CA1_int_cNAC&version=1.0 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"test_codes": [
      		{
      			"id": "c7602a18-267d-4c1e-8c6d-4e5079e50441",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "1.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-03-08T15:11:07.527599Z",
      			"test_definition_id": "8296508f-ad81-4927-83ff-499b8ee1c6ba"
      		}
      	]
      }

   :param test_alias: alias of the test whose instance is to be retrieved
   :param version: version of the test to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test instance definition successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_instance_definitions_test_UUID:

List all instances of a test specified using test UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/test-instances/?test_definition_id=(string:test_uuid)

   Retrieve test definitions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /test-instances/?test_definition_id=fbfbfea4-525d-462e-8fe1-e6771946430f HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"test_codes": [
      		{
      			"id": "47f19d31-3eb0-41a7-be8d-f0ddf6f2848b",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "1.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T08:36:46.083288Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		},
      		{
      			"id": "4b564473-2c25-4e49-bdad-80a19277a98b",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "2.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T09:04:34.779948Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		}
      	]
      }

   :param test_uuid: UUID of the test whose instances are to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test definitions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_instance_definitions_test_alias:

List all instances of a test specified using test alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/test-instances/?test_alias=(string:test_alias)

   Retrieve test definitions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /test-instances/?test_alias=hippo_somafeat_CA1_int_cNAC_Duplicate HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"test_codes": [
      		{
      			"id": "47f19d31-3eb0-41a7-be8d-f0ddf6f2848b",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "1.0",
      			"description": null,
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T08:36:46.083288Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		},
      		{
      			"id": "4b564473-2c25-4e49-bdad-80a19277a98b",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "2.0",
      			"description": "Updated.",
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T09:04:34.779948Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		}
      	]
      }

   :param test_alias: alias of the test whose instances are to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test definitions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_test_instance_definition_test_uuid:

Register a new test instance definition using: test_uuid
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/test-instances/

   Register a new test instance definition in the test library using test_uuid

   **Example request**:

   .. sourcecode:: http

      POST /test-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f",
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"version": "4.0",
      		"description": null,
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"65659c3e-513b-4497-bf60-8c431866258a"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: test instance definition successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_test_instance_definition_test_alias:

Register a new test instance definition using: test_alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/test-instances/

   Register a new test instance definition in the test library using test_alias

   **Example request**:

   .. sourcecode:: http

      POST /test-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"test_alias": "hippo_somafeat_CA1_int_cNAC_Duplicate",
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"version": "5.0",
      		"description": null,
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"baae4a8a-5ccb-41e0-969f-6f47a0210173"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: test instance definition successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_test_instance_definition_test_instance_uuid:

Edit an existing test instance definition using: test_instance_uuid
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/test-instances/

   Edit an existing test instance definition in the test library by specifying the test instance UUID

   .. note::
      Only this variant of the test instance edit API allows the change of `version` name.

   .. note::
      The output of this API needs to be rectified such that it returns only the test instance UUID.
      See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/168

   **Example request**:

   .. sourcecode:: http

      PUT /test-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"id": "baae4a8a-5ccb-41e0-969f-6f47a0210173",
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"version": "5.0",
      		"description": "This is version 5!",
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		{
      			"id": "baae4a8a-5ccb-41e0-969f-6f47a0210173",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "5.0",
      			"description": "This is version 5!",
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T09:17:08.379490Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		}
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: test instance definition successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_test_instance_definition_test_uuid_version:

Edit an existing test instance definition using: test_uuid, version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/test-instances/

   Edit an existing test instance definition in the test library by specifying the test UUID and version

   .. note::
      The output of this API needs to be rectified such that it returns only the test instance UUID.
      See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/168

   **Example request**:

   .. sourcecode:: http

      PUT /test-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f",
      		"version": "5.0",
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"description": "This is version 5!",
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		{
      			"id": "baae4a8a-5ccb-41e0-969f-6f47a0210173",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "5.0",
      			"description": "This is version 5!",
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T09:17:08.379490Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		}
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: test instance definition successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_test_instance_definition_test_alias_version:

Edit an existing test instance definition using: test_alias, version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/test-instances/

   Edit an existing test instance definition in the test library by specifying the test alias and version

   .. note::
      The output of this API needs to be rectified such that it returns only the test instance UUID.
      See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/168

   **Example request**:

   .. sourcecode:: http

      PUT /test-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"test_alias": "hippo_somafeat_CA1_int_cNAC_Duplicate",
      		"version": "5.0",
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"description": "This is version 5!",
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		{
      			"id": "baae4a8a-5ccb-41e0-969f-6f47a0210173",
      			"repository": "https://github.com/KaliLab/hippounit.git",
      			"version": "5.0",
      			"description": "This is version 5!",
      			"path": "hippounit.tests.SomaticFeaturesTest_Loader",
      			"timestamp": "2018-04-13T09:17:08.379490Z",
      			"test_definition_id": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      		}
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: test instance definition successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided
