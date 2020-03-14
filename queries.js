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
Broad Queries 
*/

const getAllCongressPeople = (request, response) => {

    pool.query(
        'SELECT * FROM allcongresspeople', (error, results) => {
            if(error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getAllCongressPeopleByCongress = (request, response) => {

    const congress = request.params.congress;
    pool.query(
        'SELECT * FROM allcongresspeople WHERE congress=$1', [congress], (error, results) => {
            if (error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

/*
Querying Representative Data
 */

const getAllRepNames = (request, response) => {
    
    pool.query(
        'SELECT rep_name as representative, state, district, party, terms, congress FROM allreps ORDER BY congress ASC, state ASC, rep_name ASC', (error, results) => {
            if(error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getRepNamesByCongress = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name as representative, state, district, party, terms FROM allreps WHERE congress = $1 ORDER BY rep_name asc',
    [congress],
    (error, results) => {
        if(error) {
            console.log( "API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getRepNamesByCongressORDERBYstate = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name as representative, state, district, party, terms FROM allreps WHERE congress = $1 ORDER BY state asc, district asc',
    [congress],
    (error, results) => {
        if(error) {
            console.log( "API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getRepNamesByCongressORDERBYcommittee = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT rep_name as representative, state, district, party, terms, hc_name as committee FROM allhousecommitteeinfo NATURAL JOIN allreps WHERE congress = $1 ORDER BY committee asc, state asc, district asc',
    [congress],
    (error, results) => {
        if(error) {
            console.log( "API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getRepByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;
    pool.query(
        'SELECT rep_name as representative, state, district, party, terms FROM allreps WHERE congress=$1 AND state=$2',
        [congress, state],
        (error, results) => {
            if (error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getRepByCommittee = (request, response) => {
    const congress = parseInt(request.params.congress);
    const committee = request.params.committee;

    pool.query(
        `SELECT DISTINCT rep_name as representative, party, state, district, terms, hc_name as committee FROM allhousecommitteeinfo NATURAL JOIN allreps WHERE congress=$1 AND hc_name LIKE ('%${committee}%') ORDER BY state ASC`, 
        [congress],
        (error, results) => {
             if (error) {
                 console.log("API ERROR: " + error)
             }
             response.status(200).json(results.rows);
         }
    ) // query for rep by committee must be implemented (waiting on data)
}

const queryBlumenauer = (request, response) => {

    const name = 'Earl Blumenauer';

    pool.query('SELECT * FROM representative_116 WHERE rep_name = $1', [name], (error, results) => {
    if (error) {
        console.log("API ERROR: " + error)
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
        'SELECT sen_name as senator, state, party, terms FROM allsenators WHERE congress = $1 ORDER BY senator asc',
    [congress],
    (error, results) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getSenatorsByCongressORDERBYstate = (request, response) => {

    const congress = parseInt(request.params.congress);

    pool.query(
        'SELECT sen_name as senator, state, party, terms FROM allsenators WHERE congress=$1 ORDER BY state asc',
    [congress],
    (error, results) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getSenatorsByCongressORDERBYcommittee = (request, response) => {
    const congress = parseInt(request.params.congress);

    pool.query(
        `SELECT DISTINCT congressperson as senator, party, state, terms, committee FROM allcommitteeinfo JOIN allsenators as sens ON sen_name = congressperson WHERE sens.congress=$1 AND chamber='Senate' ORDER BY committee asc`,
    [congress],
    (error, results) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(results.rows);
    })
}

const getSenatorByState = (request, response) => {
    const congress = parseInt(request.params.congress);
    const state = request.params.state;

    pool.query(
        'SELECT sen_name as senator, state, party, terms FROM allsenators WHERE congress=$1 AND state=$2 ORDER BY senator asc',
        [congress, state],
        (error, results) => {
            if (error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getSenatorsByCommittee = (request, response) => {
    const congress = parseInt(request.params.congress);
    const committee = request.params.committee;

    pool.query(
        `SELECT DISTINCT congressperson as senator, party, state, terms, committee FROM allcommitteeinfo JOIN allsenators as sens ON sen_name = congressperson WHERE sens.congress=$1 AND chamber='Senate' AND committee LIKE ('%${committee}%') ORDER BY congressperson asc`,
        [congress],
        (error, results) => {
            if(error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
    })

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
            console.log("API ERROR: " + error)
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
            console.log("API ERROR: " + error)
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
            console.log("API ERROR: " + error)
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
            console.log("API ERROR: " + error)
        }
        response.status(200).json(result.rows);
    })
}

const getHouseBills = (request, response) => {
    const congress = request.params.congress;
    pool.query(
        'SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 ORDER BY state ASC, sponsor ASC', 
        [congress], (error, results) => {
            if (error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

const getSenateBills = (request, response) => {
    const congress = request.params.congress;
    pool.query(
        'SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 ORDER BY state ASC, sponsor ASC', 
        [congress], (error, results) => {
            if (error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

const getHouseBillsOrderByState = (request, response) => {
    const congress = request.params.congress;
    pool.query(
        'SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 ORDER BY state ASC, bill_name ASC', 
        [congress], (error, results) => {
            if (error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

const getSenateBillsOrderByState = (request, response) => {
    const congress = request.params.congress;
    pool.query(
        'SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 ORDER BY state ASC, bill_name ASC', 
        [congress], (error, results) => {
            if (error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

const getHouseBillsOrderedByParty = (request, response) => {
    const congress = request.params.congress;

    pool.query('SELECT * FROM allhousebillswithsponsorsdata WHERE congress=$1 ORDER BY bill_name ASC, party ASC', 
    [congress], 
    (error, result) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(result.rows);
    })
}

const getSenateBillsOrderedByParty = (request, response) => {
    const congress = request.params.congress;

    pool.query('SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 ORDER BY bill_name ASC, party ASC', 
    [congress], 
    (error, result) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(result.rows);
    })
}

const getBills = (request, response) => {
    
    pool.query(
        'SELECT bill_name, description, bill_status, bill_committees, sponsor, state, party, terms, congress FROM allhousebillswithsponsorsdata UNION SELECT * FROM allsenatebillswithsponsorsdata ORDER BY state ASC LIMIT 15000', (error, results) => {
            if(error) {
                console.log("API ERROR: " + error)
            }
            response.status(200).json(results.rows);
        }
    )
}

const getBillsByCongress = (request, response) => {
    const congress = request.params.congress;

    pool.query('SELECT bill_name, description, bill_status, bill_committees, sponsor, state, party, terms, congress FROM allhousebillswithsponsorsdata WHERE congress=$1 UNION SELECT * FROM allsenatebillswithsponsorsdata WHERE congress=$1 ORDER BY state ASC LIMIT 5000', 
    [congress], 
    (error, result) => {
        if(error) {
            console.log("API ERROR: " + error)
        }
        response.status(200).json(result.rows);
    })
}

/*
Querying Committee Data 
*/

const getAllCommitteesAndSubCommitteesByCongress = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    
    pool.query(
        'SELECT * FROM allcommitteeinfo WHERE congress=$1 ORDER BY committee asc, subcommittee asc, congressperson asc',
        [congress],
        (error, results) => {
            if(error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    ) // query for all committee
}

const getAllCommitteesAndSubCommitteesByChamberAndCongress = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    
    pool.query(
        'SELECT * FROM allcommitteeinfo WHERE congress=$1 AND chamber=$2 ORDER BY committee asc, subcommittee asc, congressperson asc',
        [congress, chamber],
        (error, results) => {
            if(error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    ) // query for all committee
}

const getSubcommittees = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    const committee = request.params.committee;
    
    pool.query(
        `SELECT DISTINCT subcommittee, committee, chamber, congress FROM allsubcommittees WHERE congress=$1 AND chamber=$2 AND committee LIKE ('%${committee}%') AND subcommittee IS NOT NULL`, [congress,chamber], (error, results) => {
            if(error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    )
}

const getCommitteeDataByChamberAndCongress = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    const committee = request.params.committee;
    
    pool.query(
        `SELECT * FROM allcommitteeinfo WHERE congress=$1 AND chamber=$2 AND committee LIKE ('%${committee}%') ORDER BY committee asc, subcommittee asc, congressperson asc`,
        [congress, chamber],
        (error, results) => {
            if(error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    ) 
}


const getSubcommitteeDataByCommittee = (request, response) =>  {
    const congress = parseInt(request.params.congress);
    const chamber = request.params.chamber;
    const committee = request.params.committee;
    const subcommittee = request.params.subcommittee;

    pool.query(
        `SELECT * FROM allcommitteeinfo WHERE congress=$1 AND chamber=$2 AND committee LIKE ('%${committee}%') AND subcommittee LIKE ('%${subcommittee}%') ORDER BY committee asc, subcommittee asc, congressperson asc`,
        [congress, chamber],
        (error, results) => {
            if(error) {
                console.log("API ERROR: " + error);
            }
            response.status(200).json(results.rows);
        }
    ) 
}


module.exports = {
    connect,
    getAllCongressPeople,
    getAllCongressPeopleByCongress,
    getAllRepNames,
    queryBlumenauer,
    getRepNamesByCongress,
    getRepNamesByCongressORDERBYstate,
    getRepNamesByCongressORDERBYcommittee,
    getRepByState,
    getRepByCommittee,
    getSenatorNames,
    getSenatorsByCongressORDERBYstate,
    getSenatorsByCongressORDERBYcommittee,
    getSenatorByState,
    getSenatorsByCommittee,
    getHouseBillsByState,
    getSenateBillsByState,
    getHouseBillsByParty,
    getSenateBillsByParty,
    getAllCommitteesAndSubCommitteesByChamberAndCongress,
    getAllCommitteesAndSubCommitteesByCongress,
    getCommitteeDataByChamberAndCongress,
    getSubcommitteeDataByCommittee,
    getSubcommittees,
    getHouseBills,
    getSenateBills,
    getHouseBillsOrderByState,
    getSenateBillsOrderByState,
    getHouseBillsOrderedByParty,
    getSenateBillsOrderedByParty,
    getBills,
    getBillsByCongress,
}