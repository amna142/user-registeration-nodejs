const Customer = require('../models/customers.model.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/auth.config')

//login request 

exports.find = (req, res) => {
	console.log('i m in find ')
	Customer.findEmployee(req.body.email, (err, customer) => {
		console.log('err...', err)
		if (err) {
			res.send({
				message: 'Error on Server',
				statusCode: 500,
				auth: false
			})
		}
		if (!customer) {
			res.send({
				message: 'No Customer Found',
				statusCode: 404,
				auth: false
			})
		}
		console.log('req.body.password', req.body.password)
		var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password)
		if (!passwordIsValid) {
			res.send({
				auth: false,
				token: null,
				data: null,
				statusCode: 401
			})
		}
		console.log('customer', customer)

		var token = jwt.sign({
			id: customer.employee_id,
			email: customer.email,
			name: customer.first_name + ' ' + customer.last_name
		}, config.secret, {
			expiresIn: 86400
		})
		if (token) {
			res.send({
				auth: true,
				token: token,
				statusCode: 200
			})
		}

	})
}



exports.findAll = (req, res) => {
	res.send({
		message: 'Hi amna'
	})
}


//post request for user himself Registration 
exports.create = (req, res) => {
	console.log('req.body', req.body);
	if (!req.body) {
		res.status(400).send({
			mesage: 'Content cannot be empty!'
		});
	} else if (req.body) {
		console.log('body', req.body)
		//create customer
		var hashedPassword = bcrypt.hashSync(req.body.password, 8);
		const customer = new Customer({
			email: req.body.email,
			first_name: req.body.first_name,
			password: hashedPassword
		});

		//save customer into database
		Customer.create(customer, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).send({
					message: err.message || 'some error occured while creating cutsomer'
				});
			} else {
				console.log('data', data)
				//create jwt token 
				var token = jwt.sign({
					id: data.id,
					name: data.first_name,
					email: data.email
				}, config.secret, {
					expiresIn: 86400
				})
				res.status(200).send({
					auth: true,
					token: token
				})
			}
		});
	}
};