var Campground = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    mongoose = require("mongoose");


var campgrounds = [{
        name: "Paradise falls",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZHz8r__Ybn4y0atYTjnFvxig60SCvqH5amYi8M9TP1NhghEQUQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis placerat condimentum. Nam vitae elit non neque finibus sagittis. Pellentesque gravida in purus vitae ullamcorper. Cras vehicula fermentum ullamcorper. Nunc pellentesque lectus purus, vitae convallis orci ullamcorper in. Morbi sit amet scelerisque neque. Nulla eu mauris at ipsum porttitor viverra"
    },
    {
        name: "Paradise falls",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkU9cJEprzKczrQriDBXZzf4_pCxK7YOZBmwbQ49OqX7r298u",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis placerat condimentum. Nam vitae elit non neque finibus sagittis. Pellentesque gravida in purus vitae ullamcorper. Cras vehicula fermentum ullamcorper. Nunc pellentesque lectus purus, vitae convallis orci ullamcorper in. Morbi sit amet scelerisque neque. Nulla eu mauris at ipsum porttitor viverra"
    },
    {
        name: "Paradise falls",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkU9cJEprzKczrQriDBXZzf4_pCxK7YOZBmwbQ49OqX7r298u",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis placerat condimentum. Nam vitae elit non neque finibus sagittis. Pellentesque gravida in purus vitae ullamcorper. Cras vehicula fermentum ullamcorper. Nunc pellentesque lectus purus, vitae convallis orci ullamcorper in. Morbi sit amet scelerisque neque. Nulla eu mauris at ipsum porttitor viverra"
    }

]


function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("campgrounds cleared");
        Comment.deleteMany({}, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("comments cleared");
            campgrounds.forEach(function(campground) {
                Campground.create(campground, function(err, newCampground) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("campground created");
                    Comment.create({ content: "blaaaah", author: "Lucas vd Merwe" }, function(err, createdComment) {
                        if (err) {
                            return console.log(err);
                        }
                        newCampground.comments.push(createdComment);
                        newCampground.save();
                        console.log("comments created");
                    });

                });
            });
        });
    });

}


module.exports = seedDB;