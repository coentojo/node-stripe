var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Recipient = require('../models/recipient.js');
var helper = require("../lib/helper.js");

var RecipientController = module.exports = {};


RecipientController.create = function(req, res){
  console.log("Creating a recipient");
  Recipient.create(req.body.recipient, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

RecipientController.retrieve = function(req, res) {
  console.log("Retrieveing a recipient");
  Recipient.retrieve(req.body.recipient_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

RecipientController.update = function(req, res) {
  console.log("Updating a Recipient");
  Recipient.update(req.body.recipient_id, req.body.recipient, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

RecipientController.del = function(req, res) {
  console.log("Deleting a Recipient");
  Recipient.del(req.body.recipient_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

RecipientController.list = function(req, res) {
  console.log("Retrieving all Recipients");
  Recipient.list(req.body.list, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};