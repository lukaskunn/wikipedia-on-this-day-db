const express = require('express')
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000
const date = new Date();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:month/:day', async (req, res) => {
    let month = req.params.month;
    let day = req.params.day;

    const events = require(`./db/events/${month}/${day}.json`);
    const births = require(`./db/births/${month}/${day}.json`);
    const deaths = require(`./db/deaths/${month}/${day}.json`);

    let obj = {
        events, 
        births, 
        deaths
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
        events, 
        births, 
        deaths
    }

    res.send(obj);
})

app.get('/rsrs', (req, res) => {
    res.send('te amo vidica ><');
})


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`))