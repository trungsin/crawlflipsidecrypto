const scraperObject = {
    url: 'https://app.flipsidecrypto.com/auth/login',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
       // const e = page.$('input[name="email"]');
        await page.type('input[name="email"]', 'trungsin', { delay: 100 }); // Types slower, like a user
       // const p = page.$('input[name="password"]');
        await page.type('input[name="password"]', 'sinLT@123', { delay: 100 }); // Types slower, like a user
        await page.click("button[type='submit']");
        //await page.click('.chakra-linkbox__overlay');
        await page.waitForSelector('.chakra-linkbox__overlay');
        await page.click('.chakra-linkbox__overlay');
        await page.waitForSelector('.css-hw89oo');
        //await page.click("button[class='css-k7jyqv']");
        await Promise.all([
            await page.click('.css-k7jyqv')
          ]);
        let i=1  
        while (i < 208) {
            await page.waitForSelector('.css-1ww5jjb');
            const inputValue = await page.$('.css-1ww5jjb');
            clear(page,'.css-1ww5jjb');

            await page.type('input[class="chakra-input css-1ww5jjb"]', i+'00000', { delay: 100 }); // Types slower, like a user
            await page.click('.css-wob7jz');
            await delay(5000);  
            await page.waitForSelector('.css-hw89oo');
            await Promise.all([
                await page.click('.css-k7jyqv')
              ]);        
        }

    }
}

module.exports = scraperObject;
async function clear(page, selector) {
    await page.evaluate(selector => {
      document.querySelector(selector).value = "";
    }, selector);
}
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
 