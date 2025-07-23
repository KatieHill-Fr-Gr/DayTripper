import express from 'express'
const router = express.Router()

import User from '../models/user.js'
import { upload } from '../utilities/cloudinary.js'
import cloudinaryUpload from '../utilities/cloudinaryUpload.js'

import bcrypt from 'bcrypt'


// * Routes

// Sign up form 

router.get('/sign-up', async (req, res) => {
    try {
        res.render('auth/sign-up.ejs', {
            title: 'Create an account',
            message: res.locals.message
        })
    } catch (error) {
        return res.status(404).render('errors/404')
    }
});

// Create account

router.post('/sign-up', upload.single('profileImage'), async (req, res) => {
    try {
        if (req.body.username.trim() === '') {
            throw new Error('Username is required')
        }
        if (req.body.password.trim() === '') {
            throw new Error('Password is required')
        }
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            throw new Error('Username already exists')
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Passwords must match')
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword;

        if (req.file && req.file.buffer) {
            const result = await cloudinaryUpload(req.file.buffer);
            req.body.profileImage = result.secure_url;
        } else {
            console.error('Cloudinary upload failed:', error);
            req.body.profileImage = 'https://ui-avatars.com/api/?background=4c949a&color=fff';
        }

        const user = await User.create(req.body)

        req.session.user = {
            username: user.username,
            _id: user._id,
            profileImage: user.profileImage
        }

        req.session.message = {
            type: 'success',
            text: 'Welcome ',
        }

        req.session.save(() => {
            res.redirect('/')
        })

    } catch (error) {
        console.log(error)
        req.session.message = {
            type: 'error',
            text: error.message,
        }
        res.redirect('/auth/sign-up')
    }
});

// Sign-in form

router.get('/sign-in', async (req, res) => {
    try {
        res.render('auth/sign-in.ejs', {
            title: 'Sign in to your account',
            message: res.locals.message
        })
    } catch (error) {
        return res.status(404).render('errors/404')
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
            username: userInDatabase.username,
            _id: userInDatabase._id
        };

        const redirectTo = req.session.redirectTo || '/'
        delete req.session.redirectTo;

        req.session.message = {
            type: 'success',
            text: 'Welcome back ',
        }

        req.session.save(() => {
            res.redirect(redirectTo)
        });

    } catch (error) {
        req.session.message = {
            type: 'error',
            text: error.message,
        }
        res.redirect('/auth/sign-in')
    }
})

// Sign out

router.get('/sign-out', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/')
        })
    } catch (error) {
        req.session.message = {
            type: 'error',
            text: 'There was a problem signing you out. Please try again.',
        }
        res.redirect('/')
    }
})




export { router as authRouter }