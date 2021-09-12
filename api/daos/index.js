var Mongoose = require('mongoose'), cfg = require('../config');
Mongoose.Promise = require('bluebird');
//const winston = require('../config/winston');
var Connection = Mongoose.connection;
var model = require('./models');
// var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');


var db = Mongoose.connect(
  cfg.mongo.uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () => {
    //  winston.info('connection with database succeeded');
        console.log("connection with database succeeded");
    }
  )
  .catch(
    err => console.log(err)
  );

Mongoose.set('debug', true);

exports.checkIfExists = function (query, collectionName) {

  return new Promise(function (resolve, reject) {
    var coll = model.getModel(collectionName);
    coll.findOne(query, function (err, results) {
      if (err)
        reject(err)
      else
        resolve(results)
    })
  })
}

exports.insert = function (doc, collectionName) {

  return new Promise(function (resolve, reject) {
    Connection.collection(collectionName).insertOne(doc).then(
      function (obj) {
        resolve(obj);
      }
    ).catch(function (err) {
      reject(err);
    });
  })
}