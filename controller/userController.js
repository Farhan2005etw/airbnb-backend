const favourite = require("../models/favourite");
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
    favourite.getFavourites((favourites) => {
        Home.fetchAll((registeredHomes) =>  {
            const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id))
            res.render('store/favourite-list', {favouriteHomes: favouriteHomes, PageTitle: 'My Favourite'} )});
    })
    
}

exports.postAddToFavourite = (req, res, next) => {
console.log("came to add to favourite", req.body)
favourite.addToFavourites(req.body.id, error => {
    if (error) {
        console.log("Error in adding to favourite", error)
    }
    res.redirect("/favourites")
})

}

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    favourite.deleteById(homeId, err => {
        if (err) {
            console.log("Error While Deleting from Fav List", err)
        }
        res.redirect("/favourites")
    })
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



