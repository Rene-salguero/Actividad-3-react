var express = require('express');
var router = express.Router();

let tasks = [{
    'id':'1',
    'name':'HACER FUNCIONAR EL BACKEND',
    'description':'me costo un monton',
    'dueDate': '10-05-2024'
}];

router.get('/getTasks', function(req, res, next){
    res.json(tasks);
})

router.post('/addTasks', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
       tasks.push(req.body);
       res.status(200).json(tasks); 
    }else{
        res.status(400).json({error: "Faltan parametros necesarios ( name, description , dueDate)"});
    }
    res.json(tasks);
})


router.delete('/removeTask/:id', function(req, res, next){
    console.log(req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        tasks = tasks.filter(tasks => tasks.id !== id);
        res.status(200).json(tasks);

    }else {
        res.status(400).json({error: "ID no esta enviando "});
    }
})

module.exports = router;