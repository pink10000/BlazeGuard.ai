import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Polygon, useMap, Marker, ZoomControl, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import "./App.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { stateAbbreviations } from "./stateAbbreviations";
import RadioButtonsGroup from "./Radio";
import InformationModal from "./StateHelpInfo";
import Text from "./text";
import { MapProvider } from "./MapContext";
import FlyToLocation from "./FlyToLocation";


const center = [40.63463151377654, -97.89969605983609];
const maxBounds = [
  [24.396308, -125.0],
  [49.384358, -66.93457],
];

function WildfireLayer({ wildfireData }) {
  const pulseIcon = L.divIcon({
    className: 'pulse-icon',
    html: `<div class="pulse-ring"></div>`,
    iconSize: [50, 50], // Adjust the size of the pulsating circle as needed
  });

  const [selectedFireData, setSelectedFireData] = useState(null);

  const handleMarkerClick = (fireData) => {
    setSelectedFireData(fireData);
  };

  const handleMarkerClose = () => {
    setSelectedFireData(null);
  };

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
          className: 'mycluster', iconSize: L.point(40, 40)
        });
      }}
    >
      {wildfireData.map((wildfire, index) => (
        <Marker key={index} position={wildfire} icon={pulseIcon} eventHandlers={{ mouseover: () => handleMarkerClick(wildfire), mouseout: handleMarkerClose }}>
          {selectedFireData && selectedFireData[0] === wildfire[0] && selectedFireData[1] === wildfire[1] && (
            <Popup>
              <div>
                <p>GPS Location: ({wildfire[0]}, {wildfire[1]})</p>
                <p>Area Burned: {wildfire[2]} Acres</p>
                {/* Add more metadata fields here */}
              </div>
            </Popup>
          )}
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
        fillOpacity: selected ? 0 : 0.3, // no fill if state is selected
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
            fillOpacity: 0.3,
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
            fillOpacity: selected ? 0 : 0.3,
          });
        },
        click: handleClick,
      }}
    />
  );
}

export default function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [wildfireData, setWildfireData] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });


  const handlePlaceSelected = useCallback((lat, lng) => {
    setLocation({ lat, lng });
  }, []);
  
  useEffect(() => {
    const fetchWildfireData = async (stateAbbreviation) => {
      try {
        // console.log("abbrev: " + stateAbbreviation);
        const response = await fetch(`./outdata-short-with-metadata/${stateAbbreviation}.csv`);
        const data = await response.text();
        const parsedData = parseCSV(data);
        setWildfireData(parsedData);
      } catch (error) {
        console.error('Error fetching wildfire data:', error);
      }
    };

    if (selectedState !== null) {
      const stateAbbreviation = stateAbbreviations[statesData.features[selectedState].properties.name];
      // console.log(stateAbbreviation)
      fetchWildfireData(stateAbbreviation);
    }
  }, [selectedState]);

  const parseCSV = (csvString) => {
    return csvString.split('\n').map(line => {
      const [latitude, longitude, fireSize] = line.split(',');
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);
      const parsedFireSize = parseFloat(fireSize);
      return [parsedLatitude, parsedLongitude, parsedFireSize];
    });
  };
  
  

  const [mapType, setMapType] = useState("Satellite");

  const handleMapTypeChange = (value) => {
    setMapType(value);
  };

  const tileLayerUrl =
    mapType === "Satellite"
      ? "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=SBZhTEOwJUIIKTs8PQRL"
      : "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=SBZhTEOwJUIIKTs8PQRL";

  return (

    <div>
    <script src="leaflet-heat.js"></script>
     <div class="" style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        <RadioButtonsGroup onChange={handleMapTypeChange}/>
      </div>
    <div class="form" style={{ position: "absolute", top: 15, right: 140, zIndex: 1001 }}>
      <Text onPlaceSelected={handlePlaceSelected}/>
    </div>
    <MapContainer
  
      center={center}
      zoom={4}
      minZoom={4}
      maxBounds={maxBounds}
      style={{ width: "100vw", height: "100vh" }}
      zoomControl={false}
    >
      <FlyToLocation lat={location.lat} lng={location.lng} />
      <TileLayer
          key={mapType}
          url={tileLayerUrl}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Heater />

     <div style={{ position: "absolute", top: 100, left: 10, zIndex: 1000 }}>
      <InformationModal selectedItem={selectedState} />
    </div>

      <WildfireLayer wildfireData={wildfireData} /> {/* Pass wildfireData to WildfireLayer component */}

      {statesData.features.map((state, index) => (
        <StatePolygon
          key={index}
          state={state}
          selected={index === selectedState}
          onClick={() => setSelectedState(index)}
        />
      ))}
      <ZoomControl position="topleft" />
    </MapContainer>
    </div>
  );
}
