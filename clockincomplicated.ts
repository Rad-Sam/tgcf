const puppeteer = require("puppeteer"); // v22.0.0 or later

(async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
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
      await page.type("#email", "radjahmoha@gmail.com"),
      await page.type("#password", "123onlyfans"),
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-text(Clock In)"),
      targetPage.locator(
        "li.dropdown-starts-left > ul > li:nth-of-type(3) span"
      ),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"navbarSupportedContent\\"]/ul/li[3]/ul/li[3]/a/span)'
      ),
      targetPage.locator(
        ":scope >>> li.dropdown-starts-left > ul > li:nth-of-type(3) span"
      ),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 23.925003051757812,
          y: 8.599990844726562,
        },
      });
  }
  try {
    await page.waitForSelector("button.dialog-option-wide", { timeout: 7000 });
    const button = await page.$("button.dialog-option-wide");
    await button.click();
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    // If the element is not found, this block will execute
    // No action is needed here if you want to silently ignore the error
  }

  {
    await page.waitForSelector("button.btn.btn-primary.btn-md[type='submit']");
    const button = await page.$('button.btn.btn-primary.btn-md[type="submit"]');
    await button.click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
