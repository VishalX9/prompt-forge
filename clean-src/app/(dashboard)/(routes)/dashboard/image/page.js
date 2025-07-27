"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
var _navigation = require("next/navigation");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = _react["default"].createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var cn = function cn() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(" ");
};
var ImageCard = function ImageCard(_ref) {
  var generation = _ref.generation,
    onLike = _ref.onLike,
    onDownload = _ref.onDownload;
  var _useState = (0, _react.useState)(false),
    isHovered = _useState[0],
    setIsHovered = _useState[1];
  return __jsx("div", {
    className: "group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
    onMouseEnter: function onMouseEnter() {
      return setIsHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovered(false);
    }
  }, __jsx("div", {
    className: "relative overflow-hidden"
  }, __jsx("img", {
    src: generation.imageUrl,
    alt: generation.prompt,
    className: "w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
  }), __jsx("div", {
    className: cn("absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")
  }, __jsx("div", {
    className: "absolute bottom-4 left-4 right-4"
  }, __jsx("p", {
    className: "text-white text-sm font-medium line-clamp-2 mb-3"
  }, generation.prompt), __jsx("div", {
    className: "flex items-center justify-between"
  }, __jsx("div", {
    className: "flex items-center gap-2"
  }, __jsx("button", {
    onClick: function onClick() {
      return onLike(generation.id);
    },
    className: cn("p-2 rounded-full transition-all duration-200", generation.liked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30")
  }, __jsx(_lucideReact.Heart, {
    className: cn("w-4 h-4", generation.liked ? "fill-current" : "")
  })), __jsx("button", {
    className: "p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
  }, __jsx(_lucideReact.Share2, {
    className: "w-4 h-4"
  }))), __jsx("button", {
    onClick: function onClick() {
      return onDownload(generation.imageUrl, generation.prompt);
    },
    className: "px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
  }, __jsx(_lucideReact.Download, {
    className: "w-4 h-4"
  }), "Download"))))), __jsx("div", {
    className: "p-4"
  }, __jsx("div", {
    className: "flex items-center justify-between text-xs text-gray-500"
  }, __jsx("span", null, generation.timestamp.toLocaleDateString()), __jsx("span", {
    className: "flex items-center gap-1"
  }, __jsx(_lucideReact.Sparkles, {
    className: "w-3 h-3"
  }), "AI Generated"))));
};
var StylePreset = function StylePreset(_ref2) {
  var name = _ref2.name,
    preview = _ref2.preview,
    isSelected = _ref2.isSelected,
    onClick = _ref2.onClick;
  return __jsx("button", {
    onClick: onClick,
    className: cn("relative overflow-hidden rounded-xl border-2 transition-all duration-300 group", isSelected ? "border-violet-500 shadow-lg shadow-violet-500/25" : "border-gray-200 hover:border-violet-300")
  }, __jsx("div", {
    className: "w-20 h-20 bg-[var(--page-background)] flex items-center justify-center"
  }, __jsx("div", {
    className: "text-2xl"
  }, preview)), __jsx("div", {
    className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
  }), __jsx("div", {
    className: "p-2 bg-white"
  }, __jsx("p", {
    className: "text-xs font-medium text-gray-700 truncate"
  }, name)));
};
var ImageGeneratorPage = function ImageGeneratorPage() {
  var router = (0, _navigation.useRouter)();
  var _useState2 = (0, _react.useState)([]),
    generations = _useState2[0],
    setGenerations = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    prompt = _useState3[0],
    setPrompt = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    isGenerating = _useState4[0],
    setIsGenerating = _useState4[1];
  var _useState5 = (0, _react.useState)("photorealistic"),
    selectedStyle = _useState5[0],
    setSelectedStyle = _useState5[1];
  var stylePresets = [{
    id: "photorealistic",
    name: "Photo",
    preview: "📸",
    color: "blue"
  }, {
    id: "artistic",
    name: "Artistic",
    preview: "🎨",
    color: "purple"
  }, {
    id: "anime",
    name: "Anime",
    preview: "🌸",
    color: "pink"
  }, {
    id: "digital",
    name: "Digital",
    preview: "💎",
    color: "cyan"
  }, {
    id: "vintage",
    name: "Vintage",
    preview: "📻",
    color: "brown"
  }, {
    id: "abstract",
    name: "Abstract",
    preview: "🌀",
    color: "green"
  }];
  (0, _react.useEffect)(function () {
    var selectedPreset = stylePresets.find(function (style) {
      return style.id === selectedStyle;
    });
    var color = (selectedPreset === null || selectedPreset === void 0 ? void 0 : selectedPreset.color) || "blue";
    document.body.setAttribute("data-color", color);
  }, [selectedStyle]);
  var handleGenerate = function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var _data$image, response, errorText, data, imageUrl, newGeneration;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (prompt.trim()) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            setIsGenerating(true);
            _context.prev = 3;
            _context.next = 6;
            return fetch("/api/image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                prompt: "".concat(prompt, ", ").concat(selectedStyle, " style")
              })
            });
          case 6:
            response = _context.sent;
            if (response.ok) {
              _context.next = 12;
              break;
            }
            _context.next = 10;
            return response.text();
          case 10:
            errorText = _context.sent;
            throw new Error("API Error: ".concat(response.status, " - ").concat(errorText));
          case 12:
            _context.next = 14;
            return response.json();
          case 14:
            data = _context.sent;
            imageUrl = (_data$image = data.image) !== null && _data$image !== void 0 ? _data$image : "/placeholder.jpg";
            if (imageUrl) {
              _context.next = 18;
              break;
            }
            throw new Error("No image URL returned from API");
          case 18:
            newGeneration = {
              id: Date.now().toString(),
              prompt: prompt,
              imageUrl: imageUrl,
              timestamp: new Date(),
              liked: false
            };
            setGenerations(function (prev) {
              return [newGeneration].concat((0, _toConsumableArray2["default"])(prev));
            });
            setPrompt("");
            _context.next = 27;
            break;
          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](3);
            console.error("Generation failed:", _context.t0);
            alert("Failed to generate image: ".concat(_context.t0 instanceof Error ? _context.t0.message : "Unknown error"));
          case 27:
            _context.prev = 27;
            setIsGenerating(false);
            router.refresh();
            return _context.finish(27);
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 23, 27, 31]]);
    }));
    return function handleGenerate() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleLike = function handleLike(id) {
    setGenerations(function (prev) {
      return prev.map(function (gen) {
        return gen.id === id ? _objectSpread(_objectSpread({}, gen), {}, {
          liked: !gen.liked
        }) : gen;
      });
    });
  };
  var handleDownload = function handleDownload(imageUrl, prompt) {
    try {
      var link = document.createElement("a");
      link.href = imageUrl;
      link.download = "ai-art-".concat(prompt.slice(0, 20).replace(/\s+/g, "-"), ".jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image");
    }
  };
  return __jsx("div", {
    className: "min-h-screen",
    "data-color": "blue"
  }, __jsx("div", {
    className: "fixed inset-0 overflow-hidden pointer-events-none"
  }, __jsx("div", {
    className: "absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse",
    style: {
      backgroundColor: "var(--page-background)"
    }
  }), __jsx("div", {
    className: "absolute top-40 right-20 w-24 h-24 rounded-full opacity-30 animate-bounce",
    style: {
      backgroundColor: "var(--page-background)",
      animationDelay: "1s"
    }
  }), __jsx("div", {
    className: "absolute bottom-32 left-1/4 w-16 h-16 rounded-full opacity-25 animate-pulse",
    style: {
      backgroundColor: "var(--page-background)",
      animationDelay: "2s"
    }
  })), __jsx("div", {
    className: "relative z-10 text-center py-12 px-4"
  }, __jsx("div", {
    className: "inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
  }, __jsx(_lucideReact.Wand2, {
    className: "w-6 h-6 text-violet-600"
  }), __jsx("span", {
    className: "font-semibold text-gray-800"
  }, "AI Image Studio")), __jsx("h1", {
    className: "text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
  }, "Dream It, Create It"), __jsx("p", {
    className: "text-xl text-gray-600 max-w-2xl mx-auto"
  }, "Transform your wildest imagination into stunning visual masterpieces with the power of AI")), __jsx("div", {
    className: "relative z-10 max-w-4xl mx-auto px-4 mb-12"
  }, __jsx("div", {
    className: "bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50"
  }, __jsx("div", {
    className: "mb-6"
  }, __jsx("h3", {
    className: "text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
  }, __jsx(_lucideReact.Palette, {
    className: "w-5 h-5 text-violet-600"
  }), "Choose Your Style"), __jsx("div", {
    className: "grid grid-cols-3 sm:grid-cols-6 gap-3"
  }, stylePresets.map(function (style) {
    return __jsx(StylePreset, {
      key: style.id,
      name: style.name,
      preview: style.preview,
      isSelected: selectedStyle === style.id,
      onClick: function onClick() {
        return setSelectedStyle(style.id);
      }
    });
  }))), __jsx("div", {
    className: "relative"
  }, __jsx("div", {
    className: "relative"
  }, __jsx("textarea", {
    value: prompt,
    onChange: function onChange(e) {
      return setPrompt(e.target.value);
    },
    placeholder: "Describe your vision... A majestic dragon soaring through clouds at sunset, fantasy art style, highly detailed...",
    className: "w-full h-32 p-6 pr-20 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300 resize-none outline-none",
    disabled: isGenerating
  }), __jsx("div", {
    className: "absolute bottom-4 right-4 flex items-center gap-2"
  }, __jsx("span", {
    className: "text-sm text-gray-400"
  }, prompt.length, "/500"), __jsx("button", {
    onClick: handleGenerate,
    disabled: isGenerating || !prompt.trim(),
    className: cn("p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold", isGenerating || !prompt.trim() ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105")
  }, isGenerating ? __jsx(_react["default"].Fragment, null, __jsx("div", {
    className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
  }), "Creating...") : __jsx(_react["default"].Fragment, null, __jsx(_lucideReact.Zap, {
    className: "w-5 h-5"
  }), "Generate"))))))), __jsx("div", {
    className: "relative z-10 max-w-7xl mx-auto px-4 pb-12"
  }, generations.length === 0 ? __jsx("div", {
    className: "text-center py-20"
  }, __jsx("div", {
    className: "w-32 h-32 mx-auto mb-6 bg-[var(--page-background)] rounded-full flex items-center justify-center"
  }, __jsx(_lucideReact.ImageIcon, {
    className: "w-16 h-16 text-violet-400"
  })), __jsx("h3", {
    className: "text-2xl font-bold text-gray-700 mb-3"
  }, "Your Gallery Awaits"), __jsx("p", {
    className: "text-gray-500 max-w-md mx-auto"
  }, "Start creating amazing images by describing what you want to see. Your generated artwork will appear here.")) : __jsx(_react["default"].Fragment, null, __jsx("div", {
    className: "flex items-center justify-between mb-8"
  }, __jsx("h2", {
    className: "text-3xl font-bold text-gray-800 flex items-center gap-3"
  }, __jsx(_lucideReact.Camera, {
    className: "w-8 h-8 text-violet-600"
  }), "Your Creations"), __jsx("div", {
    className: "flex items-center gap-2 text-sm text-gray-600"
  }, __jsx(_lucideReact.Sparkles, {
    className: "w-4 h-4"
  }), generations.length, " images generated")), __jsx("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  }, generations.map(function (generation) {
    return __jsx(ImageCard, {
      key: generation.id,
      generation: generation,
      onLike: handleLike,
      onDownload: handleDownload
    });
  })))));
};
var _default = exports["default"] = ImageGeneratorPage;