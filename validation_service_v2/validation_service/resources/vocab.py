"""
Controlled vocabulatories
"""

from fastapi import APIRouter

from ..data_models import (Species, BrainRegion, CellType, ModelScope, AbstractionLevel,
                           RecordingModality, ValidationTestType, ScoreType, ImplementationStatus)


router = APIRouter()

@router.get("/brain-regions/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@router.get("/species/")
def list_species():
    return [item.value for item in Species]


@router.get("/model-scopes/")
def list_model_scopes():
    return [item.value for item in ModelScope]


@router.get("/cell-types/")
def list_cell_types():
    return [item.value for item in CellType]


@router.get("/abstraction-levels/")
def list_abstraction_levels():
    return [item.value for item in AbstractionLevel]


@router.get("/recording-modalities/")
def list_recording_modalities():
    return [item.value for item in RecordingModality]


@router.get("/test-types/")
def list_test_types():
    return [item.value for item in ValidationTestType]


@router.get("/score-types/")
def list_score_types():
    return [item.value for item in ScoreType]


@router.get("/test-status-values/")
def list_implementation_status_values():
    return [item.value for item in ImplementationStatus]
