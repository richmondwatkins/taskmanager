var tasks = global.nss.db.collection('tasks');
var Mongo = require('mongodb');
var _ = require('lodash');

class Task{
    static create(id, obj, func){
      var task = new Task();
      task.title = obj.title;
      task.due = new Date(obj.due);
      task.color = obj.color;
      task.isComplete = false;
      if(typeof id === 'string'){
        id = Mongo.ObjectID(id);
        task.userId = id;
      }else{
        task.userId = id;

      }
      tasks.save(task, ()=>{
        func(task);
      });
    }

    static findByTaskId(id, func){

      // if(id.length !== 24){func(null); return;}
        if(typeof id === 'string'){
          console.log(id);
          id = Mongo.ObjectID(id);
        }
        console.log(id);
      tasks.findOne({_id: id}, (error, result)=>{
        result = _.create(Task.prototype, result);
        func(result);
      });
    }// end findById
}
//   static register(obj, fn){
//     users.findOne({email:obj.email}, (e,u)=>{
//       if(u){
//         fn(null);
//       }else{
//         var user = new User();
//         user.email = obj.email;
//         user.password = bcrypt.hashSync(obj.password, 8);
//         users.save(user, ()=>fn(user));
//       }
//     });
//   }
//
//   static login(obj, fn){
//     users.findOne({email:obj.email}, (e,u)=>{
//       if(u){
//         var isMatch = bcrypt.compareSync(obj.password, u.password);
//         if(isMatch){
//           fn(u);
//         }else{
//           fn(null);
//         }
//       }else{
//         fn(null);
//       }
//     });
//   }
//
//   static findById(id, func){
//     if(id.length !== 24){func(null); return;}
//     id = Mongo.ObjectID(id);
//     users.findOne({_id: id}, (error, result)=>{
//       result = _.create(User.prototype, result);
//       func(result);
//     });
//   }// end findById
//
// }

module.exports = Task;
