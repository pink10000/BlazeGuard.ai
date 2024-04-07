import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const FlyToLocation = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 1);
    }
  }, [lat, lng, map]);

  return null;
};

export default FlyToLocation;
