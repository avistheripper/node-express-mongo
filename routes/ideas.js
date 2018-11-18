const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

require('../models/Idea');
const Idea = mongoose.model('ideas');

/* 
@GET '/' ideas from user passing ID
@GET '/add' get add form
@GET '/edit/:id' edit form passing ID
@POST '/' create idea and save in DB
@PUT '/:id' edit idea and save in DB updated
@DELETE '/:id' remove from DB
*/

Router.get('/', (req, res) => {
    Idea.find({})
        .sort({date: 'desc'})
        .then(ideas => {
        res.render('ideas/index', {ideas});
        })
});

Router.get('/add', (req, res) => {
    res.render('ideas/add')
});


Router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(({title, details, id}) => res.render('ideas/edit', {title, details, id}));
    
});


Router.post('/', ({body}, res) => {
    const {title, details} = body;
    let errors = [];
    if(!title) errors.push({text: "Provide the title"});
    if(!details) errors.push({text: "Provide details"});
    if(errors.length > 0) {
        res.render("ideas/add", {
            errors,
            title,
            details
        })
    } else {
        const newUser = {
            title,
            details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                // req.flash('success_msg', 'The note has been deleted');
                res.redirect('/ideas');
                }
            )
        }
    });


Router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
            .then(idea => {
                res.redirect('/ideas');
            })
    })
})


Router.delete('/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    })
    .then(() => {
        req.flash('success_msg', 'The note has been deleted');
        res.redirect('/ideas')
    })
    .catch(err => err)
})




module.exports = Router;