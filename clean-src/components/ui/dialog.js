"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var DialogPrimitive = _interopRequireWildcard(require("@radix-ui/react-dialog"));
var _lucideReact = require("lucide-react");
var _utils = require("lib/utils");
var _excluded = ["className"],
  _excluded2 = ["className", "children", "showCloseButton"],
  _excluded3 = ["className"],
  _excluded4 = ["className"],
  _excluded5 = ["className"],
  _excluded6 = ["className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = React.createElement;
function Dialog(_ref) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref), _ref));
  return __jsx(DialogPrimitive.Root, (0, _extends2["default"])({
    "data-slot": "dialog"
  }, props));
}
function DialogTrigger(_ref2) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref2), _ref2));
  return __jsx(DialogPrimitive.Trigger, (0, _extends2["default"])({
    "data-slot": "dialog-trigger"
  }, props));
}
function DialogPortal(_ref3) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref3), _ref3));
  return __jsx(DialogPrimitive.Portal, (0, _extends2["default"])({
    "data-slot": "dialog-portal"
  }, props));
}
function DialogClose(_ref4) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref4), _ref4));
  return __jsx(DialogPrimitive.Close, (0, _extends2["default"])({
    "data-slot": "dialog-close"
  }, props));
}
function DialogOverlay(_ref5) {
  var className = _ref5.className,
    props = (0, _objectWithoutProperties2["default"])(_ref5, _excluded);
  return __jsx(DialogPrimitive.Overlay, (0, _extends2["default"])({
    "data-slot": "dialog-overlay",
    className: (0, _utils.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function DialogContent(_ref6) {
  var className = _ref6.className,
    children = _ref6.children,
    _ref6$showCloseButton = _ref6.showCloseButton,
    showCloseButton = _ref6$showCloseButton === void 0 ? true : _ref6$showCloseButton,
    props = (0, _objectWithoutProperties2["default"])(_ref6, _excluded2);
  return __jsx(DialogPortal, {
    "data-slot": "dialog-portal"
  }, __jsx(DialogOverlay, null), __jsx(DialogPrimitive.Content, (0, _extends2["default"])({
    "data-slot": "dialog-content",
    className: (0, _utils.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
  }, props), children, showCloseButton && __jsx(DialogPrimitive.Close, {
    "data-slot": "dialog-close",
    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  }, __jsx(_lucideReact.XIcon, null), __jsx("span", {
    className: "sr-only"
  }, "Close"))));
}
function DialogHeader(_ref7) {
  var className = _ref7.className,
    props = (0, _objectWithoutProperties2["default"])(_ref7, _excluded3);
  return __jsx("div", (0, _extends2["default"])({
    "data-slot": "dialog-header",
    className: (0, _utils.cn)("flex flex-col gap-2 text-center sm:text-left", className)
  }, props));
}
function DialogFooter(_ref8) {
  var className = _ref8.className,
    props = (0, _objectWithoutProperties2["default"])(_ref8, _excluded4);
  return __jsx("div", (0, _extends2["default"])({
    "data-slot": "dialog-footer",
    className: (0, _utils.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)
  }, props));
}
function DialogTitle(_ref9) {
  var className = _ref9.className,
    props = (0, _objectWithoutProperties2["default"])(_ref9, _excluded5);
  return __jsx(DialogPrimitive.Title, (0, _extends2["default"])({
    "data-slot": "dialog-title",
    className: (0, _utils.cn)("text-lg leading-none font-semibold", className)
  }, props));
}
function DialogDescription(_ref0) {
  var className = _ref0.className,
    props = (0, _objectWithoutProperties2["default"])(_ref0, _excluded6);
  return __jsx(DialogPrimitive.Description, (0, _extends2["default"])({
    "data-slot": "dialog-description",
    className: (0, _utils.cn)("text-muted-foreground text-sm", className)
  }, props));
}