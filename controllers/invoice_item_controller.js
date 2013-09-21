var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var InvoiceItem = require('../models/invoice_item.js');
var helper = require("../lib/helper.js");

var InvoiceItemController = module.exports = {};

InvoiceItemController.create = function(req, res) {
  console.log("Creating an invoice item");
  InvoiceItem.create(req.body.invoice, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceItemController.retrieve = function(req, res) {
  console.log("Retrieveing an invoice Item");
  InvoiceItem.retrieve(req.body.invoice_item_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceItemController.update = function(req, res) {
  console.log("Updating an invoice Item");
  InvoiceItem.update(req.body.invoice_item_id, req.body.invoiceitem, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceItemController.del = function(req, res) {
  console.log("Deleting an invoice Item");
  InvoiceItem.del(req.body.invoice_item_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceItemController.list = function(req, res) {
  console.log("Listing invoice Items");
  InvoiceItem.list(req.body.invoiceitem, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
