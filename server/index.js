require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const auth = require('./controllers/authController')
const cart = require('./controllers/cartController')
const search = require('./controllers/searchController')

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

//allows us to use req.body
app.use(express.json())

//session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))
// auth endpoints
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)

//cart endpoints
app.post('/api/cart/:id', cart.add)
app.post('/api/cart/checkout', cart.checkout)
app.delete('/api/cart/:id', cart.delete)
//search endpoint
app.get('/api/search', search.search)
//swag endpoint
app.get('/api/swag', swagController.read)


app.listen( SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT)
})