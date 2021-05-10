import axios from 'axios';
import { baseUrl, querySizeLimit } from './globals';


function range(n) {
    return [...Array(n).keys()];
}


const buildQuery = (filterDict) => {
    let q = "";
    for (var key in filterDict) {
        for (var value of filterDict[key]) {
            q += `&${key}=${value}`
        }
    }
    return q.slice(1);
};


class DataStore {
    constructor(baseUrl, auth) {
        this.baseUrl = baseUrl;
        this.auth = auth;
        this.models = {};
        this.tests = {};
        this.results = {};
    }

    getRequestConfig(source=null) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.auth.token,
            },
        };
        if (source) {
            config.cancelToken = source.token
        };
        return config;
    }

    get(url, source=null) {
        return axios.get(url, this.getRequestConfig(source));
    }

    getModels(source=null) {
        const url = this.baseUrl + "/models/?size=" + querySizeLimit;
        return this.get(url, source);
    }

    queryModels(filters, source=null) {
        const query = buildQuery(filters);
        const url = this.baseUrl + "/models/?" + encodeURI(query) + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    getModel(identifier, source=null) {
        const url = this.baseUrl + "/models/" + identifier;
        return this.get(url, source);
    }

    modelAliasIsUnique(alias, source=null) {
        return datastore.getModel(encodeURI(alias), source)
            .then(res => {
                return false;
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    return true;
                }
            });
    }

    getModelInstanceFromVersion(modelID, version, source=null) {
        const url = this.baseUrl + "/models/" + modelID + "/instances/?version=" + version;
        return this.get(url, source);
    }

    getModelInstanceFromID(modelInstanceID, source=null) {
        const url = this.baseUrl + "/models/query/instances/" + encodeURI(modelInstanceID);
        return this.get(url, source);
    }

    getTest(identifier, source=null) {
        const url = this.baseUrl + "/tests/" + identifier;
        return this.get(url, source);
    }

    queryTests(filters, source=null) {
        const query = buildQuery(filters);
        const url = this.baseUrl + "/tests/?" + encodeURI(query) + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    testAliasIsUnique(alias, source=null) {
        return datastore.getTest(encodeURI(alias), source)
            .then(res => {
                return false;
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Error: ', err.message);
                } else {
                    return true;
                }
            });
    }

    getTestInstanceFromVersion(testID, version, source=null) {
        const url = this.baseUrl + "/tests/" + testID + "/instances/?version=" + version;
        return this.get(url, source);
    }

    getTestInstanceFromID(testInstanceID, source=null) {
        const url = this.baseUrl + "/tests/query/instances/" + encodeURI(testInstanceID);
        return this.get(url, source);
    }

    getProjects(source=null) {
        const url = this.baseUrl + "/projects";
        return this.get(url, source)
            .then(res => {
                let editableProjects = [];
                res.data.forEach(proj => {
                    if (proj.permissions.UPDATE) {
                        editableProjects.push(proj.project_id);
                    }
                });
                editableProjects.sort();
                return editableProjects;
            })
            .catch(err => {
                console.log('Error: ', err.message);
            });
    }

    getResultsByModel(modelId, source=null) {
        const url = this.baseUrl + "/results-extended/?model_id=" + modelId + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    getResultsByModelInstances(modelInstanceIds, source=null) {
        const url = this.baseUrl + "/results-extended/?model_instance_id=" + modelInstanceIds.join('&model_instance_id=') + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    getResultsByTest(testId, source=null) {
        const url = this.baseUrl + "/results-extended/?test_id=" + testId + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    getResultsByTestInstance(testInstanceIds, source=null) {
        const url = this.baseUrl + "/results-extended/?test_instance_id=" + testInstanceIds.join('&test_instance_id=') + "&size=" + querySizeLimit;
        return this.get(url, source)
    }

    getResult(resultID, source=null) {
        const url = this.baseUrl + "/results-extended/" + resultID;
        return this.get(url, source)
    }

    getValidFilterValues(source=null) {
        return this.get(`${this.baseUrl}/vocab/`, source);
    }

}

export const datastore = new DataStore(baseUrl, null);
