import moment from 'moment'

export function downloadJSON(json, filename) {
    const blob = new Blob([json], { type: 'application/json' });

    /* taken from react-csv */
    if (navigator && navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const dataURI = `data:application/json;charset=utf-8,${json}`;

        const URL = window.URL || window.webkitURL;
        const downloadURI = typeof URL.createObjectURL === 'undefined' ? dataURI : URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.setAttribute('href', downloadURI);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


export function formatAuthors(authors) {
    if (authors) {
        return authors.map(author => (author.given_name + " " + author.family_name)).join(", ");
    } else {
        return "";
    }
}


export function formatTimeStampToLongString(ISOtimestamp) {
    if (ISOtimestamp) {
        const d = new Date(ISOtimestamp);
        return d.toUTCString();
    } else {
        return "";
    }
}


export function formatTimeStampToCompact(ISOtimestamp) {
    if (ISOtimestamp) {
        return moment(ISOtimestamp).format('DD-MM-YYYY (HH:MM)');
    } else {
        return "";
    }
}


export function roundFloat(value, places) {
    return `${value.toFixed(places)}`;
}


export function formatValue(label, value) {
    if (["owner", "author"].indexOf(label) > -1) {
        value = formatAuthors(value);
    }
    if (["timestamp", "creation_date", "date_created"].indexOf(label) > -1) {
        value = formatTimeStampToLongString(value);
    }
    if (label === "app") {
        value = value.collab_id;
    }
    if (label === "private") {
        value = value ? "True" : "False";
    }
    return value;
}


export function formatLabel(label) {
    // function to format labels by converting underscores and hyphens to spaces, and
    // capitalizing each word; certain specific labels are changed entirely to uppercase
    if (["id", "uri"].indexOf(label) > -1) {
        label = label.toUpperCase();
    } else {
        label = label.replace(/_/g, ' ');
        label = label.replace(/-/g, ' ');
        label = label
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return label;
}


export function isUUID(uuid) {
    let s = "" + uuid;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
        return false;
    }
    return true;
}


export function copyToClipboard(value, enqueueSnackbar, message, type = 'default') {
    // type: default, success, error, warning, info
    navigator.clipboard.writeText(value)
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
    })
}


export function showNotification(enqueueSnackbar, message, type = 'default') {
    // type: default, success, error, warning, info
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
    })
}


export function reformatErrorMessage(errorResponse) {
    let output = "Error code = " + errorResponse.status;
    if (typeof (errorResponse.data.detail) === "string") {
        output += "\n\n" + errorResponse.data.detail;
    } else {
        // presuming keys 'loc' and 'msg' exist; update func if necessary to handle other cases
        errorResponse.data.detail.forEach(function (entry, index) {
            let error_loc = entry.loc.join(" -> ")
            let error_msg = entry.msg;
            output += "\n\n";
            output += "Error source #" + (index + 1) + ": " + error_loc;
            output += "\nError message: " + error_msg;
        });
    }
    return output;
}


export function replaceEmptyStringsWithNull(param) {
    if (param === null) {
        return param
    } else if (typeof(param) === "string") {
        return param === "" ? null : param;
    } else if (Array.isArray(param)) {
        return param.map(element => replaceEmptyStringsWithNull(element));
    } else if (typeof(param) === "object") {
        Object.entries(param).map(function ([key, val]) {
            param[key] = replaceEmptyStringsWithNull(val)
        });
        return param
    } else {
        // e.g. number, boolean
        return param;
    }
}