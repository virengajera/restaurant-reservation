const fs = require('fs')
const mysql = require('mysql2');
const util = require('util')

const config = require('../config/vars')

let poolConnection = null

switch (config.ENV) {
    case "development":
        poolConnection = mysql.createPool({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            connectionLimit: 10
        });
        break;

    case "production":
        poolConnection = poolConnection = mysql.createPool({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            connectionLimit: 30,
            idleTimeout:5000,
            ssl: {
                ca: fs.readFileSync("./lib/DigiCertGlobalRootCA.crt.pem")
            }
        });
        break;

}

/*             connectTimeout: 300000,    // 300000ms = 5 minute
            acquireTimeout: 300000,
            timeout: 300000 , */


function getConnection() {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            else {
                const query = util.promisify(connection.query).bind(connection);
                resolve([connection, query]);
            }

        })
    })
}


module.exports = { mysql, poolConnection, getConnection }