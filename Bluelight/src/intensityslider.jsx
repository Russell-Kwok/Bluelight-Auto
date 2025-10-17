import React from "react";

function IntensitySlider({ value, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label>
        Intensity: {value}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))} 
          style={{ width: "100%" }}
        />
      </label>
    </div>
  );
}

export default IntensitySlider;
