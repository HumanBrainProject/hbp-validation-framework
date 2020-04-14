from fairgraph.brainsimulation import ModelProject, ValidationTestDefinition


def build_model_project_filters(alias, id, name, brain_region, species,
                                cell_type, model_scope, abstraction_level,
                                author, owner, organization, project_id,
                                private):
    context = {
        "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
        "schema": "http://schema.org/"
    }
    filter_query = {
        "op": "and",
        "value": []
    }
    # todo: handle filter by id
    for value, path in (
        #(id, "@id"),  # does this work?
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


def build_validation_test_filters(alias, id, name, status, brain_region, species, cell_type,
                                  data_type, data_modality, test_type, score_type, author):
    context = {
        "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
        "schema": "http://schema.org/"
    }
    filter_query = {
        "op": "and",
        "value": []
    }
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
        (author, "schema:author / schema:familyName")
    ):
        if value is not None and len(value) > 0:
            filter_query["value"].append({"path": path, "op": "in", "value": value})
    return filter_query, context


def model_alias_exists(alias, client):
    model_with_same_alias = ModelProject.from_alias(alias, client, api="nexus")
    return bool(model_with_same_alias)


def test_alias_exists(alias, client):
    test_with_same_alias = ValidationTestDefinition.from_alias(alias, client, api="nexus")
    return bool(test_with_same_alias)