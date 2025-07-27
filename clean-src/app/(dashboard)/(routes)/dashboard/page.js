"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _lucideReact = require("lucide-react");
var _card = require("@/components/ui/card");
var _utils = require("lib/utils");
var _navigation = require("next/navigation");
var __jsx = _react["default"].createElement;
var tools = [{
  label: "Conversation",
  icon: _lucideReact.MessageSquare,
  color: "text-violet-500",
  bgColor: "bg-violet-500/10",
  href: "/dashboard/conversation"
}, {
  label: "Image Generation",
  icon: _lucideReact.Image,
  color: "text-pink-700",
  bgColor: "bg-pink-700/10",
  href: "/dashboard/image"
}, {
  label: "Emoji Generation",
  icon: _lucideReact.Smile,
  color: "text-orange-700",
  bgColor: "bg-orange-700/10",
  href: "/dashboard/emoji"
}, {
  label: "Code Generation",
  icon: _lucideReact.Code,
  color: "text-green-700",
  bgColor: "bg-green-700/10",
  href: "/dashboard/code"
}];
var DashboardPage = function DashboardPage() {
  var router = (0, _navigation.useRouter)();
  return __jsx("div", null, __jsx("div", {
    className: "mb-6 space-y-2"
  }, __jsx("h2", {
    className: "text-2xl md:text-4xl font-bold text-center"
  }, "Explore the power of AI"), __jsx("p", {
    className: "text-muted-foreground font-light text-sm md:text-lg text-center"
  }, "Chat with the smartest AI - Experience the power of AI")), __jsx("div", {
    className: "px-4 md:px-20 lg:px-32 space-y-6"
  }, tools.map(function (tool) {
    return __jsx(_card.Card, {
      onClick: function onClick() {
        return router.push(tool.href);
      },
      key: tool.href,
      className: "p-3 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
    }, __jsx("div", {
      className: "flex items-center gap-x-3"
    }, __jsx("div", {
      className: (0, _utils.cn)("p-2 w-fit rounded-md", tool.bgColor)
    }, __jsx(tool.icon, {
      className: (0, _utils.cn)("w-7 h-7", tool.color)
    })), __jsx("div", {
      className: "flex items-center gap-1 font-semibold"
    }, tool.label, __jsx(_lucideReact.ArrowRight, {
      className: "w-4 h-4"
    }))));
  })));
};
var _default = exports["default"] = DashboardPage;