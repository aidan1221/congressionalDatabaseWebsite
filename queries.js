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

const getAllRepNames = (request, response) => {
    
    pool.query(
        'SELECT rep_name, state, district, party, terms, congress FROM allreps ORDER BY congress ASC, state ASC, rep_name ASC', (error, results) => {
            if(error) {
                console.log(error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getRepNamesByCongress = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name, state, district, party, terms FROM allreps WHERE congress = $1',
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
        'SELECT rep_name, district, party, terms FROM allreps WHERE congress=$1 AND state=$2',
        [congress, state],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getRepByCommittee = (request, response) => {
    const congress = parseInt(request.params.congress);
    const committee = request.params.committee;

    pool.query() // query for rep by committee must be implemented (waiting on data)
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

const getSenatorByCommittee = (request, response) => {
    const congress = parseInt(request.params.congress);
    const committee = request.params.committee;

    pool.query() // query for senator by committee must be implemented (waiting on data)

}
/*
QUERYING BILL DATA
*/

const getHouseBillsByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;

    pool.query('SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 AND state=$2 ORDER BY sponsor ASC', 
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

    pool.query('SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 AND state=$2 ORDER BY sponsor ASC', 
    [congress, state], 
    (error, result) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(result.rows);
    })
}

const getHouseBillsByParty = (request, response) => {
    const congress = parseInt(request.params.congress);
    const party = request.params.party;

    pool.query('SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 AND party=$2 ORDER BY state ASC, sponsor ASC', 
    [congress, party], 
    (error, result) => {
        if(error) {
            console.log(error)
        }
        response.status(200).json(result.rows);
    })
}

const getSenateBillsByParty = (request, response) => {
    const congress = parseInt(request.params.congress);
    const party = request.params.party;

    pool.query('SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 AND party=$2 ORDER BY state ASC, sponsor ASC', 
    [congress, party], 
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

const getCommittees = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    
    pool.query() // query for all committee
}

const getSubcommittees = (request, resposne) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    const committee = request.params.committee;
    
    pool.query() // query for all committee
}


module.exports = {
    connect,
    getAllRepNames,
    queryBlumenauer,
    getRepNamesByCongress,
    getRepByState,
    getSenatorNames,
    getSenatorByState,
    getHouseBillsByState,
    getSenateBillsByState,
    getHouseBillsByParty,
    getSenateBillsByParty,
}