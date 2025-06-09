const Bookings = require("../models/bookings");
const Home = require("../models/home");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes: registeredHomes,
      PageTitle: "Homes List",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user
    });
  });
};

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      PageTitle: "airbnb Home",
      isLoggedIn: req.isLoggedIn,
      user : req.session.user
    });
  });
};

exports.getBookings = (req, res, next) =>  {
  const homeId = req.params.homeId;
   Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found");
      res.redirect("/homes");
    } else {
      res.render("store/bookings", {
        PageTitle: "Home Detail",
        home: home,
        isLoggedIn: req.isLoggedIn,
        user : req.session.user
      });
    }
  });
};



exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    PageTitle: "My Favourites",
    
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};



exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postBookings = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const bookings = new Bookings ({
    homeId: homeId,
    userId: userId
  })
  await bookings.save()

  
  res.render("store/bookedSuccess", {
    PageTitle: "Booking Success",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user
  });
}

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId)

  if (user.favourites.includes(homeId)){
    user.favourites = user.favourites.filter(fav => fav != homeId)
    await user.save()
  }
res.redirect("/favourites");


};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        PageTitle: "Home Detail",
        home: home,
        isLoggedIn: req.isLoggedIn,
        user : req.session.user
      });
    }
  });
};
