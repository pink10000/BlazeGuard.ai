import * as React from "react";
import { statesData } from "./data";

export default function InformationModal({ selectedItem, onClose }) {
    return (
        
        <div className="modal">
          <div className="modal-content">
            <h2><span className="close" onClick={onClose}>&times;</span>
             Selected Item: {statesData.features[selectedItem == null ? 1 : selectedItem].properties.name}</h2>
            <p>This is the text modal for {selectedItem}. Here are some links:</p>
            <ul>
              <li><a href="https://example.com">Link 1</a></li>
              <li><a href="https://example.com">Link 2</a></li>
              <li><a href="https://example.com">Link 3</a></li>
            </ul>
          </div>
        </div>
    );
};
  
