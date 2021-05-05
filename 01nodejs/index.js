const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://admin:'+process.env.DBPASS+'@prf-cluster.ib8d2.mongodb.net/test';

mongoose.connect(dbUrl);


//firebase
const whiteList = ['http://localhost:4200', 'https://safe-wave-12202.herokuapp.com', 'https://radiant-scrubland-45345.herokuapp.com'];

var corsOption = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
};

app.use(cors(corsOption));


mongoose.connection.on('connected', () =>{
    console.log('db csatlakoztatva');
})


mongoose.connection.on('error', (err) =>{
    console.log('Hiba tortent', err);
})

require('./user.model');
require('./product.model');

const userModel = mongoose.model('user');

app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json({}));

app.use(express.urlencoded({extended: true}));
app.use(express.json({}));

/*app.use(function(req, res, next) {
    console.log('headers', req.headers);
    next();
})*/


passport.use('local', new localStrategy(function(username, password, done){
    userModel.findOne({username: username}, function(err, user){
        if(err) return done('Hiba a lekeres soran', null);
        if(!user) return done('Hiba! Nincs ilyen felhasznalonev', null);
        user.comparePasswords(password, function(error, isMatch){
            if(error) return done(error, false);
            if(!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        });
    });
}));

passport.serializeUser(function(user, done){
    if(!user) return done('Nincs megadva beleptetheto felhasznalo', null);
    return done(null, user);
});

passport.deserializeUser(function(user, done){
    if(!user) return done('nincs user akit kileptethetnenk', null);
    return done(null, user);
});


app.use(expressSession({secret: 'prf2021lassananodejsvegereerunk', resave: true}));
app.use(passport.initialize());
app.use(passport.session());


//const productModel = mongoose.model('product');


app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => {res.render('pages/index.html')});



/* app.get('/', (req, res, next) => {
    res.send("Hello World!");
    next();
})  */


app.use('/', require('./routes'));
//app.use('/secondary', require('./routes'));


//REST - Representative State Transfer, GET - Read, POST - Create, PUT - Update, DELETE - Delete


app.use((req, res, next) => {
    res.status(404).send('A kert eroforras nem talalhato');
})


app.listen(port, () => {
    console.log("The server is running!");
})


//a parancssorból futó szervert ctrl+c-vel állítom meg