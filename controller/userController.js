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

exports.postAddToFavourite = (req, res, next) => {
console.log("came to add to favourite", req.body)
res.redirect("/favourites")
}

exports.getHomeDetails =(req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home => {
        if (!home) {
            console.log("home not found")
            res.redirect("/homes")

        } else {
        res.render('store/home-details', { PageTitle: 'Home Detail', home: home } )}
    })
    
    
   
};



