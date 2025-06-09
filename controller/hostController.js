const Bookings = require("../models/bookings");
const Home = require("../models/home");
const fs = require('fs')

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    editing: false,
    PageTitle: "Add Your Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home Not Found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/editHome", {
      home: home,
      PageTitle: "Edit Your Home",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating,  description } = req.body;
  console.log(houseName, price, location, rating,  description)
  console.log(req.file)
  if(!req.file) {
    console.log("no file Provided")
    return res.send("no file Provided")
  }

  const photo  = req.file.path;


  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("home saved successfully");
  });
  res.render("host/homeAdded", {
    PageTitle: "Successfull",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating,  description } =
    req.body;
  
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log(err)
          }
        })
        home.photo = req.file.path
      }
      home
        .save()
        .then((result) => {
          console.log("home added", result);
        })
        .catch((err) => {
          console.log("error while adding home", err);
        });
    })
    .catch((err) => {
      console.log("wrong id entered", err);
    });
  res.redirect("/host/host-home-list");
};
exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      PageTitle: "Host Homes List",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookedHomes = async (req, res, next) => {
  try {  const bookings = await Bookings.find().populate('homeId').populate('userId');
  res.render("host/bookedHomes", {
    bookings: bookings,
    PageTitle: "Booked Homes",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });} catch (err) {
    console.log("error while fetching booked homes", err);
    res.status(500).send("Internal Server Error");
  }

}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delete Home", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error while deleting", err);
    });
};
