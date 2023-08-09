require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const config = require('./config/vars')

const runChatServer = require('./controllers/ws')

const server = http.createServer(app)
const serachRouter = require('./routes/search')
const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')
const reservationRouter = require('./routes/reservation')
const restaurantOwnerRouter = require('./routes/restaurantOwner')
const adminRouter = require('./routes/admin')
const customerRouter = require('./routes/customer')
const waitersRouter = require('./routes/waiter')
const exp = require('constants')

app.use(morgan('dev'))

app.use(express.json())

app.use(function (req, res, next) {
    /*     const allowedOrigins = [ "http://localhost:3000" , "https://www.youtube.com" ];
    
    if (allowedOrigins.includes(req.headers.origin))  res.header('Access-Control-Allow-Origin', req.headers.origin); */

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*') // allow to append headers like Contenet-type, X-access-control
    res.header('Access-Control-Allow-Methods', '*') // for specific method place PUT,GET,POST,DELETE
    next()

    /*     if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', '*');        
        return res.status(200).end();
    } */
})

runChatServer(server)

app.use(
    '/image/',
    express.static(path.join(__dirname, 'uploads'))
)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRouter)

app.use('/restaurant', serachRouter)

app.use('/auth', authRouter)

app.use('/chat', chatRouter)

app.use('/restaurantowner', restaurantOwnerRouter)

app.use('/reservation', reservationRouter)

app.use('/customer', customerRouter)

app.use('/waiter', waitersRouter)

server.listen(config.APP_PORT, function () {
    console.log(`Server is running on ${config.APP_HOST}:${config.APP_PORT}`)
})