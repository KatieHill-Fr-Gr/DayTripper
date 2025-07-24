import express from "express"
const router = express.Router()

import Itinerary from '../models/itinerary.js'
import signedInUser from "../middleware/signed-in-user.js"

// New comment 

router.post('/:itineraryId/comments', signedInUser, async (req, res, next) => {
    try {
        const { itineraryId } = req.params
        req.body.user = req.session.user._id

        const itinerary = await Itinerary.findById(itineraryId)
        itinerary.comments.push(req.body)

        await itinerary.save()

        return res.redirect(`/itineraries/${itineraryId}`)

    } catch (error) {
        next(error)
    }
})

// Delete comment

router.delete('/:itineraryId/comments/:commentId', signedInUser, async (req, res, next) => {
    try {
        const { itineraryId, commentId } = req.params

        const itinerary = await Itinerary.findById(itineraryId)

        if (!itinerary) {
            return res.status(404).render('errors/404.ejs', {
                title: 'Itinerary Not Found'
            })
        }

        const commentToDelete = itinerary.comments.id(commentId)

        if (!itinerary.contributor.equals(req.session.user._id) &&
            !commentToDelete.user.equals(req.session.user._id)
        ) {
            return res.status(403).send('You are not authorized to delete this comment')
        }

        commentToDelete.deleteOne()

        await itinerary.save()

        return res.redirect('/user/profile')

    } catch (error) {
        next(error)
    }
})


export { router as 'commentsRouter' }