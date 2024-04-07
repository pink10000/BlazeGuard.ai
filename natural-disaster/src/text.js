import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const styles = {
    pacContainer: {
      marginTop: '10px !important',
    },
  };

export default function Text(props) {
  const [startingLocation, setStartingLocation] = useState('');
  const [destination, setDestination] = useState('');
  const startingLocationRef = useRef(null);
  const destinationRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault(); 
  };

  useEffect(() => {
    window.initMap = function() {
        if (startingLocationRef.current) {
            const startingAutocomplete = new window.google.maps.places.Autocomplete(
              startingLocationRef.current,
              { types: ['geocode'], componentRestrictions: { country: "US" } }
            );
            
            startingAutocomplete.addListener('place_changed', () => {
              const place = startingAutocomplete.getPlace();
              console.log("Latitude:", place.geometry.location.lat());
console.log("Longitude:", place.geometry.location.lng());

              if (place.geometry && place.geometry.location) {
                setStartingLocation(place.formatted_address || ''); // Ensure this is always a string
                if (typeof props.onPlaceSelected === 'function') {
                  props.onPlaceSelected(place.geometry.location.lat(), place.geometry.location.lng());
                  
                }
              }
            });
          }


      if (destinationRef.current) {
        const destinationAutocomplete = new window.google.maps.places.Autocomplete(
          destinationRef.current,
          { types: ['geocode'],
          componentRestrictions: { country: "US" } },
          
        );
        destinationAutocomplete.addListener('place_changed', () => {
          const place = destinationAutocomplete.getPlace();
          setDestination(place.formatted_address);
        });
      }
    };
    
    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDL1SIrABTLHdlTB6ww7LAk0YyYnr2puSc&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
        style={styles.pacContainer}
        onSubmit={handleSubmit}
      >
        <TextField
          inputRef={startingLocationRef} 
          label="Starting Location"
          variant="outlined"
          value={startingLocation}
          onChange={(e) => setStartingLocation(e.target.value)}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
          }}
        />
      </Box>
    </div>
  );
}
