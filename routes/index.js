var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";
var Stripe = require("../models/stripe");
var Charge = require("../models/charge");
var Customer = require("../models/customer");

var helper = require("../lib/helper.js");
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.buyProduct = function(req, res) {
  console.log("buying product");
  var data = helper.getDataFromQuery(req);

  Customer.createCustomer(data, function(error, response, body){
    var customer = body; 
    var charge = {
      amount: data.amount,
      customer: customer.id
    };

    Charge.create(charge, function(error, response, body){
      console.log("successfully bought product");
      console.log(body);
      helper.respondJson(req, res, 200, body);
    });
  });
};


exports.webhooks = function(req, res) {
  console.log(req.body.type);
  respondJson(req, res, 200, {});
};

