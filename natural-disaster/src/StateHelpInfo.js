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
            <p>
              Active information from <a href="https://www.nifc.gov/fire-information/nfn">National Interagency Fire Center</a>:
            </p>
            <p>April 5, 2024

Currently, <b>three uncontained large fires</b> are burning in Alabama, Missouri and Florida. Wildland firefighters and support personnel contained 23 large fires this week. 

To date, 8,433 wildfires have burned 1.7 million acres in the United States. The number of wildfires is slightly below the 10-year average, while the number of acres burned more than triple the average. 
</p>
          </div>
        </div>
    );
};
  
