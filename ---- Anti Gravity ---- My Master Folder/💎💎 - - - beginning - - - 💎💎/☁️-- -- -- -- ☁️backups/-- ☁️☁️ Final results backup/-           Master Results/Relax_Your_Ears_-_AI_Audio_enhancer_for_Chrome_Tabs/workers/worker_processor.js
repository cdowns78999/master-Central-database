/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ml_inference.ts":
/*!*****************************!*\
  !*** ./src/ml_inference.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MLInferenceFactory": () => (/* binding */ MLInferenceFactory)
/* harmony export */ });
/* harmony import */ var onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! onnxruntime-web */ "./node_modules/onnxruntime-web/dist/esm/ort.min.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/* harmony import */ var _utils_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/loader */ "./src/utils/loader.ts");
/* harmony import */ var _utils_errorBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/errorBus */ "./src/utils/errorBus.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var ONNXMLInference = /*#__PURE__*/function () {
  function ONNXMLInference() {
    _classCallCheck(this, ONNXMLInference);
    this.ready = false;
    this._loader = new _utils_loader__WEBPACK_IMPORTED_MODULE_2__.Loader();
  }
  return _createClass(ONNXMLInference, [{
    key: "getType",
    value: function getType() {
      return "onnx";
    }
  }, {
    key: "setBackend",
    value: function setBackend(inference) {}
  }, {
    key: "initByPath",
    value: function () {
      var _initByPath = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(customer_id, path) {
        var sessionOptions, model, payload, key, result, _t, _t2, _t3, _t4, _t5;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              sessionOptions = {
                executionProviders: ["wasm"],
                enableProfiling: false,
                enableCpuMemArena: true,
                enableMemPattern: true,
                executionMode: "sequential",
                graphOptimizationLevel: "all"
              };
              onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.env.wasm.numThreads = 1;
              onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.env.wasm.proxy = false;
              if (Object.keys(_settings__WEBPACK_IMPORTED_MODULE_1__.DefaultConfig.WASM_PATHS).length) {
                onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.env.wasm.wasmPaths = _settings__WEBPACK_IMPORTED_MODULE_1__.DefaultConfig.WASM_PATHS;
              }
              _context.n = 1;
              return this._loader.get(path, _settings__WEBPACK_IMPORTED_MODULE_1__.DefaultConfig.CACHE_MODELS);
            case 1:
              model = _context.v;
              if (model) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _t = onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.InferenceSession;
              _context.n = 3;
              return model.arrayBuffer();
            case 3:
              _t2 = _context.v;
              _t3 = sessionOptions;
              _context.n = 4;
              return _t.create.call(_t, _t2, _t3);
            case 4:
              this.session = _context.v;
              _context.n = 5;
              return this.session.configure(customer_id);
            case 5:
              payload = _context.v;
              if (!(typeof globalThis.requestAuthFromMainThread === 'function')) {
                _context.n = 7;
                break;
              }
              _context.n = 6;
              return globalThis.requestAuthFromMainThread(payload, "authkey");
            case 6:
              key = _context.v;
              _context.n = 8;
              break;
            case 7:
              throw new Error("Auth helper not available - must be called from worker context");
            case 8:
              _t4 = JSON;
              _context.n = 9;
              return this.session.auth(key);
            case 9:
              _t5 = _context.v;
              result = _t4.parse.call(_t4, _t5);
              if (!(result.status != "active")) {
                _context.n = 10;
                break;
              }
              _utils_errorBus__WEBPACK_IMPORTED_MODULE_3__.ErrorBus.notify({
                message: "Authentication failed",
                type: _utils_errorBus__WEBPACK_IMPORTED_MODULE_3__.ErrorType.ERROR,
                code: _utils_errorBus__WEBPACK_IMPORTED_MODULE_3__.ErrorCode.AUTH_ISSUE,
                emitter: _utils_errorBus__WEBPACK_IMPORTED_MODULE_3__.ErrorEmitter.MODEL
              });
              throw new Error("Authentication failed");
            case 10:
              this.ready = true;
            case 11:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function initByPath(_x, _x2) {
        return _initByPath.apply(this, arguments);
      }
      return initByPath;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(customer_id) {
        var modelType,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              modelType = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "speed";
              return _context2.a(2, this.initByPath(customer_id, _settings__WEBPACK_IMPORTED_MODULE_1__.DefaultConfig.getPresetUrl(_settings__WEBPACK_IMPORTED_MODULE_1__.DefaultConfig.PRESETS[modelType])));
          }
        }, _callee2, this);
      }));
      function init(_x3) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "isReady",
    value: function isReady() {
      return this.ready;
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(inputData, prealloc) {
        var result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.session.run(inputData, prealloc);
            case 1:
              result = _context3.v;
              return _context3.a(2, result);
          }
        }, _callee3, this);
      }));
      function run(_x4, _x5) {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "dispose",
    value: function () {
      var _dispose = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!this.session) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this.session.release();
            case 1:
              this.session = undefined;
            case 2:
              this.ready = false;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function dispose() {
        return _dispose.apply(this, arguments);
      }
      return dispose;
    }()
  }]);
}();
var inferenceMap = {
  onnx: ONNXMLInference
};
var MLInferenceFactory = /*#__PURE__*/function () {
  function MLInferenceFactory() {
    _classCallCheck(this, MLInferenceFactory);
  }
  return _createClass(MLInferenceFactory, null, [{
    key: "getInference",
    value: function getInference(k) {
      return new inferenceMap[k]();
    }
  }]);
}();

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelFactory": () => (/* binding */ ModelFactory)
/* harmony export */ });
/* harmony import */ var onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! onnxruntime-web */ "./node_modules/onnxruntime-web/dist/esm/ort.min.js");
/* harmony import */ var _ml_inference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ml_inference */ "./src/ml_inference.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/* harmony import */ var _DenoiseFilter_denoise_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DenoiseFilter/denoise_filter */ "./src/DenoiseFilter/denoise_filter.js");
/* harmony import */ var _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/errorBus */ "./src/utils/errorBus.ts");
/* harmony import */ var wasm_feature_detect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wasm-feature-detect */ "./node_modules/wasm-feature-detect/dist/esm/index.js");
/* harmony import */ var _sliding_buffer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sliding_buffer */ "./src/sliding_buffer.ts");
/* harmony import */ var _utils_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/loader */ "./src/utils/loader.ts");
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








var ModelBase = /*#__PURE__*/function () {
  function ModelBase() {
    _classCallCheck(this, ModelBase);
    this._isReady = false;
    this._power = 100;
  }
  return _createClass(ModelBase, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(customer_id) {
        var inference,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              inference = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
              _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorBus.notify({
                type: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorType.INFO,
                message: "Init model: ".concat(this.getType()),
                emitter: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorEmitter.MODEL
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "getSupportedSampleRates",
    value: function getSupportedSampleRates() {
      return this._supporteFrameRate;
    }
  }, {
    key: "isSampleRateSupported",
    value: function isSampleRateSupported(sampleRate) {
      return this._supporteFrameRate.includes(sampleRate);
    }
  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "setPower",
    value: function setPower(power) {
      this._power = Math.trunc(Math.min(Math.max(0, power), 1) * 100);
    }
  }, {
    key: "getChunkSize",
    value: function getChunkSize() {
      return this._chunkSize;
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return this._isReady;
    }
  }, {
    key: "dispose",
    value: function () {
      var _dispose = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._isReady = false;
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function dispose() {
        return _dispose.apply(this, arguments);
      }
      return dispose;
    }()
  }]);
}();
var ModelSpeed = /*#__PURE__*/function (_ModelBase) {
  function ModelSpeed() {
    var _this;
    _classCallCheck(this, ModelSpeed);
    _this = _callSuper(this, ModelSpeed);
    _this.BLOCK_LENGTH = 512;
    _this.BLOCK_SHIFT = 128;
    _this._chunkSize = 128;
    _this._supporteFrameRate = [16000];
    _this.processingBuffer = new _sliding_buffer__WEBPACK_IMPORTED_MODULE_6__.SlidingWindowBuffer(_this.BLOCK_LENGTH);
    return _this;
  }
  _inherits(ModelSpeed, _ModelBase);
  return _createClass(ModelSpeed, [{
    key: "init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(customer_id) {
        var inference,
          _args3 = arguments,
          _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              inference = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              _context3.p = 1;
              this.outState1 = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", new Float32Array(this.BLOCK_LENGTH), [4, 1, 128]);
              this.outState2 = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", new Float32Array(this.BLOCK_LENGTH), [4, 1, 128]);
              this.yTest = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", new Float32Array(this.BLOCK_LENGTH), [1, this.BLOCK_LENGTH, 1]);
              this.y2Test = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", new Float32Array(this.BLOCK_LENGTH), [1, this.BLOCK_LENGTH, 1]);
              this.outputBuffer = new Float32Array(this.BLOCK_LENGTH);
              this.clear();
              this._inference = _ml_inference__WEBPACK_IMPORTED_MODULE_1__.MLInferenceFactory.getInference("onnx");
              _context3.n = 2;
              return this._inference.init(customer_id, this.getType());
            case 2:
              this._isReady = true;
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t = _context3.v;
              throw _t;
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function init(_x2) {
        return _init2.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "getType",
    value: function getType() {
      return "speed";
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(frames, preallocOutput) {
        var tensor, prealloc, result, shiftLength, i;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!(!this.isReady() || !this.processingBuffer || !this.outState1 || !this.outState2 || !this.yTest || !this.y2Test || !this.outputBuffer)) {
                _context4.n = 1;
                break;
              }
              throw new Error('Speed model is not ready to run');
            case 1:
              this.processingBuffer.push(frames);
              tensor = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", this.processingBuffer.view, [1, this.BLOCK_LENGTH, 1]);
              prealloc = {
                out_state1_test: this.outState1,
                out_state2_test: this.outState2,
                y_test: this.yTest,
                y2_test: this.y2Test
              };
              _context4.n = 2;
              return this._inference.run({
                x: tensor,
                input1: this.outState1,
                input2: this.outState2
              }, prealloc);
            case 2:
              result = _context4.v;
              this.outState1 = result["out_state1_test"];
              this.outState2 = result["out_state2_test"];
              this.yTest = result["y_test"];
              this.y2Test = result["y2_test"];
              shiftLength = this.BLOCK_LENGTH - this.BLOCK_SHIFT;
              for (i = 0; i < shiftLength; ++i) {
                this.outputBuffer[i] = this.outputBuffer[i + this.BLOCK_SHIFT] + this.yTest.data[i];
              }
              this.outputBuffer.set(this.yTest.data.subarray(shiftLength), shiftLength);
              if (!preallocOutput) {
                _context4.n = 3;
                break;
              }
              preallocOutput.set(this.outputBuffer.subarray(0, this.BLOCK_SHIFT));
              return _context4.a(2, preallocOutput);
            case 3:
              return _context4.a(2, this.outputBuffer.slice(0, this.BLOCK_SHIFT));
          }
        }, _callee4, this);
      }));
      function run(_x3, _x4) {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "clear",
    value: function clear() {
      var _a, _b;
      (_a = this.processingBuffer) === null || _a === void 0 ? void 0 : _a.fill(0);
      [this.outState1, this.outState2, this.yTest, this.y2Test].every(function (t) {
        return t === null || t === void 0 ? void 0 : t.data.fill(0);
      });
      (_b = this.outputBuffer) === null || _b === void 0 ? void 0 : _b.fill(0);
    }
  }, {
    key: "dispose",
    value: function () {
      var _dispose2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!this._inference) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this._inference.dispose();
            case 1:
              _context5.n = 2;
              return _superPropGet(ModelSpeed, "dispose", this, 3)([]);
            case 2:
              this.outState1 = null;
              this.outState2 = null;
              this.yTest = null;
              this.y2Test = null;
              this.outputBuffer = null;
              this.processingBuffer = null;
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function dispose() {
        return _dispose2.apply(this, arguments);
      }
      return dispose;
    }()
  }]);
}(ModelBase);
var ModelBalanced = /*#__PURE__*/function (_ModelBase2) {
  function ModelBalanced() {
    var _this2;
    _classCallCheck(this, ModelBalanced);
    _this2 = _callSuper(this, ModelBalanced);
    _this2._loader = new _utils_loader__WEBPACK_IMPORTED_MODULE_7__.Loader();
    _this2._chunkSize = 480;
    _this2._power = 100;
    _this2._supporteFrameRate = [32000, 44100, 48000];
    return _this2;
  }
  _inherits(ModelBalanced, _ModelBase2);
  return _createClass(ModelBalanced, [{
    key: "init",
    value: function () {
      var _init3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(customer_id) {
        var inference,
          isSIMD,
          model,
          dataobj,
          payload,
          key,
          result,
          _args6 = arguments,
          _t2,
          _t3,
          _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              inference = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : null;
              _context6.p = 1;
              _context6.n = 2;
              return (0,wasm_feature_detect__WEBPACK_IMPORTED_MODULE_5__.simd)();
            case 2:
              isSIMD = _context6.v;
              if (isSIMD) {
                _context6.n = 3;
                break;
              }
              _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorBus.notify({
                message: "Balanced preset requires wasm simd support",
                type: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorType.ERROR,
                code: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorCode.SUPPORT_ISSUE,
                emitter: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorEmitter.MODEL
              });
              throw new Error('Balanced preset requires wasm simd support');
            case 3:
              _context6.n = 4;
              return this._loader.get(_settings__WEBPACK_IMPORTED_MODULE_2__.DefaultConfig.getModelUrl(_settings__WEBPACK_IMPORTED_MODULE_2__.DefaultConfig.PRESETS[this.getType()]), _settings__WEBPACK_IMPORTED_MODULE_2__.DefaultConfig.CACHE_MODELS);
            case 4:
              model = _context6.v;
              if (model) {
                _context6.n = 5;
                break;
              }
              throw new Error();
            case 5:
              _t2 = URL;
              _context6.n = 6;
              return model.blob();
            case 6:
              _t3 = _context6.v;
              dataobj = _t2.createObjectURL.call(_t2, _t3);
              _context6.n = 7;
              return (0,_DenoiseFilter_denoise_filter__WEBPACK_IMPORTED_MODULE_3__["default"])(dataobj, _settings__WEBPACK_IMPORTED_MODULE_2__.DefaultConfig.CUSTOMER_ID);
            case 7:
              this._filter = _context6.v;
              URL.revokeObjectURL(dataobj);
              this._filter.setAttenLim(this._power);
              payload = this._filter.configure();
              if (!(typeof globalThis.requestAuthFromMainThread === 'function')) {
                _context6.n = 9;
                break;
              }
              _context6.n = 8;
              return globalThis.requestAuthFromMainThread(payload, "authkey");
            case 8:
              key = _context6.v;
              _context6.n = 10;
              break;
            case 9:
              throw new Error("Auth helper not available - must be called from worker context");
            case 10:
              result = JSON.parse(this._filter.auth(key));
              if (!(result.status != "active")) {
                _context6.n = 11;
                break;
              }
              _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorBus.notify({
                message: "Authentication failed",
                type: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorType.ERROR,
                code: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorCode.AUTH_ISSUE,
                emitter: _utils_errorBus__WEBPACK_IMPORTED_MODULE_4__.ErrorEmitter.MODEL
              });
              throw new Error("Authentication failed");
            case 11:
              this._isReady = true;
              _context6.n = 13;
              break;
            case 12:
              _context6.p = 12;
              _t4 = _context6.v;
              throw _t4;
            case 13:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 12]]);
      }));
      function init(_x5) {
        return _init3.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "getType",
    value: function getType() {
      return "balanced";
    }
  }, {
    key: "setPower",
    value: function setPower(power) {
      _superPropGet(ModelBalanced, "setPower", this, 3)([power]);
      if (this._filter) {
        this._filter.setAttenLim(this._power);
      }
    }
  }, {
    key: "run",
    value: function () {
      var _run2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(frames, preallocOutput) {
        var _this$_filter$process, output, lsnr;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (this.isReady()) {
                _context7.n = 1;
                break;
              }
              throw new Error('Balanced model is not ready to run');
            case 1:
              _this$_filter$process = this._filter.processFrame(frames, preallocOutput), output = _this$_filter$process.output, lsnr = _this$_filter$process.lsnr;
              return _context7.a(2, output);
          }
        }, _callee7, this);
      }));
      function run(_x6, _x7) {
        return _run2.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "clear",
    value: function clear() {
      var _a;
      (_a = this._filter) === null || _a === void 0 ? void 0 : _a.resetRecurrent();
    }
  }, {
    key: "dispose",
    value: function () {
      var _dispose3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return _superPropGet(ModelBalanced, "dispose", this, 3)([]);
            case 1:
              if (this._filter && typeof this._filter.dispose === 'function') {
                this._filter.dispose();
              }
              this._filter = null;
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function dispose() {
        return _dispose3.apply(this, arguments);
      }
      return dispose;
    }()
  }]);
}(ModelBase);
var ModelQuality = /*#__PURE__*/function (_ModelBase3) {
  function ModelQuality() {
    var _this3;
    _classCallCheck(this, ModelQuality);
    _this3 = _callSuper(this, ModelQuality);
    _this3._chunkSize = 2048;
    _this3._supporteFrameRate = [16000];
    return _this3;
  }
  _inherits(ModelQuality, _ModelBase3);
  return _createClass(ModelQuality, [{
    key: "getType",
    value: function getType() {
      return "quality";
    }
  }, {
    key: "init",
    value: function () {
      var _init4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(customer_id) {
        var inference,
          _args9 = arguments,
          _t5;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              inference = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
              _context9.p = 1;
              this.initInputOutputBuffers();
              this._inference = _ml_inference__WEBPACK_IMPORTED_MODULE_1__.MLInferenceFactory.getInference("onnx");
              _context9.n = 2;
              return this._inference.init(customer_id, this.getType());
            case 2:
              this._isReady = true;
              _context9.n = 4;
              break;
            case 3:
              _context9.p = 3;
              _t5 = _context9.v;
              throw _t5;
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function init(_x8) {
        return _init4.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "run",
    value: function () {
      var _run3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(frames, preallocOutput) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (!(!this.isReady() || !this.inputBuffer || !this.preallocBuffers || !this.outputArray)) {
                _context0.n = 1;
                break;
              }
              throw Error('Quality model is not ready to run');
            case 1:
              this.inputBuffer["input"] = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", frames, [1, this._chunkSize]);
              if (preallocOutput) {
                this.preallocBuffers["output"] = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", preallocOutput, [1, this._chunkSize]);
              } else {
                this.preallocBuffers["output"] = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", this.outputArray, [1, this._chunkSize]);
              }
              _context0.n = 2;
              return this._inference.run(this.inputBuffer, this.preallocBuffers);
            case 2:
              if (!preallocOutput) {
                _context0.n = 3;
                break;
              }
              return _context0.a(2, preallocOutput);
            case 3:
              return _context0.a(2, this.outputArray.slice(0));
          }
        }, _callee0, this);
      }));
      function run(_x9, _x0) {
        return _run3.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "clear",
    value: function clear() {
      var _a;
      if (this.inputBuffer) {
        for (var key in this.inputBuffer) {
          if (key.startsWith("inp_state")) {
            this.inputBuffer[key].data.fill(0);
          }
        }
      }
      (_a = this.outputArray) === null || _a === void 0 ? void 0 : _a.fill(0);
    }
  }, {
    key: "dispose",
    value: function () {
      var _dispose4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (!this._inference) {
                _context1.n = 1;
                break;
              }
              _context1.n = 1;
              return this._inference.dispose();
            case 1:
              _context1.n = 2;
              return _superPropGet(ModelQuality, "dispose", this, 3)([]);
            case 2:
              this.inputBuffer = null;
              this.preallocBuffers = null;
              this.outputArray = null;
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function dispose() {
        return _dispose4.apply(this, arguments);
      }
      return dispose;
    }()
  }, {
    key: "initInputOutputBuffers",
    value: function initInputOutputBuffers() {
      function zT(dims) {
        return new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", new Float32Array(dims.reduce(function (a, b) {
          return a * b;
        })).fill(0), dims);
      }
      this.inputBuffer = {
        input: new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", [0], [1]),
        inp_state_000: zT([1, 128]),
        inp_state_001: zT([1, 2, 129, 2]),
        inp_state_002: zT([1, 18, 129, 2]),
        inp_state_003: zT([1, 34, 129, 2]),
        inp_state_004: zT([1, 129, 32, 32]),
        inp_state_005: zT([1, 129, 32, 32]),
        inp_state_006: zT([1, 32, 64, 2]),
        inp_state_007: zT([1, 48, 64, 2]),
        inp_state_008: zT([1, 64, 64, 2]),
        inp_state_009: zT([1, 64, 64, 22]),
        inp_state_010: zT([1, 64, 64, 22]),
        inp_state_011: zT([1, 64, 32, 2]),
        inp_state_012: zT([1, 96, 32, 2]),
        inp_state_013: zT([1, 128, 32, 2]),
        inp_state_014: zT([1, 32, 128, 16]),
        inp_state_015: zT([1, 32, 128, 16]),
        inp_state_016: zT([1, 128, 16, 2]),
        inp_state_017: zT([1, 192, 16, 2]),
        inp_state_018: zT([1, 256, 16, 2]),
        inp_state_019: zT([1, 16, 256, 11]),
        inp_state_020: zT([1, 16, 256, 11]),
        inp_state_021: zT([1, 256, 8, 2]),
        inp_state_022: zT([1, 384, 8, 2]),
        inp_state_023: zT([1, 512, 8, 2]),
        inp_state_024: zT([1, 8, 256, 8]),
        inp_state_025: zT([1, 8, 256, 8]),
        inp_state_026: zT([1, 512, 16, 2]),
        inp_state_027: zT([1, 256, 16, 2]),
        inp_state_028: zT([1, 384, 16, 2]),
        inp_state_029: zT([1, 512, 16, 2]),
        inp_state_030: zT([1, 16, 128, 11]),
        inp_state_031: zT([1, 16, 128, 11]),
        inp_state_032: zT([1, 256, 32, 2]),
        inp_state_033: zT([1, 128, 32, 2]),
        inp_state_034: zT([1, 192, 32, 2]),
        inp_state_035: zT([1, 256, 32, 2]),
        inp_state_036: zT([1, 32, 64, 16]),
        inp_state_037: zT([1, 32, 64, 16]),
        inp_state_038: zT([1, 128, 64, 2]),
        inp_state_039: zT([1, 64, 64, 2]),
        inp_state_040: zT([1, 96, 64, 2]),
        inp_state_041: zT([1, 128, 64, 2]),
        inp_state_042: zT([1, 64, 32, 22]),
        inp_state_043: zT([1, 64, 32, 22]),
        inp_state_044: zT([1, 64, 129, 2]),
        inp_state_045: zT([1, 32, 129, 2]),
        inp_state_046: zT([1, 48, 129, 2]),
        inp_state_047: zT([1, 64, 129, 2]),
        inp_state_048: zT([1, 2, 129, 4]),
        inp_state_049: zT([1, 2, 129, 1])
      };
      this.preallocBuffers = {};
      for (var key in this.inputBuffer) {
        if (key.startsWith("inp_state")) {
          this.preallocBuffers[key.replace("inp_", "out_")] = this.inputBuffer[key];
        }
      }
      this.outputArray = new Float32Array(this._chunkSize);
      this.preallocBuffers["output"] = new onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.Tensor("float32", this.outputArray, [1, this._chunkSize]);
    }
  }]);
}(ModelBase);
var modelTypesMap = {
  speed: ModelSpeed,
  balanced: ModelBalanced,
  quality: ModelQuality
};
var readyModelMap = new Map();
var ModelFactory = /*#__PURE__*/function () {
  function ModelFactory() {
    _classCallCheck(this, ModelFactory);
  }
  return _createClass(ModelFactory, null, [{
    key: "setThreadNumber",
    value: function setThreadNumber(threadNum) {
      onnxruntime_web__WEBPACK_IMPORTED_MODULE_0__.env.wasm.numThreads = threadNum;
    }
  }, {
    key: "getModel",
    value: function getModel(k) {
      if (!readyModelMap.has(k)) readyModelMap.set(k, new modelTypesMap[k]());
      return readyModelMap.get(k);
    }
  }]);
}();

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultConfig": () => (/* binding */ DefaultConfig),
/* harmony export */   "Settings": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "./package.json");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

var Settings = /*#__PURE__*/_createClass(function Settings() {
  _classCallCheck(this, Settings);
});
Settings.APP_ENV = "web";
Settings.API_URL = "https://effectssdk.ai/sdk/session/";
Settings.BASE_URL = "https://effectssdk.ai/sdk/";
Settings.SDK_URL = Settings.BASE_URL + "audio/";
Settings.PRESET = "balanced";
Settings.SAMPLE_RATE = 32000;
Settings.PROCESSING_CHUNK_MS = 64;
Settings.CUSTOMER_ID = "";
Settings.PROCESSOR_TYPE = "worklet";
;
var DefaultConfig = /*#__PURE__*/function () {
  function DefaultConfig() {
    _classCallCheck(this, DefaultConfig);
  }
  return _createClass(DefaultConfig, null, [{
    key: "getConfig",
    value: function getConfig() {
      return {
        version: this.VERSION,
        appEnv: this.APP_ENV,
        apiUrl: this.API_URL,
        sdkUrl: this.SDK_URL,
        preset: this.PRESET,
        sampleRate: this.SAMPLE_RATE,
        customerID: this.CUSTOMER_ID,
        currentSrc: this.CURRENT_SRC,
        wasmPaths: this.WASM_PATHS,
        presets: this.PRESETS,
        cacheModels: this.CACHE_MODELS,
        processingChunk: this.PROCESSING_CHUNK_MS,
        workletPath: this.WORKLET_PATH,
        workerPath: this.WORKER_PATH,
        processorType: this.PROCESSOR_TYPE,
        studioSound: this.STUDIO_SOUND
      };
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.VERSION = config.version;
      this.APP_ENV = config.appEnv;
      this.API_URL = config.apiUrl;
      this.PRESET = config.preset;
      this.SAMPLE_RATE = config.sampleRate;
      this.CUSTOMER_ID = config.customerID;
      this.SDK_URL = config.sdkUrl;
      this.CURRENT_SRC = config.currentSrc;
      this.WASM_PATHS = config.wasmPaths;
      this.PRESETS = config.presets;
      this.CACHE_MODELS = config.cacheModels;
      this.PROCESSING_CHUNK_MS = config.processingChunk;
      this.WORKLET_PATH = config.workletPath;
      this.WORKER_PATH = config.workerPath;
      this.PROCESSOR_TYPE = config.processorType;
      this.STUDIO_SOUND = config.studioSound;
    }
  }, {
    key: "getModelUrl",
    value: function getModelUrl(model) {
      return DefaultConfig.SDK_URL + model;
    }
  }, {
    key: "getPresetUrl",
    value: function getPresetUrl(preset) {
      return DefaultConfig.SDK_URL + preset;
    }
  }, {
    key: "getCurrentPath",
    value: function getCurrentPath() {
      var _a;
      DefaultConfig.CURRENT_SRC = typeof document !== 'undefined' ? (_a = document === null || document === void 0 ? void 0 : document.currentScript) === null || _a === void 0 ? void 0 : _a.src : undefined;
      if (DefaultConfig.CURRENT_SRC !== undefined) {
        DefaultConfig.CURRENT_SRC = DefaultConfig.CURRENT_SRC.slice(0, DefaultConfig.CURRENT_SRC.lastIndexOf('/') + 1);
      }
    }
  }, {
    key: "setWasmPath",
    value: function setWasmPath() {
      DefaultConfig.WASM_PATHS = {
        "ort-wasm.wasm": DefaultConfig.CURRENT_SRC + "ort-wasm.wasm",
        "ort-wasm-simd.wasm": DefaultConfig.CURRENT_SRC + "ort-wasm-simd.wasm",
        "ort-wasm-threaded.wasm": DefaultConfig.CURRENT_SRC + "ort-wasm-threaded.wasm",
        "ort-wasm-simd-threaded.wasm": DefaultConfig.CURRENT_SRC + "ort-wasm-simd-threaded.wasm"
      };
    }
  }, {
    key: "setVersion",
    value: function setVersion() {
      DefaultConfig.VERSION = _package_json__WEBPACK_IMPORTED_MODULE_0__.version;
    }
  }]);
}();
DefaultConfig.VERSION = "0.0.0";
DefaultConfig.APP_ENV = Settings.APP_ENV;
DefaultConfig.API_URL = Settings.API_URL;
DefaultConfig.PRESET = Settings.PRESET;
DefaultConfig.SAMPLE_RATE = Settings.SAMPLE_RATE;
DefaultConfig.CUSTOMER_ID = Settings.CUSTOMER_ID;
DefaultConfig.SDK_URL = Settings.SDK_URL;
DefaultConfig.PROXY = true;
DefaultConfig.CACHE_MODELS = true;
DefaultConfig.CURRENT_SRC = undefined;
DefaultConfig.PROCESSING_CHUNK_MS = Settings.PROCESSING_CHUNK_MS;
DefaultConfig.WASM_PATHS = {};
DefaultConfig.PRESETS = {
  "quality": "models/audio-model-2.5.0.tsvb",
  "balanced": "models/audio-model-3.3.2.wasm",
  "speed": "models/audio-model-1.0.1.tsvb"
};
DefaultConfig.WORKLET_PATH = '';
DefaultConfig.WORKER_PATH = '';
DefaultConfig.PROCESSOR_TYPE = Settings.PROCESSOR_TYPE;
DefaultConfig.STUDIO_SOUND = false;

/***/ }),

/***/ "./src/sliding_buffer.ts":
/*!*******************************!*\
  !*** ./src/sliding_buffer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SlidingWindowBuffer": () => (/* binding */ SlidingWindowBuffer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SlidingWindowBuffer = /*#__PURE__*/function () {
  function SlidingWindowBuffer(windowSize) {
    _classCallCheck(this, SlidingWindowBuffer);
    this.winSize = windowSize;
    this.storage = new Float32Array(windowSize);
  }
  return _createClass(SlidingWindowBuffer, [{
    key: "push",
    value: function push(chunk) {
      this.storage.copyWithin(0, chunk.length);
      this.storage.set(chunk, this.winSize - chunk.length);
    }
  }, {
    key: "view",
    get: function get() {
      return this.storage;
    }
  }, {
    key: "fill",
    value: function fill(v) {
      this.storage.fill(v);
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/buffers/bufferPool.ts":
/*!*****************************************!*\
  !*** ./src/utils/buffers/bufferPool.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferPool": () => (/* binding */ BufferPool)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BufferPool = /*#__PURE__*/function () {
  function BufferPool(name) {
    _classCallCheck(this, BufferPool);
    this.u8Buffers = {};
    this.f32Buffers = {};
    this.MAX_PER_LENGTH = 50;
    if (name) this.name = name;
  }
  return _createClass(BufferPool, [{
    key: "getBuffer",
    value: function getBuffer(type, length) {
      var dict = type === "f32" ? this.f32Buffers : this.u8Buffers;
      var list = dict[length];
      if (list && list.length) return list.pop();
      return type === "f32" ? new Float32Array(length) : new Uint8Array(length);
    }
  }, {
    key: "returnBuffer",
    value: function returnBuffer(buf) {
      var length = buf.length;
      if (buf instanceof Float32Array) {
        this.returnAs(buf, this.f32Buffers, length);
      } else {
        this.returnAs(buf, this.u8Buffers, length);
      }
    }
  }, {
    key: "returnAs",
    value: function returnAs(buf, map, length) {
      var _a;
      var list = (_a = map[length]) !== null && _a !== void 0 ? _a : map[length] = [];
      if (list.length < this.MAX_PER_LENGTH) {
        list.push(buf);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.u8Buffers = {};
      this.f32Buffers = {};
    }
  }, {
    key: "trim",
    value: function trim() {
      var maxPerLen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.MAX_PER_LENGTH;
      for (var _i = 0, _arr = [this.u8Buffers, this.f32Buffers]; _i < _arr.length; _i++) {
        var m = _arr[_i];
        for (var k in m) {
          var list = m[k];
          if (list.length > maxPerLen) list.length = maxPerLen;
        }
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/buffers/ringBuffer.ts":
/*!*****************************************!*\
  !*** ./src/utils/buffers/ringBuffer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RingBuffer": () => (/* binding */ RingBuffer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RingBuffer = /*#__PURE__*/function () {
  function RingBuffer(length) {
    _classCallCheck(this, RingBuffer);
    this._readIndex = 0;
    this._writeIndex = 0;
    this._framesAvailable = 0;
    this._channelData = new Float32Array(length);
  }
  return _createClass(RingBuffer, [{
    key: "framesAvailable",
    get: function get() {
      return this._framesAvailable;
    }
  }, {
    key: "push",
    value: function push(input) {
      if (input.length < 1) {
        return;
      }
      var srcOffset = Math.max(0, input.length - this.capacity);
      var firstLen = Math.min(input.length - srcOffset, this.capacity - this._writeIndex);
      this.copyFrom(input, srcOffset, this._writeIndex, firstLen);
      this._writeIndex = (this._writeIndex + firstLen) % this.capacity;
      srcOffset += firstLen;
      var secondLen = input.length - srcOffset;
      if (secondLen > 0) {
        this.copyFrom(input, srcOffset, this._writeIndex, secondLen);
        this._writeIndex = (this._writeIndex + secondLen) % this.capacity;
      }
      this._framesAvailable += firstLen + secondLen;
      this._framesAvailable = Math.min(this._framesAvailable, this.capacity);
    }
  }, {
    key: "pull",
    value: function pull(output) {
      var firstLen = Math.min(output.length, this._framesAvailable, this.capacity - this._readIndex);
      if (firstLen > 0) {
        this.copyTo(output, 0, this._readIndex, firstLen);
        this._readIndex = (this._readIndex + firstLen) % this.capacity;
        this._framesAvailable -= firstLen;
      }
      var secondLen = Math.min(output.length - firstLen, this._framesAvailable);
      if (secondLen > 0) {
        var outputOffset = firstLen;
        this.copyTo(output, outputOffset, this._readIndex, secondLen);
        this._readIndex = (this._readIndex + secondLen) % this.capacity;
        this._framesAvailable -= secondLen;
      }
    }
  }, {
    key: "updateReadIndex",
    value: function updateReadIndex(destinationLength) {
      this._readIndex = (this._readIndex + destinationLength) % this.capacity;
      this._framesAvailable = Math.max(this._framesAvailable - destinationLength, 0);
    }
  }, {
    key: "drop",
    value: function drop(count) {
      this.updateReadIndex(count);
    }
  }, {
    key: "capacity",
    get: function get() {
      return this._channelData.length;
    }
  }, {
    key: "copyFrom",
    value: function copyFrom(input, inputOffset, thisOffset, length) {
      this._channelData.set(input.subarray(inputOffset, inputOffset + length), thisOffset);
    }
  }, {
    key: "copyTo",
    value: function copyTo(output, dstOffset, thisOffset, length) {
      output.set(this._channelData.subarray(thisOffset, thisOffset + length), dstOffset);
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/errorBus.ts":
/*!*******************************!*\
  !*** ./src/utils/errorBus.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorBus": () => (/* binding */ ErrorBus),
/* harmony export */   "ErrorCode": () => (/* binding */ ErrorCode),
/* harmony export */   "ErrorEmitter": () => (/* binding */ ErrorEmitter),
/* harmony export */   "ErrorType": () => (/* binding */ ErrorType)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _ErrorBus = /*#__PURE__*/function () {
  function _ErrorBus() {
    _classCallCheck(this, _ErrorBus);
  }
  return _createClass(_ErrorBus, [{
    key: "subscribe",
    value: function subscribe(f) {
      if (typeof f !== "function") return;
      this.onErrorFunction = f;
    }
  }, {
    key: "notify",
    value: function notify(n) {
      if (typeof this.onErrorFunction !== "function") return;
      if (n.emitter) {
        n.message = "[ ".concat(n.emitter, " ]: ").concat(n.message);
      }
      if (!n.type) {
        n.type = ErrorType.ERROR;
      }
      this.onErrorFunction(n);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!_ErrorBus._instance) {
        _ErrorBus._instance = new _ErrorBus();
      }
      return _ErrorBus._instance;
    }
  }]);
}();
var ErrorBus = _ErrorBus.getInstance();
var ErrorCode;
(function (ErrorCode) {
  ErrorCode[ErrorCode["PERFORMANCE_STOP"] = 1001] = "PERFORMANCE_STOP";
  ErrorCode[ErrorCode["REDUCE_LATENCY"] = 1002] = "REDUCE_LATENCY";
  ErrorCode[ErrorCode["MODEL_LOAD_FAILED"] = 1010] = "MODEL_LOAD_FAILED";
  ErrorCode[ErrorCode["PROCESSOR_INIT_ISSUE"] = 1020] = "PROCESSOR_INIT_ISSUE";
  ErrorCode[ErrorCode["AUTH_ISSUE"] = 1030] = "AUTH_ISSUE";
  ErrorCode[ErrorCode["SUPPORT_ISSUE"] = 1040] = "SUPPORT_ISSUE";
  ErrorCode[ErrorCode["PROCESSING_PROGRESS"] = 1060] = "PROCESSING_PROGRESS";
})(ErrorCode || (ErrorCode = {}));
var ErrorType;
(function (ErrorType) {
  ErrorType["INFO"] = "info";
  ErrorType["WARNING"] = "warning";
  ErrorType["ERROR"] = "error";
})(ErrorType || (ErrorType = {}));
var ErrorEmitter;
(function (ErrorEmitter) {
  ErrorEmitter["ATSVB"] = "atsvb";
  ErrorEmitter["STREAM_PROCESSOR"] = "stream_processor";
  ErrorEmitter["ML_INFERENCE"] = "ml_inference";
  ErrorEmitter["MODEL"] = "model";
  ErrorEmitter["WORKLET"] = "worklet";
  ErrorEmitter["WORKER"] = "worker";
  ErrorEmitter["MODEL_LOADER"] = "model_loader";
})(ErrorEmitter || (ErrorEmitter = {}));

/***/ }),

/***/ "./src/utils/loader.ts":
/*!*****************************!*\
  !*** ./src/utils/loader.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _errorBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorBus */ "./src/utils/errorBus.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Loader = /*#__PURE__*/function () {
  function Loader() {
    _classCallCheck(this, Loader);
    this._name = 'atsvb';
  }
  return _createClass(Loader, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, cache) {
        var response, clone, _t, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (this._cache) {
                _context.n = 4;
                break;
              }
              _context.p = 1;
              _context.n = 2;
              return caches.open(this._name);
            case 2:
              this._cache = _context.v;
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
            case 4:
              if (!this._cache) {
                _context.n = 6;
                break;
              }
              _context.n = 5;
              return this._cache.match(url);
            case 5:
              response = _context.v;
              if (!(response !== undefined)) {
                _context.n = 6;
                break;
              }
              return _context.a(2, response);
            case 6:
              _context.p = 6;
              _context.n = 7;
              return fetch(url);
            case 7:
              response = _context.v;
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t2 = _context.v;
              _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorBus.notify({
                message: _t2.message,
                emitter: _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorEmitter.MODEL_LOADER,
                code: _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorCode.MODEL_LOAD_FAILED,
                cause: _t2
              });
              return _context.a(2, null);
            case 9:
              if (!(response && !response.ok)) {
                _context.n = 11;
                break;
              }
              _t3 = _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorBus;
              _context.n = 10;
              return response.text();
            case 10:
              _t4 = _context.v;
              _t5 = _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorEmitter.MODEL_LOADER;
              _t6 = _errorBus__WEBPACK_IMPORTED_MODULE_0__.ErrorCode.MODEL_LOAD_FAILED;
              _t7 = {
                message: _t4,
                emitter: _t5,
                code: _t6
              };
              _t3.notify.call(_t3, _t7);
              return _context.a(2, null);
            case 11:
              if (!(cache && this._cache && response)) {
                _context.n = 15;
                break;
              }
              _context.p = 12;
              clone = response.clone();
              _context.n = 13;
              return this._cache.put(url, response);
            case 13:
              return _context.a(2, clone);
            case 14:
              _context.p = 14;
              _t8 = _context.v;
              return _context.a(2, clone);
            case 15:
              return _context.a(2, response);
          }
        }, _callee, this, [[12, 14], [6, 8], [1, 3]]);
      }));
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _t9;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return caches["delete"](this._name);
            case 1:
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t9 = _context2.v;
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
}();

/***/ }),

/***/ "./src/workers/postmessageTypes.ts":
/*!*****************************************!*\
  !*** ./src/workers/postmessageTypes.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WORKER_PROCESSOR_POSTMESSAGE_TYPE": () => (/* binding */ WORKER_PROCESSOR_POSTMESSAGE_TYPE),
/* harmony export */   "WORKLET_PROCESSOR_POSTMESSAGE_TYPE": () => (/* binding */ WORKLET_PROCESSOR_POSTMESSAGE_TYPE)
/* harmony export */ });
var WORKER_PROCESSOR_POSTMESSAGE_TYPE;
(function (WORKER_PROCESSOR_POSTMESSAGE_TYPE) {
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["PROCESSOR_READY"] = "processor_ready";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["WORKLET_PORT"] = "worklet_port";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["DENOISE_POWER"] = "denoise_power";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["ERROR"] = "error";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["ERROR_BUS"] = "error_bus";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["INIT"] = "init";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["CLEAN"] = "clean";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["DBG_DELAY_PROCESSING"] = "delay_processing";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["AUTH_REQUEST"] = "auth_request";
  WORKER_PROCESSOR_POSTMESSAGE_TYPE["AUTH_RESPONSE"] = "auth_response";
})(WORKER_PROCESSOR_POSTMESSAGE_TYPE || (WORKER_PROCESSOR_POSTMESSAGE_TYPE = {}));
var WORKLET_PROCESSOR_POSTMESSAGE_TYPE;
(function (WORKLET_PROCESSOR_POSTMESSAGE_TYPE) {
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["STUDIO_SOUND_OPTIONS"] = "studio_sound_options";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["STUDIO_AUDIO_METRICS"] = "studio_audio_metrics";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["START_PROCESSING"] = "start_processing";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["STOP_PROCESSING"] = "stop_processing";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["PROCESSING_CHUNK"] = "processing_chunk";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["WORKER_PORT"] = "worker_port";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["PERFORMANCE_STOP"] = "performance_stop";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["SPEEDUP_VOICE"] = "speedup_voice";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["MODEL_SAMPLE_RATE"] = "model_sample_rate";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["ERROR"] = "error";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["INFO"] = "info";
  WORKLET_PROCESSOR_POSTMESSAGE_TYPE["DBG_PUSH_SILENCE"] = "push_silence";
})(WORKLET_PROCESSOR_POSTMESSAGE_TYPE || (WORKLET_PROCESSOR_POSTMESSAGE_TYPE = {}));

/***/ }),

/***/ "./src/DenoiseFilter/denoise_filter.js":
/*!*********************************************!*\
  !*** ./src/DenoiseFilter/denoise_filter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wasm_bindings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_bindings.js */ "./src/DenoiseFilter/wasm_bindings.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _module = /*#__PURE__*/new WeakMap();
var _filter_state = /*#__PURE__*/new WeakMap();
var _inputPtr = /*#__PURE__*/new WeakMap();
var _outputPtr = /*#__PURE__*/new WeakMap();
var _initialized = /*#__PURE__*/new WeakMap();
var _disposed = /*#__PURE__*/new WeakMap();
var _DenoiseFilter_brand = /*#__PURE__*/new WeakSet();
var DenoiseFilter = /*#__PURE__*/function () {
  function DenoiseFilter(wasmModule, customerId) {
    _classCallCheck(this, DenoiseFilter);
    _classPrivateMethodInitSpec(this, _DenoiseFilter_brand);
    _classPrivateFieldInitSpec(this, _module, void 0);
    _classPrivateFieldInitSpec(this, _filter_state, void 0);
    _classPrivateFieldInitSpec(this, _inputPtr, void 0);
    _classPrivateFieldInitSpec(this, _outputPtr, void 0);
    _classPrivateFieldInitSpec(this, _initialized, void 0);
    _classPrivateFieldInitSpec(this, _disposed, void 0);
    if (!wasmModule) {
      throw new Error("Expected wasm module");
    }
    if (!customerId) {
      throw new Error("Expected customer id (string)");
    }
    _classPrivateFieldSet(_module, this, wasmModule);
    _classPrivateFieldSet(_inputPtr, this, 0);
    _classPrivateFieldSet(_outputPtr, this, 0);
    _classPrivateFieldSet(_disposed, this, false);
    _classPrivateFieldSet(_initialized, this, false);
    var customerIdPtr = _classPrivateFieldGet(_module, this).stringToNewUTF8(customerId);
    _classPrivateFieldSet(_filter_state, this, _classPrivateFieldGet(_module, this)._state_create(customerIdPtr));
    _classPrivateFieldGet(_module, this)._free(customerIdPtr);
  }
  return _createClass(DenoiseFilter, [{
    key: "configure",
    value: function configure() {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_disposed).call(this);
      var strPtr = _classPrivateFieldGet(_module, this)._state_configure(_classPrivateFieldGet(_filter_state, this));
      if (0 == strPtr) {
        _assertClassBrand(_DenoiseFilter_brand, this, _throw_last_error).call(this);
      }
      var request = _classPrivateFieldGet(_module, this).UTF8ToString(strPtr);
      _classPrivateFieldGet(_module, this)._free(strPtr);
      return request;
    }
  }, {
    key: "auth",
    value: function auth(response) {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_disposed).call(this);
      var responsePtr = _classPrivateFieldGet(_module, this).stringToNewUTF8(response);
      var resultPtr = _classPrivateFieldGet(_module, this)._state_auth(_classPrivateFieldGet(_filter_state, this), responsePtr);
      _classPrivateFieldGet(_module, this)._free(responsePtr);
      if (0 == resultPtr) {
        _assertClassBrand(_DenoiseFilter_brand, this, _throw_last_error).call(this);
      }
      var result = _classPrivateFieldGet(_module, this).UTF8ToString(resultPtr);
      _classPrivateFieldGet(_module, this)._free(resultPtr);
      var resultJson = JSON.parse(result);
      _classPrivateFieldSet(_initialized, this, resultJson.status == "active");
      if (_classPrivateFieldGet(_initialized, this)) {
        _assertClassBrand(_DenoiseFilter_brand, this, _initBuffers).call(this);
      }
      return result;
    }
  }, {
    key: "frameLength",
    value: function frameLength() {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_uninit).call(this);
      return _classPrivateFieldGet(_module, this)._state_get_frame_length(_classPrivateFieldGet(_filter_state, this));
    }
  }, {
    key: "bytesPerFrame",
    value: function bytesPerFrame() {
      return this.frameLength() * Float32Array.BYTES_PER_ELEMENT;
    }
  }, {
    key: "setAttenLim",
    value: function setAttenLim(lim_db) {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_disposed).call(this);
      _classPrivateFieldGet(_module, this)._state_set_atten_lim(_classPrivateFieldGet(_filter_state, this), lim_db);
    }
  }, {
    key: "setPostFilterBeta",
    value: function setPostFilterBeta(beta) {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_disposed).call(this);
      _classPrivateFieldGet(_module, this)._state_set_pf_beta(_classPrivateFieldGet(_filter_state, this), beta);
    }
  }, {
    key: "processFrame",
    value: function processFrame(input) {
      var preallocOutput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_uninit).call(this);
      if (!(input instanceof Float32Array)) {
        throw new Error("Unexpected input type. (Expected: Float32Array)");
      }
      var bytesPerFrame = this.bytesPerFrame();
      if (input.byteLength != bytesPerFrame) {
        throw new Error("Incorrect input size, expected: " + bytesPerFrame);
      }
      var elementSize = Float32Array.BYTES_PER_ELEMENT;
      var inPtr = _assertClassBrand(_DenoiseFilter_brand, this, _alignPtr).call(this, _classPrivateFieldGet(_inputPtr, this), elementSize);
      var outPtr = _assertClassBrand(_DenoiseFilter_brand, this, _alignPtr).call(this, _classPrivateFieldGet(_outputPtr, this), elementSize);
      _classPrivateFieldGet(_module, this).HEAPF32.set(input, inPtr / elementSize);
      var frameLength = this.frameLength();
      var code = _classPrivateFieldGet(_module, this)._state_process_frame(_classPrivateFieldGet(_filter_state, this), inPtr, frameLength, outPtr, frameLength);
      if (0 != code) {
        _assertClassBrand(_DenoiseFilter_brand, this, _throw_last_error).call(this);
      }
      var outF32Offset = outPtr / elementSize;
      var lsnr = _classPrivateFieldGet(_module, this)._state_get_last_lsnr(_classPrivateFieldGet(_filter_state, this));
      if (preallocOutput !== null) {
        var view = _classPrivateFieldGet(_module, this).HEAPF32.subarray(outF32Offset, outF32Offset + frameLength);
        preallocOutput.set(view);
        return {
          output: preallocOutput,
          lsnr: lsnr
        };
      }
      return {
        output: _classPrivateFieldGet(_module, this).HEAPF32.slice(outF32Offset, outF32Offset + frameLength),
        lsnr: lsnr
      };
    }
  }, {
    key: "processLSNR",
    value: function processLSNR(input) {
      if (!(input instanceof Float32Array)) {
        throw new Error("Unexpected input type. (Expected: Float32Array)");
      }
      var bytesPerFrame = this.bytesPerFrame();
      if (input.byteLength != bytesPerFrame) {
        throw new Error("Incorrect input size, expected: " + bytesPerFrame);
      }
      var elementSize = Float32Array.BYTES_PER_ELEMENT;
      var inPtr = _assertClassBrand(_DenoiseFilter_brand, this, _alignPtr).call(this, _classPrivateFieldGet(_inputPtr, this), elementSize);
      _classPrivateFieldGet(_module, this).HEAPF32.set(input, inPtr / elementSize);
      var frameLength = this.frameLength();
      var code = _classPrivateFieldGet(_module, this)._state_process_lsnr(_classPrivateFieldGet(_filter_state, this), inPtr, frameLength);
      if (0 != code) {
        _assertClassBrand(_DenoiseFilter_brand, this, _throw_last_error).call(this);
      }
      return _classPrivateFieldGet(_module, this)._state_get_last_lsnr(_classPrivateFieldGet(_filter_state, this));
    }
  }, {
    key: "resetRecurrent",
    value: function resetRecurrent() {
      _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_uninit).call(this);
      _classPrivateFieldGet(_module, this)._state_reset_recurrent_state(_classPrivateFieldGet(_filter_state, this));
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _classPrivateFieldGet(_module, this)._state_destroy(_classPrivateFieldGet(_filter_state, this));
      _classPrivateFieldGet(_module, this)._free(_classPrivateFieldGet(_inputPtr, this));
      _classPrivateFieldSet(_inputPtr, this, 0);
      _classPrivateFieldGet(_module, this)._free(_classPrivateFieldGet(_outputPtr, this));
      _classPrivateFieldSet(_outputPtr, this, 0);
      _classPrivateFieldSet(_disposed, this, true);
      _classPrivateFieldSet(_initialized, this, false);
      _classPrivateFieldSet(_filter_state, this, 0);
      _classPrivateFieldSet(_module, this, null);
    }
  }, {
    key: "free",
    value: function free() {
      this.dispose();
    }
  }]);
}();
function _throw_last_error() {
  var errorStrPtr = _classPrivateFieldGet(_module, this)._state_get_last_error(_classPrivateFieldGet(_filter_state, this));
  var errorStr = _classPrivateFieldGet(_module, this).UTF8ToString(errorStrPtr);
  _classPrivateFieldGet(_module, this)._state_clear_last_error(_classPrivateFieldGet(_filter_state, this));
  throw new Error(errorStr);
}
function _throw_if_disposed() {
  if (_classPrivateFieldGet(_disposed, this)) {
    throw new Error("This instance already disposed");
  }
}
function _throw_if_uninit() {
  _assertClassBrand(_DenoiseFilter_brand, this, _throw_if_disposed).call(this);
  if (_classPrivateFieldGet(_initialized, this)) {
    return;
  }
  throw new Error("This instance can not be used until initialized");
}
function _initBuffers() {
  var alignment = Float32Array.BYTES_PER_ELEMENT;
  var bufferSize = this.bytesPerFrame() + (alignment - 1);
  _classPrivateFieldSet(_inputPtr, this, _assertClassBrand(_DenoiseFilter_brand, this, _malloc).call(this, bufferSize));
  _classPrivateFieldSet(_outputPtr, this, _assertClassBrand(_DenoiseFilter_brand, this, _malloc).call(this, bufferSize));
}
function _alignPtr(ptr, alignment) {
  var pad = (alignment - ptr % alignment) % alignment;
  return ptr + pad;
}
function _malloc(size) {
  var ptr = _classPrivateFieldGet(_module, this)._malloc(size);
  if (ptr === 0) {
    throw new Error("Failure to allocate " + size + " bytes");
  }
  return ptr;
}
function createDenoiseFilter(_x, _x2) {
  return _createDenoiseFilter.apply(this, arguments);
}
function _createDenoiseFilter() {
  _createDenoiseFilter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(model, customerId) {
    var wasm;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0,_wasm_bindings_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
            locateFile: function locateFile(p1, p2) {
              return model;
            }
          });
        case 1:
          wasm = _context.v;
          return _context.a(2, new DenoiseFilter(wasm, customerId));
      }
    }, _callee);
  }));
  return _createDenoiseFilter.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDenoiseFilter);

/***/ }),

/***/ "./src/DenoiseFilter/wasm_bindings.js":
/*!********************************************!*\
  !*** ./src/DenoiseFilter/wasm_bindings.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var createAudioModule = function () {
  var _scriptName = "file:///Users/tmv/work/vbsdk/audio/src/DenoiseFilter/wasm_bindings.js";
  return function () {
    var moduleArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var moduleRtn;
    var Module = moduleArg;
    var readyPromiseResolve, readyPromiseReject;
    var readyPromise = new Promise(function (resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var ENVIRONMENT_IS_WEB = false;
    var ENVIRONMENT_IS_WORKER = true;
    var moduleOverrides = Object.assign({}, Module);
    var thisProgram = "./this.program";
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (_scriptName) {
        scriptDirectory = _scriptName;
      }
      if (scriptDirectory.startsWith("blob:")) {
        scriptDirectory = "";
      } else {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = function readBinary(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = function readAsync(url) {
          return fetch(url, {
            credentials: "same-origin"
          }).then(function (response) {
            if (response.ok) {
              return response.arrayBuffer();
            }
            return Promise.reject(new Error(response.status + " : " + response.url));
          });
        };
      }
    } else {}
    var out = console.log.bind(console);
    var err = console.error.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    var wasmBinary;
    var wasmMemory;
    var ABORT = false;
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      Module["HEAP8"] = HEAP8 = new Int8Array(b);
      Module["HEAP16"] = HEAP16 = new Int16Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
      Module["HEAP32"] = HEAP32 = new Int32Array(b);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
      Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
      Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
    }
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    function preRun() {
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
      runDependencies++;
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    var isDataURI = function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    };
    function findWasmBinary() {
      if (Module["locateFile"]) {
        var f = "am.wasm";
        if (!isDataURI(f)) {
          return locateFile(f);
        }
        return f;
      }
    }
    var wasmBinaryFile;
    function getBinarySync(file) {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      if (readBinary) {
        return readBinary(file);
      }
      throw "both async and sync fetching of the wasm failed";
    }
    function getBinaryPromise(binaryFile) {
      if (!wasmBinary) {
        return readAsync(binaryFile).then(function (response) {
          return new Uint8Array(response);
        }, function () {
          return getBinarySync(binaryFile);
        });
      }
      return Promise.resolve().then(function () {
        return getBinarySync(binaryFile);
      });
    }
    function instantiateArrayBuffer(binaryFile, imports, receiver) {
      return getBinaryPromise(binaryFile).then(function (binary) {
        return WebAssembly.instantiate(binary, imports);
      }).then(receiver, function (reason) {
        err("failed to asynchronously prepare wasm: ".concat(reason));
        abort(reason);
      });
    }
    function instantiateAsync(binary, binaryFile, imports, callback) {
      if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
        return fetch(binaryFile, {
          credentials: "same-origin"
        }).then(function (response) {
          var result = WebAssembly.instantiateStreaming(response, imports);
          return result.then(callback, function (reason) {
            err("wasm streaming compile failed: ".concat(reason));
            err("falling back to ArrayBuffer instantiation");
            return instantiateArrayBuffer(binaryFile, imports, callback);
          });
        });
      }
      return instantiateArrayBuffer(binaryFile, imports, callback);
    }
    function getWasmImports() {
      return {
        a: wasmImports
      };
    }
    function createWasm() {
      var info = getWasmImports();
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["ua"];
        updateMemoryViews();
        wasmTable = wasmExports["xa"];
        addOnInit(wasmExports["va"]);
        removeRunDependency("wasm-instantiate");
        return wasmExports;
      }
      addRunDependency("wasm-instantiate");
      function receiveInstantiationResult(result) {
        receiveInstance(result["instance"]);
      }
      wasmBinaryFile !== null && wasmBinaryFile !== void 0 ? wasmBinaryFile : wasmBinaryFile = findWasmBinary();
      instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult)["catch"](readyPromiseReject);
      return {};
    }
    var ASM_CONSTS = {
      8845072: function _($0, $1, $2, $3) {
        if (typeof Module == "undefined" || !Module.MountedFiles) {
          return 1;
        }
        var fileName = UTF8ToString($0 >>> 0);
        if (fileName.startsWith("./")) {
          fileName = fileName.substring(2);
        }
        var fileData = Module.MountedFiles.get(fileName);
        if (!fileData) {
          return 2;
        }
        var offset = $1 >>> 0;
        var length = $2 >>> 0;
        var buffer = $3 >>> 0;
        if (offset + length > fileData.byteLength) {
          return 3;
        }
        try {
          HEAPU8.set(fileData.subarray(offset, offset + length), buffer);
          return 0;
        } catch (_unused) {
          return 4;
        }
      }
    };
    var callRuntimeCallbacks = function callRuntimeCallbacks(callbacks) {
      callbacks.forEach(function (f) {
        return f(Module);
      });
    };
    var stackRestore = function stackRestore(val) {
      return _emscripten_stack_restore(val);
    };
    var stackSave = function stackSave() {
      return _emscripten_stack_get_current2();
    };
    var exceptionCaught = [];
    var uncaughtExceptionCount = 0;
    var ___cxa_begin_catch = function ___cxa_begin_catch(ptr) {
      var info = new ExceptionInfo(ptr);
      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }
      info.set_rethrown(false);
      exceptionCaught.push(info);
      _cxa_increment_exception_refcount(ptr);
      return _cxa_get_exception_ptr(ptr);
    };
    var exceptionLast = 0;
    var ___cxa_end_catch = function ___cxa_end_catch() {
      _setThrew2(0, 0);
      var info = exceptionCaught.pop();
      _cxa_decrement_exception_refcount(info.excPtr);
      exceptionLast = 0;
    };
    var ExceptionInfo = /*#__PURE__*/function () {
      function ExceptionInfo(excPtr) {
        _classCallCheck(this, ExceptionInfo);
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
      return _createClass(ExceptionInfo, [{
        key: "set_type",
        value: function set_type(type) {
          HEAPU32[this.ptr + 4 >> 2] = type;
        }
      }, {
        key: "get_type",
        value: function get_type() {
          return HEAPU32[this.ptr + 4 >> 2];
        }
      }, {
        key: "set_destructor",
        value: function set_destructor(destructor) {
          HEAPU32[this.ptr + 8 >> 2] = destructor;
        }
      }, {
        key: "get_destructor",
        value: function get_destructor() {
          return HEAPU32[this.ptr + 8 >> 2];
        }
      }, {
        key: "set_caught",
        value: function set_caught(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + 12] = caught;
        }
      }, {
        key: "get_caught",
        value: function get_caught() {
          return HEAP8[this.ptr + 12] != 0;
        }
      }, {
        key: "set_rethrown",
        value: function set_rethrown(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + 13] = rethrown;
        }
      }, {
        key: "get_rethrown",
        value: function get_rethrown() {
          return HEAP8[this.ptr + 13] != 0;
        }
      }, {
        key: "init",
        value: function init(type, destructor) {
          this.set_adjusted_ptr(0);
          this.set_type(type);
          this.set_destructor(destructor);
        }
      }, {
        key: "set_adjusted_ptr",
        value: function set_adjusted_ptr(adjustedPtr) {
          HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
        }
      }, {
        key: "get_adjusted_ptr",
        value: function get_adjusted_ptr() {
          return HEAPU32[this.ptr + 16 >> 2];
        }
      }]);
    }();
    var ___resumeException = function ___resumeException(ptr) {
      if (!exceptionLast) {
        exceptionLast = ptr;
      }
      throw exceptionLast;
    };
    var setTempRet0 = function setTempRet0(val) {
      return _emscripten_tempret_set(val);
    };
    var findMatchingCatch = function findMatchingCatch(args) {
      var thrown = exceptionLast;
      if (!thrown) {
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        setTempRet0(0);
        return thrown;
      }
      var _iterator = _createForOfIteratorHelper(args),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var caughtType = _step.value;
          if (caughtType === 0 || caughtType === thrownType) {
            break;
          }
          var adjusted_ptr_addr = info.ptr + 16;
          if (_cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      setTempRet0(thrownType);
      return thrown;
    };
    var ___cxa_find_matching_catch_2 = function ___cxa_find_matching_catch_2() {
      return findMatchingCatch([]);
    };
    var ___cxa_find_matching_catch_3 = function ___cxa_find_matching_catch_3(arg0) {
      return findMatchingCatch([arg0]);
    };
    var ___cxa_rethrow = function ___cxa_rethrow() {
      var info = exceptionCaught.pop();
      if (!info) {
        abort("no exception to throw");
      }
      var ptr = info.excPtr;
      if (!info.get_rethrown()) {
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++;
      }
      exceptionLast = ptr;
      throw exceptionLast;
    };
    var ___cxa_throw = function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr);
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      throw exceptionLast;
    };
    var ___cxa_uncaught_exceptions = function ___cxa_uncaught_exceptions() {
      return uncaughtExceptionCount;
    };
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : undefined;
    var UTF8ArrayToString = function UTF8ArrayToString(heapOrArray) {
      var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var maxBytesToRead = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    };
    var UTF8ToString = function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    };
    var SYSCALLS = {
      varargs: undefined,
      getStr: function getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      }
    };
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      return 0;
    }
    var ___syscall_fstat64 = function ___syscall_fstat64(fd, buf) {};
    var lengthBytesUTF8 = function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var stringToUTF8Array = function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    var stringToUTF8 = function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
    var ___syscall_getcwd = function ___syscall_getcwd(buf, size) {};
    var ___syscall_getdents64 = function ___syscall_getdents64(fd, dirp, count) {};
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      return 0;
    }
    var ___syscall_lstat64 = function ___syscall_lstat64(path, buf) {};
    var ___syscall_mkdirat = function ___syscall_mkdirat(dirfd, path, mode) {};
    var ___syscall_newfstatat = function ___syscall_newfstatat(dirfd, path, buf, flags) {};
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
    }
    var ___syscall_readlinkat = function ___syscall_readlinkat(dirfd, path, buf, bufsize) {};
    var ___syscall_rmdir = function ___syscall_rmdir(path) {};
    var ___syscall_stat64 = function ___syscall_stat64(path, buf) {};
    var ___syscall_unlinkat = function ___syscall_unlinkat(dirfd, path, flags) {};
    var __abort_js = function __abort_js() {
      abort("");
    };
    var nowIsMonotonic = 1;
    var __emscripten_get_now_is_monotonic = function __emscripten_get_now_is_monotonic() {
      return nowIsMonotonic;
    };
    var INT53_MAX = 9007199254740992;
    var INT53_MIN = -9007199254740992;
    var bigintToI53Checked = function bigintToI53Checked(num) {
      return num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
    };
    function __gmtime_js(time, tmPtr) {
      time = bigintToI53Checked(time);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
      HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
      HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
    }
    var isLeapYear = function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    };
    var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var ydayFromDate = function ydayFromDate(date) {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
      return yday;
    };
    function __localtime_js(time, tmPtr) {
      time = bigintToI53Checked(time);
      var date = new Date(time * 1e3);
      HEAP32[tmPtr >> 2] = date.getSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getHours();
      HEAP32[tmPtr + 12 >> 2] = date.getDate();
      HEAP32[tmPtr + 16 >> 2] = date.getMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getDay();
      var yday = ydayFromDate(date) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
      HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
      HEAP32[tmPtr + 32 >> 2] = dst;
    }
    var __mktime_js = function __mktime_js(tmPtr) {
      var ret = function () {
        var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
        var dst = HEAP32[tmPtr + 32 >> 2];
        var guessedOffset = date.getTimezoneOffset();
        var start = new Date(date.getFullYear(), 0, 1);
        var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dstOffset = Math.min(winterOffset, summerOffset);
        if (dst < 0) {
          HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
        } else if (dst > 0 != (dstOffset == guessedOffset)) {
          var nonDstOffset = Math.max(winterOffset, summerOffset);
          var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
          date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
        }
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var yday = ydayFromDate(date) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getYear();
        var timeMs = date.getTime();
        if (isNaN(timeMs)) {
          return -1;
        }
        return timeMs / 1e3;
      }();
      return BigInt(ret);
    };
    function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
      offset = bigintToI53Checked(offset);
      return -52;
    }
    function __munmap_js(addr, len, prot, flags, fd, offset) {
      offset = bigintToI53Checked(offset);
    }
    var __tzset_js = function __tzset_js(timezone, daylight, std_name, dst_name) {
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
      var extractZone = function extractZone(timezoneOffset) {
        var sign = timezoneOffset >= 0 ? "-" : "+";
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
        return "UTC".concat(sign).concat(hours).concat(minutes);
      };
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };
    var readEmAsmArgsArray = [];
    var readEmAsmArgs = function readEmAsmArgs(sigPtr, buf) {
      readEmAsmArgsArray.length = 0;
      var ch;
      while (ch = HEAPU8[sigPtr++]) {
        var wide = ch != 105;
        wide &= ch != 112;
        buf += wide && buf % 8 ? 4 : 0;
        readEmAsmArgsArray.push(ch == 112 ? HEAPU32[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]);
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
    var runEmAsmFunction = function runEmAsmFunction(code, sigPtr, argbuf) {
      var args = readEmAsmArgs(sigPtr, argbuf);
      return ASM_CONSTS[code].apply(ASM_CONSTS, _toConsumableArray(args));
    };
    var _emscripten_asm_const_int = function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };
    var _emscripten_date_now = function _emscripten_date_now() {
      return Date.now();
    };
    var getHeapMax = function getHeapMax() {
      return 2147483648;
    };
    var _emscripten_get_heap_max = function _emscripten_get_heap_max() {
      return getHeapMax();
    };
    var _emscripten_get_now = function _emscripten_get_now() {
      return performance.now();
    };
    var alignMemory = function alignMemory(size, alignment) {
      return Math.ceil(size / alignment) * alignment;
    };
    var growMemory = function growMemory(size) {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536 | 0;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {}
    };
    var _emscripten_resize_heap = function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var ENV = {};
    var getExecutableName = function getExecutableName() {
      return thisProgram || "./this.program";
    };
    var _getEnvStrings = function getEnvStrings() {
      if (!_getEnvStrings.strings) {
        var lang = ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: lang,
          _: getExecutableName()
        };
        for (var x in ENV) {
          if (ENV[x] === undefined) delete env[x];else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push("".concat(x, "=").concat(env[x]));
        }
        _getEnvStrings.strings = strings;
      }
      return _getEnvStrings.strings;
    };
    var stringToAscii = function stringToAscii(str, buffer) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      HEAP8[buffer] = 0;
    };
    var _environ_get = function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      _getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize;
        HEAPU32[__environ + i * 4 >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    };
    var _environ_sizes_get = function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = _getEnvStrings();
      HEAPU32[penviron_count >> 2] = strings.length;
      var bufSize = 0;
      strings.forEach(function (string) {
        return bufSize += string.length + 1;
      });
      HEAPU32[penviron_buf_size >> 2] = bufSize;
      return 0;
    };
    var _fd_close = function _fd_close(fd) {
      return 52;
    };
    var _fd_read = function _fd_read(fd, iov, iovcnt, pnum) {
      return 52;
    };
    function _fd_seek(fd, offset, whence, newOffset) {
      offset = bigintToI53Checked(offset);
      return 70;
    }
    var printCharBuffers = [null, [], []];
    var printChar = function printChar(stream, curr) {
      var buffer = printCharBuffers[stream];
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
    var _fd_write = function _fd_write(fd, iov, iovcnt, pnum) {
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr + j]);
        }
        num += len;
      }
      HEAPU32[pnum >> 2] = num;
      return 0;
    };
    var initRandomFill = function initRandomFill() {
      if ((typeof crypto === "undefined" ? "undefined" : _typeof(crypto)) == "object" && typeof crypto["getRandomValues"] == "function") {
        return function (view) {
          return crypto.getRandomValues(view);
        };
      } else abort("initRandomDevice");
    };
    var _randomFill = function randomFill(view) {
      return (_randomFill = initRandomFill())(view);
    };
    var _getentropy = function _getentropy(buffer, size) {
      _randomFill(HEAPU8.subarray(buffer, buffer + size));
      return 0;
    };
    var wasmTableMirror = [];
    var wasmTable;
    var getWasmTableEntry = function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      return func;
    };
    var stringToNewUTF8 = function stringToNewUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
    var wasmImports = {
      q: ___cxa_begin_catch,
      s: ___cxa_end_catch,
      a: ___cxa_find_matching_catch_2,
      j: ___cxa_find_matching_catch_3,
      J: ___cxa_rethrow,
      d: ___cxa_throw,
      D: ___cxa_uncaught_exceptions,
      f: ___resumeException,
      u: ___syscall_fcntl64,
      la: ___syscall_fstat64,
      ha: ___syscall_getcwd,
      Y: ___syscall_getdents64,
      R: ___syscall_ioctl,
      ia: ___syscall_lstat64,
      da: ___syscall_mkdirat,
      ja: ___syscall_newfstatat,
      M: ___syscall_openat,
      X: ___syscall_readlinkat,
      V: ___syscall_rmdir,
      ka: ___syscall_stat64,
      W: ___syscall_unlinkat,
      na: __abort_js,
      ma: __emscripten_get_now_is_monotonic,
      $: __gmtime_js,
      aa: __localtime_js,
      ba: __mktime_js,
      Z: __mmap_js,
      _: __munmap_js,
      ca: __tzset_js,
      oa: _emscripten_asm_const_int,
      N: _emscripten_date_now,
      U: _emscripten_get_heap_max,
      r: _emscripten_get_now,
      T: _emscripten_resize_heap,
      fa: _environ_get,
      ga: _environ_sizes_get,
      E: _fd_close,
      L: _fd_read,
      ea: _fd_seek,
      G: _fd_write,
      P: _getentropy,
      H: invoke_diii,
      I: invoke_fiii,
      p: invoke_i,
      g: invoke_ii,
      pa: invoke_iidi,
      qa: invoke_iifi,
      h: invoke_iii,
      l: invoke_iiii,
      n: invoke_iiiii,
      w: invoke_iiiiii,
      o: invoke_iiiiiii,
      F: invoke_iiiiiiii,
      B: invoke_iiiiiiiiiiii,
      S: invoke_iiiiij,
      O: invoke_ijii,
      K: invoke_j,
      ra: invoke_jiii,
      C: invoke_jiiii,
      m: invoke_v,
      b: invoke_vi,
      c: invoke_vii,
      sa: invoke_viif,
      e: invoke_viii,
      k: invoke_viiii,
      ta: invoke_viiiif,
      i: invoke_viiiii,
      z: invoke_viiiiii,
      t: invoke_viiiiiii,
      x: invoke_viiiiiiii,
      v: invoke_viiiiiiiiii,
      Q: invoke_viiiiiiiiiiii,
      A: invoke_viiiiiiiiiiiiiii,
      y: invoke_vijjjj
    };
    var wasmExports = createWasm();
    var _wasm_call_ctors = function ___wasm_call_ctors() {
      return (_wasm_call_ctors = wasmExports["va"])();
    };
    var _free = Module["_free"] = function (a0) {
      return (_free = Module["_free"] = wasmExports["wa"])(a0);
    };
    var _malloc = Module["_malloc"] = function (a0) {
      return (_malloc = Module["_malloc"] = wasmExports["ya"])(a0);
    };
    var _state_create = Module["_state_create"] = function (a0) {
      return (_state_create = Module["_state_create"] = wasmExports["za"])(a0);
    };
    var _state_destroy = Module["_state_destroy"] = function (a0) {
      return (_state_destroy = Module["_state_destroy"] = wasmExports["Aa"])(a0);
    };
    var _state_configure = Module["_state_configure"] = function (a0) {
      return (_state_configure = Module["_state_configure"] = wasmExports["Ba"])(a0);
    };
    var _state_auth = Module["_state_auth"] = function (a0, a1) {
      return (_state_auth = Module["_state_auth"] = wasmExports["Ca"])(a0, a1);
    };
    var _state_get_frame_length = Module["_state_get_frame_length"] = function (a0) {
      return (_state_get_frame_length = Module["_state_get_frame_length"] = wasmExports["Da"])(a0);
    };
    var _state_set_atten_lim = Module["_state_set_atten_lim"] = function (a0, a1) {
      return (_state_set_atten_lim = Module["_state_set_atten_lim"] = wasmExports["Ea"])(a0, a1);
    };
    var _state_set_pf_beta = Module["_state_set_pf_beta"] = function (a0, a1) {
      return (_state_set_pf_beta = Module["_state_set_pf_beta"] = wasmExports["Fa"])(a0, a1);
    };
    var _state_process_lsnr = Module["_state_process_lsnr"] = function (a0, a1, a2) {
      return (_state_process_lsnr = Module["_state_process_lsnr"] = wasmExports["Ga"])(a0, a1, a2);
    };
    var _state_process_frame = Module["_state_process_frame"] = function (a0, a1, a2, a3, a4) {
      return (_state_process_frame = Module["_state_process_frame"] = wasmExports["Ha"])(a0, a1, a2, a3, a4);
    };
    var _state_reset_recurrent_state = Module["_state_reset_recurrent_state"] = function (a0) {
      return (_state_reset_recurrent_state = Module["_state_reset_recurrent_state"] = wasmExports["Ia"])(a0);
    };
    var _state_get_last_error = Module["_state_get_last_error"] = function (a0) {
      return (_state_get_last_error = Module["_state_get_last_error"] = wasmExports["Ja"])(a0);
    };
    var _state_clear_last_error = Module["_state_clear_last_error"] = function (a0) {
      return (_state_clear_last_error = Module["_state_clear_last_error"] = wasmExports["Ka"])(a0);
    };
    var _state_get_last_lsnr = Module["_state_get_last_lsnr"] = function (a0) {
      return (_state_get_last_lsnr = Module["_state_get_last_lsnr"] = wasmExports["La"])(a0);
    };
    var _setThrew2 = function _setThrew(a0, a1) {
      return (_setThrew2 = wasmExports["Ma"])(a0, a1);
    };
    var _emscripten_tempret_set = function __emscripten_tempret_set(a0) {
      return (_emscripten_tempret_set = wasmExports["Na"])(a0);
    };
    var _emscripten_stack_restore = function __emscripten_stack_restore(a0) {
      return (_emscripten_stack_restore = wasmExports["Oa"])(a0);
    };
    var _emscripten_stack_get_current2 = function _emscripten_stack_get_current() {
      return (_emscripten_stack_get_current2 = wasmExports["Pa"])();
    };
    var _cxa_decrement_exception_refcount = function ___cxa_decrement_exception_refcount(a0) {
      return (_cxa_decrement_exception_refcount = wasmExports["Qa"])(a0);
    };
    var _cxa_increment_exception_refcount = function ___cxa_increment_exception_refcount(a0) {
      return (_cxa_increment_exception_refcount = wasmExports["Ra"])(a0);
    };
    var _cxa_can_catch = function ___cxa_can_catch(a0, a1, a2) {
      return (_cxa_can_catch = wasmExports["Sa"])(a0, a1, a2);
    };
    var _cxa_get_exception_ptr = function ___cxa_get_exception_ptr(a0) {
      return (_cxa_get_exception_ptr = wasmExports["Ta"])(a0);
    };
    function invoke_vii(index, a1, a2) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_vi(index, a1) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_ii(index, a1) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iii(index, a1, a2) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiif(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viif(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_v(index) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_jiii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
        return 0n;
      }
    }
    function invoke_i(index) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_ijii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iifi(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iidi(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_vijjjj(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_j(index) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
        return 0n;
      }
    }
    function invoke_iiiiij(index, a1, a2, a3, a4, a5) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_jiiii(index, a1, a2, a3, a4) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
        return 0n;
      }
    }
    function invoke_fiii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_diii(index, a1, a2, a3) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave();
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave();
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0) throw e;
        _setThrew2(1, 0);
      }
    }
    Module["UTF8ToString"] = UTF8ToString;
    Module["stringToNewUTF8"] = stringToNewUTF8;
    var calledRun;
    var calledPrerun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function run() {
      if (runDependencies > 0) {
        return;
      }
      if (!calledPrerun) {
        calledPrerun = 1;
        preRun();
        if (runDependencies > 0) {
          return;
        }
      }
      function doRun() {
        if (calledRun) return;
        calledRun = 1;
        Module["calledRun"] = 1;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        postRun();
      }
      {
        doRun();
      }
    }
    run();
    moduleRtn = readyPromise;
    return moduleRtn;
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createAudioModule);

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/onnxruntime-web/dist/esm/ort.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/onnxruntime-web/dist/esm/ort.min.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InferenceSession": () => (/* binding */ Md),
/* harmony export */   "TRACE": () => (/* binding */ Ts),
/* harmony export */   "TRACE_FUNC_BEGIN": () => (/* binding */ br),
/* harmony export */   "TRACE_FUNC_END": () => (/* binding */ gr),
/* harmony export */   "Tensor": () => (/* binding */ Ne),
/* harmony export */   "TrainingSession": () => (/* binding */ Ud),
/* harmony export */   "default": () => (/* binding */ nS),
/* harmony export */   "env": () => (/* binding */ ee),
/* harmony export */   "registerBackend": () => (/* binding */ hr)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/*!
 * ONNX Runtime Web v1.17.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Bd=Object.create;var kn=Object.defineProperty;var $d=Object.getOwnPropertyDescriptor;var kd=Object.getOwnPropertyNames;var Nd=Object.getPrototypeOf,Rd=Object.prototype.hasOwnProperty;var D=(a,t)=>()=>(a&&(t=a(a=0)),t);var ye=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),pr=(a,t)=>{for(var o in t)kn(a,o,{get:t[o],enumerable:!0})},Qa=(a,t,o,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of kd(t))!Rd.call(a,r)&&r!==o&&kn(a,r,{get:()=>t[r],enumerable:!(e=$d(t,r))||e.enumerable});return a};var Nr=(a,t,o)=>(o=a!=null?Bd(Nd(a)):{},Qa(t||!a||!a.__esModule?kn(o,"default",{value:a,enumerable:!0}):o,a)),jt=a=>Qa(kn({},"__esModule",{value:!0}),a);var Nn,dr,hr,Rn,Mn=D(()=>{"use strict";Nn=new Map,dr=[],hr=(a,t,o)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let e=Nn.get(a);if(e===void 0)Nn.set(a,{backend:t,priority:o});else{if(e.priority>o)return;if(e.priority===o&&e.backend!==t)throw new Error(`cannot register backend "${a}" using priority ${o}`)}if(o>=0){let r=dr.indexOf(a);r!==-1&&dr.splice(r,1);for(let n=0;n<dr.length;n++)if(Nn.get(dr[n]).priority<=o){dr.splice(n,0,a);return}dr.push(a)}return}throw new TypeError("not a valid backend")},Rn=async a=>{let t=a.length===0?dr:a,o=[];for(let e of t){let r=Nn.get(e);if(r){if(r.initialized)return r.backend;if(r.aborted)continue;let n=!!r.initPromise;try{return n||(r.initPromise=r.backend.init(e)),await r.initPromise,r.initialized=!0,r.backend}catch(s){n||o.push({name:e,err:s}),r.aborted=!0}finally{delete r.initPromise}}}throw new Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`)}});var es=D(()=>{"use strict";Mn()});var ts,rs=D(()=>{"use strict";ts="1.17.0"});var ns,mr,Jo=D(()=>{"use strict";rs();ns="warning",mr={wasm:{},webgl:{},webgpu:{},versions:{common:ts},set logLevel(a){if(a!==void 0){if(typeof a!="string"||["verbose","info","warning","error","fatal"].indexOf(a)===-1)throw new Error(`Unsupported logging level: ${a}`);ns=a}},get logLevel(){return ns}};Object.defineProperty(mr,"logLevel",{enumerable:!0})});var ee,os=D(()=>{"use strict";Jo();ee=mr});var is,as,ss=D(()=>{"use strict";is=(a,t)=>{let o=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);o.width=a.dims[3],o.height=a.dims[2];let e=o.getContext("2d");if(e!=null){let r,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=a.dims[2],n=a.dims[3]):(r=a.dims[3],n=a.dims[2]);let s=t?.format!==void 0?t.format:"RGB",i=t?.norm,u,l;i===void 0||i.mean===void 0?u=[255,255,255,255]:typeof i.mean=="number"?u=[i.mean,i.mean,i.mean,i.mean]:(u=[i.mean[0],i.mean[1],i.mean[2],0],i.mean[3]!==void 0&&(u[3]=i.mean[3])),i===void 0||i.bias===void 0?l=[0,0,0,0]:typeof i.bias=="number"?l=[i.bias,i.bias,i.bias,i.bias]:(l=[i.bias[0],i.bias[1],i.bias[2],0],i.bias[3]!==void 0&&(l[3]=i.bias[3]));let c=n*r,p=0,b=c,x=c*2,v=-1;s==="RGBA"?(p=0,b=c,x=c*2,v=c*3):s==="RGB"?(p=0,b=c,x=c*2):s==="RBG"&&(p=0,x=c,b=c*2);for(let _=0;_<n;_++)for(let I=0;I<r;I++){let L=(a.data[p++]-l[0])*u[0],B=(a.data[b++]-l[1])*u[1],F=(a.data[x++]-l[2])*u[2],J=v===-1?255:(a.data[v++]-l[3])*u[3];e.fillStyle="rgba("+L+","+B+","+F+","+J+")",e.fillRect(I,_,1,1)}if("toDataURL"in o)return o.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},as=(a,t)=>{let o=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),e;if(o!=null){let r,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=a.dims[2],n=a.dims[1],s=a.dims[3]):(r=a.dims[3],n=a.dims[2],s=a.dims[1]);let i=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=n*r;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let b=4,x=0,v=1,_=2,I=3,L=0,B=p,F=p*2,J=-1;i==="RGBA"?(L=0,B=p,F=p*2,J=p*3):i==="RGB"?(L=0,B=p,F=p*2):i==="RBG"&&(L=0,F=p,B=p*2),e=o.createImageData(r,n);for(let j=0;j<n*r;x+=b,v+=b,_+=b,I+=b,j++)e.data[x]=(a.data[L++]-c[0])*l[0],e.data[v]=(a.data[B++]-c[1])*l[1],e.data[_]=(a.data[F++]-c[2])*l[2],e.data[I]=J===-1?255:(a.data[J++]-c[3])*l[3]}else throw new Error("Can not access image data");return e}});var Zo,us,ls,fs,cs,ps=D(()=>{"use strict";Gn();Zo=(a,t)=>{if(a===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:o,width:e}=t,r=t.norm??{mean:255,bias:0},n,s;typeof r.mean=="number"?n=[r.mean,r.mean,r.mean,r.mean]:n=[r.mean[0],r.mean[1],r.mean[2],r.mean[3]??255],typeof r.bias=="number"?s=[r.bias,r.bias,r.bias,r.bias]:s=[r.bias[0],r.bias[1],r.bias[2],r.bias[3]??0];let i=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=o*e,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,b=0,x=1,v=2,_=3,I=0,L=l,B=l*2,F=-1;i==="RGB"&&(p=3,b=0,x=1,v=2,_=-1),u==="RGBA"?F=l*3:u==="RBG"?(I=0,B=l,L=l*2):u==="BGR"&&(B=0,L=l,I=l*2);for(let j=0;j<l;j++,b+=p,v+=p,x+=p,_+=p)c[I++]=(a[b]+s[0])/n[0],c[L++]=(a[x]+s[1])/n[1],c[B++]=(a[v]+s[2])/n[2],F!==-1&&_!==-1&&(c[F++]=(a[_]+s[3])/n[3]);return u==="RGBA"?new Ye("float32",c,[1,4,o,e]):new Ye("float32",c,[1,3,o,e])},us=async(a,t)=>{let o=typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement,e=typeof ImageData<"u"&&a instanceof ImageData,r=typeof ImageBitmap<"u"&&a instanceof ImageBitmap,n=typeof a=="string",s,i=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(o){let c=u();c.width=a.width,c.height=a.height;let p=l(c);if(p!=null){let b=a.height,x=a.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(b=t.resizedHeight,x=t.resizedWidth),t!==void 0){if(i=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");i.tensorFormat="RGBA",i.height=b,i.width=x}else i.tensorFormat="RGBA",i.height=b,i.width=x;p.drawImage(a,0,0),s=p.getImageData(0,0,x,b).data}else throw new Error("Can not access image data")}else if(e){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=a.height,p=a.width),t!==void 0&&(i=t),i.format="RGBA",i.height=c,i.width=p,t!==void 0){let b=u();b.width=p,b.height=c;let x=l(b);if(x!=null)x.putImageData(a,0,0),s=x.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=a.data}else if(r){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=a.width,c.height=a.height;let p=l(c);if(p!=null){let b=a.height,x=a.width;return p.drawImage(a,0,0,x,b),s=p.getImageData(0,0,x,b).data,i.height=b,i.width=x,Zo(s,i)}else throw new Error("Can not access image data")}else{if(n)return new Promise((c,p)=>{let b=u(),x=l(b);if(!a||!x)return p();let v=new Image;v.crossOrigin="Anonymous",v.src=a,v.onload=()=>{b.width=v.width,b.height=v.height,x.drawImage(v,0,0,b.width,b.height);let _=x.getImageData(0,0,b.width,b.height);i.height=b.height,i.width=b.width,c(Zo(_.data,i))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Zo(s,i);throw new Error("Input data provided is not supported - aborted tensor creation")},ls=(a,t)=>{let{width:o,height:e,download:r,dispose:n}=t,s=[1,e,o,4];return new Ye({location:"texture",type:"float32",texture:a,dims:s,download:r,dispose:n})},fs=(a,t)=>{let{dataType:o,dims:e,download:r,dispose:n}=t;return new Ye({location:"gpu-buffer",type:o??"float32",gpuBuffer:a,dims:e,download:r,dispose:n})},cs=(a,t,o)=>new Ye({location:"cpu-pinned",type:a,data:t,dims:o??[t.length]})});var sn,Un,ds,hs,ms=D(()=>{"use strict";sn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["float16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),Un=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ds=!1,hs=()=>{if(!ds){ds=!0;let a=typeof BigInt64Array<"u"&&typeof BigInt64Array.from=="function",t=typeof BigUint64Array<"u"&&typeof BigUint64Array.from=="function";a&&(sn.set("int64",BigInt64Array),Un.set(BigInt64Array,"int64")),t&&(sn.set("uint64",BigUint64Array),Un.set(BigUint64Array,"uint64"))}}});var bs,gs,ys=D(()=>{"use strict";Gn();bs=a=>{let t=1;for(let o=0;o<a.length;o++){let e=a[o];if(typeof e!="number"||!Number.isSafeInteger(e))throw new TypeError(`dims[${o}] must be an integer, got: ${e}`);if(e<0)throw new RangeError(`dims[${o}] must be a non-negative integer, got: ${e}`);t*=e}return t},gs=(a,t)=>{switch(a.location){case"cpu":return new Ye(a.type,a.data,t);case"cpu-pinned":return new Ye({location:"cpu-pinned",data:a.data,type:a.type,dims:t});case"texture":return new Ye({location:"texture",texture:a.texture,type:a.type,dims:t});case"gpu-buffer":return new Ye({location:"gpu-buffer",gpuBuffer:a.gpuBuffer,type:a.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${a.location} is not supported`)}}});var Ye,Gn=D(()=>{"use strict";ss();ps();ms();ys();Ye=class{constructor(t,o,e){hs();let r,n;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,r=t.type,n=t.dims,t.location){case"cpu-pinned":{let i=sn.get(r);if(!i)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(t.data instanceof i))throw new TypeError(`buffer should be of type ${i.name}`);this.cpuData=t.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="bool")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let i,u;if(typeof t=="string")if(r=t,u=e,t==="string"){if(!Array.isArray(o))throw new TypeError("A string tensor's data must be a string array.");i=o}else{let l=sn.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(o)){if(t==="float16")throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");t==="uint64"||t==="int64"?i=l.from(o,BigInt):i=l.from(o)}else if(o instanceof l)i=o;else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(u=o,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")r="string",i=t;else if(l==="boolean")r="bool",i=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=Un.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);r=l,i=t}if(u===void 0)u=[i.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=i,this.dataLocation="cpu"}let s=bs(n);if(this.cpuData&&s!==this.cpuData.length)throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=n,this.size=s}static async fromImage(t,o){return us(t,o)}static fromTexture(t,o){return ls(t,o)}static fromGpuBuffer(t,o){return fs(t,o)}static fromPinnedBuffer(t,o,e){return cs(t,o,e)}toDataURL(t){return is(this,t)}toImageData(t){return as(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let o=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=o,t&&this.disposer&&(this.disposer(),this.disposer=void 0),o}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return gs(this,t)}}});var Ne,zn=D(()=>{"use strict";Gn();Ne=Ye});var Ts,xs,br,gr,Qo=D(()=>{"use strict";Jo();Ts=(a,t)=>{mr.wasm.trace&&console.timeStamp(`${a}::ORT::${t}`)},xs=(a,t)=>{let o=new Error().stack?.split(/\r\n|\r|\n/g)||[],e=!1;for(let r=0;r<o.length;r++){if(e&&!o[r].includes("TRACE_FUNC")){let n=`FUNC_${a}::${o[r].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Ts("CPU",n);return}o[r].includes("TRACE_FUNC")&&(e=!0)}},br=a=>{mr.wasm.trace&&xs("BEGIN",a)},gr=a=>{mr.wasm.trace&&xs("END",a)}});var Wn,ws=D(()=>{"use strict";Mn();zn();Qo();Wn=class a{constructor(t){this.handler=t}async run(t,o,e){br();let r={},n={};if(typeof t!="object"||t===null||t instanceof Ne||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Ne)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);r[l]=null}if(typeof e=="object"&&e!==null)n=e;else if(typeof e<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(o);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let b=o[p];(b===null||b instanceof Ne)&&(l=!0,s=!1,r[p]=b)}if(l){if(typeof e=="object"&&e!==null)n=e;else if(typeof e<"u")throw new TypeError("'options' must be an object.")}else n=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)r[l]=null;let i=await this.handler.run(t,r,n),u={};for(let l in i)if(Object.hasOwnProperty.call(i,l)){let c=i[l];c instanceof Ne?u[l]=c:u[l]=new Ne(c.type,c.data,c.dims)}return gr(),u}async release(){return this.handler.dispose()}async configure(t){return await this.handler.configure(t)}async auth(t){return await this.handler.auth(t)}static async create(t,o,e,r){br();let n,s={};if(typeof t=="string"){if(n=t,typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let p=t,b=0,x=t.byteLength;if(typeof o=="object"&&o!==null)s=o;else if(typeof o=="number"){if(b=o,!Number.isSafeInteger(b))throw new RangeError("'byteOffset' must be an integer.");if(b<0||b>=p.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${p.byteLength}).`);if(x=t.byteLength-b,typeof e=="number"){if(x=e,!Number.isSafeInteger(x))throw new RangeError("'byteLength' must be an integer.");if(x<=0||b+x>p.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${p.byteLength-b}].`);if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(typeof e<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof o<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(p,b,x)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let u=(s.executionProviders||[]).map(p=>typeof p=="string"?p:p.name),c=await(await Rn(u)).createInferenceSessionHandler(n,s);return gr(),new a(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Md,vs=D(()=>{"use strict";ws();Md=Wn});var _s=D(()=>{"use strict"});var Gd,Vn,Os=D(()=>{"use strict";Mn();zn();Gd="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Vn=class a{constructor(t,o,e){this.handler=t,this.hasOptimizerModel=o,this.hasEvalModel=e}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,o){let e=t.evalModel||"",r=t.optimizerModel||"",n=o||{},i=(n.executionProviders||[]).map(l=>typeof l=="string"?l:l.name),u=await Rn(i);if(u.createTrainingSessionHandler){let l=await u.createTrainingSessionHandler(t.checkpointState,t.trainModel,e,r,n);return new a(l,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Gd)}typeNarrowingForRunStep(t,o,e,r,n){let s={},i={};if(typeof e!="object"||e===null||e instanceof Ne||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ne)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(o.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of o)if(c.indexOf(p)!==-1){let b=r[p];(b===null||b instanceof Ne)&&(l=!0,u=!1,s[p]=b)}if(l){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of t)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of o)s[l]=null;return[s,i]}convertHandlerReturnTypeToMapOfTensors(t){let o={};for(let e in t)if(Object.hasOwnProperty.call(t,e)){let r=t[e];r instanceof Ne?o[e]=r:o[e]=new Ne(r.type,r.data,r.dims)}return o}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,o,e){let[r,n]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,o,e),s=await this.handler.runTrainStep(t,r,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,o,e){if(this.hasEvalModel){let[r,n]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,o,e),s=await this.handler.runEvalStep(t,r,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,o=!0){let e=await this.getParametersSize(o);if(t.length!==4*e)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,o)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Ud,Ss=D(()=>{"use strict";Os();Ud=Vn});var ei={};pr(ei,{InferenceSession:()=>Md,TRACE:()=>Ts,TRACE_FUNC_BEGIN:()=>br,TRACE_FUNC_END:()=>gr,Tensor:()=>Ne,TrainingSession:()=>Ud,env:()=>ee,registerBackend:()=>hr});var _t=D(()=>{"use strict";es();os();vs();zn();Qo();_s();Ss()});function Zt(a,t,o,e){if(t===void 0)return Wd(a);if(o===void 0)Hn(a,t,1);else if(typeof o=="number"&&e===void 0)Hn(a,t,o);else if(typeof o=="string"&&e===void 0)Hn(a,o,1,t);else if(typeof o=="string"&&typeof e=="number")Hn(a,o,e,t);else throw new TypeError("input is valid")}function Wd(a){return{verbose:Zt.verbose.bind(null,a),info:Zt.info.bind(null,a),warning:Zt.warning.bind(null,a),error:Zt.error.bind(null,a),fatal:Zt.fatal.bind(null,a)}}function Hn(a,t,o,e){let r=un[e||""]||un[""];As[a]<As[r.minimalSeverity]||(r.logDateTime&&(t=`${new Date().toISOString()}|${t}`),r.logSourceLocation,zd[r.provider].log(a,t,e))}var ti,ri,As,zd,Es,un,pe,qn,Yn,Xn,jn,pt=D(()=>{"use strict";ti=class{log(t,o,e){}},ri=class{log(t,o,e){console.log(`${this.color(t)} ${e?"\x1B[35m"+e+"\x1B[0m ":""}${o}`)}color(t){switch(t){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${t}`)}}},As={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},zd={none:new ti,console:new ri},Es={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},un={"":Es};(u=>{function a(l,c){u("verbose",l,c)}u.verbose=a;function t(l,c){u("info",l,c)}u.info=t;function o(l,c){u("warning",l,c)}u.warning=o;function e(l,c){u("error",l,c)}u.error=e;function r(l,c){u("fatal",l,c)}u.fatal=r;function n(l){un={},s("",l||{})}u.reset=n;function s(l,c){if(l==="*")n(c);else{let p=un[l]||Es;un[l]={provider:c.provider||p.provider,minimalSeverity:c.minimalSeverity||p.minimalSeverity,logDateTime:c.logDateTime===void 0?p.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?p.logSourceLocation:c.logSourceLocation}}}u.set=s;function i(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),s("",c)}u.setWithEnv=i})(Zt||={});pe=Zt,qn=class{constructor(t,o,e,r,n,s){this.category=t;this.name=o;this.startTime=e;this.endCallback=r;this.timer=n;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Yn=class{constructor(t,o,e,r){this.category=t;this.name=o;this.startTime=e;this.endTime=r}},Xn=class{constructor(t,o,e){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=t===void 0?1e4:t,this._flushBatchSize=o===void 0?10:o,this._flushIntervalInMilliseconds=e===void 0?5e3:e}static create(t){return t===void 0?new this:new this(t.maxNumberEvents,t.flushBatchSize,t.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=jn(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(t,o,e,r){let n=this._started?this.begin(t,o,r):void 0,s=!1,i=e();if(i&&typeof i.then=="function")return s=!0,new Promise((u,l)=>{i.then(async c=>{n&&await n.end(),u(c)},async c=>{n&&await n.end(),l(c)})});if(!s&&n){let u=n.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(i)},p=>{c(p)})})}return i}begin(t,o,e){if(!this._started)throw new Error("profiler is not started yet");if(e===void 0){let r=jn();return this.flush(r),new qn(t,o,r,n=>this.endSync(n))}else{let r=e.beginTimer();return new qn(t,o,0,async n=>this.end(n),r,e)}}async end(t){let o=await t.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Yn(t.category,t.name,t.startTime,o)),this.flush(o))}endSync(t){let o=jn();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Yn(t.category,t.name,t.startTime,o)),this.flush(o))}logOneEvent(t){pe.verbose(`Profiler.${t.category}`,`${(t.endTime-t.startTime).toFixed(2)}ms on event '${t.name}' at ${t.endTime.toFixed(2)}`)}flush(t){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||t-this._flushTime>=this._flushIntervalInMilliseconds){for(let o=this._flushPointer;this._flushPointer<o+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=jn()}}get started(){return this._started}},jn=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Ps(a,t,o){for(let e of o){let r=e[0],n=e[1],s=e[2],i=e[3],u=e[4];if(a.opType===r){for(let l of t)if((l.domain===n||l.domain==="ai.onnx"&&n==="")&&Vd(l.version,s))return{opImpl:i,opInit:u}}}throw new TypeError(`cannot resolve operator '${a.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function Vd(a,t){if(t.endsWith("+")){let o=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(o)&&o<=a}else if(t.split("-").length===2){let o=t.split("-"),e=Number.parseInt(o[0],10),r=Number.parseInt(o[1],10);return!isNaN(e)&&!isNaN(r)&&e<=a&&a<=r}else return Number.parseInt(t,10)===a}var Ds=D(()=>{"use strict"});var Ls=ye(ni=>{"use strict";ni.__esModule=!0;var Hd=function(){function a(t){if(!t)throw new TypeError("Invalid argument; `value` has no value.");this.value=a.EMPTY,t&&a.isGuid(t)&&(this.value=t)}return a.isGuid=function(t){var o=t.toString();return t&&(t instanceof a||a.validator.test(o))},a.create=function(){return new a([a.gen(2),a.gen(1),a.gen(1),a.gen(1),a.gen(3)].join("-"))},a.createEmpty=function(){return new a("emptyguid")},a.parse=function(t){return new a(t)},a.raw=function(){return[a.gen(2),a.gen(1),a.gen(1),a.gen(1),a.gen(3)].join("-")},a.gen=function(t){for(var o="",e=0;e<t;e++)o+=((1+Math.random())*65536|0).toString(16).substring(1);return o},a.prototype.equals=function(t){return a.isGuid(t)&&this.value===t.toString()},a.prototype.isEmpty=function(){return this.value===a.EMPTY},a.prototype.toString=function(){return this.value},a.prototype.toJSON=function(){return{value:this.value}},a.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),a.EMPTY="00000000-0000-0000-0000-000000000000",a}();ni.Guid=Hd});function Te(a,t,o){this.low=a|0,this.high=t|0,this.unsigned=!!o}function qe(a){return(a&&a.__isLong__)===!0}function Cs(a){var t=Math.clz32(a&-a);return a?31-t:t}function yr(a,t){var o,e,r;return t?(a>>>=0,(r=0<=a&&a<256)&&(e=Bs[a],e)?e:(o=le(a,0,!0),r&&(Bs[a]=o),o)):(a|=0,(r=-128<=a&&a<128)&&(e=Fs[a],e)?e:(o=le(a,a<0?-1:0,!1),r&&(Fs[a]=o),o))}function ht(a,t){if(isNaN(a))return t?qt:Ot;if(t){if(a<0)return qt;if(a>=Rs)return Us}else{if(a<=-ks)return rt;if(a+1>=ks)return Gs}return a<0?ht(-a,t).neg():le(a%Mr|0,a/Mr|0,t)}function le(a,t,o){return new Te(a,t,o)}function ii(a,t,o){if(a.length===0)throw Error("empty string");if(typeof t=="number"?(o=t,t=!1):t=!!t,a==="NaN"||a==="Infinity"||a==="+Infinity"||a==="-Infinity")return t?qt:Ot;if(o=o||10,o<2||36<o)throw RangeError("radix");var e;if((e=a.indexOf("-"))>0)throw Error("interior hyphen");if(e===0)return ii(a.substring(1),t,o).neg();for(var r=ht(Kn(o,8)),n=Ot,s=0;s<a.length;s+=8){var i=Math.min(8,a.length-s),u=parseInt(a.substring(s,s+i),o);if(i<8){var l=ht(Kn(o,i));n=n.mul(l).add(ht(u))}else n=n.mul(r),n=n.add(ht(u))}return n.unsigned=t,n}function St(a,t){return typeof a=="number"?ht(a,t):typeof a=="string"?ii(a,t):le(a.low,a.high,typeof t=="boolean"?t:a.unsigned)}var dt,Fs,Bs,Kn,$s,jd,Mr,Rs,ks,Ns,Ot,qt,Rr,Ms,oi,Gs,Us,rt,N,Yt,ai=D(()=>{dt=null;try{dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Te.prototype.__isLong__;Object.defineProperty(Te.prototype,"__isLong__",{value:!0});Te.isLong=qe;Fs={},Bs={};Te.fromInt=yr;Te.fromNumber=ht;Te.fromBits=le;Kn=Math.pow;Te.fromString=ii;Te.fromValue=St;$s=65536,jd=1<<24,Mr=$s*$s,Rs=Mr*Mr,ks=Rs/2,Ns=yr(jd),Ot=yr(0);Te.ZERO=Ot;qt=yr(0,!0);Te.UZERO=qt;Rr=yr(1);Te.ONE=Rr;Ms=yr(1,!0);Te.UONE=Ms;oi=yr(-1);Te.NEG_ONE=oi;Gs=le(-1,2147483647,!1);Te.MAX_VALUE=Gs;Us=le(-1,-1,!0);Te.MAX_UNSIGNED_VALUE=Us;rt=le(0,-2147483648,!1);Te.MIN_VALUE=rt;N=Te.prototype;N.toInt=function(){return this.unsigned?this.low>>>0:this.low};N.toNumber=function(){return this.unsigned?(this.high>>>0)*Mr+(this.low>>>0):this.high*Mr+(this.low>>>0)};N.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(rt)){var o=ht(t),e=this.div(o),r=e.mul(o).sub(this);return e.toString(t)+r.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var n=ht(Kn(t,6),this.unsigned),s=this,i="";;){var u=s.div(n),l=s.sub(u.mul(n)).toInt()>>>0,c=l.toString(t);if(s=u,s.isZero())return c+i;for(;c.length<6;)c="0"+c;i=""+c+i}};N.getHighBits=function(){return this.high};N.getHighBitsUnsigned=function(){return this.high>>>0};N.getLowBits=function(){return this.low};N.getLowBitsUnsigned=function(){return this.low>>>0};N.getNumBitsAbs=function(){if(this.isNegative())return this.eq(rt)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,o=31;o>0&&!(t&1<<o);o--);return this.high!=0?o+33:o+1};N.isZero=function(){return this.high===0&&this.low===0};N.eqz=N.isZero;N.isNegative=function(){return!this.unsigned&&this.high<0};N.isPositive=function(){return this.unsigned||this.high>=0};N.isOdd=function(){return(this.low&1)===1};N.isEven=function(){return(this.low&1)===0};N.equals=function(t){return qe(t)||(t=St(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};N.eq=N.equals;N.notEquals=function(t){return!this.eq(t)};N.neq=N.notEquals;N.ne=N.notEquals;N.lessThan=function(t){return this.comp(t)<0};N.lt=N.lessThan;N.lessThanOrEqual=function(t){return this.comp(t)<=0};N.lte=N.lessThanOrEqual;N.le=N.lessThanOrEqual;N.greaterThan=function(t){return this.comp(t)>0};N.gt=N.greaterThan;N.greaterThanOrEqual=function(t){return this.comp(t)>=0};N.gte=N.greaterThanOrEqual;N.ge=N.greaterThanOrEqual;N.compare=function(t){if(qe(t)||(t=St(t)),this.eq(t))return 0;var o=this.isNegative(),e=t.isNegative();return o&&!e?-1:!o&&e?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};N.comp=N.compare;N.negate=function(){return!this.unsigned&&this.eq(rt)?rt:this.not().add(Rr)};N.neg=N.negate;N.add=function(t){qe(t)||(t=St(t));var o=this.high>>>16,e=this.high&65535,r=this.low>>>16,n=this.low&65535,s=t.high>>>16,i=t.high&65535,u=t.low>>>16,l=t.low&65535,c=0,p=0,b=0,x=0;return x+=n+l,b+=x>>>16,x&=65535,b+=r+u,p+=b>>>16,b&=65535,p+=e+i,c+=p>>>16,p&=65535,c+=o+s,c&=65535,le(b<<16|x,c<<16|p,this.unsigned)};N.subtract=function(t){return qe(t)||(t=St(t)),this.add(t.neg())};N.sub=N.subtract;N.multiply=function(t){if(this.isZero())return this;if(qe(t)||(t=St(t)),dt){var o=dt.mul(this.low,this.high,t.low,t.high);return le(o,dt.get_high(),this.unsigned)}if(t.isZero())return this.unsigned?qt:Ot;if(this.eq(rt))return t.isOdd()?rt:Ot;if(t.eq(rt))return this.isOdd()?rt:Ot;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(Ns)&&t.lt(Ns))return ht(this.toNumber()*t.toNumber(),this.unsigned);var e=this.high>>>16,r=this.high&65535,n=this.low>>>16,s=this.low&65535,i=t.high>>>16,u=t.high&65535,l=t.low>>>16,c=t.low&65535,p=0,b=0,x=0,v=0;return v+=s*c,x+=v>>>16,v&=65535,x+=n*c,b+=x>>>16,x&=65535,x+=s*l,b+=x>>>16,x&=65535,b+=r*c,p+=b>>>16,b&=65535,b+=n*l,p+=b>>>16,b&=65535,b+=s*u,p+=b>>>16,b&=65535,p+=e*c+r*l+n*u+s*i,p&=65535,le(x<<16|v,p<<16|b,this.unsigned)};N.mul=N.multiply;N.divide=function(t){if(qe(t)||(t=St(t)),t.isZero())throw Error("division by zero");if(dt){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var o=(this.unsigned?dt.div_u:dt.div_s)(this.low,this.high,t.low,t.high);return le(o,dt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?qt:Ot;var e,r,n;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return qt;if(t.gt(this.shru(1)))return Ms;n=qt}else{if(this.eq(rt)){if(t.eq(Rr)||t.eq(oi))return rt;if(t.eq(rt))return Rr;var s=this.shr(1);return e=s.div(t).shl(1),e.eq(Ot)?t.isNegative()?Rr:oi:(r=this.sub(t.mul(e)),n=e.add(r.div(t)),n)}else if(t.eq(rt))return this.unsigned?qt:Ot;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();n=Ot}for(r=this;r.gte(t);){e=Math.max(1,Math.floor(r.toNumber()/t.toNumber()));for(var i=Math.ceil(Math.log(e)/Math.LN2),u=i<=48?1:Kn(2,i-48),l=ht(e),c=l.mul(t);c.isNegative()||c.gt(r);)e-=u,l=ht(e,this.unsigned),c=l.mul(t);l.isZero()&&(l=Rr),n=n.add(l),r=r.sub(c)}return n};N.div=N.divide;N.modulo=function(t){if(qe(t)||(t=St(t)),dt){var o=(this.unsigned?dt.rem_u:dt.rem_s)(this.low,this.high,t.low,t.high);return le(o,dt.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};N.mod=N.modulo;N.rem=N.modulo;N.not=function(){return le(~this.low,~this.high,this.unsigned)};N.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};N.clz=N.countLeadingZeros;N.countTrailingZeros=function(){return this.low?Cs(this.low):Cs(this.high)+32};N.ctz=N.countTrailingZeros;N.and=function(t){return qe(t)||(t=St(t)),le(this.low&t.low,this.high&t.high,this.unsigned)};N.or=function(t){return qe(t)||(t=St(t)),le(this.low|t.low,this.high|t.high,this.unsigned)};N.xor=function(t){return qe(t)||(t=St(t)),le(this.low^t.low,this.high^t.high,this.unsigned)};N.shiftLeft=function(t){return qe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):le(0,this.low<<t-32,this.unsigned)};N.shl=N.shiftLeft;N.shiftRight=function(t){return qe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):le(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};N.shr=N.shiftRight;N.shiftRightUnsigned=function(t){return qe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low>>>t|this.high<<32-t,this.high>>>t,this.unsigned):t===32?le(this.high,0,this.unsigned):le(this.high>>>t-32,0,this.unsigned)};N.shru=N.shiftRightUnsigned;N.shr_u=N.shiftRightUnsigned;N.rotateLeft=function(t){var o;return qe(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?le(this.high,this.low,this.unsigned):t<32?(o=32-t,le(this.low<<t|this.high>>>o,this.high<<t|this.low>>>o,this.unsigned)):(t-=32,o=32-t,le(this.high<<t|this.low>>>o,this.low<<t|this.high>>>o,this.unsigned))};N.rotl=N.rotateLeft;N.rotateRight=function(t){var o;return qe(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?le(this.high,this.low,this.unsigned):t<32?(o=32-t,le(this.high<<o|this.low>>>t,this.low<<o|this.high>>>t,this.unsigned)):(t-=32,o=32-t,le(this.low<<o|this.high>>>t,this.high<<o|this.low>>>t,this.unsigned))};N.rotr=N.rotateRight;N.toSigned=function(){return this.unsigned?le(this.low,this.high,!1):this};N.toUnsigned=function(){return this.unsigned?this:le(this.low,this.high,!0)};N.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};N.toBytesLE=function(){var t=this.high,o=this.low;return[o&255,o>>>8&255,o>>>16&255,o>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};N.toBytesBE=function(){var t=this.high,o=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,o>>>24,o>>>16&255,o>>>8&255,o&255]};Te.fromBytes=function(t,o,e){return e?Te.fromBytesLE(t,o):Te.fromBytesBE(t,o)};Te.fromBytesLE=function(t,o){return new Te(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,o)};Te.fromBytesBE=function(t,o){return new Te(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],o)};Yt=Te});var S,Jn=D(()=>{S={};S.Offset;S.Table;S.SIZEOF_SHORT=2;S.SIZEOF_INT=4;S.FILE_IDENTIFIER_LENGTH=4;S.SIZE_PREFIX_LENGTH=4;S.Encoding={UTF8_BYTES:1,UTF16_STRING:2};S.int32=new Int32Array(2);S.float32=new Float32Array(S.int32.buffer);S.float64=new Float64Array(S.int32.buffer);S.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;S.Long=function(a,t){this.low=a|0,this.high=t|0};S.Long.create=function(a,t){return a==0&&t==0?S.Long.ZERO:new S.Long(a,t)};S.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};S.Long.prototype.equals=function(a){return this.low==a.low&&this.high==a.high};S.Long.ZERO=new S.Long(0,0);S.Builder=function(a){if(a)var t=a;else var t=1024;this.bb=S.ByteBuffer.allocate(t),this.space=t,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};S.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};S.Builder.prototype.forceDefaults=function(a){this.force_defaults=a};S.Builder.prototype.dataBuffer=function(){return this.bb};S.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};S.Builder.prototype.prep=function(a,t){a>this.minalign&&(this.minalign=a);for(var o=~(this.bb.capacity()-this.space+t)+1&a-1;this.space<o+a+t;){var e=this.bb.capacity();this.bb=S.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-e}this.pad(o)};S.Builder.prototype.pad=function(a){for(var t=0;t<a;t++)this.bb.writeInt8(--this.space,0)};S.Builder.prototype.writeInt8=function(a){this.bb.writeInt8(this.space-=1,a)};S.Builder.prototype.writeInt16=function(a){this.bb.writeInt16(this.space-=2,a)};S.Builder.prototype.writeInt32=function(a){this.bb.writeInt32(this.space-=4,a)};S.Builder.prototype.writeInt64=function(a){this.bb.writeInt64(this.space-=8,a)};S.Builder.prototype.writeFloat32=function(a){this.bb.writeFloat32(this.space-=4,a)};S.Builder.prototype.writeFloat64=function(a){this.bb.writeFloat64(this.space-=8,a)};S.Builder.prototype.addInt8=function(a){this.prep(1,0),this.writeInt8(a)};S.Builder.prototype.addInt16=function(a){this.prep(2,0),this.writeInt16(a)};S.Builder.prototype.addInt32=function(a){this.prep(4,0),this.writeInt32(a)};S.Builder.prototype.addInt64=function(a){this.prep(8,0),this.writeInt64(a)};S.Builder.prototype.addFloat32=function(a){this.prep(4,0),this.writeFloat32(a)};S.Builder.prototype.addFloat64=function(a){this.prep(8,0),this.writeFloat64(a)};S.Builder.prototype.addFieldInt8=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt8(t),this.slot(a))};S.Builder.prototype.addFieldInt16=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt16(t),this.slot(a))};S.Builder.prototype.addFieldInt32=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt32(t),this.slot(a))};S.Builder.prototype.addFieldInt64=function(a,t,o){(this.force_defaults||!t.equals(o))&&(this.addInt64(t),this.slot(a))};S.Builder.prototype.addFieldFloat32=function(a,t,o){(this.force_defaults||t!=o)&&(this.addFloat32(t),this.slot(a))};S.Builder.prototype.addFieldFloat64=function(a,t,o){(this.force_defaults||t!=o)&&(this.addFloat64(t),this.slot(a))};S.Builder.prototype.addFieldOffset=function(a,t,o){(this.force_defaults||t!=o)&&(this.addOffset(t),this.slot(a))};S.Builder.prototype.addFieldStruct=function(a,t,o){t!=o&&(this.nested(t),this.slot(a))};S.Builder.prototype.nested=function(a){if(a!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};S.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};S.Builder.prototype.slot=function(a){this.vtable[a]=this.offset()};S.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};S.Builder.growByteBuffer=function(a){var t=a.capacity();if(t&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var o=t<<1,e=S.ByteBuffer.allocate(o);return e.setPosition(o-t),e.bytes().set(a.bytes(),o-t),e};S.Builder.prototype.addOffset=function(a){this.prep(S.SIZEOF_INT,0),this.writeInt32(this.offset()-a+S.SIZEOF_INT)};S.Builder.prototype.startObject=function(a){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=a;for(var t=0;t<a;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()};S.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var a=this.offset(),t=this.vtable_in_use-1;t>=0&&this.vtable[t]==0;t--);for(var o=t+1;t>=0;t--)this.addInt16(this.vtable[t]!=0?a-this.vtable[t]:0);var e=2;this.addInt16(a-this.object_start);var r=(o+e)*S.SIZEOF_SHORT;this.addInt16(r);var n=0,s=this.space;e:for(t=0;t<this.vtables.length;t++){var i=this.bb.capacity()-this.vtables[t];if(r==this.bb.readInt16(i)){for(var u=S.SIZEOF_SHORT;u<r;u+=S.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(i+u))continue e;n=this.vtables[t];break}}return n?(this.space=this.bb.capacity()-a,this.bb.writeInt32(this.space,n-a)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-a,this.offset()-a)),this.isNested=!1,a};S.Builder.prototype.finish=function(a,t,o){var e=o?S.SIZE_PREFIX_LENGTH:0;if(t){var r=t;if(this.prep(this.minalign,S.SIZEOF_INT+S.FILE_IDENTIFIER_LENGTH+e),r.length!=S.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+S.FILE_IDENTIFIER_LENGTH);for(var n=S.FILE_IDENTIFIER_LENGTH-1;n>=0;n--)this.writeInt8(r.charCodeAt(n))}this.prep(this.minalign,S.SIZEOF_INT+e),this.addOffset(a),e&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};S.Builder.prototype.finishSizePrefixed=function(a,t){this.finish(a,t,!0)};S.Builder.prototype.requiredField=function(a,t){var o=this.bb.capacity()-a,e=o-this.bb.readInt32(o),r=this.bb.readInt16(e+t)!=0;if(!r)throw new Error("FlatBuffers: field "+t+" must be set")};S.Builder.prototype.startVector=function(a,t,o){this.notNested(),this.vector_num_elems=t,this.prep(S.SIZEOF_INT,a*t),this.prep(o,a*t)};S.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};S.Builder.prototype.createString=function(a){if(a instanceof Uint8Array)var t=a;else for(var t=[],o=0;o<a.length;){var e,r=a.charCodeAt(o++);if(r<55296||r>=56320)e=r;else{var n=a.charCodeAt(o++);e=(r<<10)+n+(65536-56623104-56320)}e<128?t.push(e):(e<2048?t.push(e>>6&31|192):(e<65536?t.push(e>>12&15|224):t.push(e>>18&7|240,e>>12&63|128),t.push(e>>6&63|128)),t.push(e&63|128))}this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length);for(var o=0,s=this.space,i=this.bb.bytes();o<t.length;o++)i[s++]=t[o];return this.endVector()};S.Builder.prototype.createLong=function(a,t){return S.Long.create(a,t)};S.ByteBuffer=function(a){this.bytes_=a,this.position_=0};S.ByteBuffer.allocate=function(a){return new S.ByteBuffer(new Uint8Array(a))};S.ByteBuffer.prototype.clear=function(){this.position_=0};S.ByteBuffer.prototype.bytes=function(){return this.bytes_};S.ByteBuffer.prototype.position=function(){return this.position_};S.ByteBuffer.prototype.setPosition=function(a){this.position_=a};S.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};S.ByteBuffer.prototype.readInt8=function(a){return this.readUint8(a)<<24>>24};S.ByteBuffer.prototype.readUint8=function(a){return this.bytes_[a]};S.ByteBuffer.prototype.readInt16=function(a){return this.readUint16(a)<<16>>16};S.ByteBuffer.prototype.readUint16=function(a){return this.bytes_[a]|this.bytes_[a+1]<<8};S.ByteBuffer.prototype.readInt32=function(a){return this.bytes_[a]|this.bytes_[a+1]<<8|this.bytes_[a+2]<<16|this.bytes_[a+3]<<24};S.ByteBuffer.prototype.readUint32=function(a){return this.readInt32(a)>>>0};S.ByteBuffer.prototype.readInt64=function(a){return new S.Long(this.readInt32(a),this.readInt32(a+4))};S.ByteBuffer.prototype.readUint64=function(a){return new S.Long(this.readUint32(a),this.readUint32(a+4))};S.ByteBuffer.prototype.readFloat32=function(a){return S.int32[0]=this.readInt32(a),S.float32[0]};S.ByteBuffer.prototype.readFloat64=function(a){return S.int32[S.isLittleEndian?0:1]=this.readInt32(a),S.int32[S.isLittleEndian?1:0]=this.readInt32(a+4),S.float64[0]};S.ByteBuffer.prototype.writeInt8=function(a,t){this.bytes_[a]=t};S.ByteBuffer.prototype.writeUint8=function(a,t){this.bytes_[a]=t};S.ByteBuffer.prototype.writeInt16=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8};S.ByteBuffer.prototype.writeUint16=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8};S.ByteBuffer.prototype.writeInt32=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8,this.bytes_[a+2]=t>>16,this.bytes_[a+3]=t>>24};S.ByteBuffer.prototype.writeUint32=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8,this.bytes_[a+2]=t>>16,this.bytes_[a+3]=t>>24};S.ByteBuffer.prototype.writeInt64=function(a,t){this.writeInt32(a,t.low),this.writeInt32(a+4,t.high)};S.ByteBuffer.prototype.writeUint64=function(a,t){this.writeUint32(a,t.low),this.writeUint32(a+4,t.high)};S.ByteBuffer.prototype.writeFloat32=function(a,t){S.float32[0]=t,this.writeInt32(a,S.int32[0])};S.ByteBuffer.prototype.writeFloat64=function(a,t){S.float64[0]=t,this.writeInt32(a,S.int32[S.isLittleEndian?0:1]),this.writeInt32(a+4,S.int32[S.isLittleEndian?1:0])};S.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+S.SIZEOF_INT+S.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var a="",t=0;t<S.FILE_IDENTIFIER_LENGTH;t++)a+=String.fromCharCode(this.readInt8(this.position_+S.SIZEOF_INT+t));return a};S.ByteBuffer.prototype.__offset=function(a,t){var o=a-this.readInt32(a);return t<this.readInt16(o)?this.readInt16(o+t):0};S.ByteBuffer.prototype.__union=function(a,t){return a.bb_pos=t+this.readInt32(t),a.bb=this,a};S.ByteBuffer.prototype.__string=function(a,t){a+=this.readInt32(a);var o=this.readInt32(a),e="",r=0;if(a+=S.SIZEOF_INT,t===S.Encoding.UTF8_BYTES)return this.bytes_.subarray(a,a+o);for(;r<o;){var n,s=this.readUint8(a+r++);if(s<192)n=s;else{var i=this.readUint8(a+r++);if(s<224)n=(s&31)<<6|i&63;else{var u=this.readUint8(a+r++);if(s<240)n=(s&15)<<12|(i&63)<<6|u&63;else{var l=this.readUint8(a+r++);n=(s&7)<<18|(i&63)<<12|(u&63)<<6|l&63}}}n<65536?e+=String.fromCharCode(n):(n-=65536,e+=String.fromCharCode((n>>10)+55296,(n&1024-1)+56320))}return e};S.ByteBuffer.prototype.__indirect=function(a){return a+this.readInt32(a)};S.ByteBuffer.prototype.__vector=function(a){return a+this.readInt32(a)+S.SIZEOF_INT};S.ByteBuffer.prototype.__vector_len=function(a){return this.readInt32(a+this.readInt32(a))};S.ByteBuffer.prototype.__has_identifier=function(a){if(a.length!=S.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+S.FILE_IDENTIFIER_LENGTH);for(var t=0;t<S.FILE_IDENTIFIER_LENGTH;t++)if(a.charCodeAt(t)!=this.readInt8(this.position_+S.SIZEOF_INT+t))return!1;return!0};S.ByteBuffer.prototype.createLong=function(a,t){return S.Long.create(a,t)}});var H,ln=D(()=>{"use strict";Jn();(t=>{let a;(e=>{let o;(n=>{let r;(F=>(F[F.UNDEFINED=0]="UNDEFINED",F[F.FLOAT=1]="FLOAT",F[F.INT=2]="INT",F[F.STRING=3]="STRING",F[F.TENSOR=4]="TENSOR",F[F.GRAPH=5]="GRAPH",F[F.FLOATS=6]="FLOATS",F[F.INTS=7]="INTS",F[F.STRINGS=8]="STRINGS",F[F.TENSORS=9]="TENSORS",F[F.GRAPHS=10]="GRAPHS",F[F.SPARSE_TENSOR=11]="SPARSE_TENSOR",F[F.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(r=n.AttributeType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{let r;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(r=n.DimensionValueType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{let r;(V=>(V[V.UNDEFINED=0]="UNDEFINED",V[V.FLOAT=1]="FLOAT",V[V.UINT8=2]="UINT8",V[V.INT8=3]="INT8",V[V.UINT16=4]="UINT16",V[V.INT16=5]="INT16",V[V.INT32=6]="INT32",V[V.INT64=7]="INT64",V[V.STRING=8]="STRING",V[V.BOOL=9]="BOOL",V[V.FLOAT16=10]="FLOAT16",V[V.DOUBLE=11]="DOUBLE",V[V.UINT32=12]="UINT32",V[V.UINT64=13]="UINT64",V[V.COMPLEX64=14]="COMPLEX64",V[V.COMPLEX128=15]="COMPLEX128",V[V.BFLOAT16=16]="BFLOAT16",V[V.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",V[V.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",V[V.FLOAT8E5M2=19]="FLOAT8E5M2",V[V.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(r=n.TensorDataType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{let r;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(r=n.NodeType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{let r;(c=>(c[c.NONE=0]="NONE",c[c.tensor_type=1]="tensor_type",c[c.sequence_type=2]="sequence_type",c[c.map_type=3]="map_type"))(r=n.TypeInfoValue||={})})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsShape(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsShape(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}dim(i,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new t.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}dimLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}static startShape(i){i.startObject(1)}static addDim(i,u){i.addFieldOffset(0,u,0)}static createDimVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startDimVector(i,u){i.startVector(4,u,4)}static endShape(i){return i.endObject()}static createShape(i,u){return r.startShape(i),r.addDim(i,u),r.endShape(i)}}n.Shape=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsDimension(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimension(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}value(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}static startDimension(i){i.startObject(2)}static addValue(i,u){i.addFieldOffset(0,u,0)}static addDenotation(i,u){i.addFieldOffset(1,u,0)}static endDimension(i){return i.endObject()}static createDimension(i,u,l){return r.startDimension(i),r.addValue(i,u),r.addDenotation(i,l),r.endDimension(i)}}n.Dimension=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsDimensionValue(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimensionValue(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}dimType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt8(this.bb_pos+i):0}dimValue(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}dimParam(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}static startDimensionValue(i){i.startObject(3)}static addDimType(i,u){i.addFieldInt8(0,u,0)}static addDimValue(i,u){i.addFieldInt64(1,u,i.createLong(0,0))}static addDimParam(i,u){i.addFieldOffset(2,u,0)}static endDimensionValue(i){return i.endObject()}static createDimensionValue(i,u,l,c){return r.startDimensionValue(i),r.addDimType(i,u),r.addDimValue(i,l),r.addDimParam(i,c),r.endDimensionValue(i)}}n.DimensionValue=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTensorTypeAndShape(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTensorTypeAndShape(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}elemType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt32(this.bb_pos+i):0}shape(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(i){i.startObject(2)}static addElemType(i,u){i.addFieldInt32(0,u,0)}static addShape(i,u){i.addFieldOffset(1,u,0)}static endTensorTypeAndShape(i){return i.endObject()}static createTensorTypeAndShape(i,u,l){return r.startTensorTypeAndShape(i),r.addElemType(i,u),r.addShape(i,l),r.endTensorTypeAndShape(i)}}n.TensorTypeAndShape=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsMapType(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsMapType(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}keyType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt32(this.bb_pos+i):0}valueType(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(i){i.startObject(2)}static addKeyType(i,u){i.addFieldInt32(0,u,0)}static addValueType(i,u){i.addFieldOffset(1,u,0)}static endMapType(i){return i.endObject()}static createMapType(i,u,l){return r.startMapType(i),r.addKeyType(i,u),r.addValueType(i,l),r.endMapType(i)}}n.MapType=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSequenceType(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSequenceType(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}elemType(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(i){i.startObject(1)}static addElemType(i,u){i.addFieldOffset(0,u,0)}static endSequenceType(i){return i.endObject()}static createSequenceType(i,u){return r.startSequenceType(i),r.addElemType(i,u),r.endSequenceType(i)}}n.SequenceType=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(i,u,l,c){return i.prep(4,12),i.writeInt32(c),i.writeInt32(l),i.writeInt32(u),i.offset()}}n.EdgeEnd=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsNodeEdge(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsNodeEdge(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}nodeIndex(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readUint32(this.bb_pos+i):0}inputEdges(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+i*12,this.bb):null}inputEdgesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}outputEdges(i,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new t.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+i*12,this.bb):null}outputEdgesLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startNodeEdge(i){i.startObject(3)}static addNodeIndex(i,u){i.addFieldInt32(0,u,0)}static addInputEdges(i,u){i.addFieldOffset(1,u,0)}static startInputEdgesVector(i,u){i.startVector(12,u,4)}static addOutputEdges(i,u){i.addFieldOffset(2,u,0)}static startOutputEdgesVector(i,u){i.startVector(12,u,4)}static endNodeEdge(i){return i.endObject()}static createNodeEdge(i,u,l,c){return r.startNodeEdge(i),r.addNodeIndex(i,u),r.addInputEdges(i,l),r.addOutputEdges(i,c),r.endNodeEdge(i)}}n.NodeEdge=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsNode(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsNode(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}domain(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}sinceVersion(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readInt32(this.bb_pos+i):0}index(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readUint32(this.bb_pos+i):0}opType(i){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,i):null}type(){let i=this.bb.__offset(this.bb_pos,16);return i?this.bb.readInt32(this.bb_pos+i):0}executionProviderType(i){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,i):null}inputs(i,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}inputsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}outputs(i,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}outputsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}attributes(i,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new t.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}attributesLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}inputArgCounts(i){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+i*4):0}inputArgCountsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}inputArgCountsArray(){let i=this.bb.__offset(this.bb_pos,26);return i?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}implicitInputs(i,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}implicitInputsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startNode(i){i.startObject(13)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addDomain(i,u){i.addFieldOffset(2,u,0)}static addSinceVersion(i,u){i.addFieldInt32(3,u,0)}static addIndex(i,u){i.addFieldInt32(4,u,0)}static addOpType(i,u){i.addFieldOffset(5,u,0)}static addType(i,u){i.addFieldInt32(6,u,0)}static addExecutionProviderType(i,u){i.addFieldOffset(7,u,0)}static addInputs(i,u){i.addFieldOffset(8,u,0)}static createInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInputsVector(i,u){i.startVector(4,u,4)}static addOutputs(i,u){i.addFieldOffset(9,u,0)}static createOutputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOutputsVector(i,u){i.startVector(4,u,4)}static addAttributes(i,u){i.addFieldOffset(10,u,0)}static createAttributesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startAttributesVector(i,u){i.startVector(4,u,4)}static addInputArgCounts(i,u){i.addFieldOffset(11,u,0)}static createInputArgCountsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addInt32(u[l]);return i.endVector()}static startInputArgCountsVector(i,u){i.startVector(4,u,4)}static addImplicitInputs(i,u){i.addFieldOffset(12,u,0)}static createImplicitInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startImplicitInputsVector(i,u){i.startVector(4,u,4)}static endNode(i){return i.endObject()}static createNode(i,u,l,c,p,b,x,v,_,I,L,B,F,J){return r.startNode(i),r.addName(i,u),r.addDocString(i,l),r.addDomain(i,c),r.addSinceVersion(i,p),r.addIndex(i,b),r.addOpType(i,x),r.addType(i,v),r.addExecutionProviderType(i,_),r.addInputs(i,I),r.addOutputs(i,L),r.addAttributes(i,B),r.addInputArgCounts(i,F),r.addImplicitInputs(i,J),r.endNode(i)}}n.Node=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsValueInfo(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsValueInfo(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}type(i){let u=this.bb.__offset(this.bb_pos,8);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(i){i.startObject(3)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addType(i,u){i.addFieldOffset(2,u,0)}static endValueInfo(i){return i.endObject()}static createValueInfo(i,u,l,c){return r.startValueInfo(i),r.addName(i,u),r.addDocString(i,l),r.addType(i,c),r.endValueInfo(i)}}n.ValueInfo=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTypeInfo(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTypeInfo(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}denotation(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}valueType(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readUint8(this.bb_pos+i):0}value(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(i,this.bb_pos+u):null}static startTypeInfo(i){i.startObject(3)}static addDenotation(i,u){i.addFieldOffset(0,u,0)}static addValueType(i,u){i.addFieldInt8(1,u,0)}static addValue(i,u){i.addFieldOffset(2,u,0)}static endTypeInfo(i){return i.endObject()}static createTypeInfo(i,u,l,c){return r.startTypeInfo(i),r.addDenotation(i,u),r.addValueType(i,l),r.addValue(i,c),r.endTypeInfo(i)}}n.TypeInfo=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsOperatorSetId(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsOperatorSetId(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}domain(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}version(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}static startOperatorSetId(i){i.startObject(2)}static addDomain(i,u){i.addFieldOffset(0,u,0)}static addVersion(i,u){i.addFieldInt64(1,u,i.createLong(0,0))}static endOperatorSetId(i){return i.endObject()}static createOperatorSetId(i,u,l){return r.startOperatorSetId(i),r.addDomain(i,u),r.addVersion(i,l),r.endOperatorSetId(i)}}n.OperatorSetId=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTensor(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTensor(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}dims(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}dimsLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}dataType(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readInt32(this.bb_pos+i):0}rawData(i){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+i):0}rawDataLength(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.__vector_len(this.bb_pos+i):0}rawDataArray(){let i=this.bb.__offset(this.bb_pos,12);return i?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}stringData(i,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}stringDataLength(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__vector_len(this.bb_pos+i):0}static startTensor(i){i.startObject(6)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addDims(i,u){i.addFieldOffset(2,u,0)}static createDimsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startDimsVector(i,u){i.startVector(8,u,8)}static addDataType(i,u){i.addFieldInt32(3,u,0)}static addRawData(i,u){i.addFieldOffset(4,u,0)}static createRawDataVector(i,u){i.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)i.addInt8(u[l]);return i.endVector()}static startRawDataVector(i,u){i.startVector(1,u,1)}static addStringData(i,u){i.addFieldOffset(5,u,0)}static createStringDataVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startStringDataVector(i,u){i.startVector(4,u,4)}static endTensor(i){return i.endObject()}static createTensor(i,u,l,c,p,b,x){return r.startTensor(i),r.addName(i,u),r.addDocString(i,l),r.addDims(i,c),r.addDataType(i,p),r.addRawData(i,b),r.addStringData(i,x),r.endTensor(i)}}n.Tensor=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSparseTensor(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSparseTensor(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}values(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}dimsLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startSparseTensor(i){i.startObject(3)}static addValues(i,u){i.addFieldOffset(0,u,0)}static addIndices(i,u){i.addFieldOffset(1,u,0)}static addDims(i,u){i.addFieldOffset(2,u,0)}static createDimsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startDimsVector(i,u){i.startVector(8,u,8)}static endSparseTensor(i){return i.endObject()}static createSparseTensor(i,u,l,c){return r.startSparseTensor(i),r.addValues(i,u),r.addIndices(i,l),r.addDims(i,c),r.endSparseTensor(i)}}n.SparseTensor=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsAttribute(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsAttribute(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}type(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.readInt32(this.bb_pos+i):0}f(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readFloat32(this.bb_pos+i):0}i(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}s(i){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,i):null}t(i){let u=this.bb.__offset(this.bb_pos,16);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(i){let u=this.bb.__offset(this.bb_pos,18);return u?(i||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(i){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+i*4):0}floatsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}floatsArray(){let i=this.bb.__offset(this.bb_pos,20);return i?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}ints(i){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}intsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}strings(i,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}stringsLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}tensors(i,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}tensorsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}graphs(i,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}graphsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startAttribute(i){i.startObject(13)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addType(i,u){i.addFieldInt32(2,u,0)}static addF(i,u){i.addFieldFloat32(3,u,0)}static addI(i,u){i.addFieldInt64(4,u,i.createLong(0,0))}static addS(i,u){i.addFieldOffset(5,u,0)}static addT(i,u){i.addFieldOffset(6,u,0)}static addG(i,u){i.addFieldOffset(7,u,0)}static addFloats(i,u){i.addFieldOffset(8,u,0)}static createFloatsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addFloat32(u[l]);return i.endVector()}static startFloatsVector(i,u){i.startVector(4,u,4)}static addInts(i,u){i.addFieldOffset(9,u,0)}static createIntsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startIntsVector(i,u){i.startVector(8,u,8)}static addStrings(i,u){i.addFieldOffset(10,u,0)}static createStringsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startStringsVector(i,u){i.startVector(4,u,4)}static addTensors(i,u){i.addFieldOffset(11,u,0)}static createTensorsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startTensorsVector(i,u){i.startVector(4,u,4)}static addGraphs(i,u){i.addFieldOffset(12,u,0)}static createGraphsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startGraphsVector(i,u){i.startVector(4,u,4)}static endAttribute(i){return i.endObject()}static createAttribute(i,u,l,c,p,b,x,v,_,I,L,B,F,J){return r.startAttribute(i),r.addName(i,u),r.addDocString(i,l),r.addType(i,c),r.addF(i,p),r.addI(i,b),r.addS(i,x),r.addT(i,v),r.addG(i,_),r.addFloats(i,I),r.addInts(i,L),r.addStrings(i,B),r.addTensors(i,F),r.addGraphs(i,J),r.endAttribute(i)}}n.Attribute=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsGraph(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsGraph(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}initializers(i,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}initializersLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}nodeArgs(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodeArgsLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}nodes(i,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new t.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodesLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}maxNodeIndex(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readUint32(this.bb_pos+i):0}nodeEdges(i,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new t.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodeEdgesLength(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.__vector_len(this.bb_pos+i):0}inputs(i,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}inputsLength(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__vector_len(this.bb_pos+i):0}outputs(i,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}outputsLength(){let i=this.bb.__offset(this.bb_pos,16);return i?this.bb.__vector_len(this.bb_pos+i):0}sparseInitializers(i,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new t.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}sparseInitializersLength(){let i=this.bb.__offset(this.bb_pos,18);return i?this.bb.__vector_len(this.bb_pos+i):0}static startGraph(i){i.startObject(8)}static addInitializers(i,u){i.addFieldOffset(0,u,0)}static createInitializersVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInitializersVector(i,u){i.startVector(4,u,4)}static addNodeArgs(i,u){i.addFieldOffset(1,u,0)}static createNodeArgsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodeArgsVector(i,u){i.startVector(4,u,4)}static addNodes(i,u){i.addFieldOffset(2,u,0)}static createNodesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodesVector(i,u){i.startVector(4,u,4)}static addMaxNodeIndex(i,u){i.addFieldInt32(3,u,0)}static addNodeEdges(i,u){i.addFieldOffset(4,u,0)}static createNodeEdgesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodeEdgesVector(i,u){i.startVector(4,u,4)}static addInputs(i,u){i.addFieldOffset(5,u,0)}static createInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInputsVector(i,u){i.startVector(4,u,4)}static addOutputs(i,u){i.addFieldOffset(6,u,0)}static createOutputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOutputsVector(i,u){i.startVector(4,u,4)}static addSparseInitializers(i,u){i.addFieldOffset(7,u,0)}static createSparseInitializersVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startSparseInitializersVector(i,u){i.startVector(4,u,4)}static endGraph(i){return i.endObject()}static createGraph(i,u,l,c,p,b,x,v,_){return r.startGraph(i),r.addInitializers(i,u),r.addNodeArgs(i,l),r.addNodes(i,c),r.addMaxNodeIndex(i,p),r.addNodeEdges(i,b),r.addInputs(i,x),r.addOutputs(i,v),r.addSparseInitializers(i,_),r.endGraph(i)}}n.Graph=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsModel(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsModel(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}irVersion(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}opsetImport(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}opsetImportLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}producerName(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}producerVersion(i){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,i):null}domain(i){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,i):null}modelVersion(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}docString(i){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,i):null}graph(i){let u=this.bb.__offset(this.bb_pos,18);return u?(i||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(i){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,i):null}static startModel(i){i.startObject(9)}static addIrVersion(i,u){i.addFieldInt64(0,u,i.createLong(0,0))}static addOpsetImport(i,u){i.addFieldOffset(1,u,0)}static createOpsetImportVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOpsetImportVector(i,u){i.startVector(4,u,4)}static addProducerName(i,u){i.addFieldOffset(2,u,0)}static addProducerVersion(i,u){i.addFieldOffset(3,u,0)}static addDomain(i,u){i.addFieldOffset(4,u,0)}static addModelVersion(i,u){i.addFieldInt64(5,u,i.createLong(0,0))}static addDocString(i,u){i.addFieldOffset(6,u,0)}static addGraph(i,u){i.addFieldOffset(7,u,0)}static addGraphDocString(i,u){i.addFieldOffset(8,u,0)}static endModel(i){return i.endObject()}static createModel(i,u,l,c,p,b,x,v,_,I){return r.startModel(i),r.addIrVersion(i,u),r.addOpsetImport(i,l),r.addProducerName(i,c),r.addProducerVersion(i,p),r.addDomain(i,b),r.addModelVersion(i,x),r.addDocString(i,v),r.addGraph(i,_),r.addGraphDocString(i,I),r.endModel(i)}}n.Model=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsKernelCreateInfos(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsKernelCreateInfos(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}nodeIndices(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+i*4):0}nodeIndicesLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}nodeIndicesArray(){let i=this.bb.__offset(this.bb_pos,4);return i?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}kernelDefHashes(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startKernelCreateInfos(i){i.startObject(2)}static addNodeIndices(i,u){i.addFieldOffset(0,u,0)}static createNodeIndicesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addInt32(u[l]);return i.endVector()}static startNodeIndicesVector(i,u){i.startVector(4,u,4)}static addKernelDefHashes(i,u){i.addFieldOffset(1,u,0)}static createKernelDefHashesVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startKernelDefHashesVector(i,u){i.startVector(8,u,8)}static endKernelCreateInfos(i){return i.endObject()}static createKernelCreateInfos(i,u,l){return r.startKernelCreateInfos(i),r.addNodeIndices(i,u),r.addKernelDefHashes(i,l),r.endKernelCreateInfos(i)}}n.KernelCreateInfos=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSubGraphSessionState(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSubGraphSessionState(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}graphId(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}sessionState(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(i){i.startObject(2)}static addGraphId(i,u){i.addFieldOffset(0,u,0)}static addSessionState(i,u){i.addFieldOffset(1,u,0)}static endSubGraphSessionState(i){let u=i.endObject();return i.requiredField(u,4),u}static createSubGraphSessionState(i,u,l){return r.startSubGraphSessionState(i),r.addGraphId(i,u),r.addSessionState(i,l),r.endSubGraphSessionState(i)}}n.SubGraphSessionState=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSessionState(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSessionState(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}kernels(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}subGraphSessionStatesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startSessionState(i){i.startObject(2)}static addKernels(i,u){i.addFieldOffset(0,u,0)}static addSubGraphSessionStates(i,u){i.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startSubGraphSessionStatesVector(i,u){i.startVector(4,u,4)}static endSessionState(i){return i.endObject()}static createSessionState(i,u,l){return r.startSessionState(i),r.addKernels(i,u),r.addSubGraphSessionStates(i,l),r.endSessionState(i)}}n.SessionState=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsInferenceSession(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsInferenceSession(i,u){return i.setPosition(i.position()+S.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static bufferHasIdentifier(i){return i.__has_identifier("ORTM")}ortVersion(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}model(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(i){let u=this.bb.__offset(this.bb_pos,8);return u?(i||new t.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(i){i.startObject(3)}static addOrtVersion(i,u){i.addFieldOffset(0,u,0)}static addModel(i,u){i.addFieldOffset(1,u,0)}static addSessionState(i,u){i.addFieldOffset(2,u,0)}static endInferenceSession(i){return i.endObject()}static finishInferenceSessionBuffer(i,u){i.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(i,u){i.finish(u,"ORTM",!0)}static createInferenceSession(i,u,l,c){return r.startInferenceSession(i),r.addOrtVersion(i,u),r.addModel(i,l),r.addSessionState(i,c),r.endInferenceSession(i)}}n.InferenceSession=r})(o=e.fbs||={})})(a=t.experimental||={})})(H||={})});var Ws=ye((Cy,zs)=>{"use strict";zs.exports=qd;function qd(a,t){for(var o=new Array(arguments.length-1),e=0,r=2,n=!0;r<arguments.length;)o[e++]=arguments[r++];return new Promise(function(i,u){o[e]=function(c){if(n)if(n=!1,c)u(c);else{for(var p=new Array(arguments.length-1),b=0;b<p.length;)p[b++]=arguments[b];i.apply(null,p)}};try{a.apply(t||null,o)}catch(l){n&&(n=!1,u(l))}})}});var qs=ye(js=>{"use strict";var Zn=js;Zn.length=function(t){var o=t.length;if(!o)return 0;for(var e=0;--o%4>1&&t.charAt(o)==="=";)++e;return Math.ceil(t.length*3)/4-e};var Gr=new Array(64),Hs=new Array(123);for(It=0;It<64;)Hs[Gr[It]=It<26?It+65:It<52?It+71:It<62?It-4:It-59|43]=It++;var It;Zn.encode=function(t,o,e){for(var r=null,n=[],s=0,i=0,u;o<e;){var l=t[o++];switch(i){case 0:n[s++]=Gr[l>>2],u=(l&3)<<4,i=1;break;case 1:n[s++]=Gr[u|l>>4],u=(l&15)<<2,i=2;break;case 2:n[s++]=Gr[u|l>>6],n[s++]=Gr[l&63],i=0;break}s>8191&&((r||(r=[])).push(String.fromCharCode.apply(String,n)),s=0)}return i&&(n[s++]=Gr[u],n[s++]=61,i===1&&(n[s++]=61)),r?(s&&r.push(String.fromCharCode.apply(String,n.slice(0,s))),r.join("")):String.fromCharCode.apply(String,n.slice(0,s))};var Vs="invalid encoding";Zn.decode=function(t,o,e){for(var r=e,n=0,s,i=0;i<t.length;){var u=t.charCodeAt(i++);if(u===61&&n>1)break;if((u=Hs[u])===void 0)throw Error(Vs);switch(n){case 0:s=u,n=1;break;case 1:o[e++]=s<<2|(u&48)>>4,s=u,n=2;break;case 2:o[e++]=(s&15)<<4|(u&60)>>2,s=u,n=3;break;case 3:o[e++]=(s&3)<<6|u,n=0;break}}if(n===1)throw Error(Vs);return e-r};Zn.test=function(t){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)}});var Xs=ye((By,Ys)=>{"use strict";Ys.exports=Qn;function Qn(){this._listeners={}}Qn.prototype.on=function(t,o,e){return(this._listeners[t]||(this._listeners[t]=[])).push({fn:o,ctx:e||this}),this};Qn.prototype.off=function(t,o){if(t===void 0)this._listeners={};else if(o===void 0)this._listeners[t]=[];else for(var e=this._listeners[t],r=0;r<e.length;)e[r].fn===o?e.splice(r,1):++r;return this};Qn.prototype.emit=function(t){var o=this._listeners[t];if(o){for(var e=[],r=1;r<arguments.length;)e.push(arguments[r++]);for(r=0;r<o.length;)o[r].fn.apply(o[r++].ctx,e)}return this}});var ru=ye(($y,tu)=>{"use strict";tu.exports=Ks(Ks);function Ks(a){return typeof Float32Array<"u"?function(){var t=new Float32Array([-0]),o=new Uint8Array(t.buffer),e=o[3]===128;function r(u,l,c){t[0]=u,l[c]=o[0],l[c+1]=o[1],l[c+2]=o[2],l[c+3]=o[3]}function n(u,l,c){t[0]=u,l[c]=o[3],l[c+1]=o[2],l[c+2]=o[1],l[c+3]=o[0]}a.writeFloatLE=e?r:n,a.writeFloatBE=e?n:r;function s(u,l){return o[0]=u[l],o[1]=u[l+1],o[2]=u[l+2],o[3]=u[l+3],t[0]}function i(u,l){return o[3]=u[l],o[2]=u[l+1],o[1]=u[l+2],o[0]=u[l+3],t[0]}a.readFloatLE=e?s:i,a.readFloatBE=e?i:s}():function(){function t(e,r,n,s){var i=r<0?1:0;if(i&&(r=-r),r===0)e(1/r>0?0:2147483648,n,s);else if(isNaN(r))e(2143289344,n,s);else if(r>34028234663852886e22)e((i<<31|2139095040)>>>0,n,s);else if(r<11754943508222875e-54)e((i<<31|Math.round(r/1401298464324817e-60))>>>0,n,s);else{var u=Math.floor(Math.log(r)/Math.LN2),l=Math.round(r*Math.pow(2,-u)*8388608)&8388607;e((i<<31|u+127<<23|l)>>>0,n,s)}}a.writeFloatLE=t.bind(null,Js),a.writeFloatBE=t.bind(null,Zs);function o(e,r,n){var s=e(r,n),i=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:i*(1/0):u===0?i*1401298464324817e-60*l:i*Math.pow(2,u-150)*(l+8388608)}a.readFloatLE=o.bind(null,Qs),a.readFloatBE=o.bind(null,eu)}(),typeof Float64Array<"u"?function(){var t=new Float64Array([-0]),o=new Uint8Array(t.buffer),e=o[7]===128;function r(u,l,c){t[0]=u,l[c]=o[0],l[c+1]=o[1],l[c+2]=o[2],l[c+3]=o[3],l[c+4]=o[4],l[c+5]=o[5],l[c+6]=o[6],l[c+7]=o[7]}function n(u,l,c){t[0]=u,l[c]=o[7],l[c+1]=o[6],l[c+2]=o[5],l[c+3]=o[4],l[c+4]=o[3],l[c+5]=o[2],l[c+6]=o[1],l[c+7]=o[0]}a.writeDoubleLE=e?r:n,a.writeDoubleBE=e?n:r;function s(u,l){return o[0]=u[l],o[1]=u[l+1],o[2]=u[l+2],o[3]=u[l+3],o[4]=u[l+4],o[5]=u[l+5],o[6]=u[l+6],o[7]=u[l+7],t[0]}function i(u,l){return o[7]=u[l],o[6]=u[l+1],o[5]=u[l+2],o[4]=u[l+3],o[3]=u[l+4],o[2]=u[l+5],o[1]=u[l+6],o[0]=u[l+7],t[0]}a.readDoubleLE=e?s:i,a.readDoubleBE=e?i:s}():function(){function t(e,r,n,s,i,u){var l=s<0?1:0;if(l&&(s=-s),s===0)e(0,i,u+r),e(1/s>0?0:2147483648,i,u+n);else if(isNaN(s))e(0,i,u+r),e(2146959360,i,u+n);else if(s>17976931348623157e292)e(0,i,u+r),e((l<<31|2146435072)>>>0,i,u+n);else{var c;if(s<22250738585072014e-324)c=s/5e-324,e(c>>>0,i,u+r),e((l<<31|c/4294967296)>>>0,i,u+n);else{var p=Math.floor(Math.log(s)/Math.LN2);p===1024&&(p=1023),c=s*Math.pow(2,-p),e(c*4503599627370496>>>0,i,u+r),e((l<<31|p+1023<<20|c*1048576&1048575)>>>0,i,u+n)}}}a.writeDoubleLE=t.bind(null,Js,0,4),a.writeDoubleBE=t.bind(null,Zs,4,0);function o(e,r,n,s,i){var u=e(s,i+r),l=e(s,i+n),c=(l>>31)*2+1,p=l>>>20&2047,b=4294967296*(l&1048575)+u;return p===2047?b?NaN:c*(1/0):p===0?c*5e-324*b:c*Math.pow(2,p-1075)*(b+4503599627370496)}a.readDoubleLE=o.bind(null,Qs,0,4),a.readDoubleBE=o.bind(null,eu,4,0)}(),a}function Js(a,t,o){t[o]=a&255,t[o+1]=a>>>8&255,t[o+2]=a>>>16&255,t[o+3]=a>>>24}function Zs(a,t,o){t[o]=a>>>24,t[o+1]=a>>>16&255,t[o+2]=a>>>8&255,t[o+3]=a&255}function Qs(a,t){return(a[t]|a[t+1]<<8|a[t+2]<<16|a[t+3]<<24)>>>0}function eu(a,t){return(a[t]<<24|a[t+1]<<16|a[t+2]<<8|a[t+3])>>>0}});var nu=ye((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(a){}return null}});var iu=ye(ou=>{"use strict";var si=ou;si.length=function(t){for(var o=0,e=0,r=0;r<t.length;++r)e=t.charCodeAt(r),e<128?o+=1:e<2048?o+=2:(e&64512)===55296&&(t.charCodeAt(r+1)&64512)===56320?(++r,o+=4):o+=3;return o};si.read=function(t,o,e){var r=e-o;if(r<1)return"";for(var n=null,s=[],i=0,u;o<e;)u=t[o++],u<128?s[i++]=u:u>191&&u<224?s[i++]=(u&31)<<6|t[o++]&63:u>239&&u<365?(u=((u&7)<<18|(t[o++]&63)<<12|(t[o++]&63)<<6|t[o++]&63)-65536,s[i++]=55296+(u>>10),s[i++]=56320+(u&1023)):s[i++]=(u&15)<<12|(t[o++]&63)<<6|t[o++]&63,i>8191&&((n||(n=[])).push(String.fromCharCode.apply(String,s)),i=0);return n?(i&&n.push(String.fromCharCode.apply(String,s.slice(0,i))),n.join("")):String.fromCharCode.apply(String,s.slice(0,i))};si.write=function(t,o,e){for(var r=e,n,s,i=0;i<t.length;++i)n=t.charCodeAt(i),n<128?o[e++]=n:n<2048?(o[e++]=n>>6|192,o[e++]=n&63|128):(n&64512)===55296&&((s=t.charCodeAt(i+1))&64512)===56320?(n=65536+((n&1023)<<10)+(s&1023),++i,o[e++]=n>>18|240,o[e++]=n>>12&63|128,o[e++]=n>>6&63|128,o[e++]=n&63|128):(o[e++]=n>>12|224,o[e++]=n>>6&63|128,o[e++]=n&63|128);return e-r}});var su=ye((Ny,au)=>{"use strict";au.exports=Yd;function Yd(a,t,o){var e=o||8192,r=e>>>1,n=null,s=e;return function(u){if(u<1||u>r)return a(u);s+u>e&&(n=a(e),s=0);var l=t.call(n,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var lu=ye((Ry,uu)=>{"use strict";uu.exports=Re;var fn=er();function Re(a,t){this.lo=a>>>0,this.hi=t>>>0}var Tr=Re.zero=new Re(0,0);Tr.toNumber=function(){return 0};Tr.zzEncode=Tr.zzDecode=function(){return this};Tr.length=function(){return 1};var Xd=Re.zeroHash="\0\0\0\0\0\0\0\0";Re.fromNumber=function(t){if(t===0)return Tr;var o=t<0;o&&(t=-t);var e=t>>>0,r=(t-e)/4294967296>>>0;return o&&(r=~r>>>0,e=~e>>>0,++e>4294967295&&(e=0,++r>4294967295&&(r=0))),new Re(e,r)};Re.from=function(t){if(typeof t=="number")return Re.fromNumber(t);if(fn.isString(t))if(fn.Long)t=fn.Long.fromString(t);else return Re.fromNumber(parseInt(t,10));return t.low||t.high?new Re(t.low>>>0,t.high>>>0):Tr};Re.prototype.toNumber=function(t){if(!t&&this.hi>>>31){var o=~this.lo+1>>>0,e=~this.hi>>>0;return o||(e=e+1>>>0),-(o+e*4294967296)}return this.lo+this.hi*4294967296};Re.prototype.toLong=function(t){return fn.Long?new fn.Long(this.lo|0,this.hi|0,!!t):{low:this.lo|0,high:this.hi|0,unsigned:!!t}};var Qt=String.prototype.charCodeAt;Re.fromHash=function(t){return t===Xd?Tr:new Re((Qt.call(t,0)|Qt.call(t,1)<<8|Qt.call(t,2)<<16|Qt.call(t,3)<<24)>>>0,(Qt.call(t,4)|Qt.call(t,5)<<8|Qt.call(t,6)<<16|Qt.call(t,7)<<24)>>>0)};Re.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Re.prototype.zzEncode=function(){var t=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^t)>>>0,this.lo=(this.lo<<1^t)>>>0,this};Re.prototype.zzDecode=function(){var t=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^t)>>>0,this.hi=(this.hi>>>1^t)>>>0,this};Re.prototype.length=function(){var t=this.lo,o=(this.lo>>>28|this.hi<<4)>>>0,e=this.hi>>>24;return e===0?o===0?t<16384?t<128?1:2:t<2097152?3:4:o<16384?o<128?5:6:o<2097152?7:8:e<128?9:10}});var er=ye(ui=>{"use strict";var q=ui;q.asPromise=Ws();q.base64=qs();q.EventEmitter=Xs();q.float=ru();q.inquire=nu();q.utf8=iu();q.pool=su();q.LongBits=lu();q.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);q.global=q.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||ui;q.emptyArray=Object.freeze?Object.freeze([]):[];q.emptyObject=Object.freeze?Object.freeze({}):{};q.isInteger=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};q.isString=function(t){return typeof t=="string"||t instanceof String};q.isObject=function(t){return t&&typeof t=="object"};q.isset=q.isSet=function(t,o){var e=t[o];return e!=null&&t.hasOwnProperty(o)?typeof e!="object"||(Array.isArray(e)?e.length:Object.keys(e).length)>0:!1};q.Buffer=function(){try{var a=q.inquire("buffer").Buffer;return a.prototype.utf8Write?a:null}catch{return null}}();q._Buffer_from=null;q._Buffer_allocUnsafe=null;q.newBuffer=function(t){return typeof t=="number"?q.Buffer?q._Buffer_allocUnsafe(t):new q.Array(t):q.Buffer?q._Buffer_from(t):typeof Uint8Array>"u"?t:new Uint8Array(t)};q.Array=typeof Uint8Array<"u"?Uint8Array:Array;q.Long=q.global.dcodeIO&&q.global.dcodeIO.Long||q.global.Long||q.inquire("long");q.key2Re=/^true|false|0|1$/;q.key32Re=/^-?(?:0|[1-9][0-9]*)$/;q.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;q.longToHash=function(t){return t?q.LongBits.from(t).toHash():q.LongBits.zeroHash};q.longFromHash=function(t,o){var e=q.LongBits.fromHash(t);return q.Long?q.Long.fromBits(e.lo,e.hi,o):e.toNumber(!!o)};function fu(a,t,o){for(var e=Object.keys(t),r=0;r<e.length;++r)(a[e[r]]===void 0||!o)&&(a[e[r]]=t[e[r]]);return a}q.merge=fu;q.lcFirst=function(t){return t.charAt(0).toLowerCase()+t.substring(1)};function cu(a){function t(o,e){if(!(this instanceof t))return new t(o,e);Object.defineProperty(this,"message",{get:function(){return o}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:new Error().stack||""}),e&&fu(this,e)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return a},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}q.newError=cu;q.ProtocolError=cu("ProtocolError");q.oneOfGetter=function(t){for(var o={},e=0;e<t.length;++e)o[t[e]]=1;return function(){for(var r=Object.keys(this),n=r.length-1;n>-1;--n)if(o[r[n]]===1&&this[r[n]]!==void 0&&this[r[n]]!==null)return r[n]}};q.oneOfSetter=function(t){return function(o){for(var e=0;e<t.length;++e)t[e]!==o&&delete this[t[e]]}};q.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};q._configure=function(){var a=q.Buffer;if(!a){q._Buffer_from=q._Buffer_allocUnsafe=null;return}q._Buffer_from=a.from!==Uint8Array.from&&a.from||function(o,e){return new a(o,e)},q._Buffer_allocUnsafe=a.allocUnsafe||function(o){return new a(o)}}});var mi=ye((Gy,mu)=>{"use strict";mu.exports=se;var mt=er(),li,eo=mt.LongBits,pu=mt.base64,du=mt.utf8;function cn(a,t,o){this.fn=a,this.len=t,this.next=void 0,this.val=o}function ci(){}function Kd(a){this.head=a.head,this.tail=a.tail,this.len=a.len,this.next=a.states}function se(){this.len=0,this.head=new cn(ci,0,0),this.tail=this.head,this.states=null}var hu=function(){return mt.Buffer?function(){return(se.create=function(){return new li})()}:function(){return new se}};se.create=hu();se.alloc=function(t){return new mt.Array(t)};mt.Array!==Array&&(se.alloc=mt.pool(se.alloc,mt.Array.prototype.subarray));se.prototype._push=function(t,o,e){return this.tail=this.tail.next=new cn(t,o,e),this.len+=o,this};function pi(a,t,o){t[o]=a&255}function Jd(a,t,o){for(;a>127;)t[o++]=a&127|128,a>>>=7;t[o]=a}function di(a,t){this.len=a,this.next=void 0,this.val=t}di.prototype=Object.create(cn.prototype);di.prototype.fn=Jd;se.prototype.uint32=function(t){return this.len+=(this.tail=this.tail.next=new di((t=t>>>0)<128?1:t<16384?2:t<2097152?3:t<268435456?4:5,t)).len,this};se.prototype.int32=function(t){return t<0?this._push(hi,10,eo.fromNumber(t)):this.uint32(t)};se.prototype.sint32=function(t){return this.uint32((t<<1^t>>31)>>>0)};function hi(a,t,o){for(;a.hi;)t[o++]=a.lo&127|128,a.lo=(a.lo>>>7|a.hi<<25)>>>0,a.hi>>>=7;for(;a.lo>127;)t[o++]=a.lo&127|128,a.lo=a.lo>>>7;t[o++]=a.lo}se.prototype.uint64=function(t){var o=eo.from(t);return this._push(hi,o.length(),o)};se.prototype.int64=se.prototype.uint64;se.prototype.sint64=function(t){var o=eo.from(t).zzEncode();return this._push(hi,o.length(),o)};se.prototype.bool=function(t){return this._push(pi,1,t?1:0)};function fi(a,t,o){t[o]=a&255,t[o+1]=a>>>8&255,t[o+2]=a>>>16&255,t[o+3]=a>>>24}se.prototype.fixed32=function(t){return this._push(fi,4,t>>>0)};se.prototype.sfixed32=se.prototype.fixed32;se.prototype.fixed64=function(t){var o=eo.from(t);return this._push(fi,4,o.lo)._push(fi,4,o.hi)};se.prototype.sfixed64=se.prototype.fixed64;se.prototype.float=function(t){return this._push(mt.float.writeFloatLE,4,t)};se.prototype.double=function(t){return this._push(mt.float.writeDoubleLE,8,t)};var Zd=mt.Array.prototype.set?function(t,o,e){o.set(t,e)}:function(t,o,e){for(var r=0;r<t.length;++r)o[e+r]=t[r]};se.prototype.bytes=function(t){var o=t.length>>>0;if(!o)return this._push(pi,1,0);if(mt.isString(t)){var e=se.alloc(o=pu.length(t));pu.decode(t,e,0),t=e}return this.uint32(o)._push(Zd,o,t)};se.prototype.string=function(t){var o=du.length(t);return o?this.uint32(o)._push(du.write,o,t):this._push(pi,1,0)};se.prototype.fork=function(){return this.states=new Kd(this),this.head=this.tail=new cn(ci,0,0),this.len=0,this};se.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new cn(ci,0,0),this.len=0),this};se.prototype.ldelim=function(){var t=this.head,o=this.tail,e=this.len;return this.reset().uint32(e),e&&(this.tail.next=t.next,this.tail=o,this.len+=e),this};se.prototype.finish=function(){for(var t=this.head.next,o=this.constructor.alloc(this.len),e=0;t;)t.fn(t.val,o,e),e+=t.len,t=t.next;return o};se._configure=function(a){li=a,se.create=hu(),li._configure()}});var yu=ye((Uy,gu)=>{"use strict";gu.exports=kt;var bu=mi();(kt.prototype=Object.create(bu.prototype)).constructor=kt;var tr=er();function kt(){bu.call(this)}kt._configure=function(){kt.alloc=tr._Buffer_allocUnsafe,kt.writeBytesBuffer=tr.Buffer&&tr.Buffer.prototype instanceof Uint8Array&&tr.Buffer.prototype.set.name==="set"?function(t,o,e){o.set(t,e)}:function(t,o,e){if(t.copy)t.copy(o,e,0,t.length);else for(var r=0;r<t.length;)o[e++]=t[r++]}};kt.prototype.bytes=function(t){tr.isString(t)&&(t=tr._Buffer_from(t,"base64"));var o=t.length>>>0;return this.uint32(o),o&&this._push(kt.writeBytesBuffer,o,t),this};function Qd(a,t,o){a.length<40?tr.utf8.write(a,t,o):t.utf8Write?t.utf8Write(a,o):t.write(a,o)}kt.prototype.string=function(t){var o=tr.Buffer.byteLength(t);return this.uint32(o),o&&this._push(Qd,o,t),this};kt._configure()});var yi=ye((zy,_u)=>{"use strict";_u.exports=De;var Nt=er(),gi,wu=Nt.LongBits,eh=Nt.utf8;function At(a,t){return RangeError("index out of range: "+a.pos+" + "+(t||1)+" > "+a.len)}function De(a){this.buf=a,this.pos=0,this.len=a.length}var Tu=typeof Uint8Array<"u"?function(t){if(t instanceof Uint8Array||Array.isArray(t))return new De(t);throw Error("illegal buffer")}:function(t){if(Array.isArray(t))return new De(t);throw Error("illegal buffer")},vu=function(){return Nt.Buffer?function(o){return(De.create=function(r){return Nt.Buffer.isBuffer(r)?new gi(r):Tu(r)})(o)}:Tu};De.create=vu();De.prototype._slice=Nt.Array.prototype.subarray||Nt.Array.prototype.slice;De.prototype.uint32=function(){var t=4294967295;return function(){if(t=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(t=(t|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return t;if((this.pos+=5)>this.len)throw this.pos=this.len,At(this,10);return t}}();De.prototype.int32=function(){return this.uint32()|0};De.prototype.sint32=function(){var t=this.uint32();return t>>>1^-(t&1)|0};function bi(){var a=new wu(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(a.lo=(a.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return a;if(a.lo=(a.lo|(this.buf[this.pos]&127)<<28)>>>0,a.hi=(a.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return a;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw At(this);if(a.lo=(a.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return a}return a.lo=(a.lo|(this.buf[this.pos++]&127)<<t*7)>>>0,a}if(this.len-this.pos>4){for(;t<5;++t)if(a.hi=(a.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return a}else for(;t<5;++t){if(this.pos>=this.len)throw At(this);if(a.hi=(a.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return a}throw Error("invalid varint encoding")}De.prototype.bool=function(){return this.uint32()!==0};function to(a,t){return(a[t-4]|a[t-3]<<8|a[t-2]<<16|a[t-1]<<24)>>>0}De.prototype.fixed32=function(){if(this.pos+4>this.len)throw At(this,4);return to(this.buf,this.pos+=4)};De.prototype.sfixed32=function(){if(this.pos+4>this.len)throw At(this,4);return to(this.buf,this.pos+=4)|0};function xu(){if(this.pos+8>this.len)throw At(this,8);return new wu(to(this.buf,this.pos+=4),to(this.buf,this.pos+=4))}De.prototype.float=function(){if(this.pos+4>this.len)throw At(this,4);var t=Nt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,t};De.prototype.double=function(){if(this.pos+8>this.len)throw At(this,4);var t=Nt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,t};De.prototype.bytes=function(){var t=this.uint32(),o=this.pos,e=this.pos+t;if(e>this.len)throw At(this,t);return this.pos+=t,Array.isArray(this.buf)?this.buf.slice(o,e):o===e?new this.buf.constructor(0):this._slice.call(this.buf,o,e)};De.prototype.string=function(){var t=this.bytes();return eh.read(t,0,t.length)};De.prototype.skip=function(t){if(typeof t=="number"){if(this.pos+t>this.len)throw At(this,t);this.pos+=t}else do if(this.pos>=this.len)throw At(this);while(this.buf[this.pos++]&128);return this};De.prototype.skipType=function(a){switch(a){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(a=this.uint32()&7)!==4;)this.skipType(a);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+a+" at offset "+this.pos)}return this};De._configure=function(a){gi=a,De.create=vu(),gi._configure();var t=Nt.Long?"toLong":"toNumber";Nt.merge(De.prototype,{int64:function(){return bi.call(this)[t](!1)},uint64:function(){return bi.call(this)[t](!0)},sint64:function(){return bi.call(this).zzDecode()[t](!1)},fixed64:function(){return xu.call(this)[t](!0)},sfixed64:function(){return xu.call(this)[t](!1)}})}});var Au=ye((Wy,Iu)=>{"use strict";Iu.exports=xr;var Su=yi();(xr.prototype=Object.create(Su.prototype)).constructor=xr;var Ou=er();function xr(a){Su.call(this,a)}xr._configure=function(){Ou.Buffer&&(xr.prototype._slice=Ou.Buffer.prototype.slice)};xr.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};xr._configure()});var Pu=ye((Vy,Eu)=>{"use strict";Eu.exports=pn;var Ti=er();(pn.prototype=Object.create(Ti.EventEmitter.prototype)).constructor=pn;function pn(a,t,o){if(typeof a!="function")throw TypeError("rpcImpl must be a function");Ti.EventEmitter.call(this),this.rpcImpl=a,this.requestDelimited=!!t,this.responseDelimited=!!o}pn.prototype.rpcCall=function a(t,o,e,r,n){if(!r)throw TypeError("request must be specified");var s=this;if(!n)return Ti.asPromise(a,s,t,o,e,r);if(!s.rpcImpl){setTimeout(function(){n(Error("already ended"))},0);return}try{return s.rpcImpl(t,o[s.requestDelimited?"encodeDelimited":"encode"](r).finish(),function(u,l){if(u)return s.emit("error",u,t),n(u);if(l===null){s.end(!0);return}if(!(l instanceof e))try{l=e[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return s.emit("error",c,t),n(c)}return s.emit("data",l,t),n(null,l)})}catch(i){s.emit("error",i,t),setTimeout(function(){n(i)},0);return}};pn.prototype.end=function(t){return this.rpcImpl&&(t||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Lu=ye(Du=>{"use strict";var th=Du;th.Service=Pu()});var Fu=ye((jy,Cu)=>{"use strict";Cu.exports={}});var ku=ye($u=>{"use strict";var nt=$u;nt.build="minimal";nt.Writer=mi();nt.BufferWriter=yu();nt.Reader=yi();nt.BufferReader=Au();nt.util=er();nt.rpc=Lu();nt.roots=Fu();nt.configure=Bu;function Bu(){nt.util._configure(),nt.Writer._configure(nt.BufferWriter),nt.Reader._configure(nt.BufferReader)}Bu()});var Ru=ye((Yy,Nu)=>{"use strict";Nu.exports=ku()});var Ur=ye((Xy,Mu)=>{"use strict";var xe=Ru(),R=xe.Reader,Le=xe.Writer,y=xe.util,m=xe.roots.default||(xe.roots.default={});m.onnx=function(){var a={};return a.Version=function(){var t={},o=Object.create(t);return o[t[0]="_START_VERSION"]=0,o[t[1]="IR_VERSION_2017_10_10"]=1,o[t[2]="IR_VERSION_2017_10_30"]=2,o[t[3]="IR_VERSION_2017_11_3"]=3,o[t[4]="IR_VERSION_2019_1_22"]=4,o[t[5]="IR_VERSION_2019_3_18"]=5,o[t[6]="IR_VERSION_2019_9_19"]=6,o[t[7]="IR_VERSION_2020_5_8"]=7,o[t[8]="IR_VERSION_2021_7_30"]=8,o[t[9]="IR_VERSION"]=9,o}(),a.AttributeProto=function(){function t(o){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.refAttrName="",t.prototype.docString="",t.prototype.type=0,t.prototype.f=0,t.prototype.i=y.Long?y.Long.fromBits(0,0,!1):0,t.prototype.s=y.newBuffer([]),t.prototype.t=null,t.prototype.g=null,t.prototype.sparseTensor=null,t.prototype.tp=null,t.prototype.floats=y.emptyArray,t.prototype.ints=y.emptyArray,t.prototype.strings=y.emptyArray,t.prototype.tensors=y.emptyArray,t.prototype.graphs=y.emptyArray,t.prototype.sparseTensors=y.emptyArray,t.prototype.typeProtos=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.f!=null&&Object.hasOwnProperty.call(e,"f")&&r.uint32(21).float(e.f),e.i!=null&&Object.hasOwnProperty.call(e,"i")&&r.uint32(24).int64(e.i),e.s!=null&&Object.hasOwnProperty.call(e,"s")&&r.uint32(34).bytes(e.s),e.t!=null&&Object.hasOwnProperty.call(e,"t")&&m.onnx.TensorProto.encode(e.t,r.uint32(42).fork()).ldelim(),e.g!=null&&Object.hasOwnProperty.call(e,"g")&&m.onnx.GraphProto.encode(e.g,r.uint32(50).fork()).ldelim(),e.floats!=null&&e.floats.length){r.uint32(58).fork();for(var n=0;n<e.floats.length;++n)r.float(e.floats[n]);r.ldelim()}if(e.ints!=null&&e.ints.length){r.uint32(66).fork();for(var n=0;n<e.ints.length;++n)r.int64(e.ints[n]);r.ldelim()}if(e.strings!=null&&e.strings.length)for(var n=0;n<e.strings.length;++n)r.uint32(74).bytes(e.strings[n]);if(e.tensors!=null&&e.tensors.length)for(var n=0;n<e.tensors.length;++n)m.onnx.TensorProto.encode(e.tensors[n],r.uint32(82).fork()).ldelim();if(e.graphs!=null&&e.graphs.length)for(var n=0;n<e.graphs.length;++n)m.onnx.GraphProto.encode(e.graphs[n],r.uint32(90).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(106).string(e.docString),e.tp!=null&&Object.hasOwnProperty.call(e,"tp")&&m.onnx.TypeProto.encode(e.tp,r.uint32(114).fork()).ldelim(),e.typeProtos!=null&&e.typeProtos.length)for(var n=0;n<e.typeProtos.length;++n)m.onnx.TypeProto.encode(e.typeProtos[n],r.uint32(122).fork()).ldelim();if(e.type!=null&&Object.hasOwnProperty.call(e,"type")&&r.uint32(160).int32(e.type),e.refAttrName!=null&&Object.hasOwnProperty.call(e,"refAttrName")&&r.uint32(170).string(e.refAttrName),e.sparseTensor!=null&&Object.hasOwnProperty.call(e,"sparseTensor")&&m.onnx.SparseTensorProto.encode(e.sparseTensor,r.uint32(178).fork()).ldelim(),e.sparseTensors!=null&&e.sparseTensors.length)for(var n=0;n<e.sparseTensors.length;++n)m.onnx.SparseTensorProto.encode(e.sparseTensors[n],r.uint32(186).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.AttributeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 21:{s.refAttrName=e.string();break}case 13:{s.docString=e.string();break}case 20:{s.type=e.int32();break}case 2:{s.f=e.float();break}case 3:{s.i=e.int64();break}case 4:{s.s=e.bytes();break}case 5:{s.t=m.onnx.TensorProto.decode(e,e.uint32());break}case 6:{s.g=m.onnx.GraphProto.decode(e,e.uint32());break}case 22:{s.sparseTensor=m.onnx.SparseTensorProto.decode(e,e.uint32());break}case 14:{s.tp=m.onnx.TypeProto.decode(e,e.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.floats.push(e.float());else s.floats.push(e.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.ints.push(e.int64());else s.ints.push(e.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(e.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(m.onnx.TensorProto.decode(e,e.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(m.onnx.GraphProto.decode(e,e.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(m.onnx.SparseTensorProto.decode(e,e.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(m.onnx.TypeProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.refAttrName!=null&&e.hasOwnProperty("refAttrName")&&!y.isString(e.refAttrName))return"refAttrName: string expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString))return"docString: string expected";if(e.type!=null&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(e.f!=null&&e.hasOwnProperty("f")&&typeof e.f!="number")return"f: number expected";if(e.i!=null&&e.hasOwnProperty("i")&&!y.isInteger(e.i)&&!(e.i&&y.isInteger(e.i.low)&&y.isInteger(e.i.high)))return"i: integer|Long expected";if(e.s!=null&&e.hasOwnProperty("s")&&!(e.s&&typeof e.s.length=="number"||y.isString(e.s)))return"s: buffer expected";if(e.t!=null&&e.hasOwnProperty("t")){var r=m.onnx.TensorProto.verify(e.t);if(r)return"t."+r}if(e.g!=null&&e.hasOwnProperty("g")){var r=m.onnx.GraphProto.verify(e.g);if(r)return"g."+r}if(e.sparseTensor!=null&&e.hasOwnProperty("sparseTensor")){var r=m.onnx.SparseTensorProto.verify(e.sparseTensor);if(r)return"sparseTensor."+r}if(e.tp!=null&&e.hasOwnProperty("tp")){var r=m.onnx.TypeProto.verify(e.tp);if(r)return"tp."+r}if(e.floats!=null&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var n=0;n<e.floats.length;++n)if(typeof e.floats[n]!="number")return"floats: number[] expected"}if(e.ints!=null&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var n=0;n<e.ints.length;++n)if(!y.isInteger(e.ints[n])&&!(e.ints[n]&&y.isInteger(e.ints[n].low)&&y.isInteger(e.ints[n].high)))return"ints: integer|Long[] expected"}if(e.strings!=null&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var n=0;n<e.strings.length;++n)if(!(e.strings[n]&&typeof e.strings[n].length=="number"||y.isString(e.strings[n])))return"strings: buffer[] expected"}if(e.tensors!=null&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var n=0;n<e.tensors.length;++n){var r=m.onnx.TensorProto.verify(e.tensors[n]);if(r)return"tensors."+r}}if(e.graphs!=null&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var n=0;n<e.graphs.length;++n){var r=m.onnx.GraphProto.verify(e.graphs[n]);if(r)return"graphs."+r}}if(e.sparseTensors!=null&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var n=0;n<e.sparseTensors.length;++n){var r=m.onnx.SparseTensorProto.verify(e.sparseTensors[n]);if(r)return"sparseTensors."+r}}if(e.typeProtos!=null&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var n=0;n<e.typeProtos.length;++n){var r=m.onnx.TypeProto.verify(e.typeProtos[n]);if(r)return"typeProtos."+r}}return null},t.fromObject=function(e){if(e instanceof m.onnx.AttributeProto)return e;var r=new m.onnx.AttributeProto;switch(e.name!=null&&(r.name=String(e.name)),e.refAttrName!=null&&(r.refAttrName=String(e.refAttrName)),e.docString!=null&&(r.docString=String(e.docString)),e.type){default:if(typeof e.type=="number"){r.type=e.type;break}break;case"UNDEFINED":case 0:r.type=0;break;case"FLOAT":case 1:r.type=1;break;case"INT":case 2:r.type=2;break;case"STRING":case 3:r.type=3;break;case"TENSOR":case 4:r.type=4;break;case"GRAPH":case 5:r.type=5;break;case"SPARSE_TENSOR":case 11:r.type=11;break;case"TYPE_PROTO":case 13:r.type=13;break;case"FLOATS":case 6:r.type=6;break;case"INTS":case 7:r.type=7;break;case"STRINGS":case 8:r.type=8;break;case"TENSORS":case 9:r.type=9;break;case"GRAPHS":case 10:r.type=10;break;case"SPARSE_TENSORS":case 12:r.type=12;break;case"TYPE_PROTOS":case 14:r.type=14;break}if(e.f!=null&&(r.f=Number(e.f)),e.i!=null&&(y.Long?(r.i=y.Long.fromValue(e.i)).unsigned=!1:typeof e.i=="string"?r.i=parseInt(e.i,10):typeof e.i=="number"?r.i=e.i:typeof e.i=="object"&&(r.i=new y.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),e.s!=null&&(typeof e.s=="string"?y.base64.decode(e.s,r.s=y.newBuffer(y.base64.length(e.s)),0):e.s.length>=0&&(r.s=e.s)),e.t!=null){if(typeof e.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");r.t=m.onnx.TensorProto.fromObject(e.t)}if(e.g!=null){if(typeof e.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");r.g=m.onnx.GraphProto.fromObject(e.g)}if(e.sparseTensor!=null){if(typeof e.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");r.sparseTensor=m.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(e.tp!=null){if(typeof e.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");r.tp=m.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");r.floats=[];for(var n=0;n<e.floats.length;++n)r.floats[n]=Number(e.floats[n])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");r.ints=[];for(var n=0;n<e.ints.length;++n)y.Long?(r.ints[n]=y.Long.fromValue(e.ints[n])).unsigned=!1:typeof e.ints[n]=="string"?r.ints[n]=parseInt(e.ints[n],10):typeof e.ints[n]=="number"?r.ints[n]=e.ints[n]:typeof e.ints[n]=="object"&&(r.ints[n]=new y.LongBits(e.ints[n].low>>>0,e.ints[n].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");r.strings=[];for(var n=0;n<e.strings.length;++n)typeof e.strings[n]=="string"?y.base64.decode(e.strings[n],r.strings[n]=y.newBuffer(y.base64.length(e.strings[n])),0):e.strings[n].length>=0&&(r.strings[n]=e.strings[n])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");r.tensors=[];for(var n=0;n<e.tensors.length;++n){if(typeof e.tensors[n]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");r.tensors[n]=m.onnx.TensorProto.fromObject(e.tensors[n])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");r.graphs=[];for(var n=0;n<e.graphs.length;++n){if(typeof e.graphs[n]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");r.graphs[n]=m.onnx.GraphProto.fromObject(e.graphs[n])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");r.sparseTensors=[];for(var n=0;n<e.sparseTensors.length;++n){if(typeof e.sparseTensors[n]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");r.sparseTensors[n]=m.onnx.SparseTensorProto.fromObject(e.sparseTensors[n])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");r.typeProtos=[];for(var n=0;n<e.typeProtos.length;++n){if(typeof e.typeProtos[n]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");r.typeProtos[n]=m.onnx.TypeProto.fromObject(e.typeProtos[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.floats=[],n.ints=[],n.strings=[],n.tensors=[],n.graphs=[],n.typeProtos=[],n.sparseTensors=[]),r.defaults){if(n.name="",n.f=0,y.Long){var s=new y.Long(0,0,!1);n.i=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.i=r.longs===String?"0":0;r.bytes===String?n.s="":(n.s=[],r.bytes!==Array&&(n.s=y.newBuffer(n.s))),n.t=null,n.g=null,n.docString="",n.tp=null,n.type=r.enums===String?"UNDEFINED":0,n.refAttrName="",n.sparseTensor=null}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.f!=null&&e.hasOwnProperty("f")&&(n.f=r.json&&!isFinite(e.f)?String(e.f):e.f),e.i!=null&&e.hasOwnProperty("i")&&(typeof e.i=="number"?n.i=r.longs===String?String(e.i):e.i:n.i=r.longs===String?y.Long.prototype.toString.call(e.i):r.longs===Number?new y.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),e.s!=null&&e.hasOwnProperty("s")&&(n.s=r.bytes===String?y.base64.encode(e.s,0,e.s.length):r.bytes===Array?Array.prototype.slice.call(e.s):e.s),e.t!=null&&e.hasOwnProperty("t")&&(n.t=m.onnx.TensorProto.toObject(e.t,r)),e.g!=null&&e.hasOwnProperty("g")&&(n.g=m.onnx.GraphProto.toObject(e.g,r)),e.floats&&e.floats.length){n.floats=[];for(var i=0;i<e.floats.length;++i)n.floats[i]=r.json&&!isFinite(e.floats[i])?String(e.floats[i]):e.floats[i]}if(e.ints&&e.ints.length){n.ints=[];for(var i=0;i<e.ints.length;++i)typeof e.ints[i]=="number"?n.ints[i]=r.longs===String?String(e.ints[i]):e.ints[i]:n.ints[i]=r.longs===String?y.Long.prototype.toString.call(e.ints[i]):r.longs===Number?new y.LongBits(e.ints[i].low>>>0,e.ints[i].high>>>0).toNumber():e.ints[i]}if(e.strings&&e.strings.length){n.strings=[];for(var i=0;i<e.strings.length;++i)n.strings[i]=r.bytes===String?y.base64.encode(e.strings[i],0,e.strings[i].length):r.bytes===Array?Array.prototype.slice.call(e.strings[i]):e.strings[i]}if(e.tensors&&e.tensors.length){n.tensors=[];for(var i=0;i<e.tensors.length;++i)n.tensors[i]=m.onnx.TensorProto.toObject(e.tensors[i],r)}if(e.graphs&&e.graphs.length){n.graphs=[];for(var i=0;i<e.graphs.length;++i)n.graphs[i]=m.onnx.GraphProto.toObject(e.graphs[i],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.tp!=null&&e.hasOwnProperty("tp")&&(n.tp=m.onnx.TypeProto.toObject(e.tp,r)),e.typeProtos&&e.typeProtos.length){n.typeProtos=[];for(var i=0;i<e.typeProtos.length;++i)n.typeProtos[i]=m.onnx.TypeProto.toObject(e.typeProtos[i],r)}if(e.type!=null&&e.hasOwnProperty("type")&&(n.type=r.enums===String?m.onnx.AttributeProto.AttributeType[e.type]===void 0?e.type:m.onnx.AttributeProto.AttributeType[e.type]:e.type),e.refAttrName!=null&&e.hasOwnProperty("refAttrName")&&(n.refAttrName=e.refAttrName),e.sparseTensor!=null&&e.hasOwnProperty("sparseTensor")&&(n.sparseTensor=m.onnx.SparseTensorProto.toObject(e.sparseTensor,r)),e.sparseTensors&&e.sparseTensors.length){n.sparseTensors=[];for(var i=0;i<e.sparseTensors.length;++i)n.sparseTensors[i]=m.onnx.SparseTensorProto.toObject(e.sparseTensors[i],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},t.AttributeType=function(){var o={},e=Object.create(o);return e[o[0]="UNDEFINED"]=0,e[o[1]="FLOAT"]=1,e[o[2]="INT"]=2,e[o[3]="STRING"]=3,e[o[4]="TENSOR"]=4,e[o[5]="GRAPH"]=5,e[o[11]="SPARSE_TENSOR"]=11,e[o[13]="TYPE_PROTO"]=13,e[o[6]="FLOATS"]=6,e[o[7]="INTS"]=7,e[o[8]="STRINGS"]=8,e[o[9]="TENSORS"]=9,e[o[10]="GRAPHS"]=10,e[o[12]="SPARSE_TENSORS"]=12,e[o[14]="TYPE_PROTOS"]=14,e}(),t}(),a.ValueInfoProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.type=null,t.prototype.docString="",t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Le.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.type!=null&&Object.hasOwnProperty.call(e,"type")&&m.onnx.TypeProto.encode(e.type,r.uint32(18).fork()).ldelim(),e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(26).string(e.docString),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.ValueInfoProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 2:{s.type=m.onnx.TypeProto.decode(e,e.uint32());break}case 3:{s.docString=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.type!=null&&e.hasOwnProperty("type")){var r=m.onnx.TypeProto.verify(e.type);if(r)return"type."+r}return e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString)?"docString: string expected":null},t.fromObject=function(e){if(e instanceof m.onnx.ValueInfoProto)return e;var r=new m.onnx.ValueInfoProto;if(e.name!=null&&(r.name=String(e.name)),e.type!=null){if(typeof e.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");r.type=m.onnx.TypeProto.fromObject(e.type)}return e.docString!=null&&(r.docString=String(e.docString)),r},t.toObject=function(e,r){r||(r={});var n={};return r.defaults&&(n.name="",n.type=null,n.docString=""),e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.type!=null&&e.hasOwnProperty("type")&&(n.type=m.onnx.TypeProto.toObject(e.type,r)),e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},t}(),a.NodeProto=function(){function t(o){if(this.input=[],this.output=[],this.attribute=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.input=y.emptyArray,t.prototype.output=y.emptyArray,t.prototype.name="",t.prototype.opType="",t.prototype.domain="",t.prototype.attribute=y.emptyArray,t.prototype.docString="",t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)r.uint32(10).string(e.input[n]);if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)r.uint32(18).string(e.output[n]);if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(26).string(e.name),e.opType!=null&&Object.hasOwnProperty.call(e,"opType")&&r.uint32(34).string(e.opType),e.attribute!=null&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)m.onnx.AttributeProto.encode(e.attribute[n],r.uint32(42).fork()).ldelim();return e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(50).string(e.docString),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(58).string(e.domain),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.NodeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(e.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(e.string());break}case 3:{s.name=e.string();break}case 4:{s.opType=e.string();break}case 7:{s.domain=e.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(m.onnx.AttributeProto.decode(e,e.uint32()));break}case 6:{s.docString=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r)if(!y.isString(e.input[r]))return"input: string[] expected"}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r)if(!y.isString(e.output[r]))return"output: string[] expected"}if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.opType!=null&&e.hasOwnProperty("opType")&&!y.isString(e.opType))return"opType: string expected";if(e.domain!=null&&e.hasOwnProperty("domain")&&!y.isString(e.domain))return"domain: string expected";if(e.attribute!=null&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var r=0;r<e.attribute.length;++r){var n=m.onnx.AttributeProto.verify(e.attribute[r]);if(n)return"attribute."+n}}return e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString)?"docString: string expected":null},t.fromObject=function(e){if(e instanceof m.onnx.NodeProto)return e;var r=new m.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=String(e.output[n])}if(e.name!=null&&(r.name=String(e.name)),e.opType!=null&&(r.opType=String(e.opType)),e.domain!=null&&(r.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");r.attribute=[];for(var n=0;n<e.attribute.length;++n){if(typeof e.attribute[n]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");r.attribute[n]=m.onnx.AttributeProto.fromObject(e.attribute[n])}}return e.docString!=null&&(r.docString=String(e.docString)),r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.input=[],n.output=[],n.attribute=[]),r.defaults&&(n.name="",n.opType="",n.docString="",n.domain=""),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=e.input[s]}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=e.output[s]}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.opType!=null&&e.hasOwnProperty("opType")&&(n.opType=e.opType),e.attribute&&e.attribute.length){n.attribute=[];for(var s=0;s<e.attribute.length;++s)n.attribute[s]=m.onnx.AttributeProto.toObject(e.attribute[s],r)}return e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},t}(),a.TrainingInfoProto=function(){function t(o){if(this.initializationBinding=[],this.updateBinding=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.initialization=null,t.prototype.algorithm=null,t.prototype.initializationBinding=y.emptyArray,t.prototype.updateBinding=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.initialization!=null&&Object.hasOwnProperty.call(e,"initialization")&&m.onnx.GraphProto.encode(e.initialization,r.uint32(10).fork()).ldelim(),e.algorithm!=null&&Object.hasOwnProperty.call(e,"algorithm")&&m.onnx.GraphProto.encode(e.algorithm,r.uint32(18).fork()).ldelim(),e.initializationBinding!=null&&e.initializationBinding.length)for(var n=0;n<e.initializationBinding.length;++n)m.onnx.StringStringEntryProto.encode(e.initializationBinding[n],r.uint32(26).fork()).ldelim();if(e.updateBinding!=null&&e.updateBinding.length)for(var n=0;n<e.updateBinding.length;++n)m.onnx.StringStringEntryProto.encode(e.updateBinding[n],r.uint32(34).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.TrainingInfoProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.initialization=m.onnx.GraphProto.decode(e,e.uint32());break}case 2:{s.algorithm=m.onnx.GraphProto.decode(e,e.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(m.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(m.onnx.StringStringEntryProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.initialization!=null&&e.hasOwnProperty("initialization")){var r=m.onnx.GraphProto.verify(e.initialization);if(r)return"initialization."+r}if(e.algorithm!=null&&e.hasOwnProperty("algorithm")){var r=m.onnx.GraphProto.verify(e.algorithm);if(r)return"algorithm."+r}if(e.initializationBinding!=null&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var n=0;n<e.initializationBinding.length;++n){var r=m.onnx.StringStringEntryProto.verify(e.initializationBinding[n]);if(r)return"initializationBinding."+r}}if(e.updateBinding!=null&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var n=0;n<e.updateBinding.length;++n){var r=m.onnx.StringStringEntryProto.verify(e.updateBinding[n]);if(r)return"updateBinding."+r}}return null},t.fromObject=function(e){if(e instanceof m.onnx.TrainingInfoProto)return e;var r=new m.onnx.TrainingInfoProto;if(e.initialization!=null){if(typeof e.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");r.initialization=m.onnx.GraphProto.fromObject(e.initialization)}if(e.algorithm!=null){if(typeof e.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");r.algorithm=m.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");r.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n){if(typeof e.initializationBinding[n]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");r.initializationBinding[n]=m.onnx.StringStringEntryProto.fromObject(e.initializationBinding[n])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");r.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n){if(typeof e.updateBinding[n]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");r.updateBinding[n]=m.onnx.StringStringEntryProto.fromObject(e.updateBinding[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.initializationBinding=[],n.updateBinding=[]),r.defaults&&(n.initialization=null,n.algorithm=null),e.initialization!=null&&e.hasOwnProperty("initialization")&&(n.initialization=m.onnx.GraphProto.toObject(e.initialization,r)),e.algorithm!=null&&e.hasOwnProperty("algorithm")&&(n.algorithm=m.onnx.GraphProto.toObject(e.algorithm,r)),e.initializationBinding&&e.initializationBinding.length){n.initializationBinding=[];for(var s=0;s<e.initializationBinding.length;++s)n.initializationBinding[s]=m.onnx.StringStringEntryProto.toObject(e.initializationBinding[s],r)}if(e.updateBinding&&e.updateBinding.length){n.updateBinding=[];for(var s=0;s<e.updateBinding.length;++s)n.updateBinding[s]=m.onnx.StringStringEntryProto.toObject(e.updateBinding[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},t}(),a.ModelProto=function(){function t(o){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.irVersion=y.Long?y.Long.fromBits(0,0,!1):0,t.prototype.opsetImport=y.emptyArray,t.prototype.producerName="",t.prototype.producerVersion="",t.prototype.domain="",t.prototype.modelVersion=y.Long?y.Long.fromBits(0,0,!1):0,t.prototype.docString="",t.prototype.graph=null,t.prototype.metadataProps=y.emptyArray,t.prototype.trainingInfo=y.emptyArray,t.prototype.functions=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.irVersion!=null&&Object.hasOwnProperty.call(e,"irVersion")&&r.uint32(8).int64(e.irVersion),e.producerName!=null&&Object.hasOwnProperty.call(e,"producerName")&&r.uint32(18).string(e.producerName),e.producerVersion!=null&&Object.hasOwnProperty.call(e,"producerVersion")&&r.uint32(26).string(e.producerVersion),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(34).string(e.domain),e.modelVersion!=null&&Object.hasOwnProperty.call(e,"modelVersion")&&r.uint32(40).int64(e.modelVersion),e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(50).string(e.docString),e.graph!=null&&Object.hasOwnProperty.call(e,"graph")&&m.onnx.GraphProto.encode(e.graph,r.uint32(58).fork()).ldelim(),e.opsetImport!=null&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)m.onnx.OperatorSetIdProto.encode(e.opsetImport[n],r.uint32(66).fork()).ldelim();if(e.metadataProps!=null&&e.metadataProps.length)for(var n=0;n<e.metadataProps.length;++n)m.onnx.StringStringEntryProto.encode(e.metadataProps[n],r.uint32(114).fork()).ldelim();if(e.trainingInfo!=null&&e.trainingInfo.length)for(var n=0;n<e.trainingInfo.length;++n)m.onnx.TrainingInfoProto.encode(e.trainingInfo[n],r.uint32(162).fork()).ldelim();if(e.functions!=null&&e.functions.length)for(var n=0;n<e.functions.length;++n)m.onnx.FunctionProto.encode(e.functions[n],r.uint32(202).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.ModelProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.irVersion=e.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(m.onnx.OperatorSetIdProto.decode(e,e.uint32()));break}case 2:{s.producerName=e.string();break}case 3:{s.producerVersion=e.string();break}case 4:{s.domain=e.string();break}case 5:{s.modelVersion=e.int64();break}case 6:{s.docString=e.string();break}case 7:{s.graph=m.onnx.GraphProto.decode(e,e.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(m.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(m.onnx.TrainingInfoProto.decode(e,e.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(m.onnx.FunctionProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.irVersion!=null&&e.hasOwnProperty("irVersion")&&!y.isInteger(e.irVersion)&&!(e.irVersion&&y.isInteger(e.irVersion.low)&&y.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(e.opsetImport!=null&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var r=0;r<e.opsetImport.length;++r){var n=m.onnx.OperatorSetIdProto.verify(e.opsetImport[r]);if(n)return"opsetImport."+n}}if(e.producerName!=null&&e.hasOwnProperty("producerName")&&!y.isString(e.producerName))return"producerName: string expected";if(e.producerVersion!=null&&e.hasOwnProperty("producerVersion")&&!y.isString(e.producerVersion))return"producerVersion: string expected";if(e.domain!=null&&e.hasOwnProperty("domain")&&!y.isString(e.domain))return"domain: string expected";if(e.modelVersion!=null&&e.hasOwnProperty("modelVersion")&&!y.isInteger(e.modelVersion)&&!(e.modelVersion&&y.isInteger(e.modelVersion.low)&&y.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString))return"docString: string expected";if(e.graph!=null&&e.hasOwnProperty("graph")){var n=m.onnx.GraphProto.verify(e.graph);if(n)return"graph."+n}if(e.metadataProps!=null&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var r=0;r<e.metadataProps.length;++r){var n=m.onnx.StringStringEntryProto.verify(e.metadataProps[r]);if(n)return"metadataProps."+n}}if(e.trainingInfo!=null&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var r=0;r<e.trainingInfo.length;++r){var n=m.onnx.TrainingInfoProto.verify(e.trainingInfo[r]);if(n)return"trainingInfo."+n}}if(e.functions!=null&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var r=0;r<e.functions.length;++r){var n=m.onnx.FunctionProto.verify(e.functions[r]);if(n)return"functions."+n}}return null},t.fromObject=function(e){if(e instanceof m.onnx.ModelProto)return e;var r=new m.onnx.ModelProto;if(e.irVersion!=null&&(y.Long?(r.irVersion=y.Long.fromValue(e.irVersion)).unsigned=!1:typeof e.irVersion=="string"?r.irVersion=parseInt(e.irVersion,10):typeof e.irVersion=="number"?r.irVersion=e.irVersion:typeof e.irVersion=="object"&&(r.irVersion=new y.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if(typeof e.opsetImport[n]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");r.opsetImport[n]=m.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}if(e.producerName!=null&&(r.producerName=String(e.producerName)),e.producerVersion!=null&&(r.producerVersion=String(e.producerVersion)),e.domain!=null&&(r.domain=String(e.domain)),e.modelVersion!=null&&(y.Long?(r.modelVersion=y.Long.fromValue(e.modelVersion)).unsigned=!1:typeof e.modelVersion=="string"?r.modelVersion=parseInt(e.modelVersion,10):typeof e.modelVersion=="number"?r.modelVersion=e.modelVersion:typeof e.modelVersion=="object"&&(r.modelVersion=new y.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),e.docString!=null&&(r.docString=String(e.docString)),e.graph!=null){if(typeof e.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");r.graph=m.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");r.metadataProps=[];for(var n=0;n<e.metadataProps.length;++n){if(typeof e.metadataProps[n]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");r.metadataProps[n]=m.onnx.StringStringEntryProto.fromObject(e.metadataProps[n])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");r.trainingInfo=[];for(var n=0;n<e.trainingInfo.length;++n){if(typeof e.trainingInfo[n]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");r.trainingInfo[n]=m.onnx.TrainingInfoProto.fromObject(e.trainingInfo[n])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");r.functions=[];for(var n=0;n<e.functions.length;++n){if(typeof e.functions[n]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");r.functions[n]=m.onnx.FunctionProto.fromObject(e.functions[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.opsetImport=[],n.metadataProps=[],n.trainingInfo=[],n.functions=[]),r.defaults){if(y.Long){var s=new y.Long(0,0,!1);n.irVersion=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.irVersion=r.longs===String?"0":0;if(n.producerName="",n.producerVersion="",n.domain="",y.Long){var s=new y.Long(0,0,!1);n.modelVersion=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.modelVersion=r.longs===String?"0":0;n.docString="",n.graph=null}if(e.irVersion!=null&&e.hasOwnProperty("irVersion")&&(typeof e.irVersion=="number"?n.irVersion=r.longs===String?String(e.irVersion):e.irVersion:n.irVersion=r.longs===String?y.Long.prototype.toString.call(e.irVersion):r.longs===Number?new y.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),e.producerName!=null&&e.hasOwnProperty("producerName")&&(n.producerName=e.producerName),e.producerVersion!=null&&e.hasOwnProperty("producerVersion")&&(n.producerVersion=e.producerVersion),e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.modelVersion!=null&&e.hasOwnProperty("modelVersion")&&(typeof e.modelVersion=="number"?n.modelVersion=r.longs===String?String(e.modelVersion):e.modelVersion:n.modelVersion=r.longs===String?y.Long.prototype.toString.call(e.modelVersion):r.longs===Number?new y.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.graph!=null&&e.hasOwnProperty("graph")&&(n.graph=m.onnx.GraphProto.toObject(e.graph,r)),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)n.opsetImport[i]=m.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],r)}if(e.metadataProps&&e.metadataProps.length){n.metadataProps=[];for(var i=0;i<e.metadataProps.length;++i)n.metadataProps[i]=m.onnx.StringStringEntryProto.toObject(e.metadataProps[i],r)}if(e.trainingInfo&&e.trainingInfo.length){n.trainingInfo=[];for(var i=0;i<e.trainingInfo.length;++i)n.trainingInfo[i]=m.onnx.TrainingInfoProto.toObject(e.trainingInfo[i],r)}if(e.functions&&e.functions.length){n.functions=[];for(var i=0;i<e.functions.length;++i)n.functions[i]=m.onnx.FunctionProto.toObject(e.functions[i],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},t}(),a.StringStringEntryProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.key="",t.prototype.value="",t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Le.create()),e.key!=null&&Object.hasOwnProperty.call(e,"key")&&r.uint32(10).string(e.key),e.value!=null&&Object.hasOwnProperty.call(e,"value")&&r.uint32(18).string(e.value),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.StringStringEntryProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.key=e.string();break}case 2:{s.value=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){return typeof e!="object"||e===null?"object expected":e.key!=null&&e.hasOwnProperty("key")&&!y.isString(e.key)?"key: string expected":e.value!=null&&e.hasOwnProperty("value")&&!y.isString(e.value)?"value: string expected":null},t.fromObject=function(e){if(e instanceof m.onnx.StringStringEntryProto)return e;var r=new m.onnx.StringStringEntryProto;return e.key!=null&&(r.key=String(e.key)),e.value!=null&&(r.value=String(e.value)),r},t.toObject=function(e,r){r||(r={});var n={};return r.defaults&&(n.key="",n.value=""),e.key!=null&&e.hasOwnProperty("key")&&(n.key=e.key),e.value!=null&&e.hasOwnProperty("value")&&(n.value=e.value),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},t}(),a.TensorAnnotation=function(){function t(o){if(this.quantParameterTensorNames=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.tensorName="",t.prototype.quantParameterTensorNames=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.tensorName!=null&&Object.hasOwnProperty.call(e,"tensorName")&&r.uint32(10).string(e.tensorName),e.quantParameterTensorNames!=null&&e.quantParameterTensorNames.length)for(var n=0;n<e.quantParameterTensorNames.length;++n)m.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[n],r.uint32(18).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.TensorAnnotation;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.tensorName=e.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(m.onnx.StringStringEntryProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.tensorName!=null&&e.hasOwnProperty("tensorName")&&!y.isString(e.tensorName))return"tensorName: string expected";if(e.quantParameterTensorNames!=null&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var r=0;r<e.quantParameterTensorNames.length;++r){var n=m.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[r]);if(n)return"quantParameterTensorNames."+n}}return null},t.fromObject=function(e){if(e instanceof m.onnx.TensorAnnotation)return e;var r=new m.onnx.TensorAnnotation;if(e.tensorName!=null&&(r.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");r.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n){if(typeof e.quantParameterTensorNames[n]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");r.quantParameterTensorNames[n]=m.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.quantParameterTensorNames=[]),r.defaults&&(n.tensorName=""),e.tensorName!=null&&e.hasOwnProperty("tensorName")&&(n.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){n.quantParameterTensorNames=[];for(var s=0;s<e.quantParameterTensorNames.length;++s)n.quantParameterTensorNames[s]=m.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},t}(),a.GraphProto=function(){function t(o){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.node=y.emptyArray,t.prototype.name="",t.prototype.initializer=y.emptyArray,t.prototype.sparseInitializer=y.emptyArray,t.prototype.docString="",t.prototype.input=y.emptyArray,t.prototype.output=y.emptyArray,t.prototype.valueInfo=y.emptyArray,t.prototype.quantizationAnnotation=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.node!=null&&e.node.length)for(var n=0;n<e.node.length;++n)m.onnx.NodeProto.encode(e.node[n],r.uint32(10).fork()).ldelim();if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(18).string(e.name),e.initializer!=null&&e.initializer.length)for(var n=0;n<e.initializer.length;++n)m.onnx.TensorProto.encode(e.initializer[n],r.uint32(42).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(82).string(e.docString),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)m.onnx.ValueInfoProto.encode(e.input[n],r.uint32(90).fork()).ldelim();if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)m.onnx.ValueInfoProto.encode(e.output[n],r.uint32(98).fork()).ldelim();if(e.valueInfo!=null&&e.valueInfo.length)for(var n=0;n<e.valueInfo.length;++n)m.onnx.ValueInfoProto.encode(e.valueInfo[n],r.uint32(106).fork()).ldelim();if(e.quantizationAnnotation!=null&&e.quantizationAnnotation.length)for(var n=0;n<e.quantizationAnnotation.length;++n)m.onnx.TensorAnnotation.encode(e.quantizationAnnotation[n],r.uint32(114).fork()).ldelim();if(e.sparseInitializer!=null&&e.sparseInitializer.length)for(var n=0;n<e.sparseInitializer.length;++n)m.onnx.SparseTensorProto.encode(e.sparseInitializer[n],r.uint32(122).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.GraphProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(m.onnx.NodeProto.decode(e,e.uint32()));break}case 2:{s.name=e.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(m.onnx.TensorProto.decode(e,e.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(m.onnx.SparseTensorProto.decode(e,e.uint32()));break}case 10:{s.docString=e.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(m.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(m.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(m.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(m.onnx.TensorAnnotation.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.node!=null&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var r=0;r<e.node.length;++r){var n=m.onnx.NodeProto.verify(e.node[r]);if(n)return"node."+n}}if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.initializer!=null&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var r=0;r<e.initializer.length;++r){var n=m.onnx.TensorProto.verify(e.initializer[r]);if(n)return"initializer."+n}}if(e.sparseInitializer!=null&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var r=0;r<e.sparseInitializer.length;++r){var n=m.onnx.SparseTensorProto.verify(e.sparseInitializer[r]);if(n)return"sparseInitializer."+n}}if(e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString))return"docString: string expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r){var n=m.onnx.ValueInfoProto.verify(e.input[r]);if(n)return"input."+n}}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r){var n=m.onnx.ValueInfoProto.verify(e.output[r]);if(n)return"output."+n}}if(e.valueInfo!=null&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var r=0;r<e.valueInfo.length;++r){var n=m.onnx.ValueInfoProto.verify(e.valueInfo[r]);if(n)return"valueInfo."+n}}if(e.quantizationAnnotation!=null&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var r=0;r<e.quantizationAnnotation.length;++r){var n=m.onnx.TensorAnnotation.verify(e.quantizationAnnotation[r]);if(n)return"quantizationAnnotation."+n}}return null},t.fromObject=function(e){if(e instanceof m.onnx.GraphProto)return e;var r=new m.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");r.node=[];for(var n=0;n<e.node.length;++n){if(typeof e.node[n]!="object")throw TypeError(".onnx.GraphProto.node: object expected");r.node[n]=m.onnx.NodeProto.fromObject(e.node[n])}}if(e.name!=null&&(r.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");r.initializer=[];for(var n=0;n<e.initializer.length;++n){if(typeof e.initializer[n]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");r.initializer[n]=m.onnx.TensorProto.fromObject(e.initializer[n])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");r.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n){if(typeof e.sparseInitializer[n]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");r.sparseInitializer[n]=m.onnx.SparseTensorProto.fromObject(e.sparseInitializer[n])}}if(e.docString!=null&&(r.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n){if(typeof e.input[n]!="object")throw TypeError(".onnx.GraphProto.input: object expected");r.input[n]=m.onnx.ValueInfoProto.fromObject(e.input[n])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n){if(typeof e.output[n]!="object")throw TypeError(".onnx.GraphProto.output: object expected");r.output[n]=m.onnx.ValueInfoProto.fromObject(e.output[n])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");r.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n){if(typeof e.valueInfo[n]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");r.valueInfo[n]=m.onnx.ValueInfoProto.fromObject(e.valueInfo[n])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");r.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n){if(typeof e.quantizationAnnotation[n]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");r.quantizationAnnotation[n]=m.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.node=[],n.initializer=[],n.input=[],n.output=[],n.valueInfo=[],n.quantizationAnnotation=[],n.sparseInitializer=[]),r.defaults&&(n.name="",n.docString=""),e.node&&e.node.length){n.node=[];for(var s=0;s<e.node.length;++s)n.node[s]=m.onnx.NodeProto.toObject(e.node[s],r)}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.initializer&&e.initializer.length){n.initializer=[];for(var s=0;s<e.initializer.length;++s)n.initializer[s]=m.onnx.TensorProto.toObject(e.initializer[s],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=m.onnx.ValueInfoProto.toObject(e.input[s],r)}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=m.onnx.ValueInfoProto.toObject(e.output[s],r)}if(e.valueInfo&&e.valueInfo.length){n.valueInfo=[];for(var s=0;s<e.valueInfo.length;++s)n.valueInfo[s]=m.onnx.ValueInfoProto.toObject(e.valueInfo[s],r)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){n.quantizationAnnotation=[];for(var s=0;s<e.quantizationAnnotation.length;++s)n.quantizationAnnotation[s]=m.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[s],r)}if(e.sparseInitializer&&e.sparseInitializer.length){n.sparseInitializer=[];for(var s=0;s<e.sparseInitializer.length;++s)n.sparseInitializer[s]=m.onnx.SparseTensorProto.toObject(e.sparseInitializer[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},t}(),a.TensorProto=function(){function t(o){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.dims=y.emptyArray,t.prototype.dataType=0,t.prototype.segment=null,t.prototype.floatData=y.emptyArray,t.prototype.int32Data=y.emptyArray,t.prototype.stringData=y.emptyArray,t.prototype.int64Data=y.emptyArray,t.prototype.name="",t.prototype.docString="",t.prototype.rawData=y.newBuffer([]),t.prototype.externalData=y.emptyArray,t.prototype.dataLocation=0,t.prototype.doubleData=y.emptyArray,t.prototype.uint64Data=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.dims!=null&&e.dims.length){r.uint32(10).fork();for(var n=0;n<e.dims.length;++n)r.int64(e.dims[n]);r.ldelim()}if(e.dataType!=null&&Object.hasOwnProperty.call(e,"dataType")&&r.uint32(16).int32(e.dataType),e.segment!=null&&Object.hasOwnProperty.call(e,"segment")&&m.onnx.TensorProto.Segment.encode(e.segment,r.uint32(26).fork()).ldelim(),e.floatData!=null&&e.floatData.length){r.uint32(34).fork();for(var n=0;n<e.floatData.length;++n)r.float(e.floatData[n]);r.ldelim()}if(e.int32Data!=null&&e.int32Data.length){r.uint32(42).fork();for(var n=0;n<e.int32Data.length;++n)r.int32(e.int32Data[n]);r.ldelim()}if(e.stringData!=null&&e.stringData.length)for(var n=0;n<e.stringData.length;++n)r.uint32(50).bytes(e.stringData[n]);if(e.int64Data!=null&&e.int64Data.length){r.uint32(58).fork();for(var n=0;n<e.int64Data.length;++n)r.int64(e.int64Data[n]);r.ldelim()}if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(66).string(e.name),e.rawData!=null&&Object.hasOwnProperty.call(e,"rawData")&&r.uint32(74).bytes(e.rawData),e.doubleData!=null&&e.doubleData.length){r.uint32(82).fork();for(var n=0;n<e.doubleData.length;++n)r.double(e.doubleData[n]);r.ldelim()}if(e.uint64Data!=null&&e.uint64Data.length){r.uint32(90).fork();for(var n=0;n<e.uint64Data.length;++n)r.uint64(e.uint64Data[n]);r.ldelim()}if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(98).string(e.docString),e.externalData!=null&&e.externalData.length)for(var n=0;n<e.externalData.length;++n)m.onnx.StringStringEntryProto.encode(e.externalData[n],r.uint32(106).fork()).ldelim();return e.dataLocation!=null&&Object.hasOwnProperty.call(e,"dataLocation")&&r.uint32(112).int32(e.dataLocation),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.TensorProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.dims.push(e.int64());else s.dims.push(e.int64());break}case 2:{s.dataType=e.int32();break}case 3:{s.segment=m.onnx.TensorProto.Segment.decode(e,e.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.floatData.push(e.float());else s.floatData.push(e.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.int32Data.push(e.int32());else s.int32Data.push(e.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(e.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.int64Data.push(e.int64());else s.int64Data.push(e.int64());break}case 8:{s.name=e.string();break}case 12:{s.docString=e.string();break}case 9:{s.rawData=e.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(m.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 14:{s.dataLocation=e.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.doubleData.push(e.double());else s.doubleData.push(e.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.uint64Data.push(e.uint64());else s.uint64Data.push(e.uint64());break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.dims!=null&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var r=0;r<e.dims.length;++r)if(!y.isInteger(e.dims[r])&&!(e.dims[r]&&y.isInteger(e.dims[r].low)&&y.isInteger(e.dims[r].high)))return"dims: integer|Long[] expected"}if(e.dataType!=null&&e.hasOwnProperty("dataType")&&!y.isInteger(e.dataType))return"dataType: integer expected";if(e.segment!=null&&e.hasOwnProperty("segment")){var n=m.onnx.TensorProto.Segment.verify(e.segment);if(n)return"segment."+n}if(e.floatData!=null&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var r=0;r<e.floatData.length;++r)if(typeof e.floatData[r]!="number")return"floatData: number[] expected"}if(e.int32Data!=null&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var r=0;r<e.int32Data.length;++r)if(!y.isInteger(e.int32Data[r]))return"int32Data: integer[] expected"}if(e.stringData!=null&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var r=0;r<e.stringData.length;++r)if(!(e.stringData[r]&&typeof e.stringData[r].length=="number"||y.isString(e.stringData[r])))return"stringData: buffer[] expected"}if(e.int64Data!=null&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var r=0;r<e.int64Data.length;++r)if(!y.isInteger(e.int64Data[r])&&!(e.int64Data[r]&&y.isInteger(e.int64Data[r].low)&&y.isInteger(e.int64Data[r].high)))return"int64Data: integer|Long[] expected"}if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString))return"docString: string expected";if(e.rawData!=null&&e.hasOwnProperty("rawData")&&!(e.rawData&&typeof e.rawData.length=="number"||y.isString(e.rawData)))return"rawData: buffer expected";if(e.externalData!=null&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var r=0;r<e.externalData.length;++r){var n=m.onnx.StringStringEntryProto.verify(e.externalData[r]);if(n)return"externalData."+n}}if(e.dataLocation!=null&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(e.doubleData!=null&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var r=0;r<e.doubleData.length;++r)if(typeof e.doubleData[r]!="number")return"doubleData: number[] expected"}if(e.uint64Data!=null&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var r=0;r<e.uint64Data.length;++r)if(!y.isInteger(e.uint64Data[r])&&!(e.uint64Data[r]&&y.isInteger(e.uint64Data[r].low)&&y.isInteger(e.uint64Data[r].high)))return"uint64Data: integer|Long[] expected"}return null},t.fromObject=function(e){if(e instanceof m.onnx.TensorProto)return e;var r=new m.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");r.dims=[];for(var n=0;n<e.dims.length;++n)y.Long?(r.dims[n]=y.Long.fromValue(e.dims[n])).unsigned=!1:typeof e.dims[n]=="string"?r.dims[n]=parseInt(e.dims[n],10):typeof e.dims[n]=="number"?r.dims[n]=e.dims[n]:typeof e.dims[n]=="object"&&(r.dims[n]=new y.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}if(e.dataType!=null&&(r.dataType=e.dataType|0),e.segment!=null){if(typeof e.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");r.segment=m.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");r.floatData=[];for(var n=0;n<e.floatData.length;++n)r.floatData[n]=Number(e.floatData[n])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");r.int32Data=[];for(var n=0;n<e.int32Data.length;++n)r.int32Data[n]=e.int32Data[n]|0}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");r.stringData=[];for(var n=0;n<e.stringData.length;++n)typeof e.stringData[n]=="string"?y.base64.decode(e.stringData[n],r.stringData[n]=y.newBuffer(y.base64.length(e.stringData[n])),0):e.stringData[n].length>=0&&(r.stringData[n]=e.stringData[n])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");r.int64Data=[];for(var n=0;n<e.int64Data.length;++n)y.Long?(r.int64Data[n]=y.Long.fromValue(e.int64Data[n])).unsigned=!1:typeof e.int64Data[n]=="string"?r.int64Data[n]=parseInt(e.int64Data[n],10):typeof e.int64Data[n]=="number"?r.int64Data[n]=e.int64Data[n]:typeof e.int64Data[n]=="object"&&(r.int64Data[n]=new y.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber())}if(e.name!=null&&(r.name=String(e.name)),e.docString!=null&&(r.docString=String(e.docString)),e.rawData!=null&&(typeof e.rawData=="string"?y.base64.decode(e.rawData,r.rawData=y.newBuffer(y.base64.length(e.rawData)),0):e.rawData.length>=0&&(r.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");r.externalData=[];for(var n=0;n<e.externalData.length;++n){if(typeof e.externalData[n]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");r.externalData[n]=m.onnx.StringStringEntryProto.fromObject(e.externalData[n])}}switch(e.dataLocation){default:if(typeof e.dataLocation=="number"){r.dataLocation=e.dataLocation;break}break;case"DEFAULT":case 0:r.dataLocation=0;break;case"EXTERNAL":case 1:r.dataLocation=1;break}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");r.doubleData=[];for(var n=0;n<e.doubleData.length;++n)r.doubleData[n]=Number(e.doubleData[n])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");r.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)y.Long?(r.uint64Data[n]=y.Long.fromValue(e.uint64Data[n])).unsigned=!0:typeof e.uint64Data[n]=="string"?r.uint64Data[n]=parseInt(e.uint64Data[n],10):typeof e.uint64Data[n]=="number"?r.uint64Data[n]=e.uint64Data[n]:typeof e.uint64Data[n]=="object"&&(r.uint64Data[n]=new y.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0))}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dims=[],n.floatData=[],n.int32Data=[],n.stringData=[],n.int64Data=[],n.doubleData=[],n.uint64Data=[],n.externalData=[]),r.defaults&&(n.dataType=0,n.segment=null,n.name="",r.bytes===String?n.rawData="":(n.rawData=[],r.bytes!==Array&&(n.rawData=y.newBuffer(n.rawData))),n.docString="",n.dataLocation=r.enums===String?"DEFAULT":0),e.dims&&e.dims.length){n.dims=[];for(var s=0;s<e.dims.length;++s)typeof e.dims[s]=="number"?n.dims[s]=r.longs===String?String(e.dims[s]):e.dims[s]:n.dims[s]=r.longs===String?y.Long.prototype.toString.call(e.dims[s]):r.longs===Number?new y.LongBits(e.dims[s].low>>>0,e.dims[s].high>>>0).toNumber():e.dims[s]}if(e.dataType!=null&&e.hasOwnProperty("dataType")&&(n.dataType=e.dataType),e.segment!=null&&e.hasOwnProperty("segment")&&(n.segment=m.onnx.TensorProto.Segment.toObject(e.segment,r)),e.floatData&&e.floatData.length){n.floatData=[];for(var s=0;s<e.floatData.length;++s)n.floatData[s]=r.json&&!isFinite(e.floatData[s])?String(e.floatData[s]):e.floatData[s]}if(e.int32Data&&e.int32Data.length){n.int32Data=[];for(var s=0;s<e.int32Data.length;++s)n.int32Data[s]=e.int32Data[s]}if(e.stringData&&e.stringData.length){n.stringData=[];for(var s=0;s<e.stringData.length;++s)n.stringData[s]=r.bytes===String?y.base64.encode(e.stringData[s],0,e.stringData[s].length):r.bytes===Array?Array.prototype.slice.call(e.stringData[s]):e.stringData[s]}if(e.int64Data&&e.int64Data.length){n.int64Data=[];for(var s=0;s<e.int64Data.length;++s)typeof e.int64Data[s]=="number"?n.int64Data[s]=r.longs===String?String(e.int64Data[s]):e.int64Data[s]:n.int64Data[s]=r.longs===String?y.Long.prototype.toString.call(e.int64Data[s]):r.longs===Number?new y.LongBits(e.int64Data[s].low>>>0,e.int64Data[s].high>>>0).toNumber():e.int64Data[s]}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.rawData!=null&&e.hasOwnProperty("rawData")&&(n.rawData=r.bytes===String?y.base64.encode(e.rawData,0,e.rawData.length):r.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){n.doubleData=[];for(var s=0;s<e.doubleData.length;++s)n.doubleData[s]=r.json&&!isFinite(e.doubleData[s])?String(e.doubleData[s]):e.doubleData[s]}if(e.uint64Data&&e.uint64Data.length){n.uint64Data=[];for(var s=0;s<e.uint64Data.length;++s)typeof e.uint64Data[s]=="number"?n.uint64Data[s]=r.longs===String?String(e.uint64Data[s]):e.uint64Data[s]:n.uint64Data[s]=r.longs===String?y.Long.prototype.toString.call(e.uint64Data[s]):r.longs===Number?new y.LongBits(e.uint64Data[s].low>>>0,e.uint64Data[s].high>>>0).toNumber(!0):e.uint64Data[s]}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.externalData&&e.externalData.length){n.externalData=[];for(var s=0;s<e.externalData.length;++s)n.externalData[s]=m.onnx.StringStringEntryProto.toObject(e.externalData[s],r)}return e.dataLocation!=null&&e.hasOwnProperty("dataLocation")&&(n.dataLocation=r.enums===String?m.onnx.TensorProto.DataLocation[e.dataLocation]===void 0?e.dataLocation:m.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},t.DataType=function(){var o={},e=Object.create(o);return e[o[0]="UNDEFINED"]=0,e[o[1]="FLOAT"]=1,e[o[2]="UINT8"]=2,e[o[3]="INT8"]=3,e[o[4]="UINT16"]=4,e[o[5]="INT16"]=5,e[o[6]="INT32"]=6,e[o[7]="INT64"]=7,e[o[8]="STRING"]=8,e[o[9]="BOOL"]=9,e[o[10]="FLOAT16"]=10,e[o[11]="DOUBLE"]=11,e[o[12]="UINT32"]=12,e[o[13]="UINT64"]=13,e[o[14]="COMPLEX64"]=14,e[o[15]="COMPLEX128"]=15,e[o[16]="BFLOAT16"]=16,e[o[17]="FLOAT8E4M3FN"]=17,e[o[18]="FLOAT8E4M3FNUZ"]=18,e[o[19]="FLOAT8E5M2"]=19,e[o[20]="FLOAT8E5M2FNUZ"]=20,e}(),t.Segment=function(){function o(e){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)e[r[n]]!=null&&(this[r[n]]=e[r[n]])}return o.prototype.begin=y.Long?y.Long.fromBits(0,0,!1):0,o.prototype.end=y.Long?y.Long.fromBits(0,0,!1):0,o.create=function(r){return new o(r)},o.encode=function(r,n){return n||(n=Le.create()),r.begin!=null&&Object.hasOwnProperty.call(r,"begin")&&n.uint32(8).int64(r.begin),r.end!=null&&Object.hasOwnProperty.call(r,"end")&&n.uint32(16).int64(r.end),n},o.encodeDelimited=function(r,n){return this.encode(r,n).ldelim()},o.decode=function(r,n){r instanceof R||(r=R.create(r));for(var s=n===void 0?r.len:r.pos+n,i=new m.onnx.TensorProto.Segment;r.pos<s;){var u=r.uint32();switch(u>>>3){case 1:{i.begin=r.int64();break}case 2:{i.end=r.int64();break}default:r.skipType(u&7);break}}return i},o.decodeDelimited=function(r){return r instanceof R||(r=new R(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.begin!=null&&r.hasOwnProperty("begin")&&!y.isInteger(r.begin)&&!(r.begin&&y.isInteger(r.begin.low)&&y.isInteger(r.begin.high))?"begin: integer|Long expected":r.end!=null&&r.hasOwnProperty("end")&&!y.isInteger(r.end)&&!(r.end&&y.isInteger(r.end.low)&&y.isInteger(r.end.high))?"end: integer|Long expected":null},o.fromObject=function(r){if(r instanceof m.onnx.TensorProto.Segment)return r;var n=new m.onnx.TensorProto.Segment;return r.begin!=null&&(y.Long?(n.begin=y.Long.fromValue(r.begin)).unsigned=!1:typeof r.begin=="string"?n.begin=parseInt(r.begin,10):typeof r.begin=="number"?n.begin=r.begin:typeof r.begin=="object"&&(n.begin=new y.LongBits(r.begin.low>>>0,r.begin.high>>>0).toNumber())),r.end!=null&&(y.Long?(n.end=y.Long.fromValue(r.end)).unsigned=!1:typeof r.end=="string"?n.end=parseInt(r.end,10):typeof r.end=="number"?n.end=r.end:typeof r.end=="object"&&(n.end=new y.LongBits(r.end.low>>>0,r.end.high>>>0).toNumber())),n},o.toObject=function(r,n){n||(n={});var s={};if(n.defaults){if(y.Long){var i=new y.Long(0,0,!1);s.begin=n.longs===String?i.toString():n.longs===Number?i.toNumber():i}else s.begin=n.longs===String?"0":0;if(y.Long){var i=new y.Long(0,0,!1);s.end=n.longs===String?i.toString():n.longs===Number?i.toNumber():i}else s.end=n.longs===String?"0":0}return r.begin!=null&&r.hasOwnProperty("begin")&&(typeof r.begin=="number"?s.begin=n.longs===String?String(r.begin):r.begin:s.begin=n.longs===String?y.Long.prototype.toString.call(r.begin):n.longs===Number?new y.LongBits(r.begin.low>>>0,r.begin.high>>>0).toNumber():r.begin),r.end!=null&&r.hasOwnProperty("end")&&(typeof r.end=="number"?s.end=n.longs===String?String(r.end):r.end:s.end=n.longs===String?y.Long.prototype.toString.call(r.end):n.longs===Number?new y.LongBits(r.end.low>>>0,r.end.high>>>0).toNumber():r.end),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorProto.Segment"},o}(),t.DataLocation=function(){var o={},e=Object.create(o);return e[o[0]="DEFAULT"]=0,e[o[1]="EXTERNAL"]=1,e}(),t}(),a.SparseTensorProto=function(){function t(o){if(this.dims=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.values=null,t.prototype.indices=null,t.prototype.dims=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.values!=null&&Object.hasOwnProperty.call(e,"values")&&m.onnx.TensorProto.encode(e.values,r.uint32(10).fork()).ldelim(),e.indices!=null&&Object.hasOwnProperty.call(e,"indices")&&m.onnx.TensorProto.encode(e.indices,r.uint32(18).fork()).ldelim(),e.dims!=null&&e.dims.length){r.uint32(26).fork();for(var n=0;n<e.dims.length;++n)r.int64(e.dims[n]);r.ldelim()}return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.SparseTensorProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.values=m.onnx.TensorProto.decode(e,e.uint32());break}case 2:{s.indices=m.onnx.TensorProto.decode(e,e.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.dims.push(e.int64());else s.dims.push(e.int64());break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.values!=null&&e.hasOwnProperty("values")){var r=m.onnx.TensorProto.verify(e.values);if(r)return"values."+r}if(e.indices!=null&&e.hasOwnProperty("indices")){var r=m.onnx.TensorProto.verify(e.indices);if(r)return"indices."+r}if(e.dims!=null&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var n=0;n<e.dims.length;++n)if(!y.isInteger(e.dims[n])&&!(e.dims[n]&&y.isInteger(e.dims[n].low)&&y.isInteger(e.dims[n].high)))return"dims: integer|Long[] expected"}return null},t.fromObject=function(e){if(e instanceof m.onnx.SparseTensorProto)return e;var r=new m.onnx.SparseTensorProto;if(e.values!=null){if(typeof e.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");r.values=m.onnx.TensorProto.fromObject(e.values)}if(e.indices!=null){if(typeof e.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");r.indices=m.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");r.dims=[];for(var n=0;n<e.dims.length;++n)y.Long?(r.dims[n]=y.Long.fromValue(e.dims[n])).unsigned=!1:typeof e.dims[n]=="string"?r.dims[n]=parseInt(e.dims[n],10):typeof e.dims[n]=="number"?r.dims[n]=e.dims[n]:typeof e.dims[n]=="object"&&(r.dims[n]=new y.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dims=[]),r.defaults&&(n.values=null,n.indices=null),e.values!=null&&e.hasOwnProperty("values")&&(n.values=m.onnx.TensorProto.toObject(e.values,r)),e.indices!=null&&e.hasOwnProperty("indices")&&(n.indices=m.onnx.TensorProto.toObject(e.indices,r)),e.dims&&e.dims.length){n.dims=[];for(var s=0;s<e.dims.length;++s)typeof e.dims[s]=="number"?n.dims[s]=r.longs===String?String(e.dims[s]):e.dims[s]:n.dims[s]=r.longs===String?y.Long.prototype.toString.call(e.dims[s]):r.longs===Number?new y.LongBits(e.dims[s].low>>>0,e.dims[s].high>>>0).toNumber():e.dims[s]}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},t}(),a.TensorShapeProto=function(){function t(o){if(this.dim=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.dim=y.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.dim!=null&&e.dim.length)for(var n=0;n<e.dim.length;++n)m.onnx.TensorShapeProto.Dimension.encode(e.dim[n],r.uint32(10).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.TensorShapeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(m.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.dim!=null&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var r=0;r<e.dim.length;++r){var n=m.onnx.TensorShapeProto.Dimension.verify(e.dim[r]);if(n)return"dim."+n}}return null},t.fromObject=function(e){if(e instanceof m.onnx.TensorShapeProto)return e;var r=new m.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");r.dim=[];for(var n=0;n<e.dim.length;++n){if(typeof e.dim[n]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");r.dim[n]=m.onnx.TensorShapeProto.Dimension.fromObject(e.dim[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dim=[]),e.dim&&e.dim.length){n.dim=[];for(var s=0;s<e.dim.length;++s)n.dim[s]=m.onnx.TensorShapeProto.Dimension.toObject(e.dim[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},t.Dimension=function(){function o(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}o.prototype.dimValue=null,o.prototype.dimParam=null,o.prototype.denotation="";var e;return Object.defineProperty(o.prototype,"value",{get:y.oneOfGetter(e=["dimValue","dimParam"]),set:y.oneOfSetter(e)}),o.create=function(n){return new o(n)},o.encode=function(n,s){return s||(s=Le.create()),n.dimValue!=null&&Object.hasOwnProperty.call(n,"dimValue")&&s.uint32(8).int64(n.dimValue),n.dimParam!=null&&Object.hasOwnProperty.call(n,"dimParam")&&s.uint32(18).string(n.dimParam),n.denotation!=null&&Object.hasOwnProperty.call(n,"denotation")&&s.uint32(26).string(n.denotation),s},o.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},o.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TensorShapeProto.Dimension;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.dimValue=n.int64();break}case 2:{u.dimParam=n.string();break}case 3:{u.denotation=n.string();break}default:n.skipType(l&7);break}}return u},o.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},o.verify=function(n){if(typeof n!="object"||n===null)return"object expected";var s={};if(n.dimValue!=null&&n.hasOwnProperty("dimValue")&&(s.value=1,!y.isInteger(n.dimValue)&&!(n.dimValue&&y.isInteger(n.dimValue.low)&&y.isInteger(n.dimValue.high))))return"dimValue: integer|Long expected";if(n.dimParam!=null&&n.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!y.isString(n.dimParam))return"dimParam: string expected"}return n.denotation!=null&&n.hasOwnProperty("denotation")&&!y.isString(n.denotation)?"denotation: string expected":null},o.fromObject=function(n){if(n instanceof m.onnx.TensorShapeProto.Dimension)return n;var s=new m.onnx.TensorShapeProto.Dimension;return n.dimValue!=null&&(y.Long?(s.dimValue=y.Long.fromValue(n.dimValue)).unsigned=!1:typeof n.dimValue=="string"?s.dimValue=parseInt(n.dimValue,10):typeof n.dimValue=="number"?s.dimValue=n.dimValue:typeof n.dimValue=="object"&&(s.dimValue=new y.LongBits(n.dimValue.low>>>0,n.dimValue.high>>>0).toNumber())),n.dimParam!=null&&(s.dimParam=String(n.dimParam)),n.denotation!=null&&(s.denotation=String(n.denotation)),s},o.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.denotation=""),n.dimValue!=null&&n.hasOwnProperty("dimValue")&&(typeof n.dimValue=="number"?i.dimValue=s.longs===String?String(n.dimValue):n.dimValue:i.dimValue=s.longs===String?y.Long.prototype.toString.call(n.dimValue):s.longs===Number?new y.LongBits(n.dimValue.low>>>0,n.dimValue.high>>>0).toNumber():n.dimValue,s.oneofs&&(i.value="dimValue")),n.dimParam!=null&&n.hasOwnProperty("dimParam")&&(i.dimParam=n.dimParam,s.oneofs&&(i.value="dimParam")),n.denotation!=null&&n.hasOwnProperty("denotation")&&(i.denotation=n.denotation),i},o.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},o.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TensorShapeProto.Dimension"},o}(),t}(),a.TypeProto=function(){function t(e){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)e[r[n]]!=null&&(this[r[n]]=e[r[n]])}t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="";var o;return Object.defineProperty(t.prototype,"value",{get:y.oneOfGetter(o=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:y.oneOfSetter(o)}),t.create=function(r){return new t(r)},t.encode=function(r,n){return n||(n=Le.create()),r.tensorType!=null&&Object.hasOwnProperty.call(r,"tensorType")&&m.onnx.TypeProto.Tensor.encode(r.tensorType,n.uint32(10).fork()).ldelim(),r.sequenceType!=null&&Object.hasOwnProperty.call(r,"sequenceType")&&m.onnx.TypeProto.Sequence.encode(r.sequenceType,n.uint32(34).fork()).ldelim(),r.mapType!=null&&Object.hasOwnProperty.call(r,"mapType")&&m.onnx.TypeProto.Map.encode(r.mapType,n.uint32(42).fork()).ldelim(),r.denotation!=null&&Object.hasOwnProperty.call(r,"denotation")&&n.uint32(50).string(r.denotation),r.sparseTensorType!=null&&Object.hasOwnProperty.call(r,"sparseTensorType")&&m.onnx.TypeProto.SparseTensor.encode(r.sparseTensorType,n.uint32(66).fork()).ldelim(),r.optionalType!=null&&Object.hasOwnProperty.call(r,"optionalType")&&m.onnx.TypeProto.Optional.encode(r.optionalType,n.uint32(74).fork()).ldelim(),n},t.encodeDelimited=function(r,n){return this.encode(r,n).ldelim()},t.decode=function(r,n){r instanceof R||(r=R.create(r));for(var s=n===void 0?r.len:r.pos+n,i=new m.onnx.TypeProto;r.pos<s;){var u=r.uint32();switch(u>>>3){case 1:{i.tensorType=m.onnx.TypeProto.Tensor.decode(r,r.uint32());break}case 4:{i.sequenceType=m.onnx.TypeProto.Sequence.decode(r,r.uint32());break}case 5:{i.mapType=m.onnx.TypeProto.Map.decode(r,r.uint32());break}case 9:{i.optionalType=m.onnx.TypeProto.Optional.decode(r,r.uint32());break}case 8:{i.sparseTensorType=m.onnx.TypeProto.SparseTensor.decode(r,r.uint32());break}case 6:{i.denotation=r.string();break}default:r.skipType(u&7);break}}return i},t.decodeDelimited=function(r){return r instanceof R||(r=new R(r)),this.decode(r,r.uint32())},t.verify=function(r){if(typeof r!="object"||r===null)return"object expected";var n={};if(r.tensorType!=null&&r.hasOwnProperty("tensorType")){n.value=1;{var s=m.onnx.TypeProto.Tensor.verify(r.tensorType);if(s)return"tensorType."+s}}if(r.sequenceType!=null&&r.hasOwnProperty("sequenceType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=m.onnx.TypeProto.Sequence.verify(r.sequenceType);if(s)return"sequenceType."+s}}if(r.mapType!=null&&r.hasOwnProperty("mapType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=m.onnx.TypeProto.Map.verify(r.mapType);if(s)return"mapType."+s}}if(r.optionalType!=null&&r.hasOwnProperty("optionalType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=m.onnx.TypeProto.Optional.verify(r.optionalType);if(s)return"optionalType."+s}}if(r.sparseTensorType!=null&&r.hasOwnProperty("sparseTensorType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=m.onnx.TypeProto.SparseTensor.verify(r.sparseTensorType);if(s)return"sparseTensorType."+s}}return r.denotation!=null&&r.hasOwnProperty("denotation")&&!y.isString(r.denotation)?"denotation: string expected":null},t.fromObject=function(r){if(r instanceof m.onnx.TypeProto)return r;var n=new m.onnx.TypeProto;if(r.tensorType!=null){if(typeof r.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");n.tensorType=m.onnx.TypeProto.Tensor.fromObject(r.tensorType)}if(r.sequenceType!=null){if(typeof r.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");n.sequenceType=m.onnx.TypeProto.Sequence.fromObject(r.sequenceType)}if(r.mapType!=null){if(typeof r.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");n.mapType=m.onnx.TypeProto.Map.fromObject(r.mapType)}if(r.optionalType!=null){if(typeof r.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");n.optionalType=m.onnx.TypeProto.Optional.fromObject(r.optionalType)}if(r.sparseTensorType!=null){if(typeof r.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");n.sparseTensorType=m.onnx.TypeProto.SparseTensor.fromObject(r.sparseTensorType)}return r.denotation!=null&&(n.denotation=String(r.denotation)),n},t.toObject=function(r,n){n||(n={});var s={};return n.defaults&&(s.denotation=""),r.tensorType!=null&&r.hasOwnProperty("tensorType")&&(s.tensorType=m.onnx.TypeProto.Tensor.toObject(r.tensorType,n),n.oneofs&&(s.value="tensorType")),r.sequenceType!=null&&r.hasOwnProperty("sequenceType")&&(s.sequenceType=m.onnx.TypeProto.Sequence.toObject(r.sequenceType,n),n.oneofs&&(s.value="sequenceType")),r.mapType!=null&&r.hasOwnProperty("mapType")&&(s.mapType=m.onnx.TypeProto.Map.toObject(r.mapType,n),n.oneofs&&(s.value="mapType")),r.denotation!=null&&r.hasOwnProperty("denotation")&&(s.denotation=r.denotation),r.sparseTensorType!=null&&r.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=m.onnx.TypeProto.SparseTensor.toObject(r.sparseTensorType,n),n.oneofs&&(s.value="sparseTensorType")),r.optionalType!=null&&r.hasOwnProperty("optionalType")&&(s.optionalType=m.onnx.TypeProto.Optional.toObject(r.optionalType,n),n.oneofs&&(s.value="optionalType")),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TypeProto"},t.Tensor=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Le.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&s.uint32(8).int32(n.elemType),n.shape!=null&&Object.hasOwnProperty.call(n,"shape")&&m.onnx.TensorShapeProto.encode(n.shape,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TypeProto.Tensor;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=n.int32();break}case 2:{u.shape=m.onnx.TensorShapeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")&&!y.isInteger(n.elemType))return"elemType: integer expected";if(n.shape!=null&&n.hasOwnProperty("shape")){var s=m.onnx.TensorShapeProto.verify(n.shape);if(s)return"shape."+s}return null},e.fromObject=function(n){if(n instanceof m.onnx.TypeProto.Tensor)return n;var s=new m.onnx.TypeProto.Tensor;if(n.elemType!=null&&(s.elemType=n.elemType|0),n.shape!=null){if(typeof n.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=m.onnx.TensorShapeProto.fromObject(n.shape)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=0,i.shape=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=n.elemType),n.shape!=null&&n.hasOwnProperty("shape")&&(i.shape=m.onnx.TensorShapeProto.toObject(n.shape,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Le.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&m.onnx.TypeProto.encode(n.elemType,s.uint32(10).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TypeProto.Sequence;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=m.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")){var s=m.onnx.TypeProto.verify(n.elemType);if(s)return"elemType."+s}return null},e.fromObject=function(n){if(n instanceof m.onnx.TypeProto.Sequence)return n;var s=new m.onnx.TypeProto.Sequence;if(n.elemType!=null){if(typeof n.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=m.onnx.TypeProto.fromObject(n.elemType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=m.onnx.TypeProto.toObject(n.elemType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Le.create()),n.keyType!=null&&Object.hasOwnProperty.call(n,"keyType")&&s.uint32(8).int32(n.keyType),n.valueType!=null&&Object.hasOwnProperty.call(n,"valueType")&&m.onnx.TypeProto.encode(n.valueType,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TypeProto.Map;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.keyType=n.int32();break}case 2:{u.valueType=m.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.keyType!=null&&n.hasOwnProperty("keyType")&&!y.isInteger(n.keyType))return"keyType: integer expected";if(n.valueType!=null&&n.hasOwnProperty("valueType")){var s=m.onnx.TypeProto.verify(n.valueType);if(s)return"valueType."+s}return null},e.fromObject=function(n){if(n instanceof m.onnx.TypeProto.Map)return n;var s=new m.onnx.TypeProto.Map;if(n.keyType!=null&&(s.keyType=n.keyType|0),n.valueType!=null){if(typeof n.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=m.onnx.TypeProto.fromObject(n.valueType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.keyType=0,i.valueType=null),n.keyType!=null&&n.hasOwnProperty("keyType")&&(i.keyType=n.keyType),n.valueType!=null&&n.hasOwnProperty("valueType")&&(i.valueType=m.onnx.TypeProto.toObject(n.valueType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Le.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&m.onnx.TypeProto.encode(n.elemType,s.uint32(10).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TypeProto.Optional;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=m.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")){var s=m.onnx.TypeProto.verify(n.elemType);if(s)return"elemType."+s}return null},e.fromObject=function(n){if(n instanceof m.onnx.TypeProto.Optional)return n;var s=new m.onnx.TypeProto.Optional;if(n.elemType!=null){if(typeof n.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=m.onnx.TypeProto.fromObject(n.elemType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=m.onnx.TypeProto.toObject(n.elemType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Le.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&s.uint32(8).int32(n.elemType),n.shape!=null&&Object.hasOwnProperty.call(n,"shape")&&m.onnx.TensorShapeProto.encode(n.shape,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof R||(n=R.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new m.onnx.TypeProto.SparseTensor;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=n.int32();break}case 2:{u.shape=m.onnx.TensorShapeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof R||(n=new R(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")&&!y.isInteger(n.elemType))return"elemType: integer expected";if(n.shape!=null&&n.hasOwnProperty("shape")){var s=m.onnx.TensorShapeProto.verify(n.shape);if(s)return"shape."+s}return null},e.fromObject=function(n){if(n instanceof m.onnx.TypeProto.SparseTensor)return n;var s=new m.onnx.TypeProto.SparseTensor;if(n.elemType!=null&&(s.elemType=n.elemType|0),n.shape!=null){if(typeof n.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=m.onnx.TensorShapeProto.fromObject(n.shape)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=0,i.shape=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=n.elemType),n.shape!=null&&n.hasOwnProperty("shape")&&(i.shape=m.onnx.TensorShapeProto.toObject(n.shape,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.SparseTensor"},e}(),t}(),a.OperatorSetIdProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.domain="",t.prototype.version=y.Long?y.Long.fromBits(0,0,!1):0,t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Le.create()),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(10).string(e.domain),e.version!=null&&Object.hasOwnProperty.call(e,"version")&&r.uint32(16).int64(e.version),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.OperatorSetIdProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.domain=e.string();break}case 2:{s.version=e.int64();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){return typeof e!="object"||e===null?"object expected":e.domain!=null&&e.hasOwnProperty("domain")&&!y.isString(e.domain)?"domain: string expected":e.version!=null&&e.hasOwnProperty("version")&&!y.isInteger(e.version)&&!(e.version&&y.isInteger(e.version.low)&&y.isInteger(e.version.high))?"version: integer|Long expected":null},t.fromObject=function(e){if(e instanceof m.onnx.OperatorSetIdProto)return e;var r=new m.onnx.OperatorSetIdProto;return e.domain!=null&&(r.domain=String(e.domain)),e.version!=null&&(y.Long?(r.version=y.Long.fromValue(e.version)).unsigned=!1:typeof e.version=="string"?r.version=parseInt(e.version,10):typeof e.version=="number"?r.version=e.version:typeof e.version=="object"&&(r.version=new y.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),r},t.toObject=function(e,r){r||(r={});var n={};if(r.defaults)if(n.domain="",y.Long){var s=new y.Long(0,0,!1);n.version=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.version=r.longs===String?"0":0;return e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.version!=null&&e.hasOwnProperty("version")&&(typeof e.version=="number"?n.version=r.longs===String?String(e.version):e.version:n.version=r.longs===String?y.Long.prototype.toString.call(e.version):r.longs===Number?new y.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},t}(),a.OperatorStatus=function(){var t={},o=Object.create(t);return o[t[0]="EXPERIMENTAL"]=0,o[t[1]="STABLE"]=1,o}(),a.FunctionProto=function(){function t(o){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.input=y.emptyArray,t.prototype.output=y.emptyArray,t.prototype.attribute=y.emptyArray,t.prototype.attributeProto=y.emptyArray,t.prototype.node=y.emptyArray,t.prototype.docString="",t.prototype.opsetImport=y.emptyArray,t.prototype.domain="",t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Le.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)r.uint32(34).string(e.input[n]);if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)r.uint32(42).string(e.output[n]);if(e.attribute!=null&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)r.uint32(50).string(e.attribute[n]);if(e.node!=null&&e.node.length)for(var n=0;n<e.node.length;++n)m.onnx.NodeProto.encode(e.node[n],r.uint32(58).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(66).string(e.docString),e.opsetImport!=null&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)m.onnx.OperatorSetIdProto.encode(e.opsetImport[n],r.uint32(74).fork()).ldelim();if(e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(82).string(e.domain),e.attributeProto!=null&&e.attributeProto.length)for(var n=0;n<e.attributeProto.length;++n)m.onnx.AttributeProto.encode(e.attributeProto[n],r.uint32(90).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof R||(e=R.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new m.onnx.FunctionProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(e.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(e.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(e.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(m.onnx.AttributeProto.decode(e,e.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(m.onnx.NodeProto.decode(e,e.uint32()));break}case 8:{s.docString=e.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(m.onnx.OperatorSetIdProto.decode(e,e.uint32()));break}case 10:{s.domain=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof R||(e=new R(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!y.isString(e.name))return"name: string expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r)if(!y.isString(e.input[r]))return"input: string[] expected"}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r)if(!y.isString(e.output[r]))return"output: string[] expected"}if(e.attribute!=null&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var r=0;r<e.attribute.length;++r)if(!y.isString(e.attribute[r]))return"attribute: string[] expected"}if(e.attributeProto!=null&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var r=0;r<e.attributeProto.length;++r){var n=m.onnx.AttributeProto.verify(e.attributeProto[r]);if(n)return"attributeProto."+n}}if(e.node!=null&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var r=0;r<e.node.length;++r){var n=m.onnx.NodeProto.verify(e.node[r]);if(n)return"node."+n}}if(e.docString!=null&&e.hasOwnProperty("docString")&&!y.isString(e.docString))return"docString: string expected";if(e.opsetImport!=null&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var r=0;r<e.opsetImport.length;++r){var n=m.onnx.OperatorSetIdProto.verify(e.opsetImport[r]);if(n)return"opsetImport."+n}}return e.domain!=null&&e.hasOwnProperty("domain")&&!y.isString(e.domain)?"domain: string expected":null},t.fromObject=function(e){if(e instanceof m.onnx.FunctionProto)return e;var r=new m.onnx.FunctionProto;if(e.name!=null&&(r.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=String(e.output[n])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=String(e.attribute[n])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");r.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n){if(typeof e.attributeProto[n]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");r.attributeProto[n]=m.onnx.AttributeProto.fromObject(e.attributeProto[n])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");r.node=[];for(var n=0;n<e.node.length;++n){if(typeof e.node[n]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");r.node[n]=m.onnx.NodeProto.fromObject(e.node[n])}}if(e.docString!=null&&(r.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if(typeof e.opsetImport[n]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");r.opsetImport[n]=m.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}return e.domain!=null&&(r.domain=String(e.domain)),r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.input=[],n.output=[],n.attribute=[],n.node=[],n.opsetImport=[],n.attributeProto=[]),r.defaults&&(n.name="",n.docString="",n.domain=""),e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=e.input[s]}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=e.output[s]}if(e.attribute&&e.attribute.length){n.attribute=[];for(var s=0;s<e.attribute.length;++s)n.attribute[s]=e.attribute[s]}if(e.node&&e.node.length){n.node=[];for(var s=0;s<e.node.length;++s)n.node[s]=m.onnx.NodeProto.toObject(e.node[s],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var s=0;s<e.opsetImport.length;++s)n.opsetImport[s]=m.onnx.OperatorSetIdProto.toObject(e.opsetImport[s],r)}if(e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.attributeProto&&e.attributeProto.length){n.attributeProto=[];for(var s=0;s<e.attributeProto.length;++s)n.attributeProto[s]=m.onnx.AttributeProto.toObject(e.attributeProto[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,xe.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},t}(),a}();Mu.exports=m});function zr(a,t){if(!a)throw new Error(typeof t=="string"?t:t())}function hn(a){return new TextDecoder().decode(a)}var we,wr,xi,Xe,ro,Ve,ot,z,dn,vr,_r,Or,fe=D(()=>{"use strict";Jn();ai();we=Nr(Ur());Sr();wr=class{static arraysEqual(t,o){if(t.length!==o.length)return!1;for(let e=0;e<t.length;e++)if(t[e]!==o[e])return!1;return!0}},xi=class{static preprocessInputShapes(t,o){let e=t.length===1?[1,t[0]]:t,r=o.length===1?[o[0],1]:o;return[e,r]}static postprocessOutputShape(t,o,e){o===1&&t.splice(t.length-2,1),e===1&&t.pop()}static calcMatMulShape(t,o){return t[1]!==o[0]?void 0:[t[0],o[1]]}},Xe=class a{static calcShape(t,o,e=!1){let r=t.length,n=o.length;if(r===0)return o;if(n===0)return t;let s=Math.max(t.length,o.length),i=new Array(s);if(e){if(r<2||n<2)return;let u=xi.calcMatMulShape([t[r-2],t[r-1]],[o[n-2],o[n-1]]);if(u===void 0)return;[i[s-2],i[s-1]]=u}for(let u=e?3:1;u<=s;u++){let l=r-u<0?1:t[r-u],c=n-u<0?1:o[n-u];if(l!==c&&l>1&&c>1)return;i[s-u]=Math.max(l,c)}return i}static index(t,o){let e=new Array(o.length);return a.fillIndex(t,o,e),e}static fillIndex(t,o,e){let r=t.length-o.length;for(let n=0;n<o.length;n++)e[n]=t[r+n]%o[n]}static calc(t,o,e,r,n){let s=a.calcShape(t.dims,o.dims);if(s){if(r&&!z.areEqual(s,t.dims))return;let i=z.size(s),u=r?t:new Be(s,n||t.type);if(s.length===0)u.set([],e(t.get([]),o.get([])));else{let l=new Array(s.length),c=new Array(t.dims.length),p=new Array(o.dims.length),b=0,x=0,v=!1,_=!1;t.dims.length===0&&(b=t.get([]),v=!0),o.dims.length===0&&(x=o.get([]),_=!0);let I;for(let L=0;L<i;L++){I=L;for(let B=s.length-1;B>=0;B--)l[B]=I%s[B],I=Math.floor(I/s[B]);v||(a.fillIndex(l,t.dims,c),b=t.get(c)),_||(a.fillIndex(l,o.dims,p),x=o.get(p)),u.set(l,e(b,x))}}return u}}static isValidBroadcast(t,o){let e=t.length,r=o.length;if(e>r)return!1;for(let n=1;n<=e;n++)if(t[e-n]!==1&&t[e-n]!==o[r-n])return!1;return!0}static getBroadcastDims(t,o){let e=t.length,r=[];for(let n=0;n<e;n++){let s=e-1-n,i=t[s]||1;(o[o.length-1-n]||1)>1&&i===1&&r.unshift(s)}return r}},ro=class{static getShapeOfGemmResult(t,o,e,r,n){if(t.length!==2||e.length!==2)throw new Error("shape need to be of size 2");let s,i,u;o?(s=t[1],i=t[0]):(s=t[0],i=t[1]);let l=-1;if(r?(u=e[0],l=1):(u=e[1],l=0),e[l]!==i)throw new Error("dimension mismatch");if(s<=0||u<=0||i<=0)throw new Error("invalid shape specified");if(n&&!Xe.isValidBroadcast(n,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,i]}},Ve=class a{static tensorDataTypeFromProto(t){switch(t){case we.onnx.TensorProto.DataType.INT8:return"int8";case we.onnx.TensorProto.DataType.UINT8:return"uint8";case we.onnx.TensorProto.DataType.BOOL:return"bool";case we.onnx.TensorProto.DataType.INT16:return"int16";case we.onnx.TensorProto.DataType.UINT16:return"uint16";case we.onnx.TensorProto.DataType.INT32:return"int32";case we.onnx.TensorProto.DataType.UINT32:return"uint32";case we.onnx.TensorProto.DataType.FLOAT:return"float32";case we.onnx.TensorProto.DataType.DOUBLE:return"float64";case we.onnx.TensorProto.DataType.STRING:return"string";case we.onnx.TensorProto.DataType.INT64:return"int32";case we.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${we.onnx.TensorProto.DataType[t]}`)}}static tensorDataTypeStringToEnum(t){switch(t){case"int8":return we.onnx.TensorProto.DataType.INT8;case"uint8":return we.onnx.TensorProto.DataType.UINT8;case"bool":return we.onnx.TensorProto.DataType.BOOL;case"int16":return we.onnx.TensorProto.DataType.INT16;case"uint16":return we.onnx.TensorProto.DataType.UINT16;case"int32":return we.onnx.TensorProto.DataType.INT32;case"uint32":return we.onnx.TensorProto.DataType.UINT32;case"float32":return we.onnx.TensorProto.DataType.FLOAT;case"float64":return we.onnx.TensorProto.DataType.DOUBLE;case"string":return we.onnx.TensorProto.DataType.STRING;case"int64":return we.onnx.TensorProto.DataType.INT64;case"uint64":return we.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${t}`)}}static tensorDimsFromProto(t){return t.map(o=>Yt.isLong(o)?o.toNumber():o)}static tensorValueTypeFromProto(t){return{tensorType:a.tensorDataTypeFromProto(t.elemType),shape:{dims:a.tensorDimsFromProto(t.shape.dim.map(o=>o.dimValue))}}}static tensorDimsFromORTFormat(t){let o=[];for(let e=0;e<t.dimsLength();e++)o.push(ot.longToNumber(t.dims(e)));return o}static tensorAttributesFromORTFormat(t){let o=[];for(let e=0;e<t.attributesLength();e++)o.push(t.attributes(e));return o}},ot=class{static longToNumber(t,o){return Yt.isLong(t)?t.toNumber():t instanceof S.Long?Yt.fromValue({low:t.low,high:t.high,unsigned:o??!1}).toNumber():t}static isLong(t){return Yt.isLong(t)||t instanceof S.Long}},z=class a{static size(t){return a.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,o){if(o<0||o>t.length)throw new Error(`invalid dimension of ${o} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return a.getSizeFromDimensionRange(t,o,t.length)}static sizeToDimension(t,o){if(o<0||o>t.length)throw new Error(`invalid dimension of ${o} for sizeToDimension as Tensor has ${t.length} dimensions.`);return a.getSizeFromDimensionRange(t,0,o)}static getSizeFromDimensionRange(t,o,e){let r=1;for(let n=o;n<e;n++){if(t[n]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");r*=t[n]}return r}static computeStrides(t){let o=t.length;if(o===0)return[];if(o===1)return[1];let e=new Array(o);e[o-1]=1,e[o-2]=t[o-1];for(let r=o-3;r>=0;--r)e[r]=e[r+1]*t[r+1];return e}static transpose(t){return t.slice().reverse()}static indicesToOffset(t,o,e){e===void 0&&(e=t.length);let r=0;for(let n=0;n<e;++n)r+=o[n]*t[n];return r}static offsetToIndices(t,o){let e=o.length;if(e===0)return[];if(e===1)return[t*o[0]];let r=new Array(o.length);for(let n=0;n<r.length-1;++n)r[n]=Math.floor(t/o[n]),t-=r[n]*o[n];return r[r.length-1]=t,r}static normalizeAxis(t,o){if(t<-o&&t>=o)throw new Error("unsupported axis for this operation.");return t<0?t+o:t}static normalizeAxes(t,o){return t.map(e=>this.normalizeAxis(e,o))}static incrementIndex(t,o,e){if(o.length===0||t.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(e===void 0)e=o.length;else if(e<=0||e>o.length)throw new Error("Incorrect axis to increment on");for(let r=e-1;r>=0&&(t[r]++,!(t[r]<o[r]));--r)t[r]=0}static calculateReshapedDims(t,o){if(o.length===0){if(t.length===0||a.size(t)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let e=o.length,r=new Array(e),n=-1,s=1;for(let u=0;u<e;u++){if(o[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(o[u]===-1){if(n!==-1)throw new Error("at most one dimension in shape hints can be -1");n=u}else{if(o[u]===0){if(u>=t.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");r[u]=t[u]}else r[u]=o[u];s*=r[u]}}let i=a.size(t);if(n!==-1){if(i%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${o}]`);r[n]=i/s}else if(s!==i)throw new Error("reshapedDims and originalDims don't have matching sizes");return r}static sortBasedOnPerm(t,o){return o?o.map(e=>t[e]):t.slice().reverse()}static padShape(t,o){let e=t.length;return t.map((r,n)=>r+o[n]+o[n+e])}static areEqual(t,o){return t.length!==o.length?!1:t.every((e,r)=>e===o[r])}static validateDimsAndCalcSize(t){if(t.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let o=1;for(let e of t){if(!Number.isInteger(e))throw new TypeError(`Invalid shape: ${e} is not an integer`);if(e<0||e>2147483647)throw new TypeError(`Invalid shape: length ${e} is not allowed`);o*=e}return o}static flattenShape(t,o){o<0&&(o+=t.length);let e=t.reduce((s,i)=>s*i,1),r=t.slice(o).reduce((s,i)=>s*i,1);return[e/r,r]}static squeezeShape(t,o){let e=new Array;o=a.normalizeAxes(o,t.length);for(let r=0;r<t.length;r++){let n=o.indexOf(r)>=0;if(n&&t[r]!==1)throw new Error("squeeze an axis of size different than 1");(o.length===0&&t[r]>1||o.length>0&&!n)&&e.push(t[r])}return e}static unsqueezeShape(t,o){let e=new Array(t.length+o.length);e.fill(0);for(let n=0;n<o.length;n++){let s=a.normalizeAxis(o[n],e.length);if(s>=e.length)throw new Error("'axes' has an out of range axis");if(e[s]!==0)throw new Error("'axes' has a duplicate axis");e[s]=1}let r=0;for(let n=0;n<e.length;n++)e[n]===0&&(e[n]=t[r++]);if(r!==t.length)throw new Error("the unsqueezed dimension could not be established");return e}},dn=class a{static splitShape(t,o,e,r){if(e.length===0){if(!r)throw new Error("need to know number of outputs when the 'split' attribute is not specified");a.determineSplit(t[o],r,e)}let n=[],s=[0];for(let i=0;i<e.length;++i){i!==0&&s.push(s[i-1]+e[i-1]);let u=t.slice();u[o]=e[i],n.push(u)}return[n,s]}static determineSplit(t,o,e){if(t%o!==0)throw new Error("cannot split tensor to equal sized parts");for(let r=0;r<o;++r)e.push(t/o)}},vr=class a{static adjustPoolAttributes(t,o,e,r,n,s){if(!t&&e.length!==o.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let i=0;i<o.length-2;i++)i>=e.length?e.push(o[i+2]):e[i]=o[i+2];for(let i=0;i<e.length;i++)if(i<r.length){if(r[i]<0)throw new Error("strides should be greater than or equal to 1")}else r.push(1);for(let i=0;i<e.length;i++)if(i<n.length){if(n[i]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let i=0;i<e.length*2;i++)if(i<s.length){if(s[i]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let i=0;i<e.length;i++){if(e[i]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[i]>=e[i]||s[i+e.length]>=e[i])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,o,e,r,n,s){if(s){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let i=0;i<t.length-2;i++)a.adjustPadAndReturnShape(t[i+2],o[i],e[i],r[i],n,i,i+t.length-2,s)}}static computePoolOutputShape(t,o,e,r,n,s,i){if(o.length<=0)throw new Error("input shape must be of size greater than 0");let u=[o[0],o[1]];return a.computeShapeHelper(t,o,u,e,r,n,s,i),u}static computeConvOutputShape(t,o,e,r,n,s,i){if(t.length<=0||o.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],o[0]];return a.computeShapeHelper(!1,t,u,e,r,n,s,i),u}static computeShapeHelper(t,o,e,r,n,s,i,u){if(t)for(let l=0;l<o.length-2;l++)e.push(1);else for(let l=0;l<o.length-2;l++)e.push(a.adjustPadAndReturnShape(o[l+2],r[l],n[l],s[l],i,l,l+o.length-2,u))}static adjustPadAndReturnShape(t,o,e,r,n,s,i,u){let l=e*(r-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return n[s]=0,n[i]=0,Math.floor((t-l)/o+1);case"SAME_LOWER":case"SAME_UPPER":if(e!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+o-1)/o-1)*o+r-t;return n[s]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),n[i]=p-n[s],Math.floor((t+p-r)/o+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[i]-l)/o+1)}},_r=-34028234663852886e22,Or=34028234663852886e22});function rh(a){switch(a){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${a}`)}}function Gu(a){switch(a){case ne.onnx.TensorProto.DataType.UINT8:case ne.onnx.TensorProto.DataType.INT8:case ne.onnx.TensorProto.DataType.BOOL:return 1;case ne.onnx.TensorProto.DataType.UINT16:case ne.onnx.TensorProto.DataType.INT16:return 2;case ne.onnx.TensorProto.DataType.FLOAT:case ne.onnx.TensorProto.DataType.INT32:case ne.onnx.TensorProto.DataType.UINT32:return 4;case ne.onnx.TensorProto.DataType.INT64:case ne.onnx.TensorProto.DataType.DOUBLE:case ne.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ne.onnx.TensorProto.DataType[a]}`)}}function nh(a,t){return new(Wu(t))(a)}function Wu(a){switch(a){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function vi(a,t){if(t===ne.onnx.TensorProto.DataType.INT64||t===wi.TensorDataType.INT64){if(a.greaterThanOrEqual(2147483648)||a.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(t===ne.onnx.TensorProto.DataType.UINT32||t===wi.TensorDataType.UINT32||t===ne.onnx.TensorProto.DataType.UINT64||t===wi.TensorDataType.UINT64){if(a.greaterThanOrEqual(4294967296)||a.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ne.onnx.TensorProto.DataType[t]}`);return a.toNumber()}function Uu(a,t,o){switch(t){case ne.onnx.TensorProto.DataType.BOOL:case ne.onnx.TensorProto.DataType.UINT8:return a.getUint8(o);case ne.onnx.TensorProto.DataType.INT8:return a.getInt8(o);case ne.onnx.TensorProto.DataType.UINT16:return a.getUint16(o,!0);case ne.onnx.TensorProto.DataType.INT16:return a.getInt16(o,!0);case ne.onnx.TensorProto.DataType.FLOAT:return a.getFloat32(o,!0);case ne.onnx.TensorProto.DataType.INT32:return a.getInt32(o,!0);case ne.onnx.TensorProto.DataType.UINT32:return a.getUint32(o,!0);case ne.onnx.TensorProto.DataType.INT64:return vi(Yt.fromBits(a.getUint32(o,!0),a.getUint32(o+4,!0),!1),t);case ne.onnx.TensorProto.DataType.DOUBLE:return a.getFloat64(o,!0);case ne.onnx.TensorProto.DataType.UINT64:return vi(Yt.fromBits(a.getUint32(o,!0),a.getUint32(o+4,!0),!0),t);default:throw new Error(`cannot read from DataView for type ${ne.onnx.TensorProto.DataType[t]}`)}}var zu,ne,wi,Be,Sr=D(()=>{"use strict";zu=Nr(Ls());ai();ln();ne=Nr(Ur());fe();wi=H.experimental.fbs,Be=class a{constructor(t,o,e,r,n,s=zu.Guid.create()){this.dims=t;this.type=o;this.dataProvider=e;this.asyncDataProvider=r;this.cache=n;this.dataId=s;this.size=z.validateDimsAndCalcSize(t);let i=this.size,u=e===void 0&&r===void 0&&n===void 0;if(n!==void 0&&n.length!==i)throw new RangeError("Input dims doesn't match data length.");if(o==="string"){if(n!==void 0&&(!Array.isArray(n)||!n.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(i))}else{if(n!==void 0){let l=Wu(o);if(!(n instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(i*rh(o));this.cache=nh(l,o)}}}get data(){if(this.cache===void 0){let t=this.dataProvider(this.dataId);if(t.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=t}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(t){return this.data[z.indicesToOffset(t,this.strides)]}set(t,o){this.data[z.indicesToOffset(t,this.strides)]=o}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=z.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let o=Ve.tensorDataTypeFromProto(t.dataType),e=Ve.tensorDimsFromProto(t.dims),r=new a(e,o);if(o==="string")t.stringData.forEach((n,s)=>{r.data[s]=hn(n)});else if(t.rawData&&typeof t.rawData.byteLength=="number"&&t.rawData.byteLength>0){let n=r.data,s=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),i=Gu(t.dataType),u=t.rawData.byteLength/i;if(t.rawData.byteLength%i!==0)throw new Error("invalid buffer length");if(n.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Uu(s,t.dataType,l*i);n[l]=c}}else{let n;switch(t.dataType){case ne.onnx.TensorProto.DataType.FLOAT:n=t.floatData;break;case ne.onnx.TensorProto.DataType.INT32:case ne.onnx.TensorProto.DataType.INT16:case ne.onnx.TensorProto.DataType.UINT16:case ne.onnx.TensorProto.DataType.INT8:case ne.onnx.TensorProto.DataType.UINT8:case ne.onnx.TensorProto.DataType.BOOL:n=t.int32Data;break;case ne.onnx.TensorProto.DataType.INT64:n=t.int64Data;break;case ne.onnx.TensorProto.DataType.DOUBLE:n=t.doubleData;break;case ne.onnx.TensorProto.DataType.UINT32:case ne.onnx.TensorProto.DataType.UINT64:n=t.uint64Data;break;default:throw new Error("unspecific error")}if(n==null)throw new Error("failed to populate data from a tensorproto value");let s=r.data;if(s.length!==n.length)throw new Error("array length mismatch");for(let i=0;i<n.length;i++){let u=n[i];Yt.isLong(u)?s[i]=vi(u,t.dataType):s[i]=u}}return r}static fromData(t,o,e){return new a(o,e,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let o=Ve.tensorDimsFromORTFormat(t),e=Ve.tensorDataTypeFromProto(t.dataType()),r=new a(o,e);if(e==="string")for(let n=0;n<t.stringDataLength();n++)r.data[n]=t.stringData(n);else if(t.rawDataArray()&&typeof t.rawDataLength()=="number"&&t.rawDataLength()>0){let n=r.data,s=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),i=Gu(t.dataType()),u=t.rawDataLength()/i;if(t.rawDataLength()%i!==0)throw new Error("invalid buffer length");if(n.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Uu(s,t.dataType(),l*i);n[l]=c}}return r}}});function Y(a){return a===1?oh:ih}function Vu(a){let t=Y(a);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Hu(a){let t=Y(a);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function ju(a,t){let o=Y(a);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${o.output} = result;
  }
  `}var oh,ih,ve=D(()=>{"use strict";oh={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},ih={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var ae=D(()=>{"use strict"});async function _i(a,t=e=>0,o){return new Promise((e,r)=>{let n=0,s=()=>{if(a()){e();return}n++;let i=t(n);if(o!=null&&n>=o){r();return}setTimeout(s,i)};s()})}function no(a){return zr(typeof a<"u"&&a.length!==0,()=>"empty string found for sampler name"),"get"+a.charAt(0).toUpperCase()+a.slice(1)}function qu(a){return zr(typeof a<"u"&&a.length!==0,()=>"empty string found for sampler name"),"get"+a.charAt(0).toUpperCase()+a.slice(1)+"AtOutCoords"}function Wr(a,t){let o=JSON.parse(JSON.stringify(a));return o=t,o}function Vr(a,t){return t.map(o=>a[o]).join(", ")}function Ke(a){if(a<=1)return"int";if(a===2)return"ivec2";if(a===3)return"ivec3";if(a===4)return"ivec4";if(a===5)return"ivec5";if(a===6)return"ivec6";throw Error(`GPU for rank ${a} is not yet supported`)}function Et(a=6){return["x","y","z","w","u","v"].slice(0,a)}var Rt=D(()=>{"use strict";fe()});function ah(a,t){return Et(t).map(o=>`${a}.${o}`)}function Hr(a,t){return t===1?[a]:ah(a,t)}function Mt(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var Ir=D(()=>{"use strict";Rt()});function uh(a,t,o){if(a===0)return"false";if(a===1)return`rc > ${t[0]}`;let e="";for(let r=a-2;r<a;r++)e+=`${o[r]} >= ${t[r-a+2]}`,r<a-1&&(e+="||");return e}function lh(a,t){let o=a.length;if(o===0)return"getA(), 0, 0, 0";if(o===1)return`getA(rc),
            rc + 1 >= ${a[0]} ? 0. : getA(rc + 1),
            0, 0`;let e="r, c",r="r, cp1",n="rp1, c",s="rp1, cp1",i="";if(o>2)for(let u=0;u<o-2;++u)i=i+`${t[u]},`;return`getA(${i}${e}),
          rEdge ? 0. : getA(${i}${n}),
          cEdge ? 0. : getA(${i}${r}),
          rEdge || cEdge ? 0. : getA(${i}${s})`}function fh(a,t,o,e){return a===0||a===1?"":`
    int r = ${t[a-2]};
    int c = ${t[a-1]};
    int rp1 = ${t[a-2]} + 1;
    int cp1 = ${t[a-1]} + 1;
    bool rEdge = rp1 >= ${e};
    bool cEdge = cp1 >= ${o};
    `}var Yu,sh,Xu,Ku=D(()=>{"use strict";ve();ae();Rt();Ir();Yu={name:"pack",inputNames:["A"],inputTypes:[1]},sh=(a,t)=>{let o=Y(a.session.backend.glContext.version),e=t.dims,r=e.length,n=t.dims.length,s=Ke(n),i=Hr("rc",n),u=fh(n,i,e[e.length-2],e[e.length-1]),l;r===0?l=[1,1]:r===1?l=[e[0],1]:l=[e[n-1],e[n-2]];let c=uh(n,l,i),p=lh(e,i),b=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${c}) {
            ${o.output} = vec4(0);
          } else {
            ${u}

            ${o.output} = vec4(${p});
          }
        }
      `;return{...Yu,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:b}},Xu=(a,t)=>({...Yu,get:()=>sh(a,t)})});function Oi(a){if(a.length===0)return[1,1,1];let t=1;for(let o=0;o<a.length-2;++o)t*=a[o];return[t,a.length>1?a[a.length-2]:1,a[a.length-1]]}function Zu(a,t){let o=!1;return a.length===0||t.length===0?o=!0:a.length<2||t.length<2?o=a[a.length-1]===t[t.length-1]:o=a[a.length-1]===t[t.length-1]&&a[a.length-2]===t[t.length-2],o}function dh(a){let t=z.computeStrides(a),o=["b","r","c"],e="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((n,s)=>{let i=`int ${o[s]} = ${e} / ${n}`,u=s===t.length-1?`int ${o[s+1]} = ${e} - ${o[s]} * ${n}`:`index -= ${o[s]} * ${n}`;return`${i}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function hh(a){let t=z.computeStrides(a);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var ch,ph,Ju,Qu=D(()=>{"use strict";fe();ve();ae();Ir();ch=a=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${a}`}),ph=(a,t,o,e)=>{let r=t.dims,n=e,s="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let i=Y(a.session.backend.glContext.version),u=`
      ${dh(r)}
      ${hh(n)}
      ${Mt()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${n[2]};
        int cols = ${n[1]};

        ${s}
        ${i.output} = result;
      }
    `;return{...o,output:{dims:n,type:t.type,textureType:2},shaderSource:u,hasMain:!0}},Ju=(a,t,o)=>{let e=ch(o);return{...e,get:()=>ph(a,t,e,o)}}});var Si,el=D(()=>{"use strict";ve();ae();Si=(a,t)=>{let o=t.shape,e=Y(a.session.backend.glContext.version),r=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${e.texture2D}(X,TexCoords).r;
      ${e.output} = encodeAsUint8(value);
    }`,n={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:o,type:t.tensor.type,textureType:3},shaderSource:r,hasMain:!0};return a.executeProgram(n,[t.tensor])}});function bh(a,t){if(a===1)return"rc";let o="";for(let e=0;e<a;e++)o+=t[e],e<a-1&&(o+=",");return o}var tl,mh,rl,nl=D(()=>{"use strict";ve();ae();Rt();Ir();tl={name:"unpack",inputNames:["A"],inputTypes:[2]},mh=(a,t)=>{let o=t.dims.length,e=Hr("rc",o),r=e.slice(-2),n=Ke(o),s=Mt(),u=t.dims.length===0?"":bh(o,e),l=o<=1?"rc":`vec2(${r.join(",")})`,c=Y(a.session.backend.glContext.version),p=`
    ${s}
    void main() {
      ${n} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...tl,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:p}},rl=(a,t)=>({...tl,get:()=>mh(a,t)})});var oo,mn,io,bn=D(()=>{"use strict";pt();oo=class{constructor(t,o=1){if(o===1)this.internalFormat=t.R32F,this.format=t.RED,this.textureType=t.FLOAT,this.channelSize=o;else if(o===4)this.internalFormat=t.RGBA32F,this.format=t.RGBA,this.textureType=t.FLOAT,this.channelSize=o;else throw new Error(`Invalid number of channels: ${o}`)}encode(t,o){let e,r;return t.constructor!==Float32Array&&(pe.warning("Encoder","data was not of type Float32; creating new Float32Array"),r=new Float32Array(t)),o*this.channelSize>t.length?(pe.warning("Encoder","Source data too small. Allocating larger array"),r=t,e=this.allocate(o*this.channelSize),r.forEach((n,s)=>e[s]=n)):(r=t,e=r),e}allocate(t){return new Float32Array(t*4)}decode(t,o){return this.channelSize===1?t.filter((r,n)=>n%4===0).subarray(0,o):t.subarray(0,o)}},mn=class{constructor(t,o=1,e){if(o!==1&&o!==4)throw new Error(`Invalid number of channels: ${o}`);this.internalFormat=t.RGBA,this.format=t.RGBA,this.channelSize=o,this.textureType=e||t.FLOAT}encode(t,o){let e=t;return this.channelSize===1&&(pe.verbose("Encoder","Exploding into a larger array"),e=this.allocate(o),t.forEach((r,n)=>e[n*4]=r)),e}allocate(t){return new Float32Array(t*4)}decode(t,o){return this.channelSize===1?t.filter((r,n)=>n%4===0).subarray(0,o):t.subarray(0,o)}},io=class{constructor(t,o=1){this.channelSize=4;if(o===1)this.internalFormat=t.ALPHA,this.format=t.ALPHA,this.textureType=t.UNSIGNED_BYTE,this.channelSize=o;else if(o===4)this.internalFormat=t.RGBA,this.format=t.RGBA,this.textureType=t.UNSIGNED_BYTE,this.channelSize=o;else throw new Error(`Invalid number of channels: ${o}`)}encode(t,o){return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}allocate(t){return new Uint8Array(t*this.channelSize)}decode(t,o){if(t instanceof Uint8Array)return t.subarray(0,o);throw new Error(`Invalid array type: ${t.constructor}`)}}});var gn,ol,Ii,il=D(()=>{"use strict";fe();ae();gn=(a,t,o)=>{let e=o===0||o===1?1:4,r=o===2,n=o===1||o===2,s=o===4?t.length-1:void 0,i=o===4?t.map((u,l)=>l===t.length-1?u*4:u):void 0;return Ii(a,t,e,i,{isPacked:r,reverseWH:n,breakAxis:s})},ol=(a,t,o)=>{let e=gn(a,t,o);return[e.width,e.height]},Ii=(a,t,o=1,e,r)=>{let n=!!(r&&r.isPacked),[s,i]=a.computeTextureWH(n&&e||t,r),u=t.length,l=t.slice(0);if(u===0&&(l=[1]),o===1)e=t;else if(n){if(o!==4)throw new Error("a packed texture must be 4-channel");e=t,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!e)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:i,channels:o,isPacked:n,shape:l,strides:z.computeStrides(l),unpackedShape:e,reversedWH:r&&r.reverseWH}}});var yh,ao,sl=D(()=>{"use strict";pt();Sr();fe();Ku();Qu();el();nl();bn();il();ae();yh=(a,t)=>{let o=t.map(r=>`${r.unpackedShape.join(",")};${r.width}x${r.height}`).join("_"),e=a.name;return a.cacheHint&&(e+="["+a.cacheHint+"]"),e+=":"+o,e},ao=class{constructor(t){this.session=t;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(t,o){return ol(this.session.layoutStrategy,t,o)}executeProgram(t,o){if(o.length<t.inputNames.length)throw new Error(`Input size mustn't be less than ${t.inputNames.length}.`);if(t.inputNames.length!==t.inputTypes.length)throw new Error("input names size does not match input types");let e=[];for(let l=0;l<t.inputNames.length;++l)e[l]=this.getOrCreateTextureData(o[l],t.inputTypes[l]);let r=yh(t,e),n=this.session.programManager.getArtifact(r),s=n?n.programInfo:typeof t.get=="function"?t.get():t,i=gn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(i,s.output.type);return n||(n=this.session.programManager.build(s,e,u),this.session.programManager.setArtifact(r,n)),this.runProgram(n,e,u),u}run(t,o){return this.executeProgram(t,o).tensor}runProgram(t,o,e){for(let r=0;r<o.length;++r)if(!!o[r].isPacked!=(t.programInfo.inputTypes[r]===2))throw new Error(`input[${r}] property packed inconsistent`);if(!!e.isPacked!=(t.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(t,o,e)}getOrCreateTextureData(t,o){let e=this.getTextureData(t.dataId,o===2);if(!e&&(e=this.getTextureData(t.dataId,o!==2),e))return o===2?this.pack(e):this.unpack(e);if(!e){let r=gn(this.session.layoutStrategy,t.dims,o);if(o===4){let i=t.dims;if(i.length===4){let u=[i[0],Math.ceil(i[1]*i[2]*i[3]/4)],l=gn(this.session.layoutStrategy,u,o),c=t.numberData;if(i[1]*i[2]*i[3]%4!==0){let p=i[0],b=i[1]*i[2]*i[3],x=Math.ceil(b*1/4)*4,v=p*x;c=new Float32Array(v);for(let _=0;_<p;++_){let I=_*b,L=_*x+_%1*b;c.set(t.numberData.subarray(I,I+b),L)}}return this.createTextureData(l,t.type,c,t,1)}}if(o===2){let n=Ii(this.session.layoutStrategy,t.dims,1,[],{reverseWH:!0}),s=this.createTextureData(n,t.type,t.numberData,t,1);e=this.pack(s)}else e=this.createTextureData(r,t.type,t.numberData,t,1)}return e}createTextureDataFromLayoutBindTensor(t,o,e,r){return this.createTextureData(t,o,e,r,1)}createTextureData(t,o,e,r,n){pe.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(t)}]`);let s=this.session.textureManager.createTextureFromLayout(o,t,e,n);return this.createTextureDataFromTexture(t,o,s,r)}reshapeUnpacked(t,o){let e=this.getOrCreateTextureData(t,0),r={channels:e.channels,height:e.height,width:e.width,shape:o.length!==0?o:[1],strides:z.computeStrides(o),unpackedShape:o};return this.createTextureDataFromTexture(r,t.type,e.texture).tensor}reshapePacked(t,o){let e=this.getOrCreateTextureData(t,2);if(Zu(t.dims,o)){let l={channels:e.channels,height:e.height,width:e.width,shape:o.length!==0?o:[1],strides:z.computeStrides(o),unpackedShape:o,isPacked:!0};return this.createTextureDataFromTexture(l,t.type,e.texture).tensor}let r=Oi(t.dims),n=Oi(o),s=this.reshapePacked(t,r),i=this.run(Ju(this,s,n),[s]);return this.reshapePacked(i,o)}cast(t,o){let e=this.getOrCreateTextureData(t,0);return this.createTextureDataFromTexture(e,o,e.texture).tensor}createTextureDataFromTexture(t,o,e,r,n){let s={...t,tensor:r||new Be(t.unpackedShape,o,i=>this.readTexture(s),async i=>this.readTextureAsync(s),void 0,n),texture:e};return this.setTextureData(s.tensor.dataId,s,t.isPacked),s}getTextureData(t,o=!1){return this.session.isInitializer(t)?this.session.getTextureData(t,o):o?this.packedTextureDataCache.get(t):this.unpackedTextureDataCache.get(t)}setTextureData(t,o,e=!1){this.session.isInitializer(t)?this.session.setTextureData(t,o,e):(e?this.packedTextureDataCache:this.unpackedTextureDataCache).set(t,o)}isTextureLayoutCached(t,o=!1){return!!this.getTextureData(t.dataId,o)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(t=>this.session.textureManager.releaseTexture(t)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(t=>this.session.textureManager.releaseTexture(t)),this.unpackedTextureDataCache=new Map}readTexture(t){return t.isPacked?this.readTexture(this.unpack(t)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(t,t.tensor.type,t.channels):this.session.textureManager.readUint8TextureAsFloat(Si(this,t))}async readTextureAsync(t){return t.isPacked?this.readTextureAsync(this.unpack(t)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(t,t.tensor.type,t.channels):this.session.textureManager.readUint8TextureAsFloat(Si(this,t))}pack(t){return this.executeProgram(Xu(this,t.tensor),[t.tensor])}unpack(t){return this.executeProgram(rl(this,t.tensor),[t.tensor])}}});var Ai,re,Me=D(()=>{"use strict";Ai=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=a=>new Ai(a)});var ul,ll,fl,Th,xh,cl=D(()=>{"use strict";Me();ve();ae();ul={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},ll=(a,t,o)=>(xh(t),[a.run({...ul,cacheHint:o.cacheKey,get:()=>Th(a,t,o)},t)]),fl=a=>{let t=a.attributes.getFloat("epsilon",1e-5),o=a.attributes.getFloat("momentum",.9),e=a.attributes.getInt("spatial",1);return re({epsilon:t,momentum:o,spatial:e})},Th=(a,t,o)=>{let e=Y(a.session.backend.glContext.version),r=t[0].dims.length,[n,s]=a.calculateTextureWidthAndHeight(t[1].dims,0),i=`
  float process(int[${r}] indices) {
    vec2 position = offsetToCoords(indices[1], ${n}, ${s});
    float scale = getColorAsFloat(${e.texture2D}(Scale, position));
    float mean = getColorAsFloat(${e.texture2D}(Mean, position));
    float variance = getColorAsFloat(${e.texture2D}(Variance, position));
    float b = getColorAsFloat(${e.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${o.epsilon})) ) + b;
  }`;return{...ul,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:i}},xh=a=>{if(!a||a.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let t=a[0],o=a[1],e=a[2],r=a[3],n=a[4];if(t.dims.length<3||o.dims.length!==1||e.dims.length!==1||r.dims.length!==1||n.dims.length!==1)throw new Error("invalid input shape.");if(o.dims[0]!==t.dims[1]||e.dims[0]!==t.dims[1]||r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1])throw new Error("invalid input shape.");if(t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||n.type!=="float32"&&n.type!=="float64")throw new Error("invalid input tensor types.")}});var so,bt,G,yn,uo,Xt=D(()=>{"use strict";so=class{constructor(t,o,e,r){this.glContext=t;this.programInfo=o;this.inputTextureLayouts=e;this.outputTextureLayout=r}},bt=class{constructor(t){this.context=t}},G=class{constructor(t,o){this.routineBody=t;this.dependencies=o}},yn=class{constructor(t,o,e){this.name=t;e?this.dependencies=e:this.dependencies=[],o&&(this.routineBody=o)}addDependency(t){t&&this.dependencies.push(t)}},uo=class{static returnOrderedNodes(t){if(!t||t.length===0)return[];if(t.length===1)return t;let o=new Set,e=new Set,r=new Array;return this.createOrderedNodes(t,o,e,r),r}static createOrderedNodes(t,o,e,r){for(let n=0;n<t.length;++n)this.dfsTraverse(t[n],o,e,r)}static dfsTraverse(t,o,e,r){if(!t||e.has(t.name))return;if(o.has(t.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");o.add(t.name);let n=t.dependencies;if(n&&n.length>0)for(let s=0;s<n.length;++s)this.dfsTraverse(n[s],o,e,r);r.push(t),e.add(t.name),o.delete(t.name)}}});function vh(){let a="add_";return{body:`
  float ${a}(float a, float b) {
    return a + b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:a,type:0}}function _h(){let a="div_";return{body:`
  float ${a}(float a, float b) {
    return a / b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:a,type:0}}function Oh(){let a="mul_";return{body:`
  float ${a}(float a, float b) {
    return a * b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:a,type:0}}function Sh(){let a="sub_";return{body:`
  float ${a}(float a, float b) {
    return a - b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:a,type:0}}function Ih(){let a="equal_";return{body:`
  float ${a}(float a, float b) {
    return float(a == b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:a,type:0}}function Ah(){let a="greater_";return{body:`
  float ${a}(float a, float b) {
    return float(a > b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:a,type:0}}function Eh(){let a="less_";return{body:`
  float ${a}(float a, float b) {
    return float(a < b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:a,type:0}}function Ph(){let a="and_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:a,type:0}}function Dh(){let a="or_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:a,type:0}}function Lh(){let a="xor_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:a,type:0}}function Ch(){return Bh("pow")}function Fh(){let a="prelu_";return{body:`
  float ${a}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:a,type:0}}function Bh(a){let t=`${a}_`;return{body:`
  float ${t}(float a, float b) {
    return ${a}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${a}(v1, v2);
  }
  `,name:t,type:0}}var gt,$h,pl,dl,hl,ml,bl,gl,yl,Tl,xl,wl,vl,_l,Ol=D(()=>{"use strict";fe();Xt();ve();ae();gt=(a,t,o,e=t[0].type,r)=>{let n=a.session.pack?2:0;return{name:o.name,inputNames:["A","B"],inputTypes:[n,n],cacheHint:r,get:()=>$h(a,t,o,e)}},$h=(a,t,o,e=t[0].type)=>{let r=a.session.pack?2:0,n=!z.areEqual(t[0].dims,t[1].dims),s=t[0].dims,i=a.session.pack;if(n){let c=Xe.calcShape(t[0].dims,t[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");s=c;let p=s.length,b=t[0].dims.length!==0?t[0].dims.length:1,x=t[1].dims.length!==0?t[1].dims.length:1,v=t[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",_=t[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",I=Y(a.session.backend.glContext.version),L=i?`
      ${o.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${o.name}(a, b);
        ${I.output} = result;
      }`:`
      ${o.body}
      float process(int indices[${p}]) {
        int aindices[${b}];
        int bindices[${x}];
        ${v}
        ${_}
        return ${o.name}(_A(aindices), _B(bindices));
      }`;return{name:o.name,inputNames:["A","B"],inputTypes:[r,r],output:{dims:s,type:e,textureType:r},shaderSource:L,hasMain:i}}let u=Y(a.session.backend.glContext.version),l=`
    ${o.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${o.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:o.name,inputNames:["A","B"],inputTypes:[r,r],output:{dims:t[0].dims,type:e,textureType:r},shaderSource:l,hasMain:!0}},pl=(a,t)=>[a.run(gt(a,t,vh()),t)],dl=(a,t)=>[a.run(gt(a,t,Ph(),"bool"),t)],hl=(a,t)=>[a.run(gt(a,t,_h()),t)],ml=(a,t)=>[a.run(gt(a,t,Ih(),"bool"),t)],bl=(a,t)=>[a.run(gt(a,t,Ah(),"bool"),t)],gl=(a,t)=>[a.run(gt(a,t,Eh(),"bool"),t)],yl=(a,t)=>[a.run(gt(a,t,Oh()),t)],Tl=(a,t)=>[a.run(gt(a,t,Dh(),"bool"),t)],xl=(a,t)=>[a.run(gt(a,t,Ch()),t)],wl=(a,t)=>[a.run(gt(a,t,Fh()),t)],vl=(a,t)=>[a.run(gt(a,t,Sh()),t)],_l=(a,t)=>[a.run(gt(a,t,Lh(),"bool"),t)]});var Sl,Il,Nh,Al=D(()=>{"use strict";fe();Sl=(a,t,o)=>(Nh(t),[a.cast(t[0],o)]),Il=a=>Ve.tensorDataTypeFromProto(a.attributes.getInt("to")),Nh=a=>{if(!a||a.length!==1)throw new Error("Cast requires 1 input.");if(a[0].type==="string")throw new Error("Invalid input type.")}});var Rh,Mh,El,lo,Pl=D(()=>{"use strict";ve();ae();Rt();Ir();Rh=(a,t)=>({name:"Concat (packed)",inputNames:Array.from({length:a},(o,e)=>`X${e}`),inputTypes:Array(a).fill(2),cacheHint:t}),Mh=(a,t,o,e)=>{let r=o[0].dims.slice();if(e>=r.length||e<-1*r.length)throw new Error("axis specified for concat doesn't match input dimensionality");e<0&&(e=r.length+e);let n=r.slice(0);for(let j=1;j<o.length;j++){let U=o[j].dims.slice();for(let ie=0;ie<r.length;ie++)if(ie===e)n[e]+=U[ie];else if(r[ie]!==U[ie])throw new Error("non concat dimensions must match")}let s=n.length,i=Hr("coords",s),u=Ke(s),l=Mt(),c=o.map(j=>j.dims),p=Et(s),b=new Array(c.length-1);b[0]=c[0][e];for(let j=1;j<b.length;j++)b[j]=b[j-1]+c[j][e];let x=p[e],v=p.slice(-2),_=p.join(),I=`if (${x} < ${b[0]}) {
        return getChannel(
            getX0(${_}), vec2(${v.join()}));
        }`;for(let j=1;j<b.length;j++){let U=b[j-1];I+=`
            if (${x} < ${b[j]}  && ${x} >= ${b[j-1]}) {
              return getChannel(
                getX${j}(${lo(p,x,U)}),
                vec2(${lo(v,x,U)}));
            }`}let L=b.length,B=b[b.length-1];I+=`
            return getChannel(
              getX${L}(${lo(p,x,B)}),
              vec2(${lo(v,x,B)}));`;let F=Y(a.session.backend.glContext.version),J=`
          ${l}
          float getValue(${p.map(j=>"int "+j)}) {
            ${I}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[s-1]};
            coords.${p[s-1]} = coords.${p[s-2]};
            coords.${p[s-2]} = lastDim;

            vec4 result = vec4(getValue(${i}), 0., 0., 0.);

            ${i[s-1]} = ${i[s-1]} + 1;
            if (${i[s-1]} < ${n[s-1]}) {
              result.g = getValue(${i});
            }

            ${i[s-2]} = ${i[s-2]} + 1;
            if (${i[s-2]} < ${n[s-2]}) {
              result.a = getValue(${i});
            }

            ${i[s-1]} = ${i[s-1]} - 1;
            if (${i[s-2]} < ${n[s-2]} &&
                ${i[s-1]} < ${n[s-1]}) {
              result.b = getValue(${i});
            }
            ${F.output} = result;
          }
        `;return{...t,output:{dims:n,type:o[0].type,textureType:2},shaderSource:J,hasMain:!0}},El=(a,t,o)=>{let e=Rh(t.length,o.cacheKey);return{...e,get:()=>Mh(a,e,t,o.axis)}},lo=(a,t,o)=>{let e=a.indexOf(t);return a.map((n,s)=>s===e?`${n} - ${o}`:n).join()}});var Dl,Gh,Uh,zh,Ll,Wh,Vh,Hh,Cl,jh,Fl=D(()=>{"use strict";Me();ae();Pl();Dl=(a,t,o)=>(jh(t),a.session.pack&&t[0].dims.length>1?[a.run(El(a,t,o),t)]:[a.run(zh(a,t,o),t)]),Gh=(a,t)=>({name:"Concat",inputNames:Array.from({length:a},(o,e)=>`X${e}`),inputTypes:Array(a).fill(0),cacheHint:t}),Uh=(a,t,o,e)=>{let r=o[0].dims.slice();if(e>=r.length||e<-1*r.length)throw new Error("axis specified for concat doesn't match input dimensionality");e<0&&(e=r.length+e);let n=r.slice(0);for(let x=1;x<o.length;x++){let v=o[x].dims.slice();for(let _=0;_<r.length;_++)if(_===e)n[e]+=v[_];else if(r[_]!==v[_])throw new Error("non concat dimensions must match")}let s=n.length,i=new Array(o.length),u=0;for(let x=0;x<i.length;++x)u+=o[x].dims[e],i[x]=u;let l="";o.length<5?l=Ll(i):l=Wh(i);let c=Vh(o.length,s),p=Hh(i),b=`
        ${c}
        ${p}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${e}]);

          if(textureIndex != 0) {
            indices[${e}] = indices[${e}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:n,type:o[0].type,textureType:0},shaderSource:b}},zh=(a,t,o)=>{let e=Gh(t.length,o.cacheKey);return{...e,get:()=>Uh(a,e,t,o.axis)}},Ll=a=>`int getTextureWhereDataResides(int index) {
      ${a.map((o,e)=>`if(index<${o}) {return ${e};}
`).join("")}
    }`,Wh=a=>Ll(a),Vh=(a,t)=>{let o=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let e=0;e<a;++e)e===0?o.push(`	if (textureIndex == ${e}) { return _X${e}(indices); }`):e===a-1?o.push(`	else { return _X${e}(indices); }`):o.push(`	else if (textureIndex == ${e}) { return _X${e}(indices); }`);return o.push("	}"),o.join(`
`)},Hh=a=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let o=0;o<a.length;++o)o===0?t.push(`	if (index == ${o}) { return ${a[o]}; }`):o===a.length-1?t.push(`	else { return ${a[o]}; }`):t.push(`	else if (index == ${o}) { return ${a[o]}; }`);return t.push("	}"),t.join(`
`)},Cl=a=>re({axis:a.attributes.getInt("axis")}),jh=a=>{if(!a||a.length<1)throw new Error("too few inputs");let t=a[0].type,o=a[0].dims.length;if(t==="string")throw new Error("string tensor is not supported yet");for(let e of a){if(e.type!==t)throw new Error("input tensors should be one type");if(e.dims.length!==o)throw new Error("input tensors should have the same shape")}}});function qh(){return yt("abs")}function Yh(){return yt("acos")}function Xh(){return yt("asin")}function Kh(){return yt("atan")}function Jh(){return yt("ceil")}function Zh(){return yt("cos")}function Qh(a){let t="elu";return{body:`
  const float alpha = float(${a});

  float ${t}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function em(){return yt("exp")}function tm(){return yt("floor")}function Ei(a,t){let o="clip";return{body:`
  const float min = float(${a});
  const float max = float(${t});

  float ${o}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${o}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:o,type:0}}function rm(){let a="indentity";return{body:`
  float ${a}_(float a) {
    return a;
  }
  vec4 ${a}_(vec4 v) {
    return v;
  }
  `,name:a,type:0}}function nm(a){let t="leakyRelu";return{body:`
  const float alpha = float(${a});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function om(){return yt("log")}function im(){let a="neg";return{body:`
  float ${a}_(float a) {
    return -a;
  }
  vec4 ${a}_(vec4 v) {
    return -v;
  }
  `,name:a,type:0}}function am(){let a="not";return{body:`
  float ${a}_(float a) {
    return float( ! bool(a) );
  }
  bool ${a}_(bool a) {
    return !a;
  }
  vec4 ${a}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${a}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:a,type:0}}function sm(){return yt("sin")}function Pi(){let a="relu";return{body:`
  float ${a}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${a}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:a,type:0}}function Di(){let a="sigmoid";return{body:`
  float ${a}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${a}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:a,type:0}}function um(){return yt("sqrt")}function lm(){return yt("tan")}function fm(){let a="tanh";return{body:`
  float ${a}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${a}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:a,type:0}}function yt(a){return{body:`
  float ${a}_(float a) {
    return ${a}(a);
  }
  vec4 ${a}_(vec4 v) {
    return ${a}(v);
  }
  `,name:a,type:0}}var cm,Ce,Bl,$l,kl,Nl,Li,Rl,Ml,pm,Gl,Ul,zl,Wl,Vl,Hl,Ci,jl,ql,Yl,Xl,Kl,Jl,Zl,Ql,ef,tf,rf,Fi=D(()=>{"use strict";Me();fe();Xt();ve();ae();cm=(a,t,o,e)=>{let r=a.session.pack?2:0,n=Y(a.session.backend.glContext.version);return{...t,output:{dims:o.dims,type:o.type,textureType:r},shaderSource:`
     ${e.body}
     void main() {
       vec4 v = ${n.texture2D}(A, TexCoords);
       v = ${e.name}_(v);
       ${n.output} = v;
     }
     `,hasMain:!0}},Ce=(a,t,o,e)=>{let r=a.session.pack?2:0,n={name:o.name,inputTypes:[r],inputNames:["A"],cacheHint:e};return{...n,get:()=>cm(a,n,t,o)}},Bl=(a,t)=>[a.run(Ce(a,t[0],qh()),t)],$l=(a,t)=>[a.run(Ce(a,t[0],Yh()),t)],kl=(a,t)=>[a.run(Ce(a,t[0],Xh()),t)],Nl=(a,t)=>[a.run(Ce(a,t[0],Kh()),t)],Li=(a,t,o)=>[a.run(Ce(a,t[0],Ei(o.min,o.max),o.cacheKey),t)],Rl=a=>re({min:a.attributes.getFloat("min",_r),max:a.attributes.getFloat("max",Or)}),Ml=(a,t)=>{let o=pm(a,t);return Li(a,[t[0]],o)},pm=(a,t)=>{if(t.length>=3&&(!a.session.isInitializer(t[1].dataId)||!a.session.isInitializer(t[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let o=t.length>=3?t[1].numberData[0]:_r,e=t.length>=3?t[2].numberData[0]:Or;return re({min:o,max:e})},Gl=(a,t)=>[a.run(Ce(a,t[0],Jh()),t)],Ul=(a,t)=>[a.run(Ce(a,t[0],Zh()),t)],zl=(a,t,o)=>[a.run(Ce(a,t[0],Qh(o.alpha),o.cacheKey),t)],Wl=a=>re({alpha:a.attributes.getFloat("alpha",1)}),Vl=(a,t)=>[a.run(Ce(a,t[0],em()),t)],Hl=(a,t)=>[a.run(Ce(a,t[0],tm()),t)],Ci=(a,t)=>[a.run(Ce(a,t[0],rm()),t)],jl=(a,t,o)=>[a.run(Ce(a,t[0],nm(o.alpha),o.cacheKey),t)],ql=a=>re({alpha:a.attributes.getFloat("alpha",.01)}),Yl=(a,t)=>[a.run(Ce(a,t[0],om()),t)],Xl=(a,t)=>[a.run(Ce(a,t[0],im()),t)],Kl=(a,t)=>[a.run(Ce(a,t[0],am()),t)],Jl=(a,t)=>[a.run(Ce(a,t[0],Pi()),t)],Zl=(a,t)=>[a.run(Ce(a,t[0],Di()),t)],Ql=(a,t)=>[a.run(Ce(a,t[0],sm()),t)],ef=(a,t)=>[a.run(Ce(a,t[0],um()),t)],tf=(a,t)=>[a.run(Ce(a,t[0],lm()),t)],rf=(a,t)=>[a.run(Ce(a,t[0],fm()),t)]});function Gt(a){let t;switch(a.activation){case"Relu":t=Pi();break;case"Sigmoid":t=Di();break;case"Clip":t=Ei(a.clipMin,a.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let o=t.name,e=t.body,r=`value = ${o}_(value);`;return{activationFunction:e,applyActivation:r}}var jr,Ar=D(()=>{"use strict";fe();Fi();jr=a=>{let t=a.getString("activation","");if(t==="Clip"){let[o,e]=a.getFloats("activation_params",[_r,Or]);return{activation:t,clipMax:e,clipMin:o,activationCacheKey:`${t}:${o},${e}`}}return{activation:t,activationCacheKey:t}}});var hm,mm,nf,of=D(()=>{"use strict";pt();ve();ae();fo();Ar();hm=(a,t)=>({name:"GroupedConv",inputNames:a?["X","W","Bias"]:["X","W"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t}),mm=(a,t,o,e)=>{let n=t.length>2?"value += getBias(output_channel);":"",s=t[0].dims.slice(),i=t[1].dims.slice(),u=i[0]/e.group;pe.verbose("GroupedConv",`autpPad:${e.autoPad}, dilations:${e.dilations}, group:${e.group}, kernelShape:${e.kernelShape}, pads:${e.pads}, strides:${e.strides}`);let l=qr(s,i,e.dilations,e.pads,e.strides),c=Y(a.session.backend.glContext.version),{activationFunction:p,applyActivation:b}=Gt(e),x=`
  const ivec2 strides = ivec2(${e.strides[0]}, ${e.strides[1]});
  const ivec2 pads = ivec2(${e.pads[0]}, ${e.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${i[1]}; wInChannel++) {
      int input_channel = group_id * ${i[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${i[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${e.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${i[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${e.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${n}
    ${b}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...o,output:{dims:l,type:t[0].type,textureType:0},shaderSource:x,hasMain:!0}},nf=(a,t,o)=>{let e=hm(t.length>2,o.cacheKey);return{...e,get:()=>mm(a,t,e,o)}}});var bm,gm,af,sf=D(()=>{"use strict";ve();ae();Ir();bm=a=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:a}),gm=(a,t,o,e,r,n)=>{let s=o.dims,i=e.dims,u=2,l=3,c=r.length,p=[i[1]*i[2]*i[3],r[2]*r[3]],b=i[2]*i[3],x=Mt(),v=Y(a.session.backend.glContext.version),_="";for(let L=0;L<=1;L++)for(let B=0;B<=1;B++)_+=`
            blockIndex = rc.x + ${B};
            pos = rc.y + ${L};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${r[c-1]})) * ${n.strides[0]} -
                ${n.pads[0]};
              d0 = offsetY + ${n.dilations[0]} * (imod(pos, ${b}) / ${i[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${r[c-1]}) * ${n.strides[1]} -
                  ${n.pads[1]};
                d1 = offsetX + ${n.dilations[1]} * imod(imod(pos, ${b}), ${i[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${b}.);
                    innerDims = vec2(d0, d1);
                    result[${L*2+B}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let I=`
      ${x}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${_}
          ${v.output} = result;
      }
            `;return{...t,output:{dims:p,type:o.type,textureType:2},shaderSource:I,hasMain:!0}},af=(a,t,o,e,r)=>{let n=bm(r.cacheKey);return{...n,get:()=>gm(a,n,t,o,e,r)}}});function Tm(a,t,o){let e=t[0].dims,r=t[1].dims,n=Xe.calcShape(e,r,!0);if(!n)throw new Error("Can't use matmul on the given tensors");let s=Ke(n.length),i=Et(),{activationFunction:u,applyActivation:l}=Gt(o),c=t.length>2,p=c?"value += getBiasForMatmul();":"",b=c?`${$i(s,i,t[2].dims,n,!1)}`:"",x=n.length,v=e.length,_=r.length,I=e[e.length-1],L=`
    ${u}
    ${b}
    float process(int indices[${x}]) {
        int a[${v}];
        int b[${_}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${I}; ++k) {
            a[${v-1}] = k;
            b[${_-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...a,output:{dims:n,type:t[0].type,textureType:0},shaderSource:L}}function Bi(a,t){let o=ym(a.length>2,t.activationCacheKey);return{...o,get:()=>Tm(o,a,t)}}function $i(a,t,o,e,r){let n="",s=o.length,i=e.length,u=i-s;i<2&&s>0?n="coords":n=o.map((_,I)=>`coords.${t[I+u]}`).join(", ");let c=Xe.getBroadcastDims(o,e).map(_=>`coords.${t[_+u]} = 0;`).join(`
`),b=z.size(o)===1,x="vec4(outputValue.xx, outputValue.yy)";return b&&(x="vec4(outputValue.x)"),r?`
vec4 getBiasForMatmul() {
  ${a} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${n});
  return ${x};
}`:`
float getBiasForMatmul() {
  ${a} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var uf,lf,ym,xm,co=D(()=>{"use strict";fe();ae();Rt();Ar();ki();uf=(a,t,o)=>(xm(t),a.session.pack?[a.run(po(a,t,o),t)]:[a.run(Bi(t,o),t)]),lf=a=>jr(a.attributes),ym=(a,t)=>({name:"MatMul",inputNames:a?["A","B","Bias"]:["A","B"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t});xm=a=>{if(!a||a.length!==2)throw new Error("MatMul requires 2 inputs.");if(a[0].dims[a[0].dims.length-1]!==a[1].dims[a[1].dims.length-2])throw new Error("shared dimension does not match.");if(a[0].type!=="float32"&&a[0].type!=="float64"||a[1].type!=="float32"&&a[1].type!=="float64")throw new Error("inputs should be float type");if(a[0].type!==a[1].type)throw new Error("inputs types should match")}});function _m(a,t,o,e){let r=[],n=[],s=o[0].dims,i=o[1].dims,u=s.length,l=i.length,c=e.length,p=c-u,b=c-l;r=s.map((F,J)=>`coords.${t[J+p]}`),r[u-1]="i*2",r.join(", "),n=i.map((F,J)=>`coords.${t[J+b]}`),n[l-2]="i*2",n.join(", ");let x=Xe.getBroadcastDims(s,e),v=Xe.getBroadcastDims(i,e),_=x.map(F=>`coords.${t[F+p]} = 0;`).join(`
`),I=v.map(F=>`coords.${t[F+b]} = 0;`).join(`
`),L=`int lastDim = coords.${t[c-1]};
  coords.${t[c-1]} = coords.${t[c-2]};
  coords.${t[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${a} coords = getOutputCoords();
  ${L}
  ${_}
  vec4 outputValue = getA(${r});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${a} coords = getOutputCoords();
  ${L}
  ${I}
  vec4 outputValue = getB(${n});
  return outputValue;
}`}function Om(a,t){let o="";for(let e=0;e<t-2;e++)o+=`rc.${a[e]}, `;return o+=`rc.${a[t-2]}, i*2`,o}function Sm(a,t){let o="";for(let e=0;e<t-2;e++)o+=`rc.${a[e]}, `;return o+=`i*2, rc.${a[t-1]}`,o}var wm,vm,po,ki=D(()=>{"use strict";fe();ve();ae();Rt();Ar();co();wm=(a,t)=>({name:"MatMul (packed)",inputNames:a?["A","B","Bias"]:["A","B"],inputTypes:a?[2,2,2]:[2,2],cacheHint:t}),vm=(a,t,o,e)=>{let r=o.length>2,n=r?"value += getBiasForMatmul();":"",s=o[0].dims,i=o[1].dims,u=Xe.calcShape(s,i,!0),l=!z.areEqual(o[0].dims,o[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=s[s.length-1],p=Math.ceil(c/2),b=s.length,x=i.length,v=Y(a.session.backend.glContext.version),_=Ke(u.length),I=u.length,L=Et(),{activationFunction:B,applyActivation:F}=Gt(e),J=r?`${$i(_,L,o[2].dims,u,!0)}`:"",j=l?`${_m(_,L,o,u)}`:"",U=l?"getAAtOutCoordsMatmul(i)":`getA(${Om(L,b)})`,ie=l?"getBAtOutCoordsMatmul(i)":`getB(${Sm(L,x)})`,at=l?"":`${_} rc =
          getOutputCoords(); int lastDim = rc.${L[I-1]}; rc.${L[I-1]} =
          rc.${L[I-2]}; rc.${L[I-2]} = lastDim;
      `,He=`
            ${j}
            ${J}
            ${B}
            void main() {
              ${at}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${U};
                vec4 b = ${ie};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${n}
              ${F}
              ${v.output} = value;
            }`;return{...t,output:{dims:u,type:o[0].type,textureType:2},shaderSource:He,hasMain:!0}},po=(a,t,o)=>{let e=wm(t.length>2,o.activationCacheKey);return{...e,get:()=>vm(a,e,t,o)}}});var ff,cf=D(()=>{"use strict";fo();sf();ki();ff=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=qr(e,r,o.dilations,o.pads,o.strides),s=a.run(af(a,t[0],t[1],n,o),[t[0]]),i=a.reshapePacked(t[1],[r[0],r[1]*r[2]*r[3]]),u=t.length===3?[i,s,t[2]]:[i,s],l=a.run(po(a,u,o),u);return a.reshapePacked(l,n)}});var Im,Am,pf,Ni,Ri=D(()=>{"use strict";ae();Im=a=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:a}),Am=(a,t,o,e,r,n)=>{let s=o.dims,i=e.dims,u=r.length,l=Ni(s,i,r,4),c=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
        const int KH = ${n.kernelShape[0]};
        const int KW = ${n.kernelShape[1]};
        const int dilationH = ${n.dilations[0]};
        const int dilationW = ${n.dilations[1]};
        const int strideH = ${n.strides[0]};
        const int strideW = ${n.strides[1]};
        const int padH = ${n.pads[0]};
        const int padW = ${n.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${s.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:l,type:o.type,textureType:4},shaderSource:c}},pf=(a,t,o,e,r)=>{let n=Im(r.cacheKey);return{...n,get:()=>Am(a,n,t,o,e,r)}},Ni=(a,t,o,e=4)=>[o[0],o[2],o[3],Math.ceil(a[1]*t[2]*t[3]/e)]});var Em,Pm,df,hf=D(()=>{"use strict";fe();ve();ae();Ar();Ri();Em=(a,t)=>({name:"ConvDotProduct",inputNames:a?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:a?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),Pm=(a,t,o,e,r)=>{let n=o[0].dims,s=o[1].dims,i=[s[0],Math.ceil(n[1]*s[2]*s[3]/4)],u=Ni(n,s,e),[l,c]=a.calculateTextureWidthAndHeight(i,4),p=z.computeStrides(u),[b,x]=a.calculateTextureWidthAndHeight(u,4),v=e.length,_=o.length<3?"0.0":"_B(b)",I=Math.ceil(n[1]*s[2]*s[3]/4),{activationFunction:L,applyActivation:B}=Gt(r),F=Y(a.session.backend.glContext.version),J=`
${L}
float process(int indices[${v}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${i[1]};
  float value = ${_};
  for (int i = 0; i < ${I}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${b}, ${x});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${F.texture2D}(Im2Col, im2colCoords), ${F.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${B}
  return value;
}`;return{...t,output:{dims:e,type:o[0].type,textureType:0},shaderSource:J}},df=(a,t,o,e)=>{let r=Em(t.length>2,e);return{...r,get:()=>Pm(a,r,t,o,e)}}});var qr,Mi,Dm,Lm,Cm,Fm,Gi,Bm,fo=D(()=>{"use strict";Me();fe();of();cf();hf();Ar();Ri();co();qr=(a,t,o,e,r)=>{let n=a[0],s=a.slice(2),i=s.length,u=t[0],c=t.slice(2).map((v,_)=>v+(v-1)*(o[_]-1)),b=s.map((v,_)=>v+e[_]+e[_+i]).map((v,_)=>Math.floor((v-c[_]+r[_])/r[_]));return[n,u].concat(...b)},Mi=(a,t,o)=>(Bm(t,o),Dm(a,t,o)),Dm=(a,t,o)=>{let e=Fm(o,t),r=a.session.pack,n=e.kernelShape[0]===1&&e.kernelShape[1]===1;return e.group>1?[a.run(nf(a,t,e),t)]:n&&r?[Lm(a,t,e)]:r&&t[0].dims.length===4&&t[0].dims[0]===1&&!n?[ff(a,t,e)]:[Cm(a,t,e)]},Lm=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=qr(e,r,o.dilations,o.pads,o.strides),s=a.reshapeUnpacked(t[0],[e[1],e[2]*e[3]]),i=a.reshapeUnpacked(t[1],[r[0],r[1]]),u=t.length>2?[i,s,t[2]]:[i,s],l=a.run(Bi(u,o),u);return a.reshapeUnpacked(l,n)},Cm=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=qr(e,r,o.dilations,o.pads,o.strides),s=a.run(pf(a,t[0],t[1],n,o),[t[0]]),i=t.length===3?[s,t[1],t[2]]:[s,t[1]];return a.run(df(a,t,n,o),i)},Fm=(a,t)=>{let o=a.kernelShape.slice();if(a.kernelShape.length===0)for(let n=2;n<t[1].dims.length;++n)o.push(t[1].dims[n]);let e=a.pads.slice();vr.adjustPadsBasedOnAutoPad(t[0].dims,a.strides,a.dilations,o,e,a.autoPad);let r=Object.assign({},a);return Object.assign(r,{kernelShape:o,pads:e,cacheKey:a.cacheKey}),r},Gi=a=>{let t=a.attributes,o=jr(t),e=t.getString("auto_pad","NOTSET"),r=t.getInts("dilations",[1,1]),n=t.getInt("group",1),s=t.getInts("kernel_shape",[]),i=t.getInts("pads",[0,0,0,0]),u=t.getInts("strides",[1,1]);return re({autoPad:e,dilations:r,group:n,kernelShape:s,pads:i,strides:u,...o})},Bm=(a,t)=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(a[0].dims.length!==4||a[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let o=a[0].dims[1],e=a[1].dims[1]*t.group;if(o!==e)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(a.length===3&&(a[2].dims.length!==1||a[1].dims[0]!==a[2].dims[0]))throw new Error("invalid bias");let r=a[0].dims.length-2;if(t.dilations.length!==r)throw new Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw new Error(`strides should be ${r}D`);if(t.pads.length!==r*2)throw new Error(`pads should be ${r*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==a[1].dims.length-2)throw new Error("invalid kernel shape");if(a[0].type!=="float32"||a[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(a.length===3&&a[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var $m,km,Nm,mf,Rm,Mm,Gm,Um,zm,Wm,bf,Vm,gf=D(()=>{"use strict";Me();ve();ae();Ar();$m=(a,t,o,e,r,n)=>(a-1)*t+o+(e-1)*r+1-n,km=(a,t,o,e,r)=>{let n=Math.floor(a/2);t==="SAME_UPPER"?(o[e]=n,o[r]=a-n):t==="SAME_LOWER"&&(o[e]=a-n,o[r]=n)},Nm=(a,t,o,e,r,n,s,i)=>{let u=a.length-2,l=i.length===0;for(let c=0;c<u;++c){let p=l?a[c+2]*n[c]:i[c],b=$m(a[c+2],n[c],r[c],t[c],o[c],p);km(b,e,r,c,c+u),l&&i.push(n[c]*(a[c+2]-1)+s[c]+(t[c]-1)*o[c]+1-r[c]-r[c+u])}},mf=(a,t,o)=>(Vm(t,o),Rm(a,t,o)),Rm=(a,t,o)=>{let e=Wm(o,t);return[zm(a,t,e)]},Mm=(a,t)=>({name:"ConvTranspose",inputNames:a?["X","W","B"]:["X","W"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t}),Gm=(a,t,o,e)=>{let n=t.length>2?"getB(output_channel)":"0.0",s=t[0].dims,i=t[1].dims,u=i[1],l=i[0]/e.group,c=[t[0].dims[0],t[1].dims[1]*e.group,...e.outputShape],p=Y(a.session.backend.glContext.version),{activationFunction:b,applyActivation:x}=Gt(e),v=`
  const ivec2 strides = ivec2(${e.strides[0]}, ${e.strides[1]});
  const ivec2 pads = ivec2(${e.pads[0]}, ${e.pads[1]});
  ${b}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${n};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${i[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${i[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${e.dilations[0]}, wHOff * ${e.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${x}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...o,output:{dims:c,type:t[0].type,textureType:0},shaderSource:v,hasMain:!0}},Um=(a,t,o)=>{let e=Mm(t.length>2,o.cacheKey);return{...e,get:()=>Gm(a,t,e,o)}},zm=(a,t,o)=>a.run(Um(a,t,o),t),Wm=(a,t)=>{let o=a.kernelShape.slice();if(a.kernelShape.length===0)for(let i=2;i<t[1].dims.length;++i)o.push(t[1].dims[i]);let e=a.pads.slice(),r=a.outputShape.slice(),n=t[0].dims;Nm(n,o,a.dilations,a.autoPad,e,a.strides,a.outputPadding,r);let s=Object.assign({},a);return Object.assign(s,{kernelShape:o,pads:e,outputShape:r,cacheKey:a.cacheKey}),s},bf=a=>{let t=a.attributes,o=jr(t),e=t.getString("auto_pad","NOTSET"),r=t.getInts("dilations",[1,1]),n=t.getInt("group",1),s=t.getInts("kernel_shape",[]),i=t.getInts("output_padding",[0,0]),u=t.getInts("output_shape",[]),l=t.getInts("pads",[0,0,0,0]),c=t.getInts("strides",[1,1]);return re({autoPad:e,dilations:r,group:n,kernelShape:s,outputPadding:i,outputShape:u,pads:l,strides:c,...o})},Vm=(a,t)=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(a[0].dims.length!==4||a[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let o=a[0].dims[1],e=a[1].dims[0];if(o!==e)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=a[1].dims[1]*t.group;if(a.length===3&&(a[2].dims.length!==1||a[2].dims[0]!==r))throw new Error("invalid bias");let n=a[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==a[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==a[0].dims.length-2)throw new Error("invalid output shape");if(a[0].type!=="float32"||a[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(a.length===3&&a[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var yf,Er,Tf,Hm,xf,jm,qm,Ym,ho=D(()=>{"use strict";Me();fe();ae();yf={name:"Transpose",inputNames:["A"],inputTypes:[0]},Er=(a,t,o)=>(Ym(t),[a.run({...yf,cacheHint:o.cacheKey,get:()=>Hm(a,t[0],o.perm)},t)]),Tf=a=>re({perm:a.attributes.getInts("perm",[])}),Hm=(a,t,o)=>{let e=t.dims;o=xf(e,o);let r=jm(e,o),n=e.length,s=`
      ${qm("perm",o,n)}
      float process(int indices[${n}]) {
        int a[${n}];
        perm(a, indices);
        return _A(a);
      }`;return{...yf,output:{dims:r,type:t.type,textureType:0},shaderSource:s}},xf=(a,t)=>(t&&t.length!==a.length&&(t=[...a.keys()].reverse()),t),jm=(a,t)=>(t=xf(a,t),z.sortBasedOnPerm(a,t)),qm=(a,t,o)=>{let e=[];e.push(`void ${a}(out int a[${o}], int src[${o}]) {`);for(let r=0;r<o;++r)e.push(`	a[${t[r]}]=src[${r}];`);return e.push("	}"),e.join(`
`)},Ym=a=>{if(!a||a.length!==1)throw new Error("Transpose requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("input should be float tensor")}});var wf,vf,Xm,_f=D(()=>{"use strict";ho();wf=(a,t,o)=>{Xm(t);let e=o.blocksize,r=e*e,n=o.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=o.mode==="DCR"?[t[0].dims[0],e,e,t[0].dims[1]/r,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/r,e,e,t[0].dims[2],t[0].dims[3]],i=a.reshapeUnpacked(t[0],s),u={perm:n,cacheKey:`${n}`},[l]=Er(a,[i],u),c=[t[0].dims[0],t[0].dims[1]/r,t[0].dims[2]*e,t[0].dims[3]*e];return[a.reshapeUnpacked(l,c)]},vf=a=>{let t=a.attributes.getInt("blocksize");if(t<1)throw new Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let o=a.attributes.getString("mode","DCR");if(o!=="DCR"&&o!=="CRD")throw new Error(`unrecognized mode: ${o} for DepthToSpace`);return{mode:o,blocksize:t}},Xm=a=>{if(a.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${a.length}`);if(a[0].type==="string"||a[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Of,Sf,Km,If=D(()=>{"use strict";fe();Of=(a,t,o)=>{Km(t,o);let e=z.flattenShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},Sf=a=>a.attributes.getInt("axis",1),Km=(a,t)=>{if(!a||a.length!==1)throw new Error("Flatten requires 1 input.");let o=a[0].dims.length;if(o===0)throw new Error("scalar tensor is not supported.");if(t<-o||t>o)throw new Error("Invalid axis");if(a[0].type==="string")throw new Error("string tensor is not supported.")}});var rr,Tn=D(()=>{"use strict";rr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var Af,Ef,Jm,Zm,Qm,eb,Pf=D(()=>{"use strict";Me();Tn();fe();ae();Af=(a,t,o)=>(eb(t,o.axis),[a.run(Qm(a,t,o),t)]),Ef=a=>re({axis:a.attributes.getInt("axis",0)}),Jm={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},Zm=(a,t,o,e)=>{let r=o[0].dims.slice(),n=o[1].dims.slice(),s=new Array(r.length+n.length-1);e=z.normalizeAxis(e,r.length);let i=[];for(let b=0;b<s.length;b++)b<e?(s[b]=r[b],i.push(`inputIdx[${b}] = outputIdx[${b}];`)):b<e+n.length?(s[b]=n[b-e],i.push(`indexDataIdx[${b-e}] = outputIdx[${b}];`)):(s[b]=r[b-n.length+1],i.push(`inputIdx[${b-n.length+1}] = outputIdx[${b}];`));let u=s.length||1,l=r.length,c=n.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${i.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${e}] = idx < 0 ? idx + ${r[e]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:s,type:o[0].type,textureType:0},shaderSource:p}},Qm=(a,t,o)=>{let e={...Jm,cacheHint:o.cacheKey};return{...e,get:()=>Zm(a,e,t,o.axis)}},eb=(a,t)=>{if(!a||a.length!==2)throw new Error("Gather requires 2 inputs.");let o=a[0].dims.length;if(o<1)throw new Error("Invalid input shape.");if(t<-o||t>o-1)throw new Error("Invalid axis.");if(rr.indexOf(a[0].type)===-1)throw new Error("Invaid input type.");if(a[1].type!=="int32"&&a[1].type!=="int16")throw new Error("Invaid input type.")}});var Ui,Df,Lf,Cf,tb,rb,nb,Ff=D(()=>{"use strict";Me();fe();ae();Ui=(a,t,o)=>(nb(t,o),[a.run(tb(t,o),t)]),Df=(a,t)=>{let o=a.attributes.getInt("transA",0)!==0,e=a.attributes.getInt("transB",0)!==0,r=a.attributes.getFloat("alpha",1),n=a.attributes.getFloat("beta",1);return re({transA:o,transB:e,alpha:r,beta:n,isOptionalC:t})},Lf=a=>Df(a,!1),Cf=a=>Df(a,!0),tb=(a,t)=>{let o={name:"Gemm",inputNames:a.length===3?["A","B","C"]:["A","B"],inputTypes:a.length===3?[0,0,0]:[0,0],key:t.cacheKey};return{...o,get:()=>rb(o,a,t)}},rb=(a,t,o)=>{let e=t[0].dims.slice(),r=t[1].dims.slice(),[n,s]=ro.getShapeOfGemmResult(e,o.transA,r,o.transB,t.length===3?t[2].dims:void 0),i=[n,s];if(!i)throw new Error("Can't use gemm on the given tensors");let u=e[e.length-1],l="";o.transA&&(u=e[0]),o.transA&&o.transB?l="value += _A_T(a) * _B_T(b);":o.transA&&!o.transB?l="value += _A_T(a) * _B(b);":!o.transA&&o.transB?l="value += _A(a) * _B_T(b);":!o.transA&&!o.transB&&(l="value += _A(a) * _B(b);");let c=i.length,p=t.length===3?`int c[${t[2].dims.length}];`:"",b=t.length===3?"bcastIndices_C(indices, c);":"",x=t.length===3?"value += beta * _C(c);":"",v=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${b}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${x}
          return value;
      }`;return{...a,output:{dims:i,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:o.alpha},{name:"beta",type:"float",data:o.beta}],shaderSource:v}},nb=(a,t)=>{if(!a)throw new Error("Input is missing");if(t.isOptionalC&&(a.length<2||a.length>3))throw new Error("Invaid input shape.");if(!t.isOptionalC&&a.length!==3)throw new Error("Gemm requires 3 inputs");if(a.length===3&&a[2].dims.length!==1&&a[2].dims.length!==2)throw new Error("Invalid input shape of C");if(a[0].type!=="float32"&&a[0].type!=="float64"||a[1].type!=="float32"&&a[1].type!=="float64"||a.length===3&&a[2].type!=="float32"&&a[2].type!=="float64")throw new Error("Invalid input type.");if(a[0].type!==a[1].type||a.length===3&&a[0].type!==a[2].type)throw new Error("Input types are mismatched")}});var Bf,$f,ob,ib,ab,sb,ub,kf=D(()=>{"use strict";Me();ae();Bf=(a,t,o)=>(ub(t),[a.run(ab(a,t,o),t)]),$f=a=>{let t=a.attributes.getFloat("scale"),o=a.attributes.getFloats("bias");return re({scale:t,bias:o})},ob={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},ib=(a,t,o,e)=>{let r=o[0].dims.slice(),n=r.length,i=`
      ${sb(e.bias.length)}
      float process(int indices[${n}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:r,type:o[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:e.bias.length,data:e.bias},{name:"scale",type:"float",data:e.scale}],shaderSource:i}},ab=(a,t,o)=>{let e={...ob,cacheHint:o.cacheKey};return{...e,get:()=>ib(a,e,t,o)}},sb=a=>{let t=[`float getBias(float bias[${a}], int channel) {`];for(let o=0;o<a;++o)o===0?t.push(`	if (channel == ${o}) { return bias[${o}]; }`):o===a-1?t.push(`	else { return bias[${o}]; }`):t.push(`	else if (channel == ${o}) { return bias[${o}]; }`);return t.push("	}"),t.join(`
`)},ub=a=>{if(!a||a.length!==1)throw new Error("ImageScaler requires 1 input.");if(a[0].dims.length!==4)throw new Error("Invalid input shape.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")}});var Rf,Mf,Nf,lb,fb,cb,pb,db,hb,Gf=D(()=>{"use strict";ve();ae();Rf=(a,t,o)=>{hb(t);let e=a.run(fb(t[0]),t);return[a.run(db(a,t[0],o,e.dims),[t[0],e,t[1],t[2]])]},Mf=a=>a.attributes.getFloat("epsilon",1e-5),Nf={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},lb=(a,t)=>{let o=t.dims.slice(),e=o[1],r=o[2]*o[3],n=[o[0],e],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${o[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${o[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${r});
        temp = 0.0;
        for(int a2=0; a2<${o[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${o[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${r});

        return v;
      }`;return{...a,output:{dims:n,type:t.type,textureType:4},shaderSource:s}},fb=a=>({...Nf,get:()=>lb(Nf,a)}),cb={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},pb=(a,t,o,e,r)=>{let n=Y(a.session.backend.glContext.version),[s,i]=a.calculateTextureWidthAndHeight(r,4),[u,l]=[s/4,i],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${n.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:o.dims,type:o.type,textureType:0},variables:[{name:"epsilon",type:"float",data:e}],shaderSource:c}},db=(a,t,o,e)=>{let r={...cb,cacheHint:`${o}`};return{...r,get:()=>pb(a,r,t,o,e)}},hb=a=>{if(!a||a.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let t=a[0],o=a[1],e=a[2];if(t.dims.length<3||o.dims.length!==1||e.dims.length!==1)throw new Error("Invalid input shape.");if(o.dims[0]!==t.dims[1]||e.dims[0]!==t.dims[1])throw new Error("Input shapes are mismatched.");if(t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||e.type!=="float32"&&e.type!=="float64")throw new Error("Invalid input type.");if(a[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function mb(a,t){let o=a[0].dims[1],e=a[0].dims.length,r=-Math.floor((t.size-1)/2),n=Math.ceil((t.size-1)/2),s=`float(${t.alpha}) / float(${t.size})`,i=`float(${t.bias})`,u=`float(${t.beta})`,l=`
    float process(int indices[${e}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${r}; i <= ${n}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${o}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${i} + ${s} * square_sum, ${u});
    }`;return{...Wf,cacheHint:t.cacheKey,output:{dims:a[0].dims,type:a[0].type,textureType:0},shaderSource:l}}function bb(a,t){return{...Wf,cacheHint:t.cacheKey,get:()=>mb(a,t)}}var Uf,zf,Wf,gb,Vf=D(()=>{"use strict";Me();ae();Uf=(a,t,o)=>(gb(t),[a.run(bb(t,o),t)]),zf=a=>{let t=a.attributes.getFloat("alpha",1e-4),o=a.attributes.getFloat("beta",.75),e=a.attributes.getFloat("bias",1),r=a.attributes.getInt("size");return re({alpha:t,beta:o,bias:e,size:r})},Wf={name:"LRN",inputNames:["X"],inputTypes:[0]};gb=a=>{if(!a||a.length!==1)throw new Error("LRN requires 1 input.");if(a[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(a[0].type!=="float32")throw new Error("input should be float type")}});var yb,zi,Hf,jf,qf,Tb,xb,wb,vb,_b,Ob,Sb,Ib,Yf=D(()=>{"use strict";Me();fe();ve();ae();yb={name:"Pad",inputNames:["A"],inputTypes:[0]},zi=(a,t,o)=>(wb(t),[a.run({...yb,cacheHint:o.cacheKey,get:()=>xb(a,t[0],o)},t)]),Hf=a=>{let t=a.attributes.getString("mode","constant"),o=a.attributes.getFloat("value",0),e=a.attributes.getInts("pads");return re({mode:t,value:o,pads:e})},jf=(a,t,o)=>{vb(t);let e=Tb(a,t,o);return zi(a,[t[0]],e)},qf=a=>a.attributes.getString("mode","constant"),Tb=(a,t,o)=>{if(!a.session.isInitializer(t[1].dataId)||t.length>=3&&!a.session.isInitializer(t[2].dataId))throw new Error("dynamic pad attributes are not allowed");let e=Array.from(t[1].integerData),r=t.length>=3?t[2].floatData[0]:0;return re({mode:o,pads:e,value:r})},xb=(a,t,o)=>{let e=z.padShape(t.dims.slice(),o.pads),r=e.length,s=`
      ${_b(a,t,o)}
      float process(int[${r}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:e,type:t.type,textureType:0},shaderSource:s}},wb=a=>{if(!a||a.length!==1)throw new Error("Pad requires 1 input");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")},vb=a=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(a[1].type!=="int32")throw new Error("Invalid input type.");if(a.length>=3&&a[2].type==="string")throw new Error("Invalid input type.")},_b=(a,t,o)=>{let e=Y(a.session.backend.glContext.version),[r,n]=a.calculateTextureWidthAndHeight(t.dims,0),s=z.computeStrides(t.dims);switch(o.mode){case"constant":return Ob(e,t.dims,s,r,n,o.pads,o.value);case"reflect":return Sb(e,t.dims,s,r,n,o.pads);case"edge":return Ib(e,t.dims,s,r,n,o.pads);default:throw new Error("Invalid mode")}},Ob=(a,t,o,e,r,n,s)=>{let i=t.length,u="";for(let l=i-1;l>=0;--l)u+=`
        k = m[${l}] - ${n[l]};
        if (k < 0)  return constant;
        if (k >= ${t[l]}) return constant;
        offset += k * ${o[l]};
        `;return`
      float padA(int m[${i}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `},Sb=(a,t,o,e,r,n)=>{let s=t.length,i="";for(let u=s-1;u>=0;--u)i+=`
        k = m[${u}] - ${n[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${o[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${i}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `},Ib=(a,t,o,e,r,n)=>{let s=t.length,i="";for(let u=s-1;u>=0;--u)i+=`
        k = m[${u}] - ${n[u]};
        if (k < 0)  k = 0;
        if (k >= ${t[u]}) k = ${t[u]-1};
        offset += k * ${o[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${i}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `}});var Kf,Jf,Zf,Qf,ec,tc,rc,nc,oc,Ab,Xf,ic,bo,ac,mo,Eb,sc=D(()=>{"use strict";Me();fe();ae();Kf=(a,t,o)=>{bo(t);let e={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:o.cacheKey};return[a.run({...e,get:()=>Zf(t,e,!1,o)},t)]},Jf=a=>{let t=a.attributes.getString("auto_pad","NOTSET"),o=a.attributes.getInt("ceil_mode",0),e=a.attributes.getInt("count_include_pad",0)!==0,r=a.attributes.getInts("kernel_shape"),n=a.attributes.getInts("strides",[]),s=a.attributes.getInts("pads",[]);if(o!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return re({autoPad:t,ceilMode:o,countIncludePad:e,kernelShape:r,strides:n,pads:s})},Zf=(a,t,o,e)=>{let[r,n]=oc(a,e,o),s=z.size(r.kernelShape),i="value += _X(x);",u="";r.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let c=`
        ${ac(a[0].dims,r,i,u,"0.0")}
      `;return{...t,output:{dims:n,type:a[0].type,textureType:0},shaderSource:c}},Qf=(a,t,o)=>{bo(t);let e={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${o.countIncludePad}`};return[a.run({...e,get:()=>Zf(t,e,!0,o)},t)]},ec=a=>{let t=a.attributes.getInt("count_include_pad",0)!==0;return re({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},tc=(a,t,o)=>{bo(t);let e={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:o.cacheKey};return[a.run({...e,get:()=>nc(t,e,!1,o)},t)]},rc=a=>{let t=a.attributes.getString("auto_pad","NOTSET"),o=a.attributes.getInt("ceil_mode",0),e=a.attributes.getInts("kernel_shape"),r=a.attributes.getInts("strides",[]),n=a.attributes.getInts("pads",[]),s=a.attributes.getInt("storage_order",0),i=a.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(o!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return re({autoPad:t,ceilMode:o,countIncludePad:!1,kernelShape:e,strides:r,pads:n,storageOrder:s,dilations:i})},nc=(a,t,o,e)=>{let[r,n]=oc(a,e,o),s=`
      value = max(_X(x), value);
    `,i="",l=`
      ${ac(a[0].dims,r,s,i,"-1e5")}
    `;return{...t,output:{dims:n,type:a[0].type,textureType:0},shaderSource:l}},oc=(a,t,o)=>{let e=a[0].dims.slice(),r=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),s=t.strides.slice(),i=r?t.dilations.slice():[],u=t.pads.slice();vr.adjustPoolAttributes(o,e,n,s,i,u);let l=vr.computePoolOutputShape(o,e,s,i,n,u,t.autoPad),c=Object.assign({},t);return r?Object.assign(c,{kernelShape:n,strides:s,pads:u,dilations:i,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:n,strides:s,pads:u,cacheKey:t.cacheKey}),[c,l]},Ab={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Xf={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},ic=(a,t)=>(bo(t),[a.run({...Xf,get:()=>nc(t,Xf,!0,Ab)},t)]),bo=a=>{if(!a||a.length!==1)throw new Error("Pool ops requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")},ac=(a,t,o,e,r)=>{let n=a.length;if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=a[n-1],p="",b="",x="";if(u+l!==0?p=`
          for (int i = 0; i < ${s}; i++) {
            x[${n} - 1] = indices[${n} - 1] * ${i} - ${u} + i;
            if (x[${n} - 1] < 0 || x[${n} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${o}
          }`:p=`
          for (int i = 0; i < ${s}; i++) {
            x[${n} - 1] = indices[${n} - 1] * ${i} - ${u} + i;
            ${o}
          }`,t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],I=t.strides[t.strides.length-2],L=t.pads[t.pads.length/2-2],B=t.pads[t.pads.length-2],F=a[n-2];L+B!==0?b=`
            for (int j = 0; j < ${_}; j++) {
              x[${n} - 2] = indices[${n} - 2] * ${I} - ${L} + j;
              if (x[${n} - 2] < 0 || x[${n} - 2] >= ${F}) {
                pad+= ${s};
                continue;
              }
          `:b=`
            for (int j = 0; j < ${_}; j++) {
              x[${n} - 2] = indices[${n} - 2] * ${I} - ${L} + j;
            `,x=`
          }
        `}return`
        float process(int indices[${n}]) {
          int x[${n}];
          copyVec(indices, x);

          float value = ${r};
          int pad = 0;
          ${b}
          ${p}
          ${x}
          ${e}
          return value;
        }
      `}else{let s=z.size(t.kernelShape),i=z.computeStrides(t.kernelShape),u=i.length,l=t.pads.length,c=Eb(u),p=mo(a,"inputDims"),b=mo(t.pads,"pads"),x=mo(i,"kernelStrides"),v=mo(t.strides,"strides"),_=t.pads.reduce((B,F)=>B+F),I="";return _?I=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${o}
          }`:I=`
          }
          ${o}
        `,`
        ${c}
        float process(int indices[${n}]) {
          int x[${n}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${n}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${b}
          ${p}
          ${v}
          ${x}

          float value = ${r};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${n} - ${u}; j < ${n}; j++) {
              x[j] = indices[j] * strides[j - ${n} + ${u}]
                + offset[j - ${n} + ${u}] - pads[j - 2];
              ${I}
          }
          ${e}

          return value;
        }
      `}},mo=(a,t)=>{let o="";for(let e=0;e<a.length;e++)o+=`
      ${t}[${e}] = ${a[e]};
    `;return o},Eb=a=>`
  void offsetToIndices(int offset, int[${a}] strides, out int[${a}] indices) {
    if (${a} == 0) {
      return;
    }
    for (int i = 0; i < ${a} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${a} - 1] = offset;
  }`});var Pr,nr,Pb,Db,uc,lc,fc,cc,pc,dc,hc,mc=D(()=>{"use strict";Me();Tn();fe();ae();Pr=(a,t,o,e,r)=>{Db(t);let n={name:e,inputNames:["A"],inputTypes:[0]};return[a.run({...n,cacheHint:o.cacheKey,get:()=>Pb(a,t,o,e,r,n)},t)]},nr=a=>{let t=a.attributes.getInts("axes",[]),o=a.attributes.getInt("keepdims",1)===1;return re({axes:t,keepDims:o})},Pb=(a,t,o,e,r,n)=>{let s=[],i=t[0].dims.length||1,u=[],l=z.normalizeAxes(o.axes,t[0].dims.length),c=r(t,l),p=c[1];for(let v=0;v<t[0].dims.length;v++)l.indexOf(v)>=0||l.length===0?(o.keepDims&&s.push(1),p=`
          for(int j${v} = 0; j${v} < ${t[0].dims[v]}; j${v}++) {
            inputIdx[${v}] = j${v};
            ${p}
          }`):(u.push(`inputIdx[${v}] = outputIdx[${s.length}];`),s.push(t[0].dims[v]));let x=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${i}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${p}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...n,output:{dims:s,type:t[0].type,textureType:0},shaderSource:x}},Db=a=>{if(!a||a.length!==1)throw new Error("Reduce op requires 1 input.");if(rr.indexOf(a[0].type)===-1)throw new Error("Invalid input type.")},uc=(a,t,o)=>Pr(a,t,o,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),lc=(a,t,o)=>Pr(a,t,o,"ReduceMean",(r,n)=>{let s=1;for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&(s*=r[0].dims[i]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),fc=(a,t,o)=>Pr(a,t,o,"ReduceMax",(r,n)=>{let s=[];for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&s.push(`inputIdx[${i}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),cc=(a,t,o)=>Pr(a,t,o,"ReduceMin",(r,n)=>{let s=[];for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&s.push(`inputIdx[${i}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),pc=(a,t,o)=>Pr(a,t,o,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),dc=(a,t,o)=>Pr(a,t,o,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),hc=(a,t,o)=>Pr(a,t,o,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var bc,gc=D(()=>{"use strict";fe();bc=(a,t)=>{let o=z.calculateReshapedDims(t[0].dims,t[1].integerData);return a.session.pack?[a.reshapePacked(t[0],o)]:[a.reshapeUnpacked(t[0],o)]}});var yc,Wi,Tc,xc,xn,Lb,Vi,go,Hi=D(()=>{"use strict";Me();ve();ae();yc={name:"Upsample",inputNames:["X"],inputTypes:[0]},Wi=(a,t,o)=>(Vi(t,o),[a.run({...yc,cacheHint:o.cacheKey,get:()=>Lb(a,t,o)},t)]),Tc=a=>xn(a,7),xc=a=>xn(a,9),xn=(a,t)=>{let o=t>=10,e=a.attributes.getString("mode","nearest");if(e!=="nearest"&&e!=="linear"&&(t<11||e!=="cubic"))throw new Error(`unrecognized mode: ${e}`);let r=[];t<9&&(r=a.attributes.getFloats("scales"),go(r,e,o));let n=a.attributes.getFloat("extrapolation_value",0),s=t>10?a.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let i=s==="tf_crop_and_resize",u=i,l=e==="nearest"&&t>=11?a.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=a.attributes.getFloat("cubic_coeff_a",-.75),p=a.attributes.getInt("exclude_outside",0)!==0;if(p&&e!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let b=t<11?!0:e==="nearest"&&s==="asymmetric"&&l==="floor",x=0,v=0,_=0;return t>10?a.inputs.length>2?(x=1,v=2,_=3):(v=1,_=2):t===9&&(v=1),re({opset:t,isResize:o,mode:e,scales:r,extrapolationValue:n,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:i,nearestMode:l,cubicCoefficientA:c,excludeOutside:p,useNearest2xOptimization:b,roiInputIdx:x,scalesInputIdx:v,sizesInputIdx:_})},Lb=(a,t,o)=>{let e=Y(a.session.backend.glContext.version),[r,n]=a.calculateTextureWidthAndHeight(t[0].dims,0),s=t[0].dims.map((_,I)=>Math.floor(_*o.scales[I])),[i,u]=a.calculateTextureWidthAndHeight(s,0),l=s.length,c=new Array(l),p=new Array(l),b=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let _=l-1;_>=0;_--)c[_]=_===l-1?1:c[_+1]*s[_+1],p[_]=_===l-1?1:p[_+1]*t[0].dims[_+1],b+=`
        output_pitches[${_}] = ${c[_]};
        input_pitches[${_}] = ${p[_]};
        `;let x=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${r}, ${n});
        float value = getColorAsFloat(${e.texture2D}(X, coords));
        return value;
      }
      `,v=o.mode==="nearest"?`
    ${x}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${b}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${x}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${b}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${x}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${b}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...yc,output:{dims:s,type:t[0].type,textureType:0},shaderSource:v,variables:[{name:"scales",type:"int",arrayLength:o.scales.length,data:o.scales.map(_=>Math.ceil(_))}]}},Vi=(a,t)=>{if(!a||t.opset<9&&a.length!==1||t.opset>=9&&t.opset<11&&a.length!==2||t.opset>=11&&a.length<2)throw new Error("invalid inputs.");if(t.scales.length>0&&a[0].dims.length!==t.scales.length)throw new Error("Invalid input shape.");if(a[0].type==="string")throw new Error("Invalid input tensor types.")},go=(a,t,o)=>{if(o){for(let e of a)if(e<=0)throw new Error("Scale value should be greater than 0.")}else for(let e of a)if(e<1)throw new Error("Scale value should be greater than or equal to 1.");if((t==="linear"||t==="cubic")&&a.length!==2&&(a.length!==4||a[0]!==1||a[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${o?"Resize":"Upsample"} opeartor.`)}});var ji,qi,wc,vc,Cb,Fb,Bb,$b,_c=D(()=>{"use strict";ve();ae();Rt();Ir();Hi();ji={name:"Resize",inputNames:["A"],inputTypes:[2]},qi=(a,t,o)=>(Vi(t,o),[a.run({...ji,cacheHint:o.cacheKey,get:()=>Cb(a,t,o)},t)]),wc=a=>xn(a,10),vc=a=>xn(a,11),Cb=(a,t,o)=>{let e=Y(a.session.backend.glContext.version),[r,n]=Fb(t,o);if(r.every(F=>F===1)&&o.coordinateTransformMode!=="tf_crop_and_resize")return{...ji,output:{dims:n,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${e.texture2D}(X, TexCoords);
                    ${e.output} = v;
                }`};let i=n.length;if(i<2)throw new Error(`output dimension should be at least 2, but got ${i}`);let u=n[i-2],l=n[i-1],c=t[0].dims;if(i!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${i}`);let p=c[i-2],b=c[i-1],x=r[i-2],v=r[i-1],_="";if(o.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${o.mode}'`);switch(o.coordinateTransformMode){case"asymmetric":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${b}.0 - 1.0, ${p}.0 - 1.0, ${b}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${o.coordinateTransformMode}'`)}let I=Ke(i),L=Mt(),B=`
            const vec2 inputWH = vec2(${p}.0, ${b}.0);
            const vec4 scaleWHWH = vec4(float(${x}), float(${v}), float(${x}), float(${v}));
            ${L}
            ${_}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${I} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${e.output} = vec4(newValue);
            }
        `;return{...ji,output:{dims:n,type:t[0].type,textureType:2},hasMain:!0,shaderSource:B}},Fb=(a,t)=>{let e=a[0].dims,r=t.scales,n;if(r.length===0){let i=a[t.scalesInputIdx];if(i&&i.size!==0){if(a[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");r=Bb(i,t.mode,t.isResize)}else{let u=a[t.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");n=Array.from(u.integerData),r=$b(n,e,t.mode,t.isResize)}}else if(a[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=n||e.map((i,u)=>Math.floor(i*r[u]));return[r,s]},Bb=(a,t,o)=>{let e=Array.from(a.floatData);return go(e,t,o),e},$b=(a,t,o,e)=>{let r=t.length,n=new Array(r);for(let s=0,i=r;s<i;s++)if(t[s]===0){if(a[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");n[s]=1}else n[s]=a[s]/t[s];return go(n,o,e),n}});var Oc,kb,Sc=D(()=>{"use strict";Sr();Oc=(a,t)=>(kb(t),[new Be([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),kb=a=>{if(!a||a.length!==1)throw new Error("Shape requires 1 input.")}});var Yi,Ic,Ac,Ec,Nb,Pc,Rb,Mb,Dc=D(()=>{"use strict";Me();Tn();fe();ae();Yi={name:"Slice",inputNames:["A"],inputTypes:[0]},Ic=(a,t,o)=>(Nb(t),[a.run({...Yi,cacheHint:o.cacheKey,get:()=>Ec(a,t[0],o)},t)]),Ac=a=>{let t=a.attributes.getInts("starts"),o=a.attributes.getInts("ends"),e=a.attributes.getInts("axes",[]);return re({starts:t,ends:o,axes:e})},Ec=(a,t,o)=>{let e=o.axes.length===0?t.dims.slice(0).map((p,b)=>b):o.axes,r=z.normalizeAxes(e,t.dims.length),n=o.starts.map((p,b)=>p>t.dims[r[b]]-1?t.dims[r[b]]:z.normalizeAxis(p,t.dims[r[b]])),s=o.ends.map((p,b)=>p>t.dims[r[b]]-1?t.dims[r[b]]:z.normalizeAxis(p,t.dims[r[b]])),i=t.dims.slice(),u=[];for(let p=0;p<r.length;p++)i[r[p]]=s[p]-n[p],n[p]>0&&u.push(`outputIdx[${r[p]}] += ${n[p]};`);let c=`
      float process(int outputIdx[${i.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Yi,output:{dims:i,type:t.type,textureType:0},shaderSource:c}},Nb=a=>{if(!a||a.length!==1)throw new Error("Slice requires 1 input.");if(rr.indexOf(a[0].type)===-1)throw new Error("Invalid input type.")},Pc=(a,t)=>{Mb(t);let o=Rb(a,t);return[a.run({...Yi,cacheHint:o.cacheKey,get:()=>Ec(a,t[0],o)},[t[0]])]},Rb=(a,t)=>{if(!a.session.isInitializer(t[1].dataId)||!a.session.isInitializer(t[2].dataId)||t.length>=4&&!a.session.isInitializer(t[3].dataId)||t.length>=5&&!a.session.isInitializer(t[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let o=Array.from(t[1].integerData),e=Array.from(t[2].integerData),r=t.length>=4?Array.from(t[3].integerData):[],n=`${r};${o};${e}`;return{starts:o,ends:e,axes:r,cacheKey:n}},Mb=a=>{if(!a||a.length<3||a.length>5)throw new Error("Invalid input number.");if(a[1].type!=="int32"||a[1].dims.length!==1)throw new Error("Invalid input type.");if(a[2].type!=="int32"||a[2].dims.length!==1)throw new Error("Invalid input type.");if(a.length>=4&&(a[3].type!=="int32"||a[3].dims.length!==1))throw new Error("Invalid input type.");if(a.length>=5&&(a[4].type!=="int32"||a[4].dims.length!==1))throw new Error("Invalid input type.")}});var Lc,Cc,Fc,Bc,$c,kc,Nc,Rc,Gb,Ub,zb,Mc,Gc=D(()=>{"use strict";Me();fe();ve();ae();ho();Lc={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Cc={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Fc={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Bc=(a,t,o)=>{Mc(t);let e=t[0].dims.slice(),r=z.normalizeAxis(o.axis,e.length),n=z.sizeToDimension(e,r),s=z.sizeFromDimension(e,r);return Rc(a,t,o,n,s)},$c=a=>re({axis:a.attributes.getInt("axis",1)}),kc=a=>re({axis:a.attributes.getInt("axis",-1)}),Nc=(a,t,o)=>{Mc(t);let e=t[0].dims.slice(),r=z.normalizeAxis(o.axis,e.length),n=e.length,s=r!==n-1,i=[],u=[],l=[],c;s&&(u=Array.from({length:n}).map((v,_)=>_),u[r]=n-1,u[n-1]=r,u.map(v=>i.push(e[v])),c=re({perm:u}),l=Er(a,t,c));let p=s?z.sizeToDimension(i,n-1):z.sizeToDimension(e,n-1),b=s?z.sizeFromDimension(i,n-1):z.sizeFromDimension(e,n-1),x=Rc(a,s?l:t,o,p,b);return s?Er(a,x,c):x},Rc=(a,t,o,e,r)=>{let n=Gb(a,t[0],e,r,[e]),s=a.run({...Lc,cacheHint:o.cacheKey,get:()=>n},t),i=Ub(a,t[0],e,r,n.output.dims,[e]),u=a.run({...Cc,cacheHint:o.cacheKey,get:()=>i},[t[0],s]),l=zb(a,t[0],e,r,n.output.dims,i.output.dims);return[a.run({...Fc,cacheHint:o.cacheKey,get:()=>l},[t[0],s,u])]},Gb=(a,t,o,e,r)=>{let[n,s]=a.calculateTextureWidthAndHeight(t.dims,0),i=r.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(r.length!==1)throw new Error("Dimensionality of the output should be 1");if(r[0]!==o)throw new Error("Shape of the output should be equal to logical row count");let u=Y(a.session.backend.glContext.version),l=`
      float process(int[${i}] indices) {
        int logical_row_start_offset = indices[0] * ${e};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${n},
        ${s} )));
        for(int i=1; i<${e}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${n}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Lc,output:{dims:r,type:t.type,textureType:0},shaderSource:l}},Ub=(a,t,o,e,r,n)=>{let[s,i]=a.calculateTextureWidthAndHeight(t.dims,0),u=n.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(n.length!==1)throw new Error("Dimensionality of the output should be 1");if(n[0]!==o)throw new Error("Shape of the output should be equal to logical row count");if(r.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(r[0]!==o)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=Y(a.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${e};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${e}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${i}))) - max);
        }

        return norm_factor;
      }`;return{...Cc,output:{dims:n,type:t.type,textureType:0},shaderSource:c}},zb=(a,t,o,e,r,n)=>{let[s,i]=a.calculateTextureWidthAndHeight(t.dims,0),u=t.dims.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(r.length!==1||n.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(r[0]!==o||n[0]!==o)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${i});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${e};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Fc,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:l}},Mc=a=>{if(!a||a.length!==1)throw new Error("Softmax requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type")}});var Uc,zc,Wc,Wb,Vb,Hb,Vc=D(()=>{"use strict";Me();fe();ae();Uc={name:"Split",inputNames:["A"],inputTypes:[0]},zc=(a,t,o)=>{Hb(t);let e=z.normalizeAxis(o.axis,t[0].dims.length),r=Wb(a,t,e,o),n=[];for(let s=0;s<r;++s)n.push(a.run({...Uc,cacheHint:`${o.cacheKey};${s}`,get:()=>Vb(a,t[0],o,e,s)},t));return n},Wc=a=>{let t=a.attributes.getInt("axis",0),o=a.attributes.getInts("split",[]),e=a.outputs.length;return re({axis:t,split:o,numOutputs:e})},Wb=(a,t,o,e)=>{let[,r]=dn.splitShape(t[0].dims,o,e.split,e.numOutputs);return r.length},Vb=(a,t,o,e,r)=>{let[n,s]=dn.splitShape(t.dims,e,o.split,o.numOutputs),i=s[r],u=n[r],c=`
      float process(int indices[${u.length}]) {
        indices[${e}] += ${i};
        return _A(indices);
      }
    `;return{...Uc,cacheHint:`${o.cacheKey}:${r}`,output:{dims:u,type:t.type,textureType:0},shaderSource:c}},Hb=a=>{if(!a||a.length!==1)throw new Error("Split requires one input.");if(a[0].type!=="int8"&&a[0].type!=="uint8"&&a[0].type!=="int16"&&a[0].type!=="uint16"&&a[0].type!=="int32"&&a[0].type!=="uint32"&&a[0].type!=="float32"&&a[0].type!=="float64"&&a[0].type!=="bool")throw new Error("Invalid input type.")}});var Xi,Hc,jc,jb,qb,qc=D(()=>{"use strict";fe();Xi=(a,t,o)=>{jb(t);let e=z.squeezeShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},Hc=(a,t)=>(qb(t),Xi(a,[t[0]],Array.from(t[1].integerData))),jc=a=>a.attributes.getInts("axes"),jb=a=>{if(!a||a.length!==1)throw new Error("Squeeze requires 1 input.");if(a[0].type==="string")throw new Error("invalid input tensor types.")},qb=a=>{if(!a||a.length!==2)throw new Error("Squeeze requires 2 inputs.");if(a[1].type!=="int32")throw new Error("Invalid input type.")}});var Yc,Yb,Xb,Xc=D(()=>{"use strict";ve();ae();Yc=(a,t)=>{Xb(t);let o={name:"Sum",inputNames:t.map((r,n)=>`X${n}`),inputTypes:new Array(t.length).fill(0)};return[a.run({...o,get:()=>Yb(a,t,o)},t)]},Yb=(a,t,o)=>{let e=Y(a.session.backend.glContext.version),r=t[0].dims.slice(),s=`
      void main() {
        vec4 result = ${t.map((i,u)=>`${e.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${e.output} = result;
      }
    `;return{...o,output:{dims:r,type:t[0].type,textureType:0},hasMain:!0,shaderSource:s}},Xb=a=>{if(!a||a.length===0)throw new Error("Sum requires inputs.");let t=a[0].dims.length;for(let o=1;o<a.length;o++){if(t!==a[o].dims.length)throw new Error("Input shapes are mismatched.");for(let e=0;e<t;e++)if(a[0].dims[e]!==a[o].dims[e])throw new Error("Input shapes are not matched.")}if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.");for(let o=1;o<a.length;o++)if(a[0].type!==a[o].type)throw new Error("Input types are not matched.")}});var Kc,Kb,Jb,Jc=D(()=>{"use strict";Tn();ae();Kc=(a,t)=>{Jb(t);let o={name:"Tile",inputNames:["A"],inputTypes:[0]};return[a.run({...o,get:()=>Kb(a,t,o)},t)]},Kb=(a,t,o)=>{let e=t[0].dims.slice(),r=new Array(e.length),n=[];for(let u=0;u<e.length;u++)r[u]=e[u]*t[1].numberData[u],n.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${e[u]}.));`);let s=r.length,i=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${n.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...o,output:{dims:r,type:t[0].type,textureType:0},shaderSource:i}},Jb=a=>{if(!a||a.length!==2)throw new Error("Tile requires 2 input.");if(a[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(a[1].dims[0]!==a[0].dims.length)throw new Error("Invalid input shape.");if(rr.indexOf(a[0].type)===-1)throw new Error("Invalid input type.");if(a[1].type!=="int32"&&a[1].type!=="int16")throw new Error("Invalid repeat type.")}});var Ki,Zc,Qc,Zb,Qb,ep=D(()=>{"use strict";fe();Ki=(a,t,o)=>{Zb(t);let e=z.unsqueezeShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},Zc=(a,t)=>(Qb(t),Ki(a,[t[0]],Array.from(t[1].integerData))),Qc=a=>a.attributes.getInts("axes"),Zb=a=>{if(!a||a.length!==1)throw new Error("Unsqueeze requires 1 input.");if(a[0].type==="string")throw new Error("invalid input tensor types.")},Qb=a=>{if(!a||a.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(a[1].type!=="int32")throw new Error("Invalid input type.")}});var tp,rp=D(()=>{"use strict";cl();Ol();Al();Fl();fo();gf();_f();If();Pf();Ff();kf();Gf();Vf();co();Yf();sc();mc();gc();_c();Sc();Dc();Gc();Vc();qc();Xc();Jc();ho();Fi();ep();Hi();tp=[["Abs","","6+",Bl],["Acos","","7+",$l],["Add","","7+",pl],["And","","7+",dl],["Asin","","7+",kl],["Atan","","7+",Nl],["AveragePool","","7+",Kf,Jf],["BatchNormalization","","7+",ll,fl],["Cast","","6+",Sl,Il],["Ceil","","6+",Gl],["Clip","","6-10",Li,Rl],["Clip","","11+",Ml],["Concat","","4+",Dl,Cl],["Conv","","1+",Mi,Gi],["ConvTranspose","","1+",mf,bf],["Cos","","7+",Ul],["Div","","7+",hl],["Dropout","","7+",Ci],["DepthToSpace","","1+",wf,vf],["Equal","","7+",ml],["Elu","","6+",zl,Wl],["Exp","","6+",Vl],["Flatten","","1+",Of,Sf],["Floor","","6+",Hl],["FusedConv","com.microsoft","1+",Mi,Gi],["Gather","","1+",Af,Ef],["Gemm","","7-10",Ui,Lf],["Gemm","","11+",Ui,Cf],["GlobalAveragePool","","1+",Qf,ec],["GlobalMaxPool","","1+",ic],["Greater","","7+",bl],["Identity","","1+",Ci],["ImageScaler","","1+",Bf,$f],["InstanceNormalization","","6+",Rf,Mf],["LeakyRelu","","6+",jl,ql],["Less","","7+",gl],["LRN","","1+",Uf,zf],["Log","","6+",Yl],["MatMul","","1+",uf,lf],["MaxPool","","1+",tc,rc],["Mul","","7+",yl],["Neg","","6+",Xl],["Not","","1+",Kl],["Or","","7+",Tl],["Pad","","2-10",zi,Hf],["Pad","","11+",jf,qf],["Pow","","7+",xl],["PRelu","","7+",wl],["ReduceLogSum","","1+",dc,nr],["ReduceMax","","1+",fc,nr],["ReduceMean","","1+",lc,nr],["ReduceMin","","1+",cc,nr],["ReduceProd","","1+",pc,nr],["ReduceSum","","1-12",uc,nr],["ReduceSumSquare","","1+",hc,nr],["Relu","","6+",Jl],["Reshape","","5+",bc],["Resize","","10",qi,wc],["Resize","","11+",qi,vc],["Shape","","1+",Oc],["Sigmoid","","6+",Zl],["Sin","","7+",Ql],["Slice","","10+",Pc],["Slice","","1-9",Ic,Ac],["Softmax","","1-12",Bc,$c],["Softmax","","13+",Nc,kc],["Split","","2-12",zc,Wc],["Sqrt","","6+",ef],["Squeeze","","1-12",Xi,jc],["Squeeze","","13+",Hc],["Sub","","7+",vl],["Sum","","6+",Yc],["Tan","","7+",tf],["Tanh","","6+",rf],["Tile","","6+",Kc],["Transpose","","1+",Er,Tf],["Upsample","","7-8",Wi,Tc],["Upsample","","9",Wi,xc],["Unsqueeze","","1-12",Ki,Qc],["Unsqueeze","","13+",Zc],["Xor","","7+",_l]]});function op(a){let t={},o;for(;(o=np.exec(a))!==null;){let e=o[3].split(",").map(r=>{let n=r.trim().split(" ");return n&&n.length===2?{type:n[0],name:n[1]}:null}).filter(r=>r!==null);t[o[2]]={params:e,body:o[4]}}for(let e in t){let r=eg.replace("__FUNC__",e),n=new RegExp(r,"gm");for(;(o=n.exec(a))!==null;){let s=o[1],i=o[2],u=o[3].split(","),l=s?`${s} ${i};`:"",c=t[e].body,p="";t[e].params.forEach((x,v)=>{x&&(p+=`${x.type} ${x.name} = ${u[v]};
`)}),c=`${p}
 ${c}`,c=c.replace("return",`${i} = `);let b=`
      ${l}
      {
        ${c}
      }
      `;a=a.replace(o[0],b)}}return a=a.replace(np,""),a}var np,eg,ip=D(()=>{"use strict";np=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,eg="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Yr(a,t){let o=[],e=[],r=t!=null&&Array.isArray(t)&&t.length===0,n=t==null||r?null:tg(t,a).sort(),s=0;for(let i=0;i<a.length;++i){if(n!=null){if(n[s]===i&&a[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${a[i]}' is not 1`);(n[s]==null||n[s]>i)&&a[i]===1&&(o.push(a[i]),e.push(i)),n[s]<=i&&s++}a[i]!==1&&(o.push(a[i]),e.push(i))}return{newShape:o,keptDims:e}}function tg(a,t){let o=t.length;return a=a==null?t.map((e,r)=>r):[].concat(a),zr(a.every(e=>e>=-o&&e<o),()=>`All values in axis param must be in range [-${o}, ${o}) but got axis ${a}`),zr(a.every(rg),()=>`All values in axis param must be integers but got axis ${a}`),a.map(e=>e<0?o+e:e)}function rg(a){return a%1===0}function ng(a){if(a.length===0)return 1;let t=a[0];for(let o=1;o<a.length;o++)t*=a[o];return t}function ap(a){let t=Math.ceil(Math.sqrt(a));return[t,Math.ceil(a/t)]}var yo,Ji=D(()=>{"use strict";pt();fe();yo=class{constructor(t){this.maxTextureSize=t}computeTextureWH(t,o){let e=this.computeTexture(t,o);return o&&o.isPacked&&(e[0]/=2,e[1]/=2),o&&o.reverseWH?[e[1],e[0]]:e}computeTexture(t,o){let e=o&&o.isPacked;if(t.length===0)return e?[2,2]:[1,1];let r=this.maxTextureSize;if(o&&o.breakAxis!==void 0){let i=o.breakAxis>=t.length?1:t.slice(o.breakAxis).reduce((l,c)=>l*c),u=o.breakAxis<=0?1:t.slice(0,o.breakAxis).reduce((l,c)=>l*c);if(i>r||u>r)pe.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${t}, breakAxis:${o.breakAxis}`);else return[i,u]}let n=t.slice(0);e&&(r=r*2,n=n.map((i,u)=>u>=n.length-2?n[u]%2===0?n[u]:n[u]+1:n[u]),n.length===1&&(n=[2,n[0]])),n.length!==2&&(n=Yr(n).newShape);let s=ng(n);return n.length<=1&&s<=r?[1,s]:n.length===2&&n[0]<=r&&n[1]<=r?n:n.length===3&&n[0]*n[1]<=r&&n[2]<=r?[n[0]*n[1],n[2]]:n.length===3&&n[0]<=r&&n[1]*n[2]<=r?[n[0],n[1]*n[2]]:n.length===4&&n[0]*n[1]*n[2]<=r&&n[3]<=r?[n[0]*n[1]*n[2],n[3]]:n.length===4&&n[0]<=r&&n[1]*n[2]*n[3]<=r?[n[0],n[1]*n[2]*n[3]]:e?ap(s/4).map(i=>i*2):ap(s)}}});var To,sp=D(()=>{"use strict";fe();Xt();ve();Ji();Rt();To=class extends bt{constructor(o){super(o)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let o="offsetToCoords";return{offsetToCoords:new G(`
      vec2 ${o}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let o="coordsToOffset";return{coordsToOffset:new G(`
      int ${o}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let o=this.context.outputTextureLayout;return o.isPacked?this.getPackedOutputSamplingSnippet(o):this.getUnpackedOutputSamplingSnippet(o)}getPackedOutputSamplingSnippet(o){let e=o.unpackedShape,r=[o.width,o.height],n={},s="getOutputCoords";switch(e.length){case 0:n[s]=this.getOutputScalarCoords();break;case 1:n[s]=this.getOutputPacked1DCoords(e,r);break;case 2:n[s]=this.getOutputPacked2DCoords(e,r);break;case 3:n[s]=this.getOutputPacked3DCoords(e,r);break;default:n[s]=this.getOutputPackedNDCoords(e,r)}let u=`
      void setOutput(vec4 val) {
        ${Y(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return n[l]=new G(u),n}getUnpackedOutputSamplingSnippet(o){let e=o.unpackedShape,r=[o.width,o.height],n={},s="getOutputCoords";switch(e.length){case 0:n[s]=this.getOutputScalarCoords();break;case 1:n[s]=this.getOutputUnpacked1DCoords(e,r);break;case 2:n[s]=this.getOutputUnpacked2DCoords(e,r);break;case 3:n[s]=this.getOutputUnpacked3DCoords(e,r);break;case 4:n[s]=this.getOutputUnpacked4DCoords(e,r);break;case 5:n[s]=this.getOutputUnpacked5DCoords(e,r);break;case 6:n[s]=this.getOutputUnpacked6DCoords(e,r);break;default:throw new Error(`Unsupported output dimensionality: ${e.length}`)}let u=`
        void setOutput(float val) {
          ${Y(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return n[l]=new G(u),n}getOutputScalarCoords(){return new G(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(o,e){let r=e,n="";return r[0]===1?(n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${r[1]}.0);
          }
        `,new G(n)):r[1]===1?(n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${r[0]}.0);
          }
        `,new G(n)):(n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${r[0]}, ${r[1]}));
          return 2 * (resTexRC.y * ${r[0]} + resTexRC.x);
        }
      `,new G(n))}getOutputPacked2DCoords(o,e){let r="";if(wr.arraysEqual(o,e))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${e[0]}, ${e[1]}));
        }
      `,new G(r);let n=e,s=Math.ceil(o[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));

          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new G(r)}getOutputPacked3DCoords(o,e){let r=[e[0],e[1]],n=Math.ceil(o[2]/2),s=n*Math.ceil(o[1]/2),i=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;

          int b = index / ${s};
          index -= b * ${s};

          // reverse r and c order for packed texture
          int r = imod(index, ${n}) * 2;
          int c = 2 * (index / ${n});

          return ivec3(b, r, c);
        }
      `;return new G(i)}getOutputPackedNDCoords(o,e){let r=[e[0],e[1]],n=Math.ceil(o[o.length-1]/2),s=n*Math.ceil(o[o.length-2]/2),i=s,u="",l="b, r, c";for(let p=2;p<o.length-1;p++)i*=o[o.length-p-1],u=`
      int b${p} = index / ${i};
      index -= b${p} * ${i};
    `+u,l=`b${p}, `+l;let c=`
      ivec${o.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${r[0]}, ${r[1]}));
        int index = resTexRC.y * ${r[0]} + resTexRC.x;

        ${u}

        int b = index / ${s};
        index -= b * ${s};

        // reverse r and c order for packed texture
        int r = imod(index, ${n}) * 2;
        int c = 2 * (index / ${n});

        return ivec${o.length}(${l});
      }
    `;return new G(c)}getOutputUnpacked1DCoords(o,e){let r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          return resTexRC.y * ${e[0]} + resTexRC.x;
        }
      `;return new G(r)}getOutputUnpacked2DCoords(o,e){let r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          int r = index / ${o[1]};
          int c = index - r * ${o[1]};
          return ivec2(r, c);
        }
      `;return new G(r)}getOutputUnpacked3DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,b=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${b};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new G(r)}getOutputUnpacked4DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,b=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${b};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new G(r)}getOutputUnpacked5DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2","d3"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,b=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${b};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new G(r)}getOutputUnpacked6DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2","d3","d4"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,b=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${b};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${e[0]}, ${e[1]}));
         int index = resTexRC.y * ${e[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new G(r)}getCommonUtilFuncs(){let o={},e="uvFromFlat";o[e]=new G(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e="packedUVfrom1D",o[e]=new G(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="packedUVfrom2D",o[e]=new G(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="packedUVfrom3D",o[e]=new G(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="sampleTexture";let r=Y(this.context.glContext.version);return o[e]=new G(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),o}getInputsSamplingSnippets(){let o={},e=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,n)=>{let s=this.context.inputTextureLayouts[n],i=no(r);s.isPacked?o[i]=this.getPackedSamplerFromInput(i,r,s):o[i]=this.getUnpackedSamplerFromInput(i,r,s);let u=qu(r);s.unpackedShape.length<=e.unpackedShape.length&&(s.isPacked?o[u]=this.getPackedSamplerAtOutputCoords(u,s,e,r):o[u]=this.getUnpackedSamplerAtOutputCoords(u,s,e,r))}),o}getPackedSamplerAtOutputCoords(o,e,r,n){let s=e.unpackedShape,i=r.unpackedShape,l=no(n),c=s.length,p=i.length,b=Xe.getBroadcastDims(s,i),x=Ke(p),v=p-c,_,I=Et();c===0?_="":p<2&&b.length>=1?_="coords = 0;":_=b.map(He=>`coords.${I[He+v]} = 0;`).join(`
`);let L="";p<2&&c>0?L="coords":L=s.map((He,Fe)=>`coords.${I[Fe+v]}`).join(", ");let B="return outputValue;",J=z.size(s)===1,U=z.size(i)===1;if(c===1&&!J&&!U)B=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(J&&!U)p===1?B=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:B=`
          return vec4(outputValue.x);
        `;else if(b.length){let He=c-2,Fe=c-1;b.indexOf(He)>-1&&b.indexOf(Fe)>-1?B="return vec4(outputValue.x);":b.indexOf(He)>-1?B="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":b.indexOf(Fe)>-1&&(B="return vec4(outputValue.xx, outputValue.zz);")}let ie=`
        int lastDim = coords.${I[p-1]};
        coords.${I[p-1]} = coords.${I[p-2]};
        coords.${I[p-2]} = lastDim;
      `,at=`
      vec4 ${o}() {
        ${x} coords = getOutputCoords();
        ${ie}
        ${_}
        vec4 outputValue = ${l}(${L});
        ${B}
      }
    `;return new G(at,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(o,e,r,n){let s=[r.width,r.height],i=[e.width,e.height],u=e.unpackedShape.length,l=r.unpackedShape.length,c=e.unpackedShape,p=r.unpackedShape,b=no(n);if(u===l&&wr.arraysEqual(i,s)){let J=`
          float ${o}() {
            return sampleTexture(${n}, TexCoords);
          }
        `;return new G(J,["coordinates.sampleTexture"])}let x=Ke(l),v=Xe.getBroadcastDims(c,p),_=l-u,I,L=Et();u===0?I="":l<2&&v.length>=1?I="coords = 0;":I=v.map(J=>`coords.${L[J+_]} = 0;`).join(`
`);let B="";l<2&&u>0?B="coords":B=e.unpackedShape.map((J,j)=>`coords.${L[j+_]}`).join(", ");let F=`
        float ${o}() {
          ${x} coords = getOutputCoords();
          ${I}
          return ${b}(${B});
        }
      `;return new G(F,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(o,e,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(o,e);case 1:return this.getPackedSampler1D(o,e,r);case 2:return this.getPackedSampler2D(o,e,r);case 3:return this.getPackedSampler3D(o,e,r);default:return this.getPackedSamplerND(o,e,r)}}getUnpackedSamplerFromInput(o,e,r){let n=r.unpackedShape;switch(n.length){case 0:return this.getUnpackedSamplerScalar(o,e,r);case 1:return this.getUnpackedSampler1D(o,e,r);case 2:return this.getUnpackedSampler2D(o,e,r);case 3:return this.getUnpackedSampler3D(o,e,r);case 4:return this.getUnpackedSampler4D(o,e,r);case 5:return this.getUnpackedSampler5D(o,e,r);case 6:return this.getUnpackedSampler6D(o,e,r);default:throw new Error(`Unsupported dimension ${n.length}-D`)}}getPackedSamplerScalar(o,e){let r=Y(this.context.glContext.version),n=`
          vec4 ${o}() {
            return ${r.texture2D}(${e}, halfCR);
          }
        `;return new G(n)}getPackedSampler1D(o,e,r){let n=[r.width,r.height],s=[n[1],n[0]],i=Y(this.context.glContext.version),l=`vec4 ${o}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${i.texture2D}(${e}, uv);
    }`;return new G(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(o,e,r){let n=r.unpackedShape,s=[r.width,r.height],i=Y(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&wr.arraysEqual(n,s)){let v=`vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${i.texture2D}(${e}, uv);
      }`;return new G(v)}let c=s,p=Math.ceil(n[1]/2),x=`vec4 ${o}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${p}, row, col);
      return ${i.texture2D}(${e}, uv);
    }`;return new G(x,["coordinates.packedUVfrom2D"])}getPackedSampler3D(o,e,r){let n=r.unpackedShape,s=[r.width,r.height],i=[s[0],s[1]],u=Y(this.context.glContext.version);if(n[0]===1){let _=n.slice(1),I=[1,2],L=Wr(n,_),B=["b","row","col"],F=JSON.parse(JSON.stringify(r));F.unpackedShape=L;let J=this.getPackedSamplerFromInput(o,e,F),U=`${J.routineBody}
      vec4 ${o}(int b, int row, int col) {
        return ${o}(${Vr(B,I)});
      } `;return new G(U,J.dependencies)}let l=i[0],c=i[1],p=Math.ceil(n[2]/2),b=p*Math.ceil(n[1]/2),v=`vec4 ${o}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${b}, ${p}, b, row, col);
      return ${u.texture2D}(${e}, uv);}`;return new G(v,["coordinates.packedUVfrom3D"])}getPackedSamplerND(o,e,r){let n=r.unpackedShape,s=n.length,i=[r.width,r.height],u=Y(this.context.glContext.version),l=[i[0],i[1]],c=l[1],p=l[0],b=Math.ceil(n[s-1]/2),x=b*Math.ceil(n[s-2]/2),v="int b, int row, int col",_=`b * ${x} + (row / 2) * ${b} + (col / 2)`;for(let B=2;B<s-1;B++)v=`int b${B}, `+v,x*=n[s-B-1],_=`b${B} * ${x} + `+_;let L=`vec4 ${o}(${v}) {
      int index = ${_};
      int texR = index / ${p};
      int texC = index - texR * ${p};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${p}, ${c});
      return ${u.texture2D}(${e}, uv);
    }`;return new G(L)}getUnpackedSamplerScalar(o,e,r){let[n,s]=[r.width,r.height];if(n===1&&s===1){let u=`
          float ${o}() {
            return sampleTexture(${e}, halfCR);
          }
        `;return new G(u,["coordinates.sampleTexture"])}let i=`
        float ${o}() {
          int offset_${e} = coordsToOffset(TexCoords, ${n}, ${s});
          vec2 uv = uvFromFlat(${n}, ${s}, offset_${e});
          return sampleTexture(${e}, uv);
        }
      `;return new G(i,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(o,e,r){let n=r.width,s=r.height;if(s===1&&n===1){let u=`
        float ${o}(int index) {
          return sampleTexture(${e}, halfCR);
        }
      `;return new G(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${o}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${n}.0, 0.5);
            return sampleTexture(${e}, uv);
          }
        `;return new G(u,["coordinates.sampleTexture"])}if(n===1){let u=`
          float ${o}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new G(u,["coordinates.sampleTexture"])}let i=`
        float ${o}(int index) {
          vec2 uv = uvFromFlat(${n}, ${s}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new G(i,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(o,e,r){let n=r.unpackedShape,s=[r.height,r.width];if(s!=null&&wr.arraysEqual(n,s)){let x=s[1],v=s[0],_=`
          float ${o}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${x}.0, ${v}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new G(_,["coordinates.sampleTexture"])}let{newShape:i,keptDims:u}=Yr(n),l=i;if(l.length<n.length){let x=Wr(n,l),v=JSON.parse(JSON.stringify(r));v.unpackedShape=x;let _=["col","row"],I=`
          ${this.getUnpackedSamplerFromInput(o,e,v).routineBody}
          float ${o}(int row, int col) {
            return ${o}(${Vr(_,u)});
          }
        `;return new G(I,["coordinates.sampleTexture"])}let c=s[1],p=s[0];if(p===1){let x=`
          float ${o}(int row, int col) {
            int offset_${e} = coordsToOffset(TexCoords, ${c}, ${p});
            float index = dot(vec3(row, col, offset_${e}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new G(x,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let x=`
          float ${o}(int row, int col) {
            int offset_${e} = coordsToOffset(TexCoords, ${c}, ${p});
            float index = dot(vec3(row, col, offset_${e}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${p}.0, 0.5);
            return sampleTexture(${e}, uv);
          }
        `;return new G(x,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let b=`
        float ${o}(int row, int col) {
          int index = col * ${n[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${p}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new G(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(o,e,r){let n=r.unpackedShape,s=n[1]*n[2],i=n[2],{newShape:u,keptDims:l}=Yr(n),c=u;if(c.length<n.length){let v=Wr(n,c),_=["batch","col","row"],I=JSON.parse(JSON.stringify(r));I.unpackedShape=v;let L=this.getUnpackedSamplerFromInput(o,e,I),B=l.reverse(),F=`
          ${L.routineBody}
          float ${o}(int batch, int row, int col) {
            return ${o}(${Vr(_,B)});
          }
        `;return new G(F,L.dependencies)}let p=r.width,b=r.height,x=`
          float ${o}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${i} + row;
            vec2 uv = uvFromFlat(${p}, ${b}, index);
            return sampleTexture(${e}, uv);
          }
      `;return new G(x,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(o,e,r){let n=r.unpackedShape,s=n[3],i=n[2]*s,u=n[1]*i,l=r.width,c=r.height,p=`
        float ${o}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${i} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new G(p,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(o,e,r){let n=r.unpackedShape,s=n[4],i=n[3]*s,u=n[2]*i,l=n[1]*u,{newShape:c,keptDims:p}=Yr(n);if(c.length<n.length){let _=Wr(n,c),I=["row","col","depth","depth2","depth3"],L=JSON.parse(JSON.stringify(r));L.unpackedShape=_;let B=`
          ${this.getUnpackedSamplerFromInput(o,e,L).routineBody}
          float ${o}(int row, int col, int depth, int depth2, int depth3) {
            return ${o}(${Vr(I,p)});
          }
        `;return new G(B,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let b=r.width,x=r.height,v=`
        float ${o}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${i} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${b}, ${x}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new G(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(o,e,r){let n=r.unpackedShape,s=n[5],i=n[4]*s,u=n[3]*i,l=n[2]*u,c=n[1]*l,{newShape:p,keptDims:b}=Yr(n);if(p.length<n.length){let I=Wr(n,p),L=["row","col","depth","depth2","depth3","depth4"],B=JSON.parse(JSON.stringify(r));B.unpackedShape=I;let F=`
            ${this.getUnpackedSamplerFromInput(o,e,B).routineBody}
            float ${o}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${o}(${Vr(L,b)});
            }
          `;return new G(F,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let x=r.width,v=r.height,_=`
          float ${o}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${l} + depth * ${u} +
            depth2 * ${i} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${x}, ${v}, index);
            return sampleTexture(${e}, uv);
          }
        `;return new G(_,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let o=this.context.outputTextureLayout,e=o.shape.length,r=o.strides,n=o.width,s=o.height,i=[];for(let l=0;l<e-1;++l)i.push(`
        c[${l}] = offset / ${r[l]};`),i.push(`
        offset -= c[${l}] * ${r[l]};`);i.push(`
        c[${e-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${e}]) {
        int offset = coordsToOffset(texCoords, ${n}, ${s});
        ${i.join("")}
      }
      void toVec(int offset, out int c[${e}]) {
        ${i.join("")}
      }
    `;return{toVec:new G(u,["coordinates.coordsToOffset"])}}valueFrom(){let o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r],i=(n.unpackedShape.length>0?n.unpackedShape:n.shape).length,u=`_${e}`;o[u]=new G(this.getValueFromSingle(e,i,n.width,n.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",o[u]=new G(this.getValueFromSingle(e,i,n.width,n.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),o}getValueFromSingle(o,e,r,n,s){let i=`_${o}`;s&&(i=i+"_T");let u=Y(this.context.glContext.version);return`
        float ${i}(int m[${e}]) {
          int offset = indicesToOffset${i}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          float value = getColorAsFloat(${u.texture2D}(${o}, coords));
          return value;
        }
        `}getPackedValueFrom(o,e,r,n,s){let i=`_${o}_Pack`;s&&(i=i+"_T");let u=Y(this.context.glContext.version);return`
        vec4 ${i}(int m[${e}]) {
          int offset = indicesToOffset_${o}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          return ${u.texture2D}(${o}, coords);
        }
        `}}});var xo,up=D(()=>{"use strict";Xt();xo=class a extends bt{constructor(t){super(t)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new G(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new G(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=a.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new G(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let t=a.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new G(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let t=new ArrayBuffer(4),o=new Uint32Array(t),e=new Uint8Array(t);if(o[0]=3735928559,e[0]===239)return!0;if(e[0]===222)return!1;throw new Error("unknown endianness")}}});var wo,lp=D(()=>{"use strict";Xt();ve();wo=class extends bt{constructor(t){super(t)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let t=Y(this.context.glContext.version);return{setFragColor:new G(`
        void setFragColor(float value) {
            ${t.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new G(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var vo,fp=D(()=>{"use strict";Xt();vo=class a extends bt{constructor(t){super(t)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let t=this.context.outputTextureLayout.shape.length,o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r].unpackedShape;if(n.length<=t){let s=n.length,i=t-s,u=`bcastIndices_${e}`,l="";for(let p=0;p<s;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${i+p}]), ${n[p]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${t}], out int realIndices[${s}]) {
          ${l}
        }
        `;o[u]=new G(c)}}),o}bcastMatmulIndex(){let t=this.context.outputTextureLayout.shape.length,o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r].shape;if(!(n.length<2||n.length>t)){let s=n.length,i=t-s,u=`bcastMatmulIndices_${e}`,l="";for(let p=0;p<s-2;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${i+p}]), ${n[p]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${t}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${t-1}];
          realIndices[${s-2}] = bcastedIndices[${t-2}];
        }
        `;o[u]=new G(c)}}),o}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=this.context.inputTextureLayouts[e].strides,s=r.length,i=`indicesToOffset_${o}`;t[i]=new G(a.indexToOffsetSingle(i,s,n)),i=`indicesToOffset_${o}_T`,t[i]=new G(a.indexToOffsetSingle(i,s,n.slice().reverse()))}),t}static indexToOffsetSingle(t,o,e){let r="";for(let n=o-1;n>=0;--n)r+=`
        offset += indices[${n}] * ${e[n]};
        `;return`
      int ${t}(int indices[${o}]) {
        int offset = 0;
        ${r}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=this.context.inputTextureLayouts[e].strides,s=r.length,i=`offsetToIndices_${o}`;t[i]=new G(a.offsetToIndicesSingle(i,s,n)),i=`offsetToIndices_${o}_T`,t[i]=new G(a.offsetToIndicesSingle(i,s,n.slice().reverse()))}),t}static offsetToIndicesSingle(t,o,e){let r=[];for(let n=0;n<o-1;++n)r.push(`
      indices[${n}] = offset / ${e[n]};`),r.push(`
        offset -= indices[${n}] * ${e[n]};`);return r.push(`
      indices[${o-1}] = offset;`),`
      void ${t}(int offset, out int indices[${o}]) {
        ${r.join("")}
      }
      `}incrementIndices(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=r.length,s=`incrementIndices_${o}`,i="";for(let l=0;l<n;++l)i+=`
        shape[${l}] = ${r[l]};`;let u=`
        void ${s}(int axis, out int indices[${n}]) {
          int shape[${n}];
          ${i};
          for(int i = ${n} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;t[s]=new G(u)}),t}}});var _o,cp=D(()=>{"use strict";Xt();_o=class extends bt{constructor(t){super(t)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let o=this.context.outputTextureLayout.shape.length,e={add:"+=",sub:"-=",mul:"*=",div:"/="},r={};for(let n in e){let s=`${n}Vec`,i="";for(let l=0;l<o;++l)i+=`
          dest[${l}] ${e[n]} src[${l}];
          `;let u=`
        void ${s}(int src[${o}], out int dest[${o}]) {
          ${i}
        }
        `;r[s]=new G(u)}return r}copyVec(){let o=this.context.outputTextureLayout.shape.length,e="";for(let n=0;n<o;++n)e+=`
        dest[${n}] = src[${n}];
        `;let r=`
      void copyVec(int src[${o}], out int dest[${o}]) {
        ${e}
      }
      `;return{copyVec:new G(r)}}setVecItem(){let o=this.context.outputTextureLayout.shape.length,e=`
        if(index < 0)
            index =${o} + index;
        if (index == 0)
            m[0] = value;
        `;for(let n=1;n<o-1;++n)e+=`
        else if (index == ${n})
            m[${n}] = value;
            `;e+=`
        else
            m[${o-1}] = value;
        `;let r=`
      void setVecItem(out int m[${o}], int index, int value) {
        ${e}
      }
        `;return{setVecItem:new G(r)}}getVecItem(){let o=this.context.outputTextureLayout.shape.length,e=`
        if(index < 0)
            index = ${o} + index;
        if (index == 0)
            return m[0];
      `;for(let n=1;n<o-1;++n)e+=`
        else if (index == ${n})
            return m[${n}];
      `;e+=`
        else
            return m[${o-1}];
        `;let r=`
      int getVecItem(int m[${o}], int index) {
        ${e}
      }
    `;return{getVecItem:new G(r)}}}});var Zi,pp=D(()=>{"use strict";sp();up();lp();fp();cp();Zi={encoding:xo,fragcolor:wo,vec:_o,shapeUtils:vo,coordinates:To}});var Oo,dp=D(()=>{"use strict";Xt();ip();pp();ve();Oo=class{constructor(t,o,e,r){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new so(t,o,e,r),Object.keys(Zi).forEach(s=>{let i=new Zi[s](this.context);this.libs[s]=i});let n=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let c=s+"."+l,p;n[c]?(p=n[c],p.routineBody=u[l].routineBody):(p=new yn(c,u[l].routineBody),n[c]=p);let b=u[l].dependencies;if(b)for(let x=0;x<b.length;++x)if(n[b[x]])p.addDependency(n[b[x]]);else{let v=new yn(b[x]);n[b[x]]=v,p.addDependency(v)}}}}preprocess(){let t=this.context.programInfo,o=t.shaderSource;return this.context.programInfo.hasMain||(o=`${o}
      ${ju(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),o=op(o),`${Hu(this.context.glContext.version)}
    ${this.getUniforms(t.inputNames,t.variables)}
    ${this.getImports(o)}
    ${o}`}getImports(t){let o=this.selectGlslLibRoutinesToBeIncluded(t);if(o.length===0)return"";let e="";for(let r=0;r<o.length;++r)if(o[r].routineBody)e+=o[r].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${o[r].name}`);return e}selectGlslLibRoutinesToBeIncluded(t){let o=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(e=>{let r=e.split(".")[1];t.indexOf(r)!==-1&&o.push(this.glslLibRoutineDependencyGraph[e])}),uo.returnOrderedNodes(o)}getUniforms(t,o){let e=[];if(t)for(let r of t)e.push(`uniform sampler2D ${r};`);if(o)for(let r of o)e.push(`uniform ${r.type} ${r.name}${r.arrayLength?`[${r.arrayLength}]`:""};`);return e.join(`
`)}}});var So,hp=D(()=>{"use strict";_t();pt();dp();ve();So=class{constructor(t,o,e){this.profiler=t;this.glContext=o;this.textureLayoutStrategy=e;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,o){this.repo.set(t,o)}run(t,o,e){this.profiler.event("op",`ProgramManager.run ${t.programInfo.name??"unknown kernel"}`,()=>{let r=this.glContext.gl,n=t.program;r.useProgram(n);try{this.bindOutput(e),this.attributesBound||this.bindAttributes(t.attribLocations),this.bindUniforms(t.uniformLocations,t.programInfo.variables??[],o)}catch(s){throw pe.error("ProgramManager",t.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(t=>this.glContext.deleteProgram(t.program))}build(t,o,e){return this.profiler.event("backend","ProgramManager.build",()=>{let r=new Oo(this.glContext,t,o,e),n=r.preprocess(),s=this.compile(n);return{programInfo:t,program:s,uniformLocations:this.getUniformLocations(s,r.context.programInfo.inputNames,r.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(t){if(!this.vertexShader){pe.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let r=Vu(this.glContext.version);this.vertexShader=this.glContext.compileShader(r,this.glContext.gl.VERTEX_SHADER)}ee.debug&&pe.verbose("ProrgramManager",`FragShader:
${t}
`);let o=this.glContext.compileShader(t,this.glContext.gl.FRAGMENT_SHADER),e=this.glContext.createProgram(this.vertexShader,o);return this.glContext.deleteShader(o),e}bindOutput(t){let o=t.width,e=t.height;pe.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${o}/${e}, shape=${t.shape}, type=${t.tensor.type}`),this.glContext.attachFramebuffer(t.texture,o,e)}bindAttributes(t){let o=t.position,e=t.textureCoord;this.glContext.setVertexAttributes(o,e),this.attributesBound=!0}bindUniforms(t,o,e){let r=this.glContext.gl,n=0;for(let{name:s,type:i,location:u,arrayLength:l}of t){let c=o.find(p=>p.name===s)?.data;if(i!=="sampler2D"&&!c)throw new Error(`variable '${s}' does not have data defined in program info`);switch(i){case"sampler2D":this.bindTexture(e[n],u,n),n++;break;case"float":l?r.uniform1fv(u,c):r.uniform1f(u,c);break;case"int":l?r.uniform1iv(u,c):r.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${i}`)}}}bindTexture(t,o,e){this.glContext.bindTextureToUniform(t.texture,e,o)}getAttribLocations(t){return{position:this.getAttribLocation(t,"position"),textureCoord:this.getAttribLocation(t,"textureCoord")}}getUniformLocations(t,o,e){let r=[];if(o)for(let n of o)r.push({name:n,type:"sampler2D",location:this.getUniformLocation(t,n)});if(e)for(let n of e)r.push({...n,location:this.getUniformLocation(t,n.name)});return r}getUniformLocation(t,o){let r=this.glContext.gl.getUniformLocation(t,o);if(r===null)throw new Error(`Uniform ${o} not found.`);return r}getAttribLocation(t,o){return this.glContext.gl.getAttribLocation(t,o)}}});var Io,mp=D(()=>{"use strict";pt();bn();Io=class{constructor(t,o,e,r){this.glContext=t;this.layoutStrategy=o;this.profiler=e;this.config=r;this.pendingRead=new Map;r.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(t,o,e,r){let n=this.toEncoderType(t),s=this.glContext.getEncoder(n,o.channels||1,r);if(o.isPacked&&r===1)throw new Error("not implemented");let i=o.width,u=o.height,l,c;if(this.config.reuseTextures){l=`${i}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let b=this.idleTextures.get(l);if(b&&b.length>0){let x=b.pop();return c.push(x),r===1&&this.glContext.updateTexture(x,i,u,s,this.toTextureData(t,e)),x}}pe.verbose("TextureManager",`Creating new texture of size ${o.width}x${o.height}`);let p=this.glContext.allocateTexture(i,u,s,this.toTextureData(t,e));return this.config.reuseTextures&&(c.push(p),this.textureLookup.set(p,l)),p}readTexture(t,o,e){return e||(e=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let r=t.shape.reduce((s,i)=>s*i)*e,n=this.glContext.readTexture(t.texture,t.width,t.height,r,this.toEncoderType(o),e);return this.toTensorData(o,n)})}async readTextureAsync(t,o,e){let r=t.tensor.dataId;if(e||(e=1),this.pendingRead.has(r)){let n=this.pendingRead.get(r);return new Promise(s=>n?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(r,[]);let n=t.shape.reduce((l,c)=>l*c)*e;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(t.texture,t.width,t.height,n,this.toEncoderType(o),e),i=this.toTensorData(o,s),u=this.pendingRead.get(r);return this.pendingRead.delete(r),u?.forEach(l=>l(i)),i})}readUint8TextureAsFloat(t){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let o=t.shape.reduce((r,n)=>r*n),e=this.glContext.readTexture(t.texture,t.width,t.height,o*4,"byte",4);return new Float32Array(e.buffer,e.byteOffset,o)})}releaseTexture(t,o){let e;if(this.config.reuseTextures&&(e=this.textureLookup.get(t.texture),e)){o&&this.textureLookup.delete(e);let r=this.inUseTextures.get(e);if(r){let n=r.indexOf(t.texture);if(n!==-1){r.splice(n,1);let s=this.idleTextures.get(e);s||(s=[],this.idleTextures.set(e,s)),s.push(t.texture)}}}(!e||o)&&(pe.verbose("TextureManager",`Deleting texture of size ${t.width}x${t.height}`),this.glContext.deleteTexture(t.texture))}toTensorData(t,o){switch(t){case"int16":return o instanceof Int16Array?o:Int16Array.from(o);case"int32":return o instanceof Int32Array?o:Int32Array.from(o);case"int8":return o instanceof Int8Array?o:Int8Array.from(o);case"uint16":return o instanceof Uint16Array?o:Uint16Array.from(o);case"uint32":return o instanceof Uint32Array?o:Uint32Array.from(o);case"uint8":case"bool":return o instanceof Uint8Array?o:Uint8Array.from(o);case"float32":return o instanceof Float32Array?o:Float32Array.from(o);case"float64":return o instanceof Float64Array?o:Float64Array.from(o);default:throw new Error(`TensorData type ${t} is not supported`)}}toTextureData(t,o){if(o)return o instanceof Float32Array?o:new Float32Array(o)}toEncoderType(t){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var Ao,bp=D(()=>{"use strict";pt();Ds();sl();rp();hp();Ji();mp();Ao=class{constructor(t,o){this.backend=t;this.context=o;this.layoutStrategy=new yo(t.glContext.maxTextureSize),this.programManager=new So(this.context.profiler,t.glContext,this.layoutStrategy),this.textureManager=new Io(t.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:t.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=t.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new ao(this)}onGraphInitialized(t){let o=t.getValues().filter(e=>e.from===-1&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(o)}isInitializer(t){return this.initializers?this.initializers.has(t):!1}addInitializer(t){this.initializers.add(t)}getTextureData(t,o){return o?this.packedTextureDataCache.get(t):this.unpackedTextureDataCache.get(t)}setTextureData(t,o,e=!1){pe.verbose("WebGLSessionHandler","Storing Texture data in cache"),e?this.packedTextureDataCache.set(t,o):this.unpackedTextureDataCache.set(t,o)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(t=>this.textureManager.releaseTexture(t,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(t=>this.textureManager.releaseTexture(t,!0)),this.unpackedTextureDataCache=new Map}resolve(t,o,e){let r=Ps(t,o,tp);return{impl:r.opImpl,context:r.opInit?r.opInit(t,e):t}}}});function og(a){let t=0;for(;t<a.length&&a[t]();++t);return t-1}var wn,gp=D(()=>{"use strict";_t();bn();bn();Rt();wn=class{constructor(t,o){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=t,this.version=o,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(t,o,e,r){let n=this.gl,s=n.createTexture();n.bindTexture(n.TEXTURE_2D,s),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);let i=r?e.encode(r,t*o):null;return n.texImage2D(n.TEXTURE_2D,0,e.internalFormat,t,o,0,e.format,e.textureType,i),this.checkError(),s}updateTexture(t,o,e,r,n){let s=this.gl;s.bindTexture(s.TEXTURE_2D,t);let i=r.encode(n,o*e);s.texSubImage2D(s.TEXTURE_2D,0,0,0,o,e,r.format,r.textureType,i),this.checkError()}attachFramebuffer(t,o,e){let r=this.gl;r.bindTexture(r.TEXTURE_2D,t),r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),this.checkError(),r.viewport(0,0,o,e),r.scissor(0,0,o,e)}readTexture(t,o,e,r,n,s){let i=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(t,o,e);let u=this.getEncoder(n,s),l=u.allocate(o*e);return i.bindTexture(i.TEXTURE_2D,t),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,t,0),i.readPixels(0,0,o,e,i.RGBA,u.textureType,l),this.checkError(),u.decode(l,r)}isFramebufferReady(){return!0}getActiveTexture(){let t=this.gl;return`TEXTURE${t.getParameter(this.gl.ACTIVE_TEXTURE)-t.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(t,o){let e=this.gl;e.vertexAttribPointer(t,3,e.FLOAT,!1,20,0),e.enableVertexAttribArray(t),o!==-1&&(e.vertexAttribPointer(o,2,e.FLOAT,!1,20,12),e.enableVertexAttribArray(o)),this.checkError()}createProgram(t,o){let e=this.gl,r=e.createProgram();return e.attachShader(r,t),e.attachShader(r,o),e.linkProgram(r),r}compileShader(t,o){let e=this.gl,r=e.createShader(o);if(!r)throw new Error(`createShader() returned null with type ${o}`);if(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${e.getShaderInfoLog(r)}
Shader source:
${t}`);return r}deleteShader(t){this.gl.deleteShader(t)}bindTextureToUniform(t,o,e){let r=this.gl;r.activeTexture(r.TEXTURE0+o),this.checkError(),r.bindTexture(r.TEXTURE_2D,t),this.checkError(),r.uniform1i(e,o),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ee.debug){let t=this.gl,o=t.getError(),e="";switch(o){case t.NO_ERROR:return;case t.INVALID_ENUM:e="INVALID_ENUM";break;case t.INVALID_VALUE:e="INVALID_VALUE";break;case t.INVALID_OPERATION:e="INVALID_OPERATION";break;case t.INVALID_FRAMEBUFFER_OPERATION:e="INVALID_FRAMEBUFFER_OPERATION";break;case t.OUT_OF_MEMORY:e="OUT_OF_MEMORY";break;case t.CONTEXT_LOST_WEBGL:e="CONTEXT_LOST_WEBGL";break;default:e=`Unknown WebGL Error: ${o.toString(16)}`}throw new Error(e)}}deleteTexture(t){this.gl.deleteTexture(t)}deleteProgram(t){this.gl.deleteProgram(t)}getEncoder(t,o,e=0){if(this.version===2)return new oo(this.gl,o);switch(t){case"float":return e===1||this.isRenderFloat32Supported?new mn(this.gl,o):new mn(this.gl,o,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new io(this.gl,o);default:throw new Error(`Invalid dataType: ${t}`)}}clearActiveTextures(){let t=this.gl;for(let o=0;o<this.maxTextureImageUnits;++o)t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(this.framebuffer),t.bindBuffer(t.ARRAY_BUFFER,null),t.deleteBuffer(this.vertexbuffer),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),t.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let t=this.gl,o=t.createBuffer();if(!o)throw new Error("createBuffer() returned null");let e=this.createDefaultGeometry();return t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),this.checkError(),o}createFramebuffer(){let t=this.gl.createFramebuffer();if(!t)throw new Error("createFramebuffer returned null");return t}queryVitalParameters(){let t=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=t.getParameter(t.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let t=this.gl,o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o);let e=this.version===2?t.RGBA32F:t.RGBA;t.texImage2D(t.TEXTURE_2D,0,e,1,1,0,t.RGBA,t.FLOAT,null);let r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0);let n=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;return t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteTexture(o),t.deleteFramebuffer(r),n}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let t=this.gl,o,e,r,n,s;try{o=t.createTexture(),e=t.createFramebuffer(),t.bindTexture(t.TEXTURE_2D,o);let i=this.version===2?t.RGBA32F:t.RGBA;return t.texImage2D(t.TEXTURE_2D,0,i,1,1,0,t.RGBA,t.FLOAT,null),t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),t.enable(t.BLEND),r=t.createShader(t.VERTEX_SHADER),!r||(t.shaderSource(r,"void main(){}"),t.compileShader(r),n=t.createShader(t.FRAGMENT_SHADER),!n)||(t.shaderSource(n,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),t.compileShader(n),s=t.createProgram(),!s)?!1:(t.attachShader(s,r),t.attachShader(s,n),t.linkProgram(s),t.useProgram(s),t.drawArrays(t.POINTS,0,1),t.getError()===t.NO_ERROR)}finally{t.disable(t.BLEND),s&&t.deleteProgram(s),r&&t.deleteShader(r),n&&t.deleteShader(n),e&&(t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(e)),o&&(t.bindTexture(t.TEXTURE_2D,null),t.deleteTexture(o))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let t=this.gl,o=this.disjointTimerQueryWebgl2Extension,e=t.createQuery();return t.beginQuery(o.TIME_ELAPSED_EXT,e),e}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let t=this.gl,o=this.disjointTimerQueryWebgl2Extension;t.endQuery(o.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(t){let o=!1,e=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let r=this.gl,n=this.disjointTimerQueryWebgl2Extension;o=r.getQueryParameter(t,r.QUERY_RESULT_AVAILABLE),e=r.getParameter(n.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return o&&!e}getTimerResult(t){let o=0;if(this.version===2){let e=this.gl;o=e.getQueryParameter(t,e.QUERY_RESULT),e.deleteQuery(t)}else throw new Error("WebGL1 profiling currently not supported");return o/1e6}async waitForQueryAndGetTime(t){return await _i(()=>this.isTimerResultAvailable(t)),this.getTimerResult(t)}async createAndWaitForFence(){let t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let o,e=t,r=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);return t.flush(),r===null?o=()=>!0:o=()=>{let n=e.clientWaitSync(r,0,0);return n===e.ALREADY_SIGNALED||n===e.CONDITION_SATISFIED},{query:r,isFencePassed:o}}async pollFence(t){return new Promise(o=>{this.addItemToPoll(()=>t.isFencePassed(),()=>o())})}pollItems(){let t=og(this.itemsToPoll.map(o=>o.isDoneFn));for(let o=0;o<=t;++o){let{resolveFn:e}=this.itemsToPoll[o];e()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}async addItemToPoll(t,o){this.itemsToPoll.push({isDoneFn:t,resolveFn:o}),!(this.itemsToPoll.length>1)&&await _i(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Qi(a){let t;if((!a||a==="webgl2")&&"webgl2"in Xr?t=Xr.webgl2:(!a||a==="webgl")&&"webgl"in Xr&&(t=Xr.webgl),!t)try{let e=ag();t=yp(e,a)}catch{let r=ig();t=yp(r,a)}a=a||t.version===1?"webgl":"webgl2";let o=t.gl;return Xr[a]=t,o.isContextLost()?(delete Xr[a],Qi(a)):(o.disable(o.DEPTH_TEST),o.disable(o.STENCIL_TEST),o.disable(o.BLEND),o.disable(o.DITHER),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SAMPLE_COVERAGE),o.enable(o.SCISSOR_TEST),o.enable(o.CULL_FACE),o.cullFace(o.BACK),t)}function yp(a,t){let o={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},e,r=o;if((!t||t==="webgl2")&&(e=a.getContext("webgl2",r),e))try{return new wn(e,2)}catch(n){pe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${n}`)}if((!t||t==="webgl")&&(e=a.getContext("webgl",r)||a.getContext("experimental-webgl",r),e))try{return new wn(e,1)}catch(n){pe.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${n}`)}throw new Error("WebGL is not supported")}function ig(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let a=document.createElement("canvas");return a.width=1,a.height=1,a}function ag(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Xr,Tp=D(()=>{"use strict";pt();gp();Xr={}});var Eo,xp=D(()=>{"use strict";_t();pt();bp();Tp();Eo=class{get contextId(){return ee.webgl.contextId}set contextId(t){ee.webgl.contextId=t}get matmulMaxBatchSize(){return ee.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(t){ee.webgl.matmulMaxBatchSize=t}get textureCacheMode(){return ee.webgl.textureCacheMode}set textureCacheMode(t){ee.webgl.textureCacheMode=t}get pack(){return ee.webgl.pack}set pack(t){ee.webgl.pack=t}get async(){return ee.webgl.async}set async(t){ee.webgl.async=t}initialize(){try{return this.glContext=Qi(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),pe.setWithEnv(ee),ee.webgl.context||Object.defineProperty(ee.webgl,"context",{value:this.glContext.gl}),pe.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(t){return pe.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${t}`),!1}}createSessionHandler(t){return new Ao(this,t)}dispose(){this.glContext.dispose()}}});async function ea(a){if(a){let t=typeof a=="string"?[a]:a;for(let o of t){let e=wp.get(o);if(e)return e;let r=await ug(o);if(r)return r}}else return ea(["webgl"]);throw new Error("no available backend to use")}async function ug(a){let t=sg;if(typeof t[a]<"u"&&lg(t[a])){let o=t[a],e=o.initialize();if(typeof e=="object"&&"then"in e&&(e=await e),e)return wp.set(a,o),o}}function lg(a){let t=a;return"initialize"in t&&typeof t.initialize=="function"&&"createSessionHandler"in t&&typeof t.createSessionHandler=="function"&&"dispose"in t&&typeof t.dispose=="function"}var wp,sg,vp=D(()=>{"use strict";xp();wp=new Map,sg={webgl:new Eo}});var ta,Po,_p=D(()=>{"use strict";pt();ta=class{constructor(t,o){this.op=t;this.node=o}},Po=class{constructor(t,o,e){this.graph=t;this.profiler=e;this.initialize(o)}initialize(t){this.profiler.event("session","ExecutionPlan.initialize",()=>{let o=this.graph.getNodes();if(o.length!==t.length)throw new Error("The size of nodes and OPs do not match.");this._ops=t.map((e,r)=>new ta(e,o[r])),this.reset(),this._starter=[],this._ops.forEach((e,r)=>{let n=!0;for(let s of e.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){n=!1;break}n&&this._starter.push(r)})})}reset(){this._values=this.graph.getValues().map(t=>t.tensor)}async execute(t,o){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let e=t.createInferenceHandler(),r=this.graph.getInputIndices();if(o.length!==r.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${o.length} expected: ${r.length}`);o.forEach((c,p)=>{let b=r[p];this._values[b]=c});let n=this._starter.slice(0),s=this.graph.getValues(),i=this.graph.getNodes(),u=0;for(;u<n.length;){let c=n[u++],p=this._ops[c],b=p.node.inputs.map(I=>this._values[I]);if(b.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let x=b;pe.verbose("ExecPlan",`Runing op:${p.node.name} (${x.map((I,L)=>`'${p.node.inputs[L]}': ${I.type}[${I.dims.join(",")}]`).join(", ")})`);let v=await this.profiler.event("node",p.node.name,async()=>p.op.impl(e,x,p.op.context));if(v.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");v.forEach((I,L)=>{let B=p.node.outputs[L];if(this._values[B])throw new Error(`output [${B}] already has value: op:${p.node.name}`);this._values[B]=I});let _=new Set;v.forEach((I,L)=>{let B=p.node.outputs[L];for(let F of s[B].to){let J=i[F],j=!0;for(let U of J.inputs)if(!this._values[U]){j=!1;break}j&&_.add(F)}}),n.push(..._)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let p=this.graph.getOutputIndices()[c],b=this._values[p];if(b===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await b.getData():b.data,l.push(b)}return pe.verbose("ExecPlan","disposing of inferenceHandler"),e.dispose(),l})}}});var oe,Tt,vn,Op=D(()=>{"use strict";ln();oe=Nr(Ur());Sr();fe();Tt=H.experimental.fbs,vn=class a{constructor(t){if(this._attributes=new Map,t!=null){for(let o of t)o instanceof oe.onnx.AttributeProto?this._attributes.set(o.name,[a.getValue(o),a.getType(o)]):o instanceof Tt.Attribute&&this._attributes.set(o.name(),[a.getValue(o),a.getType(o)]);if(this._attributes.size<t.length)throw new Error("duplicated attribute names")}}set(t,o,e){this._attributes.set(t,[e,o])}delete(t){this._attributes.delete(t)}getFloat(t,o){return this.get(t,"float",o)}getInt(t,o){return this.get(t,"int",o)}getString(t,o){return this.get(t,"string",o)}getTensor(t,o){return this.get(t,"tensor",o)}getFloats(t,o){return this.get(t,"floats",o)}getInts(t,o){return this.get(t,"ints",o)}getStrings(t,o){return this.get(t,"strings",o)}getTensors(t,o){return this.get(t,"tensors",o)}get(t,o,e){let r=this._attributes.get(t);if(r===void 0){if(e!==void 0)return e;throw new Error(`required attribute not found: ${t}`)}if(r[1]!==o)throw new Error(`type mismatch: expected ${o} but got ${r[1]}`);return r[0]}static getType(t){let o=t instanceof oe.onnx.AttributeProto?t.type:t.type();switch(o){case oe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case oe.onnx.AttributeProto.AttributeType.INT:return"int";case oe.onnx.AttributeProto.AttributeType.STRING:return"string";case oe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case oe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case oe.onnx.AttributeProto.AttributeType.INTS:return"ints";case oe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case oe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${oe.onnx.AttributeProto.AttributeType[o]}`)}}static getValue(t){let o=t instanceof oe.onnx.AttributeProto?t.type:t.type();if(o===oe.onnx.AttributeProto.AttributeType.GRAPH||o===oe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let e=this.getValueNoCheck(t);if(o===oe.onnx.AttributeProto.AttributeType.INT&&ot.isLong(e))return ot.longToNumber(e);if(o===oe.onnx.AttributeProto.AttributeType.INTS){let r=e,n=new Array(r.length);for(let s=0;s<r.length;s++){let i=r[s];n[s]=ot.longToNumber(i)}return n}if(o===oe.onnx.AttributeProto.AttributeType.TENSOR)return t instanceof oe.onnx.AttributeProto?Be.fromProto(e):Be.fromOrtTensor(e);if(o===oe.onnx.AttributeProto.AttributeType.TENSORS){if(t instanceof oe.onnx.AttributeProto)return e.map(n=>Be.fromProto(n));if(t instanceof Tt.Attribute)return e.map(n=>Be.fromOrtTensor(n))}return o===oe.onnx.AttributeProto.AttributeType.STRING&&t instanceof oe.onnx.AttributeProto?hn(e):o===oe.onnx.AttributeProto.AttributeType.STRINGS&&t instanceof oe.onnx.AttributeProto?e.map(hn):e}static getValueNoCheck(t){return t instanceof oe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(t):this.getValueNoCheckFromOrtFormat(t)}static getValueNoCheckFromOnnxFormat(t){switch(t.type){case oe.onnx.AttributeProto.AttributeType.FLOAT:return t.f;case oe.onnx.AttributeProto.AttributeType.INT:return t.i;case oe.onnx.AttributeProto.AttributeType.STRING:return t.s;case oe.onnx.AttributeProto.AttributeType.TENSOR:return t.t;case oe.onnx.AttributeProto.AttributeType.GRAPH:return t.g;case oe.onnx.AttributeProto.AttributeType.FLOATS:return t.floats;case oe.onnx.AttributeProto.AttributeType.INTS:return t.ints;case oe.onnx.AttributeProto.AttributeType.STRINGS:return t.strings;case oe.onnx.AttributeProto.AttributeType.TENSORS:return t.tensors;case oe.onnx.AttributeProto.AttributeType.GRAPHS:return t.graphs;default:throw new Error(`unsupported attribute type: ${oe.onnx.AttributeProto.AttributeType[t.type]}`)}}static getValueNoCheckFromOrtFormat(t){switch(t.type()){case Tt.AttributeType.FLOAT:return t.f();case Tt.AttributeType.INT:return t.i();case Tt.AttributeType.STRING:return t.s();case Tt.AttributeType.TENSOR:return t.t();case Tt.AttributeType.GRAPH:return t.g();case Tt.AttributeType.FLOATS:return t.floatsArray();case Tt.AttributeType.INTS:{let o=[];for(let e=0;e<t.intsLength();e++)o.push(t.ints(e));return o}case Tt.AttributeType.STRINGS:{let o=[];for(let e=0;e<t.stringsLength();e++)o.push(t.strings(e));return o}case Tt.AttributeType.TENSORS:{let o=[];for(let e=0;e<t.tensorsLength();e++)o.push(t.tensors(e));return o}default:throw new Error(`unsupported attribute type: ${Tt.AttributeType[t.type()]}`)}}}});var na,Do,oa,Ut,Lo,ra,Sp=D(()=>{"use strict";Op();ln();na=Nr(Ur());Sr();fe();Do=H.experimental.fbs,oa={from:(a,t)=>new ra(a,t)},Ut=class{constructor(t){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,t&&(this.type=Ve.tensorValueTypeFromProto(t.type.tensorType))}get from(){return this._from}get to(){return this._to}},Lo=class{constructor(t,o){t instanceof na.onnx.NodeProto?(this.name=t.name,this.opType=t.opType,this.attributes=new vn(t.attribute)):t instanceof Do.Node&&(this.name=o??t.name(),this.opType=t.opType(),this.attributes=new vn(Ve.tensorAttributesFromORTFormat(t))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ra=class{constructor(t,o){if(!t)throw new TypeError("graph is empty");this.buildGraph(t),this.transformGraph(o),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(t){if(t instanceof na.onnx.GraphProto)this.buildGraphFromOnnxFormat(t);else if(t instanceof Do.Graph)this.buildGraphFromOrtFormat(t);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(t){let o=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let e=new Map;if(!t.input)throw new Error("missing information in graph: input");let r=[];for(let n of t.input){if(o.has(n.name))throw new Error(`duplicated input name: ${n.name}`);let s=this._allData.push(new Ut(n))-1;o.set(n.name,s),r.push(n.name)}if(!t.initializer)throw new Error("missing information in graph: initializer");for(let n of t.initializer){let s=o.get(n.name);if(s===void 0){let i=new Ut;i.type={shape:{dims:Ve.tensorDimsFromProto(n.dims)},tensorType:Ve.tensorDataTypeFromProto(n.dataType)},s=this._allData.push(i)-1,o.set(n.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=Be.fromProto(n)}for(let n=0;n<this._allData.length;n++)this._allData[n].tensor||(this._allInputIndices.push(n),this._allInputNames.push(r[n]));if(!t.output)throw new Error("missing information in graph: output");for(let n of t.output){if(o.has(n.name))throw new Error(`duplicated output name: ${n.name}`);let s=this._allData.push(new Ut(n))-1;o.set(n.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(n.name)}if(!t.node)throw new Error("missing information in graph: node");for(let n of t.node){if(!n.name)for(let i=0;;i++){let u=`unnamed_${n.opType}_${i}`;if(!e.has(u)){n.name=u;break}}if(e.has(n.name))throw new Error(`duplicated node name: ${n.name}`);let s=this._nodes.push(new Lo(n))-1;e.set(n.name,s)}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.node[n];if(!i.output)throw new Error(`missing output for node: ${i.name}`);for(let u of i.output){let l=o.get(u);if(typeof l>"u"&&(l=this._allData.push(new Ut)-1,o.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=n,i.opType==="Constant"){if(!i.attribute||i.attribute.length!==1||!i.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!i.output||i.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=Be.fromProto(i.attribute[0].t)}}}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.node[n];if(!i.input)throw new Error(`missing input for node: ${i.name}`);for(let u of i.input){let l=o.get(u);if(typeof l>"u"){if(u===""&&(i.input.length===3||i.input.length===4)&&i.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${i.name}`)}s.inputs.push(l),this._allData[l]._to.push(n)}}return!0}buildGraphFromOrtFormat(t){let o=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let e=new Map,r=[];for(let n=0;n<t.inputsLength();n++){let s=t.inputs(n);if(o.has(s))throw new Error(`duplicated input name: ${s}`);for(let i=0;i<t.nodeArgsLength();i++)if(t.nodeArgs(i)?.name()===s){let u=new Ut;if(t.nodeArgs(i)?.type()?.valueType()!==Do.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=t.nodeArgs(i).type().value(new Do.TensorTypeAndShape),p=Ve.tensorDataTypeFromProto(c.elemType()),b=c.shape(),x=[];for(let _=0;_<b.dimLength();_++)x.push(ot.longToNumber(b.dim(_).value().dimValue()));u.type={shape:{dims:x},tensorType:p};let v=this._allData.push(u)-1;o.set(s,v),r.push(s)}}for(let n=0;n<t.initializersLength();n++){let s=t.initializers(n),i=o.get(s.name());if(i===void 0){let u=new Ut,l=Ve.tensorDimsFromORTFormat(s),c=Ve.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:c},i=this._allData.push(u)-1,o.set(s.name(),i)}this._allData[i]._from=-1,this._allData[i].tensor=Be.fromOrtTensor(s)}for(let n=0;n<this._allData.length;n++)this._allData[n].tensor||(this._allInputIndices.push(n),this._allInputNames.push(r[n]));for(let n=0;n<t.outputsLength();n++){let s=t.outputs(n);if(o.has(s))throw new Error(`duplicated output name: ${s}`);let i=this._allData.push(new Ut)-1;o.set(s,i),this._allOutputIndices.push(i),this._allOutputNames.push(s)}if(!t.nodes)throw new Error("missing information in graph: node");for(let n=0;n<t.nodesLength();n++){let s=t.nodes(n),i=s.name();if(!i)for(let l=0;i=`unnamed_${s.opType()}_${l}`,!!e.has(i);l++);if(e.has(i))throw new Error(`duplicated node name: ${i}`);let u=this._nodes.push(new Lo(s,i))-1;e.set(i,u)}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.nodes(n);if(i==null)throw new Error(`No node exists at index ${n}`);if(i?.outputsLength()===0)throw new Error(`missing output for node: ${i.name}`);for(let u=0;u<i?.outputsLength();u++){let l=i?.outputs(u),c=o.get(l);if(typeof c>"u"&&(c=this._allData.push(new Ut)-1,o.set(l,c)),s.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=n,i.opType()==="Constant"){if(i.attributesLength()!==1||!i.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(i.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=Be.fromOrtTensor(i.attributes(0).t())}}}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.nodes(n);if(i.inputsLength()===0)throw new Error(`missing input for node: ${i.name}`);for(let u=0;u<i.inputsLength();u++){let l=i.inputs(u),c=o.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${i.name()}`);s.inputs.push(c),this._allData[c]._to.push(n)}}}checkIsAcyclic(){let t=new Set;this._allInputIndices.forEach(r=>{this._allData[r]._to.forEach(s=>{t.add(s)})});let o=Array.from(t),e=new Array(this._nodes.length).fill("white");for(;o.length>0;){let r=o.pop();e[r]==="gray"?e[r]="black":(o.push(r),e[r]="gray",this._nodes[r].outputs.forEach(n=>{let s=this._allData[n];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==r)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(i=>{if(e[i]==="gray")throw new Error("model graph is cyclic");e[i]==="white"&&o.push(i)})}))}}transformGraph(t){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),t&&t.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let t=0,o=new Array(this._nodes.length,0),e=0;for(let r=0;r<this._nodes.length;r++)o[r]=e,this._nodes[r].executeNode?(e!==r&&(this._nodes[e]=this._nodes[r]),e++):this._nodes[r].outputs.forEach(n=>{this._allData[n]._from=-2});this._nodes.splice(e,this._nodes.length-e);for(let r=0;r<this._allData.length;r++){let n=this._allData[r];n._from!==void 0&&n._from!==-1&&n._from!==-2&&(n._from=o[n._from]);for(let s=0;s<n._to.length;s++)if(n._to[s]>=0)n._to[s]=o[n._to[s]];else throw new Error("Trying to update a removed node")}t=0;for(let r=0;r<this._allData.length;r++){if(this._allData[r].from===-2&&this._allOutputIndices.indexOf(r+t)===-1){t++,this._allData.splice(r,1),r--;continue}if(t>0){let n=-1;this._allData[r].from!==void 0&&this._allData[r].from!==-1?(n=this._nodes[this._allData[r].from].outputs.indexOf(r+t),n!==-1&&(this._nodes[this._allData[r].from].outputs[n]=r)):(n=this._allInputIndices.indexOf(r+t),n!==-1&&(this._allInputIndices[n]=r)),this._allData[r].to.forEach(s=>{n=this._nodes[s].inputs.indexOf(r+t),n!==-1&&(this._nodes[s].inputs[n]=r)}),this._allData[r].to.length===0&&(n=this._allOutputIndices.indexOf(r+t),n!==-1&&(this._allOutputIndices[n]=r))}}}deleteNode(t){let o=this._nodes[t];if(o.outputs.length>1){for(let i=1;i<o.outputs.length;i++)if(this._allData[o.outputs[i]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}o.executeNode=!1;let e=o.inputs[0],r=o.outputs[0],n=this._allData[r].to;for(let i=0;i<o.inputs.length;i++){let u=this._allData[o.inputs[i]].to.indexOf(t);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[o.inputs[i]].to.splice(u,1)}this._allData[r]._to=[];let s=this._allOutputIndices.indexOf(r);if(s!==-1&&(this._allOutputIndices[s]=e),n&&n.length>0)for(let i of n){let u=this._nodes[i].inputs.indexOf(r);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[i].inputs[u]=e,this._allData[e].to.push(i)}}removeAllDropoutNodes(){let t=0;for(let o of this._nodes){if(o.opType==="Dropout"){if(o.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(o.outputs.length!==1&&o.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(o.outputs.length===2&&this._allData[o.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(t)}t++}}removeAllIdentityNodes(){let t=0;for(let o of this._nodes)o.opType==="Identity"&&this.deleteNode(t),t++}isActivation(t){switch(t.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let t of this._nodes)if(t.opType==="Conv"){let o=this._allData[t.outputs[0]]._to;if(o.length===1&&this.isActivation(this._nodes[o[0]])){let e=this._nodes[o[0]];if(e.opType==="Clip")if(e.inputs.length===1)try{t.attributes.set("activation_params","floats",[e.attributes.getFloat("min"),e.attributes.getFloat("max")])}catch{t.attributes.set("activation_params","floats",[_r,Or])}else if(e.inputs.length>=3&&this._allData[e.inputs[1]].tensor!==void 0&&this._allData[e.inputs[2]].tensor!==void 0)t.attributes.set("activation_params","floats",[this._allData[e.inputs[1]].tensor.floatData[0],this._allData[e.inputs[2]].tensor.floatData[0]]);else continue;t.attributes.set("activation","string",e.opType),this.deleteNode(o[0])}}}}});var Ip,fg,Co,Ap=D(()=>{"use strict";Jn();Sp();ln();Ip=Nr(Ur());fe();fg=H.experimental.fbs,Co=class{constructor(){}load(t,o,e){if(!e)try{this.loadFromOnnxFormat(t,o);return}catch(r){if(e!==void 0)throw r}this.loadFromOrtFormat(t,o)}loadFromOnnxFormat(t,o){let e=Ip.onnx.ModelProto.decode(t);if(ot.longToNumber(e.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=e.opsetImport.map(n=>({domain:n.domain,version:ot.longToNumber(n.version)})),this._graph=oa.from(e.graph,o)}loadFromOrtFormat(t,o){let e=new S.ByteBuffer(t),r=fg.InferenceSession.getRootAsInferenceSession(e).model();if(ot.longToNumber(r.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<r.opsetImportLength();s++){let i=r.opsetImport(s);this._opsets.push({domain:i?.domain(),version:ot.longToNumber(i.version())})}this._graph=oa.from(r.graph(),o)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Fo,Ep=D(()=>{"use strict";vp();_p();pt();Ap();Fo=class{constructor(t={}){this._initialized=!1,this.backendHint=t.backendHint,this.profiler=Xn.create(t.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(t,o,e){await this.profiler.event("session","Session.loadModel",async()=>{let r=await ea(this.backendHint);if(this.sessionHandler=r.createSessionHandler(this.context),this._model=new Co,typeof t=="string"){let n=t.endsWith(".ort");if(typeof process<"u"&&process.versions&&process.versions.node){let s=await(void 0)(t);this.initialize(s,n)}else{let i=await(await fetch(t)).arrayBuffer();this.initialize(new Uint8Array(i),n)}}else if(ArrayBuffer.isView(t))this.initialize(t);else{let n=new Uint8Array(t,o||0,e||t.byteLength);this.initialize(n)}})}initialize(t,o){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let e=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(t,e,o),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new Po(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(t){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let o=this.normalizeAndValidateInputs(t),e=await this._executionPlan.execute(this.sessionHandler,o);return this.createOutput(e)})}normalizeAndValidateInputs(t){let o=this._model.graph.getInputNames();if(Array.isArray(t)){if(t.length!==o.length)throw new Error(`incorrect input array length: expected ${o.length} but got ${t.length}`)}else{if(t.size!==o.length)throw new Error(`incorrect input map size: expected ${o.length} but got ${t.size}`);let e=new Array(t.size),r=0;for(let n=0;n<o.length;++n){let s=t.get(o[n]);if(!s)throw new Error(`missing input tensor for: '${name}'`);e[r++]=s}t=e}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let e=this._model.graph.getInputIndices(),r=this._model.graph.getValues(),n=new Array(e.length);for(let s=0;s<e.length;++s){let i=r[e[s]];n[s]=i.type.shape.dims,this.context.graphInputTypes.push(i.type.tensorType),this.context.graphInputDims.push(t[s].dims)}this.validateInputTensorDims(n,t,!0)}else this.validateInputTensorDims(this.context.graphInputDims,t,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,t),t}validateInputTensorTypes(t,o){for(let e=0;e<o.length;e++){let r=t[e],n=o[e].type;if(r!==n)throw new Error(`input tensor[${e}] check failed: expected type '${r}' but got ${n}`)}}validateInputTensorDims(t,o,e){for(let r=0;r<o.length;r++){let n=t[r],s=o[r].dims;if(!this.compareTensorDims(n,s,e))throw new Error(`input tensor[${r}] check failed: expected shape '[${n.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(t,o,e){if(t.length!==o.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==o[r]&&(!e||t[r]!==0))return!1;return!0}createOutput(t){let o=this._model.graph.getOutputNames();if(t.length!==o.length)throw new Error("expected number of outputs do not match number of generated outputs");let e=new Map;for(let r=0;r<o.length;++r)e.set(o[r],t[r]);return e}initializeOps(t){let o=t.getNodes();this._ops=new Array(o.length);for(let e=0;e<o.length;e++)this._ops[e]=this.sessionHandler.resolve(o[e],this._model.opsets,t)}}});var Bo,Pp=D(()=>{"use strict";_t();Sr();Bo=class{constructor(t){this.session=t;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(t,o,e){let r=new Map;for(let i in t)if(Object.hasOwnProperty.call(t,i)){let u=t[i];r.set(i,new Be(u.dims,u.type,void 0,void 0,u.data))}let n=await this.session.run(r),s={};return n.forEach((i,u)=>{s[u]=new Ne(i.type,i.data,i.dims)}),s}async configure(t){return""}async auth(t){return""}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Dp={};pr(Dp,{onnxjsBackend:()=>pg});var ia,pg,Lp=D(()=>{"use strict";Ep();Pp();ia=class{async init(){}async createInferenceSessionHandler(t,o){let e=new Fo(o);return typeof t=="string"?await e.loadModel(t):await e.loadModel(t),new Bo(e)}},pg=new ia});var aa={};pr(aa,{createReadStream:()=>Cp,readFile:()=>dg,readFileSync:()=>hg});var dg,hg,Cp,sa=D(()=>{dg=void 0,hg=void 0,Cp=void 0});var ua={};pr(ua,{join:()=>mg});var mg,la=D(()=>{mg=void 0});var fa={};pr(fa,{crypto:()=>bg});var bg,ca=D(()=>{bg=void 0});var $p=ye((Bp,pa)=>{"use strict";var Fp=(()=>{var a=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(a=a||__filename),function(t={}){var o=t,e,r;o.ready=new Promise((h,T)=>{e=h,r=T});var n=Object.assign({},o),s="./this.program",i=typeof window=="object",u=typeof importScripts=="function",l=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",c="",p,b,x;if(l){var v=(sa(),jt(aa)),_=(la(),jt(ua));c=u?_.dirname(c)+"/":__dirname+"/",p=(h,T)=>(h=lt(h)?new URL(h):_.normalize(h),v.readFileSync(h,T?void 0:"utf8")),x=h=>(h=p(h,!0),h.buffer||(h=new Uint8Array(h)),h),b=(h,T,w,A=!0)=>{h=lt(h)?new URL(h):_.normalize(h),v.readFile(h,A?void 0:"utf8",(k,W)=>{k?w(k):T(A?W.buffer:W)})},!o.thisProgram&&1<process.argv.length&&(s=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),o.inspect=()=>"[Emscripten Module object]"}else(i||u)&&(u?c=self.location.href:typeof document<"u"&&document.currentScript&&(c=document.currentScript.src),a&&(c=a),c.indexOf("blob:")!==0?c=c.substr(0,c.replace(/[?#].*/,"").lastIndexOf("/")+1):c="",p=h=>{var T=new XMLHttpRequest;return T.open("GET",h,!1),T.send(null),T.responseText},u&&(x=h=>{var T=new XMLHttpRequest;return T.open("GET",h,!1),T.responseType="arraybuffer",T.send(null),new Uint8Array(T.response)}),b=(h,T,w)=>{var A=new XMLHttpRequest;A.open("GET",h,!0),A.responseType="arraybuffer",A.onload=()=>{A.status==200||A.status==0&&A.response?T(A.response):w()},A.onerror=w,A.send(null)});var I=console.log.bind(console),L=console.error.bind(console);Object.assign(o,n),n=null,typeof WebAssembly!="object"&&te("no native wasm support detected");var B,F=!1,J,j,U,ie,at;function He(){var h=B.buffer;o.HEAP8=J=new Int8Array(h),o.HEAP16=new Int16Array(h),o.HEAPU8=j=new Uint8Array(h),o.HEAPU16=new Uint16Array(h),o.HEAP32=U=new Int32Array(h),o.HEAPU32=ie=new Uint32Array(h),o.HEAPF32=new Float32Array(h),o.HEAPF64=at=new Float64Array(h)}var Fe=[],V=[],Ee=[],Pt=0,xt=null,$e=null;function te(h){throw h="Aborted("+h+")",L(h),F=!0,h=new WebAssembly.RuntimeError(h+". Build with -sASSERTIONS for more info."),r(h),h}var Je=h=>h.startsWith("data:application/octet-stream;base64,"),lt=h=>h.startsWith("file://"),je;if(je="ort-wasm.wasm",!Je(je)){var Dt=je;je=o.locateFile?o.locateFile(Dt,c):c+Dt}function _e(h){if(x)return x(h);throw"both async and sync fetching of the wasm failed"}function Ze(h){if(i||u){if(typeof fetch=="function"&&!lt(h))return fetch(h,{credentials:"same-origin"}).then(T=>{if(!T.ok)throw"failed to load wasm binary file at '"+h+"'";return T.arrayBuffer()}).catch(()=>_e(h));if(b)return new Promise((T,w)=>{b(h,A=>T(new Uint8Array(A)),w)})}return Promise.resolve().then(()=>_e(h))}function ar(h,T,w){return Ze(h).then(A=>WebAssembly.instantiate(A,T)).then(A=>A).then(w,A=>{L(`failed to asynchronously prepare wasm: ${A}`),te(A)})}function Lt(h,T){var w=je;return typeof WebAssembly.instantiateStreaming!="function"||Je(w)||lt(w)||l||typeof fetch!="function"?ar(w,h,T):fetch(w,{credentials:"same-origin"}).then(A=>WebAssembly.instantiateStreaming(A,h).then(T,function(k){return L(`wasm streaming compile failed: ${k}`),L("falling back to ArrayBuffer instantiation"),ar(w,h,T)}))}var wt,vt={882208:(h,T,w,A)=>{if(typeof o>"u"||!o.Ga)return 1;if(h=Ge(h>>>0),h.startsWith("./")&&(h=h.substring(2)),h=o.Ga.get(h),!h)return 2;if(T>>>=0,w>>>=0,T+w>h.byteLength)return 3;try{return j.set(h.subarray(T,T+w),A>>>0>>>0),0}catch{return 4}}};function sr(h){this.Da=h-24,this.Fa=function(T){ie[this.Da+4>>>2>>>0]=T},this.Ea=function(T){ie[this.Da+8>>>2>>>0]=T},this.La=function(T,w){this.Ma(),this.Fa(T),this.Ea(w)},this.Ma=function(){ie[this.Da+16>>>2>>>0]=0}}var Qe=0,Ct=0,Ft=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Oe=(h,T,w)=>{T>>>=0;var A=T+w;for(w=T;h[w]&&!(w>=A);)++w;if(16<w-T&&h.buffer&&Ft)return Ft.decode(h.subarray(T,w));for(A="";T<w;){var k=h[T++];if(k&128){var W=h[T++]&63;if((k&224)==192)A+=String.fromCharCode((k&31)<<6|W);else{var X=h[T++]&63;k=(k&240)==224?(k&15)<<12|W<<6|X:(k&7)<<18|W<<12|X<<6|h[T++]&63,65536>k?A+=String.fromCharCode(k):(k-=65536,A+=String.fromCharCode(55296|k>>10,56320|k&1023))}}else A+=String.fromCharCode(k)}return A},Ge=(h,T)=>(h>>>=0)?Oe(j,h,T):"",st=h=>{for(var T=0,w=0;w<h.length;++w){var A=h.charCodeAt(w);127>=A?T++:2047>=A?T+=2:55296<=A&&57343>=A?(T+=4,++w):T+=3}return T},zt=(h,T,w,A)=>{if(w>>>=0,!(0<A))return 0;var k=w;A=w+A-1;for(var W=0;W<h.length;++W){var X=h.charCodeAt(W);if(55296<=X&&57343>=X){var he=h.charCodeAt(++W);X=65536+((X&1023)<<10)|he&1023}if(127>=X){if(w>=A)break;T[w++>>>0]=X}else{if(2047>=X){if(w+1>=A)break;T[w++>>>0]=192|X>>6}else{if(65535>=X){if(w+2>=A)break;T[w++>>>0]=224|X>>12}else{if(w+3>=A)break;T[w++>>>0]=240|X>>18,T[w++>>>0]=128|X>>12&63}T[w++>>>0]=128|X>>6&63}T[w++>>>0]=128|X&63}}return T[w>>>0]=0,w-k},Bt=h=>h%4===0&&(h%100!==0||h%400===0),Zr=[0,31,60,91,121,152,182,213,244,274,305,335],In=[0,31,59,90,120,151,181,212,243,273,304,334],Wt=h=>{var T=st(h)+1,w=et(T);return w&&zt(h,j,w,T),w},Dr=[],Jt={},Lr=()=>{if(!Cr){var h={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:s||"./this.program"},T;for(T in Jt)Jt[T]===void 0?delete h[T]:h[T]=Jt[T];var w=[];for(T in h)w.push(`${T}=${h[T]}`);Cr=w}return Cr},Cr,ur=[null,[],[]],An=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return w=>crypto.getRandomValues(w);if(l)try{var h=(ca(),jt(fa));if(h.randomFillSync)return w=>h.randomFillSync(w);var T=h.randomBytes;return w=>(w.set(T(w.byteLength)),w)}catch{}te("initRandomDevice")},Qr=h=>(Qr=An())(h),lr=[31,29,31,30,31,30,31,31,30,31,30,31],En=[31,28,31,30,31,30,31,31,30,31,30,31];function be(h){var T=Array(st(h)+1);return zt(h,T,0,T.length),T}function en(h,T,w,A){function k(E,de,ge){for(E=typeof E=="number"?E.toString():E||"";E.length<de;)E=ge[0]+E;return E}function W(E,de){return k(E,de,"0")}function X(E,de){function ge(Br){return 0>Br?-1:0<Br?1:0}var ft;return(ft=ge(E.getFullYear()-de.getFullYear()))===0&&(ft=ge(E.getMonth()-de.getMonth()))===0&&(ft=ge(E.getDate()-de.getDate())),ft}function he(E){switch(E.getDay()){case 0:return new Date(E.getFullYear()-1,11,29);case 1:return E;case 2:return new Date(E.getFullYear(),0,3);case 3:return new Date(E.getFullYear(),0,2);case 4:return new Date(E.getFullYear(),0,1);case 5:return new Date(E.getFullYear()-1,11,31);case 6:return new Date(E.getFullYear()-1,11,30)}}function Ue(E){var de=E.ya;for(E=new Date(new Date(E.za+1900,0,1).getTime());0<de;){var ge=E.getMonth(),ft=(Bt(E.getFullYear())?lr:En)[ge];if(de>ft-E.getDate())de-=ft-E.getDate()+1,E.setDate(1),11>ge?E.setMonth(ge+1):(E.setMonth(0),E.setFullYear(E.getFullYear()+1));else{E.setDate(E.getDate()+de);break}}return ge=new Date(E.getFullYear()+1,0,4),de=he(new Date(E.getFullYear(),0,4)),ge=he(ge),0>=X(de,E)?0>=X(ge,E)?E.getFullYear()+1:E.getFullYear():E.getFullYear()-1}h>>>=0,T>>>=0,w>>>=0,A>>>=0;var ze=ie[A+40>>>2>>>0];A={Ja:U[A>>>2>>>0],Ia:U[A+4>>>2>>>0],Aa:U[A+8>>>2>>>0],Ca:U[A+12>>>2>>>0],Ba:U[A+16>>>2>>>0],za:U[A+20>>>2>>>0],xa:U[A+24>>>2>>>0],ya:U[A+28>>>2>>>0],Na:U[A+32>>>2>>>0],Ha:U[A+36>>>2>>>0],Ka:ze?Ge(ze):""},w=Ge(w),ze={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var We in ze)w=w.replace(new RegExp(We,"g"),ze[We]);var on="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),an="January February March April May June July August September October November December".split(" ");ze={"%a":E=>on[E.xa].substring(0,3),"%A":E=>on[E.xa],"%b":E=>an[E.Ba].substring(0,3),"%B":E=>an[E.Ba],"%C":E=>W((E.za+1900)/100|0,2),"%d":E=>W(E.Ca,2),"%e":E=>k(E.Ca,2," "),"%g":E=>Ue(E).toString().substring(2),"%G":E=>Ue(E),"%H":E=>W(E.Aa,2),"%I":E=>(E=E.Aa,E==0?E=12:12<E&&(E-=12),W(E,2)),"%j":E=>{for(var de=0,ge=0;ge<=E.Ba-1;de+=(Bt(E.za+1900)?lr:En)[ge++]);return W(E.Ca+de,3)},"%m":E=>W(E.Ba+1,2),"%M":E=>W(E.Ia,2),"%n":()=>`
`,"%p":E=>0<=E.Aa&&12>E.Aa?"AM":"PM","%S":E=>W(E.Ja,2),"%t":()=>"	","%u":E=>E.xa||7,"%U":E=>W(Math.floor((E.ya+7-E.xa)/7),2),"%V":E=>{var de=Math.floor((E.ya+7-(E.xa+6)%7)/7);if(2>=(E.xa+371-E.ya-2)%7&&de++,de)de==53&&(ge=(E.xa+371-E.ya)%7,ge==4||ge==3&&Bt(E.za)||(de=1));else{de=52;var ge=(E.xa+7-E.ya-1)%7;(ge==4||ge==5&&Bt(E.za%400-1))&&de++}return W(de,2)},"%w":E=>E.xa,"%W":E=>W(Math.floor((E.ya+7-(E.xa+6)%7)/7),2),"%y":E=>(E.za+1900).toString().substring(2),"%Y":E=>E.za+1900,"%z":E=>{E=E.Ha;var de=0<=E;return E=Math.abs(E)/60,(de?"+":"-")+("0000"+(E/60*100+E%60)).slice(-4)},"%Z":E=>E.Ka,"%%":()=>"%"},w=w.replace(/%%/g,"\0\0");for(We in ze)w.includes(We)&&(w=w.replace(new RegExp(We,"g"),ze[We](A)));return w=w.replace(/\0\0/g,"%"),We=be(w),We.length>T?0:(J.set(We,h>>>0),We.length-1)}var $t=[],ut,Vt,Pn=[],Z=(h,T)=>{if(!Vt){Vt=new WeakMap;var w=ut.length;if(Vt)for(var A=0;A<0+w;A++){var k=A,W=$t[k];W||(k>=$t.length&&($t.length=k+1),$t[k]=W=ut.get(k)),(k=W)&&Vt.set(k,A)}}if(w=Vt.get(h)||0)return w;if(Pn.length)w=Pn.pop();else{try{ut.grow(1)}catch(he){throw he instanceof RangeError?"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.":he}w=ut.length-1}try{A=w,ut.set(A,h),$t[A]=ut.get(A)}catch(he){if(!(he instanceof TypeError))throw he;if(typeof WebAssembly.Function=="function"){A=WebAssembly.Function,k={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"},W={parameters:[],results:T[0]=="v"?[]:[k[T[0]]]};for(var X=1;X<T.length;++X)W.parameters.push(k[T[X]]);T=new A(W,h)}else{for(A=[1],k=T.slice(0,1),T=T.slice(1),W={i:127,p:127,j:126,f:125,d:124,e:111},A.push(96),X=T.length,128>X?A.push(X):A.push(X%128|128,X>>7),X=0;X<T.length;++X)A.push(W[T[X]]);k=="v"?A.push(0):A.push(1,W[k]),T=[0,97,115,109,1,0,0,0,1],k=A.length,128>k?T.push(k):T.push(k%128|128,k>>7),T.push.apply(T,A),T.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),T=new WebAssembly.Module(new Uint8Array(T)),T=new WebAssembly.Instance(T,{e:{f:h}}).exports.f}A=w,ut.set(A,T),$t[A]=ut.get(A)}return Vt.set(h,w),w},Fr={a:function(h,T,w){throw h>>>=0,new sr(h).La(T>>>0,w>>>0),Qe=h,Ct++,Qe},e:function(){return 0},L:function(){},A:function(){},C:function(){},u:function(){return 0},J:function(){},E:function(){},I:function(){},k:function(){},B:function(){},y:function(){},K:function(){},z:function(){},l:()=>1,o:function(h,T,w){h=T+2097152>>>0<4194305-!!h?(h>>>0)+4294967296*T:NaN,w>>>=0,h=new Date(1e3*h),U[w>>>2>>>0]=h.getUTCSeconds(),U[w+4>>>2>>>0]=h.getUTCMinutes(),U[w+8>>>2>>>0]=h.getUTCHours(),U[w+12>>>2>>>0]=h.getUTCDate(),U[w+16>>>2>>>0]=h.getUTCMonth(),U[w+20>>>2>>>0]=h.getUTCFullYear()-1900,U[w+24>>>2>>>0]=h.getUTCDay(),U[w+28>>>2>>>0]=(h.getTime()-Date.UTC(h.getUTCFullYear(),0,1,0,0,0,0))/864e5|0},p:function(h,T,w){h=T+2097152>>>0<4194305-!!h?(h>>>0)+4294967296*T:NaN,w>>>=0,h=new Date(1e3*h),U[w>>>2>>>0]=h.getSeconds(),U[w+4>>>2>>>0]=h.getMinutes(),U[w+8>>>2>>>0]=h.getHours(),U[w+12>>>2>>>0]=h.getDate(),U[w+16>>>2>>>0]=h.getMonth(),U[w+20>>>2>>>0]=h.getFullYear()-1900,U[w+24>>>2>>>0]=h.getDay(),U[w+28>>>2>>>0]=(Bt(h.getFullYear())?Zr:In)[h.getMonth()]+h.getDate()-1|0,U[w+36>>>2>>>0]=-(60*h.getTimezoneOffset()),T=new Date(h.getFullYear(),6,1).getTimezoneOffset();var A=new Date(h.getFullYear(),0,1).getTimezoneOffset();U[w+32>>>2>>>0]=(T!=A&&h.getTimezoneOffset()==Math.min(A,T))|0},q:function(h){h>>>=0;var T=new Date(U[h+20>>>2>>>0]+1900,U[h+16>>>2>>>0],U[h+12>>>2>>>0],U[h+8>>>2>>>0],U[h+4>>>2>>>0],U[h>>>2>>>0],0),w=U[h+32>>>2>>>0],A=T.getTimezoneOffset(),k=new Date(T.getFullYear(),6,1).getTimezoneOffset(),W=new Date(T.getFullYear(),0,1).getTimezoneOffset(),X=Math.min(W,k);return 0>w?U[h+32>>>2>>>0]=+(k!=W&&X==A):0<w!=(X==A)&&(k=Math.max(W,k),T.setTime(T.getTime()+6e4*((0<w?X:k)-A))),U[h+24>>>2>>>0]=T.getDay(),U[h+28>>>2>>>0]=(Bt(T.getFullYear())?Zr:In)[T.getMonth()]+T.getDate()-1|0,U[h>>>2>>>0]=T.getSeconds(),U[h+4>>>2>>>0]=T.getMinutes(),U[h+8>>>2>>>0]=T.getHours(),U[h+12>>>2>>>0]=T.getDate(),U[h+16>>>2>>>0]=T.getMonth(),U[h+20>>>2>>>0]=T.getYear(),h=T.getTime(),isNaN(h)?(U[Ht()>>>2>>>0]=61,h=-1):h/=1e3,tn((wt=h,1<=+Math.abs(wt)?0<wt?+Math.floor(wt/4294967296)>>>0:~~+Math.ceil((wt-+(~~wt>>>0))/4294967296)>>>0:0)),h>>>0},m:function(){return-52},n:function(){},w:function(h,T,w){function A(Ue){return(Ue=Ue.toTimeString().match(/\(([A-Za-z ]+)\)$/))?Ue[1]:"GMT"}w>>>=0;var k=new Date().getFullYear(),W=new Date(k,0,1),X=new Date(k,6,1);k=W.getTimezoneOffset();var he=X.getTimezoneOffset();ie[h>>>0>>>2>>>0]=60*Math.max(k,he),U[T>>>0>>>2>>>0]=+(k!=he),h=A(W),T=A(X),h=Wt(h),T=Wt(T),he<k?(ie[w>>>2>>>0]=h,ie[w+4>>>2>>>0]=T):(ie[w>>>2>>>0]=T,ie[w+4>>>2>>>0]=h)},d:()=>{te("")},D:function(h,T,w){h>>>=0,T>>>=0,w>>>=0,Dr.length=0;for(var A;A=j[T++>>>0];){var k=A!=105;k&=A!=112,w+=k&&w%8?4:0,Dr.push(A==112?ie[w>>>2>>>0]:A==105?U[w>>>2>>>0]:at[w>>>3>>>0]),w+=k?8:4}return vt[h].apply(null,Dr)},g:()=>Date.now(),x:function(){return 4294901760},b:()=>performance.now(),H:function(h,T,w){return T>>>=0,j.copyWithin(h>>>0>>>0,T>>>0,T+(w>>>0)>>>0)},v:function(h){h>>>=0;var T=j.length;if(4294901760<h)return!1;for(var w=1;4>=w;w*=2){var A=T*(1+.2/w);A=Math.min(A,h+100663296);var k=Math;A=Math.max(h,A);e:{k=(k.min.call(k,4294901760,A+(65536-A%65536)%65536)-B.buffer.byteLength+65535)/65536;try{B.grow(k),He();var W=1;break e}catch{}W=void 0}if(W)return!0}return!1},F:function(h,T){h>>>=0,T>>>=0;var w=0;return Lr().forEach((A,k)=>{var W=T+w;for(k=ie[h+4*k>>>2>>>0]=W,W=0;W<A.length;++W)J[k++>>>0>>>0]=A.charCodeAt(W);J[k>>>0>>>0]=0,w+=A.length+1}),0},G:function(h,T){h>>>=0,T>>>=0;var w=Lr();ie[h>>>2>>>0]=w.length;var A=0;return w.forEach(k=>A+=k.length+1),ie[T>>>2>>>0]=A,0},f:()=>52,j:function(){return 52},r:function(){return 70},i:function(h,T,w,A){T>>>=0,w>>>=0,A>>>=0;for(var k=0,W=0;W<w;W++){var X=ie[T>>>2>>>0],he=ie[T+4>>>2>>>0];T+=8;for(var Ue=0;Ue<he;Ue++){var ze=j[X+Ue>>>0],We=ur[h];ze===0||ze===10?((h===1?I:L)(Oe(We,0)),We.length=0):We.push(ze)}k+=he}return ie[A>>>2>>>0]=k,0},s:function(h,T){return h>>>=0,Qr(j.subarray(h>>>0,h+(T>>>0)>>>0)),0},t:en,c:function(h,T,w,A){return en(h>>>0,T>>>0,w>>>0,A>>>0)},h:function(h,T,w,A){let k=ut.length;h=new Uint8Array(j.slice(h+T,h+w));try{var W=new WebAssembly.Module(h),X=new WebAssembly.Instance(W,{env:{memory:B}}),he;for(he in X.exports)Z(X.exports[he]);return k<ut.length?k:A}catch(Ue){return console.log(Ue),A}}},Q=function(){function h(w){return Q=w.exports,Q=Cn(),B=Q.M,He(),ut=Q.sa,V.unshift(Q.N),Pt--,Pt==0&&(xt!==null&&(clearInterval(xt),xt=null),$e&&(w=$e,$e=null,w())),Q}var T={a:Fr};if(Pt++,o.instantiateWasm)try{return o.instantiateWasm(T,h)}catch(w){L(`Module.instantiateWasm callback failed with error: ${w}`),r(w)}return Lt(T,function(w){h(w.instance)}).catch(r),{}}();o._OrtInit=(h,T)=>(o._OrtInit=Q.O)(h,T),o._OrtGetLastError=(h,T)=>(o._OrtGetLastError=Q.P)(h,T),o._OrtCreateSessionOptions=(h,T,w,A,k,W,X,he,Ue,ze)=>(o._OrtCreateSessionOptions=Q.Q)(h,T,w,A,k,W,X,he,Ue,ze),o._OrtAppendExecutionProvider=(h,T)=>(o._OrtAppendExecutionProvider=Q.R)(h,T),o._OrtAddFreeDimensionOverride=(h,T,w)=>(o._OrtAddFreeDimensionOverride=Q.S)(h,T,w),o._OrtAddSessionConfigEntry=(h,T,w)=>(o._OrtAddSessionConfigEntry=Q.T)(h,T,w),o._OrtReleaseSessionOptions=h=>(o._OrtReleaseSessionOptions=Q.U)(h),o._OrtCreateSession=(h,T,w)=>(o._OrtCreateSession=Q.V)(h,T,w),o._OrtReleaseSession=h=>(o._OrtReleaseSession=Q.W)(h),o._OrtGetInputOutputCount=(h,T,w)=>(o._OrtGetInputOutputCount=Q.X)(h,T,w),o._OrtGetInputName=(h,T)=>(o._OrtGetInputName=Q.Y)(h,T),o._OrtGetOutputName=(h,T)=>(o._OrtGetOutputName=Q.Z)(h,T),o._OrtFree=h=>(o._OrtFree=Q._)(h),o._OrtCreateTensor=(h,T,w,A,k,W)=>(o._OrtCreateTensor=Q.$)(h,T,w,A,k,W),o._OrtGetTensorData=(h,T,w,A,k)=>(o._OrtGetTensorData=Q.aa)(h,T,w,A,k),o._OrtReleaseTensor=h=>(o._OrtReleaseTensor=Q.ba)(h),o._OrtCreateRunOptions=(h,T,w,A)=>(o._OrtCreateRunOptions=Q.ca)(h,T,w,A),o._OrtAddRunConfigEntry=(h,T,w)=>(o._OrtAddRunConfigEntry=Q.da)(h,T,w),o._OrtReleaseRunOptions=h=>(o._OrtReleaseRunOptions=Q.ea)(h),o._OrtCreateBinding=h=>(o._OrtCreateBinding=Q.fa)(h),o._OrtBindInput=(h,T,w)=>(o._OrtBindInput=Q.ga)(h,T,w),o._OrtBindOutput=(h,T,w,A)=>(o._OrtBindOutput=Q.ha)(h,T,w,A),o._OrtClearBoundOutputs=h=>(o._OrtClearBoundOutputs=Q.ia)(h),o._OrtReleaseBinding=h=>(o._OrtReleaseBinding=Q.ja)(h),o._OrtRunWithBinding=(h,T,w,A,k)=>(o._OrtRunWithBinding=Q.ka)(h,T,w,A,k),o._OrtRun=(h,T,w,A,k,W,X,he)=>(o._OrtRun=Q.la)(h,T,w,A,k,W,X,he),o._OrtEndProfiling=h=>(o._OrtEndProfiling=Q.ma)(h),o._OrtConfigure=(h,T)=>(o._OrtConfigure=Q.na)(h,T),o._OrtAuth=(h,T)=>(o._OrtAuth=Q.oa)(h,T);var Ht=()=>(Ht=Q.pa)(),et=o._malloc=h=>(et=o._malloc=Q.qa)(h);o._free=h=>(o._free=Q.ra)(h);var tn=h=>(tn=Q.ta)(h),Dn=()=>(Dn=Q.ua)(),rn=h=>(rn=Q.va)(h),Ln=h=>(Ln=Q.wa)(h);o.___start_em_js=882709,o.___stop_em_js=883321;function Cn(){var h=Q;h=Object.assign({},h);var T=A=>()=>A()>>>0,w=A=>k=>A(k)>>>0;return h.pa=T(h.pa),h.qa=w(h.qa),h.ua=T(h.ua),h.wa=w(h.wa),h}o.stackAlloc=Ln,o.stackSave=Dn,o.stackRestore=rn,o.addFunction=Z,o.UTF8ToString=Ge,o.stringToUTF8=(h,T,w)=>zt(h,j,T,w),o.lengthBytesUTF8=st;var fr;$e=function h(){fr||nn(),fr||($e=h)};function nn(){if(!(0<Pt)){if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;){var h=o.preRun.shift();Fe.unshift(h)}for(;0<Fe.length;)Fe.shift()(o);if(!(0<Pt||fr||(fr=!0,o.calledRun=!0,F))){for(;0<V.length;)V.shift()(o);for(e(o);0<Ee.length;)Ee.shift()(o)}}}return nn(),t.ready}})();typeof Bp=="object"&&typeof pa=="object"?pa.exports=Fp:typeof define=="function"&&define.amd&&define([],()=>Fp)});var kp=ye(()=>{});var Np=ye(()=>{});var Rp={};pr(Rp,{cpus:()=>gg});var gg,Mp=D(()=>{gg=void 0});var zp=ye((Up,da)=>{"use strict";var Gp=(()=>{var a=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(a=a||__filename),function(t={}){function o(){return Ee.buffer!=te.buffer&&_e(),te}function e(){return Ee.buffer!=te.buffer&&_e(),Je}function r(){return Ee.buffer!=te.buffer&&_e(),lt}function n(){return Ee.buffer!=te.buffer&&_e(),je}function s(){return Ee.buffer!=te.buffer&&_e(),Dt}var i=t,u,l;i.ready=new Promise((f,d)=>{u=f,l=d});var c=Object.assign({},i),p="./this.program",b=(f,d)=>{throw d},x=typeof window=="object",v=typeof importScripts=="function",_=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",I=i.ENVIRONMENT_IS_PTHREAD||!1,L="";function B(f){return i.locateFile?i.locateFile(f,L):L+f}var F,J,j;if(_){var U=(sa(),jt(aa)),ie=(la(),jt(ua));L=v?ie.dirname(L)+"/":__dirname+"/",F=(d,g)=>(d=Ge(d)?new URL(d):ie.normalize(d),U.readFileSync(d,g?void 0:"utf8")),j=d=>(d=F(d,!0),d.buffer||(d=new Uint8Array(d)),d),J=(d,g,O,C=!0)=>{d=Ge(d)?new URL(d):ie.normalize(d),U.readFile(d,C?void 0:"utf8",($,M)=>{$?O($):g(C?M.buffer:M)})},!i.thisProgram&&1<process.argv.length&&(p=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),b=(d,g)=>{throw process.exitCode=d,g},i.inspect=()=>"[Emscripten Module object]";let f;try{f=kp()}catch(d){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),d}global.Worker=f.Worker}else(x||v)&&(v?L=self.location.href:typeof document<"u"&&document.currentScript&&(L=document.currentScript.src),typeof a<"u"&&a&&(L=a),L.indexOf("blob:")!==0?L=L.substr(0,L.replace(/[?#].*/,"").lastIndexOf("/")+1):L="",_||(F=f=>{var d=new XMLHttpRequest;return d.open("GET",f,!1),d.send(null),d.responseText},v&&(j=f=>{var d=new XMLHttpRequest;return d.open("GET",f,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),J=(f,d,g)=>{var O=new XMLHttpRequest;O.open("GET",f,!0),O.responseType="arraybuffer",O.onload=()=>{O.status==200||O.status==0&&O.response?d(O.response):g()},O.onerror=g,O.send(null)}));_&&typeof performance>"u"&&(global.performance=Np().performance);var at=console.log.bind(console),He=console.error.bind(console);_&&(at=(...f)=>U.writeSync(1,f.join(" ")+`
`),He=(...f)=>U.writeSync(2,f.join(" ")+`
`));var Fe=at,V=He;Object.assign(i,c),c=null,typeof WebAssembly!="object"&&Ft("no native wasm support detected");var Ee,Pt,xt=!1,$e,te,Je,lt,je,Dt;function _e(){var f=Ee.buffer;i.HEAP8=te=new Int8Array(f),i.HEAP16=new Int16Array(f),i.HEAPU8=Je=new Uint8Array(f),i.HEAPU16=new Uint16Array(f),i.HEAP32=lt=new Int32Array(f),i.HEAPU32=je=new Uint32Array(f),i.HEAPF32=new Float32Array(f),i.HEAPF64=Dt=new Float64Array(f)}var Ze=16777216;if(I)Ee=i.wasmMemory;else if(i.wasmMemory)Ee=i.wasmMemory;else if(Ee=new WebAssembly.Memory({initial:Ze/65536,maximum:65536,shared:!0}),!(Ee.buffer instanceof SharedArrayBuffer))throw V("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),_&&V("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");_e(),Ze=Ee.buffer.byteLength;var ar=[],Lt=[],wt=[],vt=0,sr=null,Qe=null;function Ct(){if(vt--,vt==0&&(sr!==null&&(clearInterval(sr),sr=null),Qe)){var f=Qe;Qe=null,f()}}function Ft(f){throw f="Aborted("+f+")",V(f),xt=!0,$e=1,f=new WebAssembly.RuntimeError(f+". Build with -sASSERTIONS for more info."),l(f),f}var Oe=f=>f.startsWith("data:application/octet-stream;base64,"),Ge=f=>f.startsWith("file://"),st;st="ort-wasm-threaded.wasm",Oe(st)||(st=B(st));function zt(f){if(j)return j(f);throw"both async and sync fetching of the wasm failed"}function Bt(f){if(x||v){if(typeof fetch=="function"&&!Ge(f))return fetch(f,{credentials:"same-origin"}).then(d=>{if(!d.ok)throw"failed to load wasm binary file at '"+f+"'";return d.arrayBuffer()}).catch(()=>zt(f));if(J)return new Promise((d,g)=>{J(f,O=>d(new Uint8Array(O)),g)})}return Promise.resolve().then(()=>zt(f))}function Zr(f,d,g){return Bt(f).then(O=>WebAssembly.instantiate(O,d)).then(O=>O).then(g,O=>{V(`failed to asynchronously prepare wasm: ${O}`),Ft(O)})}function In(f,d){var g=st;return typeof WebAssembly.instantiateStreaming!="function"||Oe(g)||Ge(g)||_||typeof fetch!="function"?Zr(g,f,d):fetch(g,{credentials:"same-origin"}).then(O=>WebAssembly.instantiateStreaming(O,f).then(d,function(C){return V(`wasm streaming compile failed: ${C}`),V("falling back to ArrayBuffer instantiation"),Zr(g,f,d)}))}var Wt,Dr={886596:(f,d,g,O)=>{if(typeof i>"u"||!i.hb)return 1;if(f=lr(f>>>0),f.startsWith("./")&&(f=f.substring(2)),f=i.hb.get(f),!f)return 2;if(d>>>=0,g>>>=0,O>>>=0,d+g>f.byteLength)return 3;try{return e().set(f.subarray(d,d+g),O>>>0),0}catch{return 4}}};function Jt(f){this.name="ExitStatus",this.message=`Program terminated with exit(${f})`,this.status=f}var Lr=f=>{f.terminate(),f.onmessage=()=>{}},Cr=f=>{Z.Ta.length==0&&(Vt(),Z.bb(Z.Ta[0]));var d=Z.Ta.pop();if(!d)return 6;Z.Ua.push(d),Z.Qa[f.Sa]=d,d.Sa=f.Sa;var g={cmd:"run",start_routine:f.ob,arg:f.lb,pthread_ptr:f.Sa};return _&&d.unref(),d.postMessage(g,f.ub),0},ur=0,An=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Qr=(f,d,g)=>{d>>>=0;var O=d+g;for(g=d;f[g]&&!(g>=O);)++g;if(16<g-d&&f.buffer&&An)return An.decode(f.buffer instanceof SharedArrayBuffer?f.slice(d,g):f.subarray(d,g));for(O="";d<g;){var C=f[d++];if(C&128){var $=f[d++]&63;if((C&224)==192)O+=String.fromCharCode((C&31)<<6|$);else{var M=f[d++]&63;C=(C&240)==224?(C&15)<<12|$<<6|M:(C&7)<<18|$<<12|M<<6|f[d++]&63,65536>C?O+=String.fromCharCode(C):(C-=65536,O+=String.fromCharCode(55296|C>>10,56320|C&1023))}}else O+=String.fromCharCode(C)}return O},lr=(f,d)=>(f>>>=0)?Qr(e(),f,d):"",En=f=>{var d=Xo();return f=f(),Bn(d),f};function be(f,d){var g=arguments.length-2,O=arguments;return En(()=>{for(var C=Ko(8*g),$=C>>>3,M=0;M<g;M++){var ce=O[2+M];s()[$+M>>>0]=ce}return Ha(f,g,C,d)})}function en(f){if(I)return be(0,1,f);$e=f,0<ur||(Z.pb(),i.onExit?.(f),xt=!0),b(f,new Jt(f))}var $t=f=>{if($e=f,I)throw Q(f),"unwind";en(f)};function ut(){for(var f=i.numThreads;f--;)Vt();ar.unshift(()=>{vt++,Pn(()=>Ct())})}function Vt(){var f=B("ort-wasm-threaded.worker.js");f=new Worker(f),Z.Ta.push(f)}function Pn(f){I?f():Promise.all(Z.Ta.map(Z.bb)).then(f)}var Z={Ta:[],Ua:[],gb:[],Qa:{},$a(){I?(Z.receiveObjectTransfer=Z.nb,Z.threadInitTLS=Z.fb,Z.setExitStatus=Z.eb):ut()},eb:f=>$e=f,xb:["$terminateWorker"],pb:()=>{for(var f of Z.Ua)Lr(f);for(f of Z.Ta)Lr(f);Z.Ta=[],Z.Ua=[],Z.Qa=[]},cb:f=>{var d=f.Sa;delete Z.Qa[d],Z.Ta.push(f),Z.Ua.splice(Z.Ua.indexOf(f),1),f.Sa=0,qo(d)},nb(){},fb(){Z.gb.forEach(f=>f())},bb:f=>new Promise(d=>{f.onmessage=$=>{$=$.data;var M=$.cmd;if($.targetThread&&$.targetThread!=Fn()){var ce=Z.Qa[$.targetThread];ce?ce.postMessage($,$.transferList):V(`Internal error! Worker sent a message "${M}" to target pthread ${$.targetThread}, but that thread no longer exists!`)}else M==="checkMailbox"?ft():M==="spawnThread"?Cr($):M==="cleanupThread"?Z.cb(Z.Qa[$.thread]):M==="killThread"?($=$.thread,M=Z.Qa[$],delete Z.Qa[$],Lr(M),qo($),Z.Ua.splice(Z.Ua.indexOf(M),1),M.Sa=0):M==="cancelThread"?Z.Qa[$.thread].postMessage({cmd:"cancel"}):M==="loaded"?(f.loaded=!0,_&&!f.Sa&&f.unref(),d(f)):M==="alert"?alert(`Thread ${$.threadId}: ${$.text}`):$.target==="setimmediate"?f.postMessage($):M==="callHandler"?i[$.handler](...$.args):M&&V(`worker sent an unknown command ${M}`)},f.onerror=$=>{throw V(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$},_&&(f.on("message",$=>f.onmessage({data:$})),f.on("error",$=>f.onerror($)));var g=[],O=["onExit"],C;for(C of O)i.hasOwnProperty(C)&&g.push(C);f.postMessage({cmd:"load",handlers:g,urlOrBlob:i.mainScriptUrlOrBlob||a,wasmMemory:Ee,wasmModule:Pt})})};i.PThread=Z;var Fr=f=>{for(;0<f.length;)f.shift()(i)};i.establishStackSpace=()=>{var f=Fn(),d=n()[f+52>>>2>>>0];f=n()[f+56>>>2>>>0],Ya(d,d-f),Bn(d)};function Q(f){if(I)return be(1,0,f);$t(f)}var Ht=[],et,tn=f=>{var d=Ht[f];return d||(f>=Ht.length&&(Ht.length=f+1),Ht[f]=d=et.get(f)),d};i.invokeEntryPoint=(f,d)=>{f=tn(f)(d),0<ur?Z.eb(f):Yo(f)};function Dn(f){this.Za=f-24,this.kb=function(d){n()[this.Za+4>>>2>>>0]=d},this.jb=function(d){n()[this.Za+8>>>2>>>0]=d},this.$a=function(d,g){this.ib(),this.kb(d),this.jb(g)},this.ib=function(){n()[this.Za+16>>>2>>>0]=0}}var rn=0,Ln=0;function Cn(f,d,g,O){return I?be(2,1,f,d,g,O):fr(f,d,g,O)}function fr(f,d,g,O){if(f>>>=0,d>>>=0,g>>>=0,O>>>=0,typeof SharedArrayBuffer>"u")return V("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var C=[];return I&&C.length===0?Cn(f,d,g,O):(f={ob:g,Sa:f,lb:O,ub:C},I?(f.wb="spawnThread",postMessage(f,C),0):Cr(f))}function nn(f,d,g){return I?be(3,1,f,d,g):0}function h(f,d){if(I)return be(4,1,f,d)}var T=f=>{for(var d=0,g=0;g<f.length;++g){var O=f.charCodeAt(g);127>=O?d++:2047>=O?d+=2:55296<=O&&57343>=O?(d+=4,++g):d+=3}return d},w=(f,d,g,O)=>{if(g>>>=0,!(0<O))return 0;var C=g;O=g+O-1;for(var $=0;$<f.length;++$){var M=f.charCodeAt($);if(55296<=M&&57343>=M){var ce=f.charCodeAt(++$);M=65536+((M&1023)<<10)|ce&1023}if(127>=M){if(g>=O)break;d[g++>>>0]=M}else{if(2047>=M){if(g+1>=O)break;d[g++>>>0]=192|M>>6}else{if(65535>=M){if(g+2>=O)break;d[g++>>>0]=224|M>>12}else{if(g+3>=O)break;d[g++>>>0]=240|M>>18,d[g++>>>0]=128|M>>12&63}d[g++>>>0]=128|M>>6&63}d[g++>>>0]=128|M&63}}return d[g>>>0]=0,g-C},A=(f,d,g)=>w(f,e(),d,g);function k(f,d){if(I)return be(5,1,f,d)}function W(f,d,g){if(I)return be(6,1,f,d,g)}function X(f,d,g){return I?be(7,1,f,d,g):0}function he(f,d){if(I)return be(8,1,f,d)}function Ue(f,d,g){if(I)return be(9,1,f,d,g)}function ze(f,d,g,O){if(I)return be(10,1,f,d,g,O)}function We(f,d,g,O){if(I)return be(11,1,f,d,g,O)}function on(f,d,g,O){if(I)return be(12,1,f,d,g,O)}function an(f){if(I)return be(13,1,f)}function E(f,d){if(I)return be(14,1,f,d)}function de(f,d,g){if(I)return be(15,1,f,d,g)}function ge(f){f>>>=0,typeof Atomics.vb=="function"&&(Atomics.vb(r(),f>>>2,f).value.then(ft),f+=128,Atomics.store(r(),f>>>2,1))}i.__emscripten_thread_mailbox_await=ge;var ft=()=>{var f=Fn();if(f&&(ge(f),f=ja,!xt))try{if(f(),!(0<ur))try{I?Yo($e):$t($e)}catch(d){d instanceof Jt||d=="unwind"||b(1,d)}}catch(d){d instanceof Jt||d=="unwind"||b(1,d)}};i.checkMailbox=ft;var Br=[],$r=f=>f%4===0&&(f%100!==0||f%400===0),Oa=[0,31,60,91,121,152,182,213,244,274,305,335],Sa=[0,31,59,90,120,151,181,212,243,273,304,334];function Ia(f,d,g,O,C,$,M,ce){return I?be(16,1,f,d,g,O,C,$,M,ce):-52}function Aa(f,d,g,O,C,$,M){if(I)return be(17,1,f,d,g,O,C,$,M)}var Ea=f=>{var d=T(f)+1,g=Wa(d);return g&&A(f,g,d),g},Vo=[],Ho={},Pa=()=>{if(!jo){var f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:p||"./this.program"},d;for(d in Ho)Ho[d]===void 0?delete f[d]:f[d]=Ho[d];var g=[];for(d in f)g.push(`${d}=${f[d]}`);jo=g}return jo},jo;function Da(f,d){if(I)return be(18,1,f,d);f>>>=0,d>>>=0;var g=0;return Pa().forEach((O,C)=>{var $=d+g;for(C=n()[f+4*C>>>2>>>0]=$,$=0;$<O.length;++$)o()[C++>>>0>>>0]=O.charCodeAt($);o()[C>>>0>>>0]=0,g+=O.length+1}),0}function La(f,d){if(I)return be(19,1,f,d);f>>>=0,d>>>=0;var g=Pa();n()[f>>>2>>>0]=g.length;var O=0;return g.forEach(C=>O+=C.length+1),n()[d>>>2>>>0]=O,0}function Ca(f){return I?be(20,1,f):52}function Fa(f,d,g,O){return I?be(21,1,f,d,g,O):52}function Ba(f,d,g,O,C){return I?be(22,1,f,d,g,O,C):70}var Ad=[null,[],[]];function $a(f,d,g,O){if(I)return be(23,1,f,d,g,O);d>>>=0,g>>>=0,O>>>=0;for(var C=0,$=0;$<g;$++){var M=n()[d>>>2>>>0],ce=n()[d+4>>>2>>>0];d+=8;for(var ct=0;ct<ce;ct++){var ke=e()[M+ct>>>0],tt=Ad[f];ke===0||ke===10?((f===1?Fe:V)(Qr(tt,0)),tt.length=0):tt.push(ke)}C+=ce}return n()[O>>>2>>>0]=C,0}var Ed=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return g=>(g.set(crypto.getRandomValues(new Uint8Array(g.byteLength))),g);if(_)try{var f=(ca(),jt(fa));if(f.randomFillSync)return g=>f.randomFillSync(g);var d=f.randomBytes;return g=>(g.set(d(g.byteLength)),g)}catch{}Ft("initRandomDevice")},ka=f=>(ka=Ed())(f),Na=[31,29,31,30,31,30,31,31,30,31,30,31],Ra=[31,28,31,30,31,30,31,31,30,31,30,31];function Pd(f){var d=Array(T(f)+1);return w(f,d,0,d.length),d}var Dd=(f,d)=>{o().set(f,d>>>0)};function Ma(f,d,g,O){function C(P,me,Pe){for(P=typeof P=="number"?P.toString():P||"";P.length<me;)P=Pe[0]+P;return P}function $(P,me){return C(P,me,"0")}function M(P,me){function Pe(Za){return 0>Za?-1:0<Za?1:0}var cr;return(cr=Pe(P.getFullYear()-me.getFullYear()))===0&&(cr=Pe(P.getMonth()-me.getMonth()))===0&&(cr=Pe(P.getDate()-me.getDate())),cr}function ce(P){switch(P.getDay()){case 0:return new Date(P.getFullYear()-1,11,29);case 1:return P;case 2:return new Date(P.getFullYear(),0,3);case 3:return new Date(P.getFullYear(),0,2);case 4:return new Date(P.getFullYear(),0,1);case 5:return new Date(P.getFullYear()-1,11,31);case 6:return new Date(P.getFullYear()-1,11,30)}}function ct(P){var me=P.Va;for(P=new Date(new Date(P.Wa+1900,0,1).getTime());0<me;){var Pe=P.getMonth(),cr=($r(P.getFullYear())?Na:Ra)[Pe];if(me>cr-P.getDate())me-=cr-P.getDate()+1,P.setDate(1),11>Pe?P.setMonth(Pe+1):(P.setMonth(0),P.setFullYear(P.getFullYear()+1));else{P.setDate(P.getDate()+me);break}}return Pe=new Date(P.getFullYear()+1,0,4),me=ce(new Date(P.getFullYear(),0,4)),Pe=ce(Pe),0>=M(me,P)?0>=M(Pe,P)?P.getFullYear()+1:P.getFullYear():P.getFullYear()-1}f>>>=0,d>>>=0,g>>>=0,O>>>=0;var ke=n()[O+40>>>2>>>0];O={sb:r()[O>>>2>>>0],rb:r()[O+4>>>2>>>0],Xa:r()[O+8>>>2>>>0],ab:r()[O+12>>>2>>>0],Ya:r()[O+16>>>2>>>0],Wa:r()[O+20>>>2>>>0],Ra:r()[O+24>>>2>>>0],Va:r()[O+28>>>2>>>0],yb:r()[O+32>>>2>>>0],qb:r()[O+36>>>2>>>0],tb:ke?lr(ke):""},g=lr(g),ke={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var tt in ke)g=g.replace(new RegExp(tt,"g"),ke[tt]);var Ka="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ja="January February March April May June July August September October November December".split(" ");ke={"%a":P=>Ka[P.Ra].substring(0,3),"%A":P=>Ka[P.Ra],"%b":P=>Ja[P.Ya].substring(0,3),"%B":P=>Ja[P.Ya],"%C":P=>$((P.Wa+1900)/100|0,2),"%d":P=>$(P.ab,2),"%e":P=>C(P.ab,2," "),"%g":P=>ct(P).toString().substring(2),"%G":P=>ct(P),"%H":P=>$(P.Xa,2),"%I":P=>(P=P.Xa,P==0?P=12:12<P&&(P-=12),$(P,2)),"%j":P=>{for(var me=0,Pe=0;Pe<=P.Ya-1;me+=($r(P.Wa+1900)?Na:Ra)[Pe++]);return $(P.ab+me,3)},"%m":P=>$(P.Ya+1,2),"%M":P=>$(P.rb,2),"%n":()=>`
`,"%p":P=>0<=P.Xa&&12>P.Xa?"AM":"PM","%S":P=>$(P.sb,2),"%t":()=>"	","%u":P=>P.Ra||7,"%U":P=>$(Math.floor((P.Va+7-P.Ra)/7),2),"%V":P=>{var me=Math.floor((P.Va+7-(P.Ra+6)%7)/7);if(2>=(P.Ra+371-P.Va-2)%7&&me++,me)me==53&&(Pe=(P.Ra+371-P.Va)%7,Pe==4||Pe==3&&$r(P.Wa)||(me=1));else{me=52;var Pe=(P.Ra+7-P.Va-1)%7;(Pe==4||Pe==5&&$r(P.Wa%400-1))&&me++}return $(me,2)},"%w":P=>P.Ra,"%W":P=>$(Math.floor((P.Va+7-(P.Ra+6)%7)/7),2),"%y":P=>(P.Wa+1900).toString().substring(2),"%Y":P=>P.Wa+1900,"%z":P=>{P=P.qb;var me=0<=P;return P=Math.abs(P)/60,(me?"+":"-")+("0000"+(P/60*100+P%60)).slice(-4)},"%Z":P=>P.tb,"%%":()=>"%"},g=g.replace(/%%/g,"\0\0");for(tt in ke)g.includes(tt)&&(g=g.replace(new RegExp(tt,"g"),ke[tt](O)));return g=g.replace(/\0\0/g,"%"),tt=Pd(g),tt.length>d?0:(Dd(tt,f),tt.length-1)}var kr,Ga=[],Ua=(f,d)=>{if(!kr){kr=new WeakMap;var g=et.length;if(kr)for(var O=0;O<0+g;O++){var C=tn(O);C&&kr.set(C,O)}}if(g=kr.get(f)||0)return g;if(Ga.length)g=Ga.pop();else{try{et.grow(1)}catch(ce){throw ce instanceof RangeError?"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.":ce}g=et.length-1}try{O=g,et.set(O,f),Ht[O]=et.get(O)}catch(ce){if(!(ce instanceof TypeError))throw ce;if(typeof WebAssembly.Function=="function"){O=WebAssembly.Function,C={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"};for(var $={parameters:[],results:d[0]=="v"?[]:[C[d[0]]]},M=1;M<d.length;++M)$.parameters.push(C[d[M]]);d=new O($,f)}else{for(O=[1],C=d.slice(0,1),d=d.slice(1),$={i:127,p:127,j:126,f:125,d:124,e:111},O.push(96),M=d.length,128>M?O.push(M):O.push(M%128|128,M>>7),M=0;M<d.length;++M)O.push($[d[M]]);C=="v"?O.push(0):O.push(1,$[C]),d=[0,97,115,109,1,0,0,0,1],C=O.length,128>C?d.push(C):d.push(C%128|128,C>>7),d.push.apply(d,O),d.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),d=new WebAssembly.Module(new Uint8Array(d)),d=new WebAssembly.Instance(d,{e:{f}}).exports.f}O=g,et.set(O,d),Ht[O]=et.get(O)}return kr.set(f,g),g};Z.$a();var Ld=[en,Q,Cn,nn,h,k,W,X,he,Ue,ze,We,on,an,E,de,Ia,Aa,Da,La,Ca,Fa,Ba,$a],Cd={b:function(f,d,g){throw f>>>=0,new Dn(f).$a(d>>>0,g>>>0),rn=f,Ln++,rn},O:function(f){Va(f>>>0,!v,1,!x,131072,!1),Z.fb()},m:function(f){f>>>=0,I?postMessage({cmd:"cleanupThread",thread:f}):Z.cb(Z.Qa[f])},J:fr,h:nn,U:h,F:k,H:W,y:X,S:he,L:Ue,R:ze,o:We,G:on,D:an,T:E,E:de,p:()=>1,B:function(f,d){f>>>=0,f==d>>>0?setTimeout(()=>ft()):I?postMessage({targetThread:f,cmd:"checkMailbox"}):(f=Z.Qa[f])&&f.postMessage({cmd:"checkMailbox"})},K:function(f,d,g,O){d>>>=0,Br.length=g,O=O>>>0>>>3;for(var C=0;C<g;C++)Br[C]=s()[O+C>>>0];return f=0>f?Dr[-f-1]:Ld[f],Z.mb=d,d=f.apply(null,Br),Z.mb=0,d},M:ge,W:function(f){_&&Z.Qa[f>>>0].ref()},s:function(f,d,g){f=d+2097152>>>0<4194305-!!f?(f>>>0)+4294967296*d:NaN,g>>>=0,f=new Date(1e3*f),r()[g>>>2>>>0]=f.getUTCSeconds(),r()[g+4>>>2>>>0]=f.getUTCMinutes(),r()[g+8>>>2>>>0]=f.getUTCHours(),r()[g+12>>>2>>>0]=f.getUTCDate(),r()[g+16>>>2>>>0]=f.getUTCMonth(),r()[g+20>>>2>>>0]=f.getUTCFullYear()-1900,r()[g+24>>>2>>>0]=f.getUTCDay(),f=(f.getTime()-Date.UTC(f.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,r()[g+28>>>2>>>0]=f},t:function(f,d,g){f=d+2097152>>>0<4194305-!!f?(f>>>0)+4294967296*d:NaN,g>>>=0,f=new Date(1e3*f),r()[g>>>2>>>0]=f.getSeconds(),r()[g+4>>>2>>>0]=f.getMinutes(),r()[g+8>>>2>>>0]=f.getHours(),r()[g+12>>>2>>>0]=f.getDate(),r()[g+16>>>2>>>0]=f.getMonth(),r()[g+20>>>2>>>0]=f.getFullYear()-1900,r()[g+24>>>2>>>0]=f.getDay(),d=($r(f.getFullYear())?Oa:Sa)[f.getMonth()]+f.getDate()-1|0,r()[g+28>>>2>>>0]=d,r()[g+36>>>2>>>0]=-(60*f.getTimezoneOffset()),d=new Date(f.getFullYear(),6,1).getTimezoneOffset();var O=new Date(f.getFullYear(),0,1).getTimezoneOffset();f=(d!=O&&f.getTimezoneOffset()==Math.min(O,d))|0,r()[g+32>>>2>>>0]=f},u:function(f){f>>>=0;var d=new Date(r()[f+20>>>2>>>0]+1900,r()[f+16>>>2>>>0],r()[f+12>>>2>>>0],r()[f+8>>>2>>>0],r()[f+4>>>2>>>0],r()[f>>>2>>>0],0),g=r()[f+32>>>2>>>0],O=d.getTimezoneOffset(),C=new Date(d.getFullYear(),6,1).getTimezoneOffset(),$=new Date(d.getFullYear(),0,1).getTimezoneOffset(),M=Math.min($,C);return 0>g?r()[f+32>>>2>>>0]=+(C!=$&&M==O):0<g!=(M==O)&&(C=Math.max($,C),d.setTime(d.getTime()+6e4*((0<g?M:C)-O))),r()[f+24>>>2>>>0]=d.getDay(),g=($r(d.getFullYear())?Oa:Sa)[d.getMonth()]+d.getDate()-1|0,r()[f+28>>>2>>>0]=g,r()[f>>>2>>>0]=d.getSeconds(),r()[f+4>>>2>>>0]=d.getMinutes(),r()[f+8>>>2>>>0]=d.getHours(),r()[f+12>>>2>>>0]=d.getDate(),r()[f+16>>>2>>>0]=d.getMonth(),r()[f+20>>>2>>>0]=d.getYear(),f=d.getTime(),isNaN(f)?(r()[za()>>>2>>>0]=61,f=-1):f/=1e3,qa((Wt=f,1<=+Math.abs(Wt)?0<Wt?+Math.floor(Wt/4294967296)>>>0:~~+Math.ceil((Wt-+(~~Wt>>>0))/4294967296)>>>0:0)),f>>>0},q:Ia,r:Aa,A:function(f,d,g){function O(ke){return(ke=ke.toTimeString().match(/\(([A-Za-z ]+)\)$/))?ke[1]:"GMT"}f>>>=0,d>>>=0,g>>>=0;var C=new Date().getFullYear(),$=new Date(C,0,1),M=new Date(C,6,1);C=$.getTimezoneOffset();var ce=M.getTimezoneOffset(),ct=Math.max(C,ce);n()[f>>>2>>>0]=60*ct,r()[d>>>2>>>0]=+(C!=ce),f=O($),d=O(M),f=Ea(f),d=Ea(d),ce<C?(n()[g>>>2>>>0]=f,n()[g+4>>>2>>>0]=d):(n()[g>>>2>>>0]=d,n()[g+4>>>2>>>0]=f)},c:()=>{Ft("")},N:function(f,d,g){f>>>=0,d>>>=0,g>>>=0,Vo.length=0;for(var O;O=e()[d++>>>0];){var C=O!=105;C&=O!=112,g+=C&&g%8?4:0,Vo.push(O==112?n()[g>>>2>>>0]:O==105?r()[g>>>2>>>0]:s()[g>>>3>>>0]),g+=C?8:4}return Dr[f].apply(null,Vo)},n:()=>{},i:()=>Date.now(),V:()=>{throw ur+=1,"unwind"},C:function(){return 4294901760},e:()=>performance.timeOrigin+performance.now(),f:()=>_?(Mp(),jt(Rp)).cpus().length:navigator.hardwareConcurrency,z:function(f){f>>>=0;var d=e().length;if(f<=d||4294901760<f)return!1;for(var g=1;4>=g;g*=2){var O=d*(1+.2/g);O=Math.min(O,f+100663296);var C=Math;O=Math.max(f,O);e:{C=(C.min.call(C,4294901760,O+(65536-O%65536)%65536)-Ee.buffer.byteLength+65535)/65536;try{Ee.grow(C),_e();var $=1;break e}catch{}$=void 0}if($)return!0}return!1},P:Da,Q:La,I:$t,g:Ca,l:Fa,v:Ba,k:$a,w:function(f,d){return f>>>=0,d>>>=0,ka(e().subarray(f>>>0,f+d>>>0)),0},a:Ee||i.wasmMemory,x:Ma,d:function(f,d,g,O){return Ma(f>>>0,d>>>0,g>>>0,O>>>0)},j:function(f,d,g,O){let C=et.length;f=new Uint8Array(e().slice(f+d,f+g));try{var $=new WebAssembly.Module(f),M=new WebAssembly.Instance($,{env:{memory:Ee}}),ce;for(ce in M.exports)Ua(M.exports[ce]);return C<et.length?C:O}catch(ct){return console.log(ct),O}}},K=function(){function f(g,O){return K=g.exports,K=Fd(),Z.gb.push(K.Da),et=K.Ea,Lt.unshift(K.X),Pt=O,Ct(),K}var d={a:Cd};if(vt++,i.instantiateWasm)try{return i.instantiateWasm(d,f)}catch(g){V(`Module.instantiateWasm callback failed with error: ${g}`),l(g)}return In(d,function(g){f(g.instance,g.module)}).catch(l),{}}();i._OrtInit=(f,d)=>(i._OrtInit=K.Y)(f,d),i._OrtGetLastError=(f,d)=>(i._OrtGetLastError=K.Z)(f,d),i._OrtCreateSessionOptions=(f,d,g,O,C,$,M,ce,ct,ke)=>(i._OrtCreateSessionOptions=K._)(f,d,g,O,C,$,M,ce,ct,ke),i._OrtAppendExecutionProvider=(f,d)=>(i._OrtAppendExecutionProvider=K.$)(f,d),i._OrtAddFreeDimensionOverride=(f,d,g)=>(i._OrtAddFreeDimensionOverride=K.aa)(f,d,g),i._OrtAddSessionConfigEntry=(f,d,g)=>(i._OrtAddSessionConfigEntry=K.ba)(f,d,g),i._OrtReleaseSessionOptions=f=>(i._OrtReleaseSessionOptions=K.ca)(f),i._OrtCreateSession=(f,d,g)=>(i._OrtCreateSession=K.da)(f,d,g),i._OrtReleaseSession=f=>(i._OrtReleaseSession=K.ea)(f),i._OrtGetInputOutputCount=(f,d,g)=>(i._OrtGetInputOutputCount=K.fa)(f,d,g),i._OrtGetInputName=(f,d)=>(i._OrtGetInputName=K.ga)(f,d),i._OrtGetOutputName=(f,d)=>(i._OrtGetOutputName=K.ha)(f,d),i._OrtFree=f=>(i._OrtFree=K.ia)(f),i._OrtCreateTensor=(f,d,g,O,C,$)=>(i._OrtCreateTensor=K.ja)(f,d,g,O,C,$),i._OrtGetTensorData=(f,d,g,O,C)=>(i._OrtGetTensorData=K.ka)(f,d,g,O,C),i._OrtReleaseTensor=f=>(i._OrtReleaseTensor=K.la)(f),i._OrtCreateRunOptions=(f,d,g,O)=>(i._OrtCreateRunOptions=K.ma)(f,d,g,O),i._OrtAddRunConfigEntry=(f,d,g)=>(i._OrtAddRunConfigEntry=K.na)(f,d,g),i._OrtReleaseRunOptions=f=>(i._OrtReleaseRunOptions=K.oa)(f),i._OrtCreateBinding=f=>(i._OrtCreateBinding=K.pa)(f),i._OrtBindInput=(f,d,g)=>(i._OrtBindInput=K.qa)(f,d,g),i._OrtBindOutput=(f,d,g,O)=>(i._OrtBindOutput=K.ra)(f,d,g,O),i._OrtClearBoundOutputs=f=>(i._OrtClearBoundOutputs=K.sa)(f),i._OrtReleaseBinding=f=>(i._OrtReleaseBinding=K.ta)(f),i._OrtRunWithBinding=(f,d,g,O,C)=>(i._OrtRunWithBinding=K.ua)(f,d,g,O,C),i._OrtRun=(f,d,g,O,C,$,M,ce)=>(i._OrtRun=K.va)(f,d,g,O,C,$,M,ce),i._OrtEndProfiling=f=>(i._OrtEndProfiling=K.wa)(f),i._OrtConfigure=(f,d)=>(i._OrtConfigure=K.xa)(f,d),i._OrtAuth=(f,d)=>(i._OrtAuth=K.ya)(f,d);var za=()=>(za=K.za)(),Fn=i._pthread_self=()=>(Fn=i._pthread_self=K.Aa)(),Wa=i._malloc=f=>(Wa=i._malloc=K.Ba)(f);i._free=f=>(i._free=K.Ca)(f),i.__emscripten_tls_init=()=>(i.__emscripten_tls_init=K.Da)();var Va=i.__emscripten_thread_init=(f,d,g,O,C,$)=>(Va=i.__emscripten_thread_init=K.Fa)(f,d,g,O,C,$);i.__emscripten_thread_crashed=()=>(i.__emscripten_thread_crashed=K.Ga)();var Ha=(f,d,g,O)=>(Ha=K.Ha)(f,d,g,O),qo=f=>(qo=K.Ia)(f),Yo=i.__emscripten_thread_exit=f=>(Yo=i.__emscripten_thread_exit=K.Ja)(f),ja=()=>(ja=K.Ka)(),qa=f=>(qa=K.La)(f),Ya=(f,d)=>(Ya=K.Ma)(f,d),Xo=()=>(Xo=K.Na)(),Bn=f=>(Bn=K.Oa)(f),Ko=f=>(Ko=K.Pa)(f);i.___start_em_js=887097,i.___stop_em_js=887709;function Fd(){var f=K;f=Object.assign({},f);var d=O=>()=>O()>>>0,g=O=>C=>O(C)>>>0;return f.za=d(f.za),f.Aa=d(f.Aa),f.Ba=g(f.Ba),f.emscripten_main_runtime_thread_id=d(f.emscripten_main_runtime_thread_id),f.Na=d(f.Na),f.Pa=g(f.Pa),f}i.wasmMemory=Ee,i.stackAlloc=Ko,i.stackSave=Xo,i.stackRestore=Bn,i.keepRuntimeAlive=()=>0<ur,i.addFunction=Ua,i.UTF8ToString=lr,i.stringToUTF8=A,i.lengthBytesUTF8=T,i.ExitStatus=Jt,i.PThread=Z;var $n;Qe=function f(){$n||Xa(),$n||(Qe=f)};function Xa(){if(!(0<vt))if(I)u(i),I||Fr(Lt),startWorker(i);else{if(i.preRun)for(typeof i.preRun=="function"&&(i.preRun=[i.preRun]);i.preRun.length;)ar.unshift(i.preRun.shift());Fr(ar),0<vt||$n||($n=!0,i.calledRun=!0,xt||(I||Fr(Lt),u(i),I||Fr(wt)))}}return Xa(),t.ready}})();typeof Up=="object"&&typeof da=="object"?da.exports=Gp:typeof define=="function"&&define.amd&&define([],()=>Gp)});var Wp=ye((bO,yg)=>{yg.exports='"use strict";var Module={},ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",e=>onmessage({data:e}));var fs=require("fs"),vm=require("vm");Object.assign(global,{self:global,require,Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:e=>vm.runInThisContext(fs.readFileSync(e,"utf8"),{filename:e}),postMessage:e=>parentPort.postMessage(e),performance:global.performance||{now:Date.now}})}var initializedJS=!1;function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,e+`\n`);return}console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,t)=>{var a=Module.wasmModule;Module.wasmModule=null;var r=new WebAssembly.Instance(a,e);return t(r)},self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let a=[];self.onmessage=r=>a.push(r),self.startWorker=r=>{Module=r,postMessage({cmd:"loaded"});for(let s of a)handleMessage(s);self.onmessage=handleMessage},Module.wasmModule=e.data.wasmModule;for(const r of e.data.handlers)Module[r]=(...s)=>{postMessage({cmd:"callHandler",handler:r,args:s})};if(Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,typeof e.data.urlOrBlob=="string")importScripts(e.data.urlOrBlob);else{var t=URL.createObjectURL(e.data.urlOrBlob);importScripts(t),URL.revokeObjectURL(t)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.__emscripten_thread_mailbox_await(e.data.pthread_ptr),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(a){if(a!="unwind")throw a}}else e.data.cmd==="cancel"?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):e.data.target==="setimmediate"||(e.data.cmd==="checkMailbox"?initializedJS&&Module.checkMailbox():e.data.cmd&&(err(`worker.js received unknown command ${e.data.cmd}`),err(e.data)))}catch(a){throw Module.__emscripten_thread_crashed?.(),a}}self.onmessage=handleMessage;\n'});var Hp,Tg,ha,ma,$o,Vp,xg,wg,vg,jp,Se,Kr=D(()=>{"use strict";Hp=$p();Tg=zp(),ma=!1,$o=!1,Vp=!1,xg=a=>{if(a===1)return!1;if(typeof SharedArrayBuffer>"u")return typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+a+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),!1;typeof process<"u"&&process.versions&&process.versions.node&&console.warn("env.wasm.numThreads is set to "+a+", however, currently onnxruntime-web does not support multi-threads in Node.js. Please consider using onnxruntime-node for performance critical scenarios.");try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},wg=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},vg=(a,t)=>a?t?"ort-wasm-simd-threaded.wasm":"ort-wasm-simd.wasm":t?"ort-wasm-threaded.wasm":"ort-wasm.wasm",jp=async a=>{if(ma)return Promise.resolve();if($o)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Vp)throw new Error("previous call to 'initializeWebAssembly()' failed.");$o=!0;let t=a.initTimeout,o=a.numThreads,e=a.simd,r=xg(o),n=e&&wg(),s=a.wasmPaths,i=typeof s=="string"?s:void 0,u=vg(n,r),l=typeof s=="object"?s[u]:void 0,c=!1,p=[];if(t>0&&p.push(new Promise(b=>{setTimeout(()=>{c=!0,b()},t)})),p.push(new Promise((b,x)=>{let v=r?Tg:Hp,_={locateFile:(I,L)=>r&&I.endsWith(".worker.js")&&typeof Blob<"u"?URL.createObjectURL(new Blob([Wp()],{type:"text/javascript"})):I.endsWith(".wasm")?l||(i??L)+u:L+I};if(r)if(_.numThreads=o,typeof Blob>"u")_.mainScriptUrlOrBlob=(void 0)(__dirname,"ort-wasm-threaded.js");else{let I=`var ortWasmThreaded=${v.toString()};`;_.mainScriptUrlOrBlob=new Blob([I],{type:"text/javascript"})}v(_).then(I=>{$o=!1,ma=!0,ha=I,b()},I=>{$o=!1,Vp=!0,x(I)})})),await Promise.race(p),c)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Se=()=>{if(ma&&ha)return ha;throw new Error("WebAssembly is not initialized yet.")}});var Ie,_n,Ae,ko=D(()=>{"use strict";Kr();Ie=(a,t)=>{let o=Se(),e=o.lengthBytesUTF8(a)+1,r=o._malloc(e);return o.stringToUTF8(a,r,e),t.push(r),r},_n=(a,t,o,e)=>{if(typeof a=="object"&&a!==null){if(o.has(a))throw new Error("Circular reference in options");o.add(a)}Object.entries(a).forEach(([r,n])=>{let s=t?t+r:r;if(typeof n=="object")_n(n,s+".",o,e);else if(typeof n=="string"||typeof n=="number")e(s,n.toString());else if(typeof n=="boolean")e(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},Ae=a=>{let t=Se(),o=t.stackSave();try{let e=t.stackAlloc(8);t._OrtGetLastError(e,e+4);let r=t.HEAP32[e/4],n=t.HEAPU32[e/4+1],s=n?t.UTF8ToString(n):"";throw new Error(`${a} ERROR_CODE: ${r}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(o)}}});var qp,Yp=D(()=>{"use strict";Kr();ko();qp=a=>{let t=Se(),o=0,e=[],r=a||{};try{if(a?.logSeverityLevel===void 0)r.logSeverityLevel=2;else if(typeof a.logSeverityLevel!="number"||!Number.isInteger(a.logSeverityLevel)||a.logSeverityLevel<0||a.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${a.logSeverityLevel}`);if(a?.logVerbosityLevel===void 0)r.logVerbosityLevel=0;else if(typeof a.logVerbosityLevel!="number"||!Number.isInteger(a.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${a.logVerbosityLevel}`);a?.terminate===void 0&&(r.terminate=!1);let n=0;return a?.tag!==void 0&&(n=Ie(a.tag,e)),o=t._OrtCreateRunOptions(r.logSeverityLevel,r.logVerbosityLevel,!!r.terminate,n),o===0&&Ae("Can't create run options."),a?.extra!==void 0&&_n(a.extra,"",new WeakSet,(s,i)=>{let u=Ie(s,e),l=Ie(i,e);t._OrtAddRunConfigEntry(o,u,l)!==0&&Ae(`Can't set a run config entry: ${s} - ${i}.`)}),[o,e]}catch(n){throw o!==0&&t._OrtReleaseRunOptions(o),e.forEach(s=>t._free(s)),n}}});var _g,Og,Sg,Ig,Xp,Kp=D(()=>{"use strict";Kr();ko();_g=a=>{switch(a){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${a}`)}},Og=a=>{switch(a){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${a}`)}},Sg=a=>{a.extra||(a.extra={}),a.extra.session||(a.extra.session={});let t=a.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),a.executionProviders&&a.executionProviders.some(o=>(typeof o=="string"?o:o.name)==="webgpu")&&(a.enableMemPattern=!1)},Ig=(a,t,o)=>{for(let e of t){let r=typeof e=="string"?e:e.name;switch(r){case"webnn":if(r="WEBNN",typeof e!="string"){let s=e;if(s?.deviceType){let i=Ie("deviceType",o),u=Ie(s.deviceType,o);Se()._OrtAddSessionConfigEntry(a,i,u)!==0&&Ae(`Can't set a session config entry: 'deviceType' - ${s.deviceType}.`)}if(s?.numThreads){let i=s.numThreads;(typeof i!="number"||!Number.isInteger(i)||i<0)&&(i=0);let u=Ie("numThreads",o),l=Ie(i.toString(),o);Se()._OrtAddSessionConfigEntry(a,u,l)!==0&&Ae(`Can't set a session config entry: 'numThreads' - ${s.numThreads}.`)}if(s?.powerPreference){let i=Ie("powerPreference",o),u=Ie(s.powerPreference,o);Se()._OrtAddSessionConfigEntry(a,i,u)!==0&&Ae(`Can't set a session config entry: 'powerPreference' - ${s.powerPreference}.`)}}break;case"webgpu":if(r="JS",typeof e!="string"){let s=e;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let i=Ie("preferredLayout",o),u=Ie(s.preferredLayout,o);Se()._OrtAddSessionConfigEntry(a,i,u)!==0&&Ae(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${r}`)}let n=Ie(r,o);Se()._OrtAppendExecutionProvider(a,n)!==0&&Ae(`Can't append execution provider: ${r}.`)}},Xp=a=>{let t=Se(),o=0,e=[],r=a||{};Sg(r);try{let n=_g(r.graphOptimizationLevel??"all"),s=Og(r.executionMode??"sequential"),i=typeof r.logId=="string"?Ie(r.logId,e):0,u=r.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=r.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof r.optimizedModelFilePath=="string"?Ie(r.optimizedModelFilePath,e):0;if(o=t._OrtCreateSessionOptions(n,!!r.enableCpuMemArena,!!r.enableMemPattern,s,!!r.enableProfiling,0,i,u,l,c),o===0&&Ae("Can't create session options."),r.executionProviders&&Ig(o,r.executionProviders,e),r.enableGraphCapture!==void 0){if(typeof r.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);let p=Ie("enableGraphCapture",e),b=Ie(r.enableGraphCapture.toString(),e);t._OrtAddSessionConfigEntry(o,p,b)!==0&&Ae(`Can't set a session config entry: 'enableGraphCapture' - ${r.enableGraphCapture}.`)}if(r.freeDimensionOverrides)for(let[p,b]of Object.entries(r.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof b!="number"||!Number.isInteger(b)||b<0)throw new Error(`free dimension override value must be a non-negative integer: ${b}`);let x=Ie(p,e);t._OrtAddFreeDimensionOverride(o,x,b)!==0&&Ae(`Can't set a free dimension override: ${p} - ${b}.`)}return r.extra!==void 0&&_n(r.extra,"",new WeakSet,(p,b)=>{let x=Ie(p,e),v=Ie(b,e);t._OrtAddSessionConfigEntry(o,x,v)!==0&&Ae(`Can't set a session config entry: ${p} - ${b}.`)}),[o,e]}catch(n){throw o!==0&&t._OrtReleaseSessionOptions(o),e.forEach(s=>t._free(s)),n}}});var ba,Jp,ga,Zp,Qp,No,ed,ya=D(()=>{"use strict";ba=a=>{switch(a){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${a}`)}},Jp=a=>{switch(a){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${a}`)}},ga=a=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][a],Zp=a=>{switch(a){case"float16":return Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${a}`)}},Qp=a=>{switch(a){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${a}`)}},No=a=>a==="float32"||a==="int32"||a==="int64"||a==="bool"||a==="float16"||a==="uint32",ed=a=>{switch(a){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${a}`)}}});var On,Ta=D(()=>{"use strict";On=async a=>{if(typeof a=="string")if(typeof process<"u"&&process.versions&&process.versions.node)try{return new Uint8Array(await(void 0)(a))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let o=(void 0)(a),e=[];for await(let r of o)e.push(r);return new Uint8Array(Buffer.concat(e))}throw t}else{let t=await fetch(a);if(!t.ok)throw new Error(`failed to load external data file: ${a}`);let o=t.headers.get("Content-Length"),e=o?parseInt(o,10):0;if(e<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${a}, no response body.`);let r=t.body.getReader(),n;try{n=new ArrayBuffer(e)}catch(i){if(i instanceof RangeError){let u=Math.ceil(e/65536);n=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw i}let s=0;for(;;){let{done:i,value:u}=await r.read();if(i)break;let l=u.byteLength;new Uint8Array(n,s,l).set(u),s+=l}return new Uint8Array(n,0,e)}}else return a instanceof Blob?new Uint8Array(await a.arrayBuffer()):a instanceof Uint8Array?a:new Uint8Array(a)}});var Ag,rd,nd,Jr,Eg,xa,od,id,Pg,td,ad,sd,ud,ld,wa,fd=D(()=>{"use strict";Yp();Kp();ya();Kr();ko();Ta();Ag=(a,t)=>{Se()._OrtInit(a,t)!==0&&Ae("Can't initialize onnxruntime.")},rd=async a=>{Ag(a.wasm.numThreads,Qp(a.logLevel))},nd=async(a,t)=>{},Jr=new Map,Eg=a=>{let t=Se(),o=t.stackSave();try{let e=t.stackAlloc(8);return t._OrtGetInputOutputCount(a,e,e+4)!==0&&Ae("Can't get session input/output count."),[t.HEAP32[e/4],t.HEAP32[e/4+1]]}finally{t.stackRestore(o)}},xa=a=>{let t=Se(),o=t._malloc(a.byteLength);if(o===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${a.byteLength}.`);return t.HEAPU8.set(a,o),[o,a.byteLength]},od=async(a,t)=>{let o,e,r=Se();Array.isArray(a)?[o,e]=a:a.buffer===r.HEAPU8.buffer?[o,e]=[a.byteOffset,a.byteLength]:[o,e]=xa(a);let n=0,s=0,i=0,u=[],l=[],c=[];try{if([s,u]=Xp(t),t?.externalData&&r.mountExternalData){let B=[];for(let F of t.externalData){let J=typeof F=="string"?F:F.path;B.push(On(typeof F=="string"?F:F.data).then(j=>{r.mountExternalData(J,j)}))}await Promise.all(B)}n=r._OrtCreateSession(o,e,s),n===0&&Ae("Can't create a session.");let[p,b]=Eg(n),x=!!t?.enableGraphCapture,v=[],_=[],I=[];for(let B=0;B<p;B++){let F=r._OrtGetInputName(n,B);F===0&&Ae("Can't get an input name."),l.push(F),v.push(r.UTF8ToString(F))}for(let B=0;B<b;B++){let F=r._OrtGetOutputName(n,B);F===0&&Ae("Can't get an output name."),c.push(F);let J=r.UTF8ToString(F);_.push(J)}let L=null;return Jr.set(n,[n,l,c,L,x,!1]),[n,v,_]}catch(p){throw l.forEach(b=>r._OrtFree(b)),c.forEach(b=>r._OrtFree(b)),i!==0&&r._OrtReleaseBinding(i),n!==0&&r._OrtReleaseSession(n),p}finally{r._free(o),s!==0&&r._OrtReleaseSessionOptions(s),u.forEach(p=>r._free(p)),r.unmountExternalData?.()}},id=a=>{let t=Se(),o=Jr.get(a);if(!o)throw new Error(`cannot release session. invalid session id: ${a}`);let[e,r,n,s,i]=o;s&&(i&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(a),r.forEach(u=>t._OrtFree(u)),n.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(e),Jr.delete(a)},Pg=(a,t,o)=>{if(a!==null&&a[0]===t){let r=a[2];if(r.length===o)return r}let e=Zp(t);return new e(o)},td=(a,t,o,e,r,n=!1)=>{if(!a){t.push(0);return}let s=Se(),i=a[0],u=a[1],l=a[3],c,p;if(i==="string"&&l==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(n&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${r} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let v=a[2].gpuBuffer,_=ga(ba(i));p=u.reduce((I,L)=>I*L,1)*_,c=s.jsepRegisterBuffer(e,r,v,p)}else{let v=a[2];if(Array.isArray(v)){p=4*v.length,c=s._malloc(p),o.push(c);let _=c/4;for(let I=0;I<v.length;I++){if(typeof v[I]!="string")throw new TypeError(`tensor data at index ${I} is not a string`);s.HEAPU32[_++]=Ie(v[I],o)}}else p=v.byteLength,c=s._malloc(p),o.push(c),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,p),c)}let b=s.stackSave(),x=s.stackAlloc(4*u.length);try{let v=x/4;u.forEach(I=>s.HEAP32[v++]=I);let _=s._OrtCreateTensor(ba(i),c,p,x,u.length,ed(l));_===0&&Ae(`Can't create tensor for input/output. session=${e}, index=${r}.`),t.push(_)}finally{s.stackRestore(b)}},ad=a=>{let o=new TextEncoder().encode(a),e=Se(),r=e._malloc(o.byteLength);e.HEAPU8.set(o,r);let n=e._OrtConfigure(r,o.byteLength);if(n===0)throw new Error("Can't get an configure key");let s=e.UTF8ToString(n);return e._OrtFree(n),s},sd=a=>{let o=new TextEncoder().encode(a),e=Se(),r=e._malloc(o.byteLength);e.HEAPU8.set(o,r);let n=e._OrtAuth(r,o.byteLength);if(n===0)throw new Error("Can't get an auth result");let s=e.UTF8ToString(n);return e._OrtFree(n),s},ud=async(a,t,o,e,r,n)=>{let s=Se(),i=Jr.get(a);if(!i)throw new Error(`cannot run inference. invalid session id: ${a}`);let u=i[0],l=i[1],c=i[2],p=i[3],b=i[4],x=i[5],v=t.length,_=e.length,I=0,L=[],B=[],F=[],J=[],j=s.stackSave(),U=s.stackAlloc(v*4),ie=s.stackAlloc(v*4),at=s.stackAlloc(_*4),He=s.stackAlloc(_*4);try{[I,L]=qp(n);for(let te=0;te<v;te++)td(o[te],B,J,a,t[te],b);for(let te=0;te<_;te++){let Je=r[te],lt=Je?.[3]??"";td(lt==="gpu-buffer"?Je:null,F,J,a,v+e[te],b)}let Fe=U/4,V=ie/4,Ee=at/4,Pt=He/4;for(let te=0;te<v;te++)s.HEAPU32[Fe++]=B[te],s.HEAPU32[V++]=l[t[te]];for(let te=0;te<_;te++)s.HEAPU32[Ee++]=F[te],s.HEAPU32[Pt++]=c[e[te]];let xt;s.jsepOnRunStart?.(u),xt=await s._OrtRun(u,ie,U,v,He,_,at,I),xt!==0&&Ae("failed to call OrtRun().");let $e=[];for(let te=0;te<_;te++){let Je=s.HEAPU32[at/4+te];if(Je===F[te]){$e.push(r[te]);continue}let lt=s.stackSave(),je=s.stackAlloc(4*4),Dt=!1,_e,Ze=0;try{s._OrtGetTensorData(Je,je,je+4,je+8,je+12)!==0&&Ae(`Can't access output tensor data on index ${te}.`);let Lt=je/4,wt=s.HEAPU32[Lt++];Ze=s.HEAPU32[Lt++];let vt=s.HEAPU32[Lt++],sr=s.HEAPU32[Lt++],Qe=[];for(let Oe=0;Oe<sr;Oe++)Qe.push(s.HEAPU32[vt/4+Oe]);s._OrtFree(vt);let Ct=Qe.reduce((Oe,Ge)=>Oe*Ge,1);_e=Jp(wt);let Ft=p?.outputPreferredLocations[e[te]];if(_e==="string"){if(Ft==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let Oe=[],Ge=Ze/4;for(let st=0;st<Ct;st++){let zt=s.HEAPU32[Ge++],Bt=st===Ct-1?void 0:s.HEAPU32[Ge]-zt;Oe.push(s.UTF8ToString(zt,Bt))}$e.push([_e,Qe,Oe,"cpu"])}else if(Ft==="gpu-buffer"&&Ct>0){let Oe=s.jsepGetBuffer(Ze),Ge=ga(wt);if(Ge===void 0||!No(_e))throw new Error(`Unsupported data type: ${_e}`);Dt=!0,$e.push([_e,Qe,{gpuBuffer:Oe,download:s.jsepCreateDownloader(Oe,Ct*Ge,_e),dispose:()=>{s._OrtReleaseTensor(Je)}},"gpu-buffer"])}else{let Oe=Pg(r[te],_e,Ct);new Uint8Array(Oe.buffer,Oe.byteOffset,Oe.byteLength).set(s.HEAPU8.subarray(Ze,Ze+Oe.byteLength)),$e.push([_e,Qe,Oe,"cpu"])}}finally{s.stackRestore(lt),_e==="string"&&Ze&&s._free(Ze),Dt||s._OrtReleaseTensor(Je)}}return p&&!b&&(s._OrtClearBoundOutputs(p.handle),Jr.set(a,[u,l,c,p,b,!1])),$e}finally{s.stackRestore(j),B.forEach(Fe=>s._OrtReleaseTensor(Fe)),F.forEach(Fe=>s._OrtReleaseTensor(Fe)),J.forEach(Fe=>s._free(Fe)),I!==0&&s._OrtReleaseRunOptions(I),L.forEach(Fe=>s._free(Fe))}},ld=a=>{let t=Se(),o=Jr.get(a);if(!o)throw new Error("invalid session id");let e=o[0],r=t._OrtEndProfiling(e);r===0&&Ae("Can't get an profile file name."),t._OrtFree(r)},wa=a=>{let t=[];for(let o of a){let e=o[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}});var cd=ye(($O,Lg)=>{Lg.exports='/*!\n * ONNX Runtime Web v1.17.0\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Licensed under the MIT License.\n */\n"use strict";(()=>{var Dt=Object.defineProperty;var on=Object.getOwnPropertyDescriptor;var sn=Object.getOwnPropertyNames;var un=Object.prototype.hasOwnProperty;var Ot=(i,d)=>()=>(i&&(d=i(i=0)),d);var ut=(i,d)=>()=>(d||i((d={exports:{}}).exports,d),d.exports),vt=(i,d)=>{for(var o in d)Dt(i,o,{get:d[o],enumerable:!0})},fn=(i,d,o,p)=>{if(d&&typeof d=="object"||typeof d=="function")for(let l of sn(d))!un.call(i,l)&&l!==o&&Dt(i,l,{get:()=>d[l],enumerable:!(p=on(d,l))||p.enumerable});return i};var ze=i=>fn(Dt({},"__esModule",{value:!0}),i);var Ft={};vt(Ft,{createReadStream:()=>Or,readFile:()=>ln,readFileSync:()=>cn});var ln,cn,Or,Ut=Ot(()=>{ln=void 0,cn=void 0,Or=void 0});var Rt={};vt(Rt,{join:()=>dn});var dn,Lt=Ot(()=>{dn=void 0});var Pt={};vt(Pt,{crypto:()=>pn});var pn,Bt=Ot(()=>{pn=void 0});var Er=ut((_r,It)=>{"use strict";var vr=(()=>{var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(i=i||__filename),function(d={}){var o=d,p,l;o.ready=new Promise((r,a)=>{p=r,l=a});var O=Object.assign({},o),h="./this.program",u=typeof window=="object",A=typeof importScripts=="function",D=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",R="",U,L,te;if(D){var B=(Ut(),ze(Ft)),P=(Lt(),ze(Rt));R=A?P.dirname(R)+"/":__dirname+"/",U=(r,a)=>(r=we(r)?new URL(r):P.normalize(r),B.readFileSync(r,a?void 0:"utf8")),te=r=>(r=U(r,!0),r.buffer||(r=new Uint8Array(r)),r),L=(r,a,s,c=!0)=>{r=we(r)?new URL(r):P.normalize(r),B.readFile(r,c?void 0:"utf8",(w,E)=>{w?s(w):a(c?E.buffer:E)})},!o.thisProgram&&1<process.argv.length&&(h=process.argv[1].replace(/\\\\/g,"/")),process.argv.slice(2),o.inspect=()=>"[Emscripten Module object]"}else(u||A)&&(A?R=self.location.href:typeof document<"u"&&document.currentScript&&(R=document.currentScript.src),i&&(R=i),R.indexOf("blob:")!==0?R=R.substr(0,R.replace(/[?#].*/,"").lastIndexOf("/")+1):R="",U=r=>{var a=new XMLHttpRequest;return a.open("GET",r,!1),a.send(null),a.responseText},A&&(te=r=>{var a=new XMLHttpRequest;return a.open("GET",r,!1),a.responseType="arraybuffer",a.send(null),new Uint8Array(a.response)}),L=(r,a,s)=>{var c=new XMLHttpRequest;c.open("GET",r,!0),c.responseType="arraybuffer",c.onload=()=>{c.status==200||c.status==0&&c.response?a(c.response):s()},c.onerror=s,c.send(null)});var _=console.log.bind(console),N=console.error.bind(console);Object.assign(o,O),O=null,typeof WebAssembly!="object"&&F("no native wasm support detected");var G,$=!1,oe,ee,S,Y,Ue;function Ie(){var r=G.buffer;o.HEAP8=oe=new Int8Array(r),o.HEAP16=new Int16Array(r),o.HEAPU8=ee=new Uint8Array(r),o.HEAPU16=new Uint16Array(r),o.HEAP32=S=new Int32Array(r),o.HEAPU32=Y=new Uint32Array(r),o.HEAPF32=new Float32Array(r),o.HEAPF64=Ue=new Float64Array(r)}var ce=[],re=[],Z=[],Ae=0,_e=null,ne=null;function F(r){throw r="Aborted("+r+")",N(r),$=!0,r=new WebAssembly.RuntimeError(r+". Build with -sASSERTIONS for more info."),l(r),r}var de=r=>r.startsWith("data:application/octet-stream;base64,"),we=r=>r.startsWith("file://"),le;if(le="ort-wasm.wasm",!de(le)){var Te=le;le=o.locateFile?o.locateFile(Te,R):R+Te}function V(r){if(te)return te(r);throw"both async and sync fetching of the wasm failed"}function pe(r){if(u||A){if(typeof fetch=="function"&&!we(r))return fetch(r,{credentials:"same-origin"}).then(a=>{if(!a.ok)throw"failed to load wasm binary file at \'"+r+"\'";return a.arrayBuffer()}).catch(()=>V(r));if(L)return new Promise((a,s)=>{L(r,c=>a(new Uint8Array(c)),s)})}return Promise.resolve().then(()=>V(r))}function Ne(r,a,s){return pe(r).then(c=>WebAssembly.instantiate(c,a)).then(c=>c).then(s,c=>{N(`failed to asynchronously prepare wasm: ${c}`),F(c)})}function Me(r,a){var s=le;return typeof WebAssembly.instantiateStreaming!="function"||de(s)||we(s)||D||typeof fetch!="function"?Ne(s,r,a):fetch(s,{credentials:"same-origin"}).then(c=>WebAssembly.instantiateStreaming(c,r).then(a,function(w){return N(`wasm streaming compile failed: ${w}`),N("falling back to ArrayBuffer instantiation"),Ne(s,r,a)}))}var Ee,Se={882208:(r,a,s,c)=>{if(typeof o>"u"||!o.Ga)return 1;if(r=se(r>>>0),r.startsWith("./")&&(r=r.substring(2)),r=o.Ga.get(r),!r)return 2;if(a>>>=0,s>>>=0,a+s>r.byteLength)return 3;try{return ee.set(r.subarray(a,a+s),c>>>0>>>0),0}catch{return 4}}};function He(r){this.Da=r-24,this.Fa=function(a){Y[this.Da+4>>>2>>>0]=a},this.Ea=function(a){Y[this.Da+8>>>2>>>0]=a},this.La=function(a,s){this.Ma(),this.Fa(a),this.Ea(s)},this.Ma=function(){Y[this.Da+16>>>2>>>0]=0}}var me=0,Ce=0,xe=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,q=(r,a,s)=>{a>>>=0;var c=a+s;for(s=a;r[s]&&!(s>=c);)++s;if(16<s-a&&r.buffer&&xe)return xe.decode(r.subarray(a,s));for(c="";a<s;){var w=r[a++];if(w&128){var E=r[a++]&63;if((w&224)==192)c+=String.fromCharCode((w&31)<<6|E);else{var T=r[a++]&63;w=(w&240)==224?(w&15)<<12|E<<6|T:(w&7)<<18|E<<12|T<<6|r[a++]&63,65536>w?c+=String.fromCharCode(w):(w-=65536,c+=String.fromCharCode(55296|w>>10,56320|w&1023))}}else c+=String.fromCharCode(w)}return c},se=(r,a)=>(r>>>=0)?q(ee,r,a):"",ye=r=>{for(var a=0,s=0;s<r.length;++s){var c=r.charCodeAt(s);127>=c?a++:2047>=c?a+=2:55296<=c&&57343>=c?(a+=4,++s):a+=3}return a},Re=(r,a,s,c)=>{if(s>>>=0,!(0<c))return 0;var w=s;c=s+c-1;for(var E=0;E<r.length;++E){var T=r.charCodeAt(E);if(55296<=T&&57343>=T){var H=r.charCodeAt(++E);T=65536+((T&1023)<<10)|H&1023}if(127>=T){if(s>=c)break;a[s++>>>0]=T}else{if(2047>=T){if(s+1>=c)break;a[s++>>>0]=192|T>>6}else{if(65535>=T){if(s+2>=c)break;a[s++>>>0]=224|T>>12}else{if(s+3>=c)break;a[s++>>>0]=240|T>>18,a[s++>>>0]=128|T>>12&63}a[s++>>>0]=128|T>>6&63}a[s++>>>0]=128|T&63}}return a[s>>>0]=0,s-w},De=r=>r%4===0&&(r%100!==0||r%400===0),et=[0,31,60,91,121,152,182,213,244,274,305,335],lt=[0,31,59,90,120,151,181,212,243,273,304,334],Le=r=>{var a=ye(r)+1,s=ge(a);return s&&Re(r,ee,s,a),s},Ye=[],We={},Ve=()=>{if(!qe){var r={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:h||"./this.program"},a;for(a in We)We[a]===void 0?delete r[a]:r[a]=We[a];var s=[];for(a in r)s.push(`${a}=${r[a]}`);qe=s}return qe},qe,ke=[null,[],[]],ct=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return s=>crypto.getRandomValues(s);if(D)try{var r=(Bt(),ze(Pt));if(r.randomFillSync)return s=>r.randomFillSync(s);var a=r.randomBytes;return s=>(s.set(a(s.byteLength)),s)}catch{}F("initRandomDevice")},tt=r=>(tt=ct())(r),Ge=[31,29,31,30,31,30,31,31,30,31,30,31],dt=[31,28,31,30,31,30,31,31,30,31,30,31];function j(r){var a=Array(ye(r)+1);return Re(r,a,0,a.length),a}function rt(r,a,s,c){function w(m,W,z){for(m=typeof m=="number"?m.toString():m||"";m.length<W;)m=z[0]+m;return m}function E(m,W){return w(m,W,"0")}function T(m,W){function z(Xe){return 0>Xe?-1:0<Xe?1:0}var Oe;return(Oe=z(m.getFullYear()-W.getFullYear()))===0&&(Oe=z(m.getMonth()-W.getMonth()))===0&&(Oe=z(m.getDate()-W.getDate())),Oe}function H(m){switch(m.getDay()){case 0:return new Date(m.getFullYear()-1,11,29);case 1:return m;case 2:return new Date(m.getFullYear(),0,3);case 3:return new Date(m.getFullYear(),0,2);case 4:return new Date(m.getFullYear(),0,1);case 5:return new Date(m.getFullYear()-1,11,31);case 6:return new Date(m.getFullYear()-1,11,30)}}function ie(m){var W=m.ya;for(m=new Date(new Date(m.za+1900,0,1).getTime());0<W;){var z=m.getMonth(),Oe=(De(m.getFullYear())?Ge:dt)[z];if(W>Oe-m.getDate())W-=Oe-m.getDate()+1,m.setDate(1),11>z?m.setMonth(z+1):(m.setMonth(0),m.setFullYear(m.getFullYear()+1));else{m.setDate(m.getDate()+W);break}}return z=new Date(m.getFullYear()+1,0,4),W=H(new Date(m.getFullYear(),0,4)),z=H(z),0>=T(W,m)?0>=T(z,m)?m.getFullYear()+1:m.getFullYear():m.getFullYear()-1}r>>>=0,a>>>=0,s>>>=0,c>>>=0;var ue=Y[c+40>>>2>>>0];c={Ja:S[c>>>2>>>0],Ia:S[c+4>>>2>>>0],Aa:S[c+8>>>2>>>0],Ca:S[c+12>>>2>>>0],Ba:S[c+16>>>2>>>0],za:S[c+20>>>2>>>0],xa:S[c+24>>>2>>>0],ya:S[c+28>>>2>>>0],Na:S[c+32>>>2>>>0],Ha:S[c+36>>>2>>>0],Ka:ue?se(ue):""},s=se(s),ue={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var fe in ue)s=s.replace(new RegExp(fe,"g"),ue[fe]);var st="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),it="January February March April May June July August September October November December".split(" ");ue={"%a":m=>st[m.xa].substring(0,3),"%A":m=>st[m.xa],"%b":m=>it[m.Ba].substring(0,3),"%B":m=>it[m.Ba],"%C":m=>E((m.za+1900)/100|0,2),"%d":m=>E(m.Ca,2),"%e":m=>w(m.Ca,2," "),"%g":m=>ie(m).toString().substring(2),"%G":m=>ie(m),"%H":m=>E(m.Aa,2),"%I":m=>(m=m.Aa,m==0?m=12:12<m&&(m-=12),E(m,2)),"%j":m=>{for(var W=0,z=0;z<=m.Ba-1;W+=(De(m.za+1900)?Ge:dt)[z++]);return E(m.Ca+W,3)},"%m":m=>E(m.Ba+1,2),"%M":m=>E(m.Ia,2),"%n":()=>`\n`,"%p":m=>0<=m.Aa&&12>m.Aa?"AM":"PM","%S":m=>E(m.Ja,2),"%t":()=>"	","%u":m=>m.xa||7,"%U":m=>E(Math.floor((m.ya+7-m.xa)/7),2),"%V":m=>{var W=Math.floor((m.ya+7-(m.xa+6)%7)/7);if(2>=(m.xa+371-m.ya-2)%7&&W++,W)W==53&&(z=(m.xa+371-m.ya)%7,z==4||z==3&&De(m.za)||(W=1));else{W=52;var z=(m.xa+7-m.ya-1)%7;(z==4||z==5&&De(m.za%400-1))&&W++}return E(W,2)},"%w":m=>m.xa,"%W":m=>E(Math.floor((m.ya+7-(m.xa+6)%7)/7),2),"%y":m=>(m.za+1900).toString().substring(2),"%Y":m=>m.za+1900,"%z":m=>{m=m.Ha;var W=0<=m;return m=Math.abs(m)/60,(W?"+":"-")+("0000"+(m/60*100+m%60)).slice(-4)},"%Z":m=>m.Ka,"%%":()=>"%"},s=s.replace(/%%/g,"\\0\\0");for(fe in ue)s.includes(fe)&&(s=s.replace(new RegExp(fe,"g"),ue[fe](c)));return s=s.replace(/\\0\\0/g,"%"),fe=j(s),fe.length>a?0:(oe.set(fe,r>>>0),fe.length-1)}var Fe=[],be,Pe,pt=[],C=(r,a)=>{if(!Pe){Pe=new WeakMap;var s=be.length;if(Pe)for(var c=0;c<0+s;c++){var w=c,E=Fe[w];E||(w>=Fe.length&&(Fe.length=w+1),Fe[w]=E=be.get(w)),(w=E)&&Pe.set(w,c)}}if(s=Pe.get(r)||0)return s;if(pt.length)s=pt.pop();else{try{be.grow(1)}catch(H){throw H instanceof RangeError?"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.":H}s=be.length-1}try{c=s,be.set(c,r),Fe[c]=be.get(c)}catch(H){if(!(H instanceof TypeError))throw H;if(typeof WebAssembly.Function=="function"){c=WebAssembly.Function,w={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"},E={parameters:[],results:a[0]=="v"?[]:[w[a[0]]]};for(var T=1;T<a.length;++T)E.parameters.push(w[a[T]]);a=new c(E,r)}else{for(c=[1],w=a.slice(0,1),a=a.slice(1),E={i:127,p:127,j:126,f:125,d:124,e:111},c.push(96),T=a.length,128>T?c.push(T):c.push(T%128|128,T>>7),T=0;T<a.length;++T)c.push(E[a[T]]);w=="v"?c.push(0):c.push(1,E[w]),a=[0,97,115,109,1,0,0,0,1],w=c.length,128>w?a.push(w):a.push(w%128|128,w>>7),a.push.apply(a,c),a.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),a=new WebAssembly.Module(new Uint8Array(a)),a=new WebAssembly.Instance(a,{e:{f:r}}).exports.f}c=s,be.set(c,a),Fe[c]=be.get(c)}return Pe.set(r,s),s},Je={a:function(r,a,s){throw r>>>=0,new He(r).La(a>>>0,s>>>0),me=r,Ce++,me},e:function(){return 0},L:function(){},A:function(){},C:function(){},u:function(){return 0},J:function(){},E:function(){},I:function(){},k:function(){},B:function(){},y:function(){},K:function(){},z:function(){},l:()=>1,o:function(r,a,s){r=a+2097152>>>0<4194305-!!r?(r>>>0)+4294967296*a:NaN,s>>>=0,r=new Date(1e3*r),S[s>>>2>>>0]=r.getUTCSeconds(),S[s+4>>>2>>>0]=r.getUTCMinutes(),S[s+8>>>2>>>0]=r.getUTCHours(),S[s+12>>>2>>>0]=r.getUTCDate(),S[s+16>>>2>>>0]=r.getUTCMonth(),S[s+20>>>2>>>0]=r.getUTCFullYear()-1900,S[s+24>>>2>>>0]=r.getUTCDay(),S[s+28>>>2>>>0]=(r.getTime()-Date.UTC(r.getUTCFullYear(),0,1,0,0,0,0))/864e5|0},p:function(r,a,s){r=a+2097152>>>0<4194305-!!r?(r>>>0)+4294967296*a:NaN,s>>>=0,r=new Date(1e3*r),S[s>>>2>>>0]=r.getSeconds(),S[s+4>>>2>>>0]=r.getMinutes(),S[s+8>>>2>>>0]=r.getHours(),S[s+12>>>2>>>0]=r.getDate(),S[s+16>>>2>>>0]=r.getMonth(),S[s+20>>>2>>>0]=r.getFullYear()-1900,S[s+24>>>2>>>0]=r.getDay(),S[s+28>>>2>>>0]=(De(r.getFullYear())?et:lt)[r.getMonth()]+r.getDate()-1|0,S[s+36>>>2>>>0]=-(60*r.getTimezoneOffset()),a=new Date(r.getFullYear(),6,1).getTimezoneOffset();var c=new Date(r.getFullYear(),0,1).getTimezoneOffset();S[s+32>>>2>>>0]=(a!=c&&r.getTimezoneOffset()==Math.min(c,a))|0},q:function(r){r>>>=0;var a=new Date(S[r+20>>>2>>>0]+1900,S[r+16>>>2>>>0],S[r+12>>>2>>>0],S[r+8>>>2>>>0],S[r+4>>>2>>>0],S[r>>>2>>>0],0),s=S[r+32>>>2>>>0],c=a.getTimezoneOffset(),w=new Date(a.getFullYear(),6,1).getTimezoneOffset(),E=new Date(a.getFullYear(),0,1).getTimezoneOffset(),T=Math.min(E,w);return 0>s?S[r+32>>>2>>>0]=+(w!=E&&T==c):0<s!=(T==c)&&(w=Math.max(E,w),a.setTime(a.getTime()+6e4*((0<s?T:w)-c))),S[r+24>>>2>>>0]=a.getDay(),S[r+28>>>2>>>0]=(De(a.getFullYear())?et:lt)[a.getMonth()]+a.getDate()-1|0,S[r>>>2>>>0]=a.getSeconds(),S[r+4>>>2>>>0]=a.getMinutes(),S[r+8>>>2>>>0]=a.getHours(),S[r+12>>>2>>>0]=a.getDate(),S[r+16>>>2>>>0]=a.getMonth(),S[r+20>>>2>>>0]=a.getYear(),r=a.getTime(),isNaN(r)?(S[Be()>>>2>>>0]=61,r=-1):r/=1e3,nt((Ee=r,1<=+Math.abs(Ee)?0<Ee?+Math.floor(Ee/4294967296)>>>0:~~+Math.ceil((Ee-+(~~Ee>>>0))/4294967296)>>>0:0)),r>>>0},m:function(){return-52},n:function(){},w:function(r,a,s){function c(ie){return(ie=ie.toTimeString().match(/\\(([A-Za-z ]+)\\)$/))?ie[1]:"GMT"}s>>>=0;var w=new Date().getFullYear(),E=new Date(w,0,1),T=new Date(w,6,1);w=E.getTimezoneOffset();var H=T.getTimezoneOffset();Y[r>>>0>>>2>>>0]=60*Math.max(w,H),S[a>>>0>>>2>>>0]=+(w!=H),r=c(E),a=c(T),r=Le(r),a=Le(a),H<w?(Y[s>>>2>>>0]=r,Y[s+4>>>2>>>0]=a):(Y[s>>>2>>>0]=a,Y[s+4>>>2>>>0]=r)},d:()=>{F("")},D:function(r,a,s){r>>>=0,a>>>=0,s>>>=0,Ye.length=0;for(var c;c=ee[a++>>>0];){var w=c!=105;w&=c!=112,s+=w&&s%8?4:0,Ye.push(c==112?Y[s>>>2>>>0]:c==105?S[s>>>2>>>0]:Ue[s>>>3>>>0]),s+=w?8:4}return Se[r].apply(null,Ye)},g:()=>Date.now(),x:function(){return 4294901760},b:()=>performance.now(),H:function(r,a,s){return a>>>=0,ee.copyWithin(r>>>0>>>0,a>>>0,a+(s>>>0)>>>0)},v:function(r){r>>>=0;var a=ee.length;if(4294901760<r)return!1;for(var s=1;4>=s;s*=2){var c=a*(1+.2/s);c=Math.min(c,r+100663296);var w=Math;c=Math.max(r,c);e:{w=(w.min.call(w,4294901760,c+(65536-c%65536)%65536)-G.buffer.byteLength+65535)/65536;try{G.grow(w),Ie();var E=1;break e}catch{}E=void 0}if(E)return!0}return!1},F:function(r,a){r>>>=0,a>>>=0;var s=0;return Ve().forEach((c,w)=>{var E=a+s;for(w=Y[r+4*w>>>2>>>0]=E,E=0;E<c.length;++E)oe[w++>>>0>>>0]=c.charCodeAt(E);oe[w>>>0>>>0]=0,s+=c.length+1}),0},G:function(r,a){r>>>=0,a>>>=0;var s=Ve();Y[r>>>2>>>0]=s.length;var c=0;return s.forEach(w=>c+=w.length+1),Y[a>>>2>>>0]=c,0},f:()=>52,j:function(){return 52},r:function(){return 70},i:function(r,a,s,c){a>>>=0,s>>>=0,c>>>=0;for(var w=0,E=0;E<s;E++){var T=Y[a>>>2>>>0],H=Y[a+4>>>2>>>0];a+=8;for(var ie=0;ie<H;ie++){var ue=ee[T+ie>>>0],fe=ke[r];ue===0||ue===10?((r===1?_:N)(q(fe,0)),fe.length=0):fe.push(ue)}w+=H}return Y[c>>>2>>>0]=w,0},s:function(r,a){return r>>>=0,tt(ee.subarray(r>>>0,r+(a>>>0)>>>0)),0},t:rt,c:function(r,a,s,c){return rt(r>>>0,a>>>0,s>>>0,c>>>0)},h:function(r,a,s,c){let w=be.length;r=new Uint8Array(ee.slice(r+a,r+s));try{var E=new WebAssembly.Module(r),T=new WebAssembly.Instance(E,{env:{memory:G}}),H;for(H in T.exports)C(T.exports[H]);return w<be.length?w:c}catch(ie){return console.log(ie),c}}},x=function(){function r(s){return x=s.exports,x=ht(),G=x.M,Ie(),be=x.sa,re.unshift(x.N),Ae--,Ae==0&&(_e!==null&&(clearInterval(_e),_e=null),ne&&(s=ne,ne=null,s())),x}var a={a:Je};if(Ae++,o.instantiateWasm)try{return o.instantiateWasm(a,r)}catch(s){N(`Module.instantiateWasm callback failed with error: ${s}`),l(s)}return Me(a,function(s){r(s.instance)}).catch(l),{}}();o._OrtInit=(r,a)=>(o._OrtInit=x.O)(r,a),o._OrtGetLastError=(r,a)=>(o._OrtGetLastError=x.P)(r,a),o._OrtCreateSessionOptions=(r,a,s,c,w,E,T,H,ie,ue)=>(o._OrtCreateSessionOptions=x.Q)(r,a,s,c,w,E,T,H,ie,ue),o._OrtAppendExecutionProvider=(r,a)=>(o._OrtAppendExecutionProvider=x.R)(r,a),o._OrtAddFreeDimensionOverride=(r,a,s)=>(o._OrtAddFreeDimensionOverride=x.S)(r,a,s),o._OrtAddSessionConfigEntry=(r,a,s)=>(o._OrtAddSessionConfigEntry=x.T)(r,a,s),o._OrtReleaseSessionOptions=r=>(o._OrtReleaseSessionOptions=x.U)(r),o._OrtCreateSession=(r,a,s)=>(o._OrtCreateSession=x.V)(r,a,s),o._OrtReleaseSession=r=>(o._OrtReleaseSession=x.W)(r),o._OrtGetInputOutputCount=(r,a,s)=>(o._OrtGetInputOutputCount=x.X)(r,a,s),o._OrtGetInputName=(r,a)=>(o._OrtGetInputName=x.Y)(r,a),o._OrtGetOutputName=(r,a)=>(o._OrtGetOutputName=x.Z)(r,a),o._OrtFree=r=>(o._OrtFree=x._)(r),o._OrtCreateTensor=(r,a,s,c,w,E)=>(o._OrtCreateTensor=x.$)(r,a,s,c,w,E),o._OrtGetTensorData=(r,a,s,c,w)=>(o._OrtGetTensorData=x.aa)(r,a,s,c,w),o._OrtReleaseTensor=r=>(o._OrtReleaseTensor=x.ba)(r),o._OrtCreateRunOptions=(r,a,s,c)=>(o._OrtCreateRunOptions=x.ca)(r,a,s,c),o._OrtAddRunConfigEntry=(r,a,s)=>(o._OrtAddRunConfigEntry=x.da)(r,a,s),o._OrtReleaseRunOptions=r=>(o._OrtReleaseRunOptions=x.ea)(r),o._OrtCreateBinding=r=>(o._OrtCreateBinding=x.fa)(r),o._OrtBindInput=(r,a,s)=>(o._OrtBindInput=x.ga)(r,a,s),o._OrtBindOutput=(r,a,s,c)=>(o._OrtBindOutput=x.ha)(r,a,s,c),o._OrtClearBoundOutputs=r=>(o._OrtClearBoundOutputs=x.ia)(r),o._OrtReleaseBinding=r=>(o._OrtReleaseBinding=x.ja)(r),o._OrtRunWithBinding=(r,a,s,c,w)=>(o._OrtRunWithBinding=x.ka)(r,a,s,c,w),o._OrtRun=(r,a,s,c,w,E,T,H)=>(o._OrtRun=x.la)(r,a,s,c,w,E,T,H),o._OrtEndProfiling=r=>(o._OrtEndProfiling=x.ma)(r),o._OrtConfigure=(r,a)=>(o._OrtConfigure=x.na)(r,a),o._OrtAuth=(r,a)=>(o._OrtAuth=x.oa)(r,a);var Be=()=>(Be=x.pa)(),ge=o._malloc=r=>(ge=o._malloc=x.qa)(r);o._free=r=>(o._free=x.ra)(r);var nt=r=>(nt=x.ta)(r),mt=()=>(mt=x.ua)(),at=r=>(at=x.va)(r),gt=r=>(gt=x.wa)(r);o.___start_em_js=882709,o.___stop_em_js=883321;function ht(){var r=x;r=Object.assign({},r);var a=c=>()=>c()>>>0,s=c=>w=>c(w)>>>0;return r.pa=a(r.pa),r.qa=s(r.qa),r.ua=a(r.ua),r.wa=s(r.wa),r}o.stackAlloc=gt,o.stackSave=mt,o.stackRestore=at,o.addFunction=C,o.UTF8ToString=se,o.stringToUTF8=(r,a,s)=>Re(r,ee,a,s),o.lengthBytesUTF8=ye;var $e;ne=function r(){$e||ot(),$e||(ne=r)};function ot(){if(!(0<Ae)){if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;){var r=o.preRun.shift();ce.unshift(r)}for(;0<ce.length;)ce.shift()(o);if(!(0<Ae||$e||($e=!0,o.calledRun=!0,$))){for(;0<re.length;)re.shift()(o);for(p(o);0<Z.length;)Z.shift()(o)}}}return ot(),d.ready}})();typeof _r=="object"&&typeof It=="object"?It.exports=vr:typeof define=="function"&&define.amd&&define([],()=>vr)});var Sr=ut(()=>{});var Ar=ut(()=>{});var Tr={};vt(Tr,{cpus:()=>mn});var mn,Mr=Ot(()=>{mn=void 0});var Dr=ut((xr,Wt)=>{"use strict";var Cr=(()=>{var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(i=i||__filename),function(d={}){function o(){return Z.buffer!=F.buffer&&V(),F}function p(){return Z.buffer!=F.buffer&&V(),de}function l(){return Z.buffer!=F.buffer&&V(),we}function O(){return Z.buffer!=F.buffer&&V(),le}function h(){return Z.buffer!=F.buffer&&V(),Te}var u=d,A,D;u.ready=new Promise((e,t)=>{A=e,D=t});var R=Object.assign({},u),U="./this.program",L=(e,t)=>{throw t},te=typeof window=="object",B=typeof importScripts=="function",P=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",_=u.ENVIRONMENT_IS_PTHREAD||!1,N="";function G(e){return u.locateFile?u.locateFile(e,N):N+e}var $,oe,ee;if(P){var S=(Ut(),ze(Ft)),Y=(Lt(),ze(Rt));N=B?Y.dirname(N)+"/":__dirname+"/",$=(t,n)=>(t=se(t)?new URL(t):Y.normalize(t),S.readFileSync(t,n?void 0:"utf8")),ee=t=>(t=$(t,!0),t.buffer||(t=new Uint8Array(t)),t),oe=(t,n,f,y=!0)=>{t=se(t)?new URL(t):Y.normalize(t),S.readFile(t,y?void 0:"utf8",(b,v)=>{b?f(b):n(y?v.buffer:v)})},!u.thisProgram&&1<process.argv.length&&(U=process.argv[1].replace(/\\\\/g,"/")),process.argv.slice(2),L=(t,n)=>{throw process.exitCode=t,n},u.inspect=()=>"[Emscripten Module object]";let e;try{e=Sr()}catch(t){throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'),t}global.Worker=e.Worker}else(te||B)&&(B?N=self.location.href:typeof document<"u"&&document.currentScript&&(N=document.currentScript.src),typeof i<"u"&&i&&(N=i),N.indexOf("blob:")!==0?N=N.substr(0,N.replace(/[?#].*/,"").lastIndexOf("/")+1):N="",P||($=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},B&&(ee=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),oe=(e,t,n)=>{var f=new XMLHttpRequest;f.open("GET",e,!0),f.responseType="arraybuffer",f.onload=()=>{f.status==200||f.status==0&&f.response?t(f.response):n()},f.onerror=n,f.send(null)}));P&&typeof performance>"u"&&(global.performance=Ar().performance);var Ue=console.log.bind(console),Ie=console.error.bind(console);P&&(Ue=(...e)=>S.writeSync(1,e.join(" ")+`\n`),Ie=(...e)=>S.writeSync(2,e.join(" ")+`\n`));var ce=Ue,re=Ie;Object.assign(u,R),R=null,typeof WebAssembly!="object"&&xe("no native wasm support detected");var Z,Ae,_e=!1,ne,F,de,we,le,Te;function V(){var e=Z.buffer;u.HEAP8=F=new Int8Array(e),u.HEAP16=new Int16Array(e),u.HEAPU8=de=new Uint8Array(e),u.HEAPU16=new Uint16Array(e),u.HEAP32=we=new Int32Array(e),u.HEAPU32=le=new Uint32Array(e),u.HEAPF32=new Float32Array(e),u.HEAPF64=Te=new Float64Array(e)}var pe=16777216;if(_)Z=u.wasmMemory;else if(u.wasmMemory)Z=u.wasmMemory;else if(Z=new WebAssembly.Memory({initial:pe/65536,maximum:65536,shared:!0}),!(Z.buffer instanceof SharedArrayBuffer))throw re("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),P&&re("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");V(),pe=Z.buffer.byteLength;var Ne=[],Me=[],Ee=[],Se=0,He=null,me=null;function Ce(){if(Se--,Se==0&&(He!==null&&(clearInterval(He),He=null),me)){var e=me;me=null,e()}}function xe(e){throw e="Aborted("+e+")",re(e),_e=!0,ne=1,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),D(e),e}var q=e=>e.startsWith("data:application/octet-stream;base64,"),se=e=>e.startsWith("file://"),ye;ye="ort-wasm-threaded.wasm",q(ye)||(ye=G(ye));function Re(e){if(ee)return ee(e);throw"both async and sync fetching of the wasm failed"}function De(e){if(te||B){if(typeof fetch=="function"&&!se(e))return fetch(e,{credentials:"same-origin"}).then(t=>{if(!t.ok)throw"failed to load wasm binary file at \'"+e+"\'";return t.arrayBuffer()}).catch(()=>Re(e));if(oe)return new Promise((t,n)=>{oe(e,f=>t(new Uint8Array(f)),n)})}return Promise.resolve().then(()=>Re(e))}function et(e,t,n){return De(e).then(f=>WebAssembly.instantiate(f,t)).then(f=>f).then(n,f=>{re(`failed to asynchronously prepare wasm: ${f}`),xe(f)})}function lt(e,t){var n=ye;return typeof WebAssembly.instantiateStreaming!="function"||q(n)||se(n)||P||typeof fetch!="function"?et(n,e,t):fetch(n,{credentials:"same-origin"}).then(f=>WebAssembly.instantiateStreaming(f,e).then(t,function(y){return re(`wasm streaming compile failed: ${y}`),re("falling back to ArrayBuffer instantiation"),et(n,e,t)}))}var Le,Ye={886596:(e,t,n,f)=>{if(typeof u>"u"||!u.hb)return 1;if(e=Ge(e>>>0),e.startsWith("./")&&(e=e.substring(2)),e=u.hb.get(e),!e)return 2;if(t>>>=0,n>>>=0,f>>>=0,t+n>e.byteLength)return 3;try{return p().set(e.subarray(t,t+n),f>>>0),0}catch{return 4}}};function We(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}var Ve=e=>{e.terminate(),e.onmessage=()=>{}},qe=e=>{C.Ta.length==0&&(Pe(),C.bb(C.Ta[0]));var t=C.Ta.pop();if(!t)return 6;C.Ua.push(t),C.Qa[e.Sa]=t,t.Sa=e.Sa;var n={cmd:"run",start_routine:e.ob,arg:e.lb,pthread_ptr:e.Sa};return P&&t.unref(),t.postMessage(n,e.ub),0},ke=0,ct=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,tt=(e,t,n)=>{t>>>=0;var f=t+n;for(n=t;e[n]&&!(n>=f);)++n;if(16<n-t&&e.buffer&&ct)return ct.decode(e.buffer instanceof SharedArrayBuffer?e.slice(t,n):e.subarray(t,n));for(f="";t<n;){var y=e[t++];if(y&128){var b=e[t++]&63;if((y&224)==192)f+=String.fromCharCode((y&31)<<6|b);else{var v=e[t++]&63;y=(y&240)==224?(y&15)<<12|b<<6|v:(y&7)<<18|b<<12|v<<6|e[t++]&63,65536>y?f+=String.fromCharCode(y):(y-=65536,f+=String.fromCharCode(55296|y>>10,56320|y&1023))}}else f+=String.fromCharCode(y)}return f},Ge=(e,t)=>(e>>>=0)?tt(p(),e,t):"",dt=e=>{var t=Ct();return e=e(),bt(t),e};function j(e,t){var n=arguments.length-2,f=arguments;return dt(()=>{for(var y=xt(8*n),b=y>>>3,v=0;v<n;v++){var I=f[2+v];h()[b+v>>>0]=I}return dr(e,n,y,t)})}function rt(e){if(_)return j(0,1,e);ne=e,0<ke||(C.pb(),u.onExit?.(e),_e=!0),L(e,new We(e))}var Fe=e=>{if(ne=e,_)throw x(e),"unwind";rt(e)};function be(){for(var e=u.numThreads;e--;)Pe();Ne.unshift(()=>{Se++,pt(()=>Ce())})}function Pe(){var e=G("ort-wasm-threaded.worker.js");e=new Worker(e),C.Ta.push(e)}function pt(e){_?e():Promise.all(C.Ta.map(C.bb)).then(e)}var C={Ta:[],Ua:[],gb:[],Qa:{},$a(){_?(C.receiveObjectTransfer=C.nb,C.threadInitTLS=C.fb,C.setExitStatus=C.eb):be()},eb:e=>ne=e,xb:["$terminateWorker"],pb:()=>{for(var e of C.Ua)Ve(e);for(e of C.Ta)Ve(e);C.Ta=[],C.Ua=[],C.Qa=[]},cb:e=>{var t=e.Sa;delete C.Qa[t],C.Ta.push(e),C.Ua.splice(C.Ua.indexOf(e),1),e.Sa=0,Tt(t)},nb(){},fb(){C.gb.forEach(e=>e())},bb:e=>new Promise(t=>{e.onmessage=b=>{b=b.data;var v=b.cmd;if(b.targetThread&&b.targetThread!=yt()){var I=C.Qa[b.targetThread];I?I.postMessage(b,b.transferList):re(`Internal error! Worker sent a message "${v}" to target pthread ${b.targetThread}, but that thread no longer exists!`)}else v==="checkMailbox"?Oe():v==="spawnThread"?qe(b):v==="cleanupThread"?C.cb(C.Qa[b.thread]):v==="killThread"?(b=b.thread,v=C.Qa[b],delete C.Qa[b],Ve(v),Tt(b),C.Ua.splice(C.Ua.indexOf(v),1),v.Sa=0):v==="cancelThread"?C.Qa[b.thread].postMessage({cmd:"cancel"}):v==="loaded"?(e.loaded=!0,P&&!e.Sa&&e.unref(),t(e)):v==="alert"?alert(`Thread ${b.threadId}: ${b.text}`):b.target==="setimmediate"?e.postMessage(b):v==="callHandler"?u[b.handler](...b.args):v&&re(`worker sent an unknown command ${v}`)},e.onerror=b=>{throw re(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b},P&&(e.on("message",b=>e.onmessage({data:b})),e.on("error",b=>e.onerror(b)));var n=[],f=["onExit"],y;for(y of f)u.hasOwnProperty(y)&&n.push(y);e.postMessage({cmd:"load",handlers:n,urlOrBlob:u.mainScriptUrlOrBlob||i,wasmMemory:Z,wasmModule:Ae})})};u.PThread=C;var Je=e=>{for(;0<e.length;)e.shift()(u)};u.establishStackSpace=()=>{var e=yt(),t=O()[e+52>>>2>>>0];e=O()[e+56>>>2>>>0],gr(t,t-e),bt(t)};function x(e){if(_)return j(1,0,e);Fe(e)}var Be=[],ge,nt=e=>{var t=Be[e];return t||(e>=Be.length&&(Be.length=e+1),Be[e]=t=ge.get(e)),t};u.invokeEntryPoint=(e,t)=>{e=nt(e)(t),0<ke?C.eb(e):Mt(e)};function mt(e){this.Za=e-24,this.kb=function(t){O()[this.Za+4>>>2>>>0]=t},this.jb=function(t){O()[this.Za+8>>>2>>>0]=t},this.$a=function(t,n){this.ib(),this.kb(t),this.jb(n)},this.ib=function(){O()[this.Za+16>>>2>>>0]=0}}var at=0,gt=0;function ht(e,t,n,f){return _?j(2,1,e,t,n,f):$e(e,t,n,f)}function $e(e,t,n,f){if(e>>>=0,t>>>=0,n>>>=0,f>>>=0,typeof SharedArrayBuffer>"u")return re("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var y=[];return _&&y.length===0?ht(e,t,n,f):(e={ob:n,Sa:e,lb:f,ub:y},_?(e.wb="spawnThread",postMessage(e,y),0):qe(e))}function ot(e,t,n){return _?j(3,1,e,t,n):0}function r(e,t){if(_)return j(4,1,e,t)}var a=e=>{for(var t=0,n=0;n<e.length;++n){var f=e.charCodeAt(n);127>=f?t++:2047>=f?t+=2:55296<=f&&57343>=f?(t+=4,++n):t+=3}return t},s=(e,t,n,f)=>{if(n>>>=0,!(0<f))return 0;var y=n;f=n+f-1;for(var b=0;b<e.length;++b){var v=e.charCodeAt(b);if(55296<=v&&57343>=v){var I=e.charCodeAt(++b);v=65536+((v&1023)<<10)|I&1023}if(127>=v){if(n>=f)break;t[n++>>>0]=v}else{if(2047>=v){if(n+1>=f)break;t[n++>>>0]=192|v>>6}else{if(65535>=v){if(n+2>=f)break;t[n++>>>0]=224|v>>12}else{if(n+3>=f)break;t[n++>>>0]=240|v>>18,t[n++>>>0]=128|v>>12&63}t[n++>>>0]=128|v>>6&63}t[n++>>>0]=128|v&63}}return t[n>>>0]=0,n-y},c=(e,t,n)=>s(e,p(),t,n);function w(e,t){if(_)return j(5,1,e,t)}function E(e,t,n){if(_)return j(6,1,e,t,n)}function T(e,t,n){return _?j(7,1,e,t,n):0}function H(e,t){if(_)return j(8,1,e,t)}function ie(e,t,n){if(_)return j(9,1,e,t,n)}function ue(e,t,n,f){if(_)return j(10,1,e,t,n,f)}function fe(e,t,n,f){if(_)return j(11,1,e,t,n,f)}function st(e,t,n,f){if(_)return j(12,1,e,t,n,f)}function it(e){if(_)return j(13,1,e)}function m(e,t){if(_)return j(14,1,e,t)}function W(e,t,n){if(_)return j(15,1,e,t,n)}function z(e){e>>>=0,typeof Atomics.vb=="function"&&(Atomics.vb(l(),e>>>2,e).value.then(Oe),e+=128,Atomics.store(l(),e>>>2,1))}u.__emscripten_thread_mailbox_await=z;var Oe=()=>{var e=yt();if(e&&(z(e),e=pr,!_e))try{if(e(),!(0<ke))try{_?Mt(ne):Fe(ne)}catch(t){t instanceof We||t=="unwind"||L(1,t)}}catch(t){t instanceof We||t=="unwind"||L(1,t)}};u.checkMailbox=Oe;var Xe=[],Qe=e=>e%4===0&&(e%100!==0||e%400===0),zt=[0,31,60,91,121,152,182,213,244,274,305,335],Yt=[0,31,59,90,120,151,181,212,243,273,304,334];function Vt(e,t,n,f,y,b,v,I){return _?j(16,1,e,t,n,f,y,b,v,I):-52}function qt(e,t,n,f,y,b,v){if(_)return j(17,1,e,t,n,f,y,b,v)}var Jt=e=>{var t=a(e)+1,n=lr(t);return n&&c(e,n,t),n},Et=[],St={},Xt=()=>{if(!At){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:U||"./this.program"},t;for(t in St)St[t]===void 0?delete e[t]:e[t]=St[t];var n=[];for(t in e)n.push(`${t}=${e[t]}`);At=n}return At},At;function Qt(e,t){if(_)return j(18,1,e,t);e>>>=0,t>>>=0;var n=0;return Xt().forEach((f,y)=>{var b=t+n;for(y=O()[e+4*y>>>2>>>0]=b,b=0;b<f.length;++b)o()[y++>>>0>>>0]=f.charCodeAt(b);o()[y>>>0>>>0]=0,n+=f.length+1}),0}function Zt(e,t){if(_)return j(19,1,e,t);e>>>=0,t>>>=0;var n=Xt();O()[e>>>2>>>0]=n.length;var f=0;return n.forEach(y=>f+=y.length+1),O()[t>>>2>>>0]=f,0}function Kt(e){return _?j(20,1,e):52}function er(e,t,n,f){return _?j(21,1,e,t,n,f):52}function tr(e,t,n,f,y){return _?j(22,1,e,t,n,f,y):70}var Zr=[null,[],[]];function rr(e,t,n,f){if(_)return j(23,1,e,t,n,f);t>>>=0,n>>>=0,f>>>=0;for(var y=0,b=0;b<n;b++){var v=O()[t>>>2>>>0],I=O()[t+4>>>2>>>0];t+=8;for(var ve=0;ve<I;ve++){var ae=p()[v+ve>>>0],he=Zr[e];ae===0||ae===10?((e===1?ce:re)(tt(he,0)),he.length=0):he.push(ae)}y+=I}return O()[f>>>2>>>0]=y,0}var Kr=()=>{if(typeof crypto=="object"&&typeof crypto.getRandomValues=="function")return n=>(n.set(crypto.getRandomValues(new Uint8Array(n.byteLength))),n);if(P)try{var e=(Bt(),ze(Pt));if(e.randomFillSync)return n=>e.randomFillSync(n);var t=e.randomBytes;return n=>(n.set(t(n.byteLength)),n)}catch{}xe("initRandomDevice")},nr=e=>(nr=Kr())(e),ar=[31,29,31,30,31,30,31,31,30,31,30,31],or=[31,28,31,30,31,30,31,31,30,31,30,31];function en(e){var t=Array(a(e)+1);return s(e,t,0,t.length),t}var tn=(e,t)=>{o().set(e,t>>>0)};function sr(e,t,n,f){function y(g,k,K){for(g=typeof g=="number"?g.toString():g||"";g.length<k;)g=K[0]+g;return g}function b(g,k){return y(g,k,"0")}function v(g,k){function K(wr){return 0>wr?-1:0<wr?1:0}var je;return(je=K(g.getFullYear()-k.getFullYear()))===0&&(je=K(g.getMonth()-k.getMonth()))===0&&(je=K(g.getDate()-k.getDate())),je}function I(g){switch(g.getDay()){case 0:return new Date(g.getFullYear()-1,11,29);case 1:return g;case 2:return new Date(g.getFullYear(),0,3);case 3:return new Date(g.getFullYear(),0,2);case 4:return new Date(g.getFullYear(),0,1);case 5:return new Date(g.getFullYear()-1,11,31);case 6:return new Date(g.getFullYear()-1,11,30)}}function ve(g){var k=g.Va;for(g=new Date(new Date(g.Wa+1900,0,1).getTime());0<k;){var K=g.getMonth(),je=(Qe(g.getFullYear())?ar:or)[K];if(k>je-g.getDate())k-=je-g.getDate()+1,g.setDate(1),11>K?g.setMonth(K+1):(g.setMonth(0),g.setFullYear(g.getFullYear()+1));else{g.setDate(g.getDate()+k);break}}return K=new Date(g.getFullYear()+1,0,4),k=I(new Date(g.getFullYear(),0,4)),K=I(K),0>=v(k,g)?0>=v(K,g)?g.getFullYear()+1:g.getFullYear():g.getFullYear()-1}e>>>=0,t>>>=0,n>>>=0,f>>>=0;var ae=O()[f+40>>>2>>>0];f={sb:l()[f>>>2>>>0],rb:l()[f+4>>>2>>>0],Xa:l()[f+8>>>2>>>0],ab:l()[f+12>>>2>>>0],Ya:l()[f+16>>>2>>>0],Wa:l()[f+20>>>2>>>0],Ra:l()[f+24>>>2>>>0],Va:l()[f+28>>>2>>>0],yb:l()[f+32>>>2>>>0],qb:l()[f+36>>>2>>>0],tb:ae?Ge(ae):""},n=Ge(n),ae={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var he in ae)n=n.replace(new RegExp(he,"g"),ae[he]);var yr="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),br="January February March April May June July August September October November December".split(" ");ae={"%a":g=>yr[g.Ra].substring(0,3),"%A":g=>yr[g.Ra],"%b":g=>br[g.Ya].substring(0,3),"%B":g=>br[g.Ya],"%C":g=>b((g.Wa+1900)/100|0,2),"%d":g=>b(g.ab,2),"%e":g=>y(g.ab,2," "),"%g":g=>ve(g).toString().substring(2),"%G":g=>ve(g),"%H":g=>b(g.Xa,2),"%I":g=>(g=g.Xa,g==0?g=12:12<g&&(g-=12),b(g,2)),"%j":g=>{for(var k=0,K=0;K<=g.Ya-1;k+=(Qe(g.Wa+1900)?ar:or)[K++]);return b(g.ab+k,3)},"%m":g=>b(g.Ya+1,2),"%M":g=>b(g.rb,2),"%n":()=>`\n`,"%p":g=>0<=g.Xa&&12>g.Xa?"AM":"PM","%S":g=>b(g.sb,2),"%t":()=>"	","%u":g=>g.Ra||7,"%U":g=>b(Math.floor((g.Va+7-g.Ra)/7),2),"%V":g=>{var k=Math.floor((g.Va+7-(g.Ra+6)%7)/7);if(2>=(g.Ra+371-g.Va-2)%7&&k++,k)k==53&&(K=(g.Ra+371-g.Va)%7,K==4||K==3&&Qe(g.Wa)||(k=1));else{k=52;var K=(g.Ra+7-g.Va-1)%7;(K==4||K==5&&Qe(g.Wa%400-1))&&k++}return b(k,2)},"%w":g=>g.Ra,"%W":g=>b(Math.floor((g.Va+7-(g.Ra+6)%7)/7),2),"%y":g=>(g.Wa+1900).toString().substring(2),"%Y":g=>g.Wa+1900,"%z":g=>{g=g.qb;var k=0<=g;return g=Math.abs(g)/60,(k?"+":"-")+("0000"+(g/60*100+g%60)).slice(-4)},"%Z":g=>g.tb,"%%":()=>"%"},n=n.replace(/%%/g,"\\0\\0");for(he in ae)n.includes(he)&&(n=n.replace(new RegExp(he,"g"),ae[he](f)));return n=n.replace(/\\0\\0/g,"%"),he=en(n),he.length>t?0:(tn(he,e),he.length-1)}var Ze,ir=[],ur=(e,t)=>{if(!Ze){Ze=new WeakMap;var n=ge.length;if(Ze)for(var f=0;f<0+n;f++){var y=nt(f);y&&Ze.set(y,f)}}if(n=Ze.get(e)||0)return n;if(ir.length)n=ir.pop();else{try{ge.grow(1)}catch(I){throw I instanceof RangeError?"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.":I}n=ge.length-1}try{f=n,ge.set(f,e),Be[f]=ge.get(f)}catch(I){if(!(I instanceof TypeError))throw I;if(typeof WebAssembly.Function=="function"){f=WebAssembly.Function,y={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"};for(var b={parameters:[],results:t[0]=="v"?[]:[y[t[0]]]},v=1;v<t.length;++v)b.parameters.push(y[t[v]]);t=new f(b,e)}else{for(f=[1],y=t.slice(0,1),t=t.slice(1),b={i:127,p:127,j:126,f:125,d:124,e:111},f.push(96),v=t.length,128>v?f.push(v):f.push(v%128|128,v>>7),v=0;v<t.length;++v)f.push(b[t[v]]);y=="v"?f.push(0):f.push(1,b[y]),t=[0,97,115,109,1,0,0,0,1],y=f.length,128>y?t.push(y):t.push(y%128|128,y>>7),t.push.apply(t,f),t.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),t=new WebAssembly.Module(new Uint8Array(t)),t=new WebAssembly.Instance(t,{e:{f:e}}).exports.f}f=n,ge.set(f,t),Be[f]=ge.get(f)}return Ze.set(e,n),n};C.$a();var rn=[rt,x,ht,ot,r,w,E,T,H,ie,ue,fe,st,it,m,W,Vt,qt,Qt,Zt,Kt,er,tr,rr],nn={b:function(e,t,n){throw e>>>=0,new mt(e).$a(t>>>0,n>>>0),at=e,gt++,at},O:function(e){cr(e>>>0,!B,1,!te,131072,!1),C.fb()},m:function(e){e>>>=0,_?postMessage({cmd:"cleanupThread",thread:e}):C.cb(C.Qa[e])},J:$e,h:ot,U:r,F:w,H:E,y:T,S:H,L:ie,R:ue,o:fe,G:st,D:it,T:m,E:W,p:()=>1,B:function(e,t){e>>>=0,e==t>>>0?setTimeout(()=>Oe()):_?postMessage({targetThread:e,cmd:"checkMailbox"}):(e=C.Qa[e])&&e.postMessage({cmd:"checkMailbox"})},K:function(e,t,n,f){t>>>=0,Xe.length=n,f=f>>>0>>>3;for(var y=0;y<n;y++)Xe[y]=h()[f+y>>>0];return e=0>e?Ye[-e-1]:rn[e],C.mb=t,t=e.apply(null,Xe),C.mb=0,t},M:z,W:function(e){P&&C.Qa[e>>>0].ref()},s:function(e,t,n){e=t+2097152>>>0<4194305-!!e?(e>>>0)+4294967296*t:NaN,n>>>=0,e=new Date(1e3*e),l()[n>>>2>>>0]=e.getUTCSeconds(),l()[n+4>>>2>>>0]=e.getUTCMinutes(),l()[n+8>>>2>>>0]=e.getUTCHours(),l()[n+12>>>2>>>0]=e.getUTCDate(),l()[n+16>>>2>>>0]=e.getUTCMonth(),l()[n+20>>>2>>>0]=e.getUTCFullYear()-1900,l()[n+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,l()[n+28>>>2>>>0]=e},t:function(e,t,n){e=t+2097152>>>0<4194305-!!e?(e>>>0)+4294967296*t:NaN,n>>>=0,e=new Date(1e3*e),l()[n>>>2>>>0]=e.getSeconds(),l()[n+4>>>2>>>0]=e.getMinutes(),l()[n+8>>>2>>>0]=e.getHours(),l()[n+12>>>2>>>0]=e.getDate(),l()[n+16>>>2>>>0]=e.getMonth(),l()[n+20>>>2>>>0]=e.getFullYear()-1900,l()[n+24>>>2>>>0]=e.getDay(),t=(Qe(e.getFullYear())?zt:Yt)[e.getMonth()]+e.getDate()-1|0,l()[n+28>>>2>>>0]=t,l()[n+36>>>2>>>0]=-(60*e.getTimezoneOffset()),t=new Date(e.getFullYear(),6,1).getTimezoneOffset();var f=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=(t!=f&&e.getTimezoneOffset()==Math.min(f,t))|0,l()[n+32>>>2>>>0]=e},u:function(e){e>>>=0;var t=new Date(l()[e+20>>>2>>>0]+1900,l()[e+16>>>2>>>0],l()[e+12>>>2>>>0],l()[e+8>>>2>>>0],l()[e+4>>>2>>>0],l()[e>>>2>>>0],0),n=l()[e+32>>>2>>>0],f=t.getTimezoneOffset(),y=new Date(t.getFullYear(),6,1).getTimezoneOffset(),b=new Date(t.getFullYear(),0,1).getTimezoneOffset(),v=Math.min(b,y);return 0>n?l()[e+32>>>2>>>0]=+(y!=b&&v==f):0<n!=(v==f)&&(y=Math.max(b,y),t.setTime(t.getTime()+6e4*((0<n?v:y)-f))),l()[e+24>>>2>>>0]=t.getDay(),n=(Qe(t.getFullYear())?zt:Yt)[t.getMonth()]+t.getDate()-1|0,l()[e+28>>>2>>>0]=n,l()[e>>>2>>>0]=t.getSeconds(),l()[e+4>>>2>>>0]=t.getMinutes(),l()[e+8>>>2>>>0]=t.getHours(),l()[e+12>>>2>>>0]=t.getDate(),l()[e+16>>>2>>>0]=t.getMonth(),l()[e+20>>>2>>>0]=t.getYear(),e=t.getTime(),isNaN(e)?(l()[fr()>>>2>>>0]=61,e=-1):e/=1e3,mr((Le=e,1<=+Math.abs(Le)?0<Le?+Math.floor(Le/4294967296)>>>0:~~+Math.ceil((Le-+(~~Le>>>0))/4294967296)>>>0:0)),e>>>0},q:Vt,r:qt,A:function(e,t,n){function f(ae){return(ae=ae.toTimeString().match(/\\(([A-Za-z ]+)\\)$/))?ae[1]:"GMT"}e>>>=0,t>>>=0,n>>>=0;var y=new Date().getFullYear(),b=new Date(y,0,1),v=new Date(y,6,1);y=b.getTimezoneOffset();var I=v.getTimezoneOffset(),ve=Math.max(y,I);O()[e>>>2>>>0]=60*ve,l()[t>>>2>>>0]=+(y!=I),e=f(b),t=f(v),e=Jt(e),t=Jt(t),I<y?(O()[n>>>2>>>0]=e,O()[n+4>>>2>>>0]=t):(O()[n>>>2>>>0]=t,O()[n+4>>>2>>>0]=e)},c:()=>{xe("")},N:function(e,t,n){e>>>=0,t>>>=0,n>>>=0,Et.length=0;for(var f;f=p()[t++>>>0];){var y=f!=105;y&=f!=112,n+=y&&n%8?4:0,Et.push(f==112?O()[n>>>2>>>0]:f==105?l()[n>>>2>>>0]:h()[n>>>3>>>0]),n+=y?8:4}return Ye[e].apply(null,Et)},n:()=>{},i:()=>Date.now(),V:()=>{throw ke+=1,"unwind"},C:function(){return 4294901760},e:()=>performance.timeOrigin+performance.now(),f:()=>P?(Mr(),ze(Tr)).cpus().length:navigator.hardwareConcurrency,z:function(e){e>>>=0;var t=p().length;if(e<=t||4294901760<e)return!1;for(var n=1;4>=n;n*=2){var f=t*(1+.2/n);f=Math.min(f,e+100663296);var y=Math;f=Math.max(e,f);e:{y=(y.min.call(y,4294901760,f+(65536-f%65536)%65536)-Z.buffer.byteLength+65535)/65536;try{Z.grow(y),V();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1},P:Qt,Q:Zt,I:Fe,g:Kt,l:er,v:tr,k:rr,w:function(e,t){return e>>>=0,t>>>=0,nr(p().subarray(e>>>0,e+t>>>0)),0},a:Z||u.wasmMemory,x:sr,d:function(e,t,n,f){return sr(e>>>0,t>>>0,n>>>0,f>>>0)},j:function(e,t,n,f){let y=ge.length;e=new Uint8Array(p().slice(e+t,e+n));try{var b=new WebAssembly.Module(e),v=new WebAssembly.Instance(b,{env:{memory:Z}}),I;for(I in v.exports)ur(v.exports[I]);return y<ge.length?y:f}catch(ve){return console.log(ve),f}}},M=function(){function e(n,f){return M=n.exports,M=an(),C.gb.push(M.Da),ge=M.Ea,Me.unshift(M.X),Ae=f,Ce(),M}var t={a:nn};if(Se++,u.instantiateWasm)try{return u.instantiateWasm(t,e)}catch(n){re(`Module.instantiateWasm callback failed with error: ${n}`),D(n)}return lt(t,function(n){e(n.instance,n.module)}).catch(D),{}}();u._OrtInit=(e,t)=>(u._OrtInit=M.Y)(e,t),u._OrtGetLastError=(e,t)=>(u._OrtGetLastError=M.Z)(e,t),u._OrtCreateSessionOptions=(e,t,n,f,y,b,v,I,ve,ae)=>(u._OrtCreateSessionOptions=M._)(e,t,n,f,y,b,v,I,ve,ae),u._OrtAppendExecutionProvider=(e,t)=>(u._OrtAppendExecutionProvider=M.$)(e,t),u._OrtAddFreeDimensionOverride=(e,t,n)=>(u._OrtAddFreeDimensionOverride=M.aa)(e,t,n),u._OrtAddSessionConfigEntry=(e,t,n)=>(u._OrtAddSessionConfigEntry=M.ba)(e,t,n),u._OrtReleaseSessionOptions=e=>(u._OrtReleaseSessionOptions=M.ca)(e),u._OrtCreateSession=(e,t,n)=>(u._OrtCreateSession=M.da)(e,t,n),u._OrtReleaseSession=e=>(u._OrtReleaseSession=M.ea)(e),u._OrtGetInputOutputCount=(e,t,n)=>(u._OrtGetInputOutputCount=M.fa)(e,t,n),u._OrtGetInputName=(e,t)=>(u._OrtGetInputName=M.ga)(e,t),u._OrtGetOutputName=(e,t)=>(u._OrtGetOutputName=M.ha)(e,t),u._OrtFree=e=>(u._OrtFree=M.ia)(e),u._OrtCreateTensor=(e,t,n,f,y,b)=>(u._OrtCreateTensor=M.ja)(e,t,n,f,y,b),u._OrtGetTensorData=(e,t,n,f,y)=>(u._OrtGetTensorData=M.ka)(e,t,n,f,y),u._OrtReleaseTensor=e=>(u._OrtReleaseTensor=M.la)(e),u._OrtCreateRunOptions=(e,t,n,f)=>(u._OrtCreateRunOptions=M.ma)(e,t,n,f),u._OrtAddRunConfigEntry=(e,t,n)=>(u._OrtAddRunConfigEntry=M.na)(e,t,n),u._OrtReleaseRunOptions=e=>(u._OrtReleaseRunOptions=M.oa)(e),u._OrtCreateBinding=e=>(u._OrtCreateBinding=M.pa)(e),u._OrtBindInput=(e,t,n)=>(u._OrtBindInput=M.qa)(e,t,n),u._OrtBindOutput=(e,t,n,f)=>(u._OrtBindOutput=M.ra)(e,t,n,f),u._OrtClearBoundOutputs=e=>(u._OrtClearBoundOutputs=M.sa)(e),u._OrtReleaseBinding=e=>(u._OrtReleaseBinding=M.ta)(e),u._OrtRunWithBinding=(e,t,n,f,y)=>(u._OrtRunWithBinding=M.ua)(e,t,n,f,y),u._OrtRun=(e,t,n,f,y,b,v,I)=>(u._OrtRun=M.va)(e,t,n,f,y,b,v,I),u._OrtEndProfiling=e=>(u._OrtEndProfiling=M.wa)(e),u._OrtConfigure=(e,t)=>(u._OrtConfigure=M.xa)(e,t),u._OrtAuth=(e,t)=>(u._OrtAuth=M.ya)(e,t);var fr=()=>(fr=M.za)(),yt=u._pthread_self=()=>(yt=u._pthread_self=M.Aa)(),lr=u._malloc=e=>(lr=u._malloc=M.Ba)(e);u._free=e=>(u._free=M.Ca)(e),u.__emscripten_tls_init=()=>(u.__emscripten_tls_init=M.Da)();var cr=u.__emscripten_thread_init=(e,t,n,f,y,b)=>(cr=u.__emscripten_thread_init=M.Fa)(e,t,n,f,y,b);u.__emscripten_thread_crashed=()=>(u.__emscripten_thread_crashed=M.Ga)();var dr=(e,t,n,f)=>(dr=M.Ha)(e,t,n,f),Tt=e=>(Tt=M.Ia)(e),Mt=u.__emscripten_thread_exit=e=>(Mt=u.__emscripten_thread_exit=M.Ja)(e),pr=()=>(pr=M.Ka)(),mr=e=>(mr=M.La)(e),gr=(e,t)=>(gr=M.Ma)(e,t),Ct=()=>(Ct=M.Na)(),bt=e=>(bt=M.Oa)(e),xt=e=>(xt=M.Pa)(e);u.___start_em_js=887097,u.___stop_em_js=887709;function an(){var e=M;e=Object.assign({},e);var t=f=>()=>f()>>>0,n=f=>y=>f(y)>>>0;return e.za=t(e.za),e.Aa=t(e.Aa),e.Ba=n(e.Ba),e.emscripten_main_runtime_thread_id=t(e.emscripten_main_runtime_thread_id),e.Na=t(e.Na),e.Pa=n(e.Pa),e}u.wasmMemory=Z,u.stackAlloc=xt,u.stackSave=Ct,u.stackRestore=bt,u.keepRuntimeAlive=()=>0<ke,u.addFunction=ur,u.UTF8ToString=Ge,u.stringToUTF8=c,u.lengthBytesUTF8=a,u.ExitStatus=We,u.PThread=C;var wt;me=function e(){wt||hr(),wt||(me=e)};function hr(){if(!(0<Se))if(_)A(u),_||Je(Me),startWorker(u);else{if(u.preRun)for(typeof u.preRun=="function"&&(u.preRun=[u.preRun]);u.preRun.length;)Ne.unshift(u.preRun.shift());Je(Ne),0<Se||wt||(wt=!0,u.calledRun=!0,_e||(_||Je(Me),A(u),_||Je(Ee)))}}return hr(),d.ready}})();typeof xr=="object"&&typeof Wt=="object"?Wt.exports=Cr:typeof define=="function"&&define.amd&&define([],()=>Cr)});var Fr=ut((Un,gn)=>{gn.exports=\'"use strict";var Module={},ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",e=>onmessage({data:e}));var fs=require("fs"),vm=require("vm");Object.assign(global,{self:global,require,Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:e=>vm.runInThisContext(fs.readFileSync(e,"utf8"),{filename:e}),postMessage:e=>parentPort.postMessage(e),performance:global.performance||{now:Date.now}})}var initializedJS=!1;function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,e+`\\n`);return}console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,t)=>{var a=Module.wasmModule;Module.wasmModule=null;var r=new WebAssembly.Instance(a,e);return t(r)},self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let a=[];self.onmessage=r=>a.push(r),self.startWorker=r=>{Module=r,postMessage({cmd:"loaded"});for(let s of a)handleMessage(s);self.onmessage=handleMessage},Module.wasmModule=e.data.wasmModule;for(const r of e.data.handlers)Module[r]=(...s)=>{postMessage({cmd:"callHandler",handler:r,args:s})};if(Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,typeof e.data.urlOrBlob=="string")importScripts(e.data.urlOrBlob);else{var t=URL.createObjectURL(e.data.urlOrBlob);importScripts(t),URL.revokeObjectURL(t)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.__emscripten_thread_mailbox_await(e.data.pthread_ptr),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(a){if(a!="unwind")throw a}}else e.data.cmd==="cancel"?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):e.data.target==="setimmediate"||(e.data.cmd==="checkMailbox"?initializedJS&&Module.checkMailbox():e.data.cmd&&(err(`worker.js received unknown command ${e.data.cmd}`),err(e.data)))}catch(a){throw Module.__emscripten_thread_crashed?.(),a}}self.onmessage=handleMessage;\\n\'});var Rr;Rr=Er();var hn=Dr(),Nt,Ht=!1,_t=!1,Ur=!1,yn=i=>{if(i===1)return!1;if(typeof SharedArrayBuffer>"u")return typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),!1;typeof process<"u"&&process.versions&&process.versions.node&&console.warn("env.wasm.numThreads is set to "+i+", however, currently onnxruntime-web does not support multi-threads in Node.js. Please consider using onnxruntime-node for performance critical scenarios.");try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},bn=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},wn=(i,d)=>i?d?"ort-wasm-simd-threaded.wasm":"ort-wasm-simd.wasm":d?"ort-wasm-threaded.wasm":"ort-wasm.wasm",Lr=async i=>{if(Ht)return Promise.resolve();if(_t)throw new Error("multiple calls to \'initializeWebAssembly()\' detected.");if(Ur)throw new Error("previous call to \'initializeWebAssembly()\' failed.");_t=!0;let d=i.initTimeout,o=i.numThreads,p=i.simd,l=yn(o),O=p&&bn(),h=i.wasmPaths,u=typeof h=="string"?h:void 0,A=wn(O,l),D=typeof h=="object"?h[A]:void 0,R=!1,U=[];if(d>0&&U.push(new Promise(L=>{setTimeout(()=>{R=!0,L()},d)})),U.push(new Promise((L,te)=>{let B=l?hn:Rr,P={locateFile:(_,N)=>l&&_.endsWith(".worker.js")&&typeof Blob<"u"?URL.createObjectURL(new Blob([Fr()],{type:"text/javascript"})):_.endsWith(".wasm")?D||(u??N)+A:N+_};if(l)if(P.numThreads=o,typeof Blob>"u")P.mainScriptUrlOrBlob=(void 0)(__dirname,"ort-wasm-threaded.js");else{let _=`var ortWasmThreaded=${B.toString()};`;P.mainScriptUrlOrBlob=new Blob([_],{type:"text/javascript"})}B(P).then(_=>{_t=!1,Ht=!0,Nt=_,L()},_=>{_t=!1,Ur=!0,te(_)})})),await Promise.race(U),R)throw new Error(`WebAssembly backend initializing failed due to timeout: ${d}ms`)},J=()=>{if(Ht&&Nt)return Nt;throw new Error("WebAssembly is not initialized yet.")};var X=(i,d)=>{let o=J(),p=o.lengthBytesUTF8(i)+1,l=o._malloc(p);return o.stringToUTF8(i,l,p),d.push(l),l},ft=(i,d,o,p)=>{if(typeof i=="object"&&i!==null){if(o.has(i))throw new Error("Circular reference in options");o.add(i)}Object.entries(i).forEach(([l,O])=>{let h=d?d+l:l;if(typeof O=="object")ft(O,h+".",o,p);else if(typeof O=="string"||typeof O=="number")p(h,O.toString());else if(typeof O=="boolean")p(h,O?"1":"0");else throw new Error(`Can\'t handle extra config type: ${typeof O}`)})},Q=i=>{let d=J(),o=d.stackSave();try{let p=d.stackAlloc(8);d._OrtGetLastError(p,p+4);let l=d.HEAP32[p/4],O=d.HEAPU32[p/4+1],h=O?d.UTF8ToString(O):"";throw new Error(`${i} ERROR_CODE: ${l}, ERROR_MESSAGE: ${h}`)}finally{d.stackRestore(o)}};var Pr=i=>{let d=J(),o=0,p=[],l=i||{};try{if(i?.logSeverityLevel===void 0)l.logSeverityLevel=2;else if(typeof i.logSeverityLevel!="number"||!Number.isInteger(i.logSeverityLevel)||i.logSeverityLevel<0||i.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${i.logSeverityLevel}`);if(i?.logVerbosityLevel===void 0)l.logVerbosityLevel=0;else if(typeof i.logVerbosityLevel!="number"||!Number.isInteger(i.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${i.logVerbosityLevel}`);i?.terminate===void 0&&(l.terminate=!1);let O=0;return i?.tag!==void 0&&(O=X(i.tag,p)),o=d._OrtCreateRunOptions(l.logSeverityLevel,l.logVerbosityLevel,!!l.terminate,O),o===0&&Q("Can\'t create run options."),i?.extra!==void 0&&ft(i.extra,"",new WeakSet,(h,u)=>{let A=X(h,p),D=X(u,p);d._OrtAddRunConfigEntry(o,A,D)!==0&&Q(`Can\'t set a run config entry: ${h} - ${u}.`)}),[o,p]}catch(O){throw o!==0&&d._OrtReleaseRunOptions(o),p.forEach(h=>d._free(h)),O}};var On=i=>{switch(i){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${i}`)}},vn=i=>{switch(i){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${i}`)}},_n=i=>{i.extra||(i.extra={}),i.extra.session||(i.extra.session={});let d=i.extra.session;d.use_ort_model_bytes_directly||(d.use_ort_model_bytes_directly="1"),i.executionProviders&&i.executionProviders.some(o=>(typeof o=="string"?o:o.name)==="webgpu")&&(i.enableMemPattern=!1)},En=(i,d,o)=>{for(let p of d){let l=typeof p=="string"?p:p.name;switch(l){case"webnn":if(l="WEBNN",typeof p!="string"){let h=p;if(h?.deviceType){let u=X("deviceType",o),A=X(h.deviceType,o);J()._OrtAddSessionConfigEntry(i,u,A)!==0&&Q(`Can\'t set a session config entry: \'deviceType\' - ${h.deviceType}.`)}if(h?.numThreads){let u=h.numThreads;(typeof u!="number"||!Number.isInteger(u)||u<0)&&(u=0);let A=X("numThreads",o),D=X(u.toString(),o);J()._OrtAddSessionConfigEntry(i,A,D)!==0&&Q(`Can\'t set a session config entry: \'numThreads\' - ${h.numThreads}.`)}if(h?.powerPreference){let u=X("powerPreference",o),A=X(h.powerPreference,o);J()._OrtAddSessionConfigEntry(i,u,A)!==0&&Q(`Can\'t set a session config entry: \'powerPreference\' - ${h.powerPreference}.`)}}break;case"webgpu":if(l="JS",typeof p!="string"){let h=p;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either \'NCHW\' or \'NHWC\': ${h.preferredLayout}`);let u=X("preferredLayout",o),A=X(h.preferredLayout,o);J()._OrtAddSessionConfigEntry(i,u,A)!==0&&Q(`Can\'t set a session config entry: \'preferredLayout\' - ${h.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${l}`)}let O=X(l,o);J()._OrtAppendExecutionProvider(i,O)!==0&&Q(`Can\'t append execution provider: ${l}.`)}},Br=i=>{let d=J(),o=0,p=[],l=i||{};_n(l);try{let O=On(l.graphOptimizationLevel??"all"),h=vn(l.executionMode??"sequential"),u=typeof l.logId=="string"?X(l.logId,p):0,A=l.logSeverityLevel??2;if(!Number.isInteger(A)||A<0||A>4)throw new Error(`log serverity level is not valid: ${A}`);let D=l.logVerbosityLevel??0;if(!Number.isInteger(D)||D<0||D>4)throw new Error(`log verbosity level is not valid: ${D}`);let R=typeof l.optimizedModelFilePath=="string"?X(l.optimizedModelFilePath,p):0;if(o=d._OrtCreateSessionOptions(O,!!l.enableCpuMemArena,!!l.enableMemPattern,h,!!l.enableProfiling,0,u,A,D,R),o===0&&Q("Can\'t create session options."),l.executionProviders&&En(o,l.executionProviders,p),l.enableGraphCapture!==void 0){if(typeof l.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${l.enableGraphCapture}`);let U=X("enableGraphCapture",p),L=X(l.enableGraphCapture.toString(),p);d._OrtAddSessionConfigEntry(o,U,L)!==0&&Q(`Can\'t set a session config entry: \'enableGraphCapture\' - ${l.enableGraphCapture}.`)}if(l.freeDimensionOverrides)for(let[U,L]of Object.entries(l.freeDimensionOverrides)){if(typeof U!="string")throw new Error(`free dimension override name must be a string: ${U}`);if(typeof L!="number"||!Number.isInteger(L)||L<0)throw new Error(`free dimension override value must be a non-negative integer: ${L}`);let te=X(U,p);d._OrtAddFreeDimensionOverride(o,te,L)!==0&&Q(`Can\'t set a free dimension override: ${U} - ${L}.`)}return l.extra!==void 0&&ft(l.extra,"",new WeakSet,(U,L)=>{let te=X(U,p),B=X(L,p);d._OrtAddSessionConfigEntry(o,te,B)!==0&&Q(`Can\'t set a session config entry: ${U} - ${L}.`)}),[o,p]}catch(O){throw o!==0&&d._OrtReleaseSessionOptions(o),p.forEach(h=>d._free(h)),O}};var kt=i=>{switch(i){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${i}`)}},Ir=i=>{switch(i){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${i}`)}},Gt=i=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][i],Wr=i=>{switch(i){case"float16":return Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${i}`)}},Nr=i=>{switch(i){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${i}`)}},Hr=i=>i==="float32"||i==="int32"||i==="int64"||i==="bool"||i==="float16"||i==="uint32",kr=i=>{switch(i){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${i}`)}};var Gr=async i=>{if(typeof i=="string")if(typeof process<"u"&&process.versions&&process.versions.node)try{return new Uint8Array(await(void 0)(i))}catch(d){if(d.code==="ERR_FS_FILE_TOO_LARGE"){let o=(void 0)(i),p=[];for await(let l of o)p.push(l);return new Uint8Array(Buffer.concat(p))}throw d}else{let d=await fetch(i);if(!d.ok)throw new Error(`failed to load external data file: ${i}`);let o=d.headers.get("Content-Length"),p=o?parseInt(o,10):0;if(p<1073741824)return new Uint8Array(await d.arrayBuffer());{if(!d.body)throw new Error(`failed to load external data file: ${i}, no response body.`);let l=d.body.getReader(),O;try{O=new ArrayBuffer(p)}catch(u){if(u instanceof RangeError){let A=Math.ceil(p/65536);O=new WebAssembly.Memory({initial:A,maximum:A}).buffer}else throw u}let h=0;for(;;){let{done:u,value:A}=await l.read();if(u)break;let D=A.byteLength;new Uint8Array(O,h,D).set(A),h+=D}return new Uint8Array(O,0,p)}}else return i instanceof Blob?new Uint8Array(await i.arrayBuffer()):i instanceof Uint8Array?i:new Uint8Array(i)};var Sn=(i,d)=>{J()._OrtInit(i,d)!==0&&Q("Can\'t initialize onnxruntime.")},jr=async i=>{Sn(i.wasm.numThreads,Nr(i.logLevel))},zr=async(i,d)=>{},Ke=new Map,An=i=>{let d=J(),o=d.stackSave();try{let p=d.stackAlloc(8);return d._OrtGetInputOutputCount(i,p,p+4)!==0&&Q("Can\'t get session input/output count."),[d.HEAP32[p/4],d.HEAP32[p/4+1]]}finally{d.stackRestore(o)}},$t=i=>{let d=J(),o=d._malloc(i.byteLength);if(o===0)throw new Error(`Can\'t create a session. failed to allocate a buffer of size ${i.byteLength}.`);return d.HEAPU8.set(i,o),[o,i.byteLength]},Yr=async(i,d)=>{let o,p,l=J();Array.isArray(i)?[o,p]=i:i.buffer===l.HEAPU8.buffer?[o,p]=[i.byteOffset,i.byteLength]:[o,p]=$t(i);let O=0,h=0,u=0,A=[],D=[],R=[];try{if([h,A]=Br(d),d?.externalData&&l.mountExternalData){let G=[];for(let $ of d.externalData){let oe=typeof $=="string"?$:$.path;G.push(Gr(typeof $=="string"?$:$.data).then(ee=>{l.mountExternalData(oe,ee)}))}await Promise.all(G)}O=l._OrtCreateSession(o,p,h),O===0&&Q("Can\'t create a session.");let[U,L]=An(O),te=!!d?.enableGraphCapture,B=[],P=[],_=[];for(let G=0;G<U;G++){let $=l._OrtGetInputName(O,G);$===0&&Q("Can\'t get an input name."),D.push($),B.push(l.UTF8ToString($))}for(let G=0;G<L;G++){let $=l._OrtGetOutputName(O,G);$===0&&Q("Can\'t get an output name."),R.push($);let oe=l.UTF8ToString($);P.push(oe)}let N=null;return Ke.set(O,[O,D,R,N,te,!1]),[O,B,P]}catch(U){throw D.forEach(L=>l._OrtFree(L)),R.forEach(L=>l._OrtFree(L)),u!==0&&l._OrtReleaseBinding(u),O!==0&&l._OrtReleaseSession(O),U}finally{l._free(o),h!==0&&l._OrtReleaseSessionOptions(h),A.forEach(U=>l._free(U)),l.unmountExternalData?.()}},Vr=i=>{let d=J(),o=Ke.get(i);if(!o)throw new Error(`cannot release session. invalid session id: ${i}`);let[p,l,O,h,u]=o;h&&(u&&d._OrtClearBoundOutputs(h.handle),d._OrtReleaseBinding(h.handle)),d.jsepOnReleaseSession?.(i),l.forEach(A=>d._OrtFree(A)),O.forEach(A=>d._OrtFree(A)),d._OrtReleaseSession(p),Ke.delete(i)},Tn=(i,d,o)=>{if(i!==null&&i[0]===d){let l=i[2];if(l.length===o)return l}let p=Wr(d);return new p(o)},$r=(i,d,o,p,l,O=!1)=>{if(!i){d.push(0);return}let h=J(),u=i[0],A=i[1],D=i[3],R,U;if(u==="string"&&D==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(O&&D!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${l} when enableGraphCapture is true.`);if(D==="gpu-buffer"){let B=i[2].gpuBuffer,P=Gt(kt(u));U=A.reduce((_,N)=>_*N,1)*P,R=h.jsepRegisterBuffer(p,l,B,U)}else{let B=i[2];if(Array.isArray(B)){U=4*B.length,R=h._malloc(U),o.push(R);let P=R/4;for(let _=0;_<B.length;_++){if(typeof B[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);h.HEAPU32[P++]=X(B[_],o)}}else U=B.byteLength,R=h._malloc(U),o.push(R),h.HEAPU8.set(new Uint8Array(B.buffer,B.byteOffset,U),R)}let L=h.stackSave(),te=h.stackAlloc(4*A.length);try{let B=te/4;A.forEach(_=>h.HEAP32[B++]=_);let P=h._OrtCreateTensor(kt(u),R,U,te,A.length,kr(D));P===0&&Q(`Can\'t create tensor for input/output. session=${p}, index=${l}.`),d.push(P)}finally{h.stackRestore(L)}},qr=i=>{let o=new TextEncoder().encode(i),p=J(),l=p._malloc(o.byteLength);p.HEAPU8.set(o,l);let O=p._OrtConfigure(l,o.byteLength);if(O===0)throw new Error("Can\'t get an configure key");let h=p.UTF8ToString(O);return p._OrtFree(O),h},Jr=i=>{let o=new TextEncoder().encode(i),p=J(),l=p._malloc(o.byteLength);p.HEAPU8.set(o,l);let O=p._OrtAuth(l,o.byteLength);if(O===0)throw new Error("Can\'t get an auth result");let h=p.UTF8ToString(O);return p._OrtFree(O),h},Xr=async(i,d,o,p,l,O)=>{let h=J(),u=Ke.get(i);if(!u)throw new Error(`cannot run inference. invalid session id: ${i}`);let A=u[0],D=u[1],R=u[2],U=u[3],L=u[4],te=u[5],B=d.length,P=p.length,_=0,N=[],G=[],$=[],oe=[],ee=h.stackSave(),S=h.stackAlloc(B*4),Y=h.stackAlloc(B*4),Ue=h.stackAlloc(P*4),Ie=h.stackAlloc(P*4);try{[_,N]=Pr(O);for(let F=0;F<B;F++)$r(o[F],G,oe,i,d[F],L);for(let F=0;F<P;F++){let de=l[F],we=de?.[3]??"";$r(we==="gpu-buffer"?de:null,$,oe,i,B+p[F],L)}let ce=S/4,re=Y/4,Z=Ue/4,Ae=Ie/4;for(let F=0;F<B;F++)h.HEAPU32[ce++]=G[F],h.HEAPU32[re++]=D[d[F]];for(let F=0;F<P;F++)h.HEAPU32[Z++]=$[F],h.HEAPU32[Ae++]=R[p[F]];let _e;h.jsepOnRunStart?.(A),_e=await h._OrtRun(A,Y,S,B,Ie,P,Ue,_),_e!==0&&Q("failed to call OrtRun().");let ne=[];for(let F=0;F<P;F++){let de=h.HEAPU32[Ue/4+F];if(de===$[F]){ne.push(l[F]);continue}let we=h.stackSave(),le=h.stackAlloc(4*4),Te=!1,V,pe=0;try{h._OrtGetTensorData(de,le,le+4,le+8,le+12)!==0&&Q(`Can\'t access output tensor data on index ${F}.`);let Me=le/4,Ee=h.HEAPU32[Me++];pe=h.HEAPU32[Me++];let Se=h.HEAPU32[Me++],He=h.HEAPU32[Me++],me=[];for(let q=0;q<He;q++)me.push(h.HEAPU32[Se/4+q]);h._OrtFree(Se);let Ce=me.reduce((q,se)=>q*se,1);V=Ir(Ee);let xe=U?.outputPreferredLocations[p[F]];if(V==="string"){if(xe==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let q=[],se=pe/4;for(let ye=0;ye<Ce;ye++){let Re=h.HEAPU32[se++],De=ye===Ce-1?void 0:h.HEAPU32[se]-Re;q.push(h.UTF8ToString(Re,De))}ne.push([V,me,q,"cpu"])}else if(xe==="gpu-buffer"&&Ce>0){let q=h.jsepGetBuffer(pe),se=Gt(Ee);if(se===void 0||!Hr(V))throw new Error(`Unsupported data type: ${V}`);Te=!0,ne.push([V,me,{gpuBuffer:q,download:h.jsepCreateDownloader(q,Ce*se,V),dispose:()=>{h._OrtReleaseTensor(de)}},"gpu-buffer"])}else{let q=Tn(l[F],V,Ce);new Uint8Array(q.buffer,q.byteOffset,q.byteLength).set(h.HEAPU8.subarray(pe,pe+q.byteLength)),ne.push([V,me,q,"cpu"])}}finally{h.stackRestore(we),V==="string"&&pe&&h._free(pe),Te||h._OrtReleaseTensor(de)}}return U&&!L&&(h._OrtClearBoundOutputs(U.handle),Ke.set(i,[A,D,R,U,L,!1])),ne}finally{h.stackRestore(ee),G.forEach(ce=>h._OrtReleaseTensor(ce)),$.forEach(ce=>h._OrtReleaseTensor(ce)),oe.forEach(ce=>h._free(ce)),_!==0&&h._OrtReleaseRunOptions(_),N.forEach(ce=>h._free(ce))}},Qr=i=>{let d=J(),o=Ke.get(i);if(!o)throw new Error("invalid session id");let p=o[0],l=d._OrtEndProfiling(p);l===0&&Q("Can\'t get an profile file name."),d._OrtFree(l)},jt=i=>{let d=[];for(let o of i){let p=o[2];!Array.isArray(p)&&"buffer"in p&&d.push(p.buffer)}return d};self.onmessage=i=>{let{type:d,in:o}=i.data;try{switch(d){case"init-wasm":Lr(o.wasm).then(()=>{jr(o).then(()=>{postMessage({type:d})},p=>{postMessage({type:d,err:p})})},p=>{postMessage({type:d,err:p})});break;case"init-ep":{let{epName:p,env:l}=o;zr(l,p).then(()=>{postMessage({type:d})},O=>{postMessage({type:d,err:O})});break}case"copy-from":{let{buffer:p}=o,l=$t(p);postMessage({type:d,out:l});break}case"create":{let{model:p,options:l}=o;Yr(p,l).then(O=>{postMessage({type:d,out:O})},O=>{postMessage({type:d,err:O})});break}case"release":Vr(o),postMessage({type:d});break;case"run":{let{sessionId:p,inputIndices:l,inputs:O,outputIndices:h,options:u}=o,A=i.data.prealloc??[];for(;A.length<h.length;)A.push(null);Xr(p,l,O,h,A,u).then(D=>{D.some(R=>R[3]!=="cpu")?postMessage({type:d,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:d,out:D,inputsBack:O},jt(D).concat(jt(O)))},D=>{postMessage({type:d,err:D})});break}case"configure":try{let p=qr(i.data.in);postMessage({type:"configure",out:p})}catch(p){postMessage({type:"configure",err:p})}break;case"auth":try{let p=Jr(i.data.in);postMessage({type:"auth",out:p})}catch(p){postMessage({type:"auth",err:p})}break;case"end-profiling":Qr(o),postMessage({type:d});break;default:}}catch(p){postMessage({type:d,err:p})}};})();\n'});var Kt,it,Sn,Mo,Go,va,Uo,or,ir,Cg,Ro,Fg,pd,dd,hd,md,bd,gd,yd,Td,xd,_a=D(()=>{"use strict";_t();fd();Kr();Kt=()=>!!ee.wasm.proxy&&typeof document<"u",Sn=!1,Mo=!1,Go=!1,Uo=new Map,or=(a,t)=>{let o=Uo.get(a);o?o.push(t):Uo.set(a,[t])},ir=()=>{if(Sn||!Mo||Go||!it)throw new Error("worker not ready")},Cg=a=>{switch(a.data.type){case"init-wasm":Sn=!1,a.data.err?(Go=!0,va[1](a.data.err)):(Mo=!0,va[0]());break;case"init-ep":case"copy-from":case"create":case"configure":case"auth":case"release":case"end-profiling":{let t=Uo.get(a.data.type);a.data.err?t.shift()[1](a.data.err):t.shift()[0](a.data.out);break}case"run":{let t=Uo.get(a.data.type);a.data.err?t.shift()[1](a.data.err):t.shift()[0](a.data.out.concat(a.data.inputsBack));break}default:}},Ro=typeof document<"u"?document?.currentScript?.src:void 0,Fg=a=>{let t=[];for(var o=0;o<a.length;++o){let e=a[o];e!==null&&t.push(e)}return t},pd=async()=>{if(!Mo){if(Sn)throw new Error("multiple calls to 'initWasm()' detected.");if(Go)throw new Error("previous call to 'initWasm()' failed.");if(Sn=!0,Kt())return ee.wasm.wasmPaths===void 0&&Ro&&Ro.indexOf("blob:")!==0&&(ee.wasm.wasmPaths=Ro.substr(0,+Ro.lastIndexOf("/")+1)),new Promise((a,t)=>{it?.terminate();let o=URL.createObjectURL(new Blob([cd()],{type:"text/javascript"}));it=new Worker(o,{name:"ort-wasm-proxy-worker"}),it.onerror=r=>t(r),it.onmessage=Cg,URL.revokeObjectURL(o),va=[a,t];let e={type:"init-wasm",in:ee};it.postMessage(e)});try{await jp(ee.wasm),await rd(ee),Mo=!0}catch(a){throw Go=!0,a}finally{Sn=!1}}},dd=async a=>{if(Kt())return ir(),new Promise((t,o)=>{or("init-ep",[t,o]);let e={type:"init-ep",in:{epName:a,env:ee}};it.postMessage(e)});await nd(ee,a)},hd=async a=>Kt()?(ir(),new Promise((t,o)=>{or("copy-from",[t,o]);let e={type:"copy-from",in:{buffer:a}};it.postMessage(e,[a.buffer])})):xa(a),md=async(a,t)=>{if(Kt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return ir(),new Promise((o,e)=>{or("create",[o,e]);let r={type:"create",in:{model:a,options:t}},n=[];a instanceof Uint8Array&&n.push(a.buffer),it.postMessage(r,n)})}else return od(a,t)},bd=async a=>{if(Kt())return ir(),new Promise((t,o)=>{or("release",[t,o]);let e={type:"release",in:a};it.postMessage(e)});id(a)},gd=async a=>Kt()?(ir(),new Promise((t,o)=>{or("configure",[t,o]);let e={type:"configure",in:a};it.postMessage(e)})):ad(a),yd=async a=>Kt()?(ir(),new Promise((t,o)=>{or("auth",[t,o]);let e={type:"auth",in:a};it.postMessage(e)})):sd(a),Td=async(a,t,o,e,r,n)=>{if(Kt()){if(o.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");return ir(),new Promise((s,i)=>{or("run",[s,i]);let u=o,l={type:"run",in:{sessionId:a,inputIndices:t,inputs:u,outputIndices:e,options:n},prealloc:r};it.postMessage(l,wa(u).concat(wa(Fg(r))))})}else return ud(a,t,o,e,r,n).then(s=>s.concat(o))},xd=async a=>{if(Kt())return ir(),new Promise((t,o)=>{or("end-profiling",[t,o]);let e={type:"end-profiling",in:a};it.postMessage(e)});ld(a)}});var wd,vd,zo,_d=D(()=>{"use strict";_t();_a();ya();Ta();wd=(a,t)=>{switch(a.location){case"cpu":return[a.type,a.dims,a.data,"cpu"];case"gpu-buffer":return[a.type,a.dims,{gpuBuffer:a.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${a.location} for ${t()}`)}},vd=a=>{switch(a[3]){case"cpu":return new Ne(a[0],a[2],a[1]);case"gpu-buffer":{let t=a[0];if(!No(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:o,download:e,dispose:r}=a[2];return Ne.fromGpuBuffer(o,{dataType:t,dims:a[1],download:e,dispose:r})}default:throw new Error(`invalid data location: ${a[3]}`)}},zo=class{async fetchModelAndCopyToWasmMemory(t){return hd(await On(t))}async loadModel(t,o){br();let e;typeof t=="string"?typeof process<"u"&&process.versions&&process.versions.node?e=await On(t):e=await this.fetchModelAndCopyToWasmMemory(t):e=t,[this.sessionId,this.inputNames,this.outputNames]=await md(e,o),gr()}async dispose(){return bd(this.sessionId)}async configure(t){return gd(t)}async auth(t){return yd(t)}async run(t,o,e){br();let r=[],n=[];Object.entries(t).forEach(v=>{let _=v[0],I=v[1],L=this.inputNames.indexOf(_);if(L===-1)throw new Error(`invalid input '${_}'`);r.push(I),n.push(L)});let s=[],i=[],u=v=>v!==null&&v.location==="gpu-buffer"?v:null;Object.entries(o).forEach(v=>{let _=v[0],I=v[1],L=this.outputNames.indexOf(_);if(L===-1)throw new Error(`invalid output '${_}'`);s.push(I),i.push(L)});let l=r.map((v,_)=>wd(v,()=>`input "${this.inputNames[n[_]]}"`)),c=s.map((v,_)=>v?wd(v,()=>`output "${this.outputNames[i[_]]}"`):null),p=await Td(this.sessionId,n,l,i,c,e),b={},x=[];for(let v=0;v<p.length;v++)v>=i.length?x.push(vd(p[v])):b[this.outputNames[i[v]]]=u(s[v])??vd(p[v]);return x.length>0&&(b.inputBack=x[0]),gr(),b}startProfiling(){}endProfiling(){xd(this.sessionId)}}});var Bg,Wo,Od=D(()=>{"use strict";_t();_a();_d();Bg=()=>{if((typeof ee.wasm.initTimeout!="number"||ee.wasm.initTimeout<0)&&(ee.wasm.initTimeout=0),typeof ee.wasm.simd!="boolean"&&(ee.wasm.simd=!0),typeof ee.wasm.proxy!="boolean"&&(ee.wasm.proxy=!1),typeof ee.wasm.trace!="boolean"&&(ee.wasm.trace=!1),typeof ee.wasm.numThreads!="number"||!Number.isInteger(ee.wasm.numThreads)||ee.wasm.numThreads<=0){(typeof self<"u"&&!self.crossOriginIsolated||typeof process<"u"&&process.versions&&process.versions.node)&&(ee.wasm.numThreads=1);let a=typeof navigator>"u"?(void 0)().length:navigator.hardwareConcurrency;ee.wasm.numThreads=Math.min(4,Math.ceil((a||1)/2))}},Wo=class{async init(t){Bg(),await pd(),await dd(t)}async createInferenceSessionHandler(t,o){let e=new zo;return await e.loadModel(t,o),Promise.resolve(e)}}});var Sd={};pr(Sd,{wasmBackend:()=>$g});var $g,Id=D(()=>{"use strict";Od();$g=new Wo});_t();_t();_t();var Is="1.17.0";var nS=ei;{let a=(Lp(),jt(Dp)).onnxjsBackend;hr("webgl",a,-10)}{let a=(Id(),jt(Sd)).wasmBackend;hr("cpu",a,10),hr("wasm",a,10),hr("webnn",a,9)}Object.defineProperty(ee.versions,"web",{value:Is,enumerable:!0});
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.min.js.map


/***/ }),

/***/ "./node_modules/wasm-feature-detect/dist/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/wasm-feature-detect/dist/esm/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bigInt": () => (/* binding */ bigInt),
/* harmony export */   "bulkMemory": () => (/* binding */ bulkMemory),
/* harmony export */   "exceptions": () => (/* binding */ exceptions),
/* harmony export */   "extendedConst": () => (/* binding */ extendedConst),
/* harmony export */   "gc": () => (/* binding */ gc),
/* harmony export */   "jspi": () => (/* binding */ jspi),
/* harmony export */   "memory64": () => (/* binding */ memory64),
/* harmony export */   "multiMemory": () => (/* binding */ multiMemory),
/* harmony export */   "multiValue": () => (/* binding */ multiValue),
/* harmony export */   "mutableGlobals": () => (/* binding */ mutableGlobals),
/* harmony export */   "referenceTypes": () => (/* binding */ referenceTypes),
/* harmony export */   "relaxedSimd": () => (/* binding */ relaxedSimd),
/* harmony export */   "saturatedFloatToInt": () => (/* binding */ saturatedFloatToInt),
/* harmony export */   "signExtensions": () => (/* binding */ signExtensions),
/* harmony export */   "simd": () => (/* binding */ simd),
/* harmony export */   "streamingCompilation": () => (/* binding */ streamingCompilation),
/* harmony export */   "tailCall": () => (/* binding */ tailCall),
/* harmony export */   "threads": () => (/* binding */ threads),
/* harmony export */   "typeReflection": () => (/* binding */ typeReflection)
/* harmony export */ });
const bigInt=()=>(async e=>{try{return(await WebAssembly.instantiate(e)).instance.exports.b(BigInt(0))===BigInt(0)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,126,1,126,3,2,1,0,7,5,1,1,98,0,0,10,6,1,4,0,32,0,11])),bulkMemory=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])),exceptions=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),extendedConst=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,0,1,11,9,1,0,65,1,65,2,106,11,0])),gc=()=>(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])))(),jspi=()=>(async()=>"Suspender"in WebAssembly)(),memory64=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,4,1])),multiMemory=()=>(async()=>{try{return new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,5,5,2,0,0,0,0])),!0}catch(e){return!1}})(),multiValue=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,0,2,127,127,3,2,1,0,10,8,1,6,0,65,0,65,0,11])),mutableGlobals=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,2,8,1,1,97,1,98,3,127,1,6,6,1,127,1,65,0,11,7,5,1,1,97,3,1])),referenceTypes=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,7,1,5,0,208,112,26,11])),relaxedSimd=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),saturatedFloatToInt=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,12,1,10,0,67,0,0,0,0,252,0,26,11])),signExtensions=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,65,0,192,26,11])),simd=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),streamingCompilation=()=>(async()=>"compileStreaming"in WebAssembly)(),tailCall=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,6,1,4,0,18,0,11])),threads=()=>(async e=>{try{return"undefined"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(e)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11])),typeReflection=()=>(async()=>"Function"in WebAssembly)();


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"Audio Effects SDK","version":"2.5.0","description":"","main":"index.js","scripts":{"dev":"npm run development","workers":"mix --mix-config=webpack.mix.workers.js","development":"mix","watch":"mix watch","watch:workers":"mix --mix-config=webpack.mix.workers.js watch","watch-poll":"mix watch -- --watch-options-poll=1000","hot":"mix watch --hot","prod":"npm run production","production":"mix --production"},"keywords":[],"author":"","license":"ISC","devDependencies":{"@babel/cli":"^7.26.4","@babel/core":"^7.26.0","@babel/preset-env":"^7.26.0","@types/axios":"^0.14.0","@types/dom-mediacapture-transform":"^0.1.2","@types/js-cookie":"^3.0.1","@types/uniqid":"^5.3.2","@types/uuid":"^9.0.7","axios":"^0.26.0","dotenv-webpack":"^8.0.1","js-cookie":"^3.0.1","laravel-mix":"^6.0.41","onnxruntime-web":"1.18.0","path":"^0.12.7","raw-loader":"^4.0.2","string-replace-loader":"^3.1.0","ts-loader":"^9.2.6","typedoc":"^0.22.13","typescript":"^4.5.5","uniqid":"^5.4.0","uuid":"^9.0.1","wasm-feature-detect":"^1.6.1"},"dependencies":{"ws":"^8.18.3"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************************!*\
  !*** ./src/workers/worker_processor.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requestAuthFromMainThread": () => (/* binding */ requestAuthFromMainThread)
/* harmony export */ });
/* harmony import */ var _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/buffers/ringBuffer */ "./src/utils/buffers/ringBuffer.ts");
/* harmony import */ var _utils_buffers_bufferPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/buffers/bufferPool */ "./src/utils/buffers/bufferPool.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model */ "./src/model.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings */ "./src/settings.ts");
/* harmony import */ var _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./postmessageTypes */ "./src/workers/postmessageTypes.ts");
/* harmony import */ var _utils_errorBus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/errorBus */ "./src/utils/errorBus.ts");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






var workletPort;
var processor;
var isReady = false;
var ringBuffer;
var ringOutputBuffer;
var bufferPool = new _utils_buffers_bufferPool__WEBPACK_IMPORTED_MODULE_1__.BufferPool('worker');
var dbgDelay = 0;
var isProcessing = false;
var mode = 'chunk';
var _returnBuffers = [];
_utils_errorBus__WEBPACK_IMPORTED_MODULE_5__.ErrorBus.subscribe(function (e) {
  postMessage({
    type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.ERROR_BUS,
    e: e
  });
});
var authRequestId = 0;
var pendingAuthRequests = new Map();
function requestAuthFromMainThread(_x, _x2) {
  return _requestAuthFromMainThread.apply(this, arguments);
}
function _requestAuthFromMainThread() {
  _requestAuthFromMainThread = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(payload, authType) {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          return _context4.a(2, new Promise(function (resolve, reject) {
            var requestId = authRequestId++;
            pendingAuthRequests.set(requestId, {
              resolve: resolve,
              reject: reject
            });
            postMessage({
              type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.AUTH_REQUEST,
              requestId: requestId,
              payload: payload,
              authType: authType
            });
          }));
      }
    }, _callee4);
  }));
  return _requestAuthFromMainThread.apply(this, arguments);
}
globalThis.requestAuthFromMainThread = requestAuthFromMainThread;
var delayExecution = function delayExecution(timeoutMs) {
  return new Promise(function (resolve, _) {
    setTimeout(function () {
      resolve();
    }, timeoutMs);
  });
};
var onWorkletMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
    var _event$data, frames, returnBuffers, i;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _event$data = event.data, frames = _event$data.frames, returnBuffers = _event$data.returnBuffers;
          if (isReady) {
            _context.n = 1;
            break;
          }
          if (workletPort) workletPort.postMessage({
            frames: frames
          }, [frames.buffer]);
          return _context.a(2);
        case 1:
          ringBuffer.push(frames);
          if (returnBuffers === null || returnBuffers === void 0 ? void 0 : returnBuffers.length) {
            for (i = 0; i < (returnBuffers === null || returnBuffers === void 0 ? void 0 : returnBuffers.length); i++) {
              bufferPool.returnBuffer(returnBuffers[i]);
            }
          }
          if (frames.length == processor.getChunkSize()) {
            bufferPool.returnBuffer(frames);
          } else {
            _returnBuffers.push(frames);
          }
          if (isProcessing) {
            _context.n = 2;
            break;
          }
          _context.n = 2;
          return process();
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function onWorkletMessage(_x3) {
    return _ref.apply(this, arguments);
  };
}();
var process = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var buffer, _buffer, _t, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          isProcessing = true;
        case 1:
          if (!(ringBuffer.framesAvailable >= processor.getChunkSize())) {
            _context2.n = 4;
            break;
          }
          buffer = bufferPool.getBuffer('f32', processor.getChunkSize());
          ringBuffer.pull(buffer);
          _t = ringOutputBuffer;
          _context2.n = 2;
          return processor.run(buffer, buffer);
        case 2:
          _t2 = _context2.v;
          _t.push.call(_t, _t2);
          bufferPool.returnBuffer(buffer);
          if (!(dbgDelay > 0)) {
            _context2.n = 3;
            break;
          }
          _context2.n = 3;
          return delayExecution(dbgDelay);
        case 3:
          _context2.n = 1;
          break;
        case 4:
          while (ringOutputBuffer.framesAvailable >= processor.getChunkSize()) {
            _buffer = bufferPool.getBuffer('f32', mode == 'chunk' ? processor.getChunkSize() : ringOutputBuffer.framesAvailable);
            ringOutputBuffer.pull(_buffer);
            if (_returnBuffers.length) {
              workletPort.postMessage({
                frames: _buffer,
                returnBuffers: _returnBuffers
              }, [_buffer.buffer].concat(_toConsumableArray(_returnBuffers.map(function (v) {
                return v.buffer;
              }))));
              _returnBuffers = [];
            } else {
              workletPort.postMessage({
                frames: _buffer
              }, [_buffer.buffer]);
            }
          }
          isProcessing = false;
        case 5:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function process() {
    return _ref2.apply(this, arguments);
  };
}();
var resetBuffers = function resetBuffers() {
  var _a, _b;
  var chunk = (_b = (_a = processor === null || processor === void 0 ? void 0 : processor.getChunkSize) === null || _a === void 0 ? void 0 : _a.call(processor)) !== null && _b !== void 0 ? _b : 512;
  var mult = 40;
  ringBuffer = new _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__.RingBuffer(chunk * mult);
  ringOutputBuffer = new _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__.RingBuffer(chunk * mult);
};
onmessage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(event) {
    var _event$data2, requestId, key, error, authRequest, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (event.data.type) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          _t3 = event.data.type;
          _context3.n = _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.INIT ? 2 : _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.WORKLET_PORT ? 5 : _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.DENOISE_POWER ? 6 : _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.CLEAN ? 7 : _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.DBG_DELAY_PROCESSING ? 8 : _t3 === _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.AUTH_RESPONSE ? 9 : 10;
          break;
        case 2:
          if (event.data.mode) {
            mode = event.data.mode;
          }
          if (!(processor && processor.getType() == event.data.preset)) {
            _context3.n = 3;
            break;
          }
          if (isReady) {
            postMessage({
              type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.PROCESSOR_READY
            });
          }
          return _context3.a(2);
        case 3:
          isReady = false;
          if (!processor) {
            _context3.n = 4;
            break;
          }
          _context3.n = 4;
          return processor.dispose();
        case 4:
          processor = _model__WEBPACK_IMPORTED_MODULE_2__.ModelFactory.getModel(event.data.preset);
          _settings__WEBPACK_IMPORTED_MODULE_3__.DefaultConfig.setConfig(event.data.config);
          processor.init(_settings__WEBPACK_IMPORTED_MODULE_3__.DefaultConfig.CUSTOMER_ID, null).then(function () {
            var buffer = new Float32Array(processor.getChunkSize()).fill(0);
            return Promise.all([processor.run(buffer)]);
          }).then(function () {
            resetBuffers();
            isReady = true;
            postMessage({
              type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.PROCESSOR_READY
            });
          })["catch"](function (e) {
            isReady = false;
            postMessage({
              type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_4__.WORKER_PROCESSOR_POSTMESSAGE_TYPE.ERROR,
              e: e
            });
          });
          return _context3.a(3, 11);
        case 5:
          workletPort = event.data.workletPort;
          workletPort.onmessage = onWorkletMessage;
          return _context3.a(3, 11);
        case 6:
          if (processor) {
            processor.setPower(parseFloat(event.data.power));
          }
          return _context3.a(3, 11);
        case 7:
          resetBuffers();
          try {
            processor.clear();
          } catch (e) {}
          return _context3.a(3, 11);
        case 8:
          dbgDelay = event.data.delayMs;
          return _context3.a(3, 11);
        case 9:
          _event$data2 = event.data, requestId = _event$data2.requestId, key = _event$data2.key, error = _event$data2.error;
          authRequest = pendingAuthRequests.get(requestId);
          if (authRequest) {
            pendingAuthRequests["delete"](requestId);
            if (error) {
              authRequest.reject(error);
            } else {
              authRequest.resolve(key);
            }
          }
          return _context3.a(3, 11);
        case 10:
          console.log("Not supported message type: ".concat(event.data.type));
        case 11:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function onmessage(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
})();

/******/ })()
;