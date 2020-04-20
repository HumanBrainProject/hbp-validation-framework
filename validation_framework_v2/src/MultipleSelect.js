import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { formatLabel } from "./utils";

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 700,
		maxWidth: 900,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export default function MultipleSelect(props) {
	const classes = useStyles();
	//const [itemName, setItemName] = React.useState([]);
	const fieldId = "select-" + props.label.replace(" ", "-");
	const fieldLabelId = fieldId + "-label";
	const fieldName = props.label.replace(" ", "_")

	//   const handleChange = event => {
	//     setItemName(event.target.value);
	//   };

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id={fieldLabelId}>{formatLabel(props.label)}</InputLabel>
				<Select
					labelId={fieldLabelId}
					id={fieldId}
					multiple
					value={props.value}
					name={fieldName}
					onChange={props.handleChange}
					input={<Input />}
					renderValue={selected => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{props.itemNames.map(name => (
						<MenuItem key={name} value={name}>
							<Checkbox checked={props.value.indexOf(name) > -1} />
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
