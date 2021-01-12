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

module.exports = Customer