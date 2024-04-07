import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from '@mui/material/styles';

const WhiteRadio = styled(Radio)(({ theme }) => ({
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
  }));

const WhiteFormLabel = styled(FormLabel)(({ theme }) => ({
    color: 'white',
    '&.Mui-focused': {
      color: 'white',
    },
  }));
  
export default function RadioButtonsGroup({ onChange }) {
    return (
      <FormControl>
        <WhiteFormLabel id="demo-radio-buttons-group-label">Map Type</WhiteFormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Satellite"
          name="radio-buttons-group"
          onChange={(event) => onChange(event.target.value)}
        >
          <FormControlLabel value="Satellite" control={<WhiteRadio />} label="Satellite" sx={{ color: 'white' }} />
          <FormControlLabel value="Roads" control={<WhiteRadio />} label="Roads" sx={{ color: 'white' }} />
        </RadioGroup>
      </FormControl>
    );
  }
  
