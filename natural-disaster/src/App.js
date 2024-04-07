import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import "./App.css";
import L from "leaflet";

const center = [40.63463151377654, -97.89969605983609];
const maxBounds = [
  [24.396308, -125.0],
  [49.384358, -66.93457],
];

function StatePolygon({ state, selected, onClick }) {
  const map = useMap();
  const coordinates = state.geometry.coordinates[0].map((item) => [
    item[1],
    item[0],
  ]);

  const handleClick = () => {
    const bounds = L.latLngBounds(coordinates);
    map.fitBounds(bounds);
    onClick(); // onClick to allow states to be selected
  };

  return (
    <Polygon
      pathOptions={{
        fillOpacity: selected ? 0 : 0.6, // no fill if state is selected
        opacity: 1,
        color: "white",
        fillColor: selected ? "transparent" : "#007bff",
        weight: 2,
        dashArray: 3,
      }}
      positions={coordinates}
      eventHandlers={{
        mouseover: (e) => {
          const layer = e.target;
          if (!selected) {
          layer.setStyle({
            dashArray: "",
            opacity: 1,
            color: "white",
            fillColor: "#808080",
            weight: 2,
            fillOpacity: 0.7,
          });
          }
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            dashArray: "3",
            color: "white",
            fillColor: selected ? "transparent" : "#007bff",
            fillOpacity: selected ? 0 : 0.7,
          });
        },
        click: handleClick,
      }}
    />
  );
}

export default function App() {
  const [selectedState, setSelectedState] = useState(null);

  return (
    <MapContainer
      center={center}
      zoom={4}
      minZoom={4}
      maxBounds={maxBounds}
      style={{ width: "100vw", height: "100vh" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=SBZhTEOwJUIIKTs8PQRL"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state, index) => (
        <StatePolygon
          key={index}
          state={state}
          selected={index === selectedState}
          onClick={() => setSelectedState(index)}
        />
      ))}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}