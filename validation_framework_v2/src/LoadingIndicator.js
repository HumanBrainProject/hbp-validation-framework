import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingIndicator() {
    return (
        // <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', marginBottom: '100px'}}>
            <CircularProgress />
        </div>
    )
};