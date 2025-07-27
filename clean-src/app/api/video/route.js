"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _server = require("next/server");
var _sdk = _interopRequireWildcard(require("@runwayml/sdk"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var client = new _sdk["default"]({
  apiKey: process.env.RUNWAYML_API_SECRET
});
var DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/640px-Hopetoun_falls.jpg";
var ratioMap = {
  "16:9": "1280:720",
  "9:16": "720:1280",
  "1:1": "960:960",
  "4:3": "1104:832",
  "3:4": "832:1104",
  "21:9": "1584:672",
  "5:3": "1280:768",
  "3:5": "768:1280"
};
function POST(_x) {
  return _POST.apply(this, arguments);
}
function _POST() {
  _POST = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(request) {
    var _result$output, _result$output2, _result$output3, _result$outputs, _result$outputs2, body, _body, promptText, _body$aspectRatio, aspectRatio, _body$duration, duration, resolvedRatio, supportedRatios, task, result, videoUrl, errorMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('API route hit - generate-video');
          _context.prev = 1;
          _context.prev = 2;
          _context.next = 5;
          return request.json();
        case 5:
          body = _context.sent;
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.error('JSON parse error:', _context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Invalid JSON in request body'
          }, {
            status: 400
          }));
        case 12:
          _body = body, promptText = _body.promptText, _body$aspectRatio = _body.aspectRatio, aspectRatio = _body$aspectRatio === void 0 ? '16:9' : _body$aspectRatio, _body$duration = _body.duration, duration = _body$duration === void 0 ? 5 : _body$duration;
          if (!(!promptText || typeof promptText !== 'string' || promptText.trim().length === 0)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'promptText is required and must be a non-empty string'
          }, {
            status: 400
          }));
        case 15:
          resolvedRatio = ratioMap[aspectRatio];
          if (resolvedRatio) {
            _context.next = 19;
            break;
          }
          supportedRatios = Object.keys(ratioMap).join(', ');
          return _context.abrupt("return", _server.NextResponse.json({
            error: "Unsupported aspect ratio. Must be one of: ".concat(supportedRatios)
          }, {
            status: 400
          }));
        case 19:
          if (!(!Number.isInteger(duration) || duration < 1 || duration > 10)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Duration must be an integer between 1 and 10 seconds'
          }, {
            status: 400
          }));
        case 21:
          if (process.env.RUNWAYML_API_SECRET) {
            _context.next = 24;
            break;
          }
          console.error('RUNWAYML_API_SECRET not found in environment variables.');
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Server configuration error: RunwayML API key missing'
          }, {
            status: 500
          }));
        case 24:
          console.log('Creating RunwayML task with:', {
            promptText: promptText.trim(),
            resolvedRatio: resolvedRatio,
            duration: duration,
            promptImage: DEFAULT_IMAGE
          });
          _context.next = 27;
          return client.imageToVideo.create({
            model: 'gen4_turbo',
            promptImage: DEFAULT_IMAGE,
            promptText: promptText.trim(),
            ratio: resolvedRatio,
            duration: duration
          });
        case 27:
          task = _context.sent;
          console.log('Task created, waiting for output...');
          _context.next = 31;
          return task.waitForTaskOutput();
        case 31:
          result = _context.sent;
          console.log('RunwayML Task result status:', result.status);
          if (!(result.status !== 'SUCCEEDED' && result.status !== 'succeeded')) {
            _context.next = 36;
            break;
          }
          console.error('RunwayML video generation failed:', result);
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Video generation failed on RunwayML side',
            status: result.status,
            details: result
          }, {
            status: 500
          }));
        case 36:
          videoUrl = (result === null || result === void 0 || (_result$output = result.output) === null || _result$output === void 0 ? void 0 : _result$output.videoUrl) || (result === null || result === void 0 || (_result$output2 = result.output) === null || _result$output2 === void 0 ? void 0 : _result$output2.video) || (result === null || result === void 0 || (_result$output3 = result.output) === null || _result$output3 === void 0 ? void 0 : _result$output3.url) || (result === null || result === void 0 ? void 0 : result.videoUrl) || (result === null || result === void 0 ? void 0 : result.video) || (result === null || result === void 0 ? void 0 : result.url) || (result === null || result === void 0 || (_result$outputs = result.outputs) === null || _result$outputs === void 0 || (_result$outputs = _result$outputs[0]) === null || _result$outputs === void 0 ? void 0 : _result$outputs.url) || (result === null || result === void 0 || (_result$outputs2 = result.outputs) === null || _result$outputs2 === void 0 || (_result$outputs2 = _result$outputs2[0]) === null || _result$outputs2 === void 0 ? void 0 : _result$outputs2.videoUrl);
          if (videoUrl) {
            _context.next = 40;
            break;
          }
          console.error('No video URL found in RunwayML result:', result);
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'No video URL found in RunwayML response',
            output: result
          }, {
            status: 500
          }));
        case 40:
          console.log('Video generated successfully:', videoUrl);
          return _context.abrupt("return", _server.NextResponse.json({
            success: true,
            videoUrl: videoUrl,
            taskId: result.id
          }));
        case 44:
          _context.prev = 44;
          _context.t1 = _context["catch"](1);
          console.error('API Error during video generation:', _context.t1);
          errorMessage = 'Unknown error during video generation.';
          if (_context.t1 instanceof _sdk.TaskFailedError) {
            errorMessage = "RunwayML task failed: ".concat(_context.t1.message);
          } else if (_context.t1 instanceof Error) {
            errorMessage = _context.t1.message;
          }
          return _context.abrupt("return", _server.NextResponse.json({
            error: 'Failed to generate video',
            message: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? _context.t1 === null || _context.t1 === void 0 ? void 0 : _context.t1.stack : undefined
          }, {
            status: 500
          }));
        case 50:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 44], [2, 8]]);
  }));
  return _POST.apply(this, arguments);
}