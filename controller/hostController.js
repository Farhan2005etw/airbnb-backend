const Home = require("../models/home");


exports.getAddHome = (req, res, next) => {
    res.render('host/editHome', {editing: false, PageTitle : 'Add Your Home'})
};

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId, home => {
        if (!home) {
            console.log("Home Not Found for editing.");
            return res.redirect("/host/host-home-list")
        } 
        
    console.log(homeId, editing, home)
    res.render('host/editHome', {home: home, PageTitle : 'Edit Your Home', editing: editing})
    })
};

exports.postAddHome = (req, res, next) => {
   
    const {houseName, price, location, rating, photo} = req.body;
    const home = new Home(houseName, price, location, rating, photo)
    home.save(); 
   res.render('host/homeAdded', {PageTitle : 'Successfull'})
};

exports.getHostHomes =(req, res, next) => {
    Home.fetchAll((registeredHomes) =>  res.render('host/host-home-list', {registeredHomes: registeredHomes, PageTitle: 'Host Homes List'} ));    
    
   
};