var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Transfer = require('../models/transfer.js');
var helper = require("../lib/helper.js");

var TransferController = module.exports = {};

TransferController.create = function(req, res) {
  console.log("Creating a transfer object");
  Transfer.create(req.body.transfer, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

TransferController.retrieve = function(req, res) {
  console.log("Retrieveing an invoice Item");
  Transfer.retrieve(req.body.transfer_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

TransferController.cancel = function(req, res) {
  console.log("Canceling a Transfer");
  Transfer.cancel(req.body.transfer_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

TransferController.list = function(req, res) {
  console.log("Listing transfers");
  Transfer.list(req.body.transfer, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
