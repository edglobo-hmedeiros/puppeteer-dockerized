import puppeteer, { BrowserLaunchArgumentOptions } from "puppeteer";

const searchGoogleMainResults = async (searchQuery: string) => {
  const browserArgs: BrowserLaunchArgumentOptions = {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-setuid-sandbox",
    ],
  };

  const browser = await puppeteer.launch(browserArgs);
  const page = await browser.newPage();

  await page.goto("https://www.google.com/", { waitUntil: "domcontentloaded" });

  await page.waitForSelector('input[aria-label="Pesquisar"]', {
    visible: true,
  });
  await page.type('input[aria-label="Pesquisar"]', searchQuery);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.keyboard.press("Enter"),
  ]);

  await page.waitForSelector(".LC20lb", { visible: true });

  const searchResults = await page.$$eval(".LC20lb", (els) =>
    els.map((e) => ({ titulo: e.innerText, link: e.parentNode.href }))
  );

  await browser.close();

  return searchResults;
};

export default searchGoogleMainResults;
