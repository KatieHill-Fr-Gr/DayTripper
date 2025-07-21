/*------------------------------- SetUp -------------------------------*/

import express from 'express'
const app = express()
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const port = process.env.PORT

import { defaultRouter } from './controllers/default.js'
import { itinerariesRouter } from './controllers/itineraries.js'
import { authRouter } from './controllers/auth.js'

import passUserToView from "./middleware/pass-user-to-view.js"
import userMessage from "./middleware/user-messages.js"

/*------------------------------- Connection -------------------------------*/


const getConnected = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connection established')
        app.listen(port, () => console.log(`Ready to go on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

getConnected()

/*------------------------------- Middleware -------------------------------*/


app.use(express.urlencoded())
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    })
  })
)
app.use(passUserToView);
app.use(userMessage);


/*--------------------------------- Routes ---------------------------------*/

app.use('/', defaultRouter)
app.use('/itineraries', itinerariesRouter)
app.use('/auth', authRouter)