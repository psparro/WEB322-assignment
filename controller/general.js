const express = require('express')
const router = express.Router();

const meals = require("../model/database.js");

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

 router.get("/log-in", (req,res)=>{
    res.render("login",{
        title: "log in",
    })
});

router.post('/log-in',(req,res)=>{

   const errors = [];
   
   if(req.body.username == ""){
     errors.push({u_error: "You must enter Username"});
   }
   if(req.body.password==""){
       errors.push({p_error: "You must enter a password"});
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

      /* const accountSid = 'AC028b8838a4be042691df69f2def34155';
       const authToken = 'f7ad602aa1539094d3dd60e729189559';
       const client = require('twilio')(accountSid, authToken);

   client.messages
   .create({
       body: `${req.body.password}`,
       from: '+12085476732',
       to: `${req.body.username}`
  })
   .then(message => 
       
       console.log(message.sid));*/

       res.redirect("/dashboard")
   }
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
        r_error.push({epassword:"Password can't be blank ."})
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
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs

        const {f_name, l_name, email} = req.body

        const sgMail = require('@sendgrid/mail');

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
          to: `${email}`,
          from: 'pp944850@gmail.com',
          subject: 'Welcome to FoodWay!',
          html: `<bold><h2>Hello ${f_name} ${l_name}</h2></bold>
          <br>
          <h2>You are signed up.          
          <br>
          Regards<br>
          Parth Patel<br>
          CEO FoodWay
          </h2>
          `,
        };
        sgMail.send(msg)
        .then(() => {
            res.redirect("dashboard");
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
    }   
});

router.get("/dashboard", (req,res)=>{
    res.render("dashboard",{
        title: "dashboard",
    })
});
 
module.exports = router