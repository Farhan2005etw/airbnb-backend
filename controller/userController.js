const Home = require("../models/home");





exports.getHome =(req, res, next) => {
    Home.fetchAll((registeredHomes) =>  res.render('store/home', {registeredHomes: registeredHomes, PageTitle: 'Homes List'} ));    
    
   
};


exports.getIndex =(req, res, next) => {
    Home.fetchAll((registeredHomes) =>  res.render('store/index', {registeredHomes: registeredHomes, PageTitle: 'airbnb Home'} ));    
    
   
};

exports.getBookings = (req, res, next) => {    
      res.render('store/bookings', { PageTitle: 'My Bookings'} );    
};

exports.getFavouriteList = (req, res, next) => {  
   Home.fetchAll((registeredHomes) =>  res.render('store/favourite-list', {registeredHomes: registeredHomes, PageTitle: 'My Favourite'} )); 
}

exports.getHomeDetails =(req, res, next) => {
    const homeId = req.params.homeId;
    console.log("At Home Detail page", homeId)
    res.render('store/home-details', { PageTitle: 'Home Detail'} )
    
   
};



