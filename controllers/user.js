import express from 'express'
const router = express.Router()

import Itinerary from '../models/itinerary.js'
import signedInUser from "../middleware/signed-in-user.js"

// * Routes

// User profile

router.get('/profile', signedInUser, async (req, res, next) => {
    try {
        console.log('user: ', req.session.user)

        const myItineraries = await Itinerary.find({
            contributor: req.session.user._id,
        }).populate('contributor')

        res.render('user/profile.ejs', {
            title: `${req.session.user?.username || 'User'}'s profile`,
            myItineraries,
            message: res.locals.message,
            user: req.session.user
        })
    } catch (error) {
        res.redirect('/')
    }
});

export { router as userRouter }