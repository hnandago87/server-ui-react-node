const express = require('express');

const projectManagement = express.Router();

projectManagement.get('/', (req,res,next)=>{
    res.send({"title":"welcome to project management"});
})
