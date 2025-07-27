"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _server = require("next/server");
var _genai = require("@google/genai");
var genAI = new _genai.GoogleGenAI({
  apiKey: process.env.GEMINI_KEY
});
function POST(_x) {
  return _POST.apply(this, arguments);
}
function _POST() {
  _POST = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(req) {
    var _imageResponse$candid, _imagePart$inlineData, _descriptionResponse$, _yield$req$json, prompt, imageResponse, imagePart, imageUrl, descriptionPrompt, descriptionResponse, descriptionText;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return req.json();
        case 3:
          _yield$req$json = _context.sent;
          prompt = _yield$req$json.prompt;
          if (prompt) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Prompt required"
          }, {
            status: 400
          }));
        case 7:
          _context.next = 9;
          return genAI.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: [{
              role: "user",
              parts: [{
                text: prompt
              }]
            }],
            config: {
              responseModalities: [_genai.Modality.TEXT, _genai.Modality.IMAGE]
            }
          });
        case 9:
          imageResponse = _context.sent;
          imagePart = (_imageResponse$candid = imageResponse.candidates) === null || _imageResponse$candid === void 0 || (_imageResponse$candid = _imageResponse$candid[0]) === null || _imageResponse$candid === void 0 || (_imageResponse$candid = _imageResponse$candid.content) === null || _imageResponse$candid === void 0 || (_imageResponse$candid = _imageResponse$candid.parts) === null || _imageResponse$candid === void 0 ? void 0 : _imageResponse$candid.find(function (part) {
            return part.inlineData;
          });
          if (!(!imagePart || !((_imagePart$inlineData = imagePart.inlineData) !== null && _imagePart$inlineData !== void 0 && _imagePart$inlineData.data))) {
            _context.next = 13;
            break;
          }
          throw new Error("Image data not found");
        case 13:
          imageUrl = "data:image/png;base64,".concat(imagePart.inlineData.data);
          descriptionPrompt = "Provide a 1-2 sentence description for an emoji with this concept: \"".concat(prompt, "\"");
          _context.next = 17;
          return genAI.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
              role: "user",
              parts: [{
                text: descriptionPrompt
              }]
            }],
            config: {
              responseModalities: [_genai.Modality.TEXT]
            }
          });
        case 17:
          descriptionResponse = _context.sent;
          descriptionText = ((_descriptionResponse$ = descriptionResponse.candidates) === null || _descriptionResponse$ === void 0 || (_descriptionResponse$ = _descriptionResponse$[0]) === null || _descriptionResponse$ === void 0 || (_descriptionResponse$ = _descriptionResponse$.content) === null || _descriptionResponse$ === void 0 || (_descriptionResponse$ = _descriptionResponse$.parts) === null || _descriptionResponse$ === void 0 || (_descriptionResponse$ = _descriptionResponse$.find(function (p) {
            return p.text;
          })) === null || _descriptionResponse$ === void 0 ? void 0 : _descriptionResponse$.text) || "No description generated";
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            image: imageUrl,
            description: descriptionText
          }));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Gemini error:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "Something went wrong",
            details: _context.t0.message
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