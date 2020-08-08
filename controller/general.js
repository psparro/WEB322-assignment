const express = require('express')
const db = require("./db.js");
const router = express.Router();

const meals = require("../model/database.js");
const { Message } = require('twilio/lib/twiml/MessagingResponse');

router.get("/", (req, res)=>{
    res.render("home",{
        title: "FoodWay",
        data: meals.getAllmeals(),
        topmeals: meals.getTopmeals()
    });
});



router.get("/meals", (req, res)=>{
     res.render("meals",{
        title: "All Meals",
        subway: meals.getSubway(),
        burrito: meals.getBurritos(),
        tacos: meals.getTaco(),
        kfc: meals.getKFC() 
     });
 });

router.get("/register", (req,res)=>{
    res.render("register",{
        title: "Register",
    })
});

router.post("/register", (req,res)=>{
    const r_error = [];

    if(req.body.f_name == "")
    {
        r_error.push({fname: `This field must be filed.`})
    }

    if(req.body.l_name == "")
    {
        r_error.push({lname: `This field must be filled.`})
    }

    if(req.body.email == "")
    {
        r_error.push({emaile: `This field must be filled.`})
    }

    const exp =/^[a-zA-Z0-9._-]+@[a-z.-]+\.[a-z]{2-5}$/;
    if(req.body.email.match(exp)){
        r_error.push({emaile:"Enter a valid Email address."})
    } 

    if(req.body.password=="") {
        r_error.push({epassword:"Password can't be blank."})
    } 
    
    else if(req.body.password.length < 6 || req.body.password.length > 12) {
        r_error.push({epassword:"Password Must be 6 to 12 char long"})
    }

    if(r_error.length > 0) {
        res.render("register",{
            title: "sign up",
            errorMessages: r_error
        })
    }

    else{
        db.addUser(req.body).then(()=>{
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs

        const {f_name, l_name, email} = req.body

        const sgMail = require('@sendgrid/mail');

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const html = `<bold><h2>Hello ${f_name} ${l_name}</h2></bold>
        <br>
        <h2>You are signed up.          
        <br>
        Regards<br>
        Parth Patel<br>
        CEO FoodWay
        </h2>
        `;

        const msg = {
          to: `${email}`,
          from: 'pp944850@gmail.com',
          subject: 'Welcome to FoodWay!',
          html: html,
        };
        sgMail.send(msg)
        .then(() => {
            res.redirect("dashboard");
        })
        .catch(err => {
            console.log(`Error while post: ${err}`);
        });
        })
        .catch((err)=>{
            console.log("Error adding user from post: "+ err);
            res.render("register", {
                title: "Register",
                sameEmailError: "This email has been used."
            });
        })
    } 
});

router.get("/dashboard", (req,res)=>{
    res.render("dashboard",{
        title: "dashboard",
    })
});

router.get("/Employee-Dashboard", (req, res) => {
    res.render("empDashboard", {
        title: "Dashboard"
    });
});
 
module.exports = router