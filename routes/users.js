const express = require('express');
const usersRouter = express.Router();
/*
@GET '/login' render login form
@GET '/register' render register form
@POST 
*/

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
        res.send('passed');
    }
});

module.exports = usersRouter;