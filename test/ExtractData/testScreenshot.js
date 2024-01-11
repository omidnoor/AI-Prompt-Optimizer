const fetch = require("node-fetch"); // You might need to install node-fetch if not already installed

async function testScreenshot() {
  const url = "https://example.com"; // Replace with the URL you want to capture
  const response = await fetch("http://localhost:3000/api/screenshot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Screenshot taken successfully:", data);
  } else {
    console.error("Error taking screenshot:", data);
  }
}

testScreenshot();
