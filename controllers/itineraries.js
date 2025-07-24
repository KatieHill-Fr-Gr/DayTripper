import express from "express"
const router = express.Router()

import Itinerary from '../models/itinerary.js'
import signedInUser from "../middleware/signed-in-user.js"
import { upload } from '../utilities/cloudinary.js'
import cloudinaryUpload from '../utilities/cloudinaryUpload.js'



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

// Category: Europe

// Europe
router.get('/europe', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find().populate("contributor", "username")
        return res.render('itineraries/europe.ejs', { 
            title: "Europe",
            allItineraries: itineraries
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Americas
router.get('/americas', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find().populate("contributor", "username")
        return res.render('itineraries/americas.ejs', { 
            title: "Americas",
            allItineraries: itineraries
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Asia
router.get('/asia', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find().populate("contributor", "username")
        return res.render('itineraries/asia.ejs', { 
            title: "Asia",
            allItineraries: itineraries
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Africa
router.get('/africa', async (req, res, next) => {
    try {
        const itineraries = await Itinerary.find().populate("contributor", "username")
        return res.render('itineraries/africa.ejs', { 
            title: "Africa",
            allItineraries: itineraries
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// Create

router.post('/', signedInUser, upload.array('images', 3), async (req, res, next) => {
    try {
        req.body.contributor = req.session.user._id

        if (req.files && req.files.length > 0) {
            const results = await Promise.all(
                req.files.map(file => cloudinaryUpload(file.buffer))
            )
            req.body.images = results.map(result => result.secure_url)
        } else {
            req.body.images = []
        }

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

        if (!itinerary) {
            return res.status(404).render('errors/404.ejs', {
                title: 'Itinerary Not Found'
            })
        }

        const userHasLiked = itinerary.likedbyUsers.some(likedId => {
            return likedId.equals(req.session.user._id)
        })


        return res.render('itineraries/show.ejs', {
            title: `${itinerary._id}`,
            itinerary,
            userHasLiked
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


// Like

router.post('/:itineraryId/liked-by/:userId', signedInUser, async (req, res, next) => {
    try {
        const { itineraryId, userId } = req.params

        if (req.session.user._id !== userId) {
            return res.status(403).send('You are not authorized to save this itinerary')
        }

        await Itinerary.findByIdAndUpdate(itineraryId, {
            $push: { likedbyUsers: userId }
        })

        return res.redirect(`/itineraries/${itineraryId}`)
    } catch (error) {
        next(error)
    }
})

// Unlike

router.delete('/:itineraryId/liked-by/:userId', signedInUser, async (req, res, next) => {
    try {
        const { itineraryId, userId } = req.params

        if (req.session.user._id !== userId) {
            return res.status(403).send('You are not authorized to unsave this itinerary')
        }

        await Itinerary.findByIdAndUpdate(itineraryId, {
            $pull: { likedbyUsers: userId }
        })

        return res.redirect(`/itineraries/${itineraryId}`)
    } catch (error) {
        next(error)
    }
})


export { router as 'itinerariesRouter' }