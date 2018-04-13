######
Models
######

.. _get_model_description_uuid:

Get model description using UUID
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/models/?id=(string:model_uuid)

   Retrieve model specific information from the model catalog using model's UUID

   **Example request**:

   .. sourcecode:: http

      GET /models/?id=afcf0280-4be9-4a20-868a-a626caf6e8ee HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "models": [
            {
               "id": "afcf0280-4be9-4a20-868a-a626caf6e8ee",
               "name": "CA1_int_cAC_980120A_20180115155814",
               "alias": null,
               "author": "Rosanna Migliore",
               "app": {
                  "id": "81354",
                  "collab_id": 10324
               },
               "organization": "<<empty>>",
               "private": false,
               "cell_type": "Interneuron",
               "model_type": "Single Cell",
               "brain_region": "Hippocampus",
               "species": "Rat (Rattus rattus)",
               "description": "This model is being used to demonstrate use of the Validation Service",
               "instances": [
                  {
                     "id": "5bdf46e4-0ab9-4c54-9b32-499d62918c51",
                     "version": "1.0",
                     "description": "",
                     "parameters": "{}",
                     "code_format": null,
                     "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippocampus_optimization/optimizations/CA1_int_cAC_980120A_20180115155814/CA1_int_cAC_980120A_20180115155814.zip"
                  }
               ],
               "images": [
                  {
                     "id": "e4be5574-1ac8-48a9-ae63-2ef76e8108e0",
                     "url": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippocampus_optimization/optimizations/CA1_int_cAC_980120A_20180115155814/980120A_morph.jpeg",
                     "caption": "Model Morphology"
                  }
               ]
            }
         ]
      }

   :param model_uuid: UUID of the model to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model description successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _get_model_description_alias:

Get model description using alias
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/models/?alias=(string:alias)

   Retrieve model specific information from the model catalog using model's UUID

   **Example request**:

   .. sourcecode:: http

      GET /models/?alias=kali-freund-2004 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "models": [
            {
               "id": "2a050055-8ae4-47c7-a0d6-286f50a1463e",
               "name": "Kali_Freund",
               "alias": "kali-freund-2004",
               "author": "S. Kali, T.F. Freund",
               "app": {
                  "id": "41587",
                  "collab_id": 343
               },
               "organization": "<<empty>>",
               "private": false,
               "cell_type": "Pyramidal Cell",
               "model_type": "Single Cell",
               "brain_region": "Hippocampus",
               "species": "Rat (Rattus rattus)",
               "description": "A model of CA1 pyramidal neurons, as described in:\n\nS. Kali, T.F. Freund (2004) Dendritic processing in hippocampal pyramidal cells and its modulation by inhibitory interneurons. *Proceedings of the 2004 IEEE International Joint Conference on Neural Networks* [doi:10.1109/IJCNN.2004.1379985](http://doi.org/10.1109/IJCNN.2004.1379985)",
               "instances": [
                  {
                     "id": "fe009aa4-b3b7-4598-9935-75761b3ea0f4",
                     "version": "ef803269550cb350dd457191156c00e28d67b529",
                     "description": null,
                     "parameters": "{}",
                     "code_format": null,
                     "source": "https://github.com/apdavison/hippocampus_CA1_pyramidal"
                  },
                  {
                     "id": "6601bbf1-3e16-497c-85f8-0077f1403629",
                     "version": "a583351ea1ddc95506f5e04bcb93f0ffb69c972c*",
                     "description": null,
                     "parameters": "{}",
                     "code_format": null,
                     "source": "https://github.com/apdavison/hippocampus_CA1_pyramidal"
                  },
                  {
                     "id": "9dac6494-0e57-47ab-941f-eaddf449bf72",
                     "version": "a583351ea1ddc95506f5e04bcb93f0ffb69c972c",
                     "description": null,
                     "parameters": "{}",
                     "code_format": null,
                     "source": "https://github.com/apdavison/hippocampus_CA1_pyramidal"
                  }
               ],
               "images": []
            }
         ]
      }

   :param alias: alias of the model to be retrieved
   :reqheader Authorization: Bearer TOKEN
   :status 200: model description successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _list_model_descriptions:

