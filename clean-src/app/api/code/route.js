"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _server = require("@clerk/nextjs/server");
var _server2 = require("next/server");
var _generativeAi = require("@google/generative-ai");
var genAI = new _generativeAi.GoogleGenerativeAI(process.env.GEMINI_KEY || "");
function POST(_x) {
  return _POST.apply(this, arguments);
}
function _POST() {
  _POST = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(req) {
    var _yield$auth, userId, body, messages, lastMessage, prompt, model, result, text;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _server.auth)();
        case 3:
          _yield$auth = _context.sent;
          userId = _yield$auth.userId;
          if (userId) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", new _server2.NextResponse("Unauthorized", {
            status: 401
          }));
        case 7:
          _context.next = 9;
          return req.json();
        case 9:
          body = _context.sent;
          if (!(!body || typeof body !== "object" || !("messages" in body))) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", new _server2.NextResponse("Invalid request body", {
            status: 400
          }));
        case 12:
          messages = body.messages;
          if (!(!messages || messages.length === 0)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", new _server2.NextResponse("Messages are required", {
            status: 400
          }));
        case 15:
          if (process.env.GEMINI_KEY) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", new _server2.NextResponse("Gemini API Key not configured", {
            status: 500
          }));
        case 17:
          lastMessage = messages[messages.length - 1];
          prompt = "You are a helpful programming assistant. ONLY provide coding solutions with code snippets or code comments. No extra explanation.\n\n".concat(lastMessage.content);
          model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite"
          });
          _context.next = 22;
          return model.generateContent(prompt);
        case 22:
          result = _context.sent;
          _context.next = 25;
          return result.response.text();
        case 25:
          text = _context.sent;
          return _context.abrupt("return", _server2.NextResponse.json({
            content: text
          }));
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](0);
          console.error("[CONVERSATION_ERROR]", _context.t0);
          return _context.abrupt("return", new _server2.NextResponse("Internal error", {
            status: 500
          }));
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 29]]);
  }));
  return _POST.apply(this, arguments);
}