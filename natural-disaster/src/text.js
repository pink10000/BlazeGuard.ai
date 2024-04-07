import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Text() {
  return (
    <div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="Starting Location" 
        variant="outlined"
        sx={{
          input: { color: 'white' }, // style for the input text
          label: { color: 'white' }, // style for the label
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' }, // style for the border
            '&:hover fieldset': {
              borderColor: 'white', // style for the border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // style for the border when focused
            },
          },
        }} 
      />
    </Box>
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="Destination" 
        variant="outlined"
        sx={{
          input: { color: 'white' }, 
          label: { color: 'white' }, 
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': {
              borderColor: 'white', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', 
            },
          },
        }} 
      />
    </Box>
    </div>
  );
}
