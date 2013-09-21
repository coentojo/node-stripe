var url = require('url');
var queryString = require('querystring');
var request = require('request');

var stripeApi = "https://api.stripe.com/v1";
var stripeSecretKey = "sk_test_fLhigTEfIBe2usrZiT98uUx8";

var Coupon = require('../models/coupon.js');
var helper = require("../lib/helper.js");

var CouponController = module.exports = {};


CouponController.create = function(req, res){
  console.log("Creating a Coupon");
  Coupon.create(req.body.coupon, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CouponController.retrieve = function(req, res) {
  console.log("Retrieveing a Coupon");
  Coupon.retrieve(req.body.coupon_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CouponController.del = function(req, res) {
  console.log("Deleting a Coupon");
  Coupon.del(req.body.coupon_id, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};

CouponController.list = function(req, res) {
  console.log("Retrieving all Coupons");
  Coupon.list(req.body.coupon, function(error, response, body){
    helper.respondJson(req, res, 200, body);
  });
};