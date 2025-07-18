import express from "express"
import Itinerary from '../models/itinerary.js'

const router = express.Router()



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

router.get('/new', (req, res) => {
    res.render('itineraries/new.ejs', {
        title: 'New itinerary'
    })
})

// Create

router.post('/', async (req, res, next) => {
    try {
        const newItinerary = await Itinerary.create(req.body)
        return res.redirect(`/itineraries/${newItinerary._id}`, {
        title: `${newItinerary._id}`
    })
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
    try {
        const { itineraryId } = req.params
        const itinerary = await Itinerary.findById(itineraryId)
        return res.render('itineraries/edit.ejs', { 
            title: `Edit ${itinerary._id}`,
            itinerary })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Update

router.put('/:itineraryId', async (req, res, next) => {
    try {
        const { itineraryId } = req.params
        const itineraryToUpdate = await Itinerary.findById(itineraryId)

        await Itinerary.findByIdAndUpdate(itineraryId, req.body);

        return res.redirect(`/itineraries/${itineraryId}`, { 
            title: `${itineraryId}`,
     })

    } catch (error) {
        console.log(error)
        next(error)
    }
})


// Delete





export { router as 'itinerariesRouter' }