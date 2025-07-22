import express from "express"
import Itinerary from '../models/itinerary.js'

const router = express.Router()

import signedInUser from "../middleware/signed-in-user.js"



// * Routes

// Index

router.get('/', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find().populate("contributor", "username")
        return res.render('itineraries/index.ejs', {
            title: 'Itineraries',
            allItineraries: itineraries
        })
    } catch (error) {
        next(error)
    }
})

// New

router.get('/new', signedInUser, async (req, res) => {
    try {
        res.render('itineraries/new.ejs', {
            title: 'New itinerary'
        })
    } catch (error) {
        next(error)
    }
})

// Create

router.post('/', signedInUser, async (req, res, next) => {
    try {
        console.log("Session user:", req.session.user)
        req.body.contributor = req.session.user._id
        console.log("Contributor ID being set:", req.body.contributor)
        const newItinerary = await Itinerary.create(req.body)

        return res.redirect(`/itineraries/${newItinerary._id}`)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Show

router.get('/:itineraryId', async (req, res, next) => {
    console.log("Show route")
    try {
        const { itineraryId } = req.params
        const itinerary = await Itinerary.findById(itineraryId).populate("contributor", "username")

        return res.render('itineraries/show.ejs', {
            title: `${itinerary._id}`,
            itinerary
        })
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})


// Edit

router.get('/:itineraryId/edit', signedInUser, async (req, res, next) => {
    console.log('Edit route');
    try {
        const { itineraryId } = req.params
        const itinerary = await Itinerary.findById(itineraryId)

        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }

        if (!itinerary.contributor.equals(req.session.user._id)) {
            return res.status(403).send('You are not authorized to edit this itinerary');
        }

        return res.render('itineraries/edit.ejs', {
            title: `Edit ${itinerary._id}`,
            itinerary
        });
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Update

router.put('/:itineraryId', signedInUser, async (req, res, next) => {
    try {
        const { itineraryId } = req.params
        const itineraryToUpdate = await Itinerary.findById(itineraryId)

        if (!itineraryToUpdate.contributor.equals(req.session.user._id)) {
            return res.status(403).send('You are not authorized to edit this itinerary')
        }

        await Itinerary.findByIdAndUpdate(itineraryId, req.body)

        return res.redirect(`/itineraries/${itineraryId}`)

    } catch (error) {
        console.log(error)
        next(error)
    }
})


// Delete

router.delete('/:itineraryId', signedInUser, async (req, res) => {
    try {
        const { itineraryId } = req.params
        const itineraryToDelete = await Itinerary.findById(itineraryId)

        if (!itineraryToDelete.contributor.equals(req.session.user._id)) {
            return res.status(403).send('You are not authorized to delete this itinerary')
        }

        await itineraryToDelete.deleteOne();
        return res.redirect('/itineraries');

    } catch (error) {
        next(error)
    }
})


export { router as 'itinerariesRouter' }