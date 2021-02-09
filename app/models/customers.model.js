const sql = require('./db.js')

//here we define customer's constructor

const Customer = function (customer) {
	this.email = customer.email,
		this.first_name = customer.first_name,
		this.password = customer.password
}

Customer.delete = (customerId, result) => {
	console.log('customerIdAmna', customerId)
	sql.query(`DELETE FROM Employee WHERE employee_id=${customerId}`, (err, res) => {
		console.log('hello response', res)
		if (err) {
			console.log("error:", err)
			result(err, null)
			return
		}
		if (res.length) {
			console.log('customer found', res[0])
			result(null, res[0])
			return
		}
		result({
			kind: 'Not Found'
		}, null)
	})
}

//now add customer in database 
//  return sql.query("INSERT INTO StudentInfo VALUES('" + req.body.Name + "', " + req.body.Age + ")");
Customer.create = (newCustomer, result) => {
	console.log('newCustomer', newCustomer)
	if ((newCustomer.name && newCustomer.email && newCustomer.password) !== null) {

		sql.query("INSERT INTO Employee VALUES('" + newCustomer.first_name + "', '" + newCustomer.email + " ', '" + newCustomer.password + "', 0)", (err, res) => {
			if (err) {
				console.log("error:", err)
				result(err, null)
				return
			} else {
				console.log('response', res)
				console.log('created customer:', {
					id: res.inser,
					...newCustomer
				})
				result(null, {
					id: res.insertId,
					...newCustomer
				})
			}
		})
	}
}

Customer.find = (customerId, result) => {
	console.log('customer', customerId)
	var id = JSON.stringify(customerId).replace(/"/g, "'");
	console.log('id', id)
	sql.query(`SELECT * FROM Employee WHERE employee_id=${id}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('customer found', res.recordset[0])
			result(null, res.recordset[0])
			return
		}
		console.log('response', res.recordset[0])
		result({
			kind: 'Not Found'
		}, null)
	})
}



Customer.findEmployee = (email, result) => {
	console.log('email', email)
	email = JSON.stringify(email).replace(/"/g, "'");
	sql.query(`SELECT * FROM Employee WHERE email=${email}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('customer found', res.recordset[0])
			result(null, res.recordset[0])
			return
		}
		console.log('response', res.recordset[0])
		result({
			kind: 'Not Found'
		}, null)
	})
}

Customer.findEmployee = (customerId, result) => {
	console.log('customer', customerId)
	var id = JSON.stringify(customerId).replace(/"/g, "'");
	console.log('id', id)
	sql.query(`SELECT * FROM Employee WHERE email=${id}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('customer found', res.recordset[0])
			result(null, res.recordset[0])
			return
		}
		console.log('response', res.recordset[0])
		result({
			kind: 'Not Found'
		}, null)
	})
}

Customer.update = (customer, result) => {
	var name = JSON.stringify(customer.first_name).replace(/"/g, "'")
	var email = JSON.stringify(customer.email).replace(/"/g, "'")
	sql.query(`UPDATE Employee SET first_name=${name}, email=${email} WHERE employee_id=${customer.id}`, (err, res) => {
		console.log("error:", err)
		if (err) {
			result(err, null)
			return
		} else {
			console.log('updated customer:', {
				id: res.insertId,
				...customer
			})
			result(null, {
				id: res.insertId,
				...customer
			})
		}
	})
}

module.exports = Customer