.. Validation Framework REST APIs documentation master file, created by
   sphinx-quickstart on Fri Mar 30 10:20:09 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Validation Framework REST API documentation
======================================================

General Info
------------

* Collabs on the HBP Collaboratory can be either public or private. Public
  Collabs can be accessed by all registered users, whereas private Collabs
  require the user to be granted permission for access.

* The *Model Catalog* and the *Validation Framework* apps can be added to any
  Collab. A Collab may have multiple instances of these apps. The apps require
  to be *configured* by setting the provided filters appropriately before they
  can be used. These filters restrict the type of data displayed in that particular
  instance of the app.

* All tests are public, i.e. every test registered on the *Validation Framework*
  can be seen by all users.

* Models are created inside specific Collab instances of the *Model Catalog* app.
  The particular app inside which a model was created is termed its *host app*.
  Similarly, the Collab containing the *host app* is termed the *host Collab*.

* Models can be set as public/private. If public, the model and its associated
  results are available to all users. If private, it can only be seen by users who
  have access to the *host Collab*. See table below for summary of access privileges.

* No information can be deleted from the *Model Catalog* and *Validation Framework*
  apps. In future, an option to *hide* data would be implemented. This would offer
  users functionality similar to deleting, but with the data being retained in the
  database back-end.

* Models, model instances, tests and test instances can be edited as long as
  there are no results associated with them. Results can never be edited!

  .. raw:: html

    <div>
    <style type="text/css">
    .tg  {border-collapse:collapse;border-spacing:0;}
    .tg td{font-family:Arial, sans-serif;font-size:14px;padding:11px 8px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:11px 8px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
    .tg .tg-6v17{font-weight:bold;font-size:14px;background-color:#d6eebe;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-ynlj{font-size:14px;background-color:#ffffff;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-5jl3{font-style:italic;font-size:14px;background-color:#c3b696;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-iu76{font-weight:bold;font-size:18px;background-color:#ffce93;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-7xg9{font-weight:bold;font-style:italic;font-size:16px;background-color:#ffffc7;border-color:inherit;text-align:center;vertical-align:top}
    .tg .tg-ecuv{font-weight:bold;font-size:18px;background-color:#ffce93;border-color:inherit;text-align:center}
    </style>
    <table class="tg">
      <tr>
        <th class="tg-c3ow" colspan="2" rowspan="3"></th>
        <th class="tg-iu76" colspan="6">Collab (Private/Public)</th>
      </tr>
      <tr>
        <td class="tg-7xg9" colspan="3">Collab Member</td>
        <td class="tg-7xg9" colspan="3">Not Collab Member</td>
      </tr>
      <tr>
        <td class="tg-5jl3">View (GET)</td>
        <td class="tg-5jl3">Create (POST)</td>
        <td class="tg-5jl3">Edit (PUT)</td>
        <td class="tg-5jl3">View (GET)</td>
        <td class="tg-5jl3">Create (POST)</td>
        <td class="tg-5jl3">Edit (PUT)</td>
      </tr>
      <tr>
        <td class="tg-ecuv" rowspan="2">Model</td>
        <td class="tg-7xg9">Private</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-ynlj">No</td>
        <td class="tg-ynlj">No</td>
        <td class="tg-ynlj">No</td>
      </tr>
      <tr>
        <td class="tg-7xg9">Public</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-6v17">Yes</td>
        <td class="tg-ynlj">No</td>
        <td class="tg-ynlj">No</td>
      </tr>
    </table>
    </div>


REST APIs
---------

The HBP validation framework offers the below described APIs.
These can be accessed through the following base URL: https://validation-v1.brainsimulation.eu

.. toctree::
   :maxdepth: 2

   models
   model_instances
   model_images
   tests
   test_instances
   results
   misc
