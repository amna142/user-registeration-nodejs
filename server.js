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