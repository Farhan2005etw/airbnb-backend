//External Modules
const express = require('express')

const hostRouter = express.Router();


hostRouter.get("/add-home", (req, res, next) => {
    res.send(`
        <h1>Bata Bhai Kaisa Ghar h Tera </h1>
        <form action="/host/add-home" method = POST>
        <input type="text" name="houseName" Placeholder="House Name"/>
        <input type="submit"/>
        </form> 
        `)
})

hostRouter.post("/add-home", (req, res, next) => {
    console.log(req.body)
    res.send(`
        <h1>Thik h Bhai Bataunga Agar Koi Customer Hua To </h1>        
        `)
})



module.exports = hostRouter;
