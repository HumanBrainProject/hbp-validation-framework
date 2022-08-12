import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withSnackbar } from "notistack";
import React from "react";
import Markdown from "./Markdown";
import Theme from "./theme";
import { copyToClipboard, formatLabel, formatValue } from "./utils";
import styled from "styled-components";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "white",
        borderBottom: "1px solid #DDDDDD"
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#F3F3F3",
    },
    '&:last-of-type': {
        borderBottom: "2px solid",
        borderColor: Theme.darkBackground
    },
}));

function CommonParameter(props) {
    var m_value = formatValue(props.label, props.m_value);
    var t_value = formatValue(props.label, props.t_value);
    return (
        <StyledTableRow>
            <TableCell>
                <Box
                    overflow="auto"
                    style={{ cursor: "pointer" }}
                    whiteSpace="wrap"
                    onClick={() =>
                        copyToClipboard(
                            m_value,
                            props.enqueueSnackbar,
                            props.closeSnackbar,
                            "Model " +
                            props.entity +
                            formatLabel(props.label) +
                            " copied"
                        )
                    }
                >
                    <Typography variant="body2">{m_value}</Typography>
                </Box>
            </TableCell>
            <TableCell
                align="center"
                style={{ backgroundColor: Theme.tableDarkHeader }}
            >
                <Typography variant="body2">
                    <b>{formatLabel(props.label)}</b>
                </Typography>
            </TableCell>
            <TableCell>
                <Box
                    overflow="auto"
                    style={{ cursor: "pointer" }}
                    whiteSpace="wrap"
                    onClick={() =>
                        copyToClipboard(
                            t_value,
                            props.enqueueSnackbar,
                            props.closeSnackbar,
                            "Test " +
                            props.entity +
                            formatLabel(props.label) +
                            " copied"
                        )
                    }
                >
                    <Typography variant="body2">{t_value}</Typography>
                </Box>
            </TableCell>
        </StyledTableRow>
    );
}

function OtherParameter(props) {
    var value = formatValue(props.label, props.value);
    return (
        <StyledTableRow>
            <TableCell>
                <Typography variant="body2">
                    <b>{formatLabel(props.label)}</b>:{" "}
                </Typography>
            </TableCell>
            <TableCell>
                <Box
                    overflow="auto"
                    style={{ cursor: "pointer" }}
                    whiteSpace="wrap"
                    onClick={() =>
                        copyToClipboard(
                            value,
                            props.enqueueSnackbar,
                            props.closeSnackbar,
                            props.entity +
                            " " +
                            formatLabel(props.label) +
                            " copied"
                        )
                    }
                >
                    <Typography variant="body2">{value}</Typography>
                </Box>
            </TableCell>
        </StyledTableRow>
    );
}

class ResultModelTestInfo extends React.Component {
    render() {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test: Common Parameters</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container item xs={12}>
                                <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                    <Table
                                        style={{
                                            tableLayout: "auto",
                                            borderStyle: "none",
                                            borderRadius: "20px 20px 0 0",
                                            overflow: "hidden",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <TableHead>
                                            <StyledTableRow>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        backgroundColor:
                                                            Theme.tableDarkHeader,
                                                    }}
                                                >
                                                    <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                        <b>Model</b>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    width="160px"
                                                    align="center"
                                                    style={{
                                                        backgroundColor:
                                                            Theme.tableDarkHeader,
                                                    }}
                                                >
                                                    <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                        {/* <b>{"<< "}Parameter{" >>"}</b> */}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        backgroundColor:
                                                            Theme.tableDarkHeader,
                                                    }}
                                                >
                                                    <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                        <b>Test</b>
                                                    </Typography>
                                                </TableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {[
                                                "id",
                                                "uri",
                                                "name",
                                                "alias",
                                                "date_created",
                                                "species",
                                                "brain_region",
                                                "cell_type",
                                            ].map((param) => (
                                                <CommonParameter
                                                    label={param}
                                                    m_value={
                                                        this.props.model[param]
                                                    }
                                                    t_value={
                                                        this.props.test[param]
                                                    }
                                                    key={param}
                                                    enqueueSnackbar={
                                                        this.props
                                                            .enqueueSnackbar
                                                    }
                                                    closeSnackbar={
                                                        this.props.closeSnackbar
                                                    }
                                                    entity=""
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_others"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test: Other Parameters</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                        <Table
                                            style={{
                                                tableLayout: "auto",
                                                borderStyle: "none",
                                                borderRadius: "20px 20px 0 0",
                                                overflow: "hidden",
                                                boxShadow: "none"
                                            }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            backgroundColor:
                                                                Theme.tableDarkHeader,
                                                        }}
                                                        colSpan={2}
                                                    >
                                                        <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                            <b>Model</b>
                                                        </Typography>
                                                    </TableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[
                                                    "author",
                                                    "owner",
                                                    "project_id",
                                                    "organization",
                                                    "private",
                                                    "model_scope",
                                                    "abstraction_level",
                                                ].map((param) => (
                                                    <OtherParameter
                                                        label={param}
                                                        value={
                                                            this.props.model[
                                                            param
                                                            ]
                                                        }
                                                        key={param}
                                                        enqueueSnackbar={
                                                            this.props
                                                                .enqueueSnackbar
                                                        }
                                                        closeSnackbar={
                                                            this.props
                                                                .closeSnackbar
                                                        }
                                                        entity="Model"
                                                    />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                        <Table style={{
                                            tableLayout: "auto",
                                            borderStyle: "none",
                                            borderRadius: "20px 20px 0 0",
                                            overflow: "hidden",
                                            boxShadow: "none"
                                        }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            backgroundColor:
                                                                Theme.tableDarkHeader,
                                                        }}
                                                        colSpan={2}
                                                    >
                                                        <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                            <b>Test</b>
                                                        </Typography>
                                                    </TableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[
                                                    "author",
                                                    "implementation_status",
                                                    "data_location",
                                                    "data_type",
                                                    "recording_modality",
                                                    "test_type",
                                                    "score_type",
                                                ].map((param) => (
                                                    <OtherParameter
                                                        label={param}
                                                        value={
                                                            this.props.test[
                                                            param
                                                            ]
                                                        }
                                                        key={param}
                                                        enqueueSnackbar={
                                                            this.props
                                                                .enqueueSnackbar
                                                        }
                                                        closeSnackbar={
                                                            this.props
                                                                .closeSnackbar
                                                        }
                                                        entity="Test"
                                                    />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test: Descriptions</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <StyledTableRow>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>Model Description</b>
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {this.props.model
                                                        .description ? (
                                                        <Markdown
                                                            source={
                                                                this.props.model
                                                                    .description
                                                            }
                                                        />
                                                    ) : (
                                                        "<< no info >>"
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>Test Protocol</b>
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {this.props.test
                                                        .description ? (
                                                        <Markdown
                                                            source={
                                                                this.props.test
                                                                    .description
                                                            }
                                                        />
                                                    ) : (
                                                        "<< no info >>"
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_common"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test Version: Common Parameters</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                <Table style={{
                                    width: "auto",
                                    tableLayout: "auto",
                                    borderStyle: "none",
                                    borderRadius: "20px 20px 0 0",
                                    overflow: "hidden",
                                    boxShadow: "none"
                                }}>
                                    <TableHead>
                                        <StyledTableRow>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>Model Version</b>
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                width="150px"
                                                align="center"
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    {/* <b>{"<< "}Parameter{" >>"}</b> */}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>Test Version</b>
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            "id",
                                            "uri",
                                            "version",
                                            "timestamp",
                                        ].map((param) => (
                                            <CommonParameter
                                                label={param}
                                                m_value={
                                                    this.props.model_instance[
                                                    param
                                                    ]
                                                }
                                                t_value={
                                                    this.props.test_instance[
                                                    param
                                                    ]
                                                }
                                                key={param}
                                                enqueueSnackbar={
                                                    this.props.enqueueSnackbar
                                                }
                                                closeSnackbar={
                                                    this.props.closeSnackbar
                                                }
                                                entity="instance "
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_instance_others"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test Version: Other Parameters</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                        <Table style={{
                                            tableLayout: "auto",
                                            borderStyle: "none",
                                            borderRadius: "20px 20px 0 0",
                                            overflow: "hidden",
                                            boxShadow: "none"
                                        }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            backgroundColor:
                                                                Theme.tableDarkHeader,
                                                        }}
                                                        colSpan={2}
                                                    >
                                                        <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                            <b>Model Version</b>
                                                        </Typography>
                                                    </TableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[
                                                    "morphology",
                                                    "source",
                                                    "code_format",
                                                    "parameters",
                                                    "hash",
                                                    "license",
                                                ].map((param) => (
                                                    <OtherParameter
                                                        label={param}
                                                        value={
                                                            this.props
                                                                .model_instance[
                                                            param
                                                            ]
                                                        }
                                                        key={param}
                                                        enqueueSnackbar={
                                                            this.props
                                                                .enqueueSnackbar
                                                        }
                                                        closeSnackbar={
                                                            this.props
                                                                .closeSnackbar
                                                        }
                                                        entity="Model instance"
                                                    />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <TableContainer component={Paper} style={{ backgroundColor: Theme.lightBackground }}>
                                        <Table style={{
                                            tableLayout: "auto",
                                            borderStyle: "none",
                                            borderRadius: "20px 20px 0 0",
                                            overflow: "hidden",
                                            boxShadow: "none"
                                        }}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            backgroundColor:
                                                                Theme.tableDarkHeader,
                                                        }}
                                                        colSpan={2}
                                                    >
                                                        <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                            <b>Test Version</b>
                                                        </Typography>
                                                    </TableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {[
                                                    "repository",
                                                    "path",
                                                    "parameters",
                                                ].map((param) => (
                                                    <OtherParameter
                                                        label={param}
                                                        value={
                                                            this.props
                                                                .test_instance[
                                                            param
                                                            ]
                                                        }
                                                        key={param}
                                                        enqueueSnackbar={
                                                            this.props
                                                                .enqueueSnackbar
                                                        }
                                                        closeSnackbar={
                                                            this.props
                                                                .closeSnackbar
                                                        }
                                                        entity="Test instance"
                                                    />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion
                        defaultExpanded={true}
                        style={{ backgroundColor: Theme.lightBackground }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel_model_test_common"
                        >
                            <Typography variant="subtitle1">
                                <b>Model & Test Version: Descriptions</b>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <StyledTableRow>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>
                                                        Model Version
                                                        Description
                                                    </b>
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {this.props.model_instance
                                                        .description
                                                        ? this.props
                                                            .model_instance
                                                            .description
                                                        : "<< no info >>"}
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell
                                                style={{
                                                    backgroundColor:
                                                        Theme.tableDarkHeader,
                                                }}
                                            >
                                                <Typography style={{ color: Theme.lightText, fontSize: "18px" }}>
                                                    <b>
                                                        Test Version Description
                                                    </b>
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {this.props.test_instance
                                                        .description
                                                        ? this.props
                                                            .test_instance
                                                            .description
                                                        : "<< no info >>"}
                                                </Typography>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid >
        );
    }
}

export default withSnackbar(ResultModelTestInfo);
