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
    }// end static create

    static findByTaskId(id, func){
      if(typeof id === 'string'){
      if(id.length !== 24){func(null); return;}
          id = Mongo.ObjectID(id);
        }
      tasks.findOne({_id: id}, (error, result)=>{
        result = _.create(Task.prototype, result);
        func(result);
      });
    }// end findById

    static findByUserId(id, func){
      tasks.find({userId: id}).toArray((err, taskArray)=>{
        func(taskArray);
      });
    }// end static findByUserId

    complete(){
      this.isComplete = true;
    }

    destroy(fn){
      tasks.findAndRemove({_id: this._id}, ()=>{});
    }// end destroy

    save(func){
      tasks.save(this, (err, count)=>{
        func();
      });
    }
}//end class Task
module.exports = Task;
