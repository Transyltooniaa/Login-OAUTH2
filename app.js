const express = require('express');
const hbs = require('hbs');
const path = require('path');
const authRoutes = require('./router/auth-route');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const authMiddleware = require('./auth/authMiddleware');



require('./db/dbConnection');

const app = express();
const PORT = process.env.port || 3000;


//Setting up the session cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authRoutes);


const publicDirectoryPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'/templates/views');
const partialsPath = path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('home',{
        title:'Ajitesh\'s Oauth Tutorial'
    });
})

app.get('/profile',authMiddleware,(req,res)=>{
    res.send(`<h1>Profile page : Welcome: ${req.user.username}</h1>`);
})



app.listen(PORT,(req,res)=>{
    console.log('Server is running on port 3000');
})