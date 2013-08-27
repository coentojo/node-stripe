
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var url = require('url');
var queryString = require('querystring');

var app = express();

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
app.get('/users', user.list);
app.get('/createCUstomer', routes.createCustomer);
app.get('/findCustomer', routes.findCustomer);
app.get('/updateCustomer', routes.updateCustomer);
app.get('/deleteCustomer', routes.deleteCustomer);
app.get('/listCustomers', routes.listCustomers);
app.get('/subscribeCustomer', routes.subscribeCustomer);
app.get('/chargeCustomer', routes.chargeCustomer);
app.get('/stripeRedirect', routes.stripeRedirect);
app.get('/retrieveCharge', routes.retrieveCharge);
app.get('/refundCharge', routes.refundCharge);
app.get('/captureCharge', routes.captureCharge);
app.post('/listCharges', routes.listCharges);
app.get('/webhooks', routes.webhooks);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
