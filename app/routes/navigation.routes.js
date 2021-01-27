var express = require('express')
var router = express.Router()
var navigationController = require('../controllers/navigation.controller')
router.get('/navigation/add', navigationController.createForm)



module.exports = router