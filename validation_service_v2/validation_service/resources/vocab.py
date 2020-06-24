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
    ValidationTestType,
    ScoreType,
    ImplementationStatus,
    License,
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
    return [item.value for item in ValidationTestType]


@router.get("/vocab/score-type/")
def list_score_types():
    return [item.value for item in ScoreType]


@router.get("/vocab/test-status/")
def list_implementation_status_values():
    return [item.value for item in ImplementationStatus]


class LicenseFilterOptions(str, Enum):
    popular = "popular"
    all = "all"


popular_licenses = [
    "Apache License 2.0",
    'BSD 2-Clause "Simplified" License',
    'BSD 3-Clause "New" or "Revised" License',
    "Creative Commons Attribution 4.0 International",
    "Creative Commons Attribution Non Commercial 4.0 International",
    "Creative Commons Attribution Share Alike 4.0 International",
    "Creative Commons Zero v1.0 Universal",
    "GNU General Public License v2.0 or later",
    "GNU General Public License v3.0 or later",
    "GNU Lesser General Public License v3.0 or later",
    "MIT License"
]


@router.get("/vocab/license/")
def list_licenses(
    filter: LicenseFilterOptions = Query(None, description="Return all licenses or only the most popular ones"),
):
    if filter == LicenseFilterOptions.popular:
        return popular_licenses
    else:
        return [item.value for item in License]


@router.get("/vocab/")
def all_vocabularies():
    return {
        "brain-region": [item.value for item in BrainRegion],
        "species": [item.value for item in Species],
        "model-scope": [item.value for item in ModelScope],
        "cell-type": [item.value for item in CellType],
        "abstraction-level": [item.value for item in AbstractionLevel],
        "recording-modality": [item.value for item in RecordingModality],
        "test-type": [item.value for item in ValidationTestType],
        "score-type": [item.value for item in ScoreType],
        "test-status": [item.value for item in ImplementationStatus],
        "license": popular_licenses,
    }
