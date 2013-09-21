var request = require('request');
var helper = require('../lib/helper.js');

var Stripe = module.exports = {};

Stripe.apiUrl = "https://api.stripe.com/v1";

// Test mode
Stripe.secretApiKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

// Stripe create access_token for User
// code: (code or refresh_token) what is returned by the initial oauth flow
// grant_type: "authorization_code"/"refresh_token" depending on above
Stripe.createAccessToken = function(code, grant_type, callback) {
  var url = "https://connect.stripe.com/oauth/token";
  var form = {
    code: code,
    grant_type: grant_type,
    client_secret: Stripe.secretApiKey
  }
  var options = helper.requestOptions("POST", Stripe.secretApiKey, form, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
};

// Stripe Account
// Returns Stripe Account info
Stripe.account = function(callback) {
  var url = Stripe.apiUrl + "/account";
  var options = helper.requestOptions("GET", Stripe.secretApiKey, {}, url);
  request(options, function(error, response, body) {
    callback(error, response, body);
  });
}