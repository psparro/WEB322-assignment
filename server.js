const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require("./controller/db.js");
const clientSessions = require("client-sessions");

//load environment variable file
require('dotenv').config({path:"./config/keys.env"});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json())

//this tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: true }))

//load controllers
const generalController = require("./controller/general");

//mapping controller to the app object
app.use("/", generalController);

//set up a server
const PORT = process.env.PORT;

app.use(clientSessions({
    cookieName: "session", 
    secret: "dashboard_secret", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 
  }));

  function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    } else {
      next();
    }
  }

app.get("/log-in", (req,res)=>{
    res.render("login",{
        title: "log in",
    })
});

// checking if the user is authenticated
function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    } else {
      next();
    }
  };

  function ensureEmployee(req, res, next) {
    if (!req.session.user || !req.session.user.employee) {
      res.redirect("/log-in");
    } else {
      next();
    }
  };

app.post('/log-in',(req,res)=>{
    db.checkPassword(req.body)
    .then((inData) => {
        req.session.user = inData[0];  //logs them in as a user
    
        console.log(req.session.user);

        if(inData[0].employee)
        {
            res.render("empDashboard",{
                title: "Dashboard",
                data: req.session.user
            });
        }

        else{
            res.render("dashboard",{
                title: "dashboard",
                data: req.session.user
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.render("login", {
            title: "log in",
            loginError: "No match found."
        });
    }); 
});

app.get("/dashboard", ensureLogin, (req,res)=>{
    res.render("dashboard",{
        title: "dashboard",
        data: req.session.user
    })
});

app.get("/Employee-Dashboard", ensureLogin, ensureEmployee, (req, res) => {
    res.render("empDashboard", {
        title: "Dashboard",
        data: req.session.user
    });
});

app.get("/logout",(req,res)=>{
    req.session.reset();
    res.redirect("/log-in");
  });

//check if database is working or not
db.initialize()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Web server is up and running!!!")
    });
})