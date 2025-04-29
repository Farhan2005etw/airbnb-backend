const Home = require("../models/home");



exports.getAddHome = (req, res, next) => {
    res.render('addHome', {PageTitle : 'Add Your Home'})
};

exports.postAddHome = (req, res, next) => {
    console.log('home registration successfull for:',  req.body )
    const {houseName, price, location, rating, photo} = req.body;
    const home = new Home(houseName, price, location, rating, photo)
    home.save(); 
   res.render('homeAdded', {PageTitle : 'Successfull'})
};

exports.getHome =(req, res, next) => {
    const registeredHomes = Home.fetchAll();    
    console.log( registeredHomes)
    res.render('home', {registeredHomes: registeredHomes, PageTitle: 'airbnb Home'} )
};