List model descriptions that satisfy specified filters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/models/?(string:filters)

   Retrieve model descriptions satisfying specified filters

   **Example request**:

   .. sourcecode:: http

      GET /models/?brain_region=Cerebellum&model_type=Single+Cell HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "models": [
            {
               "id": "22dc8fd3-c62b-4e07-9e47-f5829e038d6d",
               "name": "Purkinje Cell 2015 Masoli et al (Generic Model)",
               "alias": "PC2015Masoli",
               "author": "Masoli S, Solinas S, D'Angelo E",
               "app": {
                  "id": "44190",
                  "collab_id": 5493
               },
               "organization": "HBP-SP6",
               "private": false,
               "cell_type": "Purkinje Cell",
               "model_type": "Single Cell",
               "brain_region": "Cerebellum",
               "species": "Other",
               "description": "This is a Python version...",
               "instances": [
                  {
                     "id": "16eddc49-3004-4526-a305-dbcc83e7f5c0",
                     "version": "0.0.0",
                     "description": null,
                     "parameters": null,
                     "code_format": null,
                     "source": "https://senselab.med.yale.edu/ModelDB/showmodel.cshtml?model=229585"
                  },
                  {
                     "id": "9514c8eb-f38f-4267-a17d-4ef85a48292d",
                     "version": "1.0.0",
                     "description": null,
                     "parameters": null,
                     "code_format": null,
                     "source": "https://github.com/lungsi/hbp-cerebellum-models"
                  }
               ],
               "images": []
            },
            {
               "id": "5da88475-79c9-43e8-a80e-fde84d3a3031",
               "name": "Granule Cell 2001 D'Angelo et al. (1ngle compartment model)",
               "alias": "GrC2001DAngelo",
               "author": "D'Angelo E, Nieus T, Maffei A, Armano S, Rossi P, Taglietti V, Fontana A, Naldi G",
               "app": {
                  "id": "44190",
                  "collab_id": 5493
               },
               "organization": "HBP-SP6",
               "private": false,
               "cell_type": "Granule Cell",
               "model_type": "Single Cell",
               "brain_region": "Cerebellum",
               "species": "Rat (Rattus rattus)",
               "description": "This is the single compartment model...",
               "instances": [
                  {
                     "id": "cd35c39e-5868-476c-ab70-3a07e3170e1e",
                     "version": "0.0.0",
                     "description": null,
                     "parameters": "",
                     "code_format": null,
                     "source": "https://senselab.med.yale.edu/modeldb/showModel.cshtml?model=46839"
                  }
               ],
               "images": []
            }
         ]
      }

   :param filters: key:value pairs specifying required filters
   :reqheader Authorization: Bearer TOKEN
   :status 200: model descriptions successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _register_new_model_description:

Register a new model description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/models/?app_id=(string:app_id)

   Register a new model description in the model catalog

   **Example request**:

   .. sourcecode:: http

      POST /models/?app_id=41550 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
      	"model": {
      		"name": "CA1_int_cNAC",
      		"alias": null,
      		"author": "Rosanna Migliore",
      		"organization": "HBP-SP6",
      		"private": "False",
      		"cell_type": "Interneuron",
      		"model_type": "Single Cell",
      		"brain_region": "Hippocampus",
      		"species": "Rat (Rattus rattus)",
      		"description": "Single cell model optimized using BluePyOpt"
      	},
      	"model_instance": [
      		{
      			"version": "1.0",
      			"description": "",
      			"parameters": "",
      			"code_format": "py, hoc, mod",
      			"source": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC.zip"
      		}
      	],
      	"model_image": [
      		{
      			"url": "https://github.com/lbologna/bsp_data_repository/optimizations/CA1_int_cNAC/970717D_morph.jpeg",
      			"caption": "Morphology"
      		}
      	]
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
          "uuid": "743f0df9-6811-466b-856e-d26db25dd272"
      }

   :param app_id: navigation ID of the host model catalog app
   :reqheader Authorization: Bearer TOKEN
   :status 201: model description successfully created
   :status 400: incorrect API call
   :status 403: invalid token provided


.. _edit_existing_model_description:

Edit an existing model description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/models/?app_id=(string:app_id)

   Edit an existing model description in the model catalog

   **Example request**:

   .. sourcecode:: http

      PUT /models/?app_id=41550 HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
      	"models": [
      		{
      			"id": "743f0df9-6811-466b-856e-d26db25dd272",
      			"name": "CA1_int_cNAC_BluePyOpt",
      			"alias": "CA1_int_cNAC_BluePyOpt",
      			"author": "Rosanna Migliore",
      			"organization": "Other",
      			"private": "False",
      			"cell_type": "Interneuron",
      			"model_type": "Single Cell",
      			"brain_region": "Hippocampus",
      			"species": "Rat (Rattus rattus)",
      			"description": "Model optimized using BluePyOpt"
      		}
      	]
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
          "uuid": "743f0df9-6811-466b-856e-d26db25dd272"
      }

   :param app_id: navigation ID of the host model catalog app
   :reqheader Authorization: Bearer TOKEN
   :status 202: model description successfully updated
   :status 400: incorrect API call
   :status 403: invalid token provided

   .. note::
      Does not allow editing details of model instances and images (figures). Will be implemented later, if required.
      Currently this can be done via separate APIs for model instances and images.
