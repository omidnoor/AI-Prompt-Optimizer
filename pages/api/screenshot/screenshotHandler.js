// pages/api/screenshot/screenshotHandler.js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// Add the stealth plugin to puppeteer
puppeteer.use(StealthPlugin());

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { urlsArray } = req.body;
      if (!urlsArray || urlsArray.length === 0) {
        res.status(400).send("No URLs provided");
        return;
      }

      // Launch the browser with Puppeteer Extra in non-headless mode
      const browser = await puppeteer.launch({
        // headless: false, // Set to false to see the browser
        // You can also specify other options like window size here
      });

      const screenshots = [];

      for (const url of urlsArray) {
        const page = await browser.newPage();

        // Go to the URL
        await page.goto(url, { waitUntil: "networkidle2" });

        // Take a screenshot
        const screenshot = await page.screenshot({
          fullPage: true, // Capture the full scrollable page
          encoding: "base64",
        });

        // Add the screenshot to the array
        screenshots.push(`data:image/png;base64,${screenshot}`);

        // Close the current page
        await page.close();
      }

      // Close the browser
      await browser.close();

      // Send the array of screenshots as a response
      res.status(200).json({ screenshots });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle incorrect request methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
