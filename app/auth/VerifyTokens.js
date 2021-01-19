var jwt = require('jsonwebtoken')
var config = require('../config/auth.config')

let checkToken = (req, res, next) => {
	console.log('i am here', req.headers)

	//here we check headers, url query params or posr params
	var token = req.headers['x-access-token'] || req.headers['authorization']
	console.log('token', token)
	if(!token){
	console.log('i am in no token')
	return res.send({auth: false, message: 'Not token found'})
	}else
	if(token){
    //time to check secret and verify token
	jwt.verify(token, config.secret, function(err, decode){
		if(err){
		return	res.send({auth: false, message: 'fail to authenticate token'})
		}
		//if token is perfect save it for other routes call
		req.decode = decode
		next()
	})
	}
}

module.exports = checkToken