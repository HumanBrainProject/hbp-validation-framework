"""
Controlled vocabulatories
"""

from enum import Enum
from fastapi import APIRouter, Query

from ..data_models import (
    Species,
    BrainRegion,
    CellType,
    ModelScope,
    AbstractionLevel,
    RecordingModality,
    ScoreType,
    ImplementationStatus,
    License,
    ContentType
)


router = APIRouter()


@router.get("/vocab/brain-region/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@router.get("/vocab/species/")
def list_species():
    return [item.value for item in Species]


@router.get("/vocab/model-scope/")
def list_model_scopes():
    return [item.value for item in ModelScope]


@router.get("/vocab/cell-type/")
def list_cell_types():
    return [item.value for item in CellType]


@router.get("/vocab/abstraction-level/")
def list_abstraction_levels():
    return [item.value for item in AbstractionLevel]


@router.get("/vocab/recording-modality/")
def list_recording_modalities():
    return [item.value for item in RecordingModality]


@router.get("/vocab/test-type/")
def list_test_types():
    return [item.value for item in ModelScope]


@router.get("/vocab/score-type/")
def list_score_types():
    return [item.value for item in ScoreType]


@router.get("/vocab/implementation-status/")
def list_implementation_status_values():
    return [item.value for item in ImplementationStatus]


class ContentTypeFilterOptions(str, Enum):
    models = "models"
    all = "all"


model_content_types = [
  "application/json",
  "application/ld+json",
  "application/octet-stream",
  "application/sbml+xml",
  "application/vnd.arbor-simulator+python",
  "application/vnd.bbp.bluron",
  "application/vnd.bbp.simulation.blueconfig",
  "application/vnd.bluebrainproject.bluepyopt",
  "application/vnd.commonworkflowlanguage.cmdline",
  "application/vnd.commonworkflowlanguage.workflow",
  "application/vnd.mathworks.live-script+zip",
  "application/vnd.ms-excel",
  "application/vnd.nest-simulator+python",
  "application/vnd.neuralensemble.pynn",
  "application/vnd.neuroml",
  "application/vnd.neuron-simulator+hoc",
  "application/vnd.neuron-simulator+python",
  "application/vnd.neuron.mod",
  "application/vnd.nineml",
  "application/vnd.sciunit.model",
  "application/vnd.sciunit.test",
  "application/vnd.snakemake.snakefile",
  "application/vnd.sonata",
  "application/vnd.sonata.nest",
  "application/vnd.sonata.neuron",
  "application/vnd.sonata.pynn",
  "application/vnd.thevirtualbrain",
  "application/vnd.thevirtualbrain.metadata+tsv",
  "application/vnd.x-matlab-data",
  "application/x-ipynb+json",
  "application/xml",
  "application/yaml",
  "application/zip",
  "text/plain",
  "text/x-matlab",
  "text/x-python",
  "text/x-python.2",
  "text/x-python.3",
]


@router.get("/vocab/content-type/")
def list_content_type_values(
    filter: ContentTypeFilterOptions = Query(
        None, description="Return all content types or only those applicable to computational models"
    ),
):
    if filter == ContentTypeFilterOptions.models:
        return model_content_types
    else:
        return [item.value for item in ContentType]


class LicenseFilterOptions(str, Enum):
    popular = "popular"
    all = "all"


popular_licenses = [
    "Apache License, Version 2.0",
    "The 2-Clause BSD License",
    "The 3-Clause BSD License",
    "Creative Commons Attribution 4.0 International",
    "Creative Commons Attribution-NonCommercial 4.0 International",
    "Creative Commons Attribution-ShareAlike 4.0 International",
    "Creative Commons Zero 1.0 Universal",
    "GNU General Public License v2.0 or later",
    "GNU General Public License v3.0 or later",
    "GNU Lesser General Public License v3.0 or later",
    "The MIT license",
]


@router.get("/vocab/license/")
def list_licenses(
    filter: LicenseFilterOptions = Query(
        None, description="Return all licenses or only the most popular ones"
    ),
):
    if filter == LicenseFilterOptions.popular:
        return popular_licenses
    else:
        return [item.value for item in License]


@router.get("/vocab/")
def all_vocabularies():
    return {
        "brain_region": [item.value for item in BrainRegion],
        "species": [item.value for item in Species],
        "model_scope": [item.value for item in ModelScope],
        "cell_type": [item.value for item in CellType],
        "abstraction_level": [item.value for item in AbstractionLevel],
        "recording_modality": [item.value for item in RecordingModality],
        "test_type": [item.value for item in ModelScope],
        "score_type": [item.value for item in ScoreType],
        "implementation_status": [item.value for item in ImplementationStatus],
        "license": popular_licenses,
        "content_type": model_content_types
    }
