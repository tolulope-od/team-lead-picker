"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leaderAndQA = exports.generateRandomUser = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-param-reassign */
var generateRandomUser = function generateRandomUser(members) {
  var randomIndex = Math.floor(Math.random() * members.length);
  var randomUser = members[randomIndex];
  return randomUser;
};

exports.generateRandomUser = generateRandomUser;

var leaderAndQA =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(members, weeks, MembersTable, WeeksTable) {
    var randomUser, teamLead, QA, randomUser2, newLeaders;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (weeks.length >= members.length) {
              members.forEach(
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(member) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return MembersTable.update(["\"hasBeenTL\"=".concat(false, ", \"hasBeenQA\"=", false)], ["\"email\"='".concat(member.email, "'")]);

                        case 2:
                          member.hasLed = false;
                          member.hasQA = false;

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x5) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }

            randomUser = generateRandomUser(members);
            randomUser2 = generateRandomUser(members);

            if (!randomUser.hasLed) {
              teamLead = randomUser;
              members.splice(members.indexOf(randomUser.id), 1);
            }

            if (!randomUser2.hasQA) {
              QA = randomUser2;
              members.splice(members.indexOf(randomUser2.id), 1);
            }

            if (!(randomUser.id === randomUser2.id)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", leaderAndQA(members, weeks, MembersTable, WeeksTable));

          case 8:
            if (!(randomUser.hasLed && randomUser.hasQA)) {
              _context2.next = 11;
              break;
            }

            members.splice(members.indexOf(randomUser.id), 1);
            return _context2.abrupt("return", leaderAndQA(members, weeks, MembersTable, WeeksTable));

          case 11:
            _context2.next = 13;
            return MembersTable.update(["\"hasBeenQA\"=".concat(true)], ["\"email\"='".concat(QA.email, "'")]);

          case 13:
            _context2.next = 15;
            return MembersTable.update(["\"hasBeenTL\"=".concat(true)], ["\"email\"='".concat(teamLead.email, "'")]);

          case 15:
            randomUser2.hasQA = true;
            randomUser.hasLed = true;
            _context2.next = 19;
            return WeeksTable.create(['"tL"', '"qA"', '"teamLead"', '"qualityAssurance"'], ["".concat(teamLead.id, ", ").concat(QA.id, ", '").concat(teamLead.name, "', '").concat(QA.name, "'")]);

          case 19:
            newLeaders = _context2.sent;
            return _context2.abrupt("return", newLeaders);

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 23]]);
  }));

  return function leaderAndQA(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.leaderAndQA = leaderAndQA;