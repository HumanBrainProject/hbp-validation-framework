import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { datastore } from './datastore';
import { formatAuthors, downloadJSON, showNotification } from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";
import ViewSelected from "./ViewSelected";
import Theme from './theme';
import ContextMain from './ContextMain';
import { withSnackbar } from 'notistack';


class TestTable extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: this.props.testData,
            selectedData: [],
            viewSelectedOpen: false
        };

        this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this);
        this.hideTableRows = this.hideTableRows.bind(this);
        this.viewSelectedItems = this.viewSelectedItems.bind(this);
        this.addTestCompare = this.addTestCompare.bind(this);
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
            // handles data row color; clashes and blocks MuiTableRow
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

        var selectedTests = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedTests.push(ordered_data)
        }
        downloadJSON(JSON.stringify(selectedTests), "selectedTests.json")
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Saved to selectedTests.json", "info")
    }

    hideTableRows(selectedRows) {

        var selectedIndices = [];
        for (var item in selectedRows.data) {
            selectedIndices.push(selectedRows.data[item].dataIndex)
        }
        const updated_data = this.state.data.filter((item, index) => !selectedIndices.includes(index));
        this.setState({ data: updated_data });
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Chosen test(s) have been hidden!", "info")
    }

    viewSelectedItems(selectedRows) {
        console.log("View item(s).")
        var selectedTests = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
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

    async addTestCompare(selectedRows) {
        console.log("Add item(s) to compare.")
        var selectedTests = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedTests.push(ordered_data)
        }

        let [compareTests, setCompareTests] = this.context.compareTests;

        for (let test of selectedTests) {
            // Note: only tests with instances can be added to compare
            if (!test.loadedVersions) {
                test = await datastore.getTest(test.id);
            }
            if (test.instances.length > 0) {
                // check if test already added to compare
                if (!(test.id in compareTests)) {
                    compareTests[test.id] = {
                        "name": test.name,
                        "alias": test.alias,
                        "selected_instances": {}
                    }
                }
                // loop through every instance of this test
                for (let test_inst of test.instances) {
                    // check if test instance already added to compare
                    if (!(test_inst.id in compareTests[test.id].selected_instances)) {
                        compareTests[test.id].selected_instances[test_inst.id] = {
                            "version": test_inst.version,
                            "timestamp": test_inst.timestamp
                        }
                    }
                }
                showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Test '" + test.name + "' added to compare!", "info")
            } else {
                showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Skipped: test '" + test.name + "' (0 instances)!", "error")
            }
        }

        setCompareTests(compareTests);
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
                        columns={this.props.columns}
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
                            onColumnViewChange: this.props.onColumnsChange,  // name changed to "onViewColumnsChange" in recent versions of mui-datatables
                            responsive: 'stacked', // 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth', 'stackedFullWidth'
                            downloadOptions: { filename: 'selectedTests.csv', separator: ',', filterOptions: { useDisplayedRowsOnly: true } },
                            customToolbar: () => {
                                return <MUIDataTableCustomToolbar display={this.props.display} changeTableWidth={this.props.changeTableWidth} tableType="tests" addNew={this.props.openAddTestForm} />;
                            },
                            customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} viewSelectedItems={this.viewSelectedItems} addCompare={this.addTestCompare} />
                        }}
                    />
                </MuiThemeProvider>
                <ViewSelected entity="tests" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} selectedData={this.state.selectedData} />
            </div>
        );
    }
}

export default withSnackbar(TestTable);