"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _nextjs = require("@clerk/nextjs");
var __jsx = _react["default"].createElement;
var SettingsPage = function SettingsPage() {
  return __jsx("div", {
    className: "flex justify-center pt-10"
  }, __jsx(_nextjs.UserProfile, {
    routing: "hash"
  }));
};
var _default = exports["default"] = SettingsPage;