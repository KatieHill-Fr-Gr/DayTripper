import express from "express"
const router = express.Router()

import Itinerary from '../models/itinerary.js'
import signedInUser from "../middleware/signed-in-user.js"
import { upload } from '../utilities/cloudinary.js'
import cloudinaryUpload from '../utilities/cloudinaryUpload.js'
import multer from "multer"



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

router.get('/new', signedInUser, async (req, res, next) => {
    try {
        res.render('itineraries/new.ejs', {
            title: 'New itinerary',
            formData: req.session.formData || {}
        })
        delete req.session.formData
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

router.post('/', signedInUser, async (req, res, next) => {
    console.log(req.body)
    try {
        const newItinerary = await Itinerary.create({
            ...req.body,
            images: req.body.images,           
            contributor: req.session.user._id
        })
        res.redirect(`/itineraries/${newItinerary._id}`)
    } catch (err) {
        next(err)
    }
})



// Show

router.get('/:itineraryId', async (req, res, next) => {
    console.log("Show route")
    try {
        const { itineraryId } = req.params
        const itinerary = await Itinerary.findById(itineraryId)
            .populate("contributor", "username")
            .populate("comments.user", "username profileImage")
            .populate("likedbyUsers", "username profileImage")

        if (!itinerary) {
            return res.status(404).render('errors/404.ejs', {
                title: 'Itinerary Not Found'
            })
        }

        const userId = req.session.user?._id;

        const userHasLiked = userId
            ? itinerary.likedbyUsers.some(likedId => likedId.equals(userId))
            : false;

        const userHasCommented = userId
            ? itinerary.comments.some(comment => comment.user.equals(userId))
            : false;

        return res.render('itineraries/show.ejs', {
            title: `${itinerary._id}`,
            itinerary,
            userHasLiked,
            userHasCommented
        })

    } catch (error) {
        next(error)
    }
})


// Edit

router.get('/:itineraryId/edit', signedInUser, async (req, res, next) => {
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
        next(error)
    }
})


// Update

router.put('/:itineraryId', signedInUser, upload.array('images', 3), async (req, res, next) => {
    try {
        const { itineraryId } = req.params
        const itineraryToUpdate = await Itinerary.findById(itineraryId)

        if (!itineraryToUpdate.contributor.equals(req.session.user._id)) {
            return res.status(403).send('You are not authorized to edit this itinerary')
        }

        await Itinerary.findByIdAndUpdate(itineraryId, req.body)

        return res.redirect(`/itineraries/${itineraryId}`)

    } catch (error) {
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