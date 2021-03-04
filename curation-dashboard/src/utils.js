import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


export function formatAuthors(authors) {
    if (authors) {
        return authors.map(author => (author.given_name + " " + author.family_name)).join(", ");
    } else {
        return "";
    }
}


export function formatTimeStamp(ISOtimestamp) {
    if (ISOtimestamp) {
        const d = new Date(ISOtimestamp);
        const formattedDate = `${d.getFullYear()}-${d.getMonth().toString().padStart(2,0)}-${d.getDate().toString().padStart(2,0)}`;
        return (
            <Tooltip title={ISOtimestamp}>
                <span>{formattedDate}</span>
            </Tooltip>
        )
    } else {
        return "";
    }
}