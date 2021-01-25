const express = require('express')
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000
const date = new Date();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:month/:day', async (req, res) => {
    let month = req.params.month;
    let day = req.params.day;

    const data = require(`./db/events/${month}/${day}.json`);

    res.send(data);
})

app.get('/date', async (req, res) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    const data = require(`./db/events/${month}/${day}.json`);

    res.send(data);
})


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`))