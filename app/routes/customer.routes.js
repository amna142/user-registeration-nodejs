const customerController = require('../controllers/customer.controller.js')
const express = require('express');
const router = express.Router();
const checkToken = require('../auth/VerifyTokens')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

router.post('/register', customerController.create);
router.post('/login', customerController.find)
router.get('/home', checkToken, customerController.findAll)
router.post('/auth/varify', (req, res) => {

	//here we check headers, url query params or posr params
	var token = req.headers['x-access-token'] || req.headers['authorization']
	console.log('token123', token)
	if (!token) {
		console.log('i am in no token')
		return res.send({
			auth: false,
			message: 'Not token found'
		})
	} else
	if (token) {
		//time to check secret and verify token
		jwt.verify(token, config.secret,  (err, payload) => {
			if(err){
				res.send({
					auth: false
				})
			}
			//if token is perfect save it for other routes call
			req.decode = payload;

			res.send({
				auth: true
			})
			
		})
	}
})

module.exports = router;