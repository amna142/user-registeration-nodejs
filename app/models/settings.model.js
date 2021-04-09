const sql = require('./db.js')


//here we define customer's constructor

const Settings = function (setting) {
	this.domain = setting.domain,
		this.access = setting.access
}


Settings.findDomain = (domain, result) => {

	domain = JSON.stringify(domain).replace(/"/g, "'")
	console.log('domain', domain)
	sql.query(`SELECT * FROM Settings WHERE domain=${domain}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('settings found', res.recordset[0])
			result(null, res.recordset[0])
			return
		}
		result({
			kind: 'Not Found'
		}, null)
	})
}

Settings.find = (setting, result) => {
	console.log('setting', setting)
	sql.query(`SELECT * FROM Settings WHERE id=${setting}`, (err, res) => {
		if (err) {
			console.log("error...", err)
			result(err, null)
			return
		}
		if (res.recordset.length) {
			console.log('settings found', res.recordset[0])
			result(null, res.recordset[0])
			return
		}
		result({
			kind: 'Not Found'
		}, null)
	})
}

Settings.delete = (id, result) => {
	console.log('settingsId', id)
	sql.query(`DELETE FROM Settings WHERE id=${id}`, (err, res) => {
		console.log('hello response', res)
		if (err) {
			console.log("error:", err)
			result(err, null)
			return
		} else {
			if (res.length) {
				console.log('settings found', res[0])
				result(null, res[0])
				return
			} else {
				result({
					kind: 'Not Found'
				}, null)
			}
		}

	})
}

Settings.create = (settings, result) => {


	//check if same domain exist 
	

	console.log('settings here', settings.domain)
	var access = settings.access
	if (access === 'on') {
		access = true
	} else {
		access = false
	}
	if (settings.domain != null && settings.domain != undefined && settings.domain != '') {
		sql.query("INSERT INTO Settings VALUES('" + settings.domain + "','" + access + "')", (err, res) => {
			if (err) {
				console.log("error:", err)
				result(err, null)
				return
			} else {
				console.log('response', res)
				console.log('created setting record:', {
					...settings
				})
				result(null, {
					...settings
				})
			}
		})
	} else return 'fill all values'
}

Settings.update = (setting, result) => {
	var accessValue = setting.access

	if (accessValue === 'on') {
		accessValue = true
	} else {
		accessValue = false
	}
	console.log('accessValue', accessValue)
	var domainName = JSON.stringify(setting.domain).replace(/"/g, "'")
	accessValue = "'" + accessValue + "'"
	console.log('access before insert', "'" + accessValue + "'")
	sql.query(`UPDATE Settings SET domain=${domainName}, access=${accessValue} WHERE id=${setting.id}`, (err, res) => {
		console.log("error:", err)
		if (err) {
			result(err, null)
			return
		} else {
			console.log('updated settings Obj:', {
				id: res.insertId,
				...setting
			})
			result(null, {
				id: res.insertId,
				...setting
			})
		}
	})
}


module.exports = Settings