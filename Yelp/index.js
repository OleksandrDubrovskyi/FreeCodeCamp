let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
})

let campgrounds = [
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c27ea7e5b2be_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f4c27ea7e5b2be_340.jpg"}
];

app.get("/campgrounds", function(req, res) {
    
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let img = req.body.image;
    let newCampground = {name:name, image:img};
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    
    res.render("new.ejs");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);