const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/login', (req, res) => {
    res.render('./login');
});


usersRouter.get('/register', (req, res) => {
    res.send('Register form')
});

module.exports = usersRouter;