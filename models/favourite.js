//core modules
const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path')

const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class favourite {
    static addToFavourites(id, callback) {
        favourite.getFavourites((favourites) => {
            
            if (favourites.includes(id)) {
                callback("Already in favourites")
            }
            else {
                favourites.push(id)
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites),callback)
            }

        })

    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        })
    }

     static deleteById(delHomeId, callback) {
        favourite.getFavourites(homeIds => {
          homeIds = homeIds.filter(homeId => delHomeId !== homeId )
          fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
          
          
        });
      }

}
