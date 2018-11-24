const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Roters

const ideasRouter = require('./routes/ideas');
const usersRouter = require('./routes/users');

// Passport config

require('./config/passport');

// Connecting to DB

const db = mongoose.connect('mongodb://localhost/vidjot-dev');

mongoose.connection.once('connected', () => {
    console.log('MongoDB connected...');
});

// Setting the port

const port = process.env.PORT || 9090;

// Override mw

app.use(methodOverride('_method'));

// Handlebars mw

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser mw

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static path

app.use(express.static(path.join(__dirname, 'public')));

//Express-session & connect-flash

app.use(session({
    secret: 'your mom',
    resave: true,
    saveUninitialized: true, 
    cookie: {secure: true}
}));
app.use(flash());

// Globals

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Index route

app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {title});
});

// About route

app.get('/about', (req, res) => {
    res.render('about');
});

// Init ideas/users router

app.use('/ideas', ideasRouter);
app.use('/users', usersRouter)

app.listen(port);
console.log(`Vidjot is running at ${port}`);

