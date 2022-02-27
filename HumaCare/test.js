const axios = require('axios');
// import fetch from "node-fetch


const data = {
    "age": 32, 
    "sex": 0, 
    "bmi": 23,
    "children": 1,
    "smoker": 1  
}
// const fetch = require("node-fetch");


// var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//          if (this.readyState == 4 && this.status == 200) {
//              alert(this.responseText);
//          }
//     };
//     xhttp.open("POST", "https://hackverse3.herokuapp.com/predict/", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send(data);

//     console.log();

//     const url = "https://hackverse3.herokuapp.com/predict/";
// fetch(url, {
//   method: 'post', // Default is 'get'
//   body: JSON.stringify(data),
//   mode: 'cors',
//   headers: new Headers({
//     'Content-Type': 'application/json'
//   })
// })
// .then(response => response.json())
// .then(json => console.log('Response', json))

// const axios = require('axios');

// const json = JSON.stringify({ answer: 42 });
// const res = await axios.post('https://httpbin.org/post', json, {
//   headers: {
//     // Overwrite Axios's automatically set Content-Type
//     'Content-Type': 'application/json'
//   }
// });

async function makeRequest() {

    const config = {
        headers: {
            'Content-Type': 'application/json'
          },
    }

    let res = await axios.post("https://hackverse3.herokuapp.com/predict/", data, config)

    console.log(res.data);
}

makeRequest();


