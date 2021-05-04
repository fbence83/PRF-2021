const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');

const productModel = mongoose.model('product');


router.route('/login').post((req, res, next) => {
    if(req.body.username, req.body.password){
        passport.authenticate('local', function(error, user){
            if(error) return res.status(500).send(error);
            req.logIn(user, function(err){
                if(error) return res.status(500).send(error);
                return res.status(200).send('Bejelentkezes sikeres');
            });
        })(req, res);
    }else{
        return res.status(400).send('hibas keres, username, email es password kell');
    }
});


router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
})

router.route('/status').get((req, res, next) => {
    if(req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
    
})

router.route('/user').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(users);
    });
}).post((req, res, next) => {
    if(req.body.username && req.body.email && req.body.password){
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('DB hiba');
            if(user){
                return res.status(400).send('hiba, mar letezik ilyen felhasznalonev');
            }
            const usr = new userModel({username: req.body.username, password: req.body.password, email: req.body.email});
            usr.save((error) => {
                if(error) return res.status(500).send('a mentes soran hiba tortent');
                return res.status(200).send('Sikeres mentes tortent');
            });
        });
    }else{
        return res.status(400).send('hibas keres, username, email es password kell');
    }
})


router.route('/product').get((req, res, next) => {
    if(req.isAuthenticated()) {
        productModel.find({}, (err, products) => {
            if(err) return res.status(500).send('DB hiba');
            res.status(200).send(products);
        });
    }else{
        return res.status(403).send('Csak belepett felhasznalok kerhetik le a termekek listajat');
    }
}).post((req, res, next) => {
    
    if(req.user && req.user.accessLevel == 'admin'){

        if(req.body.name && req.body.price){
            productModel.findOne({name: req.body.name}, (err, product) => {
                if(err) return res.status(500).send('DB hiba');
                if(product){
                    return res.status(400).send('mar van ilyen name');
                }else{
                    const product = new productModel({name: req.body.name, price: req.body.price});
                    product.save((error) => {
                        if(error) return res.status(500).send('a mentes soran hiba tortent');
                        return res.status(200).send('Sikeres mentes tortent');
                    })
                }
            });
        }else{
            return res.status(400).send('Nem volt name vagy price');
        }
    }else{
        return res.status(403).send('Nem megfelelo hozzaferesi szint');
    }
    
}).put((req, res, next) => {
    
    if(req.user && req.user.accessLevel == 'admin'){
        if(req.body._id && (req.body.name || req.body.price)){
            productModel.findOne({_id: req.body._id}, (err, product) => {
                if(err) return res.status(500).send('DB hiba');
                if(product){
                    if(req.body.name) product.name = req.body.name;
                    if(req.body.price) product.price = req.body.price;

                    product.save((error) => {
                        if(error) return res.status(500).send('a mentes soran hiba tortent');
                        return res.status(200).send('Sikeres mentes tortent');
                    })
                }else{
                    return res.status(400).send('nincs ilyen id a db-ben');
                }
            });
        }else{
            return res.status(400).send('Nem volt id vagy value');
        }
    }else{
        return res.status(403).send('Nem megfelelo hozzaferesi szint');
    }


}).delete((req, res, next) => {
    if(req.user && req.user.accessLevel == 'admin'){

        if(req.body.name){
            productModel.findOne({name: req.body.name}, (err, product) => {
                if(err) return res.status(500).send('DB hiba');
                if(product){
                    product.delete((error) => {
                        if(error) return res.status(500).send('a mentes soran hiba tortent');
                        return res.status(200).send('Sikeres torles tortent');
                    });
                }else{
                    return res.status(400).send('nincs ilyen name a db-ben');
                }
            });
        }else{
            return res.status(400).send('Nem volt name');
        }

    }else{
        return res.status(403).send('Nem megfelelo hozzaferesi szint');
    }
})


module.exports = router;