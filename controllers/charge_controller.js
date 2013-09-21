var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Charge = require('../models/charge.js');
var helper = require("../lib/helper.js");

var ChargeController = module.exports = {};

ChargeController.create = function(req, res){
  console.log("Creating a charge");

  Charge.create(req.body.charge, req.body.access_token, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

ChargeController.retrieve = function(req, res){
  console.log("Retrieving a charge");
  var data = helper.getDataFromQuery(req);
  Charge.retrieve(data.id, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

ChargeController.refund = function(req, res) {
  console.log("Refunding a charge");
  var data = helper.getDataFromQuery(req);
  console.log(data);
  Charge.refund(data.id, data.amount, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

ChargeController.capture = function(req, res) {
  console.log("Capturing a charge");
  var data = helper.getDataFromQuery(req);
  console.log(data);
  Charge.capture(data.id, data.amount, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

// POST - all others are GET
ChargeController.list = function(req, res) {
  console.log("Listing all charges");
  var data = helper.getDataFromQuery(req) || req.body;
  console.log(data);

  Charge.listAll(data.count, data.customer, data.offset, function(error, response, body) {
    var code = helper.statusCode(body);
    helper.respondJson(req, res, code, body);
  });
};

ChargeController.updateDispute = function(req, res) {
  console.log("Updating a dispute");
  Charge.updateDispute(req.body.dispute, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};


