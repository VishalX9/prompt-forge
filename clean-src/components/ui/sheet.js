"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sheet = Sheet;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var SheetPrimitive = _interopRequireWildcard(require("@radix-ui/react-dialog"));
var _lucideReact = require("lucide-react");
var _reactVisuallyHidden = require("@radix-ui/react-visually-hidden");
var _utils = require("lib/utils");
var _excluded = ["className"],
  _excluded2 = ["className", "children", "side"],
  _excluded3 = ["className"],
  _excluded4 = ["className"],
  _excluded5 = ["className"],
  _excluded6 = ["className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = React.createElement;
function Sheet(_ref) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref), _ref));
  return __jsx(SheetPrimitive.Root, (0, _extends2["default"])({
    "data-slot": "sheet"
  }, props));
}
function SheetTrigger(_ref2) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref2), _ref2));
  return __jsx(SheetPrimitive.Trigger, (0, _extends2["default"])({
    "data-slot": "sheet-trigger"
  }, props));
}
function SheetClose(_ref3) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref3), _ref3));
  return __jsx(SheetPrimitive.Close, (0, _extends2["default"])({
    "data-slot": "sheet-close"
  }, props));
}
function SheetPortal(_ref4) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref4), _ref4));
  return __jsx(SheetPrimitive.Portal, (0, _extends2["default"])({
    "data-slot": "sheet-portal"
  }, props));
}
function SheetOverlay(_ref5) {
  var className = _ref5.className,
    props = (0, _objectWithoutProperties2["default"])(_ref5, _excluded);
  return __jsx(SheetPrimitive.Overlay, (0, _extends2["default"])({
    "data-slot": "sheet-overlay",
    className: (0, _utils.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
  }, props));
}
function SheetContent(_ref6) {
  var className = _ref6.className,
    children = _ref6.children,
    _ref6$side = _ref6.side,
    side = _ref6$side === void 0 ? "right" : _ref6$side,
    props = (0, _objectWithoutProperties2["default"])(_ref6, _excluded2);
  return __jsx(SheetPortal, null, __jsx(SheetOverlay, null), __jsx(SheetPrimitive.Content, (0, _extends2["default"])({
    "data-slot": "sheet-content",
    className: (0, _utils.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", className)
  }, props), __jsx(_reactVisuallyHidden.Root, null, __jsx(SheetTitle, null, "Side Panel")), children, __jsx(SheetPrimitive.Close, {
    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
  }, __jsx(_lucideReact.XIcon, {
    className: "size-4"
  }), __jsx("span", {
    className: "sr-only"
  }, "Close"))));
}
function SheetHeader(_ref7) {
  var className = _ref7.className,
    props = (0, _objectWithoutProperties2["default"])(_ref7, _excluded3);
  return __jsx("div", (0, _extends2["default"])({
    "data-slot": "sheet-header",
    className: (0, _utils.cn)("flex flex-col gap-1.5 p-4", className)
  }, props));
}
function SheetFooter(_ref8) {
  var className = _ref8.className,
    props = (0, _objectWithoutProperties2["default"])(_ref8, _excluded4);
  return __jsx("div", (0, _extends2["default"])({
    "data-slot": "sheet-footer",
    className: (0, _utils.cn)("mt-auto flex flex-col gap-2 p-4", className)
  }, props));
}
function SheetTitle(_ref9) {
  var className = _ref9.className,
    props = (0, _objectWithoutProperties2["default"])(_ref9, _excluded5);
  return __jsx(SheetPrimitive.Title, (0, _extends2["default"])({
    "data-slot": "sheet-title",
    className: (0, _utils.cn)("text-foreground font-semibold", className)
  }, props));
}
function SheetDescription(_ref0) {
  var className = _ref0.className,
    props = (0, _objectWithoutProperties2["default"])(_ref0, _excluded6);
  return __jsx(SheetPrimitive.Description, (0, _extends2["default"])({
    "data-slot": "sheet-description",
    className: (0, _utils.cn)("text-muted-foreground text-sm", className)
  }, props));
}