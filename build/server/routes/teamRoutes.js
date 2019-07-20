"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _TeamController = _interopRequireDefault(require("../controllers/TeamController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectWeekLeaders = _TeamController["default"].selectWeekLeaders;
var router = (0, _express.Router)();
router.get('/leaders', selectWeekLeaders);
var _default = router;
exports["default"] = _default;