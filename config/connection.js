// Requiring in the mysql node package
var mysql = require("mysql");

// Variable holding the connection information
var connection;

// Logic to determine if the DB is hosted locally or in Heroku
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Peach0511",
        database: "wya_db"
    })
};

module.exports = connection;