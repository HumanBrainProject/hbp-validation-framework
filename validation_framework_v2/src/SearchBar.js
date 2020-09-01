import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

export default function SearchBar() {
	const classes = useStyles();

	return (
		<div>
			<Toolbar>
				<FormControl fullWidth className={classes.margin}>
					<OutlinedInput
						id="search"
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
					/>
				</FormControl>
			</Toolbar>
		</div>
	);
}