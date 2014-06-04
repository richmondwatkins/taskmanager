'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var tasks = traceur.require(__dirname + '/../routes/tasks.js');

  // app.all('*', users.lookup);
  app.get('/', dbg, home.index);

  app.post('/taskmanager/register', dbg, users.register);
  app.post('/taskmanager/login', dbg, users.login);

  app.get('/tasks/index', dbg, tasks.index);
  app.post('/taskmanager/:userId/createtask', dbg, tasks.create);

  console.log('Routes Loaded');
  fn();
}
