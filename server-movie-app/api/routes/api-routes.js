const express = require('express');

const authRouter = require('./auth-routes');
const moviesRouter = require('./movies-router')
const router = new express.Router();

router.use('/auth', authRouter);

router.use('/movies', moviesRouter);


module.exports = router;