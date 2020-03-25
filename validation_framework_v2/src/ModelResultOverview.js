import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import result_data from './test_data_results.json';
import {formatTimeStampToCompact, roundFloat} from "./utils";
import ResultDetail from './ResultDetail';

class ResultPerInstanceComboMT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    expanded: false
                 };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const results_sublist = this.props.result_MTcombo;
    return [
      // For score
      <TableCell key="score">
        {
          results_sublist.map((result, ind) => {
          return ind === 0 ?
            // to handle the most recent result for (model_instance, test_instance) combo
            // Note: results are already ordered from latest to oldest
            results_sublist.length===1 ?
              // if just a single result exists for (model_instance, test_instance) combo
              <Grid container key={result.result_id}>
                <Grid item align="right" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                  {roundFloat(result.score, 2)}
                </Grid>
              </Grid>
            :
              // if multiple results exist for (model_instance, test_instance) combo
              <Grid container spacing={2} key={result.result_id}>
                <Grid item align="left" onClick={this.toggleExpanded} style={{ cursor: 'pointer' }}>
                  <Tooltip title={results_sublist.length + " results available"}>
                    <Avatar style={{ width:"20px", height:"20px"}}>
                      <Typography variant="button">
                        {results_sublist.length}
                      </Typography>
                    </Avatar>
                  </Tooltip>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item align="right" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                  {roundFloat(result.score, 2)}
                </Grid>
              </Grid>
          :
            // to handle all other results (except latest) for (model_instance, test_instance) combo
            <Grid container style={this.state.expanded?{display:'block'}:{display:'none'}} key={result.result_id}>
              <Grid item align="right" onClick={() => this.props.handleResultEntryClick(result.result_json)} style={{ cursor: 'pointer' }}>
                {roundFloat(result.score, 2)}
              </Grid>
            </Grid>
          })
        }
      </TableCell>,
      // For timestamp
      <TableCell key="timestamp">
        {
          results_sublist.map((result, ind) => {
          return ind === 0 ?
            // to handle the most recent result for (model_instance, test_instance) combo
            // Note: results are already ordered from latest to oldest
            <Grid container spacing={2} key={result.result_id}>
              <Grid item align="right">
                {formatTimeStampToCompact(result.timestamp)}
              </Grid>
            </Grid>
          :
            // to handle all other results (except latest) for (model_instance, test_instance) combo
            <Grid container style={this.state.expanded?{display:'block'}:{display:'none'}} key={result.result_id}>
              <Grid item align="right">
                {formatTimeStampToCompact(result.timestamp)}
              </Grid>
            </Grid>
          })
        }
      </TableCell>
    ];
  }
}

class ResultEntryTest extends React.Component {
  render() {
    const result_test = this.props.result_entry;
    const model_versions = this.props.model_versions;
    const handleResultEntryClick = this.props.handleResultEntryClick;
    if (result_test) {
      return (
        <React.Fragment>
          {
            Object.keys(result_test.test_instances).map((test_inst_id, index_tt) => (
              <TableRow key={test_inst_id}>
              {
                (index_tt===0) ?
                  <TableCell align="right" bgcolor='#b9cbda' rowSpan={Object.keys(result_test.test_instances).length}>{result_test.test_alias ? result_test.test_alias : result_test.test_name}</TableCell>
                : <React.Fragment></React.Fragment>
              }
              <TableCell align="right" bgcolor='#b9cbda'>{result_test.test_instances[test_inst_id].test_version}</TableCell>
              {
                  model_versions.map(function(model_version_entry) {
                    return (
                    <ResultPerInstanceComboMT result_MTcombo={result_test.test_instances[test_inst_id].results[model_version_entry.model_inst_id]}
                                              model_versions={model_versions}
                                              handleResultEntryClick={handleResultEntryClick}
                                              key={model_version_entry.model_inst_id} />
                    );
                  })
              }
              </TableRow>
            ))
          }
          </React.Fragment>
      );
    } else {
      return ""
    }
  }
}

