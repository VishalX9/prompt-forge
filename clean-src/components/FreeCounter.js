"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeCounter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constant = require("constant");
var _progress = require("./ui/progress");
var _button = require("./ui/button");
var _lucideReact = require("lucide-react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
var FreeCounter = exports.FreeCounter = function FreeCounter(_ref) {
  var _ref$apiLimitCount = _ref.apiLimitCount,
    apiLimitCount = _ref$apiLimitCount === void 0 ? 0 : _ref$apiLimitCount,
    _ref$isPro = _ref.isPro,
    isPro = _ref$isPro === void 0 ? false : _ref$isPro;
  var _useState = (0, _react.useState)(false),
    mounted = _useState[0],
    setMounted = _useState[1];
  (0, _react.useEffect)(function () {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (isPro) return null;
  return __jsx("div", {
    className: "px-3"
  }, __jsx("div", {
    className: "bg-white/10 p-4 rounded-lg"
  }, __jsx("div", {
    className: "flex items-center justify-between mb-2"
  }, __jsx("p", {
    className: "text-sm text-white font-medium"
  }, _constant.MAX_FREE_COUNTS - apiLimitCount, " / ", _constant.MAX_FREE_COUNTS, " Free Generations"), __jsx(_button.Button, {
    variant: "premium",
    size: "sm"
  }, "Upgrade", __jsx(_lucideReact.Zap, {
    className: "w-4 h-4 ml-2 fill-white"
  }))), __jsx(_progress.Progress, {
    value: apiLimitCount / _constant.MAX_FREE_COUNTS * 100,
    className: "h-2 bg-gray-700",
    indicatorClassName: "bg-gradient-to-r from-cyan-500 to-blue-500"
  })));
};