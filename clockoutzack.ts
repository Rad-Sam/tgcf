const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const timeout = 150000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 993,
      height: 750,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    const startWaitingForEvents = () => {
      promises.push(targetPage.waitForNavigation());
    };
    startWaitingForEvents();
    await targetPage.goto("https://appx.wheniwork.com/");
    await Promise.all(promises);
  }
  {
    await page.waitForSelector("#email");
    await page.waitForSelector("#password");
    await Promise.all([
      await page.type("#email", "radmoha2022@gmail.com"),
      await page.type("#password", "123onlyfanswork"),
      page.click(".btn-login"), // Clicking the link will indirectly cause a navigation
    ]);
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("li.dropdown-starts-left > button > i"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"navbarSupportedContent\\"]/ul/li[3]/button/i)'
      ),
      targetPage.locator(":scope >>> li.dropdown-starts-left > button > i"),
    ])
      .setTimeout(timeout)
      .click();
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-text(Clock Out)"),
      targetPage.locator("li.dropdown-starts-left li:nth-of-type(3) span"),
    ])
      .setTimeout(timeout)
      .click();
  }
  try {
    // Try to click "yes" if it appears within the timeout period
    await page.waitForSelector('label[for="given-break-opportunity_yes"]', {
      timeout: 7000,
    });
    await page.click('label[for="given-break-opportunity_yes"]');
  } catch (error) {
    // If "yes" doesn't appear within the timeout, this block will execute
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator(
        '::-p-aria(CLOCK OUT) >>>> ::-p-aria([role=\\"generic\\"])'
      ),
      targetPage.locator('button[type="submit"].btn.btn-primary.btn-md:has-text("Clock Out")'), targetPage.locator(':has-text("Clock Out")'),
    ])
      .setTimeout(timeout)
      .click();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
