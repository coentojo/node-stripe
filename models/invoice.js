var request = require('request');
var Invoice = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Invoice.apiUrl = Stripe.apiUrl + "/invoices";

// Invoice Retrieve - DONE - https://stripe.com/docs/api#retrieve_invoice
// invoice_id: Stripe Invoice Id
Invoice.retrieve = function(invoice_id, callback) {
  var url = Invoice.apiUrl + "/" + invoice_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice retrieve line items - DONE - https://stripe.com/docs/api#invoice_lines
// invoice_id: Stripe Invoice Id
Invoice.retrieveLineItems = function(invoice_id, callback) {
  var url = Invoice.apiUrl + "/" + invoice_id + "/lines";
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice create - DONE - https://stripe.com/docs/api#create_invoice
// data = {
//   customer: Stripe Customer Id
// }
Invoice.create = function(data, callback) {
  var url = Invoice.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice pay - DONE - https://stripe.com/docs/api#pay_invoice
// invoice_id: 
Invoice.pay = function(invoice_id, callback) {
  var url = Invoice.apiUrl + "/" + invoice_id + "/pay";
  var options = helper.requestOptions("POST", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice update - DONE - https://stripe.com/docs/api#update_invoice
// invoice_id: 
Invoice.update = function(invoice_id, callback) {
  var url = Invoice.apiUrl + "/" + invoice_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice List - DONE - https://stripe.com/docs/api#list_customer_invoices
// data = {
//   count: defaults to 10
//   offset: defaults to 0
//   customer:
//   date: 
// }
Invoice.list = function(data, callback) {
  var url = Invoice.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Invoice upcoming - DONE - https://stripe.com/docs/api#retrieve_customer_invoice
// customer_id:
Invoice.upcoming = function(customer_id, callback) {
  var url = Invoice.apiUrl + "/upcoming?customer=" + customer_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });

};




