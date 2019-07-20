"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weeks = exports.Members = exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var config = _dotenv["default"].config;
config();
var debug = (0, _debug["default"])('db');
var _console = console,
    log = _console.log;

var Table =
/*#__PURE__*/
function () {
  function Table(table) {
    _classCallCheck(this, Table);

    this.table = table;
    this.pool = Table.initConn();
    this.pool.on('error', function (error) {
      return debug(error);
    });
  }

  _createClass(Table, [{
    key: "selectAll",
    value: function () {
      var _selectAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(params) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.pool.query("SELECT ".concat(params, " from ").concat(this.table));

              case 3:
                result = _context.sent;
                debug(result.rows);
                return _context.abrupt("return", result.rows);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                debug(_context.t0.message);
                return _context.abrupt("return", _context.t0.message);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function selectAll(_x) {
        return _selectAll.apply(this, arguments);
      }

      return selectAll;
    }()
  }, {
    key: "select",
    value: function () {
      var _select = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(params, constraint) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.pool.query("SELECT ".concat(params, " from ").concat(this.table, " WHERE ").concat(constraint));

              case 3:
                result = _context2.sent;
                debug(result.rows);
                return _context2.abrupt("return", result.rows);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                debug(_context2.t0.message);
                return _context2.abrupt("return", _context2.t0.message);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function select(_x2, _x3) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "selectCount",
    value: function () {
      var _selectCount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(column) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.pool.query("SELECT COUNT(".concat(column, ") FROM ").concat(this.table, "; "));

              case 3:
                result = _context3.sent;
                debug(result.rows);
                return _context3.abrupt("return", result.rows);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                debug(_context3.t0.message);
                return _context3.abrupt("return", _context3.t0.message);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function selectCount(_x4) {
        return _selectCount.apply(this, arguments);
      }

      return selectCount;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(params, values, rows) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.pool.query("INSERT INTO ".concat(this.table, "(").concat(params, ") VALUES(").concat(values, ") RETURNING ").concat('*' || rows));

              case 3:
                result = _context4.sent;
                debug(result.rows);
                return _context4.abrupt("return", result.rows);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                debug(_context4.t0.message);
                return _context4.abrupt("return", _context4.t0.message);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function create(_x5, _x6, _x7) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(params, constraints, rows) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.pool.query("UPDATE ".concat(this.table, " SET ").concat(params, " WHERE ").concat(constraints, " RETURNING ").concat('*' || rows));

              case 3:
                result = _context5.sent;
                debug(result.rows);
                return _context5.abrupt("return", result.rows);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", log(_context5.t0));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function update(_x8, _x9, _x10) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "updateAllRows",
    value: function () {
      var _updateAllRows = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(params, rows) {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.pool.query("UPDATE ".concat(this.table, " SET ").concat(params, " RETURNING ").concat('*' || rows));

              case 3:
                result = _context6.sent;
                debug(result.rows);
                return _context6.abrupt("return", result.rows);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", log(_context6.t0));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function updateAllRows(_x11, _x12) {
        return _updateAllRows.apply(this, arguments);
      }

      return updateAllRows;
    }()
  }], [{
    key: "initConn",
    value: function initConn() {
      var DATABASE_URL = process.env.DATABASE_URL;
      var connectionString = DATABASE_URL;
      debug("Pool Settings: ".concat(connectionString));
      return new _pg.Pool({
        connectionString: connectionString
      });
    }
  }]);

  return Table;
}();

exports["default"] = Table;
var Members = new Table("members");
exports.Members = Members;
var Weeks = new Table("weeks");
exports.Weeks = Weeks;