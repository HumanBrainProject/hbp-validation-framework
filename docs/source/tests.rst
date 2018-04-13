#####
Tests
#####

.. _get_test_definition_uuid:

Get test definition using UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/tests/?id=(string:test_uuid)

   Retrieve test specific information from the test library using test's UUID

   .. note::
      Currently this API does not provide `score_type` parameter in the output.
      This will be rectified. See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/166

   **Example request**:

   .. sourcecode:: http

      GET /tests/?id=8296508f-ad81-4927-83ff-499b8ee1c6ba HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"tests": [
      		{
      			"id": "8296508f-ad81-4927-83ff-499b8ee1c6ba",
      			"name": "Hippocampus_SomaticFeaturesTest",
      			"alias": "hippo_somafeat_CA1_int_cNAC",
      			"species": "Rat (Rattus rattus)",
      			"brain_region": "Hippocampus",
      			"cell_type": "Pyramidal Cell",
      			"age": "TBD",
      			"data_location": "collab://8123/test_observations/hippounit/feat_CA1_int_cNAC.json",
      			"data_type": "Mean, SD",
      			"data_modality": "electrophysiology",
      			"test_type": "single cell activity",
      			"protocol": "Tests eFEL features under current injection of varying amplitudes",
      			"author": "Sara Saray",
      			"creation_date": "2018-03-08T15:11:07.517654Z",
      			"publication": "",
      			"codes": [
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
      	]
      }

   :param test_uuid: UUID of the test to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test definition successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_test_definition_alias:

Get test definition using alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/tests/?alias=(string:alias)

   Retrieve test specific information from the test library using test's UUID

   .. note::
      Currently this API does not produce output (not showing test versions) identical to the above variant (using test UUID).
      This will be rectified. See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/165

   **Example request**:

   .. sourcecode:: http

      GET /tests/?alias=hippo_somafeat_CA1_int_cNAC HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"tests": [
      		{
      			"id": "8296508f-ad81-4927-83ff-499b8ee1c6ba",
      			"name": "Hippocampus_SomaticFeaturesTest",
      			"alias": "hippo_somafeat_CA1_int_cNAC",
      			"species": "Rat (Rattus rattus)",
      			"brain_region": "Hippocampus",
      			"cell_type": "Pyramidal Cell",
      			"age": "TBD",
      			"data_location": "collab://8123/test_observations/hippounit/feat_CA1_int_cNAC.json",
      			"data_type": "Mean, SD",
      			"data_modality": "electrophysiology",
      			"test_type": "single cell activity",
      			"protocol": "Tests eFEL features under current injection of varying amplitudes",
      			"creation_date": "2018-03-08T15:11:07.517654Z",
      			"author": "Sara Saray",
      			"publication": "",
      			"score_type": "Other"
      		}
      	]
      }

   :param alias: alias of the test to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test definition successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_definitions:

