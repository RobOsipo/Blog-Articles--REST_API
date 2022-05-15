require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

mongoose.connect(process.env.MONGOPRODUCTION, { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// Request for all articles, GET all articles, POST to all articles, DELETE all articles
router
  .route("/articles")
  .get((req, res) => {
    Article.find((err, articles) => {
      if (err) {
        return res.send(err);
      }
      res.send(articles);
    });
  })
  .post((req, res) => {
    const { content, title } = req.body;

    const newArticle = new Article({
      title: title,
      content: content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("Successfully added a new article");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Successfully deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

// Request for a single article, GET one article, PUT one article,  DELETE one article
router
  .route("/articles/:articleTitle")
  .get((req, res) => {
    const { articleTitle } = req.params;
    Article.findOne({ title: articleTitle }, (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that Title was found");
      }
    });
  })
  .put((req, res) => {
    const { articleTitle } = req.params;
    const { title, content } = req.body;
    Article.updateOne(
      { title: articleTitle },
      { title: title, content: content },
      (err) => {
        if (!err) {
          res.send(`succesfully updated ${articleTitle}`);
        }
        if (err) {
          res.send("It goofed");
        }
      }
    );
  })
  .delete((req, res) => {
    const { articleTitle } = req.params;
    Article.deleteOne({ title: articleTitle }, (err) => {
      if (!err) {
        res.send(`Succesfully deleted ${articleTitle}`);
      }
    });
  });

module.exports = router;
