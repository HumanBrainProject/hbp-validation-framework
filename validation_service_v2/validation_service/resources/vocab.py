"""
Controlled vocabulatories
"""

from fastapi import APIRouter

from ..data_models import (Species, BrainRegion, CellType, ModelScope, AbstractionLevel,
                           RecordingModality, ValidationTestType, ScoreType, ImplementationStatus)


router = APIRouter()

@router.get("/brain-region/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@router.get("/species/")
def list_species():
    return [item.value for item in Species]


@router.get("/model-scope/")
def list_model_scopes():
    return [item.value for item in ModelScope]


@router.get("/cell-type/")
def list_cell_types():
    return [item.value for item in CellType]


@router.get("/abstraction-level/")
def list_abstraction_levels():
    return [item.value for item in AbstractionLevel]


@router.get("/recording-modality/")
def list_recording_modalities():
    return [item.value for item in RecordingModality]


@router.get("/test-type/")
def list_test_types():
    return [item.value for item in ValidationTestType]


@router.get("/score-type/")
def list_score_types():
    return [item.value for item in ScoreType]


@router.get("/test-status/")
def list_implementation_status_values():
    return [item.value for item in ImplementationStatus]
