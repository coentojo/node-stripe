var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Token = require('../models/token.js');
var helper = require("../lib/helper.js");

var TokenController = module.exports = {};

TokenController.create = function(req, res) {
  console.log("Creating a card/bank token");
  Token.create(req.body.tokenInfo, req.body.access_token, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};


TokenController.retrieve = function(req, res) {
  console.log("Retrieving token obj");
  Token.retrieve(req.body.token_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
