var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var url = require('url');
var queryString = require('querystring');
var ChargeController = require('./controllers/charge_controller.js');
var CustomerController = require('./controllers/customer_controller.js');
var CardController = require('./controllers/card_controller.js');
var PlanController = require('./controllers/plan_controller.js');
var StripeController = require('./controllers/stripe_controller.js');
var CouponController = require('./controllers/coupon_controller.js');
var InvoiceController = require('./controllers/invoice_controller.js');
var InvoiceItemController = require('./controllers/invoice_item_controller.js');
var TransferController = require('./controllers/transfer_controller.js');
var RecipientController = require('./controllers/recipient_controller.js');
var BalanceController = require('./controllers/balance_controller.js');
var EventController = require('./controllers/event_controller.js');
var TokenController = require('./controllers/token_controller.js');

var app = express();

//global users object - just for testing
GLOBAL.users = {};


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/buyProduct', routes.buyProduct);
app.post('/webhooks', routes.webhooks);

// Customer - DONE
app.post('/createCustomer', CustomerController.create);
app.post('/retrieveCustomer', CustomerController.retrieve);
app.post('/updateCustomer', CustomerController.update);
app.post('/deleteCustomer', CustomerController.del);
app.post('/listCustomers', CustomerController.list);
app.post('/subscribeCustomer', CustomerController.subscribe);
app.post('/cancelSubscription', CustomerController.cancelSubscription);
app.post('/removeDiscount', CustomerController.removeDiscount);

// Charge - NOT DONE
app.post('/createCharge', ChargeController.create);
app.get('/retrieveCharge', ChargeController.retrieve);
app.get('/refundCharge', ChargeController.refund);
app.get('/captureCharge', ChargeController.capture);
app.get('/listCharges', ChargeController.list);
app.post('/updateDispute', ChargeController.updateDispute);

// Card - DONE
app.post('/createCard', CardController.create);
app.post('/retrieveCard', CardController.retrieve);
app.post('/updateCard', CardController.update);
app.post('/deleteCard', CardController.del);
app.post('/listCards', CardController.list);

// Plan - DONE
app.post('/createPlan', PlanController.create);
app.post('/retrievePlan', PlanController.retrieve);
app.post('/updatePlan', PlanController.update);
app.post('/deletePlan', PlanController.del);
app.post('/listPlans', PlanController.list);

// Coupon - DONE
app.post('/createCoupon', CouponController.create);
app.post('/retrieveCoupon', CouponController.retrieve);
app.post('/deleteCoupon', CouponController.del);
app.post('/listCoupons', CouponController.list);

// Invoice - DONE
app.post('/retrieveInvoice', InvoiceController.retrieve);
app.post('/retrieveLineItems', InvoiceController.retrieveLineItems);
app.post('/createInvoice', InvoiceController.create);
app.post('/payInvoice', InvoiceController.pay);
app.post('/updateInvoice', InvoiceController.update);
app.post('/listInvoices', InvoiceController.list);
app.post('/upcomingInvoice', InvoiceController.upcomingInvoice);

// Invoice Item - DONE
app.post('/createInvoiceItem', InvoiceItemController.create);
app.post('/retrieveInvoiceItem', InvoiceItemController.retrieve);
app.post('/updateInvoiceItem', InvoiceItemController.update);
app.post('/deleteInvoiceItem', InvoiceItemController.del);
app.post('/listInvoiceItems', InvoiceItemController.list);

// Transfer -
app.post('/createTransfer', TransferController.create);
app.post('/retrieveTransfer', TransferController.retrieve);
app.post('/cancelTransfer', TransferController.cancel);
app.post('/listTransfers', TransferController.list);

// Recipient - 
app.post('/createRecipient', RecipientController.create);
app.post('/retrieveRecipient', RecipientController.retrieve);
app.post('/deleteRecipient', RecipientController.del);
app.post('/updateRecipient', RecipientController.update);
app.post('/listRecipients', RecipientController.list);

// Account
app.post('/account', StripeController.account);

// Balance
app.post('/retrieveBalance', BalanceController.retrieve);
app.post('/listBalanceHistory', BalanceController.list);
app.post('/retrieveBalanceTransaction', BalanceController.retrieveTransaction)

// Events
app.post('/retrieveEvent', EventController.retrieve);
app.post('/listEvents', EventController.list);

// Tokens
app.post('/createToken', TokenController.create);
app.post('/retrieveToken', TokenController.retrieve);

// Connect
app.get('/stripeRedirect', StripeController.stripeRedirect);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
