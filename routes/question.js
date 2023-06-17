const router=require('express').Router();


const questionController=require('../controller/question_controller');

router.post('/create',questionController.create);//this is for creating a new question

router.post('/:id/options/create',questionController.createOption);//for creating a option

router.delete('/:id/delete',questionController.delete);


router.get('/:id',questionController.getQuestionById);

module.exports=router; // Exporting router object