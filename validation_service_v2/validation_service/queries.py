from itertools import chain
from fairgraph.brainsimulation import (
    ModelProject,
    ValidationTestDefinition,
    ValidationScript,
    ModelInstance,
    MEModel,
)


def build_model_project_filters(
    alias,
    id,
    name,
    brain_region,
    species,
    cell_type,
    model_scope,
    abstraction_level,
    author,
    owner,
    organization,
    project_id,
    private,
):
    context = {
        "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
        "schema": "http://schema.org/",
    }
    filter_query = {"op": "and", "value": []}
    # todo: handle filter by id
    for value, path in (
        # (id, "@id"),  # does this work?
        (alias, "nsg:alias"),
        (name, "schema:name"),
        (brain_region, "nsg:brainRegion / rdfs:label"),
        (species, "nsg:species / rdfs:label"),
        (cell_type, "nsg:celltype / rdfs:label"),
        (model_scope, "nsg:modelOf / rdfs:label"),
        (abstraction_level, "nsg:abstractionLevel / rdfs:label"),
        (author, "schema:author / schema:familyName"),
        (owner, "nsg:owner / schema:familyName"),
        (organization, "nsg:organization / schema:name"),
        (project_id, "nsg:collabID"),
    ):
        if value is not None and len(value) > 0:
            filter_query["value"].append({"path": path, "op": "in", "value": value})
    if private is not None:
        filter_query["value"].append({"path": "nsg:private", "op": "eq", "value": private})
    return filter_query, context


def build_validation_test_filters(
    alias,
    id,
    name,
    status,
    brain_region,
    species,
    cell_type,
    data_type,
    data_modality,
    test_type,
    score_type,
    author,
):
    context = {
        "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
        "schema": "http://schema.org/",
    }
    filter_query = {"op": "and", "value": []}
    for value, path in (
        (alias, "nsg:alias"),
        (name, "schema:name"),
        (status, "nsg:status"),
        (brain_region, "nsg:brainRegion / rdfs:label"),
        (species, "nsg:species / rdfs:label"),
        (cell_type, "nsg:celltype / rdfs:label"),
        (data_type, "nsg:dataType"),
        (data_modality, "nsg:recordingModality"),
        (test_type, "nsg:testType"),
        (score_type, "nsg:scoreType"),
        (author, "schema:author / schema:familyName"),
    ):
        if value is not None and len(value) > 0:
            filter_query["value"].append({"path": path, "op": "in", "value": value})
    return filter_query, context


def get_full_uri(kg_types, uuid, client):
    if not isinstance(kg_types, (list, tuple)):
        kg_types = [kg_types]
    uris = [kg_type.uri_from_uuid(uuid, client) for kg_type in kg_types]
    return uris


def build_result_filters(
    model_instance_id,
    test_instance_id,
    model_id,
    test_id,
    model_alias,
    test_alias,
    score_type,
    passed,
    project_id,
    kg_client,
):
    context = {
        "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
        "schema": "http://schema.org/",
        "dcterms": "http://purl.org/dc/terms/",
    }
    filter_query = {"op": "and", "value": []}

    if model_instance_id is not None:
        model_instance_id = list(
            chain(
                get_full_uri([ModelInstance, MEModel], uuid, kg_client)
                for uuid in model_instance_id
            )
        )
    if test_instance_id is not None:
        test_instance_id = list(
            chain(get_full_uri(ValidationScript, uuid, kg_client) for uuid in test_instance_id)
        )
    if model_id is not None:
        model_id = list(chain(get_full_uri(ModelProject, uuid, kg_client) for uuid in model_id))
    if test_id is not None:
        test_id = list(
            chain(get_full_uri(ValidationTestDefinition, uuid, kg_client) for uuid in test_id)
        )

    for value, path in (
        (model_instance_id, "prov:wasGeneratedBy / prov:used"),
        (test_instance_id, "prov:wasGeneratedBy / prov:used"),
        (model_id, "prov:wasGeneratedBy / prov:used / ^dcterms:hasPart"),
        (test_id, "prov:wasGeneratedBy / prov:used / nsg:implements"),
        (model_alias, "prov:wasGeneratedBy / prov:used / ^dcterms:hasPart / nsg:alias"),
        (test_alias, "prov:wasGeneratedBy / prov:used / nsg:implements / nsg:alias"),
        (score_type, "prov:wasGeneratedBy / prov:used / nsg:implements / nsg:scoreType"),
        (passed, "nsg:passedValidation"),
        (project_id, "nsg:collabID"),
    ):
        if value is not None and len(value) > 0:
            filter_query["value"].append({"path": path, "op": "in", "value": value})
    return filter_query, context


def model_alias_exists(alias, client):
    if alias:
        model_with_same_alias = ModelProject.from_alias(alias, client, api="nexus")
        return bool(model_with_same_alias)
    return False


def test_alias_exists(alias, client):
    test_with_same_alias = ValidationTestDefinition.from_alias(alias, client, api="nexus")
    return bool(test_with_same_alias)
