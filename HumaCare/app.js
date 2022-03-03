const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { random } = require("lodash");
const axios = require('axios');

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
        res.redirect("/hospitals");
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

let estimate;

app.get("/form", function(req, res) {
    res.render("form");
});

app.post("/form", function(req, res) {
    let age = req.body.ageInput;
    let gender = req.body.genderInput;
    let children = req.body.nocInput;
    let insured = req.body.insured;
    let smoker = req.body.smokeInput;
    let bmi_ = req.body.bmiInput;


    if(insured) {
        res.redirect("/info");
    } else {
        const data = {
            "age": age, 
            "sex": gender, 
            "bmi": bmi_,
            "children": children,
            "smoker": smoker  
        }
    
        const jsonData = JSON.stringify(data);
    
        async function makeRequest() {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                  },
            }
        
            let result = await axios.post("https://hackverse3.herokuapp.com/predict/", data, config)
        
            console.log(result.data);
            estimate = await result.data.prediction;
            res.redirect("/info?query=" + estimate)
            
        }
        
        makeRequest();

    }
});

// ===========BMI CALC ROUTE===============

app.get("/bmiCalc", function(req, res) {
    res.render("bmiCalc");
    // res.render("bmiCalc", {
    //     bmi: bmi
    // });
});

// app.post("/bmiCalc", function(req, res){
//     var weight = parseFloat(req.body.weight);
//     var height = parseFloat(req.body.height);
//     height = height/100;
//     var bmi = weight / (height * height);
//     console.log(bmi);
    
    
// });

// ===========ESTIMATE ROUTE===============


// app.get("/estimate", function(req, res){
//     https.get("https://hackverse3.herokuapp.com/predict/", function(response){

//         console.log(response.statusCode);
//     })
//     res.send("running");
    
//     res.render("estimate", {
//         estimate: estimate
//     });
    
// });



const hospitalNames = ["Super Speciality Block", "SGRHIndraprastha Apollo Hospitals", "BLK-Max Super Speciality Hospital", "Apollo Spectra Hospitals", "Park Hospital", "Moolchand Medcity","Max Super Speciality Hospital"
    ,"Triton Hospital","Nova IVF Fertility | Southend Fertility & IVF Centre","Medanta Mediclinic","Green Park Family Medicine Clinic","Gleneagles Global Health City","Government Hospital of Thoracic Medicine"
    ,"Appasamy Multispeciality Hospitals"
    ,"Dr Kumars Speciality Hospital"
    ,"Lifeline Hospitals Kilpuak "
    ,"Apollo Spectra Hospitals"
    ,"Mount Multispeciality Hospitals"
    ,"VS Hospitals - Multi-speciality Hospital"
    ,"32 Dental Care | Dental Clinic in Navalur"
    ,"Apollo Medical Centre"
    ,"CAPSTONE CLINIC - Multispeciality, Vaccine and Dental Clinic"
    ]
const phoneNumbers = [
    "1860 500 1066",
    "011 3040 3040",
    "011 4046 5555",
    "011 4532 3232",
   " 011 4200 0000",
    "011 4303 3333",
    "011 4605 6464",
    "1800 103 2229",
    "1800 103 2229",
    "011 2656 4237",
   " 044 4477 7000",
    "044 2241 8450",
    "079042 99271,",
   " 044 2238 6666",
    "096772 22333",
    "1860 500 2244",
    "044 2260 9090",
   ' 044 4600 8000',
   " 095001 00032",
    "1860 500 77",
    "044 4008 02 "    
    ]
