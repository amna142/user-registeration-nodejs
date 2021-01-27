var express = require('express')
var router = express.Router()
var customerCurd = require('../controllers/customers.controller')
var indexController = require('../controllers/index.controller')

router.get('/', customerCurd.home)
router.post('/customers/add', indexController.create)
router.get('/customers/add', customerCurd.showAddCustomerForm)
router.get('/customers/delete/(:id)', customerCurd.deleteCustomer)
router.get('/customers/edit/(:id)', customerCurd.showEditCustomerForm)
router.post('/customers/update/(:id)', customerCurd.updateCustomer)
module.exports = router