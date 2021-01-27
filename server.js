const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./app/routes/index.routes')
const customerRoutes = require('./app/routes/customers.routes')
var navigationRoutes = require('./app/routes/navigation.routes')
const app = express()
var expressValidator = require('express-validator')
//CORS fixing
const cors = require('cors')
app.use(cors({
	origin: 'http://localhost:8080'
}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(bodyParser.urlencoded({
	extended: true
}))
/**
 *  App Configuration
 */
// set the view engine to ejs

app.set('view engine', 'ejs');

app.use(routes);
app.use(customerRoutes)
app.use(navigationRoutes)

//Server Activation
const PORT = process.env.PORT || 3000
app.listen(3000, () => {
	console.log(`Server is running on Port ${PORT}`)
})