require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema)

router.post('/register', (req, res) => {
    const {email, password} = req.body

    bcrypt.hash(password, saltRounds, (err, hash) => {
        const newUser = new User({
            email: email,
            password: hash
        })
    
        newUser.save((err) => {
            if(err) {
                console.log(err)
            } else {
                res.send('success')
                console.log('register successful')
                
            }
        })
    })
})


router.post("/login", (req, res) => {
    const {email, password} = req.body
  
    User.findOne({email: email}, (err, foundUser) => {
        if(err) {console.log(err)}
        if(foundUser) {
            bcrypt.compare(password, foundUser.password, (err, results) => {
                if (results === true) {
                    console.log('user logged in')
                    res.send(process.env.COOKIE)
                }
            })
        }
    })
})

module.exports = router