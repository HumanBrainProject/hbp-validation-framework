import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

import formatAuthors from "./utils";
import CustomToolbar from "./CustomToolbar";

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});


export default function ModelTable(props) {
    const classes = useStyles();

    const handleRowClick = props.handleRowClick;

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
          data={props.rows.map(item => {
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
            downloadOptions: {filename: 'selectedModels.csv', separator: ',', filterOptions: {useDisplayedRowsOnly: true}},
            customToolbar: () => {
              return <CustomToolbar />;
            }
          }}
          onRowClick={(event, rowData) => handleRowClick(event, rowData)}
      />
  );
}
