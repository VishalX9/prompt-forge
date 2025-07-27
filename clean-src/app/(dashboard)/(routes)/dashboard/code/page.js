"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
var _react = _interopRequireWildcard(require("react"));
var _navigation = require("next/navigation");
var _lucideReact = require("lucide-react");
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _remarkGfm = _interopRequireDefault(require("remark-gfm"));
var _reactSyntaxHighlighter = require("react-syntax-highlighter");
var _prism = require("react-syntax-highlighter/dist/esm/styles/prism");
var _excluded = ["inline", "className", "children"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
var cn = function cn() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(" ");
};
var validateForm = function validateForm(prompt) {
  return prompt.trim().length > 0;
};
var MessageBubble = function MessageBubble(_ref) {
  var content = _ref.content,
    role = _ref.role,
    timestamp = _ref.timestamp;
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
    className: cn("w-full py-4 px-6 my-3 mx-auto max-w-3xl rounded-lg border", isUser ? "bg-[var(--page-background)] border-blue-200" : "bg-white/90 border-gray-200", "shadow-sm hover:shadow-md transition-all duration-300")
  }, __jsx("div", {
    className: "flex gap-4 items-start"
  }, __jsx("div", {
    className: "pt-1 flex-shrink-0"
  }, isUser ? __jsx(_lucideReact.User, {
    className: "w-6 h-6 text-blue-600"
  }) : __jsx(_lucideReact.Bot, {
    className: "w-6 h-6 text-green-600"
  })), __jsx("div", {
    className: "flex-1 overflow-hidden"
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
            className: cn("bg-gray-100 px-1.5 py-0.5 rounded-md text-red-600 font-mono text-sm break-all", className)
          }, rest), children);
        }
        return __jsx("div", {
          className: "my-4 bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200"
        }, __jsx("div", {
          className: "relative group"
        }, __jsx(_reactSyntaxHighlighter.Prism, {
          language: match ? match[1] : "javascript",
          style: _prism.oneLight,
          PreTag: "div",
          className: "rounded-t-xl text-sm !m-0 !p-4 !bg-gray-50 overflow-x-auto",
          wrapLines: true,
          wrapLongLines: true
        }, main), __jsx("button", {
          onClick: function onClick() {
            return handleCopy(main, index);
          },
          className: "absolute top-3 right-3 text-gray-600 bg-gray-200/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-300 hover:text-green-600"
        }, copied === index ? __jsx(_lucideReact.Check, {
          className: "w-5 h-5 text-green-600"
        }) : __jsx(_lucideReact.Copy, {
          className: "w-5 h-5"
        }))), isUser === false && explanation && __jsx("div", {
          className: "p-4 bg-white/80 border-t border-gray-200 text-gray-700 text-sm leading-relaxed"
        }, __jsx("span", {
          className: "block font-semibold text-green-600 mb-2 tracking-wide"
        }, "Explanation"), __jsx("div", {
          className: "pl-3 border-l-2 border-green-500/50 break-words"
        }, explanation)));
      },
      p: function p(_ref3) {
        var children = _ref3.children;
        return __jsx("p", {
          className: "break-words leading-relaxed"
        }, children);
      }
    }
  }, content), __jsx("div", {
    className: "mt-2 text-right text-xs text-gray-500"
  }, timestamp))));
};
var CodePage = function CodePage() {
  var _useState2 = (0, _react.useState)([]),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    prompt = _useState3[0],
    setPrompt = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var router = (0, _navigation.useRouter)();
  var onSubmit = function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(e) {
      var userMessage, response, data, assistantMessage, errorMessage;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            if (validateForm(prompt)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return");
          case 3:
            setIsLoading(true);
            _context2.prev = 4;
            userMessage = {
              id: Date.now().toString(),
              content: prompt,
              role: "user",
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [userMessage]);
            });
            _context2.next = 9;
            return fetch("/api/code", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                messages: [].concat((0, _toConsumableArray2["default"])(messages), [userMessage])
              })
            });
          case 9:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 12;
              break;
            }
            throw new Error("Failed to get response");
          case 12:
            _context2.next = 14;
            return response.json();
          case 14:
            data = _context2.sent;
            assistantMessage = {
              id: (Date.now() + 1).toString(),
              content: data.content || data.message || "No response received",
              role: "assistant",
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [assistantMessage]);
            });
            setPrompt("");
            _context2.next = 25;
            break;
          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](4);
            console.error("Error:", _context2.t0);
            errorMessage = {
              id: (Date.now() + 1).toString(),
              content: "Sorry, something went wrong. Please try again.",
              role: "assistant",
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [errorMessage]);
            });
          case 25:
            _context2.prev = 25;
            setIsLoading(false);
            router.refresh();
            return _context2.finish(25);
          case 29:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 20, 25, 29]]);
    }));
    return function onSubmit(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  var hasMessages = messages.length > 0;
  return __jsx("div", {
    className: "min-h-screen",
    "data-color": "blue"
  }, __jsx("div", {
    className: "fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]",
    style: {
      backgroundColor: "var(--page-background)"
    }
  }), !hasMessages && __jsx("div", {
    className: "relative px-4 lg:px-10 py-10"
  }, __jsx("div", {
    className: "flex items-center justify-between p-6 bg-white/80 border border-blue-200 rounded-xl shadow-sm backdrop-blur-sm"
  }, __jsx("div", {
    className: "flex items-center gap-4"
  }, __jsx("div", {
    className: "p-3 bg-white rounded-lg shadow-sm"
  }, __jsx(_lucideReact.Code, {
    className: "w-7 h-7 text-green-600"
  })), __jsx("div", null, __jsx("h1", {
    className: "text-2xl font-bold text-gray-800"
  }, "Code Generation"), __jsx("p", {
    className: "text-gray-600"
  }, "Advanced AI-powered coding assistant and code generator."))), __jsx("button", {
    className: "p-2 bg-[var(--page-background)] rounded-lg hover:bg-white/50 transition-colors"
  }, __jsx(_lucideReact.User, {
    className: "w-6 h-6 text-blue-600"
  })))), __jsx("div", {
    className: "relative px-4 lg:px-10 pb-10"
  }, !hasMessages ? __jsx("div", {
    className: "flex flex-col items-center justify-center min-h-[60vh] space-y-10"
  }, __jsx("div", {
    className: "text-center space-y-6"
  }, __jsx("div", {
    className: "relative"
  }, __jsx("div", {
    className: "w-24 h-24 mx-auto bg-[var(--page-background)] rounded-2xl flex items-center justify-center border border-blue-200 shadow-md backdrop-blur-sm"
  }, __jsx(_lucideReact.Terminal, {
    className: "w-12 h-12 text-green-600"
  })), __jsx("div", {
    className: "absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md"
  }, __jsx("div", {
    className: "w-2 h-2 bg-white rounded-full animate-pulse"
  }))), __jsx("h2", {
    className: "text-3xl font-bold text-gray-800"
  }, "Code Assistant Ready"), __jsx("p", {
    className: "text-gray-600 max-w-md mx-auto text-lg"
  }, "Generate, debug, explain, and optimize code in any language.")), __jsx("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl w-full px-4"
  }, [{
    title: "Generate Code",
    icon: __jsx(_lucideReact.Zap, {
      className: "w-5 h-5 text-green-600"
    }),
    bg: "bg-[var(--page-background)]",
    desc: "Create functions, classes, or applications from scratch"
  }, {
    title: "Debug & Fix",
    icon: __jsx(_lucideReact.Code, {
      className: "w-5 h-5 text-red-600"
    }),
    bg: "bg-[var(--page-background)]",
    desc: "Find and fix bugs, optimize performance"
  }, {
    title: "Explain Code",
    icon: __jsx(_lucideReact.Terminal, {
      className: "w-5 h-5 text-purple-600"
    }),
    bg: "bg-[var(--page-background)]",
    desc: "Understand complex algorithms and logic"
  }, {
    title: "Code Review",
    icon: __jsx(_lucideReact.Code, {
      className: "w-5 h-5 text-yellow-600"
    }),
    bg: "bg-[var(--page-background)]",
    desc: "Get best practices, tips, and improvements"
  }].map(function (_ref5) {
    var title = _ref5.title,
      icon = _ref5.icon,
      bg = _ref5.bg,
      desc = _ref5.desc;
    return __jsx("div", {
      key: title,
      className: "group p-5 bg-white/80 rounded-xl border border-blue-200 hover:border-blue-400 backdrop-blur-sm shadow transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-xl"
    }, __jsx("div", {
      className: "flex items-center gap-3 mb-2"
    }, __jsx("div", {
      className: "p-2 rounded-lg ".concat(bg)
    }, icon), __jsx("h3", {
      className: "font-semibold text-gray-800"
    }, title)), __jsx("p", {
      className: "text-sm text-gray-600 group-hover:text-gray-700 transition"
    }, desc));
  }))) : __jsx("div", {
    className: "space-y-6 max-w-6xl mx-auto"
  }, __jsx("div", {
    className: "bg-white/80 rounded-xl p-4 border border-blue-200 backdrop-blur-sm shadow"
  }, __jsx("div", {
    className: "flex items-center justify-between"
  }, __jsx("div", {
    className: "flex items-center gap-3"
  }, __jsx("div", {
    className: "p-2 bg-[var(--page-background)] rounded-lg"
  }, __jsx(_lucideReact.Terminal, {
    className: "w-5 h-5 text-blue-600"
  })), __jsx("div", null, __jsx("h1", {
    className: "text-lg font-semibold text-gray-800"
  }, "Coding Session"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, messages.length, " exchanges"))), __jsx("div", {
    className: "flex items-center gap-2"
  }, __jsx("div", {
    className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
  }), __jsx("span", {
    className: "text-xs text-gray-600"
  }, "Active")))), __jsx("div", {
    className: "space-y-1"
  }, messages.map(function (msg) {
    return __jsx(MessageBubble, {
      key: msg.id,
      content: msg.content,
      role: msg.role,
      timestamp: msg.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });
  }))), __jsx("div", {
    className: "".concat(hasMessages ? "mt-8 max-w-6xl" : "max-w-3xl", " mx-auto")
  }, __jsx("div", {
    className: "bg-white/90 border border-blue-200 p-5 rounded-xl shadow-xl backdrop-blur-sm"
  }, __jsx("form", {
    onSubmit: onSubmit,
    className: "flex items-end gap-4"
  }, __jsx("div", {
    className: "flex-1"
  }, __jsx("input", {
    value: prompt,
    onChange: function onChange(e) {
      return setPrompt(e.target.value);
    },
    placeholder: hasMessages ? "Ask about code, debugging, explanations..." : "Generate a Python function to sort a list...",
    disabled: isLoading,
    className: "w-full h-14 text-base bg-gray-50 text-gray-800 border border-gray-300 rounded-xl px-4 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition outline-none"
  })), __jsx("button", {
    type: "submit",
    disabled: isLoading || !validateForm(prompt),
    className: "h-14 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  }, isLoading ? __jsx(_react["default"].Fragment, null, __jsx("div", {
    className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
  }), "Processing...") : __jsx(_react["default"].Fragment, null, __jsx(_lucideReact.Send, {
    className: "w-5 h-5"
  }), "Execute")))))));
};
var _default = exports["default"] = CodePage;