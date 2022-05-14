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

app.post('/articles', (req, res) => {
    const {content, title} = req.body


    const newArticle = new Article({
        title: title,
        content: content
    })

    newArticle.save((err) => {
        if (!err) {res.send('Successfully added a new article')} else {res.send(err)}
    })
})


app.delete('/articles', (req, res) => {
    Article.deleteMany({}, (err) => {
        if (!err) {
            res.send('Successfully deleted all articles')
        } else {
            res.send(err)
        }
    })
})


app.listen(5000, () => {
    console.log('listening on port 5000')
})