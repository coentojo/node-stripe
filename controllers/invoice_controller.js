var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Invoice = require('../models/invoice.js');
var helper = require("../lib/helper.js");

var InvoiceController = module.exports = {};

InvoiceController.retrieve = function(req, res) {
  console.log("Retrieveing a Invoice");
  Invoice.retrieve(req.body.invoice_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.retrieveLineItems = function(req, res) {
  console.log("Retrieveing invoice line items");
  Invoice.retrieve(req.body.invoice_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.create = function(req, res) {
  console.log("Creating invoice");
  Invoice.create(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.pay = function(req, res) {
  console.log("Paying invoice");
  Invoice.pay(req.body.invoice_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.update = function(req, res) {
  console.log("Updating invoice");
  Invoice.update(req.body.invoice_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.list = function(req, res) {
  console.log("Retrieving all Invoices");
  Invoice.list(req.body.invoice, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

InvoiceController.upcomingInvoice = function(req, res) {
  console.log("Retrieving upcoming invoices");
  Invoice.upcoming(req.body.customer_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
