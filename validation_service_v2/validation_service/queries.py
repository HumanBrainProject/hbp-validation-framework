from itertools import chain
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp

from .data_models import term_cache, Species, BrainRegion, CellType, ModelScope, AbstractionLevel

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
    organization
):
    filter_query = {
        "study_targets": []
    }
    if id:
        filter_query["@id"] = id
    if alias:
        filter_query["alias"] = alias
    if name:
        filter_query["name"] = name
    if species:
        filter_query["study_targets"].extend(
            term_cache["Species"]["names"][name] for name in species)
    if brain_region:
        filter_query["study_targets"].extend(
            term_cache["UBERONParcellation"]["names"][name] for name in brain_region)
    if cell_type:
        filter_query["study_targets"].extend(
            term_cache["CellType"]["names"][name] for name in cell_type)
    if model_scope:
        filter_query["model_scope"] = term_cache["ModelScope"]["names"][model_scope].id
    if abstraction_level:
        filter_query["abstraction_level"] = term_cache["AbstractionLevel"]["names"][model_scope].id
    if author:
        pass
        #filter_query["developers"] = # TODO: need to first query Person, then use the ids here, or we write a custom query
    if owner:
        pass
    if organization:
        pass
    if len(filter_query["study_targets"]) == 0:
        filter_query.pop("study_targets")
    return filter_query


def build_validation_test_filters(
    alias,
    id,
    name,
    implementation_status,
    brain_region,
    species,
    cell_type,
    data_type,
    recording_modality,
    test_type,
    score_type,
    author,
):
    filter_query = {
        "study_targets": []
    }
    if id:
        filter_query["@id"] = id
    if alias:
        filter_query["alias"] = alias
    if name:
        filter_query["name"] = name
    if species:
        filter_query["study_targets"].extend(
            term_cache["Species"]["names"][name] for name in species)
    if brain_region:
        filter_query["study_targets"].extend(
            term_cache["UBERONParcellation"]["names"][name] for name in brain_region)
    if cell_type:
        filter_query["study_targets"].extend(
            term_cache["CellType"]["names"][name] for name in cell_type)
    if implementation_status:
        raise NotImplementedError()
    if data_type:
        filter_query["data_type"] = term_cache["ContentType"]["names"][data_type].id
    if recording_modality:
        filter_query["data_type"] = term_cache["Technique"]["names"][data_type].id
    if test_type:
        raise NotImplementedError()
    if score_type:
        filter_query["score_type"] = term_cache["MeasureType"]["names"][data_type].id
    if author:
        pass
        #filter_query["developers"] = # TODO: need to first query Person, then use the ids here, or we write a custom query
    if len(filter_query["study_targets"]) == 0:
        filter_query.pop("study_targets")
    return filter_query


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
    raise NotImplementedError("Not yet migrated")
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
    # todo: fix this to consider spaces
    # we probably can't check for global uniqueness across spaces, but we
    # can check in the "model" space, plus the space defined by the current project_id

    # there would then have to be a check by curators when moving a private model
    # to "model" and releasing it
    if alias:
        model_with_same_alias = omcore.Model.from_alias(alias, client, space="model", scope="in progress")
        return bool(model_with_same_alias)
    return False


def test_alias_exists(alias, client):
    if alias:
        kg_space = "collab-model-validation"  # for development, to fix
        test_with_same_alias = omcmp.ValidationTest.from_alias(alias, client, space=kg_space, scope="in progress")
        if test_with_same_alias:
            # need this check because alias query doesn't do exact matching
            return test_with_same_alias.alias == alias
    return False
