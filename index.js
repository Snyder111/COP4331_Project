const { EventEmitter } = require('events');
const { readFile, readFileSync } = require('fs');
const express = require('express');
const { request } = require('http');
const url = require("url");
const { time } = require('console');
const app = express();

const mysql = require('mysql');
const { resourceLimits } = require('worker_threads');

const connection = mysql.createConnection({
host: 'sql5.freesqldatabase.com',
user: 'sql5700190',
password: 'KLk8Zr8C7N',
database: 'sql5700190'
});

connection.connect();

/*
connection.query('SELECT * FROM Users WHERE Username = "yy"', (err, result, fields) => {
    if(err) throw err
    console.log(result);
});

connection.end();
*/

/* */

function Race() {

    const tracks = ["Sand", "Dirt", "Gravel", "Tarmac", "Brick", "Ice"];
    const trackNum = Math.floor(Math.random()*tracks.length);

    const tires = ["Michelin", "Goodyear", "Firestone", "Continental", "Bridgestone"];
    const tireChance = [0.97, 0.87, 0.78, 0.95, 0.56];

    const tireTypes = ["All-Terrain", "Summer", "Winter", "All-Season", "Drag"];
    const tirePenalty = [[0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
                         [0.2, 0.15, 0.2, 0.05, 0.1, 0.3],
                         [0.15, 0.1, 0.15, 0.05, 0.1, 0.1],
                         [0.2, 0.15, 0.2, 0.05, 0.1, 0.15],
                         [0.3, 0.25, 0.3, 0, 0.2, 0.3]];

    const colors = ["Red", "Blue", "Green", "Yellow", "Fuchsia", "Orange", "Teal", "Black"];
    const hexColors = ["#DD2222", "#2222DD", "#22DD22", "#DDDD22", "#DD22DD", "#DD9922", "#22DDDD", "#000000"];
    const colorChance = [1, 0.84, 0.74, 0.56, 0.86, 0.88, 0.69, 0.95];

    const bodies = ["Sport", "Muscle", "Sedan", "Truck", "SUV"];
    const bodyChance = [0.97, 0.85, 0.92, 0.50, 0.73];

    class Car {
        constructor() {
            const tireNum = Math.floor(Math.random()*tires.length);
            this.tire = tires[tireNum];
            const tTypeNum = Math.floor(Math.random()*tireTypes.length);
            this.tireType = tireTypes[tTypeNum];
            const colorNum = Math.floor(Math.random()*colors.length);
            this.color = colors[colorNum];
            this.hexColor = hexColors[colorNum];
            const bodyNum = Math.floor(Math.random()*bodies.length);
            this.body = bodies[bodyNum];
            this.chance = (tireChance[tireNum]  - tirePenalty[tireNum][tTypeNum]) * colorChance[colorNum] * bodyChance[bodyNum];
            this.chance = Math.floor(this.chance*100)/100;
            this.position = 0;
        }
    }

    var winner = new Car();
    winner.chance = 0;

    for(var i = 0; i < 10; i++) {
        const car = new Car();

        connection.query('INSERT INTO Cars VALUES ("' + car.tire + '", "' + car.tireType + '", "' + car.color + '", "' + car.hexColor + '", "' + car.body + '", NULL)', (err, result, fields) => {
            if (err) throw err
        });

        if(winner.chance < car.chance) {
            winner = car;
        }
    }

    connection.query('INSERT INTO Races VALUES ("' + tracks[trackNum] + '", "Sunny", "' + winner.tire + '", "' + winner.tireType + '", "' + winner.color + '", "' + winner.hexColor + '", "' + winner.body + '")', (err, result, fields) => {
        if (err) throw err
    });

}

/*

function runBets() {
    var winner;
    var bets;

    fetch('./getWinners', {
        method: 'POST'
    }).then(response => response.json()).then(data => {
        winner = data[data.length - 1];
    });

    fetch('./getWinners', {
        method: 'POST'
    }).then(response => response.json()).then(data => {
        bets = data;
    });



    var totalChips = 0;
    var numWinners = 0;
    for(var i = 0; i < result.length; i++) {
        totalChips += result[i].Chips;
        if(winner.tireType == bets[i].tireType && winner.tireBrand == bets[i].tireBrand && winner.colorStr == bets[i].colorStr && winner.body == bets[i].body) {
            numWinners++;
        }
    }

    for(var i = 0; i < result.length; i++) {
        if(winner.tireType == bets[i].tireType && winner.tireBrand == bets[i].tireBrand && winner.colorStr == bets[i].colorStr && winner.body == bets[i].body) {
            connection.query('UPDATE Users SET Chips = Chips + ' + (totalChips/(numWinners - 1)) + ' WHERE Username = ' + bets[i].Username, (err, result, fields) => {
                if (err) throw err
            });
        }
    }

    connection.query('DROP TABLE Bets', (err, result, fields) => {
        if (err) throw err
    });

    connection.query('CREATE TABLE Bets (Username VARCHAR(20), Chips int, tireBrand VARCHAR(20), tireType VARCHAR(20), colorStr VARCHAR(20), colorHex VARCHAR(20), body VARCHAR(20))', (err, result, fields) => {
        if (err) throw err
    });
}

*/

//Race();

// LOGIN
app.get('/login.html', (request, response) => {

    readFile('login.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// REGISTER
app.get('/register.html', (request, response) => {

    readFile('/user-registration-app/register.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// ACCOUNT MANAGEMENT
app.get('/account_mgmt.html', (request, response) => {

    readFile('account_mgmt.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// DASHBOARD -- free version
app.get('/dashboard.html', (request, response) => {

    readFile('dashboard.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// PREMIUM DASHBOARD
app.get('/premium_dash.html', (request, response) => {

    readFile('premium_dash.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// LANDING PAGE
app.get('/landing_page.html', (request, response) => {

    readFile('landing_page.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// UPGRADE
app.get('/upgrade.html', (request, response) => {

    readFile('upgrade.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// UPGRADE SUCCESS
app.get('/upgrade_sucesss.html', (request, response) => {

    readFile('upgrade_success.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// CHIPS
app.get('/chips.html', (request, response) => {

    readFile('chips.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

// Start-up page? change to landing page when that is ready
app.get('/', (request, response) => {

    readFile('landing_page.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

app.post('/getCars', (request, response) => {
    connection.query('SELECT * FROM Cars ORDER BY id DESC LIMIT 10;', (err, result, fields) => {
        if (err) throw err
        response.status(200).json(result);
    });
});

app.post('/getAll', (request, response) => {
    connection.query('SELECT * FROM Cars', (err, result, fields) => {
        if (err) throw err
        response.status(200).json(result);
    });
});

app.post('/getWinners', (request, response) => {
    connection.query('SELECT * FROM Races', (err, result, fields) => {
        if (err) throw err
        response.status(200).json(result);
    });
});

app.post('/getBets', (request, response) => {
    connection.query('SELECT * FROM Bets', (err, result, fields) => {
        if (err) throw err
        response.status(200).json(result);
    });
});

// changed to PORT 3001 to fix an error saying that PORT 3000 was already in use -- eva
app.listen(process.env.PORT || 3001, () => console.log('App available on http://localhost:3001/')); 

const timeout = 5; //time to wait in minutes for the timer
function timer() {
    var currTime = new Date();
    if(currTime.getMinutes()%timeout == 0) {
        Race();
        setTimeout(() =>{timer();}, (timeout - 1)*60000);
    } else if(currTime.getMinutes()%timeout == 4) {
        //runBets();
        setTimeout(() => {timer();}, 60000);
    } else {
        setTimeout(() => {timer();}, 1000);
    }
}

timer();




