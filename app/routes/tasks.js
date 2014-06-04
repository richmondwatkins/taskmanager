'use strict';

var traceur = require('traceur');
var Task = traceur.require(__dirname + '/../../app/models/task.js');



exports.create = (req, res)=>{

  console.log(req.body);
  Task.create(req.params.userId, req.body, task=>{
    res.render('tasks/index', {task: task});
  });

};

// exports.index = (req, res)=>{
//   Group.findAll(groups=>{
//     User.findByUserId(req.session.userId, user=>{
//       Group.isOwner(req.session.userId, usersGroups=>{
//         console.log(usersGroups);
//
//       res.render('groups/index', {user: user, groups: groups, usersGroups: usersGroups });
//       });
//     });
//   });
// };
