const Customer = require('../models/customers.model.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/auth.config')
//post request
exports.create = (req, res) => {
	console.log('req.body', req.body);
	if (!req.body) {
		res.render('customers/add', {
			title: 'Add New Customer',
			name: customer.name,
			email: customer.email,
			password: customer.password
		})
	} else if (req.body) {
		//create customer
		var hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const customer = new Customer({
			email: req.body.email,
			name: req.body.name,
			password: hashedPassword
		});

		//save customer into database
		Customer.create(customer, (err, data) => {
			if (err) {
				console.log(err);
				res.render('customers/add', {
					title: 'Add New Customer',
					name: customer.name,
					email: customer.email,
					password: customer.password
				})
			} else {
				res.redirect('/')
			}
		});
	}
};


//login request 

exports.find = (req, res) => {
	Customer.find({
		email: req.body.email
	}, (err, customer) => {
		if (err) {
			res.status(500).send({
				message: 'Error on Server'
			})
		}
		if (!customer) {
			res.status(404).send('No Customer Found')
		}
		var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password)
		if (!passwordIsValid) {
			res.status(401).send({
				auth: false,
				token: null,
				data: null
			})
		}
		var token = jwt.sign({
			id: customer.id,
			email: customer.email,
			name: customer.name
		}, config.secret, {
			expiresIn: 86400
		})
		res.status(200).send({
			auth: true,
			token: token
		})
	})
}

exports.findAll = (req, res) => {
	res.send({
		message: 'Hi amna'
	})
}