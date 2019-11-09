import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});


// function handleRowClick(event, rowData) {
//   console.log(event);
//   console.log(rowData);
// }


export default function ModelTable(props) {
    const classes = useStyles();

    const handleRowClick = props.handleRowClick;

    return (
      <MaterialTable
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Authors', field: 'authors' },
            { title: 'Species', field: 'species' },
            { title: 'Brain Region', field: 'brainRegion' },
            { title: 'Cell Type', field: 'cellType' },
            { title: 'Model Scope', field: 'modelScope' },
            { title: 'Abstraction Level', field: 'abstractionLevel' },
            { title: 'Collab ID', field: 'collabID', type: 'numeric' },
            { title: 'Privacy', field: 'privacy' },
          ]}
          data={props.rows}
          title=""
          options={{
            search: false,
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
