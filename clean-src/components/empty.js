"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;
var _react = _interopRequireDefault(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var __jsx = _react["default"].createElement;
var Empty = exports.Empty = function Empty(_ref) {
  var label = _ref.label;
  return __jsx("div", {
    className: "h-full flex flex-col gap-y-4 items-center justify-center"
  }, __jsx("div", {
    className: "relative h-72 w-72"
  }, __jsx(_image["default"], {
    alt: "Empty",
    fill: true,
    src: "/empty.png"
  })), __jsx("p", {
    className: "text-muted-foreground text-sm text-center"
  }, label));
};