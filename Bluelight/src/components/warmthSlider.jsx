function IntensitySlider({ value, onChange }) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      style={{ width: "100%" }}
    />
  );
}

export default IntensitySlider;
