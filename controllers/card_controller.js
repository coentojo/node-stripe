var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Card = require('../models/card.js');
var helper = require("../lib/helper.js");

var CardController = module.exports = {};


CardController.create = function(req, res){
  console.log("Creating a card");
  Card.create(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CardController.retrieve = function(req, res) {
  console.log("Retrieveing a card");
  Card.retrieve(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CardController.update = function(req, res) {
  console.log("Updating a card");
  Card.update(req.body, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

CardController.del = function(req, res) {
  console.log("Deleting a card");
  Card.del(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CardController.list = function(req, res) {
  console.log("Retrieving all cards");
  Card.list(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};