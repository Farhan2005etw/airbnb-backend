//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const homesController = require('../controller/homes')


const hostRouter = express.Router();


hostRouter.get("/add-home", homesController.getAddHome)
hostRouter.post("/add-home", homesController.postAddHome)



exports.hostRouter = hostRouter;
