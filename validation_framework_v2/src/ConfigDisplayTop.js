import React from 'react';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

import {formatLabel} from './utils'

export default function ConfigDisplayTop(props) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Box fontSize={16} fontWeight="fontWeightBold">App's Current Configuration</Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box>
            {
              Object.keys(props.filters).map((key, index) => (
                <Box lineHeight={2} key={key}>
                  <Box component="span" fontWeight="fontWeightBold">{formatLabel(key)}: </Box>
                  <Box component="span">{props.filters[key].join(', ') ? props.filters[key].join(', ') : "<< all >>"}</Box>
                  <br/>
                </Box>
              ))
            }
          <br/>
          To re-configure the app, click on the configure icon <SettingsIcon />  at the top left of the page.
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
