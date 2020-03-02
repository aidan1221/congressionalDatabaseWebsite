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

const getRepNames = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name FROM (SELECT * FROM representative_116 UNION SELECT * FROM representative_115) as allReps WHERE congress = $1',
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
        'SELECT rep_name FROM (SELECT * FROM representative_116 UNION SELECT * FROM representative_115) as allReps WHERE congress=$1 AND state=$2',
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

module.exports = {
    connect,
    queryBlumenauer,
    getRepNames,
    getRepByState,
}