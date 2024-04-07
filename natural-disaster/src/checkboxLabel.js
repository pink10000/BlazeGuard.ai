import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { ListItem } from '@mui/material';

export default function CheckboxLabels() {
  return (
    <ListItem>
    <Box 
          display="flex" 
          alignItems="left" 
          justifyContent="left"
          width="100%"> 
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Wild Fires" />
      <FormControlLabel control={<Checkbox />} label="Hurricanes/Tornados" />
      <FormControlLabel control={<Checkbox />} label="Earthquakes" />
    </FormGroup>
    </Box>
    </ListItem>
  );
}