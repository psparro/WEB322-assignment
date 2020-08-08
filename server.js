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
const dashboardController = require("./controller/dashboard");
const generalController = require("./controller/general");
const userController = require("./controller/user");

//map each controller to the app object
app.use("/", generalController);
app.use("/db", dashboardController);
app.use("/user", userController);

//set up a server
const PORT = process.env.PORT;

app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "dashboard_secret", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
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

app.post('/log-in',(req,res)=>{
    // const errors = [];
    //     if(req.body.username == ""){
    //         errors.push({u_error: "You must enter Username"});
    //       }
    //       if(req.body.password==""){
    //           errors.push({p_error: "You must enter a password"});
    //       }
       
    //       //if user failed validation
    //       if(errors.length > 0)
    //       {
    //           res.render("login",{
    //               title: "log in",
    //               errorMessages: errors
    //           })
    //       }
       
    //       else{
    //           res.redirect("/dashboard")
    //       }

    db.checkPassword(req.body)
    .then((inData) => {

        console.log(inData[0]);

        //if(inData[0].employee)
        //{
            res.render("/Employee-Dashboard", {
                title: "Dashboard"
            });
        //}

       // else{
        //    res.redirect("/dashboard");
       // }
    })
    .catch((err) => {
        console.log(err);
        res.render("login", {
            title: "log in",
            loginError: "No match found."
        });
    });
    
});



//check if database is working or not
db.initialize()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Web server is up and running!!!")
    });
})