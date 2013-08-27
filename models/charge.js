var request = require('request');

var Charge = module.exports = {};

var Stripe = require('../models/stripe');

Charge.apiUrl = Stripe.apiUrl + "/charges";
  
Charge.create = function(data, callback) {
  var charge = Charge.serializeCharge(data.amount, data.currency, data.id, data.card, data.description, data.capture, data.fee);
  var accessToken = data.access_token || Stripe.secretApiKey;
  console.log(charge);

  var requestOptions = {
    method: "POST",
    json: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    form: charge,
    uri: Charge.apiUrl
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });   
};

Charge.retrieve = function(id, callback) {
  var extra = "/" + id;
  var requestOptions = {
    method: "GET",
    json: true,
    headers: {
      "Authorization": "Bearer " + Stripe.secretApiKey
    },
    uri: Charge.apiUrl + extra
  };

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });   
};

Charge.refund = function(id, amount, callback) {
  var extra = "/" + id + "/refund";
  var requestOptions = {
    method: "POST",
    json: true,
    headers: {
      "Authorization": "Bearer " + Stripe.secretApiKey
    },
    form: {
      amount: amount
    },
    uri: Charge.apiUrl + extra
  };

  if(!amount) {
    delete requestOptions.form;
  }

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });  
};

Charge.capture = function(id, amount, callback) {
  var extra = "/" + id + "/capture";
  var requestOptions = {
    method: "POST",
    json: true,
    headers: {
      "Authorization": "Bearer " + Stripe.secretApiKey
    },
    form: {
      amount: amount
    },
    uri: Charge.apiUrl + extra
  };

  if(!amount) {
    delete requestOptions.form;
  }

  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });  
};

Charge.listAll = function(count, customer, offset, callback) {
   var requestOptions = {
    method: "GET",
    json: true,
    headers: {
      "Authorization": "Bearer " + Stripe.secretApiKey
    },
    form: {
      count: parseInt(count),
      customer: customer,
      offset: offset
    },
    uri: Charge.apiUrl
  };

  if(!count) {
    delete requestOptions.form.count;
  }
  if(!customer) {
    delete requestOptions.form.customer;
  }
  if(!offset) {
    delete requestOptions.form.offset;
  }
  console.log(requestOptions);
  request(requestOptions, function(error, response, body) {
    callback(error, response, body);
  });   
}


Charge.serializeCharge = function(amount, currency, customer, card, description, capture, applicationFee) {
  currency = currency || "usd";
  currency.toLowerCase();
  capture = (typeof capture === "boolean") ? capture : false;

  var charge = {
    amount: amount,
    currency: currency,
    customer: customer,
    card: card,
    capture: capture,
    application_fee: applicationFee,
    description: description
  };

  if(typeof customer === "undefined"){
    delete charge.customer;
  } 
  if(typeof card === "undefined"){
    delete charge.card;
  }
  if(typeof description === "undefined") {
    delete charge.description;
  }
  if(typeof applicationFee === "undefined" || applicationFee === "") {
    delete charge.application_fee;
  }

  return charge;
};
