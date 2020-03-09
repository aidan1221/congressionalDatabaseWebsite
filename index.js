// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('./queries')

const app = express();

const port = 5000;

app.use(express.static('../congressionalDatabaseWebsite/'));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static('styles'));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.status(200);
    response.sendFile(path.join(__dirname, 'index.html'));

});

app.get('/datascience', (req, res) => {

    

    res.status(200);
    res.sendFile(path.join(__dirname, '/pages/datascience.html'));
    
})

app.get('/api/connect', db.connect);

/*
Endpoints for mixed data
*/
app.get('/api/allCongressPeople', db.getAllCongressPeople);

app.get('/api/allCongressPeople/:congress', db.getAllCongressPeopleByCongress);

/*
Endpoints for representative specific data
*/
app.get('/api/blumenauer', db.queryBlumenauer); // test query to retrieve Earl Blumenauer

app.get('/api/representatives', db.getAllRepNames);

app.get('/api/representatives/:congress', db.getRepNamesByCongress); // Get representative names by congress

app.get('/api/representatives/:congress/orderbystate', db.getRepNamesByCongressORDERBYstate);

app.get('/api/representatives/:congress/:state', db.getRepByState); // Get representative for given congress and given state

app.get('/api/representatives/bycommittee/:congress/:committee', db.getRepByCommittee)

/*
Endpoints for senator specific data
*/
app.get('/api/senators/:congress', db.getSenatorNames);

app.get('/api/senators/:congress/:state', db.getSenatorByState);

/*
Endpoints for House bill specific data
*/

app.get('/api/housebillsbystate/:congress/:state', db.getHouseBillsByState);

app.get('/api/housebillsbyparty/:congress/:party', db.getHouseBillsByParty);

/* 
Endpoints for Senate bill specific data
*/

app.get('/api/senatebillsbystate/:congress/:state', db.getSenateBillsByState);
app.get('/api/senatebillsbyparty/:congress/:party', db.getHouseBillsByParty);


app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

