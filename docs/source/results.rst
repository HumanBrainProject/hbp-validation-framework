#######
Results
#######

.. note::
   Valid values for `order` in the below APIs are = 'test', 'model', 'model_instance', 'test_code', 'score_type', ''
   Examples for 'test' and 'model' have been demonstrated.

.. _get_test_result_uuid_concise:

Get a specific test result: provide summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?id=(string:result_uuid)&order=

   Retrieve specific test result info from the model catalog using result UUID; show only concise info

   **Example request**:

   .. sourcecode:: http

      GET /results/?id=60add79a-f0d2-4a96-8878-3968bcb2bbc1&order= HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"results": [
      		{
      			"id": "60add79a-f0d2-4a96-8878-3968bcb2bbc1",
      			"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      			"test_code_id": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76",
      			"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142138",
      			"score": 7.88532559520464,
      			"passed": null,
      			"timestamp": "2018-03-13T13:22:01.554888Z",
      			"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      			"project": "8123",
      			"normalized_score": 7.88532559520464
      		}
      	]
      }

   :param result_uuid: UUID of the result to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test result successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_test_result_uuid_details_by_test:

Get a specific test result: provide details by test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?id=(string:result_uuid)&order=test

   Retrieve specific test result info from the model catalog using result UUID; show details ordered by test

   **Example request**:

   .. sourcecode:: http

      GET /results/?id=60add79a-f0d2-4a96-8878-3968bcb2bbc1&order=test HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"tests": {
      		"3aab7a1c-0836-4412-bcd3-f0b3a4685ee3": {
      			"alias": "hippo_ca1_bap",
      			"test_codes": {
      				"8df4d05b-962c-4e3a-bd34-8cf55cd79c76": {
      					"models": {
      						"44371034-81a6-4d7c-ae1f-cc57bab5980e": {
      							"alias": "None",
      							"model_instances": {
      								"2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f": {
      									"version": "1.0",
      									"result": {
      										"id": "60add79a-f0d2-4a96-8878-3968bcb2bbc1",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142138",
      										"score": 7.88532559520464,
      										"passed": null,
      										"timestamp": "2018-03-13T13:22:01.554888Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 7.88532559520464
      									}
      								}
      							}
      						}
      					},
      					"version": "1.0"
      				}
      			},
      			"score_type": "Other"
      		}
      	}
      }

   :param result_uuid: UUID of the result to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test result successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_test_result_uuid_details_by_model:

Get a specific test result: provide details by model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?id=(string:result_uuid)&order=model

   Retrieve specific test result info from the model catalog using result UUID; show details ordered by model

   **Example request**:

   .. sourcecode:: http

      GET /results/?id=60add79a-f0d2-4a96-8878-3968bcb2bbc1&order=model HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"models": {
      		"44371034-81a6-4d7c-ae1f-cc57bab5980e": {
      			"alias": "None",
      			"model_instances": {
      				"2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f": {
      					"tests": {
      						"3aab7a1c-0836-4412-bcd3-f0b3a4685ee3": {
      							"alias": "hippo_ca1_bap",
      							"test_codes": {
      								"8df4d05b-962c-4e3a-bd34-8cf55cd79c76": {
      									"version": "1.0",
      									"result": {
      										"id": "60add79a-f0d2-4a96-8878-3968bcb2bbc1",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142138",
      										"score": 7.88532559520464,
      										"passed": null,
      										"timestamp": "2018-03-13T13:22:01.554888Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 7.88532559520464
      									}
      								}
      							}
      						}
      					},
      					"version": "1.0"
      				}
      			}
      		}
      	}
      }

   :param result_uuid: UUID of the result to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: test result successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_result_filters_concise:

List all results satisfying specified filters: provide summary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?order=&(string:filters)

   Retrieve all test results satisfying specified filters; show only concise info

   **Example request**:

   .. sourcecode:: http

      GET /results/?order=&model_id=44371034-81a6-4d7c-ae1f-cc57bab5980e HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"results": [
      		{
      			"id": "60add79a-f0d2-4a96-8878-3968bcb2bbc1",
      			"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      			"test_code_id": "8df4d05b-962c-4e3a-bd34-8cf55cd79c76",
      			"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142138",
      			"score": 7.88532559520464,
      			"passed": null,
      			"timestamp": "2018-03-13T13:22:01.554888Z",
      			"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      			"project": "8123",
      			"normalized_score": 7.88532559520464
      		},
      		{
      			"id": "d7df2b4a-b005-4be0-801f-f5733461a181",
      			"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      			"test_code_id": "2a577a94-3f33-440a-8e43-96de5ed298a4",
      			"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142111",
      			"score": 2.46897669574606,
      			"passed": null,
      			"timestamp": "2018-03-13T13:21:27.707786Z",
      			"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      			"project": "8123",
      			"normalized_score": 2.46897669574606
      		},
      		{
      			"id": "51479d56-3615-4a0f-9d2a-8b965c018fed",
      			"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      			"test_code_id": "02419a4b-7d2e-46d8-8ff1-b1f98551712b",
      			"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142045",
      			"score": 1.22696977418376,
      			"passed": null,
      			"timestamp": "2018-03-13T13:21:02.332025Z",
      			"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      			"project": "8123",
      			"normalized_score": 1.22696977418376
      		}
      	]
      }

   :param filters: key:value pairs specifying required filters
   :reqheader Authorization: Bearer TOKEN
   :status 200: test results successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_result_filters_by_test:

