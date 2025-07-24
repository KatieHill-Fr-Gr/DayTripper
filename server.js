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
import { userRouter } from './controllers/user.js'
import { commentsRouter } from './controllers/comments.js'

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

app.locals.CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

/*------------------------------- Middleware -------------------------------*/


app.use(express.urlencoded())
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
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
app.use('/', userRouter)
app.use('/itineraries', commentsRouter)


// * Error handlers


// 404 Not Found
app.use((req, res) => {
  return res.status(404).render('errors/404.ejs', {
            title: '404 page not found',
        })
})

// 500 Error
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).render('errors/500.ejs', {
    title: '500 an error occurred',
  })
})
