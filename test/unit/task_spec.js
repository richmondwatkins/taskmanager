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
var testTsk2;
var testTsk3;

describe('Task', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      Task = traceur.require(__dirname + '/../../app/models/task.js');
      User = traceur.require(__dirname + '/../../app/models/user.js');
      done();
    });
  });// end before

  beforeEach(function(done){
     global.nss.db.collection('users').drop(function(){
       global.nss.db.collection('tasks').drop(function(){
         User.register({email:'sue@aol.com', password:'abcd'}, function(u){
          Task.create(u._id, {title:'New Task1', due:'10/06/1990', color:'#ffffff'}, function(tsk1){
            Task.create(u._id, {title:'New Task2', due:'10/06/1990', color:'#ffffff'}, function(tsk2){
              Task.create('6367f09420cc08b3f2e72aca', {title:'Not Sues Task', due:'10/06/1990', color:'#ffffff'}, function(tsk3){
                testTask = tsk1;
                testTsk2 = tsk2;
                testTsk3 = tsk3;
                sue = u;
                done();
              });
            });
          });
        });
      });
    });
  });//end beforeEach

  // individual tests go below this line.

  describe('#complete', function(){
    it('should change the tasks isComplete to true', function(){
      testTask.complete();
      expect(testTask.isComplete).to.equal(true);
    });
  });
//it worked! NICE JOB!!! are we starting back yer? I think we are getting ready to.ok, be there in a sec..sounds good
  describe('#save', function(){
    it('should save the Task', function(done){
      testTask.complete();
      testTask.save(function(){
        Task.findByTaskId(testTask._id, function(taskObj){
          expect(taskObj.isComplete).to.equal(true);
          done();
        });
      });
    });
  });

  describe('.findByUserId', function(){
    it('should find all task by user Id', function(done){
      Task.findByUserId(sue._id, function(taskList){
        expect(taskList.length).to.equal(2);
        expect(taskList[0].userId).to.deep.equal(sue._id);
        done();
      });
    });
  });// end describe '.findByUserId'

  describe('.findByTaskId', function(){
    it('should find a task by its id', function(done){
      Task.findByTaskId(testTask._id, function(taskObj){
        expect(taskObj).to.be.ok;
        expect(taskObj._id).to.deep.equal(testTask._id);
        done();
      });
    });
  });// end describe '.findByTaskId'

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
  });// end describe '.create'

  describe('#destroy', function(){
    it('should successfully delete a task by ID', function(done){
      Task.findByTaskId(testTask._id, function(taskObj){
        taskObj.destroy();
        Task.findByUserId(sue._id, function(taskList){
          expect(taskList.length).to.equal(1);
          done();
        });
      });
    });//end of it
  });// end describe '#destroy'

});//end describe "Task"
