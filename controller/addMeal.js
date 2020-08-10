// require mongoose and setup the Schema
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

// define the meal package schema
let mealSchema = new Schema({
    item: {
        type: String,
        required:true
    },
    discription: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    foodNo: {
        type: Number,
        required:true
    },
    topmeal: {
        type: Boolean,
        default: false,
        required: true
    },
    restaurent: {
        type: String,
        required:true
    }
});

let meals;

const pass1 = encodeURIComponent("Jack14*sparrow");

// verify the db connection
module.exports.initializeMealDB = function(){
    return new Promise((resolve, reject)=>{
        const mdb = mongoose.createConnection(`mongodb+srv://psparrow:${pass1}@cluster0.gewhb.mongodb.net/assignment?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true });
        
        mdb.on('error', (err)=>{
            console.log("Error accured!");
            reject(err);
        });

        mdb.once('open', ()=>{
            meals = mdb.model("meals", mealSchema);
            console.log("db2 success!");
            resolve();
          });
    });
}

module.exports.addMeal = function(data){
    return new Promise((resolve, reject) => {
        data.topmeal = (data.topmeal)? true: false;
        let newMeal = new meals(data);
        
        newMeal.save((err) => {
            if(err){
                console.log("There was an error while saving meal details.");
                reject(err);
            }

            else{
                console.log("Saved new meal: " + data.item);
                resolve();
            }
        })
    })
}

module.exports.fatchMeals = function(){
    return new Promise((resolve, reject) => {
        meals.find({item: inItem})
        .exec()
        .then((returnedItem) => {
            if(returnedItem.length != 0)
            {
                resolve(returnedItem.map(item=>item.toObject()));
            }
            else
            {
                reject("Item not found!" + err);
            }
        })
        .catch((err) => {
            reject("Error occured!" + err);
        });
    });
}

module.exports.allMeals = function(){
    return new Promise((resolve, reject) => {
        meals.find()
        .exec()
        .then((returnedItem) => {
                resolve(returnedItem.map(item=>item.toObject()));
        })
        .catch((err) => {
            reject("Error occured!" + err);
        });
    });
}

module.exports.editMeal = (editM) => {
    return new Promise((resolve, reject) => {
        editM.topmeal = (editM.topmeal)? true: false;

        meals.updateOne(
            {item: editM.item},
            {$set: {
                discription: editM.item,
                price: editM.price,
                foodNo: editM.foodNo,
                topmeal: editM.topmeal
            }})
            .exec()
            .then(() => {
                console.log("Meal updated: " + editM.item);
                resolve();
            })
            .catch((err) => {
                reject(err);
                console.log("Failed to update meal.")
            });
    });
}

module.exports.deleteMeal = (deleteM) => {
    return new Promise((resolve, reject) => {
        meals.deleteOne({item: deleteM})
        .exec()
        .then(() => {
            resolve(deleteM.item + " was deleted.");
        })
        .catch((err) => {
            reject("Item wasn't deleted!" + errr);
        })
    })
}