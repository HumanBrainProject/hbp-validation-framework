import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Theme from './theme';

function MetadataItem(props) {
	if (props.value) {
		return (
			<ListItem>
				<ListItemText primary={props.value} secondary={props.label} />
			</ListItem>
		)
	} else {
		return "";
	}
}

export default function TestDetailMetadata(props) {
	return (
		<React.Fragment>
			<Grid item style={{ backgroundColor: Theme.metadataInfoBox }}>
				<List aria-label="test metadata">
					<MetadataItem value={props.species} label="Species" />
					<MetadataItem value={props.brainRegion} label="Brain region" />
					<MetadataItem value={props.cellType} label="Cell type" />
					<MetadataItem value={props.recording_modality} label="Recording modality" />
					<MetadataItem value={props.dataType} label="Data type" />
					<MetadataItem value={props.testType} label="Test type" />
					<MetadataItem value={props.scoreType} label="Score type" />
				</List>
			</Grid>
		</React.Fragment>
	);
}
