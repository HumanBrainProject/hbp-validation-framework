import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { formatAuthors, downloadJSON } from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";
import ViewSelected from "./ViewSelected";
import Theme from './theme';
import { showNotification } from './utils';
import { withSnackbar } from 'notistack';

class TestTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.testData,
            selectedData: [],
            viewSelectedOpen: false
        };

        this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this);
        this.hideTableRows = this.hideTableRows.bind(this);
        this.viewSelectedItems = this.viewSelectedItems.bind(this);
        this.handleViewSelectedClose = this.handleViewSelectedClose.bind(this);
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {

            // handles table title bar color
            MUIDataTableToolbar: {
                root: {
                    backgroundColor: Theme.tableHeader,
                    color: Theme.textPrimary
                }
            },
            // handles table data header color
            MUIDataTableHeadCell: {
                fixedHeaderCommon: {
                    backgroundColor: Theme.tableDataHeader
                }
            },
            // // handles data row color; clashes and blocks MuiTableRow
            // MUIDataTableBodyCell: {
            // 	root: {
            // 		backgroundColor: Theme.tableDataRow,
            // 		color: Theme.textPrimary,
            // 		// borderBottom: "none"
            // 	}
            // },
            // handles data footer color
            MUIDataTablePagination: {
                root: {
                    backgroundColor: Theme.tableFooter,
                    color: Theme.textPrimary
                }
            },
            // handles row hover color and selected row color
            MuiTableRow: {
                hover: { '&$root': { '&:hover': { backgroundColor: Theme.tableRowHoverColor }, } },
                root: {
                    '&$selected': {
                        backgroundColor: Theme.tableRowSelectColor
                    }
                }
            },
            MUIDataTableSelectCell: {
                headerCell: {
                    backgroundColor: Theme.tableDataHeader,
                }
            },
        }
    })

    downloadSelectedJSON(selectedRows) {
        console.log("Download JSON.");
        var selectedTests = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].index]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedTests.push(ordered_data)
        }
        downloadJSON(JSON.stringify(selectedTests), "selectedTests.json")
        showNotification(this.props.enqueueSnackbar, "Saved to selectedTests.json", "info")
    }

    hideTableRows(selectedRows) {
        console.log("Hide row(s)!");
        var selectedIndices = [];
        for (var item in selectedRows.data) {
            selectedIndices.push(selectedRows.data[item].index)
        }
        const updated_data = this.state.data.filter((item, index) => !selectedIndices.includes(index));
        this.setState({ data: updated_data });
        showNotification(this.props.enqueueSnackbar, "Chosen test(s) have been hidden!", "info")
    }

    viewSelectedItems(selectedRows) {
        console.log("View item(s).")
        var selectedTests = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].index]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedTests.push(ordered_data)
        }
        this.setState({
            viewSelectedOpen: true,
            selectedData: selectedTests
        })
    }

    handleViewSelectedClose() {
        this.setState({ viewSelectedOpen: false })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title="Tests"
                        columns={[{ name: 'ID', options: { display: false } },
                        { name: 'Name', options: { display: true } },
                        { name: 'Alias', options: { display: false } },
                        { name: 'Author', options: { display: true } },
                        { name: 'Status', options: { display: false } },
                        { name: 'Species', options: { display: false } },
                        { name: 'Brain region', options: { display: false } },
                        { name: 'Cell type', options: { display: false } },
                        { name: 'Test type', options: { display: false } },
                        { name: 'Score type', options: { display: false } },
                        { name: 'Data type', options: { display: false } },
                        { name: 'Data modality', options: { display: false } },
                        { name: 'Data location', options: { display: false } },
                        { name: 'Created date', options: { display: false } },
                        { name: 'jsonObject', options: { display: false, viewColumns: false, filter: false } }
                        ]
                        }
                        data={this.state.data.map(item => {
                            return [
                                item.id,
                                item.name,
                                item.alias,
                                formatAuthors(item.author),
                                item.implementation_status,
                                item.species,
                                item.brain_region,
                                item.cell_type,
                                item.test_type,
                                item.score_type,
                                item.data_type,
                                item.recording_modality,
                                item.data_location,
                                item.date_created,
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
                            downloadOptions: { filename: 'selectedTests.csv', separator: ',', filterOptions: { useDisplayedRowsOnly: true } },
                            customToolbar: () => {
                                return <MUIDataTableCustomToolbar display={this.props.display} changeTableWidth={this.props.changeTableWidth} tableType="tests" addNew={this.props.openAddTestForm} openCompareResults={this.props.openCompareResults} />;
                            },
                            customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} viewSelectedItems={this.viewSelectedItems} />
                        }}
                    />
                </MuiThemeProvider>
                <ViewSelected entity="tests" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} selectedData={this.state.selectedData} />
            </div>
        );
    }
}

export default withSnackbar(TestTable);