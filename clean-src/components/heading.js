"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Heading = void 0;
var _react = _interopRequireDefault(require("react"));
var __jsx = _react["default"].createElement;
var Heading = exports.Heading = function Heading(_ref) {
  var title = _ref.title,
    description = _ref.description,
    icon = _ref.icon,
    _ref$iconColor = _ref.iconColor,
    iconColor = _ref$iconColor === void 0 ? "text-blue-600" : _ref$iconColor,
    _ref$bgColor = _ref.bgColor,
    bgColor = _ref$bgColor === void 0 ? "bg-gradient-to-br from-blue-50 to-purple-50" : _ref$bgColor;
  return __jsx("div", {
    className: "px-6 lg:px-10 py-8 ".concat(bgColor, " rounded-2xl shadow-lg border border-gray-200")
  }, __jsx("div", {
    className: "flex items-center gap-x-6"
  }, __jsx("div", {
    className: "p-4 rounded-xl ".concat(iconColor, " bg-white shadow-lg flex items-center justify-center text-2xl border border-gray-100")
  }, icon), __jsx("div", null, __jsx("h1", {
    className: "text-3xl font-bold text-gray-900 mb-2 tracking-tight"
  }, title), __jsx("p", {
    className: "text-base text-gray-600 font-medium"
  }, description))));
};