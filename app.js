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

// ===========LOGIN/SIGNUP ROUTE===============

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    console.log("New User Name: " + req.body.newUserName);
    console.log("New Password: " + req.body.PasswordInput);
    console.log("Final unserNames: " + userNames);
    if(userNames.includes(req.body.newUserName)){
        res.redirect("/");
    } else {
        userNames.push(req.body.newUserName);
        res.redirect("/signUp");
    }
});


app.get("/signUp", function(req, res) {
    res.render("signUp");
});

app.post("/signUp", function(req, res) {
    console.log("New User Name: " + req.body.newUserName);
    console.log("New Password: " + req.body.PasswordInput);
    console.log("Repeat Password: " + req.body.newPasswordInput);
    console.log("Final unserNames: " + userNames);
    if(userNames.includes(req.body.newUserName)){
        res.redirect("/");
    } else {
        userNames.push(req.body.newUserName);
        res.redirect("/form");
    }
});



// ===========FORM ROUTE===============

app.get("/form", function(req, res) {
    res.render("form");
});

app.post("/form", function(req, res) {
    age = req.body.ageInput;
    gender = req.body.genderInput;
    children = req.body.nocInput;
    smoker = req.body.smokeInput;
    bmi = req.body.bmiInput;

    const data = {
        "age": age, 
        "sex": gender, 
        "bmi": bmi,
        "children": children,
        "smoker": smoker  
    }

    const jsonData = JSON.stringify(data);

    const url = "https://hackverse3.herokuapp.com/predict/";
    const options = {
        method: "POST"
    }



    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.redirect("/estimate");
        } else {
            res.send(response.statusCode);
            console.log(statusCode);
        }

        response.on("data", function(data){
            console.log((JSON.parse(data)));
        })

        request.write(jsonData);
        request.end();
    });
    console.log(age, gender, children, smoker, bmi);

    const estimate = https.get(url, function(response){
        console.log(response.statusCode);
    })

    console.log(estimate);


});






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

    
});





app.listen(3000, function() {
    console.log("Server in running on port 3000.");
});