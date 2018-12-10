var LocalStrategy = require("passport-local").Strategy,
    expressSession = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    express = require("express"),
    seedDB = require("./seed.js"),
    app = express();

var Campground = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    User = require("./models/users");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yelpcampLastAttempt", { useNewUrlParser: true });

app.set('view engine', 'ejs');

//middleware
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'puppies are cute',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//more middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:campgroundID/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

//invoke seed file
//seedDB();

var port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port);
});