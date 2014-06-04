'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../../app/models/user.js');
var Task = traceur.require(__dirname + '/../../app/models/task.js');

exports.register = (req, res)=>{
  User.register(req.body, user=>{
    res.render('users/index', {user: user});
  });

};

exports.login = (req, res)=>{

  User.login(req.body, user=>{
    Task.findByUserId(user._id, tasks=>{
      console.log(tasks);
      res.render('users/index', {user: user, tasks: tasks});
    });
  });
};


//  exports.lookup = (req, res, next)=>{
//    User.findById(req.session.userId, u=>{
//      res.locals.user = u;
//      next();
//    });
// };
