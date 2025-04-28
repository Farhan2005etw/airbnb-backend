//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const rootDir = require('../utils/path')


const hostRouter = express.Router();


hostRouter.get("/add-home", (req, res, next) => {
    res.render('addHome', {PageTitle : 'Add Your Home'})
})

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
    console.log('home registration successfull for:',  req.body )
    registeredHomes.push( req.body);
   res.render('homeAdded', {PageTitle : 'Successfull'})
})



exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
