var request = require('request');
var InvoiceItem = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

InvoiceItem.apiUrl = Stripe.apiUrl + "/invoiceitems";


// Invoice Item Create - DONE - https://stripe.com/docs/api#create_invoiceitem
// data = {
//   customer: Stripe Customer Id
//   amount:
//   currency:
//   invoice: optional - if blank will be added to next scheduled invoice
// }
InvoiceItem.create = function(data, callback) {
  var url = InvoiceItem.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice Item Retrieve - DONE - https://stripe.com/docs/api#retrieve_invoiceitem
// invoice_item_id: Stripe Invoice Item Id
InvoiceItem.retrieve = function(invoice_item_id, callback) {
  var url = InvoiceItem.apiUrl + "/" + invoice_item_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice Item Update - DONE - https://stripe.com/docs/api#update_invoiceitem
// invoice_item_id: Stripe Invoice Item Id
// data = {
//   amount:
//   description: 
// }
InvoiceItem.update = function(invoice_item_id, data, callback) {
  var url = InvoiceItem.apiUrl + "/" + invoice_item_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice Item Delete - DONE - https://stripe.com/docs/api#delete_invoiceitem
// invoice_item_id: Stripe Invoice Item Id
InvoiceItem.del = function(invoice_item_id, callback) {
  var url = InvoiceItem.apiUrl + "/" + invoice_item_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Invoice Item Update - DONE - https://stripe.com/docs/api#list_invoiceitems
// invoice_item_id: Stripe Invoice Item Id
// data = {
//   count: default 10
//   created:
//   offset:
//   customer: default 0
// }
InvoiceItem.list = function(data, callback) {
  var url = InvoiceItem.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};


