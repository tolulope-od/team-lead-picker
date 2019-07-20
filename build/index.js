"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _debug = _interopRequireDefault(require("debug"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./server/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
var app = (0, _express["default"])();
var debug = (0, _debug["default"])('dev');
var PORT = process.env.PORT || 7777;
var API_ROUTE_PREFIX = '/api/v1';
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _express["default"])({
  extended: false
}));
app.use((0, _morgan["default"])('dev'));
app.use(API_ROUTE_PREFIX, _routes["default"]); // Should render the static html page

app.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success',
    message: 'Team-Lead-Picker App'
  });
});
app.use(function (err, req, res, next) {
  debug(err.stack);
  return res.status(500).json({
    status: 'error',
    message: 'Something broke. Please try again or check back for a fix'
  });
}); // TODO: Error handler for unknown routes

app.listen(PORT, function () {
  return debug("Server ruuning on PORT:".concat(PORT));
});