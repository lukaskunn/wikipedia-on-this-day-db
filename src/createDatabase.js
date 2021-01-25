const fs = require('fs');
const path = require('path')
const axios = require('axios');

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
            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/events.json`)
                .then(function (response) {
                    fs.writeFile(`src/db/events/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                        if (err) console.log(err);
                        console.log(`arquivo do dia ${j} do mes ${i} criado na pasta events`)
                    })
                })

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/births.json`)
                .then(function (response) {
                    fs.writeFile(`src/db/births/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                        if (err) console.log(err);
                        console.log(`arquivo do dia ${j} do mes ${i} criado na pasta births`)
                    })
                })

            await axios.get(`https://byabbe.se/on-this-day/${i}/${j}/deaths.json`)
                .then(function (response) {
                    fs.writeFile(`src/db/deaths/${i}/${j}.json`, JSON.stringify(response.data, null, 4), (err) => {
                        if (err) console.log(err);
                        console.log(`arquivo do dia ${j} do mes ${i} criado na pasta deaths`)
                    })
                })
        }

    }

    console.log('\nDatabase create with success');  
}

getData();



