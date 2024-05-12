const express = require('express')
const usersRouter = express.Router()
const { User } = require('../models')

// GET all users
usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error', error })
    }
});

module.exports = usersRouter
