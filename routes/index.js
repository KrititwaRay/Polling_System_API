const express=require('express');
const router=express.Router();

const homeController=require('../controller/home_controller');


 // Setting up route for home page
router.get('/',homeController.home);

router.use('/questions',require('./question'));
router.use('/options',require('./option'));
module.exports=router; // Exporting router object