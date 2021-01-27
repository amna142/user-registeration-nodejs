const sql = require('./db.js')

//here we define customer's constructor

const Customer = function (customer) {
	this.email = customer.email,
		this.name = customer.name,
		this.password = customer.password
}

Customer.delete = (customerId, result) => {
	console.log('customerIdAmna', JSON.stringify(customerId))
	sql.query(`DELETE FROM customers WHERE id=${customerId}`, (err, res) => {
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

Customer.create = (newCustomer, result) => {
	sql.query('INSERT INTO customers ?', newCustomer, (err, res) => {
		if (err) {
			console.log("error:", err)
			result(err, null)
			return
		} else {
			console.log('created customer:', {
				id: res.insertId,
				...newCustomer
			})
			result(null, {
				id: res.insertId,
				...newCustomer
			})
		}
	})
}

Customer.find = (customer, result) => {
	var temp = null
	if (customer.email) {
		temp = {
			key: 'email',
			value: JSON.stringify(customer.email)
		}
	} else temp = {
		key: 'id',
		value: customer
	}
	sql.query(`SELECT * FROM customers WHERE ${temp.key}=${temp.value}`, (err, res) => {
		if (err) {
			console.log("error:", err)
			result(err, null)
			return
		}
		if (res.length) {
			console.log('customer found here', res[0])
			result(null, res[0])
			return
		}
		result({
			kind: 'Not Found'
		}, null)
	})
}


Customer.update = (customer, result) => {
	console.log('called!!!!')
	console.log('customer', parseInt(customer.customerId))
	var customerObj = customer.customer
	sql.query(`UPDATE customers SET? WHERE id=${parseInt(customer.customerId)}`, customerObj, (err, res) => {
		console.log("error:", err)
		if (err) {
			result(err, null)
			return
		} else {
			console.log('updated customer:', {
				id: res.insertId,
				...customerObj
			})
			result(null, {
				id: res.insertId,
				...customerObj
			})
		}
	})
}

module.exports = Customer