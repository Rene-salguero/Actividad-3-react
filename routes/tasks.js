var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../app');

const taskInit = mongoose.model('tasks',{
    name:String,
    description:String,
    dueDate:String
}, 'tasks');



let tasks = [{
    'id':'1',
    'name':'HACER FUNCIONAR EL BACKEND',
    'description':'me costo un monton',
    'dueDate': '10-05-2024'
}];

router.get('/getTasks', function(req, res, next){
    
    taskInit.find({}).then((response)=> 
        res.status(200).json(response)
    ).catch((err)=>res.status(500).json(err));
});

router.post('/addTasks', function(req, res, next){
   
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
       
       tasks.push(req.body);

       const task = new taskInit(req.body);
       task.save().then(() =>
            res.status(200).json({})
       ).catch((err) =>res.status(500).json(err));
        
    }else{
        res.status(400).json({error: "Faltan parametros necesarios ( name, description , dueDate)"});
    }
    
})


router.delete('/removeTask/:id', function(req, res, next){
   
    if (req.params && req.params.id) {
        let id = req.params.id;
        taskInit.deleteOne({_id: new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json(response);
        }).catch(err=>res.status(500).json(err));

    }else {
        res.status(400).json({error: "ID no esta enviando "});
    }
})

module.exports = router;