export default class  ModelResultOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    results         : [],
                    results_grouped : {},
                    model_versions  : [],
                    resultDetailOpen: false,
                    currentResult  : null
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
    // will be a 3-D dict {test -> test instance -> model instance} with list as values
    var dict_results = {}

    // Get list of all model versions; note that not necessarily all model versions will have associated results
    // so not appropriate to locate model versions via individual results
    // var list_model_versions = [] // TODO: uncomment
    // for dev usage
    var list_model_versions = [{model_inst_id: "20e69189-ab22-4967-88a0-9e719a547381", model_version: "2.0", timestamp: "2019-06-06T12:55:17.673676+00:00"},
                               {model_inst_id: "20e69189-ab22-4967-88a0-9e719a547380", model_version: "1.0", timestamp: "2019-06-04T12:55:17.673676+00:00"},
                               {model_inst_id: "20e69189-ab22-4967-88a0-9e719a547382", model_version: "3.0", timestamp: "2019-06-08T12:55:17.673676+00:00"}]

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
    list_model_versions.sort(function(a, b) {
      if(a.timestamp < b.timestamp) { return -1; }
      if(a.timestamp > b.timestamp) { return 1; }
      return 0;
    });

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
                                                              results: {}
                                                            };
      }
      // check if model instance exists for this test instance
      if (!(result.model_version_id in dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"])) {
        dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"][result.model_version_id] = [];
      }
      // add result to list of model instance results for above test instance
      dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"][result.model_version_id].push(
                          {
                            result_id:      result.id,
                            score:          result.score,
                            timestamp:      result.timestamp,
                            model_id:       result.model_version.model.id,
                            model_name:     result.model_version.model.name,
                            model_alias:    result.model_version.model.alias,
                            model_inst_id:  result.model_version_id,
                            model_version:  result.model_version.version,
                            result_json:    result
                          })
    });

    // insert empty lists for (test_instance, model_instance) combos without results
    results.forEach(function (result) {
      list_model_versions.forEach(function (m_inst) {
        if (!(m_inst["model_inst_id"] in dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"])) {
          dict_results[result.test_code.test_definition.id]["test_instances"][result.test_code_id]["results"][m_inst["model_inst_id"]] = [];
        }
      })
    })

    // sorting entries by test name/alias (whichever is displayed)
    var temp_sorted = {};
    Object.keys(dict_results).sort(function(a, b){
      var t_a_display = dict_results[a].test_alias ? dict_results[a].test_alias : dict_results[a].test_name;
      var t_b_display = dict_results[b].test_alias ? dict_results[b].test_alias : dict_results[b].test_name;
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
          var t_a_timestamp = dict_results[test_id]["test_instances"][a].timestamp;
          var t_b_timestamp = dict_results[test_id]["test_instances"][b].timestamp;
          if(t_a_timestamp < t_b_timestamp) { return -1; }
          if(t_a_timestamp > t_b_timestamp) { return 1; }
          return 0;
        })
        .forEach(function(key) {
          temp_sorted[key] = dict_results[test_id]["test_instances"][key];
        });
        dict_results[test_id]["test_instances"] = temp_sorted;
    })

    // sort each list of dicts (each dict being a result), newest to oldest
    Object.keys(dict_results).forEach(function (test_id) {
      Object.keys(dict_results[test_id]["test_instances"]).forEach(function (test_inst_id) {
        Object.keys(dict_results[test_id]["test_instances"][test_inst_id]["results"]).forEach(function (model_inst_id, index_m) {
            dict_results[test_id]["test_instances"][test_inst_id]["results"][model_inst_id].sort(function(a, b) {
              if(a.timestamp < b.timestamp) { return 1; }
              if(a.timestamp > b.timestamp) { return -1; }
              return 0;
          });
        });
      });
    });

    this.setState({
      results_grouped:  dict_results,
      model_versions:   list_model_versions
    });
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

  renderResultsSummaryTable(dict_results) {
    return(
      <React.Fragment>
        <Grid container xs={12} direction="column" item={true}>
          <Grid item xs={12}>
            <Box px={2} pb={0}>
              <Typography variant="subtitle1"><b>Summary of Validation Results</b></Typography>
            </Box>
            <br />
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                  <TableCell align="center" colSpan={2} rowSpan={2} bgcolor='#26547d'>Validation Test</TableCell>
                    <TableCell align="center" colSpan={this.state.model_versions.length*2}>Model Version(s)</TableCell>
                  </TableRow>
                  <TableRow>
                    {
                      this.state.model_versions.map((item, index) => (
                        <TableCell align="center" colSpan={2} key={item["model_inst_id"]}>{item["model_version"]}</TableCell>
                      ))
                    }
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" bgcolor='#3277b3'>Test Name</TableCell>
                    <TableCell align="center" bgcolor='#3277b3'>Test Version</TableCell>
                    {
                      this.state.model_versions.map((item, index) => (
                        <React.Fragment key={index}>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="center">Date (Time)</TableCell>
                        </React.Fragment>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(dict_results).map((test_id, index_t) => (
                        <ResultEntryTest result_entry={dict_results[test_id]} model_versions={this.state.model_versions} handleResultEntryClick={this.handleResultEntryClick} key={test_id} />
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </React.Fragment>
    )
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
      content = this.renderResultsSummaryTable(dict_results);
    } else {
      content = this.renderNoResults();
    }
    if (this.state.currentResult) {
      resultDetail = <ResultDetail open={this.state.resultDetailOpen} result={this.state.currentResult} onClose={this.handleResultDetailClose} />;
    } else {
      resultDetail = "";
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