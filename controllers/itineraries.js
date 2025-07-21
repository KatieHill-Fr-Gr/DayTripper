import express from "express"
import Itinerary from '../models/itinerary.js'

const router = express.Router()

import signedInUser from "../middleware/signed-in-user.js"



// * Routes

// Index

router.get('/', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find()
        return res.render('itineraries/index.ejs', { 
            title: 'Itineraries',
            allItineraries: itineraries
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// New

router.get('/new', signedInUser, (req, res) => {
    res.render('itineraries/new.ejs', {
        title: 'New itinerary'
    })
})

// Create

router.post('/', async (req, res, next) => {
    try {
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
        const itinerary = await Itinerary.findById(itineraryId)
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

router.get('/:itineraryId/edit', async (req, res, next) => {
    console.log('Edit route');
    try {
        const { itineraryId } = req.params
        console.log("Received itineraryId:", itineraryId);

        const itinerary = await Itinerary.findById(itineraryId)

        console.log('Found itinerary:', itinerary);

        if (!itinerary) {
            // Handle case if no document found for that id
            return res.status(404).send('Itinerary not found');
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

router.put('/:itineraryId', async (req, res, next) => {
    try {
        const { itineraryId } = req.params
        const updatedItinerary = await Itinerary.findById(itineraryId)

        await Itinerary.findByIdAndUpdate(itineraryId, req.body)

        return res.redirect(`/itineraries/${itineraryId}`)

    } catch (error) {
        console.log(error)
        next(error)
    }
})


// Delete

router.delete('/:itineraryId', async (req, res) => {
    try {
        const { itineraryId } = req.params
        const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryId)
        console.log(`Deleted ${deletedItinerary}`)
        return res.redirect('/itineraries')
    } catch (error) {
        console.log(error)
    }
})


export { router as 'itinerariesRouter' }