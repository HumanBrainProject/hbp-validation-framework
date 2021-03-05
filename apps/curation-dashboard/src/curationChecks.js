import { classifyCodeLocation } from "./utils";

const MIN_NAME_LENGTH = 15
const MIN_DESCRIPTION_LENGTH = 300
const VALID_CODE_LOCATIONS = [
    "CSCS", "Github", "ModelDB", "BioModels", "Zenodo"
]
const VALID_LICENSES = [
    // todo: clean the model catalog up, so one licence has one name
    "BSD",
    "MIT",
    "Creative Commons Attribution 4.0 International",
    "CC BY",
    "Creative Commons Attribution Share Alike 4.0 International",
    "Apache License 2.0",
    "BSD 3-Clause",
    "Creative Commons Attribution 4.0 International",
    "MIT License",
    "GNU General Public License v2.0 or later",
    "GPL-3.0",
    "Creative Commons Attribution 4.0",
    "BSD 2-clause",
    "GPL-3.0",
    "LGPL-3.0",
    "CC BY-NC-ND",
    "Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
    "GPLv2/GPLv3",
    "Creative Commons Attribution Non Commercial Share Alike 4.0 International",
    "GNU General Public License v3.0",
    "GNU General Public License v3",
    "GNU General Public License, Version 2",
    "Apache License, Version 2.0"
]

function checkAccessibility(model) {
    // The entry must be set to public.
    return {
        passed: !model.private,
        error: model.private ? "model is private" : ""
    }
}

function checkName(model) {
    // "should be descriptive and unique"
    // difficult to automatically check "descriptive"
    // todo: check it is unique (possibly the API takes care of this anyway? - to check)
    let response = {
        passed: true,
        error: ""
    };
    if (model.name.length < MIN_NAME_LENGTH) {
        response.passed = false;
        response.error = `model name is too short - should be at least ${MIN_NAME_LENGTH} characters`;
    }
    return response;
}

function _checkPersonNames(personList) {
    // "if there is an associated article, the author lists should in general match"
    // ^ this is difficult to check. We could possibly check that they have at least one author in common
    let response = {
        passed: true,
        error: ""
    };
    for (const person of personList) {
        if (person.given_name.length === 0 || person.family_name.length === 0) {
            response.passed = false;
            response.error = "at least one author/custodian name is incomplete";
            break
        }
    }
    return response;
}

function checkAuthors(model) {
    if (model.author) {
        return _checkPersonNames(model.author);
    } else {
        return {
            passed: false,
            error: "author field is empty"
        };
    }
}

function checkCustodians(model) {
    // in general, the corresponding authors
    // ^again, vague and difficult to check automatically
    if (model.owner) {
        return _checkPersonNames(model.owner);
    } else {
        return {
            passed: false,
            error: "owner field is empty"
        };
    }
}

function checkSpecies(model) {
    let response = {
        passed: true,
        error: ""
    };
    // species must be present if brain region is specified
    if (model.brain_region && !model.species) {
        response.passed = false;
        response.error = "model entry specifies brain region but not species";
    }
    return response;
}

function checkBrainRegion(model) {
    let response = {
        passed: true,
        error: ""
    };
    // brain region must be present if cell type is specified
    if (model.cell_type && !model.brain_region) {
        response.passed = false;
        response.error = "model entry specifies cell type but not brain region";
    }
    return response;
}

function checkCellType(model) {
    let response = {
        passed: true,
        error: ""
    };
    if (!model.cell_type && model.model_scope === "single cell") {
        response.passed = false;
        response.error = "model scope is single cell, but cell type is not specified";
    }
    return response;
}

function checkAbstractionLevel(model) {
    let response = {
        passed: true,
        error: ""
    };
    if (!model.abstraction_level) {
        response.passed = false;
        response.error = "model abstraction level is not specified";
    }
    return response;

}

