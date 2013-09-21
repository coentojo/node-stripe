var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Event = require('../models/event.js');
var helper = require("../lib/helper.js");

var EventController = module.exports = {};

EventController.retrieve = function(req, res) {
  console.log("Retrieveing an invoice Item");
  Event.retrieve(req.body.event_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};


EventController.list = function(req, res) {
  console.log("Listing transfers");
  Event.list(req.body.list, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
