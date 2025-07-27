"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
var _image = _interopRequireDefault(require("next/image"));
var _link = _interopRequireDefault(require("next/link"));
var _nextjs = require("@clerk/nextjs");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
var routes = [{
  label: "Dashboard",
  icon: _lucideReact.LayoutDashboard,
  href: "/dashboard",
  color: "text-sky-500"
}, {
  label: "Conversation",
  icon: _lucideReact.MessageSquare,
  href: "/dashboard/conversation",
  color: "text-cyan-400"
}, {
  label: "Image Generation",
  icon: _lucideReact.ImageIcon,
  href: "/dashboard/image",
  color: "text-sky-400"
}, {
  label: "Emoji Generation",
  icon: _lucideReact.Smile,
  href: "/dashboard/emoji",
  color: "text-cyan-500"
}, {
  label: "Code Generation",
  icon: _lucideReact.CodeIcon,
  href: "/dashboard/code",
  color: "text-sky-500"
}, {
  label: "Settings",
  icon: _lucideReact.Settings2Icon,
  href: "/dashboard/settings",
  color: "text-cyan-400"
}];
var Sidebar = function Sidebar() {
  var _useState = (0, _react.useState)(false),
    isMounted = _useState[0],
    setIsMounted = _useState[1];
  var _useAuth = (0, _nextjs.useAuth)(),
    userId = _useAuth.userId;
  (0, _react.useEffect)(function () {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return __jsx("div", {
    className: "space-y-4 py-4 flex flex-col h-full bg-[#2a3140] text-white"
  }, __jsx("div", {
    className: "px-3 py-2 flex-1"
  }, __jsx(_link["default"], {
    href: "/dashboard",
    className: "flex items-center pl-3 mb-14"
  }, __jsx("div", {
    className: "relative w-8 h-8 mr-4"
  }, __jsx(_image["default"], {
    src: "/logo.png",
    alt: "logo",
    fill: true,
    className: "object-contain"
  })), __jsx("span", {
    className: "text-lg font-semibold font-sans"
  }, "Prompt Forge")), __jsx("div", {
    className: "space-y-1"
  }, routes.map(function (route) {
    return __jsx(_link["default"], {
      key: route.href,
      href: route.href,
      className: "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
    }, __jsx("div", {
      className: "flex items-center flex-1"
    }, __jsx(route.icon, {
      className: "".concat(route.color, " group-hover:text-white h-5 w-5 mr-3 transition-colors")
    }), route.label));
  }))));
};
var _default = exports["default"] = Sidebar;