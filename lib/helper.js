var url = require('url');
var queryString = require('querystring');

var helper = module.exports = {};

helper.respondJson = function(req, res, code, data) {
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
    res.send(code, jsonp);
  } else {
    res.json(code, data);
  }
};

helper.respondError = function(req, res, code, data) {
  code = code || 402;
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
    res.send(code, jsonp);
  } else {
    res.json(code, data);
  }

};

helper.requestOptions = function(method, accessToken, form, url) {
  var options = {
    method: method,
    json: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    form: form,
    uri: url
  }
  return options;
};

helper.getDataFromQuery = function(req) {
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
};

// Improve this
helper.statusCode = function(body) {
  var error = body.error;
  
  if(!error) return 200;

  if(error.type === "invalid_request_error" || error.type === "card_error") {
    return 400;
  } else if (body.error.type === "api_error"){
    return 500;
  }
};


// helper function to serialize Charge data
helper.serializeCharge = function(data) {
  data.currency = data.currency || "usd";
  data.currency.toLowerCase();

  var charge = {
    amount: data.amount,
    currency: data.currency,
    customer: data.customer,
    card: data.card,
    capture: data.capture,
    application_fee: data.applicationFee,
    description: data.description
  };
  if(typeof data.capture === "undefined") delete charge.capture;
  if(typeof data.customer === "undefined") delete charge.customer;
  if(typeof data.card === "undefined") delete charge.card;
  if(typeof data.description === "undefined") delete charge.description;
  if(typeof data.applicationFee === "undefined" || applicationFee === "") delete charge.application_fee;

  // test capture
  charge["capture"] = false;

  return charge;
};

