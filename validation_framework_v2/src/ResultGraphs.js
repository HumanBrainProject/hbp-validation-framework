import React from 'react';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from 'axios';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

import result_data from './test_data_results.json';
import {formatTimeStampToCompact} from "./utils";
import ResultDetail from './ResultDetail';


function ResultsFiguresTestIntance(props) {
    const Plot = createPlotlyComponent(Plotly);

    var model_labels = [];
    var model_version_labels = [];
    var model_version_longlabels = [];
    var model_version_scores = [];
    var traces = [];
    var layout = {};
    var label_resultJSON_map = {};

    for (const [model_id, model_entry] of Object.entries(props.test_inst_entry["models"])) {
      for (const [model_inst_id, model_inst_entry] of Object.entries(model_entry["model_instances"])) {
        model_inst_entry["results"].forEach(function (result_entry, r_ind) {
          model_labels.push(model_entry.model_name);
          model_version_labels.push(model_inst_entry.model_version + " (#" + r_ind + ")");
          var longlabel = model_entry.model_name + "-" + model_inst_entry.model_version + " (" + formatTimeStampToCompact(result_entry["timestamp"]) + ") - " + result_entry["result_id"].substr(0, 8);
          model_version_longlabels.push(longlabel);
          model_version_scores.push(result_entry.score);
          label_resultJSON_map[longlabel] = result_entry.result_json;
        });
      }
      traces.push(
      {
          x: [
            model_labels,
            model_version_labels
          ],
          y: model_version_scores,
          // text:model_labels,
          hovertext: model_version_longlabels,
          name: model_entry.model_name,
          type: 'bar'
        }
      )
    }

    layout = {
      showlegend: true,
      // hovermode: 'closest',
      // width: 640,
      // height: 480,
      // title: 'Plot Title',
      xaxis: {//tickvals: ["1", "2", "3", "4", "5"],
              //ticktext : ["a", "b", "c", "d" ,"e"],
             title: "Model Instance",
             automargin: true},
      yaxis: {title: "Score"},
      autosize:true
    };

    return (
        <ExpansionPanel defaultExpanded={true} key={props.test_inst_id}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={props.test_inst_id}
            >
            <Typography variant="subtitle1">Test Version: <b>{props.test_inst_entry.test_version}</b></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Container>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Plot
                                            data={traces}
                                            layout={layout}
                                            onClick={(data) => props.handleResultEntryClick(label_resultJSON_map[data["points"][0]["hovertext"]])}
                                        />
                                        <br /><br />
                                        <Typography variant="body2" align="center">Observation Data Type: <b>{props.test_inst_entry.data_type}</b></Typography>
                                        <Typography variant="body2" align="center">Test Score Type: <b>{props.test_inst_entry.score_type}</b></Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
  }

export default class ResultGraphs extends React.Component {
  constructor(props) {
    super(props);

    let test_ids = [];
    if ("test_id" in props) {
      test_ids.push(props.test_id)
    }
    console.log(test_ids)

    this.state = {
                    results         : [],
                    results_grouped : {},
                    // model_versions  : [],
                    resultDetailOpen: false,
                    currentResult  : null,
                    test_ids : test_ids
                 };

    this.handleResultEntryClick = this.handleResultEntryClick.bind(this)
    this.handleResultDetailClose = this.handleResultDetailClose.bind(this)
  }

  componentDidMount() {
    // this.getModelResults();  // TODO: uncomment
    this.setState({
      results: result_data["results"]
    });

    // group results by model instance, test instance combo
    // each entry being a list of results ordered from newest to oldest
    this.groupResults(result_data["results"]);
  }

  getModelResults = () => {
    let url = this.props.baseUrl + "/results/?order=score_type&model_id=" + this.props.id;
    return axios.get(url)
      .then(res => {
        this.setState({
          results: res.data["results"]
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        console.log(err)
        this.setState({
          error: err
        });
      }
    );
  };

  groupResults = (results) => {
    // will be a multi-D dict {test -> test instance -> model -> model instance} with list as values
    var dict_results = {}

    // Get list of all model versions; note that not necessarily all model versions will have associated results
    // so not appropriate to locate model versions via individual results
    // var list_model_versions = [] // TODO: uncomment
    // for dev usage
    // var list_model_versions = [{model_inst_id: "20e69189-ab22-4967-88a0-9e719a547381", model_version: "2.0", timestamp: "2019-06-06T12:55:17.673676+00:00"},
    //                            {model_inst_id: "20e69189-ab22-4967-88a0-9e719a547380", model_version: "1.0", timestamp: "2019-06-04T12:55:17.673676+00:00"},
    //                            {model_inst_id: "20e69189-ab22-4967-88a0-9e719a547382", model_version: "3.0", timestamp: "2019-06-08T12:55:17.673676+00:00"}]

    // TODO: uncomment this for actual data
    // this.props.modelJSON.instances.forEach(function (model_inst) {
    //   list_model_versions.push({
    //     model_inst_id:  model_inst.id,
    //     model_version:  model_inst.version,
    //     timestamp    :  model_inst.timestamp
    //   })
    // })
    // console.log(list_model_versions)

    // sorting list_model_versions by timestamp (oldest to newest)
    // list_model_versions.sort(function(a, b) {
    //   if(a.timestamp < b.timestamp) { return -1; }
    //   if(a.timestamp > b.timestamp) { return 1; }
    //   return 0;
    // });

    // check if test exists
    results.forEach(function (result, index) {
      if (!(result.test_code.test_definition.id in dict_results)) {
        dict_results[result.test_code.test_definition.id] = {
                                                              test_id:        result.test_code.test_definition.id,
                                                              test_name:      result.test_code.test_definition.name,
                                                              test_alias:     result.test_code.test_definition.alias,
                                                              test_instances: {}
                                                            };
      }
      // check if test instance exists inside test
      if (!(result.test_code_id in dict_results[result.test_code.test_definition.id]["test_instances"])) {
        dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id] = {
                                                              test_inst_id:   result.test_code_id,
                                                              test_version:   result.test_code.version,
                                                              timestamp:      result.test_code.timestamp,
                                                              data_type:      result.test_code.test_definition.data_type,
                                                              score_type:     result.test_code.test_definition.score_type,
                                                              models: {}
                                                            };
      }
      // check if model exists for this test instance
      if (!(result.model_version.model.id in dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["models"])) {
        dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["models"][result.model_version.model.id] = {
                                                                model_id:       result.model_version.model.id,
                                                                model_name:     result.model_version.model.name,
                                                                model_alias:    result.model_version.model.alias,
                                                                model_instances: {}
                                                            };
      }
      // check if model instance exists for this model
      if (!(result.model_version_id in dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["models"][result.model_version.model.id]["model_instances"])) {
        dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["models"][result.model_version.model.id]["model_instances"][result.model_version_id] = {
                                                                model_inst_id:   result.model_version_id,
                                                                model_version:   result.model_version.version,
                                                                timestamp:       result.model_version.timestamp,
                                                                results: []
                                                            };
      }
      // add result to list of model instance results for above test instance
      dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["models"][result.model_version.model.id]["model_instances"][result.model_version_id]["results"].push(
                                                            {
                                                                result_id:      result.id,
                                                                score:          result.score,
                                                                timestamp:      result.timestamp,
                                                                result_json:    result
                                                            })
    });

    // NOT NEEDED HERE?
    // // insert empty lists for (test_instance, model_instance) combos without results
    // results.forEach(function (result) {
    //   list_model_versions.forEach(function (m_inst) {
    //     if (!(m_inst["model_inst_id"] in dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"])) {
    //       dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"][m_inst["model_inst_id"]] = [];
    //     }
    //   })
    // })

    // sorting tests by test name/alias (whichever is displayed)
    var temp_sorted = {};
    Object.keys(dict_results).sort(function(a, b){
      var parent = dict_results;
      var t_a_display = parent[a].test_alias ? parent[a].test_alias : parent[a].test_name;
      var t_b_display = parent[b].test_alias ? parent[b].test_alias : parent[b].test_name;
      if(t_a_display < t_b_display) { return -1; }
      if(t_a_display > t_b_display) { return 1; }
      return 0;
    })
    .forEach(function(key) {
      temp_sorted[key] = dict_results[key];
    });
    dict_results = temp_sorted;

    // sorting test versions within test by timestamp, oldest to newest
    Object.keys(dict_results).forEach(function (test_id) {
        var temp_sorted = {};
        Object.keys(dict_results[test_id]["test_instances"]).sort(function(a, b){
                var parent = dict_results[test_id]["test_instances"];
                var t_a_timestamp = parent[a].timestamp;
                var t_b_timestamp = parent[b].timestamp;
                if(t_a_timestamp < t_b_timestamp) { return -1; }
                if(t_a_timestamp > t_b_timestamp) { return 1; }
                return 0;
            })
          .forEach(function(key) {
            temp_sorted[key] = dict_results[test_id]["test_instances"][key];
        });
        dict_results[test_id]["test_instances"] = temp_sorted;
    })

    // sorting models within each test instance by model name/alias (whichever is displayed)
    Object.keys(dict_results).forEach(function(test_id) {
        Object.keys(dict_results[test_id]["test_instances"]).forEach(function(test_inst_id) {
            var temp_sorted = {};
            Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).sort(function(a, b){
                var parent = dict_results[test_id]["test_instances"][test_inst_id]["models"];
                var t_a_display = parent[a].model_alias ? parent[a].model_alias : parent[a].model_name;
                var t_b_display = parent[b].model_alias ? parent[b].model_alias : parent[b].model_name;
                if(t_a_display < t_b_display) { return -1; }
                if(t_a_display > t_b_display) { return 1; }
                return 0;
            })
            .forEach(function(key) {
                temp_sorted[key] = dict_results[test_id]["test_instances"][test_inst_id]["models"][key];
            });
            dict_results[test_id]["test_instances"][test_inst_id]["models"] = temp_sorted;
        })
    })

    // sorting model versions within each model by timestamp, oldest to newest
    Object.keys(dict_results).forEach(function(test_id) {
        Object.keys(dict_results[test_id]["test_instances"]).forEach(function(test_inst_id) {
            Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).forEach(function(model_id) {
                var temp_sorted = {};
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).sort(function(a, b){
                    var parent = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"];
                    var t_a_timestamp = parent[a].timestamp;
                    var t_b_timestamp = parent[b].timestamp;
                    if(t_a_timestamp < t_b_timestamp) { return -1; }
                    if(t_a_timestamp > t_b_timestamp) { return 1; }
                    return 0;
                })
                .forEach(function(key) {
                    temp_sorted[key] = dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][key];
                });
                dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"] = temp_sorted;
            })
        })
    })

    // sort each list of dicts (each dict being a result), newest to oldest
    Object.keys(dict_results).forEach(function (test_id) {
        Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
            Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"]).forEach(function(model_id) {
                Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"]).forEach(function(model_inst_id) {
                    dict_results[test_id]["test_instances"][test_inst_id]["models"][model_id]["model_instances"][model_inst_id]["results"].sort(function(a, b) {
                        if(a.timestamp < b.timestamp) { return 1; }
                        if(a.timestamp > b.timestamp) { return -1; }
                        return 0;
                    });
                });
            });
        });
    });

    this.setState({
      results_grouped:  dict_results,
    //   model_versions:   list_model_versions
    });

    console.log(dict_results)
  }

  handleResultEntryClick(result) {
    this.setState({
                    'resultDetailOpen': true,
                    'currentResult':   result
                  });
    // updateHash(rowData.id);
  };

  handleResultDetailClose() {
    this.setState({
                    'resultDetailOpen': false,
                    'currentResult':    null
                  });
    // updateHash('');
  };

  renderResultsFigures() {
    const dict_results = this.state.results_grouped;

    var test_ids = this.state.test_ids;
    // determine list of tests to be plotted
    if (test_ids.length < 1) {
      for (const test_id of Object.keys(dict_results)) {
        test_ids.push(test_id)
      }
    }
    console.log(test_ids)

    if (test_ids.length > 0) {
      console.log(this.state.test_ids)
      console.log(dict_results)
      console.log(dict_results["4bfa8342-226b-4a65-8385-49942d576020"])
    return(
        <Container>
            {test_ids.map((test_id) =>
                <ExpansionPanel defaultExpanded={true} key={test_id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={test_id}
                    >
                    <Typography variant="subtitle1">Test: <b>{dict_results[test_id].test_alias ? dict_results[test_id].test_alias : dict_results[test_id].test_name}</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Container>
                            {Object.entries(dict_results[test_id]["test_instances"]).map(([test_inst_id, test_inst_entry]) =>

                                <ResultsFiguresTestIntance
                                    test_inst_id={test_inst_id}
                                    test_inst_entry={test_inst_entry}
                                    key={test_inst_id}
                                    handleResultEntryClick={this.handleResultEntryClick}
                                />

                            )}
                        </Container>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </Container>
    )
    } else {
      return ""
    }
  }

  renderNoResults() {
    return (
        <Typography variant="h5" component="h3">
            No results have yet been registered for this model!
        </Typography>
    )
  }

  render() {
    const dict_results = this.state.results_grouped;
    var content = "";
    var resultDetail = "";
    if (Object.keys(dict_results).length>0) {
      content = this.renderResultsFigures(dict_results);
    } else {
      content = this.renderNoResults();
    }
    if (this.state.currentResult) {
      resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
    }
    return (
      <div>
        <div>
          {content}
        </div>
        <div>
          {resultDetail}
        </div>
      </div>
    );
  }
}


// {
//   "model_version_id": "20e69189-ab22-4967-88a0-9e719a547380",
//   "timestamp": "2019-11-15T16:22:22.141147",
//   "test_code": {
//       "version": "1.0",
//       "repository": "https://github.com/KaliLab/hippounit.git",
//       "timestamp": "2019-06-06T12:57:19.822637Z",
//       "path": "hippounit.tests.SomaticFeaturesTest",
//       "id": "f09665b8-5c4f-4655-b2c3-78c247d742c3",
//       "test_definition_id": "4bfa8342-226b-4a65-8385-49942d576020",
//       "description": "",
//       "test_definition": {
//           "status": "in development",
//           "cell_type": "pyramidal cell",
//           "codes": [
//               {
//                   "old_uuid": "bacb333e-6b34-4940-9b06-d630b2efe016",
//                   "version": "1.0",
//                   "repository": "https://github.com/KaliLab/hippounit.git",
//                   "timestamp": "2019-06-06T12:57:19.822637Z",
//                   "path": "hippounit.tests.SomaticFeaturesTest",
//                   "description": "",
//                   "parameters": "",
//                   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/f09665b8-5c4f-4655-b2c3-78c247d742c3",
//                   "id": "f09665b8-5c4f-4655-b2c3-78c247d742c3"
//               }
//           ],
//           "protocol": "Tests eFEL features under current injection of varying amplitudes, and compares against data from patch clamp studies",
//           "name": "Hippocampus_SomaticFeaturesTest_CA1_Pyr_PatchClamp",
//           "data_type": "Mean, SD",
//           "data_modality": "electrophysiology",
//           "test_type": "single cell activity",
//           "author": [
//               {
//                   "family_name": "Saray",
//                   "given_name": "Sara"
//               }
//           ],
//           "creation_date": "2019-06-06T12:57:19.818075Z",
//           "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationtestdefinition/v0.1.0/4bfa8342-226b-4a65-8385-49942d576020",
//           "species": "Rattus norvegicus",
//           "alias": "hippo_somafeat_CA1_pyr_patch",
//           "old_uuid": "89b8d919-d235-4893-979a-dd2c04347733",
//           "brain_region": "hippocampus",
//           "score_type": "Other",
//           "id": "4bfa8342-226b-4a65-8385-49942d576020",
//           "data_location": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/sp6_validation_data/hippounit/feat_rat_CA1_JMakara_more_features.json"
//       },
//       "parameters": "",
//       "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationscript/v0.1.0/f09665b8-5c4f-4655-b2c3-78c247d742c3",
//       "old_uuid": "bacb333e-6b34-4940-9b06-d630b2efe016"
//   },
//   "model_version": {
//       "model_uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//       "code_format": "hoc, mod",
//       "description": "",
//       "model_id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//       "timestamp": "2019-06-06T12:55:17.673676+00:00",
//       "morphology": null,
//       "hash": "",
//       "id": "20e69189-ab22-4967-88a0-9e719a547380",
//       "license": null,
//       "parameters": "{\"class_name\" : \"Katz_et_al_2009\"}",
//       "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/20e69189-ab22-4967-88a0-9e719a547380",
//       "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippounit_paper_resources/models/Katz_et_al_2009_2stageintegration_code.zip",
//       "version": "1.0",
//       "model": {
//           "cell_type": "hippocampus CA1 pyramidal cell",
//           "name": "Katz_et_al_2009_2stageintegration_code",
//           "images": null,
//           "author": [
//               {
//                   "family_name": "Katz",
//                   "given_name": "Yael"
//               },
//               {
//                   "family_name": "Menon",
//                   "given_name": "Vilas"
//               }
//           ],
//           "app": {
//               "collab_id": 54781
//           },
//           "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/modelproject/v0.1.0/71192c8c-e46e-4b8b-b874-6eecd03df336",
//           "private": false,
//           "model_scope": "single cell",
//           "species": "Rattus norvegicus",
//           "alias": "katz_2009",
//           "old_uuid": "bcd93a30-f338-45e7-9ce2-1e20261615a9",
//           "abstraction_level": "spiking neurons: biophysical",
//           "brain_region": "hippocampus",
//           "owner": [
//               {
//                   "family_name": "Sáray",
//                   "given_name": "Sára"
//               }
//           ],
//           "organization": "HBP-SP6",
//           "instances": [
//               {
//                   "license": "",
//                   "code_format": "hoc, mod",
//                   "description": "",
//                   "parameters": "{\"class_name\" : \"Katz_et_al_2009\"}",
//                   "timestamp": "2019-06-06T12:55:17.673676+00:00",
//                   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/memodel/v0.1.2/20e69189-ab22-4967-88a0-9e719a547380",
//                   "source": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/hippounit_paper_resources/models/Katz_et_al_2009_2stageintegration_code.zip",
//                   "version": "1.0",
//                   "morphology": null,
//                   "hash": "",
//                   "id": "20e69189-ab22-4967-88a0-9e719a547380"
//               }
//           ],
//           "id": "71192c8c-e46e-4b8b-b874-6eecd03df336",
//           "description": "The Katz et al. (2009) model(ModelDB accession number: 127351) is based on the Golding et al. (2001) model and was build to investigate the functional consequences of the distribution of strength and density of synapses on the apical dendrites, that they observed experimentally, on the mode of dendritic integration."
//       }
//   },
//   "normalized_score": 4.606887844979831,
//   "id": "073151b6-dfbb-4015-a8ea-24a304c927ec",
//   "score": 4.606887844979831,
//   "test_code_id": "f09665b8-5c4f-4655-b2c3-78c247d742c3",
//   "uri": "https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/validationresult/v0.1.0/073151b6-dfbb-4015-a8ea-24a304c927ec",
//   "results_storage": [
//       {
//           "download_url": "collab://54781/validation_results/2019-11-15/Katz_et_al_2009_2stageintegration_code_20191115-162205"
//       }
//   ],
//   "project": 54781,
//   "old_uuid": null,
//   "passed": null
// }