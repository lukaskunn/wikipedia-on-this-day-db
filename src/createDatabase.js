const fs = require('fs');
const path = require('path')
var Scraper = require('images-scraper');

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
    createPath();

    for (let i = 1; i < 13; i++) {
        for (let j = 1; j < date[i] + 1; j++) {
            fs.readFile(__dirname + `/db/events/${i}/${j}.json`, 'utf8', function (err, response) {
                if (err) {
                    return console.log(err);
                }
                for (const item of response.data.events) {
                    if (item.url_image == "" || item.url_image == undefined) {
                        if (item.wikipedia.length > 0) {
                            try {
                                let results = await google.scrape(`${item.wikipedia[0].title}`, 200)
                                item.url_image = results[0].url;

                                fs.writeFile(`src/db/events/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                                    if (err) console.log(err);
                                })
                            }
                            catch {
                                (err) => {
                                    console.log(err);
                                }
                            }
                        }
                        else {
                            item.url_image = ""
                        }
                    }
                }
            })
            fs.readFile(__dirname + `/db/births/${i}/${j}.json`, 'utf8', function (err, response) {
                if (err) {
                    return console.log(err);
                }
                for (const item of response.data.events) {
                    if (item.url_image == "" || item.url_image == undefined) {
                        if (item.wikipedia.length > 0) {
                            try {
                                let results = await google.scrape(`${item.wikipedia[0].title}`, 200)
                                item.url_image = results[0].url;

                                fs.writeFile(`src/db/events/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                                    if (err) console.log(err);
                                })
                            }
                            catch {
                                (err) => {
                                    console.log(err);
                                }
                            }
                        }
                        else {
                            item.url_image = ""
                        }
                    }
                }
            })

            fs.readFile(__dirname + `/db/deaths/${i}/${j}.json`, 'utf8', function (err, response) {
                if (err) {
                    return console.log(err);
                }
                for (const item of response.data.events) {
                    if (item.url_image == "" || item.url_image == undefined) {
                        if (item.wikipedia.length > 0) {
                            try {
                                let results = await google.scrape(`${item.wikipedia[0].title}`, 200)
                                item.url_image = results[0].url;

                                fs.writeFile(`src/db/events/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                                    if (err) console.log(err);
                                })
                            }
                            catch {
                                (err) => {
                                    console.log(err);
                                }
                            }
                        }
                        else {
                            item.url_image = ""
                        }
                    }
                }
            })
        }

    }

    console.log('\nDatabase create with success');
}

getData();



