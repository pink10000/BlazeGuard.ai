import { createContext, useContext, useState } from "react";

const MapContext = createContext([null, () => {}]);

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const mapState = useState(null);

  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>;
};

export default MapContext;
