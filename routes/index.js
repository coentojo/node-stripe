var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";
var Stripe = require("../models/stripe");
var Charge = require("../models/charge");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.createCustomer = function(req, res) {
  console.log("Create Customer");
  var data = getDataFromQuery(req);

  addCustomer(data, function(error, response, body) {
    respondJson(req, res, 200, body);
  });

};

exports.findCustomer = function(req, res) {
  console.log("Finding customer");
  var data = getDataFromQuery(req);

  findCustomer(data.id, function(error, response, body) {
    respondJson(req, res, 200, body);
  });
};

exports.updateCustomer = function(req, res) {
  console.log("Updating customer");
  var data = getDataFromQuery(req);

  updateCustomer(data, function(error, response, body) {
    respondJson(req, res, 200, body);
  })

};

exports.deleteCustomer = function(req, res) {
  console.log("Deleting Customer");
  var data = getDataFromQuery(req);

  deleteCustomer(data, function(error, resposne, body) {
    respondJson(req ,res, 200, body);
  });
};

exports.listCustomers = function(req, res) {
  console.log("Listing customers");

  listCustomers(function(error, response, body) {
    respondJson(req, res, 200, body);
  });
};

exports.subscribeCustomer = function(req, res) {
  console.log("Subscribing customer");
  var data = getDataFromQuery(req);

  subscribeCustomer(data, function(error, response, body) {
    respondJson(req, res, 200, body);
  });
};

exports.chargeCustomer = function(req, res) {
  console.log("Charging customer");
  var data = getDataFromQuery(req);

  Charge.create(data, function(error, response, body){
    respondJson(req, res, 200, body);
  });
};

exports.stripeRedirect = function(req, res) {
  console.log("Stripe Redirect landed here");

  var response = req.query.code || req.query.error;
  if(response === "access_denied") {
    // do something with req.query.error_description
  } 

  Stripe.createAccessToken(response, function(error, response, body) {
    console.log(body);
    respondJson(req, res, 200, body);  
  });
};

exports.retrieveCharge = function(req, res){
  console.log("Retrieving a charge");
  var data = getDataFromQuery(req);
  Charge.retrieve(data.id, function(error, response, body) {
    respondJson(req, res, 200, body);
  });
};

exports.refundCharge = function(req, res) {
  console.log("Refunding a charge");
  var data = getDataFromQuery(req);
  console.log(data);
  Charge.refund(data.id, data.amount, function(error, response, body){
    respondJson(req, res, 200, body);
  });
};

exports.captureCharge = function(req, res) {
  console.log("Capturing a charge");
  var data = getDataFromQuery(req);
  console.log(data);
  Charge.capture(data.id, data.amount, function(error, response, body){
    respondJson(req, res, 200, body);
  });
};

exports.listCharges = function(req, res) {
  console.log("Listing all charges");
  var data = req.body;
  Charge.listAll(data.count, null, null, function(error, response, body) {
    respondJson(req, res, 200, body);
  });
};

exports.webhooks = function(req, res) {
  console.log(req.body);
};

var findCustomer = function(data, callback) {
  var requestOptions = {
    method: 'GET',
    json: true,
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    uri: stripeApi + "/customers/" + data
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });  
};

var updateCustomer = function(data, callback) {
  var requestOptions = {
    method: 'POST',
    json: true,
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    form: {
      email: data.email,
      card: {
        number: data.number,
        cvc: data.cvc,
        exp_month: data.month,
        exp_year: data.year
      }
    },
    uri: stripeApi + "/customers/" + data.id
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  })
};

var deleteCustomer = function(data, callback) {
  var requestOptions = {
    method: 'DELETE',
    json: true,
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    uri: stripeApi + "/customers/" + data.id
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  })
};

var listCustomers = function(callback) {
  var requestOptions = {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    uri: stripeApi + "/customers"
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  })
};

var subscribeCustomer = function(data, callback) {
  var requestOptions = {
    method: "POST",
    json: true,
    headers: {
      "Authorization": "Bearer " + stripeSecretKey
    },
    form: {
      plan: data.plan,
    },
    uri: stripeApi + "/customers/" + data.id + "/subscription"
  };
  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });
};

var respondJson = function(req, res, code, data) {
  code = code || 200;
  data = data || {};

  // Detect JSONP
  var callback = req.query.callback;

  if (callback) {
    // This is a JSONP request
    var jsonp = callback + "(" + JSON.stringify(data) + ")";
    res.set({
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    res.send(200, jsonp);
  } else {
    res.json(code, data);
  }
};

var getDataFromQuery = function(req) {
    // This is dumb code. 
  
  var theurl = url.parse(req.url);
  var queryObj = queryString.parse(theurl.query);

  var count = 0;
  var data = {};
  for(var key in queryObj) {
    if(count == 1){
      data = eval("("+key+")");
      break;
    }
    count++;
  }
  return data;
}




