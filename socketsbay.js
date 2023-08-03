const playwright = require("playwright");
const { expect } = require("@playwright/test");

(async () => {
  let browser;
  try {
    browser = await playwright.webkit.launch({
      headless: false,
      proxy: {
        // Run 'mitmdump -p 8080' on your host
        server: "http://192.168.122.1:8080",  // Update to use your host IP
      }
    });

    const context = await browser.newContext({ignoreHTTPSErrors: true});
    let page = await context.newPage();

    await page.goto("https://socketsbay.com/test-websockets", { waitUntil: "load" });
    await page.getByRole('button', { name: 'Connect', exact: true }).click();
    
    // When the bug manifests, the websocket connection will hang on creation, and
    // the "Connection ready!" message will never appear.  Then the getByText below will time out:
    await expect(page.getByText(/Connection ready!/)).toBeVisible();
    await page.getByRole('button', { name: 'Disconnect', exact: true }).click();

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();

