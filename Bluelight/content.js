// Create overlay once
let overlay = document.createElement("div");
overlay.id = "bluelight-overlay";
overlay.style.position = "fixed";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.pointerEvents = "none";
overlay.style.backgroundColor = "rgba(255, 150, 50, 0.2)";
overlay.style.zIndex = 99999;
overlay.style.transition = "background-color 0.3s ease";
overlay.style.display = "none"; // hidden by default
document.body.appendChild(overlay);

// Get brightness of a color
function getBrightness(color) {
  let r, g, b;

  if (color.startsWith("rgb")) {
    [r, g, b] = color.match(/\d+/g).map(Number);
  } else if (color.startsWith("#")) {
    const hex = parseInt(color.slice(1), 16);
    r = (hex >> 16) & 255;
    g = (hex >> 8) & 255;
    b = hex & 255;
  } else {
    return 255;
  }

  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Apply overlay based on threshold & intensity
function applyBLF(threshold = 200, intensity = 20) {
  const body = document.body;
  const bg = getComputedStyle(body).backgroundColor || "#ffffff";
  const brightness = getBrightness(bg);

  if (brightness > threshold) {
    overlay.style.display = "block";
    overlay.style.backgroundColor = `rgba(255, 150, 50, ${intensity / 100})`;
  } else {
    overlay.style.display = "none";
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "SET_INTENSITY":
      applyBLF(200, message.intensity);
      break;
    case "TOGGLE_FILTER":
      overlay.style.display = overlay.style.display === "none" ? "block" : "none";
      break;
    case "SET_AUTOMATION":
      // implement automation logic if needed
      break;
  }
});

// Auto-apply every 5 seconds
window.addEventListener("load", () => applyBLF(200, 20));
setInterval(() => applyBLF(200, 20), 5000);
