var express = require('express')
var router = express.Router()
var token = require('../auth/VerifyTokens')
var loginController = require('../controllers/login.controller')
router.get('/admin', loginController.loginForm)

router.post('/admin', loginController.adminSignIn)

router.get('/', token.checkAdminToken, loginController.home)


router.get('/logout', token.checkAdminToken, loginController.logout)

module.exports = router