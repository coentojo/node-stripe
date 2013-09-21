var request = require('request');
var Coupon = module.exports = {};
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

Coupon.apiUrl = Stripe.apiUrl + "/coupons";

// Coupon Create - DONE - https://stripe.com/docs/api#create_coupon
// data = {
//  duration:
// }
Coupon.create = function(data, callback) {
  var url = Coupon.apiUrl;
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Coupon Retrieve - DONE - https://stripe.com/docs/api#retrieve_coupon
// coupon_id: Unique Stripe Coupon Id
Coupon.retrieve = function(coupon_id, callback) {
  var url = Coupon.apiUrl + "/" + coupon_id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// Coupon Delete - DONE -https://stripe.com/docs/api#delete_coupon
// coupon_id: Unique Stripe Coupon Id
Coupon.del = function(coupon_id, callback) {
  var url = Coupon.apiUrl + "/" + coupon_id;
  var options = helper.requestOptions("DELETE", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  })
};

// Coupon List - DONE - https://stripe.com/docs/api#list_coupons
// data = {
//   count: defaults to 10
//   offset: defaults to 0
// }
Coupon.list = function(data, callback) {
  var url = Coupon.apiUrl;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


