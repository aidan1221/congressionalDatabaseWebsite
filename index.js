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

app.get('/connect', db.connect);

app.get('/blumenauer', db.queryBlumenauer);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

