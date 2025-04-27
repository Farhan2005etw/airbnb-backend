//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const rootDir = require('../utils/path');
const { registeredHomes } = require('./hostRouter');


const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
    console.log( registeredHomes)
    res.render('home', {registeredHomes: registeredHomes, PageTitle: 'airbnb Home'} )
})

module.exports = userRouter;
