
const scraperObject = {
    url: 'https://app.flipsidecrypto.com/auth/login',
    async scraper(browser){
        let page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36');
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
        var argv = process.argv.slice(2);
        let i=0;
        console.log(argv);
        if(argv.length>0)
           i=argv[1];
        while (true) {
            //i=207;
            await page.waitForSelector('.css-1ww5jjb');
            const inputValue = await page.$('.css-1ww5jjb');
            clear(page,'.css-1ww5jjb');
            await page.type('input[class="chakra-input css-1ww5jjb"]', i+'00000', { delay: 100 }); // Types slower, like a user
            await page.waitForSelector('.css-wob7jz');
            await page.click('.css-wob7jz');
            await page.waitForSelector('.css-hw89oo', {timeout: 60000});
            await page.waitForSelector('.css-e1zzir');
            const dataRecord = await page.$eval('.css-e1zzir > strong', el => el.innerText);
            const countRecord = dataRecord.split(' ')[0];
            console.log('download data dim_labels from record %d00001 to record %d', i, countRecord+100000);
            console.log('succesfully download the csv result.here is the first 10 line')
            const data = await page.evaluate(() => {
                const tds = Array.from(document.querySelectorAll('table tr td'))
                return tds.map(td => td.innerText)
            });
            console.log(data);
            await page.waitForSelector('.css-k7jyqv');
            await  page.click('.css-k7jyqv')
            //  ]);
            if(argv.length>0)
                break;
            if(countRecord <100000)
                break;
            i=i++;  
        }
        console.log("download finished!");
        //await browser.close();



    }
}

module.exports = scraperObject;

async function clear(page, selector) {
    await page.evaluate(selector => {
      document.querySelector(selector).value = "";
    }, selector);
}
 