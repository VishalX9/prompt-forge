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
    var _imageResponse$candid, _imageCandidate$conte, _imagePart$inlineData, _descriptionResponse$, _descriptionCandidate, _yield$req$json, promptText, imageResponse, imageCandidate, imageParts, imagePart, imageUrl, descriptionPrompt, descriptionResponse, descriptionCandidate, descriptionParts, descriptionPart, description;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return req.json();
        case 3:
          _yield$req$json = _context.sent;
          promptText = _yield$req$json.promptText;
          if (promptText) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Prompt is required."
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
                text: promptText
              }]
            }],
            config: {
              responseModalities: [_genai.Modality.TEXT, _genai.Modality.IMAGE]
            }
          });
        case 9:
          imageResponse = _context.sent;
          imageCandidate = imageResponse === null || imageResponse === void 0 || (_imageResponse$candid = imageResponse.candidates) === null || _imageResponse$candid === void 0 ? void 0 : _imageResponse$candid[0];
          imageParts = imageCandidate === null || imageCandidate === void 0 || (_imageCandidate$conte = imageCandidate.content) === null || _imageCandidate$conte === void 0 ? void 0 : _imageCandidate$conte.parts;
          if (!(!imageParts || !Array.isArray(imageParts))) {
            _context.next = 14;
            break;
          }
          throw new Error("No image content parts found in the response.");
        case 14:
          imagePart = imageParts.find(function (part) {
            var _part$inlineData;
            return (_part$inlineData = part.inlineData) === null || _part$inlineData === void 0 ? void 0 : _part$inlineData.data;
          });
          if (!(!imagePart || !((_imagePart$inlineData = imagePart.inlineData) !== null && _imagePart$inlineData !== void 0 && _imagePart$inlineData.data))) {
            _context.next = 17;
            break;
          }
          throw new Error("Image generation failed: no image data found.");
        case 17:
          imageUrl = "data:image/png;base64,".concat(imagePart.inlineData.data);
          descriptionPrompt = "Provide a concise, creative description of an emoji based on the following prompt: \"".concat(promptText, "\". The description should be 1-2 sentences, capturing the essence and style of the emoji.");
          _context.next = 21;
          return genAI.models.generateContent({
            model: "gemini-2.0-flash",
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
        case 21:
          descriptionResponse = _context.sent;
          descriptionCandidate = descriptionResponse === null || descriptionResponse === void 0 || (_descriptionResponse$ = descriptionResponse.candidates) === null || _descriptionResponse$ === void 0 ? void 0 : _descriptionResponse$[0];
          descriptionParts = descriptionCandidate === null || descriptionCandidate === void 0 || (_descriptionCandidate = descriptionCandidate.content) === null || _descriptionCandidate === void 0 ? void 0 : _descriptionCandidate.parts;
          if (!(!descriptionParts || !Array.isArray(descriptionParts))) {
            _context.next = 26;
            break;
          }
          throw new Error("No description content parts found.");
        case 26:
          descriptionPart = descriptionParts.find(function (part) {
            return part.text;
          });
          if (!(!descriptionPart || !descriptionPart.text)) {
            _context.next = 29;
            break;
          }
          throw new Error("Description generation failed: no text returned.");
        case 29:
          description = descriptionPart.text;
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            image: imageUrl,
            description: description
          }, {
            status: 200
          }));
        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](0);
          console.error("Gemini Image Generation Error:", _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            success: false,
            error: "Failed to generate emoji",
            details: (_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) || "Unknown error occurred."
          }, {
            status: 500
          }));
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 33]]);
  }));
  return _POST.apply(this, arguments);
}