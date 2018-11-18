const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/login', (req, res) => {
    res.render('users/login');
});


usersRouter.get('/register', (req, res) => {
    res.render('users/register')
});

module.exports = usersRouter;