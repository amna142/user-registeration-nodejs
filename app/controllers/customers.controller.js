var connection = require('../models/db')
var bcrypt = require('bcrypt')
var Customer = require('../models/customers.model')
//update customer post action
exports.updateCustomer = (req, res) => {
	console.log('req.params.id', req.params)
	var customerId = req.params.employee_id

	// no error found
	if (customerId) {
		console.log('req.body', req.body)
		var customer = {
			first_name: req.body.first_name,
			email: req.body.email,
			id: parseInt(customerId)
		}
		console.log('customer', customer)
		Customer.update(customer, (err, data) => {
			if (err) {
				console.log('Not Edited', err);
				console.log('req', req.body)
				res.render('customers', {
					title: 'Edit Customer',
					first_name: req.body.name,
					email: req.body.email
				})
			} else {
				res.redirect('/customers')
			}
		})
	} else {
		console.log('errors... ')
	}
}

//show add user form 
exports.showAddCustomerForm = (req, res) => {
	console.log('i am in showAddCustomerForm')
	res.render('customers/add', {
		title: 'Add New Customer',
		first_name: '',
		email: ''
	})
}
//post request
exports.create = (req, res) => {
	console.log('req.body Amna', req.body);
	if (!req.body) {
		res.render('customers/add', {
			title: 'Add New Customer',
			firs_name: req.body.first_name,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword
		})
	} else if (req.body) {
		//find customer with same credentials
		//create customer
		if (req.body.password === req.body.confirmPassword) {
			console.log('i am inside password matching')
			var hashedPassword = bcrypt.hashSync(req.body.password, 8);
			const customer = new Customer({
				first_name: req.body.first_name,
				email: req.body.email,
				password: hashedPassword
			});
			console.log('customer', customer)

			//save customer into database
			Customer.create(customer, (err, data) => {
				if (err) {
					console.log(err);
					res.render('customers/add', {
						title: 'Add New Customer',
						first_name: customer.first_name,
						email: customer.email,
						password: customer.password,
						confirmPassword: customer.confirmPassword
					})
				} else {
					console.log('i have reached here')
					res.redirect('/customers')
				}
			});
		}
	}
};
exports.home = (req, res) => {
	connection.query('SELECT * FROM Employee ORDER BY employee_id DESC', (err, rows) => {
		console.log('rows', rows.recordset)
		if (err) {
			
			console.log('i am in error', err)
			res.render('customers', {
				page_Title: 'Customers - Node js',
				data: ''
			})
		} else {
			res.render('customers', {
				page_Title: 'Customer - Node Js',
				data: rows.recordset
			})
		}
	})
}

exports.deleteCustomer = (req, res, next) => {
	var customerId = req.params.employee_id
	console.log('customerId', typeof (customerId))
	if (!customerId) {
		res.redirect('/')
	} else if (customerId) {
		//delete customer from database
		Customer.delete(customerId, (err, data) => {
			if (err) {
				console.log('not deleted', err);
				res.redirect('/customers')
			} else {
				res.redirect('/customers')
			}
		});
	}
}

exports.showEditCustomerForm = (req, res, next) => {
	var customerId = req.params.employee_id;
	console.log('customerId', customerId)
	if (!customerId) {
		res.redirect('/')
	} else if (customerId) {
		Customer.find(customerId, (err, data) => {
			console.log('err', err)
			if (err) throw err
			if (data.length < 0) {
				res.redirect('/')
			} else {
				console.log('data', data.employee_id)
				res.render('customers/edit', {
					title: 'Edit Customer',
					employee_id: data.employee_id,
					first_name: data.first_name,
					email: data.email,
					password: data.password
				})
			}
		})
	}
}