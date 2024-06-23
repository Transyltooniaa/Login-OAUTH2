const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('login',{
        title:'Login'
    });
});

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    res.redirect('/');
});

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/');


});


module.exports = router;