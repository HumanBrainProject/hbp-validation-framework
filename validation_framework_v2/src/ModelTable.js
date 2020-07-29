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

class ModelTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.modelData,
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
        console.log("Download JSON.");
        var selectedModels = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].index]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedModels.push(ordered_data)
        }
        downloadJSON(JSON.stringify(selectedModels), "selectedModels.json")
        showNotification(this.props.enqueueSnackbar, "Saved to selectedModels.json", "info")
    }

    hideTableRows(selectedRows) {
        console.log("Hide row(s)!");
        var selectedIndices = [];
        for (var item in selectedRows.data) {
            selectedIndices.push(selectedRows.data[item].index)
        }
        const updated_data = this.state.data.filter((item, index) => !selectedIndices.includes(index));
        this.setState({ data: updated_data });
        showNotification(this.props.enqueueSnackbar, "Chosen model(s) have been hidden!", "info")
    }

    viewSelectedItems(selectedRows) {
        console.log("View item(s).")
        var selectedModels = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].index]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
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
        this.setState({ viewSelectedOpen: false })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title="Models"
                        columns={[
                            { name: 'ID', options: { display: false } },
                            { name: 'Name', options: { display: true } },
                            { name: 'Alias', options: { display: false } },
                            { name: 'Author', options: { display: true } },
                            { name: 'Visibility', options: { display: false } },
                            { name: 'Project ID', options: { display: false } },
                            { name: 'Species', options: { display: false } },
                            { name: 'Brain region', options: { display: false } },
                            { name: 'Cell type', options: { display: false } },
                            { name: 'Model scope', options: { display: false } },
                            { name: 'Abstraction level', options: { display: false } },
                            { name: 'Owner', options: { display: false } },
                            { name: 'Organization', options: { display: false } },
                            { name: 'Created Date', options: { display: false } },
                            { name: 'jsonObject', options: { display: false, viewColumns: false, filter: false } }
                        ]}
                        data={this.state.data.map(item => {
                            return [
                                item.id,
                                item.name,
                                item.alias,
                                formatAuthors(item.author),
                                item.private ? 'Private' : 'Public',
                                item.project_id,
                                item.species,
                                item.brain_region,
                                item.cell_type,
                                item.model_scope,
                                item.abstraction_level,
                                formatAuthors(item.owner),
                                item.organization,
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
                            tableBodyMaxHeight: "500px",
                            responsive: 'stacked', // 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth', 'stackedFullWidth'
                            downloadOptions: { filename: 'selectedModels.csv', separator: ',', filterOptions: { useDisplayedRowsOnly: true } },
                            customToolbar: () => {
                                return <MUIDataTableCustomToolbar display={this.props.display} changeTableWidth={this.props.changeTableWidth} tableType="models" addNew={this.props.openAddModelForm} openCompareResults={this.props.openCompareResults} />;
                            },
                            customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} viewSelectedItems={this.viewSelectedItems} />
                        }}
                    />
                </MuiThemeProvider>
                <ViewSelected entity="models" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} selectedData={this.state.selectedData} />
            </div>
        );
    }
}

export default withSnackbar(ModelTable);