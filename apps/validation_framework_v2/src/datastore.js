import axios from 'axios';
import { baseUrl, querySizeLimit } from './globals';





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
        this.projects = [];
        this.vocab = null;
        this.queries = {
            models: {},
            tests: {}
        }
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

    async queryModels(filters, source=null) {
        const query = buildQuery(filters);
        if (this.queries.models[query]) {
            console.log("Using saved query");
            const idList = this.queries.models[query];
            return idList.map((id) => {return this.models[id]});
        } else {
            console.log("No saved query, requesting models from server");
            const url = this.baseUrl + "/models/?" + encodeURI(query) + "&size=" + querySizeLimit + "&summary=true";
            return this.get(url, source)
                .then((res) => {
                    this.queries.models[query] = [];
                    res.data.forEach((model) => {
                        model.results = null;
                        this.models[model.id] = model;
                        this.queries.models[query].push(model.id)
                    });
                    return res.data;
                })
        }
    }

    async getModel(identifier, source=null) {
        if (this.models[identifier] && this.models[identifier].instances !== null) {
            return this.models[identifier];
        } else {
            const url = this.baseUrl + "/models/" + identifier;
            return this.get(url, source)
                .then((res) => {
                    const model = res.data;
                    if (model.id !== identifier && model.alias !== identifier) {
                        throw new Error(`Error, retrieved id ${model.id} doesn't match requested identifier ${identifier}`);
                    }
                    model.results = null;
                    this.models[identifier] = model;
                    return this.models[identifier];
                });
        }
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
        // we don't use saved values here, as this function is used for a uniqueness check
        const url = this.baseUrl + "/models/" + modelID + "/instances/?version=" + version;
        return this.get(url, source);
    }

    getModelInstanceFromID(modelInstanceID, source=null) {
        const url = this.baseUrl + "/models/query/instances/" + encodeURI(modelInstanceID);
        return this.get(url, source);
    }

    async getTest(identifier, source=null) {
        console.log(`getTest: ${identifier}`);
        if (this.tests[identifier] && this.tests[identifier].instances !== null) {
            return this.tests[identifier];
        } else {
            const url = this.baseUrl + "/tests/" + identifier;
            return this.get(url, source)
                .then((res) => {
                    const test = res.data;
                    if (test.id !== identifier && test.alias !== identifier) {
                        throw new Error(`Error, retrieved id ${test.id} doesn't match requested identifier ${identifier}`);
                    }
                    test.results = null;
                    this.tests[identifier] = test;
                    console.log("got test:");
                    console.log(this.tests[identifier]);
                    return this.tests[identifier];
                });
        }
    }

    async queryTests(filters, source=null) {
        const query = buildQuery(filters);
        if (this.queries.tests[query]) {
            console.log("Using saved query");
            const idList = this.queries.tests[query];
            return idList.map((id) => {return this.tests[id]});
        } else {
            console.log("No saved query, requesting tests from server");
            const url = this.baseUrl + "/tests/?" + encodeURI(query) + "&size=" + querySizeLimit + "&summary=true";
            return this.get(url, source)
                .then((res) => {
                    console.log("got tests:");
                    console.log(res.data);
                    this.queries.tests[query] = [];
                    res.data.forEach((test) => {
                        test.results = null;
                        this.tests[test.id] = test;
                        this.queries.tests[query].push(test.id)
                    });
                    return res.data;
                })
        }
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

    async getProjects(source=null) {
        if (this.projects.length > 0) {
            return this.projects;
        } else {
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
                    this.projects = editableProjects;
                    return this.projects;
                })
                .catch(err => {
                    console.log('Error: ', err.message);
                });
        }
    }

    async getResultsByModel(modelId, source=null) {
        console.log(this.models[modelId]);
        if (this.models[modelId].results !== null) {
            return this.models[modelId].results.map((resultId) => {return this.results[resultId]});
        } else {
            const url = this.baseUrl + "/results-summary/?model_id=" + modelId + "&size=" + querySizeLimit;
            return this.get(url, source)
                .then((res) => {
                    const resultIds = [];
                    res.data.forEach((result) => {
                        resultIds.push(result.id);
                        this.results[result.id] = result;
                    });
                    this.models[modelId].results = resultIds;
                    return res.data;
                });
        }
    }

    getResultsByModelInstances(modelInstanceIds, source=null) {
        const url = this.baseUrl + "/results-extended/?model_instance_id=" + modelInstanceIds.join('&model_instance_id=') + "&size=" + querySizeLimit;
        return this.get(url, source)
            .then((res) => {
                res.data.forEach((result) => {
                    this.results[result.id] = result;
                });
                return res.data;
            })
    }

    async getResultsByTest(testId, source=null) {
        if (this.tests[testId].results !== null) {
            return this.tests[testId].results.map((resultId) => {return this.results[resultId]});
        } else {
            const url = this.baseUrl + "/results-summary/?test_id=" + testId + "&size=" + querySizeLimit;
            return this.get(url, source)
                .then((res) => {
                    const resultIds = [];
                    res.data.forEach((result) => {
                        resultIds.push(result.id);
                        this.results[result.id] = result;
                    });
                    this.tests[testId].results = resultIds;
                    return res.data;
                });
        }
    }

    getResultsByTestInstance(testInstanceIds, source=null) {
        const url = this.baseUrl + "/results-extended/?test_instance_id=" + testInstanceIds.join('&test_instance_id=') + "&size=" + querySizeLimit;
        return this.get(url, source)
            .then((res) => {
                res.data.forEach((result) => {
                    this.results[result.id] = result;
                });
                return res.data;
            })
    }

    async getResult(resultID, source=null) {
        if (this.results[resultID]) {
            return this.results[resultID];
        } else {
            const url = this.baseUrl + "/results-extended/" + resultID;
            return this.get(url, source)
                .then((res) => {
                    this.results[resultID] = res.data;
                    return this.results[resultID];
                });
        }
    }

    async getValidFilterValues(source=null) {
        if (this.vocab === null) {
            return this.get(`${this.baseUrl}/vocab/`, source)
                .then((res) => {
                    this.vocab = {...res.data};
                    return this.vocab;
                });
        } else {
            return this.vocab;
        }
    }

}

export const datastore = new DataStore(baseUrl, null);
