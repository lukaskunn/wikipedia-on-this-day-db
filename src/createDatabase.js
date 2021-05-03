const fs = require('fs');
const path = require('path')
var Scraper = require('images-scraper');
const axios = require('axios')

const date = {
    '1': 31,
    '2': 29,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31,
}

const google = new Scraper({
    puppeteer: {
        headless: true,
    }
});

function createPath() {
    const paths = {
        '1': 'events',
        '2': 'births',
        '3': 'deaths'
    }

    fs.mkdir(path.join(__dirname, 'db'), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

    for (let i = 1; i < 4; i++) {
        fs.mkdir(path.join(__dirname, `db/${paths[i]}`), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log(`Directory ${paths[i]} created successfully!`);
        });
    }

    for (let index = 1; index < 13; index++) {
        for (let i = 1; i < 4; i++) {
            fs.mkdir(path.join(__dirname, `db/${paths[i]}/${index}`), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log(`Directory ${index} created into ${paths[i]} successfully!`);
            });
        }
    }
}

async function getData() {
    for (let i = 5; i < 6; i++) {
        for (let j = 3; j < date[i] + 1; j++) {
            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/events.json`)
                .then(async function (response) {
                    var itensLen = response.data.events.length;
                    console.log(`${itensLen} queries actives`);

                    for (const item of response.data.events) {
                        console.log(`${itensLen} itens reaming`);
                        if (item.wikipedia.length >= 1) {
                            const results = await google.scrape(`${item.wikipedia[0].title}`, 1)
                            item.url_image = results[0].url;
                            console.log(item.url_image);
                        }
                        else {
                            item.url_image = ""
                            console.log(item.url)
                        }

                        fs.writeFile(`src/db/events/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                            if (err) console.log(err);
                        })
                        itensLen -= 1;
                    }

                    
                })

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/births.json`)
                .then(async function (response) {
                    var itensLen = response.data.births.length;
                    console.log(`${itensLen} queries actives`);

                    for (const item of response.data.births) {
                        console.log(`${itensLen} itens reaming`);
                        if (item.wikipedia.length >= 1) {
                            const results = await google.scrape(`${item.wikipedia[0].title}`, 1)
                            item.url_image = results[0].url;
                            console.log(item.url_image);
                        }
                        else {
                            item.url_image = ""
                        }

                        fs.writeFile(`src/db/births/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                            if (err) console.log(err);
                        })

                        itensLen -= 1;
                    }

                    
                })

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/deaths.json`)
                .then(async function (response) {
                    var itensLen = response.data.deaths.length;
                    console.log(`${itensLen} queries actives`);

                    for (const item of response.data.deaths) {
                        console.log(`${itensLen} itens reaming`);
                        if (item.wikipedia.length >= 1) {
                            const results = await google.scrape(`${item.wikipedia[0].title}`, 1)
                            item.url_image = results[0].url;
                            console.log(item.url_image);
                        }
                        else {
                            item.url_image = ""
                        }

                        fs.writeFile(`src/db/deaths/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                            if (err) console.log(err);
                        })

                        itensLen -= 1;
                    }

                    
                })
        }

    }

    console.log('\nDatabase create with success');
}

getData();



