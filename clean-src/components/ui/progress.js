"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("lib/utils");
var __jsx = _react["default"].createElement;
var Progress = exports.Progress = function Progress(_ref) {
  var value = _ref.value,
    className = _ref.className,
    indicatorClassName = _ref.indicatorClassName;
  var percentage = Math.min(100, Math.max(0, value));
  return __jsx("div", {
    className: (0, _utils.cn)("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)
  }, __jsx("div", {
    className: (0, _utils.cn)("h-full w-full flex-1 bg-blue-600 transition-all rounded-full", indicatorClassName),
    style: {
      transform: "translateX(-".concat(100 - percentage, "%)")
    }
  }));
};