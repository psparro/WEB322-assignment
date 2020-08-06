const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const meals = require("./model/database.js");
// const config = require('./config');
// var nodemailer = require('nodemailer');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json())

//this tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res)=>{
    res.render("home",{
        title: "FoodWay",
        data: meals.getAllmeals(),
        topmeals: meals.getTopmeals()
    });
});



 app.get("/meals", (req, res)=>{
     res.render("meals",{
        title: "All Meals",
        subway: meals.getSubway(),
        burrito: meals.getBurritos(),
        tacos: meals.getTaco(),
        kfc: meals.getKFC() 
     });
 });

 app.get("/log-in", (req,res)=>{
     res.render("login",{
         title: "log in",
     })
 });

 app.post('/log-in',(req,res)=>{
    //console.log(req.body)

    const errors = [];
    
    
    if(req.body.username == ""){
      errors.push("You must enter Username");
    }
    if(req.body.password==""){
        errors.push("You must enter a password");
    }

    //if user failed validation
    if(errors.length > 0)
    {
        res.render("login",{
            title: "log in",
            errorMessages: errors
        })
    }

    else{

        const accountSid = 'AC028b8838a4be042691df69f2def34155';
        const authToken = 'f7ad602aa1539094d3dd60e729189559';
        const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: `${req.body.password}`,
        from: '+12085476732',
        to: `${req.body.username}`
   })
    .then(message => 
        
        console.log(message.sid));

        res.redirect("/dashboard")
    }
});

 app.get("/register", (req,res)=>{
    res.render("register",{
        title: "Register",
    })
});

app.get("/dashboard", (req,res)=>{
    res.render("dashboard",{
        title: "dashboard",
    })
});


const port = 3000;
app.listen(port, ()=>{
    console.log("Web server is up and running!!!")
});