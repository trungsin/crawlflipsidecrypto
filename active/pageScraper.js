const { off } = require('process');

const scraperObject = {
    url: 'https://app.flipsidecrypto.com/auth/login',
    async scraper(browser){
        require('dotenv').config();
        var argv = require("yargs").argv;
        let page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36');
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
       // const e = page.$('input[name="email"]');
        await page.type('input[name="email"]', process.env.USERNAME, { delay: 100 }); // Types slower, like a user
       // const p = page.$('input[name="password"]');
        await page.type('input[name="password"]', process.env.PASSWORD, { delay: 100 }); // Types slower, like a user
        await page.click("button[type='submit']");
        await page.waitForSelector('.chakra-linkbox__overlay');
        await page.click('.chakra-linkbox__overlay');
        var i=0; 
        var pages = 0;
        if(argv.pages)  
            pages = parseInt(argv.pages);
        var offset = 100000;
        if(argv.offset)  
            offset = parseInt(argv.offset);
        //console.log(pages);
        //console.log(offset);
            while (true) {
            //i=207
                try{
                    await page.waitForSelector('.css-1ww5jjb');
                    clear(page,".css-1ww5jjb");
                    const istr =(i+1).toString();
                    console.log(istr);
                    var offset_ = (i+offset)*100000;
                    await page.type('input[class="chakra-input css-1ww5jjb"]', offset_.toString(), { delay: 100 }); // Types slower, like a user
                    await page.waitForSelector('.css-wob7jz', {timeout: 70000});
                    await page.click('.css-wob7jz');
                    await delay(5000);  
                    await page.waitForSelector('.css-hw89oo', {timeout: 70000});
                    await page.waitForSelector('.css-e1zzir');
                    console.log('download data dim_labels from record %d to record %d', offset_, offset_+100000);
                    console.log('succesfully download the csv result.here is the first 10 line')
                    const data = await page.evaluate(() => {
                        const tds = Array.from(document.querySelectorAll('table tr td'))
                        return tds.map(td => td.innerText)
                    });
                    //console.log(data);
                    await page.waitForSelector('.css-k7jyqv');
                    await page.click('.css-k7jyqv');
                } catch(e){
                    
                }
            
                i++;
                if(i === pages)
                    break;
                //  ]);
                //check page end;
                const dataRecord = await page.$eval('.css-e1zzir > strong', el => el.innerText);
                const adataRecord = dataRecord.split(' ');
                var countRecord = 0;
                if (adataRecord.length >= 2)
                    countRecord = parseInt(dataRecord.split(' ')[0]);
                console.log(countRecord);
                if(countRecord <100000)
                    break;
                
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
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }