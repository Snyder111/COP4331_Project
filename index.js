const { EventEmitter } = require('events');
const { readFile, readFileSync } = require('fs');
const express = require('express');
const { request } = require('http');
const url = require("url");
const app = express();

app.get('/home.html', (request, response) => {

    readFile('home.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

app.get('/login.html', (request, response) => {

    readFile('login.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

app.get('/register.html', (request, response) => {

    readFile('register.html', 'utf8', (err, html) => {

        if(err) {
            response.status(500).send('Sorry, out of order :(');
        }

        response.send(html);
    })

});

app.get('/', (request, response) => {

    response.redirect('/home.html');

});

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000/'));