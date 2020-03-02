import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

import {formatAuthors, downloadJSON} from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";

export default class TestTable extends React.Component {
  constructor(props) {
    super(props);

    this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this)
  }

  downloadSelectedJSON(params) {
    var selectedTests = [];
    for (var item in params.data) {
      var data = this.props.rows[params.data[item].index]
      var ordered_data = {};
      Object.keys(data).sort().forEach(function(key) { ordered_data[key] = data[key]; });
      selectedTests.push(ordered_data)
    }
    downloadJSON(JSON.stringify(selectedTests), "selectedTests.json")
  }

  render() {
    const handleRowClick = this.props.handleRowClick;
    return (
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
          data={this.props.rows.map(item => {
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
            responsive: 'scrollMaxHeight',// 'stacked'
            downloadOptions: {filename: 'selectedTests.csv', separator: ',', filterOptions: {useDisplayedRowsOnly: true}},
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
