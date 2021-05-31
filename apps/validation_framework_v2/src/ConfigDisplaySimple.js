import React from "react";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import RoomIcon from "@material-ui/icons/Room";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLarge";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MicIcon from "@material-ui/icons/Mic";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

import { formatLabel } from "./utils";
import { filterKeys, filterModelKeys, filterTestKeys } from "./globals";

const iconLookup = {
    // todo: replace these with some more meaningful, custom icons
    species: () => {
        return <EmojiNatureIcon />;
    },
    brain_region: () => {
        return <RoomIcon />;
    },
    cell_type: () => {
        return <Brightness5Icon />;
    },
    model_scope: () => {
        return <PhotoSizeSelectLargeIcon />;
    },
    abstraction_level: () => {
        return <ImageSearchIcon />;
    },
    test_type: () => {
        return <BrokenImageIcon />;
    },
    score_type: () => {
        return <AssessmentIcon />;
    },
    recording_modality: () => {
        return <MicIcon />;
    },
    implementation_status: () => {
        return <DonutLargeIcon />;
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "right",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

function FilterDisplay(props) {
    let icon = iconLookup[props.filterName]();
    return (
        <React.Fragment>
            {props.values.map((value, index) => {
                return (
                    <Tooltip title={formatLabel(props.filterName)} key={index}>
                        <Chip
                            key={value}
                            label={value}
                            variant="outlined"
                            icon={icon}
                        />
                    </Tooltip>
                );
            })}
        </React.Fragment>
    );
}

export default function ConfigDisplayTop(props) {
    const classes = useStyles();
    let showFilters = {};
    if (props.display === "Only Models") {
        showFilters = filterModelKeys;
    } else if (props.display === "Only Tests") {
        showFilters = filterTestKeys;
    } else {
        showFilters = filterKeys;
    }
    return (
        <div className={classes.root}>
            {showFilters.map((filterName, index) => {
                return (
                    <FilterDisplay
                        filterName={filterName}
                        values={props.filters[filterName]}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
