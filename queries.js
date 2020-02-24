const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '34.83.246.107',
    database: 'congresql',
    password: '',//password goes here
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


module.exports = {
    connect,
}