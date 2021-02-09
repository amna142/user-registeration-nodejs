var jwt = require('jsonwebtoken')
var config = require('../config/auth.config')
let checkToken = (req, res, next) => {
	console.log('i am here', req.headers)

	//here we check headers, url query params or posr params
	var token = req.headers['x-access-token'] || req.headers['authorization']
	console.log('token', token)
	if (!token) {
		console.log('i am in no token')
		return res.send({
			auth: false,
			message: 'Not token found'
		})
	} else
	if (token) {
		//time to check secret and verify token
		jwt.verify(token, config.secret, function (err, decode) {
			if (err) {
				return res.send({
					auth: false,
					message: 'fail to authenticate token'
				})
			}
			//if token is perfect save it for other routes call
			req.decode = decode
			next()
		})
	}
}

function getcookie(req, res) {
	console.log('i am called')
	var cookie = req.headers.cookie;
	if (cookie === undefined) {
		res.render('account/login')
		return
	} else {
		// user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
		return cookie.split('; ')[0];
	}

}

let checkAdminToken = (req, res, next) => {
	//here we check headers, url query params or posr params
	var cookie = getcookie(req, res);
	if (cookie) {
		var token = cookie.split('=')[1]
		console.log(token);
		if (!token) {
			console.log('i am in no token')
			res.render('account/login')
		} else
		if (token) {
			//time to check secret and verify token
			jwt.verify(token, config.secret, (err, payload) => {
				console.log('verifying token')
				if (err) {
					console.log('try again', err)
					res.render('account/login')
				} else {
					console.log('verified')
					//if token is perfect save it for other routes call
					req.decode = payload;
					next()
				}
			})
		}
	}
}
module.exports = {
	checkToken: checkToken,
	checkAdminToken: checkAdminToken
}