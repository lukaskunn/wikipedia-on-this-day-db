const express = require('express')
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000
const date = new Date();


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/create', (req, res) => {
    for (let i = 1; i < 13; i++) {
        for (let j = 1; j < date[i] + 1; j++) {
            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/events.json`)
                .then(async function (response) {
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

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/births.json`)
                .then(async function (response) {
                    for (const item of response.data.births) {
                        if (item.url_image == "" || item.url_image == undefined) {
                            if (item.wikipedia.length >= 1) {
                                try {
                                    let results = await google.scrape(`${item.wikipedia[0].title}`, 200)
                                    item.url_image = results[0].url;

                                    fs.writeFile(`src/db/births/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
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

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/deaths.json`)
                .then(async function (response) {
                    for (const item of response.data.deaths) {
                        if (item.url_image == "" || item.url_image == undefined) {
                            if (item.wikipedia.length >= 1) {
                                try {
                                    let results = await google.scrape(`${item.wikipedia[0].title}`, 200)
                                    item.url_image = results[0].url;

                                    fs.writeFile(`src/db/deaths/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
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
})


app.get('/:month/:day', async (req, res) => {
    let month = req.params.month;
    let day = req.params.day;

    const events = require(`./db/events/${month}/${day}.json`);
    const births = require(`./db/births/${month}/${day}.json`);
    const deaths = require(`./db/deaths/${month}/${day}.json`);

    let obj = {
        events: events.events,
        births: births.births,
        deaths: deaths.deaths
    }

    res.send(obj);
})

app.get('/date', async (req, res) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const events = require(`./db/events/${month}/${day}.json`);
    const births = require(`./db/births/${month}/${day}.json`);
    const deaths = require(`./db/deaths/${month}/${day}.json`);

    let obj = {
        events: events.events,
        births: births.births,
        deaths: deaths.deaths
    }

    res.send(obj);
})

app.get('/rsrs', (req, res) => {
    res.send('te amo vidica ><');  //for my luv
})


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`))