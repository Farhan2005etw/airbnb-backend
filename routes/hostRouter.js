//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const hostController = require('../controller/hostController')


const hostRouter = express.Router();


hostRouter.get("/add-home", hostController.getAddHome)
hostRouter.post("/add-home", hostController.postAddHome)
hostRouter.get("/host-home-list", hostController.getHostHomes)



exports.hostRouter = hostRouter;
