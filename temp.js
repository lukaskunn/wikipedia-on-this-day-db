const fs = require('fs');
const path = require('path')
const axios = require('axios');
var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true,
    }
});

axios.get(`https://byabbe.se/on-this-day/2/24/events.json`)
    .then(async function (response) {
        console.log(response.data.events)
        for (const item of response.data.events) {
            const results = await google.scrape(`${item.wikipedia[0].title}`, 200)
            item.url_image = results[0].url;
            console.log(response.data.events);
        }

        fs.writeFile(`temp2.json`, JSON.stringify(response.data, null, 4), (err) => {
            if (err) console.log(err);
        }) 
    })