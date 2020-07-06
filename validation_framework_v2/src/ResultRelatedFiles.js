import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Theme from './theme';

function ResultFile(props) {
    let url = props.r_file.download_url;
    const filename = url.split('/').pop().split('#')[0].split('?')[0];

    var file_entry = filename;
    if (props.r_file.content_type) {
        file_entry += " (" + props.r_file.content_type + ")"
    }
    if (props.r_file.size) {
        file_entry += " - " + props.r_file.size
    }


    return (
        // <TableRow>
        // 	<TableCell>
        // 		<a style={{ display: "table-cell", cursor: 'pointer' }} href={url} target="_blank" rel="noopener noreferrer">
        // 			<Typography variant="body2">
        // 				{file_entry}
        // 			</Typography>
        // 		</a>
        // 	</TableCell>
        // </TableRow>
        <Box component="div" my={2} bgcolor={Theme.lightBackground} overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10 }} whiteSpace="nowrap" width="75%">
            <a style={{ display: "table-cell", cursor: 'pointer' }} href={url} target="_blank" rel="noopener noreferrer">
                <Typography variant="body2">
                    {file_entry}
                </Typography>
            </a>
        </Box>
    )
}

export default class ResultRelatedFiles extends React.Component {
    render() {
        if (this.props.result_files.length === 0) {
            return (
                <Typography variant="subtitle1"><b>No files were generated during the validation process!</b></Typography>
            )
        } else {
            return (
                <Grid container>
                    <Box px={2} pb={0}>
                        <Typography variant="subtitle1"><b>File(s) generated during the validation process:</b></Typography>
                    </Box>
                    <br /><br />
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
                            <ResultFile r_file={r_file} key={ind} />
                        ))}
                    </Grid>
                </Grid>
            )
        }
    }
}