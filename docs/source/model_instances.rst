###############
Model Instances
###############

.. _get_model_instance_description_uuid:

Get model instance description using instance UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/model-instances/?id=(string:model_instance_uuid)

   Retrieve model instance specific information from the model catalog using model instance UUID

   **Example request**:

   .. sourcecode:: http

      GET /model-instances/?id=9217f786-a124-4327-b260-17e85624b9ba HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"instances": [
      		{
      			"id": "9217f786-a124-4327-b260-17e85624b9ba",
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param model_instance_uuid: UUID of the model instance to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model instance description successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_model_instance_description_model_uuid_version:

Get model instance description using model UUID and version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/model-instances/?model_id=(string:model_uuid)&version=(string:version)

   Retrieve model instance specific information from the model catalog using model's UUID and version

   **Example request**:

   .. sourcecode:: http

      GET /model-instances/?model_id=743f0df9-6811-466b-856e-d26db25dd272&version=1.0 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"instances": [
      		{
      			"id": "9217f786-a124-4327-b260-17e85624b9ba",
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param model_uuid: UUID of the model whose instance is to be retrieved
   :param version: version of the model to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model instance description successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_model_instance_description_model_alias_version:

Get model instance description using model alias and version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/model-instances/?model_alias=(string:model_alias)&version=(string:version)

   Retrieve model instance specific information from the model catalog using model's UUID

   **Example request**:

   .. sourcecode:: http

      GET /model-instances/?model_alias=CA1_int_cNAC_BluePyOpt&version=1.0 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"instances": [
      		{
      			"id": "9217f786-a124-4327-b260-17e85624b9ba",
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param model_alias: alias of the model whose instance is to be retrieved
   :param version: version of the model to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model instance description successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_model_instance_descriptions_model_UUID:

List all instances of a model specified using model UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/model-instances/?model_id=(string:model_uuid)

   Retrieve model descriptions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /model-instances/?model_id=743f0df9-6811-466b-856e-d26db25dd272 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"instances": [
      		{
      			"id": "9f4eeec3-30ac-47bc-aaf5-871558052047",
      			"version": "2.0",
      			"description": "version 2: more detailed",
      			"parameters": "",
      			"code_format": "py, hoc",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		},
      		{
      			"id": "9217f786-a124-4327-b260-17e85624b9ba",
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param model_uuid: UUID of the model whose instances are to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model descriptions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_model_instance_descriptions_model_alias:

List all instances of a model specified using model alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/model-instances/?model_alias=(string:model_alias)

   Retrieve model descriptions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /model-instances/?model_alias=CA1_int_cNAC_BluePyOpt HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"instances": [
      		{
      			"id": "9f4eeec3-30ac-47bc-aaf5-871558052047",
      			"version": "2.0",
      			"description": "version 2: more detailed",
      			"parameters": "",
      			"code_format": "py, hoc",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		},
      		{
      			"id": "9217f786-a124-4327-b260-17e85624b9ba",
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param model_alias: alias of the model whose instances are to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model descriptions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_model_instance_description_model_uuid:

Register a new model instance description using: model_uuid
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/model-instances/

   Register a new model instance description in the model catalog using model_uuid

   **Example request**:

   .. sourcecode:: http

      POST /model-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_id": "743f0df9-6811-466b-856e-d26db25dd272",
      		"version": "2.0",
      		"description": "version 2",
      		"parameters": "",
      		"code_format": "py, hoc, mod",
      		"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"9f4eeec3-30ac-47bc-aaf5-871558052047"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: model instance description successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_model_instance_description_model_alias:

Register a new model instance description using: model_alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/model-instances/

   Register a new model instance description in the model catalog using model_alias

   .. note::
      This isn't currently available. See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/163

   **Example request**:

   .. sourcecode:: http

      POST /model-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_alias": "CA1_int_cNAC_BluePyOpt",
      		"version": "2.0",
      		"description": "version 2",
      		"parameters": "",
      		"code_format": "py, hoc, mod",
      		"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"9f4eeec3-30ac-47bc-aaf5-871558052047"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: model instance description successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_model_instance_description_model_instance_uuid:

Edit an existing model instance description using: model_instance_uuid
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/model-instances/

   Edit an existing model instance description in the model catalog by specifying the model instance UUID

   .. note::
      Only this variant of the model instance edit API allows the change of `version` name.

   **Example request**:

   .. sourcecode:: http

      PUT /model-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"id": "9f4eeec3-30ac-47bc-aaf5-871558052047",
      		"version": "2.0 - 2018",
      		"description": "version 2: more detailed",
      		"parameters": "",
      		"code_format": "py, hoc",
      		"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		"9f4eeec3-30ac-47bc-aaf5-871558052047"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: model instance description successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_model_instance_description_model_uuid_version:

Edit an existing model instance description using: model_uuid, version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/model-instances/

   Edit an existing model instance description in the model catalog by specifying the model UUID and version

   **Example request**:

   .. sourcecode:: http

      PUT /model-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_id": "743f0df9-6811-466b-856e-d26db25dd272",
      		"version": "2.0",
      		"description": "version 2: more detailed",
      		"parameters": "",
      		"code_format": "py, hoc",
      		"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		"9f4eeec3-30ac-47bc-aaf5-871558052047"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: model instance description successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_model_instance_description_model_alias_version:

Edit an existing model instance description using: model_alias, version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/model-instances/

   Edit an existing model instance description in the model catalog by specifying the model alias and version

   **Example request**:

   .. sourcecode:: http

      PUT /model-instances/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_alias":"CA1_int_cNAC_BluePyOpt",
      		"version": "2.0",
      		"description": "version 2: more detailed",
      		"parameters": "",
      		"code_format": "py, hoc",
      		"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC_v2.zip"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		"9f4eeec3-30ac-47bc-aaf5-871558052047"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: model instance description successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided
