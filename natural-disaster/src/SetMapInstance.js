import { useEffect } from "react"; // Import useEffect from react
import { useMap } from "react-leaflet"; // Import useMap from react-leaflet
import { useMapContext } from "./MapContext"; // Import useMapContext from your MapContext.js

const SetMapInstance = () => { // Add the const keyword
  const map = useMap();
  const [, setMapInstance] = useMapContext();

  useEffect(() => {
    setMapInstance(map);
  }, [map, setMapInstance]);

  return null;
};

export default SetMapInstance; 