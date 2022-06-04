// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://app.flipsidecrypto.com/auth/login');
//   const e = page.$('input[name="email"]');
//   await page.type(e, 'trungsin', { delay: 100 }); // Types slower, like a user
//   const p = page.$('input[name="password"]');
//   await page.type(p, 'sinLT@123', { delay: 100 }); // Types slower, like a user

//   await browser.close();
// })();
// ./book-scraper/index.js

const browserObject = require('./lib/browser');
const scraperController = require('./controller/pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
