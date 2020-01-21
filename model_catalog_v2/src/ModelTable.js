import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

import formatAuthors from "./utils";

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
      <MaterialTable
          columns={[
            { title: 'Name', field: 'name' },
            {
              title: 'Authors',
              field: 'authors',
              render: rowData => formatAuthors(rowData.author),
              customFilterAndSearch: (value, rowData) => {
                return formatAuthors(rowData.author).toLowerCase().includes(value.toLowerCase());
              }
            },
            { title: 'Species', field: 'species' },
            { title: 'Brain Region', field: 'brain_region' },
            { title: 'Cell Type', field: 'cell_type' },
            { title: 'Model Scope', field: 'model_scope' },
            { title: 'Abstraction Level', field: 'abstraction_level' },
            { title: 'Collab ID', field: 'app.collab_id', type: 'numeric' },
            {
              title: 'Privacy',
              field: 'privacy',
              render: rowData => (rowData.private) ? 'Private' : 'Public'
            },
            // add hidden columns (e.g. description) for search?
            // or override DataManager.searchData ?
          ]}
          data={props.rows}
          title=""
          options={{
            search: true,
            sorting: true,
            pageSize: 20,
            pageSizeOptions: [10, 20, 100]
          }}
          onRowClick={(event, rowData) => handleRowClick(event, rowData)}
      />
    //   <Paper className={classes.root}>
    //     <Table className={classes.table} size="small" aria-label="model table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Name</TableCell>
    //           <TableCell>Authors</TableCell>
    //           <TableCell>Species</TableCell>
    //           <TableCell>Brain Region</TableCell>
    //           <TableCell>Cell Type</TableCell>
    //           <TableCell>Model Scope</TableCell>
    //           <TableCell>Abstraction Level</TableCell>
    //           <TableCell>Collab ID</TableCell>
    //           <TableCell>Privacy</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //       {rows.map(row => (
    //         <TableRow key={row.name}>
    //           <TableCell component="th" scope="row">
    //             {row.name}
    //           </TableCell>
    //           <TableCell>{row.authors}</TableCell>
    //           <TableCell>{row.species}</TableCell>
    //           <TableCell>{row.brainRegion}</TableCell>
    //           <TableCell>{row.cellType}</TableCell>
    //           <TableCell>{row.modelScope}</TableCell>
    //           <TableCell>{row.abstractionLevel}</TableCell>
    //           <TableCell>{row.collabID}</TableCell>
    //           <TableCell>{row.privacy}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </Paper>
  );
}
