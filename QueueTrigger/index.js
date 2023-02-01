const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

module.exports = async function (context, myQueueItem) {

    const name = myQueueItem;

    context.log('JavaScript queue trigger function processed work item: ', name)

    /*************** Insert data into MySQL ******************/

    // MySQL Connection Info
    const config =
    {
        host: 'nscc-w0458329-db-mysql.mysql.database.azure.com',
        user: 'appuser',
        password: process.env['db_password'], // get password from local.settings.json
        database: 'development',
        port: 3306,
        ssl: {
            ca: fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem")
        }
    }

    // Create the MySQL connection
    const connection = new mysql.createConnection(config)

    // Connect to MySQL
    connection.connect(function (err) {
        if (err) throw err
    })

    // Execute SQL
    connection.query('insert into persons(name) values (?);', [name], function (err, results, fields) {
        if (err) throw err
    })

    // Close the connection
    connection.end(function (err) {
        if (err) throw err
    })
}