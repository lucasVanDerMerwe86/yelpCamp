var Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    express = require("express"),
    middleware = require("../middleware/index"),
    router = express.Router({ mergeParams: true });


//new comments
router.get("/comments/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.campgroundID, function(err, foundCampground) {
        if (err || !foundCampground) {
            return console.log(err);
        }
        res.render("comments/new", { campground: foundCampground });
    });
});


//create comments
router.post("/comments", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.campgroundID, function(err, foundCampground) {
        if (err || !foundCampground) {
            return console.log(err);
        }

        var newComment = { content: req.body.content };

        Comment.create(newComment, function(err, comment) {
            if (err || !comment) {
                return console.log(err);
            }
            comment.author.username = req.user.username;
            comment.author.userID = req.user._id;
            comment.save();
            foundCampground.comments.push(comment);
            foundCampground.save(err, function(err, campground) {
                if (err || !campground) {
                    return console.log(err);
                }
                res.redirect("/campgrounds/" + req.params.campgroundID);
            });
        });
    });
});

//edit
router.get("/comments/:commentID/edit", middleware.commentOwnership, function(req, res) {
    Comment.findById(req.params.commentID, function(err, foundComment) {
        if (err || !foundComment) {
            return console.log(err);
        }
        res.render("comments/edit", { comment: foundComment, campground_id: req.params.campgroundID });
    });
});


//update
router.put("/comments/:commentID", middleware.commentOwnership, function(req, res) {
    var author = { username: req.user.username, userID: req.user._id };
    var comment = { content: req.body.content, author: author };

    Comment.findByIdAndUpdate(req.params.commentID, comment, function(err, updatedComment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.campgroundID);
        }
    });
});


//delete
router.delete("/comments/:commentID", middleware.commentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.commentID, function(err) {
        if (err) {
            return console.log(err);
        }
        res.redirect("/campgrounds/" + req.params.campgroundID);
    });
});


module.exports = router;