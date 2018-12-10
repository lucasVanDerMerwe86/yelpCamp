var Campground = require("../models/campgrounds"),
    User = require("../models/users"),
    passport = require("passport"),
    express = require("express"),
    router = express.Router();


//landing page
router.get("/", function(req, res) {
    res.render("landing");
});

//auth routes

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var username = new User({ username: req.body.username });
    var password = req.body.password;

    User.register(username, password, function(err, newUser) {
        if (err) {
            return console.log(err);
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {

});

router.get("/logout", function(req, res) {
    req.logOut();
    res.redirect("/campgrounds");
});

module.exports = router;