"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _generativeAi = require("@google/generative-ai");
var _server = require("next/server");
var genAI = new _generativeAi.GoogleGenerativeAI(process.env.GEMINI_KEY || "");
function POST(_x) {
  return _POST.apply(this, arguments);
}
function _POST() {
  _POST = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(req) {
    var _yield$req$json, prompt, _yield$req$json$histo, history, model, chatHistory, chat, result, text;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return req.json();
        case 3:
          _yield$req$json = _context.sent;
          prompt = _yield$req$json.prompt;
          _yield$req$json$histo = _yield$req$json.history;
          history = _yield$req$json$histo === void 0 ? [] : _yield$req$json$histo;
          if (!(!prompt || typeof prompt !== "string" || prompt.trim() === "")) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Valid prompt is required"
          }, {
            status: 400
          }));
        case 9:
          if (process.env.GEMINI_KEY) {
            _context.next = 12;
            break;
          }
          console.error("GEMINI_API_KEY is not set");
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Server configuration error"
          }, {
            status: 500
          }));
        case 12:
          model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
          });
          chatHistory = history.map(function (entry) {
            return {
              role: entry.role === "assistant" ? "model" : "user",
              parts: [{
                text: entry.content
              }]
            };
          });
          chat = model.startChat({
            history: chatHistory
          });
          _context.next = 17;
          return chat.sendMessage(prompt);
        case 17:
          result = _context.sent;
          text = result.response.text();
          return _context.abrupt("return", _server.NextResponse.json({
            role: "assistant",
            content: text
          }, {
            status: 200
          }));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Conversation Route Error:", _context.t0.message || _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Failed to get response",
            details: _context.t0.message || "Internal server error"
          }, {
            status: 500
          }));
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 22]]);
  }));
  return _POST.apply(this, arguments);
}