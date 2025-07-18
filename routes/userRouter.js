//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const userController = require('../controller/userController')


const userRouter = express.Router();

userRouter.get("/", userController.getIndex)
userRouter.get("/bookings/:homeId", userController.getBookings)
userRouter.post("/bookings/:homeId", userController.postBookings)
userRouter.get("/homes", userController.getHome)
userRouter.get("/favourites", userController.getFavouriteList)

userRouter.get("/homes/:homeId", userController.getHomeDetails)

userRouter.post("/favourites", userController.postAddToFavourite)

userRouter.post("/favourites/delete/:homeId", userController.postRemoveFromFavourite)



module.exports = userRouter;
