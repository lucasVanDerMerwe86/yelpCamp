var express = require("express"),
    Campground = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    middleware = {};


middleware.isLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

middleware.campgroundOwnership = function campgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.campgroundID, function(err, campground) {
            if (err) {
                return console.log(err);
            }
            if (req.user._id.equals(campground.author.userID)) {
                next();
            } else {
                res.redirect("back");
            }
        });
    } else {
        res.redirect("/");
    }
};

middleware.commentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentID, function(err, foundComment) {
            if (err || !foundComment) {
                console.log(err);
            } else {
                if (req.user._id.equals(foundComment.author.userID)) {
                    console.log(req.user._id.equals(foundComment.author.userID));
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("/");
    }
}

module.exports = middleware;

//kan module.exports Campground na defined is, of kan module.exports sit in die plek van Campground