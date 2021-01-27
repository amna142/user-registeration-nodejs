const sql = require('mssql')
const dbConfig = require('../config/db.config')

//connection to database
const sqlConfig = {
    server: dbConfig.SERVER,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	port: dbConfig.PORT,
	driver: dbConfig.DRIVER,
	options: dbConfig.OPTION,
	enableArithAbort: true
}


//now open the mysql connection

let connection = new sql.connect(sqlConfig, (err)=>{
	if(err){
		console.log('err', err)
	}else {
		console.log('Database connection is made successfully')
	}
})

module.exports = connection