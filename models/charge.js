var request = require('request');
var Stripe = require('../models/stripe');
var helper = require('../lib/helper.js');

var Charge = module.exports = {};
Charge.apiUrl = Stripe.apiUrl + "/charges";

// data: object containing attributes for Charge object
Charge.create = function(data, access_token, callback) {
  access_token = (access_token === undefined) ? Stripe.secretApiKey : access_token;
  var options = helper.requestOptions("POST", access_token, data, Charge.apiUrl);

  request(options, function(error, response, body) {
    callback(error, response, body);
  });   
};

// id: charge_id
Charge.retrieve = function(id, callback) {
  var url = Charge.apiUrl + "/" + id;
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);

  request(options, function(error, response, body) {
    callback(error, response, body);
  });   
};

// id: charge_id
// amount: amount to refund
Charge.refund = function(id, amount, callback) {
  var form = { amount: amount };
  var url = Charge.apiUrl + "/" + id + "/refund";

  var options = helper.requestOptions("POST", Stripe.secretApiKey, form, url);

  if(!amount) delete options.form;

  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// id: charge_id
// amount: amount to capture
Charge.capture = function(id, amount, callback) {
  var url = Charge.apiUrl + "/" + id + "/capture";
  var form = { amount: amount };

  var options = helper.requestOptions("POST", Stripe.secretApiKey, form, url);

  if(!amount) delete options.form;

  request(options, function(error, response, body) {
    callback(error, response, body);
  });  
};

// count: number of charges to retrieve
// offset: an integer offset the list of charges
// customer: customer_id of customer for which you are looking up charges
Charge.listAll = function(count, customer, offset, callback) {
  var form = {
    count: parseInt(count),
    customer: customer,
    offset: offset
  };

  var options = helper.requestOptions("GET", Stripe.secretApiKey, form, Charge.apiUrl);

  if(!count) delete options.form.count;
  if(!customer) delete options.form.customer;
  if(!offset) delete options.form.offset;

  request(options, function(error, response, body) {
    callback(error, response, body);
  });   
};

// Charge update dispute - - https://stripe.com/docs/api#update_dispute
// charge_id
// data = {
//   evidence: text body
// }
Charge.updateDispute = function(charge_id, data, callback) {
  var url = Charge.apiUrl + "/" + charge_id + "/dispute";
  var options = helper.requestOptions("POST", Stripe.secretApiKey, data, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};


