"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _link = _interopRequireDefault(require("next/link"));
var _lucideReact = require("lucide-react");
var __jsx = _react["default"].createElement;
var LandingPage = function LandingPage() {
  var features = [{
    icon: _lucideReact.Image,
    title: "Image Generation",
    description: "Transform your ideas into stunning visuals with AI-powered image creation",
    gradient: "from-slate-500 to-sky-700"
  }, {
    icon: _lucideReact.Code,
    title: "Code Generation",
    description: "Generate clean, efficient code in any programming language instantly",
    gradient: "from-gray-600 to-cyan-600"
  }, {
    icon: _lucideReact.MessageCircle,
    title: "Smart Conversation",
    description: "Engage in intelligent conversations with context-aware AI assistance",
    gradient: "from-slate-400 to-sky-600"
  }, {
    icon: _lucideReact.Zap,
    title: "Advanced AI Tools",
    description: "Access cutting-edge AI capabilities for complex problem-solving",
    gradient: "from-gray-700 to-cyan-700"
  }];
  return __jsx("div", {
    className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
  }, __jsx("section", {
    className: "px-6 pt-20 pb-20 text-center"
  }, __jsx("div", {
    className: "max-w-4xl mx-auto"
  }, __jsx("img", {
    src: "/logo.png",
    alt: "Prompt Forge Logo",
    className: "mx-auto mb-8 w-40 h-40 object-contain"
  }), __jsx("h2", {
    className: "text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-sky-800 to-cyan-700 bg-clip-text text-transparent leading-tight"
  }, "Forge the Future with AI"), __jsx("p", {
    className: "text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
  }, "Unleash your creativity with our powerful AI toolkit. Generate images, write code, have conversations, and solve complex problems\u2014all in one place."), __jsx("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center items-center"
  }, __jsx(_link["default"], {
    href: "/sign-up"
  }, __jsx("button", {
    className: "px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl flex items-center space-x-2"
  }, __jsx("span", null, "Start Creating"), __jsx(_lucideReact.ArrowRight, {
    className: "w-5 h-5"
  }))), __jsx(_link["default"], {
    href: "/sign-in"
  }, __jsx("button", {
    className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-lg"
  }, "Login to Continue"))))), __jsx("section", {
    className: "px-6 py-20 bg-white/50"
  }, __jsx("div", {
    className: "max-w-6xl mx-auto"
  }, __jsx("h3", {
    className: "text-4xl font-bold text-center mb-16 text-gray-900"
  }, "Everything You Need to Create"), __jsx("div", {
    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8"
  }, features.map(function (feature, index) {
    var Icon = feature.icon;
    return __jsx("div", {
      key: index,
      className: "p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2"
    }, __jsx("div", {
      className: "w-12 h-12 rounded-xl bg-gradient-to-r ".concat(feature.gradient, " flex items-center justify-center mb-4")
    }, __jsx(Icon, {
      className: "w-6 h-6 text-white"
    })), __jsx("h4", {
      className: "text-xl font-semibold mb-2 text-gray-900"
    }, feature.title), __jsx("p", {
      className: "text-gray-600 leading-relaxed"
    }, feature.description));
  })))), __jsx("section", {
    className: "px-6 py-20"
  }, __jsx("div", {
    className: "max-w-4xl mx-auto text-center"
  }, __jsx("h3", {
    className: "text-4xl font-bold mb-12 text-gray-900"
  }, "Why Choose Prompt Forge?"), __jsx("div", {
    className: "grid md:grid-cols-3 gap-8"
  }, [{
    title: "Lightning Fast",
    description: "Get results in seconds, not hours"
  }, {
    title: "Professional Quality",
    description: "Enterprise-grade AI for exceptional output"
  }, {
    title: "All-in-One Platform",
    description: "Everything you need in a single interface"
  }].map(function (benefit, index) {
    return __jsx("div", {
      key: index,
      className: "flex flex-col items-center p-6"
    }, __jsx("div", {
      className: "w-16 h-16 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-full flex items-center justify-center mb-4"
    }, __jsx(_lucideReact.CheckCircle, {
      className: "w-8 h-8 text-white"
    })), __jsx("h4", {
      className: "text-xl font-semibold mb-2 text-gray-900"
    }, benefit.title), __jsx("p", {
      className: "text-gray-600"
    }, benefit.description));
  })))), __jsx("section", {
    className: "px-6 py-20 bg-gradient-to-r from-gray-900 to-sky-900"
  }, __jsx("div", {
    className: "max-w-4xl mx-auto text-center text-white"
  }, __jsx("h3", {
    className: "text-4xl font-bold mb-6"
  }, "Ready to Transform Your Ideas?"), __jsx("p", {
    className: "text-xl mb-8 opacity-90"
  }, "Join thousands of creators, developers, and innovators using Prompt Forge"), __jsx(_link["default"], {
    href: "/sign-up"
  }, __jsx("button", {
    className: "px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl"
  }, "Get Started for Free")))), __jsx("footer", {
    className: "px-6 py-12 bg-gray-900 text-white"
  }, __jsx("div", {
    className: "max-w-6xl mx-auto text-center"
  }, __jsx("div", {
    className: "flex items-center justify-center space-x-2 mb-4"
  }, __jsx("div", {
    className: "w-8 h-8 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-lg flex items-center justify-center"
  }, __jsx(_lucideReact.Sparkles, {
    className: "w-5 h-5 text-white"
  })), __jsx("h1", {
    className: "text-2xl font-bold"
  }, "Prompt Forge")), __jsx("p", {
    className: "text-gray-400"
  }, "Empowering creativity through artificial intelligence"), __jsx("p", {
    className: "text-white"
  }, " Created By-Vishal Jaiswal"))));
};
var _default = exports["default"] = LandingPage;