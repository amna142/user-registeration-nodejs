const index = require('../controllers/index.controller.js')
const express = require('express');
const router = express.Router();
const token = require('../auth/VerifyTokens')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
var indexController = require('../controllers/index.controller')


router.get('/', indexController.home)
router.post('/register', index.create);
router.post('/login', index.find)
router.get('/home', token.checkToken, index.findAll)
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