const customerController = require('../controllers/customer.controller.js')
const express = require('express');

const router = express.Router();

router.post('/customers', customerController.create);


module.exports = router;