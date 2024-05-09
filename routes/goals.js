var express = require('express');
var router = express.Router();

let goals = [];

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  res.json(goals);
});

router.delete('/removeGoals/:id', function(req,res,next) {
  if(req.params && req.params.id){
    let id = req.params.id;
    tasks = tasks.filter(tasks => tasks.id !== id);
    res.json(goals);
  }else{
      res.status(400).json({});
  }
 
});


router.post('/addGoals', function(req, res, next){
    let timestamp = Date.now()+Math.random();
    if(req.body && req.body && req.body.name && req.body.description && req.body.dueDate){
      req.body.id = timestamp;
      tasks.push(req.body);
      res.json(tasks)
    }else{
      res.status(400).json({})
    }
});


module.exports = router;