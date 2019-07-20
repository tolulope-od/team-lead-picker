"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = require("../database");

var _index = require("../utils/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Team =
/*#__PURE__*/
function () {
  function Team() {
    _classCallCheck(this, Team);
  }

  _createClass(Team, null, [{
    key: "selectWeekLeaders",
    value: function () {
      var _selectWeekLeaders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var weekCount, membersCount, membersNotLed, membersNotQA, teamLead, index, teamQA, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _database.Weeks.selectCount(['"week"']);

              case 3:
                weekCount = _context.sent;
                _context.next = 6;
                return _database.Members.selectCount(['"id"']);

              case 6:
                membersCount = _context.sent;

                if (!(parseInt(weekCount[0].count, 10) % parseInt(membersCount[0].count, 10) === 0)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return _database.Members.updateAllRows(["\"hasBeenTL\"=".concat(false, ", \"hasBeenQA\"=", false)]);

              case 10:
                _context.next = 12;
                return _database.Members.select(['*'], ["\"hasBeenTL\"=".concat(false)]);

              case 12:
                membersNotLed = _context.sent;
                _context.next = 15;
                return _database.Members.select(['*'], ["\"hasBeenQA\"=".concat(false)]);

              case 15:
                membersNotQA = _context.sent;
                teamLead = (0, _index.generateRandomUser)(membersNotLed);

                if (membersNotQA.some(function (member) {
                  return member.id === teamLead.id;
                })) {
                  index = membersNotQA.map(function (member) {
                    return member.id;
                  }).indexOf(teamLead.id);
                  membersNotQA.splice(index, 1);
                }

                teamQA = (0, _index.generateRandomUser)(membersNotQA);
                _context.next = 21;
                return _database.Members.update(["\"hasBeenTL\"=".concat(true)], ["\"email\"='".concat(teamLead.email, "'")]);

              case 21:
                _context.next = 23;
                return _database.Members.update(["\"hasBeenQA\"=".concat(true)], ["\"email\"='".concat(teamQA.email, "'")]);

              case 23:
                _context.next = 25;
                return _database.Weeks.create(['"tL"', '"qA"', '"teamLead"', '"qualityAssurance"'], ["".concat(teamLead.id, ", ").concat(teamQA.id, ", '").concat(teamLead.name, "', '").concat(teamQA.name, "'")]);

              case 25:
                result = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: result
                }));

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", next(_context.t0));

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 29]]);
      }));

      function selectWeekLeaders(_x, _x2, _x3) {
        return _selectWeekLeaders.apply(this, arguments);
      }

      return selectWeekLeaders;
    }()
  }]);

  return Team;
}();

exports["default"] = Team;