//Core Modules
const path = require('path')

//External Modules
const express = require('express')

//Local Modules
const userRouter = require('./routes/userRouter')
const {hostRouter} = require('./routes/hostRouter')
const rootDir = require('./utils/path')

const app = express()
//Local Moduels
const errorController = require('./controller/errors')


//Middleware
app.use(express.urlencoded())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(userRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,  'public')));


app.use(errorController.pageNotFound)



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})