function checkModelScope(model) {
    let response = {
        passed: true,
        error: ""
    };
    if (!model.model_scope) {
        response.passed = false;
        response.error = "model scope is not specified";
    }
    return response;

}

function checkDescription(model) {
    // "The description should be similar in length to a conference abstract,
    //  and should contain information about the purpose and structure of the model,
    //  links to any associated publications,
    //  and either information about how to run simulations with the model,
    //  or a link to a document where this is explained.""
    // The above is difficult to check automatically
    let response = {
        passed: true,
        error: ""
    };
    if (model.description.length < MIN_DESCRIPTION_LENGTH) {
        response.passed = false;
        response.error = `model description is too short - should be at least ${MIN_DESCRIPTION_LENGTH} characters`;
    }
    return response;
}


function checkCodeLocation(modelInstance) {
    // code location - URL to a copy of the code/data that define the model.
    // This copy must be in a persistent repository (see below), and the curator
    // must check the link works for downloading the code/data.
    let response = {
        passed: true,
        error: ""
    };
    const codeLocation = classifyCodeLocation(modelInstance.source);
    if (codeLocation) {
        if (!VALID_CODE_LOCATIONS.includes(codeLocation)) {
            response.passed = false;
            response.error = "code location not recognized as suitable for archival purposes";
        }
    } else {
        response.passed = false;
        response.error = "code location is missing";
    }
    return response;
}

function checkVersion(modelInstance) {
    // todo: If the code is in Github, the version must match a commit id, tag, or release.
    let response = {
        passed: true,
        error: ""
    };
    if (!modelInstance.version) {
        response.passed = false;
        response.error = "version identifier is missing";
    }
    // todo: check Github tags match
    return response;
}

function checkLicence(modelInstance) {
    // must be a Creative Commons licence or an OSI-approved licence
    let response = {
        passed: true,
        error: ""
    };
    //console.log(`checking license ${modelInstance.license}`);
    if (modelInstance.license) {
        if (!VALID_LICENSES.includes(modelInstance.license)) {
            response.passed = false;
            response.error = "code does not have a suitable license";
        }
    } else {
        response.passed = false;
        response.error = "code does not have a license";
    }
    return response;

}

function checkModelInstances(model) {
    //  The model must have at least one version
    let checks = [];
    model.instances.forEach((modelInstance) => {
        let check = {
            codeLocation: checkCodeLocation(modelInstance),
            version: checkVersion(modelInstance),
            license: checkLicence(modelInstance)
        };
        let nFailures = 0;
        for (const field of ["codeLocation", "version", "license"]) {
            if (!check[field].passed) {
                nFailures += 1;
            }
        }
        check.nFailures = nFailures;
        checks.push(check);
    });
    // if there are no modelInstances, add a failed checks
    if (checks.length < 1) {
        checks.push({
            codeLocation: {passed: false, error: "model has no implementation"},
            version: {passed: false, error: "model has no implementation"},
            license: {passed: false, error: "model has no implementation"},
            nFailures: 3
        })
    }
    // sort checks based on number of failures
    let checkWithFewestFailures = {};
    let fewestFailures = 4;
    for (const check of checks) {
        if (check.nFailures < fewestFailures) {
            checkWithFewestFailures = check;
            fewestFailures = check.nFailures;
        }
    }
    delete checkWithFewestFailures.nFailures;
    return checkWithFewestFailures;
}

export function checkModel(model) {
    const checks = {
        accessibility: checkAccessibility(model),
        name: checkName(model),
        authors: checkAuthors(model),
        custodians: checkCustodians(model),
        species: checkSpecies(model),
        brainRegion: checkBrainRegion(model),
        cellType: checkCellType(model),
        abstractionLevel: checkAbstractionLevel(model),
        modelScope: checkModelScope(model),
        description: checkDescription(model),
    };
    const instanceChecks = checkModelInstances(model);
    return {
        ...checks,
        ...instanceChecks
    }
}
