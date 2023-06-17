const router=require('express').Router();

const optionController=require('../controller/option_controller');

router.delete('/:id/delete',optionController.delete);// Delete an option with the given ID

router.get('/:id/add_vote', optionController.addVote); // Add a vote to an option with the given ID



module.exports=router;