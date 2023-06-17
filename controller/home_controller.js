const Question=require('../models/questionsSchema');

module.exports.home=async(req,res)=>{

    try {
         // Find all questions and populate their options
        let questions=await Question.find({}).populate('options');
        if(!questions){
            return res.status(404).json({message:"No data available"});
        }
        return res.status(200).json(questions);
    } catch (error) {
        console.log(error);
        return res.status(500).josn({
            status:false,
            message:"Internal Server Error"
        })
    }
}