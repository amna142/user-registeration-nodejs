var connection = require('../models/db')
var bcrypt = require('bcrypt')
var Customer = require('../models/customers.model')
exports.addCustomerIntoDatabase = (req, res, next) => {
	req.assert('name', 'Name is required').notEmpty()
	req.assert('email', 'An email is required').isEmail()
	req.assert('password', 'password is required').notEmpty()
	var err = req.validationErrors()
	// no error found
	if (!err) {
		var customer = {
			name: req.sanitize('name').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		connection.query('INSERT INTO customers SET ?', customer, (err, result) => {
			if (err) {
				console.log('error in insertion', err)

				res.render('customers/add', {
					title: 'Add New Customer',
					name: customer.name,
					email: customer.email
				})
			} else {
				res.redirect('/customers')
			}
		})
	} else {
		var error_message = '';
		err.forEach(element => {
			error_message += element.msg + '<br>'
		});
		res.render('customers/add', {
			title: 'Add New Customer',
			name: req.body.name,
			email: req.body.email
		})
	}
}


//update customer post action
exports.updateCustomer = (req, res) => {
	req.assert('name', 'Name is required').notEmpty()
	req.assert('email', 'An email is required').isEmail()
	req.assert('password', 'password is required').notEmpty()
	var err = req.validationErrors()
	var customerId = req.params.id
	// no error found
	if (!err) {
		var hashedPassword = bcrypt.hashSync(req.body.password, 8);
		var customer = {
			name: req.sanitize('name').escape().trim(),
			email: req.sanitize('email').escape().trim(),
			password: hashedPassword
		}
		var customerObj = {
			customer: customer,
			customerId: customerId
		}
		Customer.update(customerObj, (err, data) => {
			if (err) {
				console.log('Not Edited', err);
				res.render('customers/update', {
					title: 'Edit Customer',
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				})
			} else {
				res.redirect('/')
			}
		})
	} else {
		console.log('errors... ',err )
	}
}


//show add user form 
exports.showAddCustomerForm = (req, res) => {
	console.log('i am in showAddCustomerForm')
	res.render('customers/add', {
		title: 'Add New Customer',
		name: '',
		email: ''
	})
}

exports.home = (req, res) => {
	connection.query('SELECT * FROM customers ORDER BY id DESC', (err, rows) => {
		if (err) {
			console.log('i am in error', err)
			res.render('customers', {
				page_Title: 'Customers - Node js',
				data: ''
			})
		} else {
			res.render('customers', {
				page_Title: 'Customer - Node Js',
				data: rows
			})
		}
	})
}

exports.deleteCustomer = (req, res, next) => {
	var customerId = req.params.id
	if (!customerId) {
		res.redirect('/')
	} else if (customerId) {
		//delete customer from database
		Customer.delete(customerId, (err, data) => {
			if (err) {
				console.log('not deleted', err);
				res.redirect('/')
			} else {
				res.redirect('/')
			}
		});
	}
}



exports.showEditCustomerForm = (req, res, next) => {
	var customerId = req.params.id;
	if (!customerId) {
		res.redirect('/')
	} else if (customerId) {
		Customer.find(customerId, (err, data) => {
			console.log('err', err)
			if (err) throw err
			if (data.length < 0) {
				res.redirect('/')
			} else {
				console.log('data', data.id)
				res.render('customers/edit', {
					title: 'Edit Customer',
					id: data.id,
					name: data.name,
					email: data.email,
					password: data.password
				})
			}
		})


	}
}