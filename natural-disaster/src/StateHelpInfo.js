import * as React from "react";
import { statesData } from "./data";
import { firesCount } from "./numFires";
import { stateAbbreviations } from "./stateAbbreviations";

export default function InformationModal({ selectedItem, onClose }) {
    return (
        
        <div className="modal">
          <div className="modal-content">
            <h2><span className="close" onClick={onClose}>&times;</span>
             Selected Item: {statesData.features[selectedItem == null ? 1 : selectedItem].properties.name}</h2>
            <p>No active evacuations reported in this area.</p>
            <p>{statesData.features[selectedItem == null ? 1 : selectedItem].properties.name} had {firesCount[stateAbbreviations[statesData.features[selectedItem == null ? 1 : selectedItem].properties.name]]} fires in the last year.</p>
            <p>Here are some links:</p>
            <ul>
              <li><a href="https://www.sandiego.gov/fire">Local Fire Department</a></li>
              <li><a href="https://readyforwildfire.org/prepare-for-wildfire/go-evacuation-guide/">Evacuation Routes</a></li>
            </ul>
          </div>
        </div>
    );
};
  
