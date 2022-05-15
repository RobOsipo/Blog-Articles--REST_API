require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const articleRouter = require('./routers/articles')
const authRouter = require('./routers/auth')


const app = express();



app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.static("public"));


app.use('/', articleRouter)
app.use('/', authRouter)


app.get('/', (req, res) => {
    res.send('<h1>Welcome To My API</h1>')
})


app.listen(5000, () => {
    console.log('listening on port 5000')
})