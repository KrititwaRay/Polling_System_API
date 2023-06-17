// Importing the Mongoose 
const mongoose = require('mongoose');

// //creating option schema
const optionSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    votes:{
        type: Number,
        default: 0,
    },
    link_to_vote: {
        type: String,
      }
},{timestamps:true});

// Creating a new model based on the schema
const Option = mongoose.model("Option", optionSchema);

// Exporting the model for use in other modules
module.exports = Option;