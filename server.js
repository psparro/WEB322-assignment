const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//load environment variable file
require('dotenv').config({path:"./config/keys.env"});

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json())

//this tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false }))

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
app.listen(PORT, ()=>{
    console.log("Web server is up and running!!!")
});