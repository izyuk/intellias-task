const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const feeds = require('./feeds');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/feeds', (req, res) => {
    console.log(req.query.searchBy);
    const feed = req.query.searchBy ? feeds.items.filter((item) => {
        return item.source === req.query.searchBy;
    }) : feeds.items;
    res.send({ items: feed });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


const port = 8000;
app.listen(port, console.error);