"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;
var _react = _interopRequireDefault(require("react"));
var _image = _interopRequireDefault(require("next/image"));
var __jsx = _react["default"].createElement;
var Loader = exports.Loader = function Loader() {
  return __jsx("div", {
    className: "h-full flex flex-col gap-y-4 items-center justify-center"
  }, __jsx("div", {
    className: "w-10 h-10 relative animate-spin"
  }, __jsx(_image["default"], {
    alt: "logo",
    fill: true,
    src: "/logo.png"
  })), __jsx("p", {
    className: "text-sm text-muted-foreground"
  }, "Prompt Forge is thinking..."));
};