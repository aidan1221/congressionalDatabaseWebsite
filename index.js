// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, Postgres API'});
});

app.get('/api/connect', db.connect);

app.get('/api/blumenauer', db.queryBlumenauer); // test query to retrieve Earl Blumenauer

app.get('/api/representatives/:congress', db.getRepNames); // Get representative names by congress

app.get('/api/representatives/:congress/:state', db.getRepByState); // Get representative for given congress and given state

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

