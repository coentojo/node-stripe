var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Balance = require('../models/balance.js');
var helper = require("../lib/helper.js");

var BalanceController = module.exports = {};

BalanceController.retrieve = function(req, res) {
  console.log("Retrieveing a balance");
  Balance.retrieve(function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

BalanceController.retrieveTransaction = function(req, res) {
  console.log("Retrieving a balance transaction");
  Balance.retrieveTransaction(req.body.transaction_id, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};


BalanceController.list = function(req, res) {
  console.log("Listing balance history");
  Balance.list(req.body.list, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};