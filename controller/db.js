const bcrypt = require('bcryptjs');
// require mongoose and setup the Schema
const mongoose = require("mongoose");
const { hash } = require('bcrypt');
let Schema = mongoose.Schema;

// define the user schema
let userSchema = new Schema({
    f_name: String,
    l_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    employee: {
        type: Boolean,
        default: false
    }
});

let User;

const pass1 = encodeURIComponent("Jack14*sparrow");

// verify the db connection
module.exports.initialize = function(){
    return new Promise((resolve, reject)=>{
        const db = mongoose.createConnection(`mongodb+srv://psparrow:${pass1}@cluster0.gewhb.mongodb.net/assignment?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true });
        
        db.on('error', (err)=>{
            console.log("Error accured!");
            reject(err);
        });

        db.once('open', ()=>{
            //create a collection called "User"
            //use the above schemas for their layout
            User = db.model("users", userSchema);
            console.log("db1 success!");
            resolve();
          });
    });
}

module.exports.addUser = function(data){
    return new Promise((resolve,reject)=>{
        //prep the incoming data 

        //add data

        data.employee = (data.employee)? true: false;
        var newUser = new User(data);
        bcrypt.genSalt(10)
        .then(salt=>bcrypt.hash(newUser.password,salt))
        .then(hash=>{
            newUser.password = hash;

            newUser.save((err)=>{
                if (err){
                    console.log("There was an error while saving user data: "+err);
                    reject(err);
                }
                else{
                    console.log("Saved new user: "+data.email);
                    resolve();
                }
            });
        })
        .catch(err=>{
            console.log(err); // Show any errors that occurred during the process
            reject("Hashing Error");
        });
    });
}

module.exports.getUserByEmail = function(inEmail){
    return new Promise((resolve, reject) => {
        User.find({email: inEmail})
        .exec()
        .then((returnedEmail)=>{
            if(returnedEmail.length != 0)
                resolve(returnedEmail.map(item=>item.toObject()));
            else
                reject("This email do does not exist.");
        })
        .catch((err)=>{
            console.log("Error Retriving user: "+err);
            reject(err);
        });
    });
}

module.exports.checkPassword = (returnedUser) => {
    return new Promise((resolve, reject) => {
        if(returnedUser)
        {
            this.getUserByEmail(returnedUser.email)
            .then((userInput) => {
                bcrypt.compare(returnedUser.password, userInput[0].password)
                .then((result) => {
                    if(result)
                    {
                        resolve(userInput);
                    }

                    else
                    {
                        reject("Incorrect password.")
                    }
                });
            })
            .catch((err) => {
                reject(err);
                return;
            });
        }
    });
}

