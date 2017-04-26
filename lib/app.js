'use strict';

var express = require('express')
  , app = express()
  , modrain = require('raincatcher-modrain/lib/modrain')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , moment = require('moment');

//Adding a simple in-memory store.
require('./user-store');


app.use(cors());

//Using a body parser for JSON requests.
app.use(bodyParser.json());

//Mounting the tutorial module on the base route for the ExpressJS application
app.use('/', require('raincatcher-tutorial-module/lib/server')(modrain));


//Observing namespace handlers.

modrain.user.observe('create').subscribe(function(createdUser) {
  console.log({
    topic: 'User Created',
    time: moment(new Date()).toString(),
    createdUser: createdUser
  });
});

modrain.user.observe('list').subscribe(function(listOfUsers) {
  console.log({
    listOfUsers: listOfUsers,
    topic: 'Users Listed',
    time: moment(new Date()).toString()
  });
});

module.exports = app;
