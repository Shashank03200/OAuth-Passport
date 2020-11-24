const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();

// Setup view engine
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname+'/public'));


// Set up the cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}))

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Connect to monogodb
const db = mongoose.connect("mongodb+srv://admin-Shashank:hercules43210@cluster0.if1xs.mongodb.net/ChatAppUsers?retryWrites=true&w=majority",{ useUnifiedTopology: true , useNewUrlParser: true })

db.then(()=>{
    console.log("Connected to database ChatAppUsers");
})


// Set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


// Create home route
app.get("/",(req, res)=>{
    // const user = 

    res.render('home', {user:req.user });
});

app.listen(3000, ()=>{
    console.log('Server started om port 3000');
})