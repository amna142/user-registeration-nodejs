const mysql = require('mysql')
const dbConfig = require('../config/db.config')

//connection to database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    insecureAuth : true
})

//now oen the mysql connection

connection.connect(error => {
    if(error) throw error
    console.log('Database connection is made successfully')
})

module.exports = connection