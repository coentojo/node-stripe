var request = require('request');
var Card = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Card.apiUrl = Stripe.apiUrl + "/customers";

// Card Create - WORKS 
// data = {
//   token: (token from Stripe.js or card information)
//   card: dictionary of card details
//   customer_id: Stripe Customer Id
// }
Card.create = function(data, callback) {
  var card = data.token || data.card;
  var data = {
    card: card
  };
  var url = Card.apiUrl + "/" + data.customer_id + "/cards"
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Card Retrieve - WORKS
Card.retrieve = function(data, callback) {
  var url = Card.apiUrl + "/" + data.customer_id + "/cards/" + data.card_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Card Update - WORKS
// data = {
//  card_id: Stripe Card Id
//  customer_id: Stripe Customer Id
//  card: dictionary of Card info
// }
Card.update = function(data, callback) {
  var url = Card.apiUrl + "/" + data.customer_id + "/cards/" + data.card_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data.card, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Card Delete - WORKS
// data = {
//   card_id: Stripe Card Id
//   customer_id: Stripe Customer Id
// }
Card.del = function(data, callback) {
  var url = Card.apiUrl + "/" + data.customer_id + "/cards/" + data.card_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Card List - WORKS
// parameters:
//  - count 
//  - offset
Card.list = function(data, callback) {
  var count = data.count || 10;
  var offset = data.offset || 0;
  var form = {
    count: count,
    offset: offset
  };
  var url = Card.apiUrl + "/" + data.customer_id + "/cards";
  var options = helper.requestOptions("GET", Stripe.secretApiKey, form, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


