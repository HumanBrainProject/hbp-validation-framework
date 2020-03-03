import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

import {formatAuthors, downloadJSON} from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";
import ViewSelected from "./ViewSelected";

export default class TestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rows,
      viewSelectedOpen: false
    };

    this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this);
    this.hideTableRows = this.hideTableRows.bind(this);
    this.viewSelectedItems = this.viewSelectedItems.bind(this);
    this.handleViewSelectedClose = this.handleViewSelectedClose.bind(this);
  }

  downloadSelectedJSON(selectedRows) {
    var selectedTests = [];
    for (var item in selectedRows.data) {
      var data = this.state.data[selectedRows.data[item].index]
      var ordered_data = {};
      Object.keys(data).sort().forEach(function(key) { ordered_data[key] = data[key]; });
      selectedTests.push(ordered_data)
    }
    downloadJSON(JSON.stringify(selectedTests), "selectedTests.json")
  }

  hideTableRows(selectedRows) {
    console.log("Hide row(s)!");
    var selectedIndices = [];
    for (var item in selectedRows.data) {
      selectedIndices.push(selectedRows.data[item].index)
    }
    const updated_data = this.state.data.filter( (item, index) => !selectedIndices.includes(index) );
    this.setState({ data: updated_data });
  }

  viewSelectedItems(selectedRows) {
    console.log("View item(s).")
    this.setState({viewSelectedOpen: true})
  }

  handleViewSelectedClose() {
    this.setState({viewSelectedOpen: false})
  }

  render() {
    const handleRowClick = this.props.handleRowClick;
    return (
      <div>
        <MUIDataTable
            title="Tests"
            columns={[{name:'ID', options: {display: false}},
                      {name:'Name', options: {display: true}},
                      {name:'Alias', options: {display: false}},
                      {name:'Author', options: {display: true}},
                      {name:'Status', options: {display: false}},
                      {name:'Species', options: {display: false}},
                      {name:'Brain region', options: {display: false}},
                      {name:'Cell type', options: {display: false}},
                      {name:'Test type', options: {display: false}},
                      {name:'Score type', options: {display: false}},
                      {name:'Data type', options: {display: false}},
                      {name:'Data modality', options: {display: false}},
                      {name:'Data location', options: {display: false}},
                      {name:'Creation date', options: {display: false}}]
                    }
            data={this.state.data.map(item => {
              return [
                      item.id,
                      item.name,
                      item.alias,
                      formatAuthors(item.author),
                      item.status,
                      item.species,
                      item.brain_region,
                      item.cell_type,
                      item.test_type,
                      item.score_type,
                      item.data_type,
                      item.data_modality,
                      item.data_location,
                      item.creation_date
                    ]
            })}
            options={{
              filter: true,
              sort: true,
              rowsPerPage: 20,
              rowsPerPageOptions: [10, 20, 100],
              responsive: 'stacked', // 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth', 'stackedFullWidth'
              downloadOptions: {filename: 'selectedTests.csv', separator: ',', filterOptions: {useDisplayedRowsOnly: true}},
              customToolbar: () => {
                return <MUIDataTableCustomToolbar changeTableWidth={this.props.changeTableWidth} />;
              },
              customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} />
            }}
            onRowClick={(event, rowData) => handleRowClick(event, rowData)}
        />
        <ViewSelected entity="tests" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} />
      </div>
    );
  }
}
