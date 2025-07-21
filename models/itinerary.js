import mongoose from "mongoose";

// * Schemas

// Comments

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true
})

// Itinerary

const itinerarySchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    contributor: {
        type: String,
        required: true,
        // ref: "User"
    },
    timeOfYear: {
        type: String,
        required: true
    },
    morning: {
        type: String,
        required: true
    },
    afternoon: {
        type: String,
        required: true
    },
    evening: {
        type: String,
        required: true
    },
    image: String,
    likedbyUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema]
})



// * Define my model

const Itinerary = mongoose.model('itinerary', itinerarySchema)

// * Export it so that the controllers file can access it

export default Itinerary