import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { formatAuthors, downloadJSON } from "./utils";
import MUIDataTableCustomToolbar from "./MUIDataTableCustomToolbar";
import CustomToolbarSelect from "./MUIDataTableCustomRowToolbar";
import ViewSelected from "./ViewSelected";
import Theme from './theme';
import ContextMain from './ContextMain';
import { showNotification } from './utils';
import { withSnackbar } from 'notistack';

class ModelTable extends React.Component {
    static contextType = ContextMain;

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: this.props.modelData,
            selectedData: [],
            viewSelectedOpen: false
        };

        this.downloadSelectedJSON = this.downloadSelectedJSON.bind(this);
        this.hideTableRows = this.hideTableRows.bind(this);
        this.viewSelectedItems = this.viewSelectedItems.bind(this);
        this.addModelCompare = this.addModelCompare.bind(this);
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
        console.log(selectedRows);
        console.log("Download JSON.");
        var selectedModels = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedModels.push(ordered_data)
        }
        downloadJSON(JSON.stringify(selectedModels), "selectedModels.json")
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Saved to selectedModels.json", "info")
    }

    hideTableRows(selectedRows) {
        console.log("Hide row(s)!");
        var selectedIndices = [];
        for (var item in selectedRows.data) {
            selectedIndices.push(selectedRows.data[item].dataIndex)
        }
        const updated_data = this.state.data.filter((item, index) => !selectedIndices.includes(index));
        this.setState({ data: updated_data });
        showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Chosen model(s) have been hidden!", "info")
    }

    viewSelectedItems(selectedRows) {
        console.log("View item(s).")
        var selectedModels = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
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

    addModelCompare(selectedRows) {
        console.log("Add item(s) to compare.")
        var selectedModels = [];
        for (var item in selectedRows.data) {
            let data = this.state.data[selectedRows.data[item].dataIndex]
            let ordered_data = {};
            Object.keys(data).sort().forEach(function (key) {
                ordered_data[key] = data[key];
            });
            selectedModels.push(ordered_data)
        }

        let [compareModels, setCompareModels] = this.context.compareModels;
        console.log(compareModels);
        for (let model of selectedModels) {
            // Note: only models with instances can be added to compare
            if (model.instances.length > 0) {
                // check if model already added to compare
                if (!(model.id in compareModels)) {
                    compareModels[model.id] = {
                        "name": model.name,
                        "alias": model.alias,
                        "selected_instances": {}
                    }
                }
                // loop through every instance of this model
                for (let model_inst of model.instances) {
                    // check if model instance already added to compare
                    if (!(model_inst.id in compareModels[model.id].selected_instances)) {
                        compareModels[model.id].selected_instances[model_inst.id] = {
                            "version": model_inst.version,
                            "timestamp": model_inst.timestamp
                        }
                    }
                }
                showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Model '" + model.name + "' added to compare!", "info")
            } else {
                showNotification(this.props.enqueueSnackbar, this.props.closeSnackbar, "Skipped: model '" + model.name + "' (0 instances)!", "error")
            }
        }
        console.log(compareModels);
        setCompareModels(compareModels);
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
                        columns={this.props.columns}
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
                            onColumnViewChange: this.props.onColumnsChange,  // name changed to "onViewColumnsChange" in recent versions of mui-datatables
                            tableBodyMaxHeight: "500px",
                            responsive: 'stacked', // 'scrollMaxHeight', 'scrollFullHeight', 'scrollFullHeightFullWidth', 'stackedFullWidth'
                            downloadOptions: { filename: 'selectedModels.csv', separator: ',', filterOptions: { useDisplayedRowsOnly: true } },
                            customToolbar: () => {
                                return <MUIDataTableCustomToolbar display={this.props.display} changeTableWidth={this.props.changeTableWidth} tableType="models" addNew={this.props.openAddModelForm} />;
                            },
                            customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} downloadSelectedJSON={this.downloadSelectedJSON} hideTableRows={this.hideTableRows} viewSelectedItems={this.viewSelectedItems} addCompare={this.addModelCompare} />
                        }}
                    />
                </MuiThemeProvider>
                <ViewSelected entity="models" open={this.state.viewSelectedOpen} onClose={this.handleViewSelectedClose} selectedData={this.state.selectedData} />
            </div>
        );
    }
}

export default withSnackbar(ModelTable);