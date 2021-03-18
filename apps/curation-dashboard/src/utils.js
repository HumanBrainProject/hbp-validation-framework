import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { codeLocationPatterns } from "./globals";


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


export function classifyCodeLocation(url) {
    if (url) {
        for (const [pattern, label] of Object.entries(codeLocationPatterns)) {
            if (url.startsWith(pattern)) {
                return label;
            }
        }
        return "Other";
    }
    return null;
}