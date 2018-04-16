############
Model Images
############

.. _get_model_image_info_uuid:

Get a specific model image info using image UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/images/?id=(string:image_uuid)

   Retrieve specific model image info from the model catalog using image UUID

   **Example request**:

   .. sourcecode:: http

      GET /images/?id=fab6a1e6-ca25-4b7e-9570-a15047764b1f HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"images": [
      		{
      			"id": "fab6a1e6-ca25-4b7e-9570-a15047764b1f",
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph.jpeg",
      			"caption": "Morphology",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		}
      	]
      }

   :param image_uuid: UUID of the model image info to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model image info successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_model_image_info_model_uuid:

List all image info associated with a model using model UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/images/?model_id=(string:model_uuid)

   Retrieve all image info for a model from the model catalog using model's UUID

   **Example request**:

   .. sourcecode:: http

      GET /images/?model_id=743f0df9-6811-466b-856e-d26db25dd272 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"images": [
      		{
      			"id": "8cc6d197-8048-4465-9cd4-421f4f9ed0bc",
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      			"caption": "Morphology",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		},
      		{
      			"id": "278c7b0e-c6d2-415d-b13b-dcc335f9a85d",
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      			"caption": "Morphology",
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


.. _list_model_image_info_model_alias:

List all image info associated with a model using model alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/images/?model_alias=(string:model_alias)

   Retrieve model instance specific information from the model catalog using model's UUID

   **Example request**:

   .. sourcecode:: http

      GET /images/?model_alias=CA1_int_cNAC_BluePyOpt HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
      	"images": [
      		{
      			"id": "8cc6d197-8048-4465-9cd4-421f4f9ed0bc",
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      			"caption": "Morphology",
      			"model_id": "743f0df9-6811-466b-856e-d26db25dd272"
      		},
      		{
      			"id": "278c7b0e-c6d2-415d-b13b-dcc335f9a85d",
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      			"caption": "Morphology",
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


.. _register_new_model_image_info_model_uuid:

Register new model image info using model UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/images/

   Register new model image info in the model catalog using model_uuid

   **Example request**:

   .. sourcecode:: http

      POST /images/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_id": "743f0df9-6811-466b-856e-d26db25dd272",
      		"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      		"caption": "Morphology"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"c33a0c1e-a441-49eb-8db5-89fb1da93a85"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: model image info successfully added
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_model_image_info_model_alias:

Register new model image info using model alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/images/

   Register new model image info in the model catalog using model_alias

   .. note::
      This isn't currently available. See: https://github.com/HumanBrainProject/hbp-validation-framework/issues/164

   **Example request**:

   .. sourcecode:: http

      POST /images/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"model_alias": "CA1_int_cNAC_BluePyOpt",
      		"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      		"caption": "Morphology"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
      	"uuid": [
      		"a1b0c9ff-271a-4602-b91c-ff04244549cb"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 201: model image info successfully added
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_image_info_image_uuid:

Edit existing model image info
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/images/

   Edit an existing model image info in the model catalog by specifying the image UUID

   **Example request**:

   .. sourcecode:: http

      PUT /images/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      [
      	{
      		"id": "8cc6d197-8048-4465-9cd4-421f4f9ed0bc",
      		"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph_filtered.jpeg",
      		"caption": "Morphology - refined"
      	}
      ]

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
      	"uuid": [
      		"8cc6d197-8048-4465-9cd4-421f4f9ed0bc"
      	]
      }

   :reqheader Authorization: Bearer TOKEN
   :status 202: model image info successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided
