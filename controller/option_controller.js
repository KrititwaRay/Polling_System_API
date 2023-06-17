const Option=require('../models/optionSchema');
const Question=require('../models/questionsSchema');

//DELETE OPTION
module.exports.delete=async(req,res)=>{

    try {

        let option=await Option.findById(req.params.id);
        
        if(option){

            if(option.votes<1){
                //if no vote is there for the option then delete
                let question = await Question.findOne({ options: { $elemMatch: { $eq: req.params.id } } });
                if(question){
                  // Delete the option and remove it from the question's options array
                  await Option.findByIdAndDelete(req.params.id);
                  await Question.updateOne({ _id: question._id }, { $pull: { options: { $in: req.params.id } } });

                  return res.status(200).json({ message: "Option deleted successfully", data: option });

                }
            } else {
                // If the option has votes, return an error
                return res.status(403).json({
                  error: 'Option votes are given, cannot delete it'
                })
              }
        }else {
            // If the option doesn't exist, return an error
            return res.status(404).json({
              error: 'Cannot find option'
            })
          }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          error: 'Internal server error'
        })
    }
}



//ADD VOTE TO AN OPTION
module.exports.addVote=async(req,res)=>{


    try {
        let option=await Option.findById(req.params.id);
        if(option){
         // Increment the votes count for the option and save it
         option.votes += 1;
         option.save();
         return res.status(200).json({ message: "Vote added to option", data: option });

        }else {
            // If the option doesn't exist, return an error
            return res.status(404).json({
              error: 'Option not found'
            })
          }
    } catch (error) {
     console.log(error)
    return res.status(500).json({
      error: 'Internal server error'
    })
    }
}