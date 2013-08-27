var request = require('request');

var Stripe = module.exports = {};

Stripe.apiUrl = "https://api.stripe.com/v1";

// Test mode
Stripe.secretApiKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

Stripe.createAccessToken = function(code, callback) {
  var requestOptions = {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + Stripe.secretApiKey
    },
    form: {
      code: code,
      grant_type: "authorization_code"
    },
    json: true,
    uri: "https://connect.stripe.com/oauth/token"
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });
};

Stripe.addCustomer = function(card, callback) {
  var requestOptions = {
    method: 'POST',
    json: true,
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    form: {
      description: "Customer test email",
      card: data.token,
      email: data.email
    },
    uri: stripeApi + "/customers"
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });
};




