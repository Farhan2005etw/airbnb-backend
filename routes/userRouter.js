//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const homesController = require('../controller/homes')


const userRouter = express.Router();

userRouter.get("/", homesController.getHome)

module.exports = userRouter;