List all results satisfying specified filters: provide details by test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?order=test&(string:filters)

   Retrieve all test results satisfying specified filters; show details ordered by test

   **Example request**:

   .. sourcecode:: http

      GET /results/?order=test&model_id=44371034-81a6-4d7c-ae1f-cc57bab5980e HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"tests": {
      		"e89dba96-bffc-4071-ab90-0ccc81895192": {
      			"alias": "hippo_somafeat_CA1_pyr_cACpyr",
      			"test_codes": {
      				"02419a4b-7d2e-46d8-8ff1-b1f98551712b": {
      					"models": {
      						"44371034-81a6-4d7c-ae1f-cc57bab5980e": {
      							"alias": "None",
      							"model_instances": {
      								"2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f": {
      									"version": "1.0",
      									"result": {
      										"id": "51479d56-3615-4a0f-9d2a-8b965c018fed",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "02419a4b-7d2e-46d8-8ff1-b1f98551712b",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142045",
      										"score": 1.22696977418376,
      										"passed": null,
      										"timestamp": "2018-03-13T13:21:02.332025Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 1.22696977418376
      									}
      								}
      							}
      						}
      					},
      					"version": "1.0"
      				}
      			},
      			"score_type": "Other"
      		},
      		"761b081a-3a28-45a4-b1ac-3ff056f3e0ab": {
      			"alias": "hippo_ca1_psp_attenuation",
      			"test_codes": {
      				"2a577a94-3f33-440a-8e43-96de5ed298a4": {
      					"models": {
      						"44371034-81a6-4d7c-ae1f-cc57bab5980e": {
      							"alias": "None",
      							"model_instances": {
      								"2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f": {
      									"version": "1.0",
      									"result": {
      										"id": "d7df2b4a-b005-4be0-801f-f5733461a181",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "2a577a94-3f33-440a-8e43-96de5ed298a4",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142111",
      										"score": 2.46897669574606,
      										"passed": null,
      										"timestamp": "2018-03-13T13:21:27.707786Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 2.46897669574606
      									}
      								}
      							}
      						}
      					},
      					"version": "1.0"
      				}
      			},
      			"score_type": "Other"
      		}
      	}
      }

   :param filters: key:value pairs specifying required filters
   :reqheader Authorization: Bearer TOKEN
   :status 200: test results successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_test_result_filters_by_model:

List all results satisfying specified filters: provide details by model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/results/?order=model&(string:filters)

   Retrieve all test results satisfying specified filters; show details ordered by model

   **Example request**:

   .. sourcecode:: http

      GET /results/?order=model&model_id=44371034-81a6-4d7c-ae1f-cc57bab5980e HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"models": {
      		"44371034-81a6-4d7c-ae1f-cc57bab5980e": {
      			"alias": "None",
      			"model_instances": {
      				"2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f": {
      					"tests": {
      						"e89dba96-bffc-4071-ab90-0ccc81895192": {
      							"alias": "hippo_somafeat_CA1_pyr_cACpyr",
      							"test_codes": {
      								"02419a4b-7d2e-46d8-8ff1-b1f98551712b": {
      									"version": "1.0",
      									"result": {
      										"id": "51479d56-3615-4a0f-9d2a-8b965c018fed",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "02419a4b-7d2e-46d8-8ff1-b1f98551712b",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142045",
      										"score": 1.22696977418376,
      										"passed": null,
      										"timestamp": "2018-03-13T13:21:02.332025Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 1.22696977418376
      									}
      								}
      							}
      						},
      						"761b081a-3a28-45a4-b1ac-3ff056f3e0ab": {
      							"alias": "hippo_ca1_psp_attenuation",
      							"test_codes": {
      								"2a577a94-3f33-440a-8e43-96de5ed298a4": {
      									"version": "1.0",
      									"result": {
      										"id": "d7df2b4a-b005-4be0-801f-f5733461a181",
      										"model_version_id": "2f77f42d-4b2b-4b4e-ad8e-6ff6f2398a3f",
      										"test_code_id": "2a577a94-3f33-440a-8e43-96de5ed298a4",
      										"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142111",
      										"score": 2.46897669574606,
      										"passed": null,
      										"timestamp": "2018-03-13T13:21:27.707786Z",
      										"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      										"project": "8123",
      										"normalized_score": 2.46897669574606
      									}
      								}
      							}
      						}
      					},
      					"version": "1.0"
      				}
      			}
      		}
      	}
      }

   :param filters: key:value pairs specifying required filters
   :reqheader Authorization: Bearer TOKEN
   :status 200: test results successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. note::
   Valid options for filters in the above APIs are = '', 'id', 'test_id', 'test_code_id', 'model_id', 'model_version_id'


.. _register_new_test_result:

Register a new test result
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/results/

   Register a new test result in the validation framework

   **Example request**:

   .. sourcecode:: http

      POST /results/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_version_id": "9f4eeec3-30ac-47bc-aaf5-871558052047",
      		"test_code_id": "c7602a18-267d-4c1e-8c6d-4e5079e50441",
      		"results_storage": "collab:///8123/validation_results/2018-03-13/CA1_pyr_cACpyr_mpg141209_A_idA_20170912152008_20180313-142111",
      		"score": 2.46897669574606,
      		"passed": null,
      		"platform": "{'system_name': 'Linux', 'ip_addr': '127.0.0.1', 'architecture_bits': '64bit', 'machine': 'x86_64', 'architecture_linkage': 'ELF', 'version': '#135-Ubuntu SMP Fri Jan 19 11:48:36 UTC 2018', 'release': '4.4.0-112-generic', 'network_name': 'd1226c10e83f', 'processor': ''}",
      		"project": "8123",
      		"normalized_score": 2.46897669574606
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"d8c2f96e-68f2-479e-bea8-2a2da8a78569"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: test result successfully registered
   :status 400: incorrect API call
   :status 403: invalid token provided
