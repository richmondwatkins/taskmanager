/* global describe, it,  beforeEach, before */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'todo-test';

var assert = require('chai').assert;
var expect = require('chai').expect;
var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');

var Task;
var User;
var sue = '5367f09420cc08b3f2e72aca';
var testTask;

describe('Task', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      Task = traceur.require(__dirname + '/../../app/models/task.js');
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){

     global.nss.db.collection('users').drop(function(){
       global.nss.db.collection('tasks').drop(function(){
         User.register({email:'sue@aol.com', password:'abcd'}, function(u){
          Task.create(sue._id, {title:'New Task', due:'10/06/1990', color:'#ffffff'}, function(tsk){
            testTask = tsk;
            sue = u;
            done();
          });
        });
      });
    });
  });

  describe('.findByTaskId', function(){
    it('should find a task by its id', function(done){
      //console.log(testTask);
      Task.findByTaskId(testTask._id, function(taskObj){
      //  console.log(taskObj);
        expect(taskObj).to.be.ok;
        //expect(taskObj).to.deep.equal({title:'New Task', due:'10/06/1990', color:'#ffffff', isComplete: false, userId: sue._id});
        expect(taskObj._id).to.deep.equal(testTask._id);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a task', function(done){
      Task.create(sue._id, {title:'New Task', due:'10/06/1990', color:'#ffffff'}, function(task){
        assert.isString(task.title, task.color);
        assert.isNotString(task.date, sue._id);
        expect(task).to.be.an.instanceof(Task);
        expect(task._id).to.be.an.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

});
