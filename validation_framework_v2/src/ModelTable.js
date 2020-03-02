import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

import {formatAuthors, downloadJSON} from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";

export default class ModelTable extends React.Component {
  constructor(props) {
    super(props);

    this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this)
  }

  downloadSelectedJSON(params) {
    var selectedModels = [];
    for (var item in params.data) {
      var data = this.props.rows[params.data[item].index]
      var ordered_data = {};
      Object.keys(data).sort().forEach(function(key) { ordered_data[key] = data[key]; });
      selectedModels.push(ordered_data)
    }
    console.log(selectedModels)
    downloadJSON(JSON.stringify(selectedModels), "selectedModels.json")
  }

  render() {
    const handleRowClick = this.props.handleRowClick;
    return (
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
                    {name:'Organization', options: {display: false}}]}
          data={this.props.rows.map(item => {
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
                    item.organization
                  ]
          })}
          options={{
            filter: true,
            sort: true,
            rowsPerPage: 20,
            rowsPerPageOptions: [10, 20, 100],
            responsive: 'scrollMaxHeight',// 'stacked'
            downloadOptions: {filename: 'selectedModels.csv', separator: ',', filterOptions: {useDisplayedRowsOnly: true}},
            customToolbar: () => {
              return <MUIDataTableCustomToolbar changeTableWidth={this.props.changeTableWidth} />;
            },
            customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} />
          }}
          onRowClick={(event, rowData) => handleRowClick(event, rowData)}
      />
    );
  }
}
