#############
Miscellaneous
#############

.. _misc_get_config_model_catalog_app:

Get Configuration of Model Catalog App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/parametersconfiguration-model-catalog/parametersconfigurationrest/?app_id=(string:app_id)

   Gets the current filter configuration of a specific model catalog app

   **Example request**:

   .. sourcecode:: http

      GET /parametersconfiguration-model-catalog/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "param": [
            {
               "id": "80841",
               "app_type": "model_catalog",
               "collab_id": 5165,
               "data_modalities": "",
               "test_type": "",
               "species": "Mouse (Mus musculus)",
               "brain_region": "Basal Ganglia,Hippocampus",
               "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
               "model_type": "Single Cell,Network",
               "organization": "HBP-SP6"
            }
         ]
      }

   :param app_id: navigation ID of the app inside the Collab
   :reqheader Authorization: Bearer TOKEN
   :status 200: configuration successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_initial_config_model_catalog_app:

Initial Configuration of Model Catalog App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/parametersconfiguration-model-catalog/parametersconfigurationrest/?app_id=(string:app_id)

   Configure the filters of a specific model catalog app that is presently unconfigured (e.g. new instance of app)

   **Example request**:

   .. sourcecode:: http

      POST /parametersconfiguration-model-catalog/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
         "id": 80841,
         "data_modalities": "",
         "test_type": "",
         "species": "Mouse (Mus musculus)",
         "brain_region": "Basal Ganglia,Hippocampus",
         "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
         "model_type": "Single Cell,Network",
         "organization": "HBP-SP6",
         "app_type": "model_catalog",
         "collab_id": 5165
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
         "uuid":80841
      }

   :param app_id: navigation ID of the app inside the Collab
   :json string key: key value pairs
   :reqheader Authorization: Bearer TOKEN
   :status 201: app successfully configured
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_reconfig_model_catalog_app:

Reconfiguration of Model Catalog App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/parametersconfiguration-model-catalog/parametersconfigurationrest/?app_id=(string:app_id)

   Reconfigure the filters of a specific model catalog app that has previously been configured

   **Example request**:

   .. sourcecode:: http

      PUT /parametersconfiguration-model-catalog/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
         "id": 80841,
         "data_modalities": "",
         "test_type": "",
         "species": "Mouse (Mus musculus)",
         "brain_region": "Basal Ganglia,Hippocampus",
         "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
         "model_type": "Single Cell,Network",
         "organization": "HBP-SP6",
         "app_type": "model_catalog",
         "collab_id": 5165
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
         "uuid":80841
      }

   :param app_id: navigation ID of the app inside the Collab
   :json string key: key value pairs
   :reqheader Authorization: Bearer TOKEN
   :status 202: app successfully reconfigured
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_get_config_validation_app:

Get Configuration of Validation Framework App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/parametersconfiguration-validation-app/parametersconfigurationrest/?app_id=(string:app_id)

   Gets the current filter configuration of a specific validation framework app

   **Example request**:

   .. sourcecode:: http

      GET /parametersconfiguration-validation-app/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "param": [
            {
               "id": "80839",
               "app_type": "validation_app",
               "collab_id": 5165,
               "data_modalities": "electrophysiology",
               "test_type": "single cell activity,network structure",
               "species": "Mouse (Mus musculus)",
               "brain_region": "Basal Ganglia,Hippocampus",
               "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
               "model_type": "Single Cell,Network",
               "organization": "HBP-SP6"
            }
         ]
      }

   :param app_id: navigation ID of the app inside the Collab
   :reqheader Authorization: Bearer TOKEN
   :status 200: configuration successfully retrieved
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_initial_config_validation_app:

Initial Configuration of Validation Framework App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:post:: https://validation-v1.brainsimulation.eu/parametersconfiguration-validation-app/parametersconfigurationrest/?app_id=(string:app_id)

   Configure the filters of a specific validation framework app that is presently unconfigured (e.g. new instance of app)

   **Example request**:

   .. sourcecode:: http

      POST /parametersconfiguration-validation-app/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
         "id": 80839,
         "app_type": "validation_app",
         "collab_id": 5165,
         "data_modalities": "electrophysiology",
         "test_type": "single cell activity,network structure",
         "species": "Mouse (Mus musculus)",
         "brain_region": "Basal Ganglia,Hippocampus",
         "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
         "model_type": "Single Cell,Network",
         "organization": "HBP-SP6"
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 201 Created
      Content-Type: application/json

      {
         "uuid":80839
      }

   :param app_id: navigation ID of the app inside the Collab
   :json string key: key value pairs
   :reqheader Authorization: Bearer TOKEN
   :status 201: app successfully configured
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_reconfig_validation_app:

Reconfiguration of Validation Framework App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:put:: https://validation-v1.brainsimulation.eu/parametersconfiguration-validation-app/parametersconfigurationrest/?app_id=(string:app_id)

   Reconfigure the filters of a specific validation framework app that has previously been configured

   **Example request**:

   .. sourcecode:: http

      PUT /parametersconfiguration-validation-app/parametersconfigurationrest/ HTTP/1.1
      Accept: application/json
      Authorization: Bearer TOKEN
      Content-Type: application/json
      Host: validation-v1.brainsimulation.eu

      {
         "id": 80839,
         "app_type": "validation_app",
         "collab_id": 5165,
         "data_modalities": "electrophysiology",
         "test_type": "single cell activity,network structure",
         "species": "Mouse (Mus musculus)",
         "brain_region": "Basal Ganglia,Hippocampus",
         "cell_type": "Pyramidal Cell,Medium spiny neuron,Fast spiking interneuron",
         "model_type": "Single Cell,Network",
         "organization": "HBP-SP6"
      }

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 202 Accepted
      Content-Type: application/json

      {
         "uuid":80839
      }

   :param app_id: navigation ID of the app inside the Collab
   :json string key: key value pairs
   :reqheader Authorization: Bearer TOKEN
   :status 202: app successfully reconfigured
   :status 400: incorrect API call
   :status 403: invalid Oauth2 token provided


.. _misc_get_valid_attribute_values:

Get Valid Attribute Values
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. http:get:: https://validation-v1.brainsimulation.eu/authorizedcollabparameterrest/?python_client=true&parameters=(string:attribute_name)&format=json

   Retrieves the list of valid values for either a specified attribute or all attributes

   **Example request**:

   .. sourcecode:: http

      GET /authorizedcollabparameterrest/?python_client=true&parameters=cell_type&format=json HTTP/1.1
      Accept: application/json, text/plain, */*
      Authorization: Bearer TOKEN
      Host: validation-v1.brainsimulation.eu

   **Example response**:

   .. sourcecode:: http

      HTTP/1.1 200 OK
      Content-Type: application/json

      {
         "cell_type": [
            "Granule Cell",
            "Interneuron",
            "Pyramidal Cell",
            "Other",
            "Purkinje Cell",
            "Golgi Cell",
            "Medium spiny neuron",
            "Spiny stellate neuron",
            "Fast spiking interneuron",
            "Medium spiny neuron (D1 type)",
            "Medium spiny neuron (D2 type)",
            "Not applicable",
            "L1 Neurogliaform cell",
            "L2 Inverted pyramidal cell",
            "L2/3 Chandelier cell",
            "L4 Martinotti cell",
            "L5 Tufted pyramidal cell",
            "L6 Inverted pyramidal cell",
            "Cholinergic interneuron",
            "L2/3 Pyramidal cell"
         ]
      }

   :param attribute_name: required attribute name or `all` for every attribute
   :type attribute_name: string
   :reqheader Authorization: Bearer TOKEN
   :status 200: values successfully retrieved
