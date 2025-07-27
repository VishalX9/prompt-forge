"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lucideReact = require("lucide-react");
var _reactHookForm = require("react-hook-form");
var _zod = require("@hookform/resolvers/zod");
var _heading = require("@/components/heading");
var _constants = require("./constants");
var _form = require("@/components/ui/form");
var _input = require("@/components/ui/input");
var _button = require("@/components/ui/button");
var _navigation = require("next/navigation");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
var ConversationPage = function ConversationPage() {
  var _useState = (0, _react.useState)([]),
    messages = _useState[0],
    setMessages = _useState[1];
  var form = (0, _reactHookForm.useForm)({
    resolver: (0, _zod.zodResolver)(_constants.formSchema),
    defaultValues: {
      prompt: ""
    }
  });
  var router = (0, _navigation.useRouter)();
  var isLoading = form.formState.isSubmitting;
  var onSubmit = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(values) {
      var userMessage, response, data, assistantMessage, errorMessage;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userMessage = {
              id: Date.now().toString(),
              content: values.prompt,
              role: 'user',
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [userMessage]);
            });
            _context.next = 5;
            return fetch('/api/conversation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                prompt: values.prompt,
                history: messages
              })
            });
          case 5:
            response = _context.sent;
            if (response.ok) {
              _context.next = 8;
              break;
            }
            throw new Error('Failed to get response');
          case 8:
            _context.next = 10;
            return response.json();
          case 10:
            data = _context.sent;
            assistantMessage = {
              id: (Date.now() + 1).toString(),
              content: data.content || data.message || 'No response received',
              role: 'assistant',
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [assistantMessage]);
            });
            form.reset();
            router.refresh();
            _context.next = 22;
            break;
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.error('Error:', _context.t0);
            errorMessage = {
              id: (Date.now() + 1).toString(),
              content: 'Sorry, something went wrong. Please try again.',
              role: 'assistant',
              timestamp: new Date()
            };
            setMessages(function (prev) {
              return [].concat((0, _toConsumableArray2["default"])(prev), [errorMessage]);
            });
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 17]]);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var hasMessages = messages.length > 0;
  return __jsx("div", {
    className: "min-h-screen bg-gray-50"
  }, !hasMessages && __jsx("div", {
    className: "px-4 lg:px-10 py-8"
  }, __jsx(_heading.Heading, {
    title: "Conversation",
    description: "Our most advanced conversation model.",
    icon: __jsx(_lucideReact.MessageSquare, {
      className: "w-7 h-7"
    }),
    iconColor: "text-violet-600",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50"
  })), __jsx("div", {
    className: "px-4 lg:px-10 pb-6"
  }, !hasMessages ? __jsx("div", {
    className: "flex flex-col items-center justify-center min-h-[60vh] space-y-8"
  }, __jsx("div", {
    className: "text-center space-y-4"
  }, __jsx("div", {
    className: "w-20 h-20 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center"
  }, __jsx(_lucideReact.MessageSquare, {
    className: "w-10 h-10 text-violet-600"
  })), __jsx("h2", {
    className: "text-2xl font-semibold text-gray-900"
  }, "Start a conversation"), __jsx("p", {
    className: "text-gray-600 max-w-md mx-auto"
  }, "Ask me anything! I'm here to help with questions, creative tasks, analysis, and more.")), __jsx("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
  }, __jsx("div", {
    className: "p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer"
  }, __jsx("h3", {
    className: "font-medium text-gray-900 mb-2"
  }, "\uD83D\uDCA1 Creative Writing"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, "Help me write a story, poem, or creative content")), __jsx("div", {
    className: "p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer"
  }, __jsx("h3", {
    className: "font-medium text-gray-900 mb-2"
  }, "\uD83D\uDD0D Analysis & Research"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, "Analyze data, research topics, or solve problems")), __jsx("div", {
    className: "p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer"
  }, __jsx("h3", {
    className: "font-medium text-gray-900 mb-2"
  }, "\uD83D\uDCBB Code & Tech"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, "Write code, debug, or explain technical concepts")), __jsx("div", {
    className: "p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer"
  }, __jsx("h3", {
    className: "font-medium text-gray-900 mb-2"
  }, "\uD83D\uDCDA Learning & Education"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, "Explain concepts, help with homework, or teach new skills")))) : __jsx("div", {
    className: "space-y-6 max-w-4xl mx-auto"
  }, __jsx("div", {
    className: "bg-white rounded-xl p-4 shadow-sm border border-gray-200"
  }, __jsx("div", {
    className: "flex items-center gap-3"
  }, __jsx("div", {
    className: "p-2 bg-violet-100 rounded-lg"
  }, __jsx(_lucideReact.MessageSquare, {
    className: "w-5 h-5 text-violet-600"
  })), __jsx("div", null, __jsx("h1", {
    className: "text-lg font-semibold text-gray-900"
  }, "Conversation"), __jsx("p", {
    className: "text-sm text-gray-600"
  }, messages.length, " messages")))), __jsx("div", {
    className: "space-y-4"
  }, messages.map(function (message) {
    return __jsx("div", {
      key: message.id,
      className: "flex gap-4 ".concat(message.role === 'user' ? 'justify-end' : 'justify-start')
    }, message.role === 'assistant' && __jsx("div", {
      className: "flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center"
    }, __jsx(_lucideReact.Bot, {
      className: "w-4 h-4 text-violet-600"
    })), __jsx("div", {
      className: "max-w-[70%] rounded-2xl px-4 py-3 ".concat(message.role === 'user' ? 'bg-violet-600 text-white rounded-br-md' : 'bg-white text-gray-900 border border-gray-200 shadow-sm rounded-bl-md')
    }, __jsx("p", {
      className: "text-sm leading-relaxed whitespace-pre-wrap"
    }, message.content), __jsx("p", {
      className: "text-xs mt-2 ".concat(message.role === 'user' ? 'text-violet-200' : 'text-gray-500')
    }, message.timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }))), message.role === 'user' && __jsx("div", {
      className: "flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
    }, __jsx(_lucideReact.User, {
      className: "w-4 h-4 text-gray-600"
    })));
  }))), __jsx("div", {
    className: "".concat(hasMessages ? 'mt-8 max-w-4xl mx-auto' : 'max-w-2xl mx-auto')
  }, __jsx("div", {
    className: "bg-white border border-gray-200 p-4 rounded-2xl shadow-lg"
  }, __jsx(_form.Form, form, __jsx("form", {
    onSubmit: form.handleSubmit(onSubmit),
    className: "flex gap-3 items-end"
  }, __jsx(_form.FormField, {
    name: "prompt",
    render: function render(_ref2) {
      var field = _ref2.field;
      return __jsx(_form.FormItem, {
        className: "flex-1"
      }, __jsx(_form.FormControl, null, __jsx(_input.Input, (0, _extends2["default"])({
        className: "bg-gray-50 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500 h-12 text-base placeholder:text-gray-500 rounded-xl transition-all duration-200 resize-none",
        disabled: isLoading,
        placeholder: hasMessages ? "Continue the conversation..." : "How do I calculate the radius of a circle?"
      }, field))));
    }
  }), __jsx(_button.Button, {
    className: "h-12 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2",
    disabled: isLoading,
    type: "submit"
  }, isLoading ? __jsx(_react["default"].Fragment, null, __jsx("div", {
    className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
  }), "Thinking...") : __jsx(_react["default"].Fragment, null, __jsx(_lucideReact.Send, {
    className: "w-4 h-4"
  }), "Send"))))))));
};
var _default = exports["default"] = ConversationPage;