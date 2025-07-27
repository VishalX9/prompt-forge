"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBubble = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _remarkGfm = _interopRequireDefault(require("remark-gfm"));
var _reactSyntaxHighlighter = require("react-syntax-highlighter");
var _prism = require("react-syntax-highlighter/dist/esm/styles/prism");
var _utils = require("lib/utils");
var _excluded = ["inline", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
var MessageBubble = exports.MessageBubble = function MessageBubble(_ref) {
  var role = _ref.role,
    content = _ref.content;
  var isUser = role === "user";
  var _useState = (0, _react.useState)(null),
    copied = _useState[0],
    setCopied = _useState[1];
  var extractExplanation = function extractExplanation(text) {
    var _text$split = text.split(":::explanation"),
      _text$split2 = (0, _toArray2["default"])(_text$split),
      mainPart = _text$split2[0],
      rest = _text$split2.slice(1);
    var explanation = rest.length > 0 ? rest.join(":::explanation").trim() : null;
    return {
      main: mainPart.trim(),
      explanation: explanation
    };
  };
  var handleCopy = function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(code, index) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return navigator.clipboard.writeText(code);
          case 3:
            setCopied(index);
            setTimeout(function () {
              return setCopied(null);
            }, 2000);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error("Failed to copy", _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function handleCopy(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return __jsx("div", {
    className: (0, _utils.cn)("w-full py-6 px-6 my-2 mx-auto max-w-4xl rounded-lg border border-neutral-700/50", isUser ? "bg-neutral-900/70" : "bg-neutral-950/70", "hover:bg-neutral-900/90 transition-all duration-300")
  }, __jsx("div", {
    className: "flex gap-4 items-start"
  }, __jsx("div", {
    className: "pt-1 flex-shrink-0"
  }, isUser ? __jsx(_lucideReact.User, {
    className: "w-7 h-7 text-neutral-100"
  }) : __jsx(_lucideReact.Bot, {
    className: "w-7 h-7 text-green-400"
  })), __jsx("div", {
    className: "prose prose-invert max-w-full font-sans text-neutral-200 leading-relaxed"
  }, __jsx(_reactMarkdown["default"], {
    remarkPlugins: [_remarkGfm["default"]],
    components: {
      code: function code(props) {
        var _props$inline = props.inline,
          inline = _props$inline === void 0 ? false : _props$inline,
          className = props.className,
          children = props.children,
          rest = (0, _objectWithoutProperties2["default"])(props, _excluded);
        var match = /language-(\w+)/.exec(className || "");
        var fullCode = String(children).trim();
        var _extractExplanation = extractExplanation(fullCode),
          main = _extractExplanation.main,
          explanation = _extractExplanation.explanation;
        var index = Math.random();
        if (inline) {
          return __jsx("code", (0, _extends2["default"])({
            className: (0, _utils.cn)("bg-neutral-800/70 px-2 py-1 rounded-md text-rose-300 font-mono text-sm", className)
          }, rest), children);
        }
        return __jsx("div", {
          className: "my-4 bg-neutral-900/50 rounded-xl shadow-md overflow-hidden border border-neutral-700/50"
        }, __jsx("div", {
          className: "relative group"
        }, __jsx(_reactSyntaxHighlighter.Prism, {
          language: match ? match[1] : "javascript",
          style: _prism.oneDark,
          PreTag: "div",
          className: "rounded-t-xl text-sm !m-0 !p-5 !bg-neutral-900/80"
        }, main), __jsx("button", {
          onClick: function onClick() {
            return handleCopy(main, index);
          },
          className: "absolute top-3 right-3 text-neutral-200 bg-neutral-800/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-neutral-700/90 hover:text-green-400"
        }, copied === index ? __jsx(_lucideReact.Check, {
          className: "w-5 h-5 text-green-400"
        }) : __jsx(_lucideReact.Copy, {
          className: "w-5 h-5"
        }))), isUser === false && explanation && __jsx("div", {
          className: "p-5 bg-neutral-800/30 border-t border-neutral-700/60 text-neutral-300 text-sm leading-relaxed"
        }, __jsx("span", {
          className: "block font-semibold text-green-400 mb-3 tracking-wide"
        }, "Explanation"), __jsx("div", {
          className: "pl-2 border-l-2 border-green-500/50"
        }, explanation)));
      }
    }
  }, content))));
};