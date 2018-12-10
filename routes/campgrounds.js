var Campground = require("../models/campgrounds"),
    express = require("express"),
    middleware = require("../middleware/index"),
    router = express.Router();

//index
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            return console.log(err);
        }
        res.render("campgrounds/index", { campgrounds: campgrounds });
    }).sort({ name: -1 });
});

//new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//show
router.get("/:campgroundID", function(req, res) {
    Campground.findById(req.params.campgroundID).populate("comments").exec(function(err, specificCampground) {
        if (err || !specificCampground) {
            return console.log(err);
        }
        res.render("campgrounds/show", { campground: specificCampground });
    });
});



//create
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newCampground = {
        name: req.body.campground.name,
        image: req.body.campground.image,
        description: req.body.campground.description,
        author: { username: req.user.username, userID: req.user._id }
    }

    Campground.create(newCampground, function(err, newlyCreatedCampground) {
        if (err || !newlyCreatedCampground) {
            console.log(err);
            return
        }
        res.redirect("/campgrounds");
    });
});

//edit
router.get("/:campgroundID/edit", middleware.campgroundOwnership, function(req, res) {
    Campground.findById(req.params.campgroundID, function(err, foundCampground) {
        if (err || !foundCampground) {
            return console.log(err);
        }
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});


//update
router.put("/:campgroundID", middleware.campgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.campgroundID, req.body.campground, function(err, updatedCampground) {
        if (err) {
            return console.log(err);
        }
        res.redirect("/campgrounds/" + req.params.campgroundID);
    });
});

//delete
router.delete("/:campgroundID", middleware.campgroundOwnership, function(req, res) {
    Campground.findByIdAndDelete(req.params.campgroundID, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;