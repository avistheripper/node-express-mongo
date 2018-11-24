const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const passport = require('passport');


const usersRouter = express.Router();
/*
@GET '/login' render login form
@GET '/register' render register form
@POST 
*/

require('../models/User');
const User = mongoose.model('users');

usersRouter.get('/login', (req, res) => {
    res.render('users/login');
});


usersRouter.get('/register', (req, res) => {
    res.render('users/register')
});

usersRouter.post('/register', ({body}, res) => {
    const {name, email, password, password2} = body;
    let errors = [];
    if(password != password2) errors.push({text: "Passwords doesn't match"});
    if(password.length < 10) errors.push({text: 'The password is too short'});
    if(errors.length > 1) {
        res.render('users/register', ({
            errors,
            name,
            email
        }));
    } else {
        User.findOne({
            email
        })
        .then((user) => {
            if(user) {
                res.send('The email is already taken.')
            } else {
                let newUser = new User({
                    name,
                    email,
                    password
                });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));
                        })
                });
            }
        })
    }
});

module.exports = usersRouter;