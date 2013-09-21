var request = require('request');
var Plan = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Plan.apiUrl = Stripe.apiUrl + "/plans";

// Plan Create - DONE - https://stripe.com/docs/api#create_plan
// data = {
//   id: 
//   amount:
//   interval:
//   currency:   
// }
Plan.create = function(data, callback) {
  var url = Plan.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Plan Retrieve - DONE - https://stripe.com/docs/api#retrieve_plan
// data = {
//   plan_id: Unique Stripe Plan Id
// }
Plan.retrieve = function(plan_id, callback) {
  var url = Plan.apiUrl + "/" + plan_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Plan Update - DONE - https://stripe.com/docs/api#update_plan
// data = {
//  plan_id: Unique Stripe Plan Id
//  plan: dictionary of plan info - can only change the "name"
// }
Plan.update = function(plan_id, data, callback) {
  var url = Plan.apiUrl + "/" + plan_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Plan Delete - DONE - https://stripe.com/docs/api#delete_plan
// plan_id: Unique Stripe Plan Id
Plan.del = function(plan_id, callback) {
  var url = Plan.apiUrl + "/" + plan_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};


// Plan List - DONE -https://stripe.com/docs/api#list_plans
// data = {
//   count: defaults to 10
//   offset: defaults to 0
// }
Plan.list = function(data, callback) {
  var url = Plan.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


