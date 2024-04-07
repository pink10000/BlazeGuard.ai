import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMap, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import "./App.css";
import L from "leaflet";
import fireIcon from './img/fire-icon-small.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import Sidebar from "./Sidebar";
import { stateAbbreviations } from "./stateAbbreviations";

const center = [40.63463151377654, -97.89969605983609];
const maxBounds = [
  [24.396308, -125.0],
  [49.384358, -66.93457],
];

function WildfireLayer({ wildfireData }) {
  const fireMarkerIcon = L.icon({
    iconUrl: fireIcon,
    iconSize: [32, 32], // Adjust the size of the icon as needed
    iconAnchor: [16, 32], // Position the icon's anchor point
    popupAnchor: [0, -32] // Position the popup relative to the icon
  });

  return (
    <MarkerClusterGroup
      iconCreateFunction={(cluster) => {
        return L.divIcon({
          html: `<div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px; /* Match the iconSize height */
          width: 40px; /* Match the iconSize width */
          background-color: orange;
          color: black;
          font-size: 16px; /* Or any size that fits your design */
          font-weight: bold;
          border-radius: 50%; /* Optional: if you want the square to be a circle */
      ">
          ${cluster.getChildCount()}
      </div>`,
          className: 'mycluster', iconSize: L.point(40,40)});
      }}
    >
      {wildfireData.map((wildfire, index) => (
        <Marker key={index} position={wildfire} icon={fireMarkerIcon}>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}

function StatePolygon({ state, selected, onClick }) {
  const map = useMap();
  const coordinates = state.geometry.coordinates[0].map((item) => [
    item[1],
    item[0],
  ]);

  const handleClick = () => {
    map.fitBounds(coordinates);
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
        click: handleClick,
      }}
    />
  );
}

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [wildfireData, setWildfireData] = useState([]);

  useEffect(() => {
    const fetchWildfireData = async (stateAbbreviation) => {
      try {
        console.log("abbrev: " + stateAbbreviation);
        const response = await fetch(`./outdata/${stateAbbreviation}.csv`);
        const data = await response.text();
        console.log(data);
        const parsedData = parseCSV(data);
        setWildfireData(parsedData);
      } catch (error) {
        console.error('Error fetching wildfire data:', error);
      }
    };

    if (selectedState !== null) {
      const stateAbbreviation = stateAbbreviations[statesData.features[selectedState].properties.name];
      console.log(stateAbbreviation)
      fetchWildfireData(stateAbbreviation);
    }
  }, [selectedState]);

  const parseCSV = (csvString) => {
    return csvString.split('\n').map(line => {
      const [latitude, longitude] = line.split(',').map(parseFloat);
      return [latitude, longitude];
    });
  };

  const selectedStateInfo = selectedState != null ? statesData.features[selectedState].properties : null;

  return (
    <div>
      <Sidebar selectedStateInfo={selectedStateInfo} />
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

        <WildfireLayer wildfireData={wildfireData} /> {/* Pass wildfireData to WildfireLayer component */}

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
    </div>
  );
}
