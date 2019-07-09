require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const auth = require('./controllers/authController')

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
//endpoints
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)


app.get('/api/swag', swagController.read)


app.listen( SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT)
})