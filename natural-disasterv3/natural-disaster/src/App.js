import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import "./App.css";

const center = [40.63463151377654, -97.89969605983609];
const maxBounds = [
  [24.396308, -125.0], // Southwest coordinates (latitude, longitude)
  [49.384358, -66.93457] // Northeast coordinates (latitude, longitude)
];
export default function App() {
  return (
    <MapContainer
      center={center}
      zoom={4}
      minZoom={4}
      maxBounds={maxBounds}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=SBZhTEOwJUIIKTs8PQRL"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            pathOptions={{
              fillOpacity: 0.7,
              opacity: 1,
              color: "white",
              fillColor: "#007bff",
              weight: 2,
              dashArray: 3,
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  opacity: 1,
                  color: "white",
                  fillColor: "#808080",
                  weight: 2,
                  fillOpacity: 0.7,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                  fillColor: "#007bff",
                  fillOpacity: 0.7,
                });
              },
              click: (e) => {},
            }}
          />
        );
      })}
    </MapContainer>
  );
}
