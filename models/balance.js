var request = require('request');
var Balance = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Balance.apiUrl = Stripe.apiUrl + "/balance";


// Balance Retrieve - DONE - https://stripe.com/docs/api#retrieve_balance
Balance.retrieve = function(callback) {
  var url = Balance.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Balance Retrieve - DONE - https://stripe.com/docs/api#retrieve_balance_transaction
// transaction_id
Balance.retrieveTransaction = function(transaction_id, callback) {
  var url = Balance.apiUrl + "/history/" + transaction_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};


// Balance List - DONE - https://stripe.com/docs/api#balance_history
// data = {
// 
// }
Balance.list = function(data, callback) {
  var url = Balance.apiUrl + "/history";
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


