const puppeteer = require('puppeteer');

const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/${reddit}/`;

const self = {
    browser: null,
    page: null,

    initialize: async (reddit) => {
        self.browser = await puppeteer.launch({
            headless: true
        });
        self.page = await self.browser.newPage();

        await  self.page.goto(SUBREDDIT_URL(reddit), {waitUntil: 'networkidle0'});

    },

    getResults: async (nr) => {


        let elements = await self.page.$$('#siteTable > div[class *= "thing"]');
        let results = [];

        for(let element of elements) {

            let title = await  element.$eval(('p[class = "title"] > a'), node => node.innerText.trim());
            let author = await element.$eval(('p[class = "tagline "] > a[class *= "author"]'), node => node.innerText.trim());

            let authorUrlTemp = await element.$eval(('p[class = "tagline "] > a[class *= "author"]'), node => node.getAttribute('href'));
            let authorUrl = authorUrlTemp.replace("old.reddit.com", "www.reddit.com");

            let score = await  element.$eval(('div[class = "score unvoted"]'), node => node.innerText.trim());
            let time = await  element.$eval(('p[class = "tagline "] > time'), node => node.getAttribute('title'));

            let urlTemp = await  element.$eval(('li[class = "first"] > a'), node => node.getAttribute('href'));
            let url = urlTemp.replace("old.reddit.com", "www.reddit.com");

            let mediaUrl;

            try {
                mediaUrl = "https://" + (await element.$eval(('a[class = "thumbnail invisible-when-pinned may-blank outbound"] > img, a[class = "thumbnail invisible-when-pinned may-blank "] > img, a[class = "thumbnail invisible-when-pinned self may-blank "] > img'), node => node.getAttribute('src')));
            }
            catch (UnhandledPromiseRejectionWarning) {
                mediaUrl = "No media";
            }


            results.push({
                title,
                author,
                authorUrl,
                score,
                time,
                url,
                mediaUrl
            })

        }

        return results;
    }
}

module.exports = self;