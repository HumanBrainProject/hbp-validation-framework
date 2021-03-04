import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { baseUrl } from "./globals";
import { formatAuthors, formatTimeStamp } from "./utils";
import { getComparator, stableSort } from "./sorting";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});


function getModels(auth) {
    const url = baseUrl + "/models/?size=50";
    const config = {
        headers: {
            'Authorization': 'Bearer ' + auth.token,
        }
    }

    return axios.get(url, config);
}


function AliasIcon(alias) {
    if (alias) {
        return (
            <Tooltip title={alias}>
                <IconButton aria-label="alias">
                    <BookmarkBorderIcon />
                </IconButton>
            </Tooltip>)
    } else {
        return "";
    }
}


function formatAuthorsShort(authors) {
    if (authors) {
        if (authors.length > 1) {
            return (
                <Tooltip title={formatAuthors(authors)}>
                    <span>{authors[0].family_name} <i>et al.</i></span>
                </Tooltip>
            )
        } else {
            return formatAuthors(authors);
        }
    } else {
        return "";
    }
}


function AccessibilityIcon(is_private) {
    if (is_private) {
        return (
            <LockIcon color="disabled" />
        )
    } else {
        return (
            <PublicIcon color="disabled" />
        )
    }
}


function getLicenses(model) {
    const allVersions = new Set();
    for (let instance of model.instances) {
        allVersions.add(instance.license);
    }
    return Array.from(allVersions).join(", ");
}


function getCodeFormats(model) {
    const allFormats = new Set();
    for (let instance of model.instances) {
        allFormats.add(instance.code_format);
    }
    return Array.from(allFormats).join(", ");
}

function getCodeLocations(model) {
    const patterns = {
        "https://object.cscs.ch": "CSCS",
        "swift://cscs.ch": "CSCS*",
        "https://ksproxy.cscs.ch": "CSCS*",
        "https://kg.humanbrainproject.org/proxy/export": "CSCS*",
        "https://github.com": "Github",
        "https://senselab.med.yale.edu": "ModelDB",
        "http://modeldb.yale.edu": "ModelDB",
        "http://example.com": "For testing",
        "https://collab.humanbrainproject.eu": "Collab-v1",
        "collab://": "Collab-v1",
        "https://drive.ebrains.eu": "Drive",
        "https://zenodo.org": "Zenodo",
        "https://www.ebi.ac.uk": "BioModels"
    };
    const allLocations = new Set();
    for (let instance of model.instances) {
        let foundPattern = false;
        if (instance.source) {
            for (const [pattern, label] of Object.entries(patterns)) {
                if (instance.source.startsWith(pattern)) {
                    allLocations.add(label);
                    foundPattern = true;
                    break;
                }
            }
        }
        if (!foundPattern) {
            allLocations.add("Other");
        }
    }
    return Array.from(allLocations).join(", ");
}

function AlternativeLink(url) {
    return (
        <IconButton href={url} target="_blank" rel="noopener">
            <Avatar alt="KG Search" src="/docs/static/img/ebrains_logo.png" />
        </IconButton>
    )
}

function linkAlternatives(model) {
    let icons = [];
    for (let instance of model.instances) {
        for (let url of instance.alternatives) {
            icons.push(AlternativeLink(url))
        }
    }
    return icons;
}


export default function ModelTable(props) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [models, setModels] = React.useState([]);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date_created');
    const [sortType, setSortType] = React.useState('string');

    React.useEffect(() => {
        setLoading(true);
        getModels(props.auth)
            .then(res => {
                console.log("Got models");
                console.log(res.data);
                setModels(res.data);
                setLoading(false);
            })
            .catch(err => {
                setErrorMessage('Error: ', err.message);
                setLoading(false);
            });
    }, []);

    const handleRequestSort = (event, property, type) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setSortType(type);
        console.log(`Handle request sort by ${property}, order ${isAsc ? 'desc' : 'asc'}`);
    };

    const createSortHandler = (property, type) => (event) => {
        handleRequestSort(event, property, type);
    };

    const SortableColumnHeader = (col) => {
        if (col.sortAttr) {
            return (
                <TableCell sortDirection={orderBy === col.sortAttr ? order : false}>
                    <TableSortLabel
                        active={orderBy === col.sortAttr}
                        direction={orderBy === col.sortAttr ? order : 'asc'}
                        onClick={createSortHandler(col.sortAttr, col.type)}
                    >
                        <b>{col.label}</b>
                        {orderBy === col.sortAttr ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            )
        } else {
            return (
                <TableCell><b>{col.label}</b></TableCell>
            )
        }
    }

    const columns = [
        { label: "", sortAttr: "private", type: "boolean" },
        { label: "", sortAttr: null }, // index
        { label: "ID", sortAttr: "id", type: "string"  },
        { label: "Name", sortAttr: "name", type: "string" },
        { label: "Creation date", sortAttr: "date_created", type: "string" },
        { label: "No. of versions", sortAttr: null, type: "string" },
        { label: "KG links", sortAttr: null, type: "string" },
        { label: "License(s)", sortAttr: null, type: "string" },
        { label: "Code format(s)", sortAttr: null, type: "string" },
        { label: "Code location", sortAttr: null, type: "string" },
        { label: "Alias", sortAttr: "alias", type: "string" },
        { label: "Author(s)", sortAttr: null, type: "string" },
        { label: "Owner(s)", sortAttr: null, type: "string" },
        { label: "Collab", sortAttr: "project_id", type: "string" },
        { label: "Description length", sortAttr: null, type: "number" },
        { label: "Uses LaTeX", sortAttr: null, type: "boolean" },
        { label: "Cell type", sortAttr: "cell_type", type: "string" },
        { label: "Model scope", sortAttr: "model_scope", type: "string" },
        { label: "Abstraction level", sortAttr: "abstraction_level", type: "string" },
        { label: "Brain Region", sortAttr: "brain_region", type: "string" },
        { label: "Species", sortAttr: "species", type: "string" },
        { label: "Organization", sortAttr: "organization", type: "string" }
    ]

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                <CircularProgress />
            </div>
        )
    } else if (errorMessage) {
        return (
            <div>
                <p>{errorMessage}</p>
            </div>
        )
    } else {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => SortableColumnHeader(col))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(models, getComparator(order, orderBy, sortType)).map((model, index) => (
                            <TableRow key={model.id}>
                                <TableCell>{AccessibilityIcon(model.private)}</TableCell>
                                <TableCell>{index}</TableCell>
                                <TableCell>
                                    <Tooltip title={model.uri}><span>{model.id.slice(0, 7)}...</span></Tooltip>
                                </TableCell>
                                <TableCell>{model.name}</TableCell>
                                <TableCell>{formatTimeStamp(model.date_created)}</TableCell>
                                <TableCell>{model.instances.length}</TableCell>
                                <TableCell>{linkAlternatives(model)}</TableCell>
                                <TableCell>{getLicenses(model)}</TableCell>
                                <TableCell>{getCodeFormats(model)}</TableCell>
                                <TableCell>{getCodeLocations(model)}</TableCell>
                                <TableCell>{AliasIcon(model.alias)}</TableCell>
                                <TableCell>{formatAuthorsShort(model.author)}</TableCell>
                                <TableCell>{formatAuthorsShort(model.owner)}</TableCell>
                                <TableCell>{model.project_id}</TableCell>
                                <TableCell>{model.description.length}</TableCell>
                                <TableCell>{model.description.includes('$') ? '$$' : ''}</TableCell>
                                <TableCell>{model.cell_type}</TableCell>
                                <TableCell>{model.model_scope}</TableCell>
                                <TableCell>{model.abstraction_level}</TableCell>
                                <TableCell>{model.brain_region}</TableCell>
                                <TableCell>{model.species}</TableCell>
                                <TableCell>{model.organization}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