const maps = [    
"https://maps.app.goo.gl/AJPSygRAAb4WhHjD6",
"https://maps.app.goo.gl/3skJ8KbXyXRbuNZ19",
"https://maps.app.goo.gl/KDYU43ZTdAvcS4eq9",
"https://maps.app.goo.gl/FAMPDyNC55U3kfUT8",
"https://g.page/park-hospital?share",
"https://goo.gl/maps/oucSJJzbuWEN8Mpn9",
"https://goo.gl/maps/6Gt5wC2bt9HuvEd58",
'https://g.page/TritonHospital?share',
'https://g.page/Novasouthendvasanthvihar?share',
"https://goo.gl/maps/7a9tUFH6awHKEKpY6",
'https://goo.gl/maps/vTYP482YqZYb9L7s6',
"https://goo.gl/maps/F8Juu3ALFkWaN7SK6",
'https://goo.gl/maps/ABfnGsDDVeGB6i1h9',
'https://g.page/appasamyhospitals?share',
'https://goo.gl/maps/MUhv26JunnbxmmgK9',
"https://goo.gl/maps/5bAqffD18xvyAd5AA",
"https://goo.gl/maps/wjGBUXceL7fS7mQu5",
"https://goo.gl/maps/2fkwREBq5g3jus558",
"https://g.page/vshospitals?share",
"https://g.page/32dentalcarenavalur?share",
'https://goo.gl/maps/MP8jmPLehVV5J1vX9',
"https://goo.gl/maps/iKkTUmqkXVUkBH1H6"
]

const docName = [
    "Dr. (Prof.) D.S. Rana, Dr. B.K. Rao, Dr. Ajay Swaroop",
    "Dr. Brahmadeva Dwivedi,    Dr. Krishna Yadav." ,
    "Dr. sushant shrivastva, Dr. Ashwini goel Dr. ajay",
    "Dr. I Sathyamurthy. MBBS,  Dr. Jayashree. MBBS",
    "Dr. Gurdeep Singh Bindra,   Dr. Satpinder Kaur.",
    "Dr. Sachin Ambekar, Dr. Virender Anand",
    "Dr. Harit Chaturvedi, Dr. Anant Kumar",
    "Dr. Sachin Ambekar, Dr. Virender Anand",
    "Dr. I Sathyamurthy. MBBS,  Dr. Jayashree. MBBS",
    "Dr. Harit Chaturvedi, Dr. Anant Kumar",
    "Dr. Brahmadeva Dwivedi, Dr. Krishna Yadav. ",
    "Dr. Praveen Chander N,  Dr. Krishna Yadav." ,
    "DR.ASHA RANJINI, DR.SUMITHRA",
    "Dr. S.j. Daniel, Dr. Chitra Devi, Dr. B. Chithra,",
    "Dr Saravana Kumar. MBBS, Dr. Pradeep Selvaraj." ,
    "Dr. Rajkumar San",
    "Dr. Meenakshi Sundaram. Dr. G.Radhika",
    "Dr. SARAVANAN BALACHANDRAN MS,Mch Dr. M. SUGANYA MD",
    "Dr. I Sathyamurthy. MBBS  Dr. Jayashree. MBBS",
    "Dr. Gurdeep Singh Bindra.   Dr. Satpinder Kaur.",
    "Dr. Sachin Ambekar, Dr. Virender Anand",
    "Dr. V. Ramasubramanian"
    ]

const location = [
    'delhi',
    "delhi",
    "delhi",
    'delhi',
    "delhi",
    "delhi",
    "delhi",
    "delhi",
    "delhi",
    "delhi",
    "delhi",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai",
    "chennai"
    ]


// const randomHospitals = Math.floor(Math.random()*10);
// console.log(randomHospitals)

app.get("/info", function(req, res) {
    const {query} = req.query;
    // const jsonData = JSON.stringify(data);
    
    //     async function makeRequest() {

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //               },
    //         }
        
    //         let res = await axios.post("https://hackverse3.herokuapp.com/predict/", data, config)
        
    //         console.log(res.data);
    //         estimate = res.data;
    //     }
        
    //     makeRequest();

    res.render("info", {
        estimate: query
    });
})

let city;


app.post("/info", function(req, res){

    if(!city) {
        city = "delhi";
    }
    city = req.body.city; 
    res.redirect("/hospitals")   
});


app.get("/hospitals", function(req, res){
    const {query} = req.query;


    let arr = []
    let idx = location.indexOf(city);
    let arr_in;
    for (let index = 0; index < 5; index++) {
        arr_in = Math.floor(Math.random()*10 + 2)+idx;
        if(!arr.includes(arr_in))
            arr.push( arr_in);
        else{
            index--;
        }       
    }

    res.render("hospitals", {
        arr_indices: arr,
        maps:maps,
        phoneNumbers:phoneNumbers,
        docName:docName,
        hospitalNames:hospitalNames,
        estimate:query
    });
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server in running on port 3000.");
});
