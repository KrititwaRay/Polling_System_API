const mongoose=require('mongoose');

//creating question schema
const questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    options:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Option"
    }]
 },{
    timestamps:true
 })
// Create a model based on the question schema
 const Question=mongoose.model('Question',questionSchema);

 // Export the Question model so that it can be used in other parts of the application
 module.exports = Question;