const axios = require('axios');
const cheerio = require('cheerio');
async function getHtml(uri) {
    const { data: html } = await axios.get(uri);
    // console.log(html);
    return html;


}
async function getTwitterFollowers(html) {
    //Load up cheerio


    const $ = cheerio.load(html);
    const span = $.find('css-901oao css-16my406 r-18jsvk2 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0');
    return span.data('count');


}


const html = getHtml('https://twitter.com/andriiantipov')
const twtcount = getTwitterFollowers(html)

console.log(twtcount)
