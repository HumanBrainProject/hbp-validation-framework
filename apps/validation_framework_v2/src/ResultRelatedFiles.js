import { Button, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import React from "react";
import Theme from "./theme";
import ContextMain from "./ContextMain";
import { copyToClipboard } from "./utils";
import { withSnackbar } from "notistack";
import { corsProxy } from "./globals";

var filesize = require("filesize");

class ResultFile extends React.Component {
  signal = axios.CancelToken.source();
  static contextType = ContextMain;

  constructor(props, context) {
    super(props, context);
    const [authContext] = this.context.auth;

    this.state = {
      auth: authContext,
      file_size: this.props.r_file.size,
      // content_type: this.props.r_file.content_type,
      url: this.props.r_file.download_url,
      download_url: this.props.r_file.download_url,
      filename: this.props.r_file.download_url
        .split("/")
        .pop()
        .split("#")[0]
        .split("?")[0],
      index: this.props.index + 1,
      loaded: false,
      valid: null,
    };

    this.clickPanel = this.clickPanel.bind(this);
  }

  componentDidMount() {
    // files in Collaboratory v2 storage need a suffix to the URL for direct downloads
    if (this.state.url.includes("drive.ebrains.eu")) {
      if (this.state.url.endsWith("?dl=1")) {
        this.setState({
          url: this.state.url.slice(0, -5),
          download_url: this.state.url,
        });
      } else {
        this.setState({ download_url: this.state.url + "?dl=1" });
      }
    }

    // check if file urls are valid
    let config = {
      cancelToken: this.signal.token,
    };
    let query_url = "";
    if (this.state.url.includes("drive.ebrains.eu")) {
      config["headers"] = {
        Authorization: "Bearer " + this.state.auth.token,
      };
      const url_parts = this.state.url.match(".*/lib/(.*)/file(/.*)");
      query_url =
        "https://drive.ebrains.eu/api2/repos/" +
        url_parts[1] +
        "/file/detail/?p=" +
        url_parts[2];
    } else {
      query_url = this.state.url;
    }
    query_url = corsProxy + query_url;

    axios
      .head(query_url, config)
      .then((res) => {
        this.setState({
          valid: true,
        });
        if (!this.state.file_size) {
          this.setState({
            file_size: res.headers["content-length"],
          });
        }
      })
      .catch((err) => {
        this.setState({
          valid: false,
        });
        if (!this.state.file_size) {
          this.setState({
            file_size: "?",
          });
        }
        console.log(err);
      });
  }

  clickPanel(event, expanded) {
    if (!this.state.loaded && expanded) {
      this.setState({ loaded: true });
    }
  }

  render() {
    console.log(this.props.r_file);
    var fsize = isNaN(this.state.file_size)
      ? this.state.file_size
      : filesize(this.state.file_size);
    return (
      <Grid style={{ marginBottom: 10 }}>
        <Accordion
          style={{ backgroundColor: Theme.bodyBackground }}
          onChange={this.clickPanel}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ backgroundColor: Theme.lightBackground }}
          >
            <Grid
              container
              justify="space-between"
              align-items="center"
              fontSize={16}
              my={0}
              py={0}
              fontWeight="fontWeightBold"
            >
              <Grid item>
                <Typography variant="body2">
                  {this.state.index + ") "}
                  <strong>{this.state.filename}</strong>
                  {this.state.file_size && " (" + fsize + ")"}
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  underline="none"
                  style={{ cursor: "pointer" }}
                  href={this.state.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.valid && (
                    <Button
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: Theme.buttonPrimary }}
                    >
                      Download
                    </Button>
                  )}
                </Link>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{ width: "100%" }} my={2}>
              <Typography
                variant="body2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  copyToClipboard(
                    this.state.url,
                    this.props.enqueueSnackbar,
                    this.props.closeSnackbar,
                    "File URL copied"
                  )
                }
              >
                <strong>File URL: </strong>
                {this.state.url}
              </Typography>
              <br />
              {/* check to avoid loading file if not requested by clicking on the exapansion panel */}
              {/* If file is accessible (valid = true) */}
              {this.state.loaded && this.state.valid && (
                <div>
                  <iframe
                    title={"iFrame_" + this.props.index}
                    id={"iFrame_" + this.props.index}
                    style={{ width: "100%", height: "400px" }}
                    src={this.state.url}
                  />
                </div>
              )}
              {/* If file is inaccessible (valid = false) */}
              {this.state.loaded && this.state.valid === false && (
                <div>
                  <Typography variant="body2" style={{ color: "red" }}>
                    This file is currently not accessible!
                  </Typography>
                </div>
              )}
              {/* If file is still being evaluated (valid = null) */}
              {this.state.loaded && this.state.valid === null && (
                <div>
                  <Typography variant="body2">Loading...</Typography>
                </div>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  }
}

class ResultRelatedFiles extends React.Component {
  render() {
    if (this.props.result_files.length === 0) {
      return (
        <Typography variant="subtitle1">
          <b>No files were generated during the validation process!</b>
        </Typography>
      );
    } else {
      return (
        <Grid container>
          <Box px={2} pb={0}>
            <Typography variant="subtitle1">
              <b>File(s) generated during the validation process:</b>
            </Typography>
          </Box>
          <br />
          <br />
          <Grid item xs={12}>
            {/* <TableContainer component={Paper}>
						<Table>
							<TableBody>
								{this.props.result_files.map((r_file, ind) => (
									<ResultFile r_file={r_file} key={ind} />
								))}
							</TableBody>
						</Table>
					</TableContainer> */}

            {this.props.result_files.map((r_file, ind) => (
              <ResultFile
                r_file={r_file}
                key={ind}
                index={ind}
                enqueueSnackbar={this.props.enqueueSnackbar}
                closeSnackbar={this.props.closeSnackbar}
              />
            ))}
          </Grid>
        </Grid>
      );
    }
  }
}

export default withSnackbar(ResultRelatedFiles);
