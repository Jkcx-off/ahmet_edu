import puppeteer from 'puppeteer';
(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.type('input[placeholder="Enter your first name"]', 'ProdTest');
  await page.type('input[placeholder="Enter your last name"]', 'User');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  
  // Try to find error text
  const error = await page.evaluate(() => document.querySelector('.text-red-400')?.textContent);
  console.log('UI Error found:', error);
  
  await browser.close();
})();
