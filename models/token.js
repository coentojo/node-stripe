var request = require('request');
var Token = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Token.apiUrl = Stripe.apiUrl + "/tokens";


// Token Create - - https://stripe.com/docs/api#create_card_token
// data = {
//   card:
//  or
//   customer: only for Stripe connect
//  or
//   bank_account: 
// }
Token.create = function(data, access_token, callback) {
  access_token = (access_token === undefined) ? Stripe.secretApiKey : access_token;
  var url = Token.apiUrl;
  var options = helper.requestOptions("POST", access_token, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Token Retrieve - DONE - https://stripe.com/docs/api#retrieve_token
// token_id
Token.retrieve = function(token_id, callback) {
  var url = Token.apiUrl + "/" + token_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


