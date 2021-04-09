var Admin = require('../models/login.model.js')
var jwt = require('jsonwebtoken')

var config = require('../config/auth.config');
exports.loginForm = (req, res) => {
	//show login form
	res.render('account/login')
}

exports.adminSignIn = (req, res) => {
	console.log('admin login', req.body)
	if (req.body) {
		Admin.find(req.body, (err, admin) => {
			if (err) {
				throw err
			} else {
				admin.forEach(element => {
					var token = jwt.sign({
						id: element.employee_id,
						email: element.email,
						name: element.first_name,
						adminRole: element.isAdmin
					}, config.secret, {
						expiresIn: 86400
					})
					if (token) {
						console.log('it should generate token')
						res.cookie('admin', token, {maxAge :  36000 })
						res.render('dashboard')
					} else {
						console.log('try again')
						res.render('account/login')
					}
				});

			}
		})
	} else {
		res.render('account/login')
	}

}

function getcookie(req, res) {
	var cookie = req.headers.cookie;
	if (cookie == null) {
		res.render('account/login')
	} else {
		// user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
		return cookie.split('; ')[0];
	}
}
exports.logout = (req, res, next) => {
	res.clearCookie('admin')
	// res.cookie('admin=; expires=Thu,10 Jan 1970 00:00:01 GMT;')
	res.redirect('/admin');
}
exports.home = (req, res) => {
	console.log('hi amna')
	res.redirect('/')
	// res.render('dashboard')
}