List test definitions that satisfy specified filters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/tests/?(string:filters)

   Retrieve test definitions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /tests/?brain_region=Basal+Ganglia&data_modality=electrophysiology HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"tests": [
      		{
      			"id": "09c98bab-7c7c-4860-8cb4-7a6b197c2e0b",
      			"name": "BasalG_Test - fs",
      			"alias": "basalg_fs",
      			"species": "Mouse (Mus musculus)",
      			"brain_region": "Basal Ganglia",
      			"cell_type": "Interneuron",
      			"age": "TBD",
      			"data_location": "collab://8123/test_observations/basalunit/str-fs-161205_FS1.zip",
      			"data_type": "Mean, SD",
      			"data_modality": "electrophysiology",
      			"test_type": "single cell activity",
      			"protocol": "Tests somatic features under current injection of varying amplitudes",
      			"creation_date": "2018-03-13T16:37:36.990285Z",
      			"author": "Shailesh Appukuttan",
      			"publication": "",
      			"score_type": "Other"
      		},
      		{
      			"id": "1ec66502-3557-4c02-b4d5-168a0c555b09",
      			"name": "BasalG_Test - msn_d2",
      			"alias": "basalg_msn_d2",
      			"species": "Mouse (Mus musculus)",
      			"brain_region": "Basal Ganglia",
      			"cell_type": "Other",
      			"age": "TBD",
      			"data_location": "collab://8123/test_observations/basalunit/YJ150915_c67D1ch01D2ch23-c7.zip",
      			"data_type": "Mean, SD",
      			"data_modality": "electrophysiology",
      			"test_type": "single cell activity",
      			"protocol": "Tests somatic features under current injection of varying amplitudes",
      			"creation_date": "2017-12-19T15:32:04.233125Z",
      			"author": "Shailesh Appukuttan",
      			"publication": "",
      			"score_type": "Other"
      		},
      		{
      			"id": "a62c0ece-9de7-4e31-ac1b-89b56c4ffdcb",
      			"name": "BasalG_Test - msn_d1",
      			"alias": "basalg_msn_d1",
      			"species": "Mouse (Mus musculus)",
      			"brain_region": "Basal Ganglia",
      			"cell_type": "Other",
      			"age": "TBD",
      			"data_location": "collab://8123/test_observations/basalunit/YJ150915_c67D1ch01D2ch23-c6.zip",
      			"data_type": "Mean, SD",
      			"data_modality": "electrophysiology",
      			"test_type": "single cell activity",
      			"protocol": "Tests somatic features under current injection of varying amplitudes",
      			"creation_date": "2017-12-19T15:32:03.767925Z",
      			"author": "Shailesh Appukuttan",
      			"publication": "",
      			"score_type": "Other"
      		}
      	]
      }

   :param filters: key:value pairs specifying required filters
   :reqheader Authorization: Bearer TOKEN
   :status 200: test definitions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_test_definition:

Register a new test definition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/tests/

   Register a new test definition in the test library

   **Example request**:

   .. sourcecode:: http

      POST /tests/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
      	"test_data": {
      		"name": "Hippocampus_SomaticFeaturesTest",
      		"alias": "hippo_somafeat_CA1_int_cNAC_Duplicate",
      		"species": "Rat (Rattus rattus)",
      		"brain_region": "Hippocampus",
      		"cell_type": "Pyramidal Cell",
      		"age": "TBD",
      		"data_location": "collab://8123/test_observations/hippounit/feat_CA1_int_cNAC.json",
      		"data_type": "Mean, SD",
      		"data_modality": "electrophysiology",
      		"test_type": "single cell activity",
      		"score_type": "Other",
      		"protocol": "Tests eFEL features under current injection of varying amplitudes",
      		"author": "Sara Saray",
      		"publication": ""
      	},
      	"code_data": {
      		"repository": "https://github.com/KaliLab/hippounit.git",
      		"version": "1.0",
      		"description": null,
      		"path": "hippounit.tests.SomaticFeaturesTest_Loader"
      	}
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: test definition successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_test_definition:

Edit an existing test definition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/tests/

   Edit an existing test definition in the test library

   **Example request**:

   .. sourcecode:: http

      PUT /tests/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
      	"id": "fbfbfea4-525d-462e-8fe1-e6771946430f",
      	"name": "Hippocampus_SomaticFeaturesTest",
      	"alias": "hippo_somafeat_CA1_int_cNAC_Duplicate",
      	"species": "Rat (Rattus rattus)",
      	"brain_region": "Hippocampus",
      	"cell_type": "Pyramidal Cell",
      	"age": "TBD",
      	"data_location": "collab://8123/test_observations/hippounit/feat_CA1_int_cNAC.json",
      	"data_type": "Mean, SD",
      	"data_modality": "electrophysiology",
      	"test_type": "single cell activity",
      	"score_type": "Other",
      	"protocol": "Tests eFEL features under current injection of varying amplitudes",
      	"author": "Sara Saray",
      	"publication": "Abcde et al., 2018"
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": "fbfbfea4-525d-462e-8fe1-e6771946430f"
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: test definition successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided

   .. note::
      Does not allow editing details of test instances (versions). Will be implemented later, if required.
      Currently this can be done via separate API for test instances.
