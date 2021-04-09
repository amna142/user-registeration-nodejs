var express = require('express')
var router = express.Router()
var settingsController = require('../controllers/settings.controller')
var token = require('../auth/VerifyTokens')

router.post('/setting',  settingsController.findDomain)

router.get('/settings', token.checkAdminToken, settingsController.index)
router.get('/settings/add', token.checkAdminToken, settingsController.showAddForm)
router.post('/settings/add', token.checkAdminToken, settingsController.create)
router.get('/settings/delete/(:id)', token.checkAdminToken, settingsController.deleteSettings)
router.get('/settings/edit/(:id)', token.checkAdminToken, settingsController.showEditForm)
router.post('/settings/edit/(:id)', token.checkAdminToken, settingsController.updateSettings)
module.exports = router