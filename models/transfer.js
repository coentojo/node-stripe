var request = require('request');
var Transfer = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Transfer.apiUrl = Stripe.apiUrl + "/transfers";


// Transfer Create -  - https://stripe.com/docs/api#create_transfer
// data = {
//   amount:
//   currency:
//   recipient: 
// }
Transfer.create = function(data, callback) {
  var url = Transfer.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Transfer Retrieve -  - https://stripe.com/docs/api#retrieve_transfer
// transfer_id: Stripe Transfer Id
Transfer.retrieve = function(transfer_id, callback) {
  var url = Transfer.apiUrl + "/" + transfer_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Transfer Cancel -  - https://stripe.com/docs/api#cancel_transfer
// transfer_id: Stripe Transfer Id
Transfer.cancel = function(transfer_id, data, callback) {
  var url = Transfer.apiUrl + "/" + transfer_id + "/cancel";
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};


// Transfer List -  - https://stripe.com/docs/api#list_transfers
// invoice_item_id: Stripe Invoice Item Id
// data = {
//   count: default 10
//   date:
//   offset: default 0
//   recipient: 
//   status:
// }
Transfer.list = function(data, callback) {
  var url = Transfer.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};


