const express = require('express')
const bodyParser = require('body-parser')
const customerRoutes = require('./app/routes/customer.routes')
const app = express()

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next()
// })

app.get('/', (req, res) => {
    res.json({
        message: 'Hi amna'
    })
})

app.use(customerRoutes);


const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is running on Port ${PORT}`)
})