const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '34.83.246.107',
    database: 'congresql',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const connect = (request, response) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error("Error acquiring client", err.stack);
            response.status(400);
        }
        else {
            response.status(200).send("Connection successul!");
            release();  
            return console.log("Connection successful!");
            
        }
    })
    
}

/*
Querying Representative Data
 */

const getRepNames = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name, state, party, terms FROM allreps WHERE congress = $1',
    [congress],
    (error, results) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(results.rows);
    })
}

const getRepByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;
    pool.query(
        'SELECT rep_name, party, terms FROM allreps WHERE congress=$1 AND state=$2',
        [congress, state],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const queryBlumenauer = (request, response) => {

    const name = 'Earl Blumenauer';

    pool.query('SELECT * FROM representative_116 WHERE rep_name = $1', [name], (error, results) => {
    if (error) {
        console.log(error)
    }
    response.status(200).json(results.rows);

    })
}

/* 
Querying Senator Data
*/
const getSenatorNames = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT sen_name, state, party, terms FROM allsenators WHERE congress = $1',
    [congress],
    (error, results) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(results.rows);
    })
}

const getSenatorByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;
    pool.query(
        'SELECT sen_name, party, terms FROM allsenators WHERE congress=$1 AND state=$2',
        [congress, state],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            response.status(200).json(results.rows);
        }
    )
}
/*
QUERYING BILL DATA
*/

const getHouseBillsByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;

    pool.query('SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 AND state=$2', 
    [congress, state], 
    (error, result) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(result.rows);
    })
}

const getSenateBillsByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;

    pool.query('SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 AND state=$2', 
    [congress, state], 
    (error, result) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(result.rows);
    })
}

/*
Querying Committee Data 
*/


module.exports = {
    connect,
    queryBlumenauer,
    getRepNames,
    getRepByState,
    getSenatorNames,
    getSenatorByState,
    getHouseBillsByState,
    getSenateBillsByState,
}