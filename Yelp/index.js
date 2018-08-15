let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);