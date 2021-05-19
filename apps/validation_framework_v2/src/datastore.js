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

    post(url, payload, source=null) {
        let config = this.getRequestConfig(source);
        config.headers['Content-type'] = 'application/json';
        return axios.post(url, payload, config);
    }

    put(url, payload, source=null) {
        let config = this.getRequestConfig(source);
        config.headers['Content-type'] = 'application/json';
        return axios.put(url, payload, config);
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
                        // todo: check if model is already cached with results/versions, don't overwrite if so
                        model.loadedResults = false;
                        model.loadedVersions = false;
                        model.instances = [];
                        model.results = [];
                        this.models[model.id] = model;
                        this.queries.models[query].push(model.id)
                    });
                    return res.data;
                })
        }
    }

    async getModel(identifier, source=null) {
        if (this.models[identifier] && this.models[identifier].loadedVersions) {
            return this.models[identifier];
        } else {
            const url = this.baseUrl + "/models/" + identifier;
            return this.get(url, source)
                .then((res) => {
                    const model = res.data;
                    if (model.id !== identifier && model.alias !== identifier) {
                        throw new Error(`Error, retrieved id ${model.id} doesn't match requested identifier ${identifier}`);
                    }
                    model.loadedVersions = true;
                    model.loadedResults = false;
                    model.results = [];
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

    createModel(modelData, source=null) {
        const url = this.baseUrl + "/models/";
        return this.post(url, modelData, source)
                   .then(res => {
                       const model = res.data;
                       model.loadedResults = true;
                       model.loadedVersions = true;
                       if (model.instances === null) {
                          model.instances = [];
                       }
                       model.results = [];
                       this.models[model.id] = model;
                       return model;
                   })
    }

    updateModel(modelData, source=null) {
        const url = this.baseUrl + "/models/" + modelData.id;
        return this.put(url, modelData, source)
                   .then(res => {
                       const model = res.data;
                       console.log("Updated model:");
                       console.log(model);
                       model.loadedVersions = true;
                       model.loadedResults = false;
                       if (model.instances === null) {
                           model.instances = [];
                       }
                       this.models[model.id] = model;
                       console.log("Updated model:");
                       console.log(model);
                       return model;
                   })
    }

    createModelInstance(modelID, modelInstanceData, source=null) {
        const url = this.baseUrl + "/models/" + modelID + "/instances/";
        return this.post(url, modelInstanceData, source)
                   .then(res => {
                        const modelInstance = res.data;
                        this.models[modelID].instances.push(modelInstance);
                        return modelInstance;
                   })
    }

    updateModelInstance(modelID, modelInstanceData, source=null) {
        const url = this.baseUrl + "/models/" + modelID + "/instances/" + modelInstanceData.id;
        return this.put(url, modelInstanceData, source)
                   .then(res => {
                        const modelInstance = res.data;

                        this.models[modelID].instances.forEach((inst, i) => {
                            if (inst.id === modelInstance.id) {
                                this.models[modelID].instances[i] = modelInstance;
                            }
                        });
                        return modelInstance;
                   })
    }

    async getTest(identifier, source=null) {
        console.log(`getTest: ${identifier}`);
        if (this.tests[identifier] && this.tests[identifier].loadedVersions) {
            return this.tests[identifier];
        } else {
            const url = this.baseUrl + "/tests/" + identifier;
            return this.get(url, source)
                .then((res) => {
                    const test = res.data;
                    if (test.id !== identifier && test.alias !== identifier) {
                        throw new Error(`Error, retrieved id ${test.id} doesn't match requested identifier ${identifier}`);
                    }
                    test.loadedVersions = true;
                    test.loadedResults = false;
                    test.results = [];
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
                        test.loadedVersions = false;
                        test.instances = [];
                        test.loadedResults = false;
                        test.results = [];
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

    createTest(testData, source=null) {
        const url = this.baseUrl + "/tests/";
        return this.post(url, testData, source)
                   .then(res => {
                       const test = res.data;
                       test.loadedResults = true;
                       test.loadedVersions = true;
                       if (test.instances === null) {
                           test.instances = [];
                       }
                       test.results = [];
                       this.tests[test.id] = test;
                       return test;
                   })
    }

    updateTest(testData, source=null) {
        const url = this.baseUrl + "/tests/" + testData.id;
        return this.put(url, testData, source)
                   .then(res => {
                       const test = res.data;
                       console.log("Updated test");
                       console.log(test);
                       test.loadedVersions = true;
                       test.loadedResults = false;
                       if (test.instances === null) {
                           test.instances = [];
                       }
                       this.tests[test.id] = test;
                       return test;
                   })
    }

    createTestInstance(testID, testInstanceData, source=null) {
        const url = this.baseUrl + "/tests/" + testID + "/instances/";
        return this.post(url, testInstanceData, source)
                   .then(res => {
                        const testInstance = res.data;
                        this.tests[testID].instances.push(testInstance);
                        return testInstance;
                   })
    }

    updateTestInstance(testID, testInstanceData, source=null) {
        const url = this.baseUrl + "/tests/" + testID + "/instances/" + testInstanceData.id;
        return this.put(url, testInstanceData, source)
                   .then(res => {
                        const testInstance = res.data;

                        this.tests[testID].instances.forEach((inst, i) => {
                            if (inst.id === testInstance.id) {
                                this.tests[testID].instances[i] = testInstance;
                            }
                        });
                        return testInstance;
                   })
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
        if (this.models[modelId].loadedResults) {
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
                    this.models[modelId].loadedResults = true;
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
        if (this.tests[testId].loadedResults) {
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
                    this.tests[testId].loadedResults = true;
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
