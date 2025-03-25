import React, { useState } from "react";
import "../styles/CostCalculator.css";

const CostCalculator = () => {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [cost, setCost] = useState(null);

  const calculateCost = () => {
    const cropCosts = { potatoes: 500, maize: 300, rice: 700 };
    setCost(area * cropCosts[crop] || "Invalid crop selection.");
  };

  return (
    <div className="calculator-container">
      <h2>Cost Calculator</h2>
      <select value={crop} onChange={(e) => setCrop(e.target.value)}>
        <option value="">Select Crop</option>
        <option value="potatoes">Potatoes</option>
        <option value="maize">Maize</option>
        <option value="rice">Rice</option>
      </select>
      <input type="number" placeholder="Enter area (acres)" value={area} onChange={(e) => setArea(e.target.value)} />
      <button onClick={calculateCost}>Calculate</button>
      {cost && <p>Estimated Cost: Ksh {cost}</p>}
    </div>
  );
};

export default CostCalculator;
