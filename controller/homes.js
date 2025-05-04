const Home = require("../models/home");



exports.getAddHome = (req, res, next) => {
    res.render('host/addHome', {PageTitle : 'Add Your Home'})
};

exports.postAddHome = (req, res, next) => {
   
    const {houseName, price, location, rating, photo} = req.body;
    const home = new Home(houseName, price, location, rating, photo)
    home.save(); 
   res.render('host/homeAdded', {PageTitle : 'Successfull'})
};

exports.getHome =(req, res, next) => {
    Home.fetchAll((registeredHomes) =>  res.render('store/home', {registeredHomes: registeredHomes, PageTitle: 'airbnb Home'} ));    
    
   
};



