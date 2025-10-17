function ToggleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "6px",
        marginTop: "10px",
        backgroundColor: "#ff9933",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Toggle Filter
    </button>
  );
}

export default ToggleButton;