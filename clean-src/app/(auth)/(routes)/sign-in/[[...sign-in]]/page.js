"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Page;
var _react = _interopRequireDefault(require("react"));
var _nextjs = require("@clerk/nextjs");
var __jsx = _react["default"].createElement;
function Page() {
  return __jsx(_nextjs.SignIn, null);
}