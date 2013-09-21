var request = require('request');
var Event = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Event.apiUrl = Stripe.apiUrl + "/events";


// Event Retrieve - DONE - https://stripe.com/docs/api#retrieve_event
// event_id: Stripe Event Id
Event.retrieve = function(event_id, callback) {
  var url = Event.apiUrl + "/" + event_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};


// Event List - DONE - https://stripe.com/docs/api#list_events
// data = {
//   //options
// }
Event.list = function(data, callback) {
  var url = Event.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


