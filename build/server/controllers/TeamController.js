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
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var weekCount, membersCount, allMembers, membersNotLed, membersNotQA, teamLead, index, teamQA, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _database.Weeks.selectCount(['"week"']);

              case 3:
                weekCount = _context2.sent;
                _context2.next = 6;
                return _database.Members.selectCount(['"id"']);

              case 6:
                membersCount = _context2.sent;

                if (!(parseInt(weekCount[0].count, 10) % parseInt(membersCount[0].count, 10) === 0)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 10;
                return _database.Members.selectAll(['*']);

              case 10:
                allMembers = _context2.sent;
                allMembers.forEach(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(member) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _database.Members.update(["\"hasBeenTL\"=".concat(false, ", \"hasBeenQA\"=", false)], ["\"email\"='".concat(member.email, "'")]);

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 12:
                _context2.next = 14;
                return _database.Members.select(['*'], ["\"hasBeenTL\"=".concat(false)]);

              case 14:
                membersNotLed = _context2.sent;
                _context2.next = 17;
                return _database.Members.select(['*'], ["\"hasBeenQA\"=".concat(false)]);

              case 17:
                membersNotQA = _context2.sent;
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
                _context2.next = 23;
                return _database.Members.update(["\"hasBeenTL\"=".concat(true)], ["\"email\"='".concat(teamLead.email, "'")]);

              case 23:
                _context2.next = 25;
                return _database.Members.update(["\"hasBeenQA\"=".concat(true)], ["\"email\"='".concat(teamQA.email, "'")]);

              case 25:
                _context2.next = 27;
                return _database.Weeks.create(['"tL"', '"qA"', '"teamLead"', '"qualityAssurance"'], ["".concat(teamLead.id, ", ").concat(teamQA.id, ", '").concat(teamLead.name, "', '").concat(teamQA.name, "'")]);

              case 27:
                result = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 'success',
                  data: result
                }));

              case 31:
                _context2.prev = 31;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", next(_context2.t0));

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 31]]);
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