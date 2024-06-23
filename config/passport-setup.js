const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../model/User')
const keys = require('./keys');




passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.googleClientID,
    clientSecret: keys.google.googleClientSecret
},(accessToken,refreshToken,profile,done)=>{
    
    User.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log('User already exists-----')
            console.log('User is:',currentUser);
            done(null,currentUser);
        }else{
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser)=>{
                console.log('New user created:',newUser);
                done(null,newUser);
            })
        }
    })
}));


