var request = require('request');
var Recipient = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Recipient.apiUrl = Stripe.apiUrl + "/recipients";

// Recipient Create - DONE - https://stripe.com/docs/api#create_recipient
// data = {
//   name: full legal name
//   type: individual/corporation  
// }
Recipient.create = function(data, callback) {
  var url = Recipient.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Recipient Retrieve - DONE - hhttps://stripe.com/docs/api#retrieve_recipient
// recipient_id: Stripe Recipient Id
Recipient.retrieve = function(recipient_id, callback) {
  var url = Recipient.apiUrl + "/" + recipient_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Recipient Update - DONE - https://stripe.com/docs/api#update_recipient
// data = {
//  Recipient_id: Unique Stripe Recipient Id
//  Recipient: dictionary of Recipient info - can only change the "name"
// }
Recipient.update = function(recipient_id, data, callback) {
  var url = Recipient.apiUrl + "/" + recipient_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Recipient Delete - DONE - https://stripe.com/docs/api#delete_recipient
// Recipient_id: Unique Stripe Recipient Id
Recipient.del = function(recipient_id, callback) {
  var url = Recipient.apiUrl + "/" + recipient_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Recipient List - DONE -https://stripe.com/docs/api#list_recipients
// data = {
//   count: defaults to 10
//   offset: defaults to 0
// }
Recipient.list = function(data, callback) {
  var url = Recipient.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


