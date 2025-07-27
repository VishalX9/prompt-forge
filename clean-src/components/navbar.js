"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _lucideReact = require("lucide-react");
var _nextjs = require("@clerk/nextjs");
var _button = require("@/components/ui/button");
var __jsx = _react["default"].createElement;
var Navbar = function Navbar() {
  var handleToggle = function handleToggle() {
    console.log("Toggle clicked");
  };
  return __jsx("div", {
    className: "flex items-center justify-between p-4 bg-[#0f172a] text-white shadow-sm sticky top-0 z-50"
  }, __jsx(_button.Button, {
    variant: "ghost",
    size: "icon",
    className: "md:hidden text-white",
    onClick: handleToggle
  }, __jsx(_lucideReact.Menu, null)), __jsx(_nextjs.UserButton, {
    afterSignOutUrl: "/"
  }));
};
var _default = exports["default"] = Navbar;