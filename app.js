//Core Modules
const path = require('path')

//External Modules
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose')
const multer = require('multer')

//Local Modules
const userRouter = require('./routes/userRouter')
const {hostRouter} = require('./routes/hostRouter')
const authRouter = require('./routes/authRouter')
const rootDir = require('./utils/path')
const errorController = require('./controller/errors')


const DB_PATH = "mongodb+srv://farhan786etw:Khan%40786@farhanmongo.08zn019.mongodb.net/airbnb?retryWrites=true&w=majority&appName=FarhanMongo"


const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
})

const randomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz'
    let result = '';
    for (let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    
    filename: (req, file, cb) => {
        cb(null, randomString(10) + '-' + file.originalname)
    }


})


const multerOption = {
    storage, fileFilter
}

//Middleware
const app = express()
app.use(express.urlencoded());
app.use(multer(multerOption).single('photo'));
app.use(express.static(path.join(rootDir,  'public')));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/bookings/uploads", express.static(path.join(rootDir, 'uploads')))    

app.use(session({
    secret: "Farhan Coding Secret",
    resave: false,  
    saveUninitialized: true,
    store 
}))
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn
    next()
})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(authRouter)
app.use(userRouter);
app.use("/host", (req, res, next) => {
    if (!req.isLoggedIn) {
        return res.redirect('/login')
    }
    next();
})
app.use("/host",hostRouter);



app.use(errorController.pageNotFound)



const PORT = 3000;


mongoose.connect(DB_PATH).then(() => {
    console.log("connecting to mongoose")
     app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
}).catch(err => {
    console.log("error while connecting", err)
})

