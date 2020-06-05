import React from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import Theme from './theme';

import { formatLabel } from './utils';
import { filterKeys, filterModelKeys, filterTestKeys } from "./globals";

export default function ConfigDisplayTop(props) {
	let showFilters = {};
	if (props.display === "Only Models") {
		showFilters = filterModelKeys;
	} else if (props.display === "Only Tests") {
		showFilters = filterTestKeys;
	} else {
		showFilters = filterKeys;
	}
	return (
		<ExpansionPanel style={{backgroundColor: Theme.lightBackground}}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Box fontSize={16} fontWeight="fontWeightBold">View Current Configuration</Box>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Box>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Box component="span" fontWeight="fontWeightBold">Display: </Box>
						</Grid>
						<Grid item xs={8}>
							<Box component="span">
								<Chip label={props.display} variant="outlined" />
							</Box>
						</Grid>
					</Grid>
					{
						showFilters.map((key, index) => (
							<Grid container spacing={3}>
								<Grid item xs={4}>
									<Box component="span" fontWeight="fontWeightBold">{formatLabel(key)}: </Box>
								</Grid>
								<Grid item xs={8}>
									<Box component="span">
										{
											props.filters[key].length > 0
												?
												props.filters[key].forEach(
													element => <Chip label={element} variant="outlined" />
												)
												:
												<Chip label="<< all >>" variant="outlined" />
										}
									</Box>
								</Grid>
							</Grid>
						))
					}
					<br />
          To re-configure the app, click on the configure icon <SettingsIcon />  at the top left of the page.
        </Box>
			</ExpansionPanelDetails>
		</ExpansionPanel >
	);
}