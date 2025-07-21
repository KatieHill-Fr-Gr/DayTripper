import express from 'express'
const router = express.Router()

import User from '../models/user.js'

import bcrypt from 'bcrypt'

// import { upload } from "../utils/cloudinary.js"
// import cloundinaryUpload from "../utils/cloudinaryUpload.js"

// * Routes

// Sign up form 

router.get('/sign-up', async (req, res) => {
    try {
    res.render('auth/sign-up.ejs', {
        title: 'Create an account'
    })
    } catch (error) {
        return res.status(404).send('Form not found')
    }
});

// Create account

router.post('/sign-up', async (req, res) => {
    try {
        if (req.body.username.trim() === '') {
            throw new Error('Username is required')
        }   
        if (req.body.password.trim() === '') {
            throw new Error('Password is required')
        }
        const userInDatabase = await User.findOne ({ username: req.body.username })
        if (userInDatabase) {
            throw new Error('Username already exists')
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Passwords must match')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword;

        const user = await User.create(req.body)

         req.session.user = {
            username: user.username,
            _id: user._id
            //make profle img available too profileImage: user.profileImage
        }

        req.session.save(() => {
            res.redirect('/')
        })

    } catch (error) {
        res.redirect('/auth/sign-up')
    }
});

// Sign-in form

router.get('/sign-in', async (req, res) => {
     try {
    res.render('auth/sign-in.ejs', {
        title: 'Sign in to your account'
    })
} catch (error) {
    console.log(error)
}
});

// Sign in

router.post('/sign-in', async (req, res) => {
    try {
        if (req.body.username.trim() === '') {
            throw new Error('Username is required')
        }
        if (req.body.password.trim() === '') {
            throw new Error('Password is required')
        }
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (!userInDatabase) {
            throw new Error('Username not recognised. Please try again.')
        }
        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );
        if (!validPassword) {
            throw new Error('Password not recognised. Please try again.');
        }

         req.session.user = {
            username: userInDatabase._id,
            _id: userInDatabase._id
        };

        const redirectTo = req.session.redirectTo || '/'
        delete req.session.redirectTo;

        req.session.save(() => {
            res.redirect(redirectTo)
        });

    } catch (error) {
        req.session.message = error.message
        res.redirect("/auth/sign-in");
    }
})

// Sign out

router.get('/sign-out', async (req, res) => {
     try {
    req.session.destroy(()=> {
        res.redirect('/')
    })
} catch (error) {
    console.log(error)
}
})




export { router as authRouter }