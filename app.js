const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

let userNames = ["name1", "name2", "name3", "name4", "name5"];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// ===========HOME ROUTE===============

app.get("/", function(req, res) {
    res.render("home");
});

// ===========LOGIN ROUTE===============

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/", function(req, res) {
    console.log("New User Name: " + req.body.newUserName);
    console.log("New Password: " + req.body.newPassword);
    console.log("Final unserNames: " + userNames);
    if(userNames.includes(req.body.newUserName)){
        res.redirect("/");
    } else {
        userNames.push(req.body.newUserName);
        res.redirect("/form");
    }
    // userNames.forEach(function(users){
    //     if(req.body.newUserName === users) {
    //         res.redirect("/");
    //     } else {
    //         res.redirect("/form");
    //     }
    // })

    // userName.push(req.body.newUserName)
});

// ===========FORM ROUTE===============

app.get("/form", function(req, res) {
    res.render("form");
})

app.post("/form", function(req, res) {
    age = req.body.ageInput;
    gender = req.body.genderInput;
    
    children = req.body.nocInput;
    smoke = req.body.smokeInput;
    
    bmi = req.body.bmiInput;


    console.log(age, gender, children, smoke, bmi);


})

// ===========BMI CALC ROUTE===============

app.get("/bmiCalc", function(req, res) {
    res.render("bmiCalc");
});

app.post("/bmiCalc", function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / (height * height);
    bmiInput = req.body.bmi;
    console.log(bmi);
    
})





app.listen(3000, function() {
    console.log("Server in running on port 3000.");
});