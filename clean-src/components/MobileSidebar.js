"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileSidebar = void 0;
var _react = _interopRequireDefault(require("react"));
var _sheet = require("@/components/ui/sheet");
var _button = require("@/components/ui/button");
var _lucideReact = require("lucide-react");
var _sidebar = _interopRequireDefault(require("./sidebar"));
var __jsx = _react["default"].createElement;
var MobileSidebar = exports.MobileSidebar = function MobileSidebar() {
  return __jsx("div", {
    className: "md:hidden p-4 flex items-center bg-gray-900 text-white"
  }, __jsx(_sheet.Sheet, null, __jsx(_sheet.SheetTrigger, {
    asChild: true
  }, __jsx(_button.Button, {
    variant: "ghost",
    size: "icon"
  }, __jsx(_lucideReact.Menu, {
    className: "w-6 h-6"
  }))), __jsx(_sheet.SheetContent, {
    side: "left",
    className: "p-0 bg-gray-900 text-white"
  }, __jsx(_sidebar["default"], null))), __jsx("span", {
    className: "ml-4 font-semibold text-lg"
  }, "Prompt Forge"));
};