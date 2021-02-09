const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./app/routes/index.routes')
const customerRoutes = require('./app/routes/customers.routes')
const settingsRoutes = require('./app/routes/settings.routes')
const loginRoutes = require('./app/routes/login.routes')
const app = express()
const path = require('path')
const serverStatic = require('serve-static')
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
app.use('/', serverStatic(path.join(__dirname, '/app/assets')))
/**
 *  App Configuration
 */
// set the view engine to ejs

app.set('view engine', 'ejs');
app.use(loginRoutes)
app.use(routes);
app.use(customerRoutes)
app.use(settingsRoutes)
//Server Activation
const PORT = process.env.PORT || 3000
app.listen(3000, () => {
	console.log(`Server is running on Port ${PORT}`)
})