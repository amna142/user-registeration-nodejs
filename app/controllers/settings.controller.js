const Settings = require('../models/settings.model')
var connection = require('../models/db')
exports.findDomain = (req, res) => {
	Settings.findDomain(req.body.domain, (err, setting) => {
		if (err) {
			res.send({
				message: 'Error on Server',
				statusCode: 500
			})
		} else {
			if (!setting) {
				res.send({
					message: 'No Domain Settings Found',
					statusCode: 404
				})
			} else {
				res.send({
					access: setting.access,
					domain: setting.domain,
					statusCode: 200
				})
			}
			console.log('setting', setting)
		}


	})
}

exports.index = (req, res) => {
	connection.query('SELECT * FROM Settings ORDER BY id DESC', (err, rows) => {
		console.log('rows', rows.recordset)
		if (err) {
			console.log('i am in error', err)
			res.render('settings', {
				page_Title: 'Settings - Node js',
				data: ''
			})
		} else {
			res.render('settings', {
				page_Title: 'Settings - Node Js',
				data: rows.recordset
			})
		}
	})
}



exports.deleteSettings = (req, res, next) => {
	var settingId = parseInt(req.params.id)
	console.log('settingId', typeof (settingId))
	if (!settingId) {
		res.redirect('/settings')
	} else if (settingId) {
		//delete customer from database
		Settings.delete(settingId, (err, data) => {
			if (err) {
				console.log('not deleted', err);
				res.redirect('/settings')
			} else {
				res.redirect('/settings')
			}
		});
	}
}


//post request
exports.create = (req, res) => {
	if (!req.body) {
		res.render('settings/add', {
			title: 'Add New Settings',
			domain: req.body.first_name,
			access: req.body.access
		})
	} else if (req.body) {
		//create customer
		const settings = new Settings({
			domain: req.body.domain,
			access: req.body.access
		});

		//save customer into database
		Settings.create(settings, (err, data) => {
			if (err) {
				console.log(err);
				res.render('settings/add', {
					title: 'Add New Customer',
					domain: settings.domain,
					access: settings.access
				})
			} else {
				console.log('i have reached here', settings)
				res.redirect('/settings')
			}
		});
	}
};

exports.showAddForm = (req, res) => {
	console.log('i am in add settings form')
	res.render('settings/add', {
		title: 'Add New Settings',
		domain: '',
		access: ''
	})
}



exports.showEditForm = (req, res, next) => {

	var settingId = req.params.id;
	if (!settingId) {
		res.redirect('/')
	} else if (settingId) {
		Settings.find(settingId, (err, data) => {
			console.log('err', err)
			if (err) throw err
			if (data.length < 0) {
				res.redirect('/settings')
			} else {
				res.render('settings/edit', {
					title: 'Edit Customer',
					id: settingId,
					domain: data.domain,
					access: data.access
				})
			}
		})
	}
}

exports.updateSettings = (req, res) => {
	console.log('req.body Amna', req.body);
	var settingsId = parseInt(req.params.id)
	console.log('access', req.body.access)
	// no error found
	if (settingsId) {
		console.log('req.body', req.body)
		var settings = {
			domain: req.body.domain,
			access: req.body.access,
			id: settingsId
		}
		console.log('settings', settings)
		Settings.update(settings, (err, data) => {
			if (err) {
				console.log('Not Edited', err);
				console.log('req', req.body)
				res.render('settings', {
					title: 'Edit Settings',
					domain: req.body.domain,
					access: req.body.access
				})
			} else {
				console.log('data', data)
				res.redirect('/settings')
			}
		})
	} else {
		console.log('errors... ')
	}
}