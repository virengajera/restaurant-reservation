const config = require('../config/vars');
const mysql = require('mysql2');
const fs = require('fs')
const util = require('util')
const process = require('process')
let poolConnection;

switch (config.ENV) {

  case "development":
    poolConnection = mysql.createPool({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      connectionLimit: 10,
      multipleStatements:true
    })
    break;

  case "production":
    poolConnection = mysql.createPool({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      connectionLimit: 10,
      /*             connectTimeout: 300000,    // 300000ms = 5 minute
              acquireTimeout: 300000,
              timeout: 300000 , */
      ssl: {
        ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
      },
      multipleStatements:true
    })
    break;

}

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



async function migrate() {
  try {

    const [connection,query] = await getConnection()
    const clear_table_data = fs.readFileSync('clear_table_data.sql', 'utf-8')
    const delete_table = fs.readFileSync('delete_table.sql', 'utf-8')
    const test_data = fs.readFileSync('test_data.sql', 'utf-8')
    const structure = fs.readFileSync('structure.sql', 'utf-8')


    await query(clear_table_data)
    console.log("All data Cleared")

    await query(delete_table)
    console.log("All Tables Deleted")

    await query(structure)
    console.log("All tables created with structure only")

    await query(test_data)
    console.log("All Test Data Populated")
    connection.release()
    process.exit()
    
  } catch (error) {
    console.error(error)
    process.exit()
  }

}

migrate()