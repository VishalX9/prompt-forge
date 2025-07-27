"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormField = void 0;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.useFormField = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _reactSlot = require("@radix-ui/react-slot");
var _reactHookForm = require("react-hook-form");
var _utils = require("lib/utils");
var _label = require("@/components/ui/label");
var _excluded = ["className"],
  _excluded2 = ["className"],
  _excluded3 = ["className"],
  _excluded4 = ["className"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var __jsx = React.createElement;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Form = exports.Form = _reactHookForm.FormProvider;
var FormFieldContext = React.createContext({});
var FormField = exports.FormField = function FormField(_ref) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref), _ref));
  return __jsx(FormFieldContext.Provider, {
    value: {
      name: props.name
    }
  }, __jsx(_reactHookForm.Controller, props));
};
var useFormField = exports.useFormField = function useFormField() {
  var fieldContext = React.useContext(FormFieldContext);
  var itemContext = React.useContext(FormItemContext);
  var _useFormContext = (0, _reactHookForm.useFormContext)(),
    getFieldState = _useFormContext.getFieldState;
  var formState = (0, _reactHookForm.useFormState)({
    name: fieldContext.name
  });
  var fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  var id = itemContext.id;
  return _objectSpread({
    id: id,
    name: fieldContext.name,
    formItemId: "".concat(id, "-form-item"),
    formDescriptionId: "".concat(id, "-form-item-description"),
    formMessageId: "".concat(id, "-form-item-message")
  }, fieldState);
};
var FormItemContext = React.createContext({});
function FormItem(_ref2) {
  var className = _ref2.className,
    props = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
  var id = React.useId();
  return __jsx(FormItemContext.Provider, {
    value: {
      id: id
    }
  }, __jsx("div", (0, _extends2["default"])({
    "data-slot": "form-item",
    className: (0, _utils.cn)("grid gap-2", className)
  }, props)));
}
function FormLabel(_ref3) {
  var className = _ref3.className,
    props = (0, _objectWithoutProperties2["default"])(_ref3, _excluded2);
  var _useFormField = useFormField(),
    error = _useFormField.error,
    formItemId = _useFormField.formItemId;
  return __jsx(_label.Label, (0, _extends2["default"])({
    "data-slot": "form-label",
    "data-error": !!error,
    className: (0, _utils.cn)("data-[error=true]:text-destructive", className),
    htmlFor: formItemId
  }, props));
}
function FormControl(_ref4) {
  var props = (0, _extends2["default"])({}, ((0, _objectDestructuringEmpty2["default"])(_ref4), _ref4));
  var _useFormField2 = useFormField(),
    error = _useFormField2.error,
    formItemId = _useFormField2.formItemId,
    formDescriptionId = _useFormField2.formDescriptionId,
    formMessageId = _useFormField2.formMessageId;
  return __jsx(_reactSlot.Slot, (0, _extends2["default"])({
    "data-slot": "form-control",
    id: formItemId,
    "aria-describedby": !error ? "".concat(formDescriptionId) : "".concat(formDescriptionId, " ").concat(formMessageId),
    "aria-invalid": !!error
  }, props));
}
function FormDescription(_ref5) {
  var className = _ref5.className,
    props = (0, _objectWithoutProperties2["default"])(_ref5, _excluded3);
  var _useFormField3 = useFormField(),
    formDescriptionId = _useFormField3.formDescriptionId;
  return __jsx("p", (0, _extends2["default"])({
    "data-slot": "form-description",
    id: formDescriptionId,
    className: (0, _utils.cn)("text-muted-foreground text-sm", className)
  }, props));
}
function FormMessage(_ref6) {
  var _error$message;
  var className = _ref6.className,
    props = (0, _objectWithoutProperties2["default"])(_ref6, _excluded4);
  var _useFormField4 = useFormField(),
    error = _useFormField4.error,
    formMessageId = _useFormField4.formMessageId;
  var body = error ? String((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "") : props.children;
  if (!body) {
    return null;
  }
  return __jsx("p", (0, _extends2["default"])({
    "data-slot": "form-message",
    id: formMessageId,
    className: (0, _utils.cn)("text-destructive text-sm", className)
  }, props), body);
}