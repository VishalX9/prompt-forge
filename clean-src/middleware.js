"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.config = void 0;
var _server = require("@clerk/nextjs/server");
var _default = exports["default"] = (0, _server.clerkMiddleware)();
var config = exports.config = {
  matcher: ["/((?!_next/image|favicon.ico).*)", "/api/(.*)"]
};