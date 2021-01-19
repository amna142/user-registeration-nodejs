const sql = require('./db.js')

//here we define customer's constructor

const Customer = function(customer) {
    this.email = customer.email,
        this.name = customer.name,
        this.password = customer.password
}

//now add customer in database 

Customer.create = (newCustomer, result) => {
    sql.query('INSERT INTO customers SET ?', newCustomer, (err, res) => {
        if (err) {
            console.log("error:", err)
            result(err, null)
            return
        } else {
            console.log('created customer:', { id: res.insertId, ...newCustomer })
            result(null, { id: res.insertId, ...newCustomer })
        }
    })
}

Customer.find = (customer, result) =>{
	console.log('customerIdAmna', JSON.stringify(customer.email))
	sql.query(`SELECT * FROM customers WHERE email=${JSON.stringify(customer.email)}`, (err, res) => {
		if(err){
			 console.log("error:", err)
            result(err, null)
            return
		}
		 if(res.length){
			console.log('customer found', res[0])
			result(null, res[0])
			return
		}
			result({
				kind: 'Not Found'
			}, null)
	})
}

module.exports = Customer