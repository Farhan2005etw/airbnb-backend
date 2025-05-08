//core modules
const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path')

const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
    constructor(houseName, price, location, rating, photo) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photo = photo; 
    }

    save() {
        this.id = Math.random().toString();
        Home.fetchAll ((registeredHomes) => {
        registeredHomes.push(this);
        
        fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error=> {
            console.log("file writing concluded", error);
        });})
    }

    static fetchAll(callback) {
        const filePath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(filePath, (error, data) => {

            callback(!error ? JSON.parse(data) : [])
          
        })
            
    }

    static findById(homeId, callback) {
        this.fetchAll(homes => {
           const homeFound =  homes.find(home => home.id === homeId)
           callback(homeFound)
        })
    }


}
