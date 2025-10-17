import React, { useEffect, useState } from "react";
import IntensitySlider from "./intensityslider.jsx";
import "./App.css";

function App() {
  const [intensity, setIntensity] = useState(20);
  const [automation, setAutomation] = useState(false);

  const sendMessageToTab = (message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, message);
    });
  };

  const handleIntensityChange = (newVal) => {
    if (window.chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ intensity: newVal });
    }
    setIntensity(newVal);
    chrome.storage.sync.set({ intensity: newVal });
    sendMessageToTab({ type: "SET_INTENSITY", intensity: newVal });
  };

  const handleAutomationToggle = () => {
    if (window.chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ intensity: newVal });
    }
    const newVal = !automation;
    setAutomation(newVal);
    chrome.storage.sync.set({ automation: newVal });
    sendMessageToTab({ type: "SET_AUTOMATION", enabled: newVal });
  };

  useEffect(() => {
    if (window.chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(["intensity", "automation"], (result) => {
        if (result.intensity !== undefined) setIntensity(result.intensity);
        if (result.automation !== undefined) setAutomation(result.automation);
      });
    }
  }, []);
  console.log(intensity)
  return (
    <div className="p-4 text-center" style={{ width: 240 }}>
      <h3 className="font-semibold mb-2">Bluelight Auto</h3>
      <IntensitySlider value={intensity} onChange={handleIntensityChange} />
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={automation}
            onChange={handleAutomationToggle}
          />
          &nbsp; Automation
        </label>
      </div>
      <p className="text-sm mt-2 text-gray-600">
        Intensity: {intensity}% <br />
        Auto: {automation ? "On" : "Off"}
      </p>
    </div>
  );
}

export default App;
