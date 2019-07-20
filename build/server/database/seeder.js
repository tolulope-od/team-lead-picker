"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = _dotenv["default"].config;
config();
var debug = (0, _debug["default"])('db');
var DATABASE_URL = process.env.DATABASE_URL;
var connectionString = new _pg.Client({
  connectionString: DATABASE_URL
});
connectionString.connect();

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var query, seeder;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          query = "DROP TABLE IF EXISTS members, weeks CASCADE;\n    CREATE TABLE \"members\" (\n      \"id\" SERIAL PRIMARY KEY,\n      \"name\" VARCHAR NOT NULL,\n      \"email\" VARCHAR UNIQUE NOT NULL,\n      \"hasBeenTL\" BOOLEAN DEFAULT false,\n      \"hasBeenQA\" BOOLEAN DEFAULT false\n    );\n    \n    CREATE TABLE \"weeks\" (\n      \"week\" SERIAL PRIMARY KEY,\n      \"tL\" INT,\n      \"qA\" INT,\n      \"teamLead\" VARCHAR NOT NULL,\n      \"qualityAssurance\" VARCHAR NOT NULL,\n      \"createdOn\" TIMESTAMPTZ DEFAULT now() NOT NULL\n    );\n    \n    ALTER TABLE \"weeks\" ADD FOREIGN KEY (\"tL\") REFERENCES \"members\" (\"id\");\n    \n    ALTER TABLE \"weeks\" ADD FOREIGN KEY (\"qA\") REFERENCES \"members\" (\"id\");\n    \n    INSERT INTO members(\n      \"name\", \"email\", \"hasBeenTL\", \"hasBeenQA\"\n    )\n    VALUES ('Odunayo Okebunmi', 'odunayo.okebunmi@andela.com', true, false),\n    ('Tolulope Odueke', 'tolulope.odueke@andela.com', false, true),\n    ('Emeka Ofe', 'emeka.ofe@andela.com', false, false),\n    ('Samuel Ocran', 'samuel.ocran@andela.com', false, false),\n    ('Pelumi Aleshinloye', 'pelumi.aleshinloye@andela.com', false, false),\n    ('Oyetunji Adeboye', 'oyetunji.abioye@andela.com', false, false),\n    ('Victor Ajayi', 'victor.ajayi@andela.com', false, false);\n    \n    INSERT INTO weeks(\"tL\", \"qA\", \"teamLead\", \"qualityAssurance\")\n    VALUES (1, 2, 'Odunayo Okebunmi','Tolulope Odueke');";
          _context.next = 4;
          return connectionString.query(query);

        case 4:
          seeder = _context.sent;
          debug(seeder);
          return _context.abrupt("return", connectionString.end());

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          debug(_context.t0);
          _context.next = 14;
          return connectionString.end();

        case 14:
          return _context.abrupt("return", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 9]]);
}))();