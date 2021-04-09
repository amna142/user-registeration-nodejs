const sql = require('./db.js')

//here we define customer's constructor

const Admin = function (admin) {
	this.email = admin.email,
		this.password = admin.password,
		this.isAdmin = admin.isAdmin
}


Admin.find = (admin, result) => {
	var email = JSON.stringify(admin.email).replace(/"/g, "'");
	var password = JSON.stringify(admin.password).replace(/"/g, "'")
	sql.query(`SELECT * FROM Employee WHERE email=${email} and password=${password} and isAdmin=${1}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('customer found', res.recordset)
			result(null, res.recordset)
			return
		} else {
			result({
				kind: 'Not Found'
			}, null)
		}
		console.log('response', res.recordset)

	})
}


module.exports = Admin