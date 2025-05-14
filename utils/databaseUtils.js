const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Khan@786",
    database: "airbnb"
})

module.exports = pool.promise();