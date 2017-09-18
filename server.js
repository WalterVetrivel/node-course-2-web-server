const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error writing log');
        }
    });
    next();
}); // used to register middleware

/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('uppercase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Praise the Lord',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Jesus is Lord',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Labour in the Lord',
    });
});

app.get('/error', (req, res) => {
    console.log('Request for error page');
    res.send({
        text: 'Error'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});