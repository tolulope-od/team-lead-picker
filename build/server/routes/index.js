"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _teamRoutes = _interopRequireDefault(require("./teamRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success',
    message: 'Team Lead Picker API Base'
  });
});
router.use('/team', _teamRoutes["default"]);
var _default = router;
exports["default"] = _default;