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
        filter_query["score_type"] = term_cache["DifferenceMeasure"]["names"][data_type].id
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
    kg_client,
):
    filter_query = {}

    inputs = []
    if model_instance_id is not None:
        inputs.extend(model_instance_id)
    if test_instance_id is not None:
        inputs.extend(test_instance_id)
    if inputs:
        filter_query["inputs"] = inputs
    if model_id is not None:
        pass
    if test_id is not None:
        pass
    if model_alias is not None:
        pass
    if test_alias is not None:
        pass
    if score_type is not None:
        pass
    if passed is not None:
        pass

    return filter_query


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
