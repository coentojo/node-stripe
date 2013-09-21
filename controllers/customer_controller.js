var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Charge = require('../models/charge.js');
var Customer = require('../models/customer.js');
var helper = require("../lib/helper.js");

var CustomerController = module.exports = {};

CustomerController.list = function(req, res) {
  console.log("Listing customers");
  Customer.list(req.body, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CustomerController.create = function(req, res) {
  console.log("Create Customer");
  Customer.create(req.body, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

CustomerController.retrieve = function(req, res) {
  console.log("Finding customer");
  Customer.retrieve(req.body, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

CustomerController.update = function(req, res) {
  console.log("Updating customer");
  Customer.update(req.body.customer_id, req.body.customer, function(error, response, body) {
    helper.respondJson(req, res, 200, body);
  });
};

CustomerController.del = function(req, res) {
  console.log("Deleting Customer");
  Customer.del(req.body, function(error, resposne, body) {
    helper.respondJson(req ,res, 200, body);
  });
};

CustomerController.subscribe = function(req, res) {
  console.log("Subscribing Customer");
  Customer.subscribe(req.body.customer_id, req.body.subscription, function(error, response, body) {
    helper.respondJson(req ,res, 200, body);
  });
};

CustomerController.cancelSubscription = function(req, res) {
  console.log("Canceling customer subbscription");
  Customer.cancelSubscription(req.body.customer_id, req.body.data, function(error, response, body) {
    helper.respondJson(req ,res, 200, body);
  });
};

CustomerController.removeDiscount = function(req, res) {
  console.log("Removing customer discount");
  Customer.removeDiscount(req.body.customer_id, function(error, response, body) {
    helper.respondJson(req ,res, 200, body);
  });
};


// PLAYGROUND
// 
// CustomerController.create = function(req, res) {
//   console.log("Create Customer");
//   var data = helper.getDataFromQuery(req);

//   var user = customerExists(data.email);
//   if(user === null) {
//     Customer.create(data, function(error, response, body) {    
//       GLOBAL.users[body.id] = body;
//       console.log(GLOBAL.users);
//       helper.respondJson(req, res, 200, body);
//     });  
//   } else {
//     helper.respondJson(req, res, 200, user);
//   }

// };
// 
// var customerExists = function(email) {
//   for(var key in GLOBAL.users) {
//     var user = GLOBAL.users[key];
//     console.log(user);
//     if(user.email === email) {
//       return user;
//     }
//   }
//   return null;
// }




