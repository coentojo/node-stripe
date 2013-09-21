var url = require('url');
var queryString = require('querystring');
var request = require('request');
var helper = require('../lib/helper.js');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Plan = require('../models/plan.js');
var Stripe = require('../models/stripe.js');
var StripeController = module.exports = {};


// Once a user has loggedin/signedup oauth flow is redirected here
// Using the "code" param that was returned, create an access token
StripeController.stripeRedirect = function(req, res) {
  console.log("Stripe Redirect landed here");

  var response = req.query.code || req.query.error;
  if(response === "access_denied") {
    // do something with req.query.error_description
  } 

  Stripe.createAccessToken(req.query.code, "authorization_code", function(error, response, body) {
    console.log(body);
    helper.respondJson(req, res, 200, body);  
  });
};

StripeController.account = function(req, res){
  Stripe.account(function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  })
};







// Does not work
StripeController.action = function(req, res, obj, act) {
  console.log("Does this wrk");
  console.log(obj);
  console.log(act);
  Plan.act(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};
