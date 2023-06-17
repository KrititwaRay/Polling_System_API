const express=require('express');
const app=express();
const port=8000;
const mongoose=require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded());

//required the routes from the routes module using the '/' path by default it will go to index.js
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log(`Server is running on port : ${port}`);
})