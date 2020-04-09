import React from 'react';
import MUIDataTable from "mui-datatables";

import {formatAuthors, downloadJSON} from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";
import ViewSelected from "./ViewSelected";

export default class ModelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    data: this.props.rows,
                    selectedData: [],
                    viewSelectedOpen: false
                  };

    this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this);
    this.hideTableRows = this.hideTableRows.bind(this);
    this.viewSelectedItems = this.viewSelectedItems.bind(this);
    this.handleViewSelectedClose = this.handleViewSelectedClose.bind(this);
  }

  downloadSelectedJSON(selectedRows) {
    console.log("Download JSON.");
    var selectedModels = [];
    for (var item in selectedRows.data) {
      let data = this.state.data[selectedRows.data[item].index]
      let ordered_data = {};
      Object.keys(data).sort().forEach(function(key) {
        ordered_data[key] = data[key];
      });
      selectedModels.push(ordered_data)
    }
    downloadJSON(JSON.stringify(selectedModels), "selectedModels.json")
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
    var selectedModels = [];
    for (var item in selectedRows.data) {
      let data = this.state.data[selectedRows.data[item].index]
      let ordered_data = {};
      Object.keys(data).sort().forEach(function(key) {
        ordered_data[key] = data[key];
      });
      selectedModels.push(ordered_data)
    }
    this.setState({
                    viewSelectedOpen: true,
                    selectedData: selectedModels
                  })
  }

  handleViewSelectedClose() {
    this.setState({viewSelectedOpen: false})
  }

  render() {
    return (
      <div>
        <MUIDataTable
            title="Models"
            columns={[{name:'ID', options: {display: false}},
                      {name:'Name', options: {display: true}},
                      {name:'Alias', options: {display: false}},
                      {name:'Author', options: {display: true}},
                      {name:'Visibility', options: {display: false}},
                      {name:'Collab ID', options: {display: false}},
                      {name:'Species', options: {display: false}},
                      {name:'Brain region', options: {display: false}},
                      {name:'Cell type', options: {display: false}},
                      {name:'Model scope', options: {display: false}},
                      {name:'Abstraction level', options: {display: false}},
                      {name:'Owner', options: {display: false}},
                      {name:'Organization', options: {display: false}},
                      {name:'jsonObject', options: {display: false, viewColumns: false, filter: false}}
                    ]}
            data={this.state.data.map(item => {
              return [
                      item.id,
                      item.name,
                      item.alias,
                      formatAuthors(item.author),
                      item.private ? 'Private' : 'Public',
                      item.app.collab_id,
                      item.species,
                      item.brain_region,
                      item.cell_type,
                      item.model_scope,
                      item.abstraction_level,
                      formatAuthors(item.owner),
                      item.organization,
                      item
                    ]
            })}
            options={{
              filter: true,
              sort: true,
              rowsPerPage: 20,
              rowsPerPageOptions: [10, 20, 100],
              onRowClick: this.props.handleRowClick,
              responsive: 'stacked', // 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth', 'stackedFullWidth'
              downloadOptions: {filename: 'selectedModels.csv', separator: ',', filterOptions: {useDisplayedRowsOnly: true}},
              customToolbar: () => {
                return <MUIDataTableCustomToolbar changeTableWidth={this.props.changeTableWidth} />;
              },
              customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} viewSelectedItems={this.viewSelectedItems} />
            }}
        />
        <ViewSelected entity="models" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} selectedData={this.state.selectedData} />
      </div>
    );
  }
}