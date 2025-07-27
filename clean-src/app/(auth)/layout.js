"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AuthLayout;
var _react = _interopRequireDefault(require("react"));
var __jsx = _react["default"].createElement;
function AuthLayout(_ref) {
  var children = _ref.children;
  return __jsx("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5"
    }
  }, children);
}