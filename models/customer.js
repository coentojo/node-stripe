var request = require('request');
var Customer = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Customer.apiUrl = Stripe.apiUrl + "/customers";

// Customer List - WORKS
// data = {
//   count: defaults to 10
//   offset: defaults to 0
// }
Customer.list = function(data, callback) {
  var count = data.count || 10;
  var offset = data.offset || 0;
  var data = {
    count: count,
    offset: offset
  };
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, Customer.apiUrl);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Customer Create - WORKS
// data = {
//   card: token from Stripe.js or card information (as a dictionary)
//   email: 
//   description: 
//   (all other optional fields)
// }
Customer.create = function(data, callback) {
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, Customer.apiUrl);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Customer Retrieve - WORKS
Customer.retrieve = function(data, callback) {
  var url = Customer.apiUrl + "/" + data.customer_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Customer Update - WORKS - but not sure about the parameters
// If no card info, just email can be modified
// data = {
//   customer_id: Stripe Customer Id
//   customer: dictionary of Customer information
// }
Customer.update = function(customer_id, data, callback) {
  var url = Customer.apiUrl + "/" + customer_id;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Customer Delete - WORKS
// data = {
//   customer_id: Stripe Customer Id
// } 
Customer.del = function(data, callback) {
  var url = Customer.apiUrl + "/" + data.customer_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Customer Subscription - WORKS BUT NOT SURE if i want to have two parameters, or one with nested objs
// data = {
//   plan: Stripe Subscription Plan Id
//   customer_id: Stripe Customer Id
// }
Customer.subscribe = function(customer_id, data, callback) {
  var url = Customer.apiUrl + "/" + customer_id + "/subscription";
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body){
    callback(error, response, body);
  });
};

// Customer Cancel Subscription - WORKS - check the flag
// customer_id: Stripe Customer Id
// data = {
//   at_period_end optional, default is false
// }
Customer.cancelSubscription = function(customer_id, data, callback) {
  var url = Customer.apiUrl + "/" + customer_id + "/subscription";
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Customer Remove Discount (Coupon associated with customer) - DONE (minor bug/question) - https://stripe.com/docs/api#delete_discount
// customer_id: Stripe Customer Id
Customer.removeDiscount = function(customer_id, callback) {
  var url = Customer.apiUrl + "/" + customer_id + "/discount"
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};





