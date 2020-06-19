import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Theme from './theme';

function ResultFile(props) {
    // See for details: https://github.com/HumanBrainProject/hbp-validation-framework/issues/246
    let url = "";
    var filename = "";
    if ("download_url" in props.r_file) {
        url = props.r_file.download_url;
        if ("collab_storage" in props.r_file) {
            // for files stored in Collab storage
            filename = props.r_file.collab_storage.path.split('/').pop().split('#')[0].split('?')[0];
        } else {
            //  for files not stored in collab storage
            filename = url.split('/').pop().split('#')[0].split('?')[0];
        }
    } else {
        // collab URL retrieval fails
        url = props.r_file.original_url;
        filename = url.split('/').pop().split('#')[0].split('?')[0];
    }
    return (
        // <TableRow>
        // 	<TableCell>
        // 		<a style={{ display: "table-cell", cursor: 'pointer' }} href={url} target="_blank" rel="noopener noreferrer">
        // 			<Typography variant="body2">
        // 				{filename}
        // 			</Typography>
        // 		</a>
        // 	</TableCell>
        // </TableRow>
        <Box component="div" my={2} bgcolor={Theme.lightBackground} overflow="auto" border={1} borderColor="grey.500" borderRadius={10} style={{ padding: 10 }} whiteSpace="nowrap" width="75%">
            <a style={{ display: "table-cell", cursor: 'pointer' }} href={url} target="_blank" rel="noopener noreferrer">
                <Typography variant="body2">
                    {filename}
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


// Source: https://github.com/HumanBrainProject/hbp-validation-framework/issues/246

// For files in Collab storage, dict will be of the form:
// {
//     "collab_storage": 
//     {
//         "path": "/54781/validation_results/2019-06-25/Poirazi_et_al_2003_CA1_multi_20190625-112220/figs_backpropagating_AP_Poirazi_et_al_2003_AP1_amp_means.pdf",
//         "uuid": "2183d8ba-fcd8-4f2d-9ff4-ced539a477c1"
//     },
//     "download_url": "https://collab.humanbrainproject.eu/#/collab/54781/nav/374631?state=uuid%3D2183d8ba-fcd8-4f2d-9ff4-ced539a477c1"
// }

// If collab URL retrieval fails, then dict will have:
// {
//     "download_url": "https://object.cscs.ch/v1/AUTH_c0a333ecf7c045809321ce9d9ecdfdea/sp6_validation_data/HippoNetworkUnit/CA1_laminar_distribution_synapses.json"
// }