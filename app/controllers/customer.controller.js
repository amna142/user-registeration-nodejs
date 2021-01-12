const Customer = require('../models/customers.model.js');
exports.create = (req, res) => {
    console.log('req.body', req.body);
    if (!req.body) {
        res.status(400).send({
            mesage: 'Content cannot be empty!'
        });
    } else if (req.body) {
        //create customer
        const customer = new Customer({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        });

        //save customer into database
        Customer.create(customer, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: err.message || 'some error occured while creating cutsomer'
                });
            } else res.send(data);
        });
    }
};