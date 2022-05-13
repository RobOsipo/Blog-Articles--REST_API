require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


mongoose.connect(process.env.MONGO, {useNewUrlParser:true})

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema)


app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Coding Wiki API</h1>')
})

app.get('/articles', (req, res) => {
    Article.find((err, articles) => {
        if(err) {return res.send(err)}
        res.send(articles)
    })
})


app.listen(5000, () => {
    console.log('listening on port 5000')
})