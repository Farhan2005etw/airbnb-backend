//External Modules
const express = require('express')

//Local Modules
const userRouter = require('./routes/userRouter')
const hostRouter = require('./routes/hostRouter')

const app = express()


//Middleware
app.use(express.urlencoded())

app.use(userRouter);
app.use("/host",hostRouter);

app.use((req, res, next) => {
    res.status(404).send(`
        <h1>Error 404 Page Not Found </h1>
        <a href="/">Go to Home</a>`)
})



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})