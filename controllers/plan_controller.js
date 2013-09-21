var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Plan = require('../models/plan.js');
var helper = require("../lib/helper.js");

var PlanController = module.exports = {};


PlanController.create = function(req, res){
  console.log("Creating a plan");
  Plan.create(req.body, function(error, response, body){
    if(body.error) {
      helper.respondError(req, res, 400, body);
    } else {
      helper.respondJson(req, res, 200, body);
    }
  });
};

PlanController.retrieve = function(req, res) {
  console.log("Retrieveing a plan");
  Plan.retrieve(req.body.plan_id, function(error, response, body){
    // do stuff here - check for errors
    helper.respondJson(req, res, 200, body);
  });
};

PlanController.update = function(req, res) {
  console.log("Updating a plan");
  Plan.update(req.body.plan_id, req.body.plan, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

PlanController.del = function(req, res) {
  console.log("Deleting a plan");
  Plan.del(req.body.plan_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

PlanController.list = function(req, res) {
  console.log("Retrieving all plans");
  Plan.list(req.body.plan, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};