import React, { useState } from "react";
import "./styles.css"; // Import your CSS file for styling

const GrandAllegiances: React.FC = () => {
  const [showSubButtons, setShowSubButtons] = useState<boolean>(false);
  const [selectedAllegiance, setSelectedAllegiance] = useState<string | null>(
    null
  );

  const toggleSubButtons = () => {
    setShowSubButtons(!showSubButtons);
    setSelectedAllegiance(null); // Reset selected allegiance when toggling sub buttons
  };

  const handleAllegianceSelection = (allegiance: string) => {
    if (selectedAllegiance === allegiance) {
      setSelectedAllegiance(null); // Deselect if already selected
    } else {
      setSelectedAllegiance(allegiance); // Select if not selected
    }
  };

  return (
    <div>
      <button onClick={toggleSubButtons}>Grand Allegiances</button>
      {showSubButtons && (
        <div className="sub-buttons">
          <button
            className={
              selectedAllegiance === "Order"
                ? "curved-button selected"
                : "curved-button"
            }
            onClick={() => handleAllegianceSelection("Order")}
          >
            Order
          </button>
          <button
            className={
              selectedAllegiance === "Death"
                ? "curved-button selected"
                : "curved-button"
            }
            onClick={() => handleAllegianceSelection("Death")}
          >
            Death
          </button>
          <button
            className={
              selectedAllegiance === "Chaos"
                ? "curved-button selected"
                : "curved-button"
            }
            onClick={() => handleAllegianceSelection("Chaos")}
          >
            Chaos
          </button>
          <button
            className={
              selectedAllegiance === "Destruction"
                ? "curved-button selected"
                : "curved-button"
            }
            onClick={() => handleAllegianceSelection("Destruction")}
          >
            Destruction
          </button>
          {selectedAllegiance === "Order" && (
            <div className="sub-sub-buttons">
              <button className="curved-button">Seraphon</button>
              <button className="curved-button">Cities of Sigmar</button>
            </div>
          )}
          {selectedAllegiance === "Death" && (
            <div className="sub-sub-buttons">
              <button className="curved-button">Flesh Eater Courts</button>
              <button className="curved-button">Ossiarch Bone Reapers</button>
            </div>
          )}
          {selectedAllegiance === "Chaos" && (
            <div className="sub-sub-buttons">
              <button className="curved-button">Skaven</button>
              <button className="curved-button">Blades of Khorne</button>
            </div>
          )}
          {selectedAllegiance === "Destruction" && (
            <div className="sub-sub-buttons">
              <button className="curved-button">Ogor Mawtribes</button>
              <button className="curved-button">Sons of Behamet</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GrandAllegiances;
