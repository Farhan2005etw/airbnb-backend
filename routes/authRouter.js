
//External Modules
const express = require('express')
const authRouter = express.Router();

//Local Modules
const authController = require('../controller/authController')



authRouter.get("/login", authController.getLogin)
authRouter.post("/login", authController.postLogin)
authRouter.post("/logout", authController.postLogout)
authRouter.get("/signup", authController.getSignUp)
authRouter.post("/signup", authController.postSignUp)


module.exports = authRouter;
