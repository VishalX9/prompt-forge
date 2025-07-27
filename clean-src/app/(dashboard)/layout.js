"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sidebar = _interopRequireDefault(require("@/components/sidebar"));
var _server = require("@clerk/nextjs/server");
var _MobileSidebar = require("@/components/MobileSidebar");
var __jsx = _react["default"].createElement;
var DashboardLayout = function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(_ref) {
    var children, session, userId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          children = _ref.children;
          _context.next = 3;
          return (0, _server.auth)();
        case 3:
          session = _context.sent;
          userId = session.userId;
          return _context.abrupt("return", __jsx("div", {
            className: "h-full relative"
          }, __jsx("div", {
            className: "hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900"
          }, __jsx(_sidebar["default"], null)), __jsx("div", {
            className: "md:hidden"
          }, __jsx(_MobileSidebar.MobileSidebar, null)), __jsx("div", {
            className: "md:pl-72"
          }, __jsx("main", null, children))));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function DashboardLayout(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = DashboardLayout;