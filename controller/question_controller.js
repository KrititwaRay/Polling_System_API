const Question=require('../models/questionsSchema');
const Option=require('../models/optionSchema');

// CREATE A QUESTION
module.exports.create=async (req,res)=>{
    try {
     // Create a new question with the title from the request body
        let question=await Question.create({
            title:req.body.title,
        })
        //success message
        return res.status(200).json({
            message:"Question Created",
            question:question
        })

    } catch (error) {
     console.log(error)
    // Return error response for any server errors
    return res.status(500).json({
        status:false,
        message: 'Internal server error'
    })
    }
}
//CREATING OPTION  for question
module.exports.createOption=async(req,res)=>{

    let question;
    try {
        question=await Question.findById(req.params.id);//finding the question
      
      
        if(!question){
            return res.status(404).json({ error:"Can not find Question"});
        }
        if(question){
            //if question present then create option
            let option=await Option.create({ text:req.body.text }).catch((err)=>console.log(err));
         
            option.link_to_vote=`http://localhost:8000/options/${option._id}/add_vote`;
            option.save();
            
            //push option id to question's options array
            question.options.push(option); //or option._id;

            question.save(); // save the changes
            return res.status(200).json(option);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        error: 'Internal server error'
      })
    }
}

//TO DELETE A PARTICULAR QUESTION
module.exports.delete=async(req,res)=>{

    

    try {
        // finding the queston to delete and populating because to remove options from its array
       let question=await Question.findById(req.params.id).populate('options');

        if(!question){
            //if question is not there then return  message
            return res.status(404).json({message:"Question not found"});
        }
         
          // Check if any option in the question has votes
            for (let i = 0; i < question.options.length; i++) {
                if (question.options[i].votes >= 1) {
                return res.status(403).json({ error: 'Cannot delete this question as it has votes' });
                }
      }
       
          //delete all the options of question
          await Option.deleteMany({ _id: { $in: question.options } });
            //delete the question
           await Question.findByIdAndDelete(req.params.id);

         return res.status(200).json({message:'Question and Options deleted successfully',question});

        
    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: 'Internal server error' });

    }
}

//GET QUESTION BY ID
module.exports.getQuestionById=async(req,res)=>{

    try {
        let question=await Question.findById(req.params.id).populate('options');
         if(question){
            return res.status(200).json({
                question
            })
         } else{
            return res.status(200).json({
                message:"Question not found"
            })
         }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


