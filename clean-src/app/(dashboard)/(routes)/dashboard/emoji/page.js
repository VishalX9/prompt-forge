"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EmojiPromptPage;
var _style = _interopRequireDefault(require("styled-jsx/style"));
var _react = _interopRequireWildcard(require("react"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _navigation = require("next/navigation");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
function EmojiPromptPage() {
  var _useState = (0, _react.useState)(''),
    promptText = _useState[0],
    setPromptText = _useState[1];
  var router = (0, _navigation.useRouter)();
  var _useState2 = (0, _react.useState)(false),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    image = _useState3[0],
    setImage = _useState3[1];
  var _useState4 = (0, _react.useState)(null),
    description = _useState4[0],
    setDescription = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    error = _useState5[0],
    setError = _useState5[1];
  (0, _react.useEffect)(function () {
    var color = 'blue';
    document.body.setAttribute('data-color', color);
  }, []);
  var generateEmoji = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var response, contentType, textResponse, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setLoading(true);
            setError(null);
            setImage(null);
            setDescription(null);
            _context.prev = 4;
            _context.next = 7;
            return fetch('/api/emoji', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                promptText: promptText.trim()
              })
            });
          case 7:
            response = _context.sent;
            contentType = response.headers.get('content-type');
            if (contentType !== null && contentType !== void 0 && contentType.includes('application/json')) {
              _context.next = 14;
              break;
            }
            _context.next = 12;
            return response.text();
          case 12:
            textResponse = _context.sent;
            throw new Error("Non-JSON response: ".concat(textResponse));
          case 14:
            _context.next = 16;
            return response.json();
          case 16:
            data = _context.sent;
            if (!(!response.ok || !data.success)) {
              _context.next = 19;
              break;
            }
            throw new Error(data.error || data.message || "HTTP ".concat(response.status));
          case 19:
            setImage(data.image || null);
            setDescription(data.description || '');
            _context.next = 27;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](4);
            console.error('Emoji generation error:', _context.t0);
            setError(_context.t0.message || 'Something went wrong');
          case 27:
            _context.prev = 27;
            setLoading(false);
            router.refresh();
            return _context.finish(27);
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4, 23, 27, 31]]);
    }));
    return function generateEmoji() {
      return _ref.apply(this, arguments);
    };
  }();
  return __jsx("div", {
    "data-color": "blue",
    className: "jsx-542509928" + " " + "min-h-screen relative overflow-hidden"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "absolute inset-0 overflow-hidden"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
  }), __jsx("div", {
    className: "jsx-542509928" + " " + "absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"
  }), __jsx("div", {
    className: "jsx-542509928" + " " + "absolute -bottom-20 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"
  })), __jsx("div", {
    className: "jsx-542509928" + " " + "relative z-10 max-w-4xl mx-auto px-6 py-12"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-center mb-12"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300"
  }, __jsx("span", {
    className: "jsx-542509928" + " " + "text-3xl"
  }, "\uD83E\uDE84")), __jsx("h1", {
    className: "jsx-542509928" + " " + "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 mb-4 tracking-tight"
  }, "AI Emoji Generator"), __jsx("p", {
    className: "jsx-542509928" + " " + "text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
  }, "Transform your wildest ideas into custom emojis with the power of artificial intelligence")), __jsx("div", {
    className: "jsx-542509928" + " " + "grid lg:grid-cols-2 gap-8 items-start"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl hover:shadow-purple-400/20 transition-all duration-500"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "space-y-6"
  }, __jsx("div", {
    className: "jsx-542509928"
  }, __jsx("label", {
    className: "jsx-542509928" + " " + "text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
  }, __jsx("span", {
    className: "jsx-542509928" + " " + "text-2xl"
  }, "\uD83D\uDCAD"), "Describe Your Emoji"), __jsx("div", {
    className: "jsx-542509928" + " " + "relative"
  }, __jsx("textarea", {
    placeholder: "Paint your emoji with words... \uD83C\uDFA8\n\u2728 'A sleepy robot drinking coffee in space'\n\uD83C\uDF1F 'A dancing taco with sunglasses'\n\uD83D\uDE80 'A ninja cat coding on a laptop'",
    value: promptText,
    onChange: function onChange(e) {
      return setPromptText(e.target.value);
    },
    rows: 6,
    className: "jsx-542509928" + " " + "w-full p-4 bg-white/50 backdrop-blur border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 text-gray-800 placeholder-gray-400 text-lg transition-all duration-300 resize-none"
  }), __jsx("div", {
    className: "jsx-542509928" + " " + "absolute bottom-4 right-4 text-gray-500 text-sm"
  }, promptText.length, "/500"))), __jsx("button", {
    onClick: generateEmoji,
    disabled: loading || !promptText.trim(),
    className: "jsx-542509928" + " " + "group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl hover:from-purple-400 hover:via-pink-400 hover:to-red-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-purple-400/50 transform hover:scale-105 disabled:transform-none relative overflow-hidden"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
  }), __jsx("div", {
    className: "jsx-542509928" + " " + "relative flex items-center justify-center gap-3"
  }, loading ? __jsx(_react["default"].Fragment, null, __jsx("div", {
    className: "jsx-542509928" + " " + "w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
  }), "Crafting Magic...") : __jsx(_react["default"].Fragment, null, __jsx("span", {
    className: "jsx-542509928" + " " + "text-2xl"
  }, "\uD83E\uDDE0"), "Generate Emoji", __jsx("span", {
    className: "jsx-542509928" + " " + "text-2xl"
  }, "\u2728")))))), __jsx("div", {
    className: "jsx-542509928" + " " + "space-y-6"
  }, image && __jsx("div", {
    className: "jsx-542509928" + " " + "bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl transform animate-fade-in"
  }, __jsx("h3", {
    className: "jsx-542509928" + " " + "text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
  }, __jsx("span", {
    className: "jsx-542509928" + " " + "text-3xl"
  }, "\uD83C\uDF89"), "Your Custom Emoji"), __jsx("div", {
    className: "jsx-542509928" + " " + "bg-white/50 backdrop-blur rounded-2xl p-6 border border-gray-100 text-center"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "mb-6 transform hover:scale-110 transition-transform duration-300"
  }, __jsx("img", {
    src: image,
    alt: "Generated emoji",
    className: "jsx-542509928" + " " + "w-40 h-40 object-contain mx-auto rounded-2xl shadow-2xl"
  })), description && __jsx("p", {
    className: "jsx-542509928" + " " + "text-gray-600 text-lg italic leading-relaxed"
  }, "\"", description, "\""), __jsx("div", {
    className: "jsx-542509928" + " " + "mt-6 flex gap-3 justify-center"
  }, __jsx("button", {
    className: "jsx-542509928" + " " + "px-6 py-2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-xl transition-colors duration-300 border border-gray-200"
  }, "Download"), __jsx("button", {
    className: "jsx-542509928" + " " + "px-6 py-2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-xl transition-colors duration-300 border border-gray-200"
  }, "Share")))), error && __jsx("div", {
    className: "jsx-542509928" + " " + "bg-red-100/80 backdrop-blur-xl border border-red-300/30 p-6 rounded-2xl transform animate-fade-in"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "flex items-center gap-3 text-red-600 font-semibold text-lg mb-2"
  }, __jsx("span", {
    className: "jsx-542509928" + " " + "text-2xl"
  }, "\u274C"), "Something went wrong"), __jsx("div", {
    className: "jsx-542509928" + " " + "text-red-500"
  }, error)), loading && __jsx("div", {
    className: "jsx-542509928" + " " + "bg-blue-100/80 backdrop-blur-xl border border-blue-300/30 p-6 rounded-2xl transform animate-fade-in"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "flex items-center gap-3 text-blue-600 font-semibold text-lg mb-2"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"
  }), "AI is working its magic"), __jsx("div", {
    className: "jsx-542509928" + " " + "text-blue-500"
  }, "Transforming your idea into a unique emoji...")), !image && !error && !loading && __jsx("div", {
    className: "jsx-542509928" + " " + "bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 text-center"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-6xl mb-4"
  }, "\uD83C\uDFAD"), __jsx("h3", {
    className: "jsx-542509928" + " " + "text-2xl font-bold text-gray-800 mb-3"
  }, "Ready to Create?"), __jsx("p", {
    className: "jsx-542509928" + " " + "text-gray-600 text-lg"
  }, "Your custom emoji will appear here once generated. Let your imagination run wild!")))), __jsx("div", {
    className: "jsx-542509928" + " " + "mt-16 grid md:grid-cols-3 gap-6"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-4xl mb-3"
  }, "\u26A1"), __jsx("h4", {
    className: "jsx-542509928" + " " + "text-gray-800 font-semibold mb-2"
  }, "Lightning Fast"), __jsx("p", {
    className: "jsx-542509928" + " " + "text-gray-600 text-sm"
  }, "Generate unique emojis in seconds")), __jsx("div", {
    className: "jsx-542509928" + " " + "text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-4xl mb-3"
  }, "\uD83C\uDFA8"), __jsx("h4", {
    className: "jsx-542509928" + " " + "text-gray-800 font-semibold mb-2"
  }, "Unlimited Creativity"), __jsx("p", {
    className: "jsx-542509928" + " " + "text-gray-600 text-sm"
  }, "Any idea, any style, any emotion")), __jsx("div", {
    className: "jsx-542509928" + " " + "text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100"
  }, __jsx("div", {
    className: "jsx-542509928" + " " + "text-4xl mb-3"
  }, "\uD83C\uDF1F"), __jsx("h4", {
    className: "jsx-542509928" + " " + "text-gray-800 font-semibold mb-2"
  }, "High Quality"), __jsx("p", {
    className: "jsx-542509928" + " " + "text-gray-600 text-sm"
  }, "Crisp, detailed, professional results")))), __jsx(_style["default"], {
    id: "542509928"
  }, "@-webkit-keyframes fade-in-jsx-542509928{from{opacity:0;-webkit-transform:translateY(20px);-ms-transform:translateY(20px);transform:translateY(20px);}to{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}}@keyframes fade-in-jsx-542509928{from{opacity:0;-webkit-transform:translateY(20px);-ms-transform:translateY(20px);transform:translateY(20px);}to{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}}.animate-fade-in.jsx-542509928{-webkit-animation:fade-in-jsx-542509928 0.6s ease-out;animation:fade-in-jsx-542509928 0.6s ease-out;}.animation-delay-2000.jsx-542509928{-webkit-animation-delay:2s;animation-delay:2s;}.animation-delay-4000.jsx-542509928{-webkit-animation-delay:4s;animation-delay:4s;}"));
}