/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/buffers/bufferPool.ts":
/*!*****************************************!*\
  !*** ./src/utils/buffers/bufferPool.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/utils/enhancer/adaptive_harmonic_exciter.ts":
/*!*********************************************************!*\
  !*** ./src/utils/enhancer/adaptive_harmonic_exciter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdaptiveHarmonicExciter": () => (/* binding */ AdaptiveHarmonicExciter)
/* harmony export */ });
/* harmony import */ var _biquad_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./biquad_filter */ "./src/utils/enhancer/biquad_filter.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var AdaptiveHarmonicExciter = /*#__PURE__*/function () {
  function AdaptiveHarmonicExciter(sampleRate) {
    _classCallCheck(this, AdaptiveHarmonicExciter);
    this.rmsTracker = 0;
    this.rmsThreshold = -35;
    this.highpassFilter = new _biquad_filter__WEBPACK_IMPORTED_MODULE_0__.BiquadFilter();
    this.highpassFilter.configure('highpass', 2500, sampleRate, 0.707, 0);
    this.topEndFilter = new _biquad_filter__WEBPACK_IMPORTED_MODULE_0__.BiquadFilter();
    this.topEndFilter.configure('highshelf', 9500, sampleRate, 0.7, 1.5);
  }
  return _createClass(AdaptiveHarmonicExciter, [{
    key: "process",
    value: function process(input) {
      this.rmsTracker = this.rmsTracker * 0.999 + input * input * 0.001;
      var rmsDb = 10 * Math.log10(Math.max(this.rmsTracker, 1e-10));
      if (rmsDb < this.rmsThreshold) {
        return input;
      }
      var highFreq = this.highpassFilter.process(input);
      var excitationAmount = Math.min((rmsDb - this.rmsThreshold) / 30, 1.0);
      var distortion = Math.tanh(highFreq * 1.5) * 0.08 * excitationAmount;
      var harmonics = Math.sin(highFreq * Math.PI * 0.8) * 0.05 * excitationAmount;
      var excitation = (distortion + harmonics) * 0.6;
      var enhanced = input + excitation;
      return this.topEndFilter.process(enhanced);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.highpassFilter.reset();
      this.topEndFilter.reset();
      this.rmsTracker = 0;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/audio_enhancer.ts":
/*!**********************************************!*\
  !*** ./src/utils/enhancer/audio_enhancer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioEnhancer": () => (/* binding */ AudioEnhancer)
/* harmony export */ });
/* harmony import */ var _biquad_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./biquad_filter */ "./src/utils/enhancer/biquad_filter.ts");
/* harmony import */ var _noise_gate_expander__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noise_gate_expander */ "./src/utils/enhancer/noise_gate_expander.ts");
/* harmony import */ var _de_esser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./de_esser */ "./src/utils/enhancer/de_esser.ts");
/* harmony import */ var _simple_compressor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./simple_compressor */ "./src/utils/enhancer/simple_compressor.ts");
/* harmony import */ var _brickwall_limiter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./brickwall_limiter */ "./src/utils/enhancer/brickwall_limiter.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var AudioEnhancer = /*#__PURE__*/function () {
  function AudioEnhancer() {
    var sampleRate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 48000;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, AudioEnhancer);
    this.eqFilters = [];
    this.cachedAutoGain = 1.0;
    this.agcUpdateCounter = 0;
    this.AGC_UPDATE_INTERVAL = 64;
    this.sampleRate = sampleRate;
    this.options = Object.assign({
      preset: 'voice',
      enableCompressorEQ: true,
      enableNoiseGate: true,
      enableDeEsser: true,
      enableAutoGain: false,
      autoGainTargetDb: -12,
      outputGain: 1.0
    }, options);
    this.noiseGate = new _noise_gate_expander__WEBPACK_IMPORTED_MODULE_1__.NoiseGateExpander(sampleRate);
    this.deEsser = new _de_esser__WEBPACK_IMPORTED_MODULE_2__.DeEsser(sampleRate);
    this.compressor = new _simple_compressor__WEBPACK_IMPORTED_MODULE_3__.SimpleCompressor(sampleRate);
    this.brickwallLimiter = new _brickwall_limiter__WEBPACK_IMPORTED_MODULE_4__.BrickwallLimiter(sampleRate);
    this.setupEQ();
  }
  return _createClass(AudioEnhancer, [{
    key: "setMetricsCalculator",
    value: function setMetricsCalculator(metricsCalculator) {
      this.gainMonitor = metricsCalculator;
    }
  }, {
    key: "setupEQ",
    value: function setupEQ() {
      this.eqFilters = [];
      var preset = this.options.customEQ || AudioEnhancer.PRESETS[this.options.preset || 'voice'];
      if (preset) {
        var _iterator = _createForOfIteratorHelper(preset.bands),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var band = _step.value;
            var filter = new _biquad_filter__WEBPACK_IMPORTED_MODULE_0__.BiquadFilter();
            filter.configure(band.type, band.frequency, this.sampleRate, band.q, band.gain);
            this.eqFilters.push(filter);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "process",
    value: function process(input) {
      var len = input.length;
      if (!this.options.enableNoiseGate && !this.options.enableDeEsser && !this.options.enableCompressorEQ && !this.options.enableAutoGain && this.eqFilters.length === 0 && this.options.outputGain === 1.0) {
        return this.processLimiterOnly(input);
      }
      var workingBuffer = new Float32Array(len);
      var outputBuffer = new Float32Array(len);
      workingBuffer.set(input);
      if (this.options.enableNoiseGate || this.options.enableDeEsser) {
        for (var i = 0; i < len; i++) {
          var sample = workingBuffer[i];
          if (this.options.enableNoiseGate) {
            sample = this.noiseGate.process(sample);
          }
          if (this.options.enableDeEsser) {
            sample = this.deEsser.process(sample);
          }
          workingBuffer[i] = sample;
        }
      }
      if (this.eqFilters.length > 0) {
        var inputBuf = workingBuffer;
        var outputBuf = outputBuffer;
        for (var f = 0; f < this.eqFilters.length; f++) {
          this.eqFilters[f].processBuffer(inputBuf, outputBuf);
          var temp = inputBuf;
          inputBuf = outputBuf;
          outputBuf = temp;
        }
        if (this.eqFilters.length % 2 === 1) {
          workingBuffer = outputBuffer;
          outputBuffer = inputBuf;
        }
      }
      var output = new Float32Array(len);
      for (var _i = 0; _i < len; _i++) {
        var _sample = workingBuffer[_i];
        if (this.options.enableCompressorEQ) {
          _sample = this.compressor.process(_sample);
        }
        if (this.options.enableAutoGain && this.gainMonitor) {
          if (this.agcUpdateCounter++ >= this.AGC_UPDATE_INTERVAL) {
            this.cachedAutoGain = this.gainMonitor.getAutoGain(this.options.autoGainTargetDb || -12);
            this.agcUpdateCounter = 0;
          }
          _sample = _sample * this.cachedAutoGain;
        }
        _sample = _sample * (this.options.outputGain || 1.0);
        _sample = this.brickwallLimiter.process(_sample);
        output[_i] = _sample;
      }
      return output;
    }
  }, {
    key: "processLimiterOnly",
    value: function processLimiterOnly(input) {
      var output = new Float32Array(input.length);
      for (var i = 0; i < input.length; i++) {
        output[i] = this.brickwallLimiter.process(input[i]);
      }
      return output;
    }
  }, {
    key: "setPreset",
    value: function setPreset(presetName) {
      if (AudioEnhancer.PRESETS[presetName]) {
        this.options.preset = presetName;
        this.options.customEQ = undefined;
        this.setupEQ();
      }
    }
  }, {
    key: "setCustomEQ",
    value: function setCustomEQ(preset) {
      this.options.customEQ = preset;
      this.setupEQ();
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = Object.assign(Object.assign({}, this.options), options);
      if (options.customEQ || options.preset) {
        if (!options.customEQ) {
          this.options.customEQ = undefined;
        }
        this.setupEQ();
      }
      if (options.compressorThreshold || options.compressorRatio) {
        this.compressor = new _simple_compressor__WEBPACK_IMPORTED_MODULE_3__.SimpleCompressor(this.sampleRate, {
          threshold: options.compressorThreshold,
          ratio: options.compressorRatio
        });
      }
      if (options.gateThreshold || options.gateReduction) {
        this.noiseGate = new _noise_gate_expander__WEBPACK_IMPORTED_MODULE_1__.NoiseGateExpander(this.sampleRate, {
          threshold: options.gateThreshold,
          reduction: options.gateReduction
        });
      }
    }
  }, {
    key: "getAvailablePresets",
    value: function getAvailablePresets() {
      return Object.keys(AudioEnhancer.PRESETS);
    }
  }, {
    key: "getRecommendedGain",
    value: function getRecommendedGain() {
      var _a;
      return (_a = this.gainMonitor) === null || _a === void 0 ? void 0 : _a.getAutoGain();
    }
  }, {
    key: "getMeters",
    value: function getMeters() {
      var _a;
      return (_a = this.gainMonitor) === null || _a === void 0 ? void 0 : _a.getMetrics();
    }
  }, {
    key: "reset",
    value: function reset() {
      var _iterator2 = _createForOfIteratorHelper(this.eqFilters),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var filter = _step2.value;
          filter.reset();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.noiseGate.reset();
      this.deEsser.reset();
      this.harmonicExciter.reset();
      this.compressor.reset();
      this.presenceFilter.reset();
      this.brickwallLimiter.reset();
    }
  }]);
}();
AudioEnhancer.PRESETS = {
  'voice': {
    name: 'Professional Voice',
    bands: [{
      frequency: 80,
      gain: -8,
      q: 0.7,
      type: 'highpass'
    }, {
      frequency: 150,
      gain: -2,
      q: 1.0,
      type: 'peaking'
    }, {
      frequency: 1000,
      gain: 1.5,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 2500,
      gain: 2.0,
      q: 1.4,
      type: 'peaking'
    }, {
      frequency: 5000,
      gain: 1.5,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 8000,
      gain: 2.0,
      q: 0.7,
      type: 'highshelf'
    }]
  },
  'podcast': {
    name: 'Podcast Enhancement',
    bands: [{
      frequency: 60,
      gain: -10,
      q: 0.707,
      type: 'highpass'
    }, {
      frequency: 120,
      gain: -2.0,
      q: 1.0,
      type: 'peaking'
    }, {
      frequency: 500,
      gain: 0.8,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 1500,
      gain: 1.8,
      q: 1.6,
      type: 'peaking'
    }, {
      frequency: 3500,
      gain: 2.0,
      q: 1.6,
      type: 'peaking'
    }, {
      frequency: 7000,
      gain: 1.2,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 9500,
      gain: 0.8,
      q: 0.7,
      type: 'highshelf'
    }]
  },
  'broadcast': {
    name: 'Broadcast Radio',
    bands: [{
      frequency: 90,
      gain: -12,
      q: 0.707,
      type: 'highpass'
    }, {
      frequency: 200,
      gain: -1,
      q: 1.0,
      type: 'peaking'
    }, {
      frequency: 800,
      gain: 1.2,
      q: 1.4,
      type: 'peaking'
    }, {
      frequency: 2200,
      gain: 2.5,
      q: 1.6,
      type: 'peaking'
    }, {
      frequency: 4000,
      gain: 2.0,
      q: 1.6,
      type: 'peaking'
    }, {
      frequency: 6500,
      gain: 1.2,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 9500,
      gain: 0.8,
      q: 0.7,
      type: 'highshelf'
    }]
  },
  'warm': {
    name: 'Warm Enhancement',
    bands: [{
      frequency: 70,
      gain: -6,
      q: 0.707,
      type: 'highpass'
    }, {
      frequency: 200,
      gain: 1.5,
      q: 0.9,
      type: 'lowshelf'
    }, {
      frequency: 800,
      gain: 0.8,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 2000,
      gain: 1.2,
      q: 1.4,
      type: 'peaking'
    }, {
      frequency: 5000,
      gain: 0.3,
      q: 1.0,
      type: 'peaking'
    }, {
      frequency: 8000,
      gain: -0.5,
      q: 0.8,
      type: 'highshelf'
    }]
  },
  'bright': {
    name: 'Bright & Clear',
    bands: [{
      frequency: 90,
      gain: -8,
      q: 0.707,
      type: 'highpass'
    }, {
      frequency: 300,
      gain: -0.5,
      q: 1.0,
      type: 'peaking'
    }, {
      frequency: 1200,
      gain: 1,
      q: 1.2,
      type: 'peaking'
    }, {
      frequency: 2800,
      gain: 2.2,
      q: 1.5,
      type: 'peaking'
    }, {
      frequency: 5200,
      gain: 1.5,
      q: 1.3,
      type: 'peaking'
    }, {
      frequency: 9500,
      gain: 1.2,
      q: 0.7,
      type: 'highshelf'
    }]
  }
};

/***/ }),

/***/ "./src/utils/enhancer/biquad_filter.ts":
/*!*********************************************!*\
  !*** ./src/utils/enhancer/biquad_filter.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BiquadFilter": () => (/* binding */ BiquadFilter)
/* harmony export */ });
/* harmony import */ var _denormal_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./denormal_handler */ "./src/utils/enhancer/denormal_handler.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var BiquadFilter = /*#__PURE__*/function () {
  function BiquadFilter() {
    _classCallCheck(this, BiquadFilter);
    this.b0 = 1;
    this.b1 = 0;
    this.b2 = 0;
    this.a1 = 0;
    this.a2 = 0;
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
    this.denormalFlusher = new _denormal_handler__WEBPACK_IMPORTED_MODULE_0__.PeriodicDenormalFlusher(128);
  }
  return _createClass(BiquadFilter, [{
    key: "configure",
    value: function configure(type, frequency, sampleRate) {
      var q = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.707;
      var gain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var w = 2 * Math.PI * frequency / sampleRate;
      var cosw = Math.cos(w);
      var sinw = Math.sin(w);
      var alpha = sinw / (2 * q);
      var A = Math.pow(10, gain / 40);
      var b0, b1, b2, a0, a1, a2;
      switch (type) {
        case 'lowpass':
          b0 = (1 - cosw) / 2;
          b1 = 1 - cosw;
          b2 = (1 - cosw) / 2;
          a0 = 1 + alpha;
          a1 = -2 * cosw;
          a2 = 1 - alpha;
          break;
        case 'highpass':
          b0 = (1 + cosw) / 2;
          b1 = -(1 + cosw);
          b2 = (1 + cosw) / 2;
          a0 = 1 + alpha;
          a1 = -2 * cosw;
          a2 = 1 - alpha;
          break;
        case 'peaking':
          b0 = 1 + alpha * A;
          b1 = -2 * cosw;
          b2 = 1 - alpha * A;
          a0 = 1 + alpha / A;
          a1 = -2 * cosw;
          a2 = 1 - alpha / A;
          break;
        case 'lowshelf':
          var betaLow = Math.sqrt(A) / q;
          b0 = A * (A + 1 - (A - 1) * cosw + betaLow * sinw);
          b1 = 2 * A * (A - 1 - (A + 1) * cosw);
          b2 = A * (A + 1 - (A - 1) * cosw - betaLow * sinw);
          a0 = A + 1 + (A - 1) * cosw + betaLow * sinw;
          a1 = -2 * (A - 1 + (A + 1) * cosw);
          a2 = A + 1 + (A - 1) * cosw - betaLow * sinw;
          break;
        case 'highshelf':
          var betaHigh = Math.sqrt(A) / q;
          b0 = A * (A + 1 + (A - 1) * cosw + betaHigh * sinw);
          b1 = -2 * A * (A - 1 + (A + 1) * cosw);
          b2 = A * (A + 1 + (A - 1) * cosw - betaHigh * sinw);
          a0 = A + 1 - (A - 1) * cosw + betaHigh * sinw;
          a1 = 2 * (A - 1 - (A + 1) * cosw);
          a2 = A + 1 - (A - 1) * cosw - betaHigh * sinw;
          break;
        default:
          b0 = 1;
          b1 = 0;
          b2 = 0;
          a0 = 1;
          a1 = 0;
          a2 = 0;
      }
      this.b0 = b0 / a0;
      this.b1 = b1 / a0;
      this.b2 = b2 / a0;
      this.a1 = a1 / a0;
      this.a2 = a2 / a0;
    }
  }, {
    key: "process",
    value: function process(input) {
      if (this.denormalFlusher.shouldFlush()) {
        var DENORMAL_THRESHOLD = 1e-20;
        if (Math.abs(this.x1) < DENORMAL_THRESHOLD) this.x1 = 0;
        if (Math.abs(this.x2) < DENORMAL_THRESHOLD) this.x2 = 0;
        if (Math.abs(this.y1) < DENORMAL_THRESHOLD) this.y1 = 0;
        if (Math.abs(this.y2) < DENORMAL_THRESHOLD) this.y2 = 0;
        this.denormalFlusher.reset();
      }
      var output = this.b0 * input + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
      this.x2 = this.x1;
      this.x1 = input;
      this.y2 = this.y1;
      this.y1 = output;
      return output;
    }
  }, {
    key: "processBuffer",
    value: function processBuffer(input, output) {
      var len = input.length;
      var b0 = this.b0,
        b1 = this.b1,
        b2 = this.b2;
      var a1 = this.a1,
        a2 = this.a2;
      var x1 = this.x1,
        x2 = this.x2,
        y1 = this.y1,
        y2 = this.y2;
      var i = 0;
      var len4 = len >> 2 << 2;
      for (; i < len4; i += 4) {
        var y = b0 * input[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        output[i] = y;
        x2 = x1;
        x1 = input[i];
        y2 = y1;
        y1 = y;
        y = b0 * input[i + 1] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        output[i + 1] = y;
        x2 = x1;
        x1 = input[i + 1];
        y2 = y1;
        y1 = y;
        y = b0 * input[i + 2] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        output[i + 2] = y;
        x2 = x1;
        x1 = input[i + 2];
        y2 = y1;
        y1 = y;
        y = b0 * input[i + 3] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        output[i + 3] = y;
        x2 = x1;
        x1 = input[i + 3];
        y2 = y1;
        y1 = y;
      }
      for (; i < len; i++) {
        var _y = b0 * input[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        output[i] = _y;
        x2 = x1;
        x1 = input[i];
        y2 = y1;
        y1 = _y;
      }
      var DENORMAL_THRESHOLD = 1e-20;
      this.x1 = Math.abs(x1) < DENORMAL_THRESHOLD ? 0 : x1;
      this.x2 = Math.abs(x2) < DENORMAL_THRESHOLD ? 0 : x2;
      this.y1 = Math.abs(y1) < DENORMAL_THRESHOLD ? 0 : y1;
      this.y2 = Math.abs(y2) < DENORMAL_THRESHOLD ? 0 : y2;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.x1 = this.x2 = this.y1 = this.y2 = 0;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/brickwall_limiter.ts":
/*!*************************************************!*\
  !*** ./src/utils/enhancer/brickwall_limiter.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrickwallLimiter": () => (/* binding */ BrickwallLimiter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BrickwallLimiter = /*#__PURE__*/function () {
  function BrickwallLimiter(sampleRate) {
    _classCallCheck(this, BrickwallLimiter);
    this.write = 0;
    this.read = 0;
    this.envelope = 1;
    this.threshold = 0.98;
    var delayLength = Math.floor(0.005 * sampleRate);
    this.buf = new Float32Array(delayLength);
    this.read = 0;
    this.write = delayLength - 1;
    this.release = Math.exp(-1 / (0.01 * sampleRate));
  }
  return _createClass(BrickwallLimiter, [{
    key: "process",
    value: function process(input) {
      this.write = (this.write + 1) % this.buf.length;
      this.buf[this.write] = input;
      this.read = (this.read + 1) % this.buf.length;
      var delayed = this.buf[this.read];
      var absIn = Math.abs(input);
      var targetGain = absIn > this.threshold ? this.threshold / absIn : 1.0;
      this.envelope = targetGain < this.envelope ? targetGain : this.envelope + (targetGain - this.envelope) * (1 - this.release);
      return delayed * this.envelope;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.buf.fill(0);
      this.envelope = 1;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/de_esser.ts":
/*!****************************************!*\
  !*** ./src/utils/enhancer/de_esser.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeEsser": () => (/* binding */ DeEsser)
/* harmony export */ });
/* harmony import */ var _biquad_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./biquad_filter */ "./src/utils/enhancer/biquad_filter.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DeEsser = /*#__PURE__*/function () {
  function DeEsser(sampleRate) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, DeEsser);
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    this.env = 0;
    this.active = false;
    this.laSamples = 0;
    this.laMask = 0;
    this.laIdx = 0;
    this.sr = sampleRate;
    this.centerHz = (_a = opts.centerHz) !== null && _a !== void 0 ? _a : 6500;
    this.q = (_b = opts.q) !== null && _b !== void 0 ? _b : 1.4;
    this.splitHz = (_c = opts.splitHz) !== null && _c !== void 0 ? _c : 3800;
    this.threshold = (_d = opts.thresholdDb) !== null && _d !== void 0 ? _d : -20;
    this.ratio = (_e = opts.ratio) !== null && _e !== void 0 ? _e : 4;
    this.kneeDb = Math.max(0, (_f = opts.kneeDb) !== null && _f !== void 0 ? _f : 3);
    this.hysteresisDb = Math.max(0, (_g = opts.hysteresisDb) !== null && _g !== void 0 ? _g : 2);
    this.maxReductionDb = Math.max(0, (_h = opts.maxReductionDb) !== null && _h !== void 0 ? _h : 8);
    var attackMs = (_j = opts.attackMs) !== null && _j !== void 0 ? _j : 1.0;
    var releaseMs = (_k = opts.releaseMs) !== null && _k !== void 0 ? _k : 60.0;
    this.attack = Math.exp(-1 / (attackMs * 0.001 * this.sr));
    this.release = Math.exp(-1 / (releaseMs * 0.001 * this.sr));
    this.scBP = new _biquad_filter__WEBPACK_IMPORTED_MODULE_0__.BiquadFilter();
    this.scBP.configure('bandpass', this.centerHz, this.sr, this.q, 0);
    this.hiHP = new _biquad_filter__WEBPACK_IMPORTED_MODULE_0__.BiquadFilter();
    this.hiHP.configure('highpass', this.splitHz, this.sr, 0.707, 0);
    var laMs = Math.max(0, (_l = opts.lookAheadMs) !== null && _l !== void 0 ? _l : 0);
    if (laMs > 0) {
      var n = Math.max(1, Math.ceil(laMs * 0.001 * this.sr));
      var size = 1;
      while (size < n) size <<= 1;
      this.laSamples = size;
      this.laMask = size - 1;
      this.laBufLo = new Float32Array(size);
      this.laBufHi = new Float32Array(size);
      this.laIdx = 0;
    }
  }
  return _createClass(DeEsser, [{
    key: "update",
    value: function update(opts) {
      if (opts.centerHz && opts.centerHz !== this.centerHz) {
        this.centerHz = opts.centerHz;
        this.scBP.configure('bandpass', this.centerHz, this.sr, this.q, 0);
      }
      if (opts.q && opts.q !== this.q) {
        this.q = opts.q;
        this.scBP.configure('bandpass', this.centerHz, this.sr, this.q, 0);
      }
      if (opts.splitHz && opts.splitHz !== this.splitHz) {
        this.splitHz = opts.splitHz;
        this.hiHP.configure('highpass', this.splitHz, this.sr, 0.707, 0);
      }
      if (opts.thresholdDb !== undefined) this.threshold = opts.thresholdDb;
      if (opts.ratio !== undefined) this.ratio = Math.max(1, opts.ratio);
      if (opts.kneeDb !== undefined) this.kneeDb = Math.max(0, opts.kneeDb);
      if (opts.hysteresisDb !== undefined) this.hysteresisDb = Math.max(0, opts.hysteresisDb);
      if (opts.maxReductionDb !== undefined) this.maxReductionDb = Math.max(0, opts.maxReductionDb);
      if (opts.attackMs !== undefined) this.attack = Math.exp(-1 / (opts.attackMs * 0.001 * this.sr));
      if (opts.releaseMs !== undefined) this.release = Math.exp(-1 / (opts.releaseMs * 0.001 * this.sr));
    }
  }, {
    key: "process",
    value: function process(x) {
      var hi = this.hiHP.process(x);
      var lo = x - hi;
      var sc = this.scBP.process(x);
      var a = Math.abs(sc);
      if (a > this.env) this.env = a + (this.env - a) * this.attack;else this.env = a + (this.env - a) * this.release;
      var scDb = 20 * Math.log10(this.env > 1e-12 ? this.env : 1e-12);
      if (this.active) {
        if (scDb < this.threshold - this.hysteresisDb * 0.5) this.active = false;
      } else {
        if (scDb > this.threshold + this.hysteresisDb * 0.5) this.active = true;
      }
      var over = 0;
      var t = this.threshold;
      var k = this.kneeDb;
      if (k <= 0) {
        if (scDb > t) over = scDb - t;
      } else {
        var loEdge = t - k * 0.5;
        var hiEdge = t + k * 0.5;
        if (scDb > loEdge) {
          if (scDb >= hiEdge) {
            over = scDb - t;
          } else {
            var xk = (scDb - loEdge) / k;
            over = xk * xk * (k * 0.5);
          }
        }
      }
      var grDb = 0;
      if (this.active || over > 0) {
        var slope = 1 - 1 / this.ratio;
        grDb = -over * slope;
        if (this.maxReductionDb > 0 && -grDb > this.maxReductionDb) {
          grDb = -this.maxReductionDb;
        }
      }
      var gr = grDb ? Math.pow(10, grDb / 20) : 1;
      var hiOut = hi * gr;
      if (this.laSamples) {
        var i = this.laIdx & this.laMask;
        var loBuf = this.laBufLo;
        var hiBuf = this.laBufHi;
        var outLo = loBuf[i];
        var outHi = hiBuf[i];
        loBuf[i] = lo;
        hiBuf[i] = hiOut;
        this.laIdx = this.laIdx + 1 & 0x7fffffff;
        return outLo + outHi;
      }
      return lo + hiOut;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.scBP.reset();
      this.hiHP.reset();
      this.env = 0;
      this.active = false;
      if (this.laSamples) {
        this.laIdx = 0;
        this.laBufLo.fill(0);
        this.laBufHi.fill(0);
      }
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/denormal_handler.ts":
/*!************************************************!*\
  !*** ./src/utils/enhancer/denormal_handler.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdaptiveDenormalHandler": () => (/* binding */ AdaptiveDenormalHandler),
/* harmony export */   "DENORMAL_DC_OFFSET": () => (/* binding */ DENORMAL_DC_OFFSET),
/* harmony export */   "PeriodicDenormalFlusher": () => (/* binding */ PeriodicDenormalFlusher),
/* harmony export */   "flushDenormal": () => (/* binding */ flushDenormal),
/* harmony export */   "flushDenormalState": () => (/* binding */ flushDenormalState),
/* harmony export */   "processSafeFromDenormals": () => (/* binding */ processSafeFromDenormals)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function flushDenormal(value) {
  var DENORMAL_THRESHOLD = 1e-20;
  return Math.abs(value) < DENORMAL_THRESHOLD ? 0 : value;
}
function flushDenormalState(values) {
  var DENORMAL_THRESHOLD = 1e-20;
  var flushed = false;
  for (var i = 0; i < values.length; i++) {
    if (Math.abs(values[i]) < DENORMAL_THRESHOLD) {
      values[i] = 0;
      flushed = true;
    }
  }
  return flushed;
}
var DENORMAL_DC_OFFSET = 1e-25;
function processSafeFromDenormals(processor, processMethod, input) {
  var injectDC = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (injectDC) {
    for (var i = 0; i < input.length; i++) {
      input[i] += DENORMAL_DC_OFFSET;
    }
  }
  var output = processMethod.call(processor, input);
  if (injectDC) {
    for (var _i = 0; _i < output.length; _i++) {
      output[_i] -= DENORMAL_DC_OFFSET;
    }
  }
  return output;
}
var PeriodicDenormalFlusher = /*#__PURE__*/function () {
  function PeriodicDenormalFlusher() {
    var checkInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;
    _classCallCheck(this, PeriodicDenormalFlusher);
    this.counter = 0;
    this.interval = checkInterval;
  }
  return _createClass(PeriodicDenormalFlusher, [{
    key: "shouldFlush",
    value: function shouldFlush() {
      return ++this.counter >= this.interval;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.counter = 0;
    }
  }, {
    key: "flushIfNeeded",
    value: function flushIfNeeded(stateVars) {
      if (this.shouldFlush()) {
        flushDenormalState(stateVars);
        this.reset();
      }
    }
  }]);
}();
var AdaptiveDenormalHandler = /*#__PURE__*/function () {
  function AdaptiveDenormalHandler() {
    var initialInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;
    _classCallCheck(this, AdaptiveDenormalHandler);
    this.counter = 0;
    this.denormalCount = 0;
    this.totalChecks = 0;
    this.minInterval = 32;
    this.maxInterval = 512;
    this.adaptThreshold = 0.1;
    this.checkInterval = initialInterval;
  }
  return _createClass(AdaptiveDenormalHandler, [{
    key: "checkAndFlush",
    value: function checkAndFlush(stateVars) {
      if (++this.counter < this.checkInterval) {
        return;
      }
      this.counter = 0;
      this.totalChecks++;
      if (flushDenormalState(stateVars)) {
        this.denormalCount++;
      }
      if (this.totalChecks % 16 === 0) {
        var denormalRate = this.denormalCount / this.totalChecks;
        if (denormalRate > this.adaptThreshold) {
          this.checkInterval = Math.max(this.minInterval, this.checkInterval / 2);
        } else if (denormalRate < this.adaptThreshold / 4) {
          this.checkInterval = Math.min(this.maxInterval, this.checkInterval * 2);
        }
        if (this.totalChecks >= 64) {
          this.denormalCount = 0;
          this.totalChecks = 0;
        }
      }
    }
  }, {
    key: "getCheckInterval",
    value: function getCheckInterval() {
      return this.checkInterval;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/index.ts":
/*!*************************************!*\
  !*** ./src/utils/enhancer/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdaptiveDenormalHandler": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.AdaptiveDenormalHandler),
/* harmony export */   "AdaptiveHarmonicExciter": () => (/* reexport safe */ _adaptive_harmonic_exciter__WEBPACK_IMPORTED_MODULE_5__.AdaptiveHarmonicExciter),
/* harmony export */   "AudioEnhancer": () => (/* reexport safe */ _audio_enhancer__WEBPACK_IMPORTED_MODULE_9__.AudioEnhancer),
/* harmony export */   "BiquadFilter": () => (/* reexport safe */ _biquad_filter__WEBPACK_IMPORTED_MODULE_1__.BiquadFilter),
/* harmony export */   "BrickwallLimiter": () => (/* reexport safe */ _brickwall_limiter__WEBPACK_IMPORTED_MODULE_7__.BrickwallLimiter),
/* harmony export */   "DENORMAL_DC_OFFSET": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.DENORMAL_DC_OFFSET),
/* harmony export */   "DeEsser": () => (/* reexport safe */ _de_esser__WEBPACK_IMPORTED_MODULE_4__.DeEsser),
/* harmony export */   "MetricsCalculator": () => (/* reexport safe */ _metrics_calculator__WEBPACK_IMPORTED_MODULE_2__.MetricsCalculator),
/* harmony export */   "NoiseGateExpander": () => (/* reexport safe */ _noise_gate_expander__WEBPACK_IMPORTED_MODULE_3__.NoiseGateExpander),
/* harmony export */   "PeriodicDenormalFlusher": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.PeriodicDenormalFlusher),
/* harmony export */   "SimpleCompressor": () => (/* reexport safe */ _simple_compressor__WEBPACK_IMPORTED_MODULE_6__.SimpleCompressor),
/* harmony export */   "flushDenormal": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.flushDenormal),
/* harmony export */   "flushDenormalState": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.flushDenormalState),
/* harmony export */   "processSafeFromDenormals": () => (/* reexport safe */ _denormal_handler__WEBPACK_IMPORTED_MODULE_8__.processSafeFromDenormals)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/utils/enhancer/types.ts");
/* harmony import */ var _biquad_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./biquad_filter */ "./src/utils/enhancer/biquad_filter.ts");
/* harmony import */ var _metrics_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metrics_calculator */ "./src/utils/enhancer/metrics_calculator.ts");
/* harmony import */ var _noise_gate_expander__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noise_gate_expander */ "./src/utils/enhancer/noise_gate_expander.ts");
/* harmony import */ var _de_esser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./de_esser */ "./src/utils/enhancer/de_esser.ts");
/* harmony import */ var _adaptive_harmonic_exciter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adaptive_harmonic_exciter */ "./src/utils/enhancer/adaptive_harmonic_exciter.ts");
/* harmony import */ var _simple_compressor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./simple_compressor */ "./src/utils/enhancer/simple_compressor.ts");
/* harmony import */ var _brickwall_limiter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./brickwall_limiter */ "./src/utils/enhancer/brickwall_limiter.ts");
/* harmony import */ var _denormal_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./denormal_handler */ "./src/utils/enhancer/denormal_handler.ts");
/* harmony import */ var _audio_enhancer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./audio_enhancer */ "./src/utils/enhancer/audio_enhancer.ts");











/***/ }),

/***/ "./src/utils/enhancer/metrics_calculator.ts":
/*!**************************************************!*\
  !*** ./src/utils/enhancer/metrics_calculator.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MetricsCalculator": () => (/* binding */ MetricsCalculator)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function linearToDb(x) {
  return 20 * Math.log10(Math.max(x, 1e-12));
}
var MetricsCalculator = /*#__PURE__*/function () {
  function MetricsCalculator() {
    var sampleRate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 48000;
    var tau = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.300;
    _classCallCheck(this, MetricsCalculator);
    this.peakLevel = 0;
    this.power = 0;
    this.rmsCache = 0;
    this.rmsDirty = true;
    this.metricsCache = {
      peak: 0,
      rms: 0,
      peakDb: -Infinity,
      rmsDb: -Infinity
    };
    this.ln10 = Math.log(10);
    this.rmsDbFloor = -120;
    this.powerEps = 1e-12;
    this.peakDecayBase = 0.9999;
    this.lnPeakDecayBase = Math.log(0.9999);
    this.alpha = 1 - Math.exp(-1 / (tau * sampleRate));
    this.invAlpha = 1 - this.alpha;
  }
  return _createClass(MetricsCalculator, [{
    key: "update",
    value: function update(sample) {
      var abs = Math.abs(sample);
      this.peakLevel = Math.max(this.peakLevel * this.peakDecayBase, abs);
      var sq = sample * sample;
      this.power = this.invAlpha * this.power + this.alpha * sq;
      this.rmsDirty = true;
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(buffer) {
      var len = buffer.length;
      var peak = this.peakLevel;
      var power = this.power;
      var a = this.alpha,
        ia = this.invAlpha;
      var decay = Math.exp(this.lnPeakDecayBase * len);
      peak *= decay;
      var i = 0;
      var n4 = len & ~3;
      for (; i < n4; i += 4) {
        var s = buffer[i];
        var ab = Math.abs(s);
        if (ab > peak) peak = ab;
        power = ia * power + a * (s * s);
        s = buffer[i + 1];
        ab = Math.abs(s);
        if (ab > peak) peak = ab;
        power = ia * power + a * (s * s);
        s = buffer[i + 2];
        ab = Math.abs(s);
        if (ab > peak) peak = ab;
        power = ia * power + a * (s * s);
        s = buffer[i + 3];
        ab = Math.abs(s);
        if (ab > peak) peak = ab;
        power = ia * power + a * (s * s);
      }
      for (; i < len; i++) {
        var _s = buffer[i];
        var _ab = Math.abs(_s);
        if (_ab > peak) peak = _ab;
        power = ia * power + a * (_s * _s);
      }
      this.peakLevel = peak;
      this.power = power;
      this.rmsDirty = true;
    }
  }, {
    key: "getMetrics",
    value: function getMetrics() {
      var rms = this.getRMSLevel();
      this.metricsCache.peak = this.peakLevel;
      this.metricsCache.rms = rms;
      this.metricsCache.peakDb = linearToDb(this.peakLevel);
      var db = 10 * Math.log(Math.max(this.power, this.powerEps)) / this.ln10;
      this.metricsCache.rmsDb = isFinite(db) ? db : this.rmsDbFloor;
      return this.metricsCache;
    }
  }, {
    key: "getAutoGain",
    value: function getAutoGain() {
      var targetDb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -12;
      var targetRMS = Math.pow(10, targetDb / 20);
      var cur = Math.max(this.getRMSLevel(), 1e-10);
      var gain = targetRMS / cur;
      return Math.max(0.1, Math.min(gain, 10.0));
    }
  }, {
    key: "getPeakLevel",
    value: function getPeakLevel() {
      return this.peakLevel;
    }
  }, {
    key: "getRMSLevel",
    value: function getRMSLevel() {
      if (this.rmsDirty) {
        this.rmsCache = Math.sqrt(this.power);
        this.rmsDirty = false;
      }
      return this.rmsCache;
    }
  }, {
    key: "getPeakDb",
    value: function getPeakDb() {
      return linearToDb(this.peakLevel);
    }
  }, {
    key: "getRmsDb",
    value: function getRmsDb() {
      return 10 * Math.log(Math.max(this.power, this.powerEps)) / this.ln10;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.peakLevel = 0;
      this.power = 0;
      this.rmsCache = 0;
      this.rmsDirty = true;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/noise_gate_expander.ts":
/*!***************************************************!*\
  !*** ./src/utils/enhancer/noise_gate_expander.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoiseGateExpander": () => (/* binding */ NoiseGateExpander)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NoiseGateExpander = /*#__PURE__*/function () {
  function NoiseGateExpander(sampleRate, options) {
    _classCallCheck(this, NoiseGateExpander);
    var _a, _b;
    this.threshold = -55;
    this.ratio = 1.4;
    this.env = 0;
    this.gain = 1;
    this.thrOpenLin = 0;
    this.thrCloseLin = 0;
    this.kneeWidthLinBase = 0;
    this.kneeScale = 1;
    this.floorGain = 0.1;
    this.envAtk = Math.exp(-1 / (0.001 * sampleRate));
    this.envRel = Math.exp(-1 / (0.3 * sampleRate));
    this.gainAtk = Math.exp(-1 / (0.005 * sampleRate));
    this.gainRel = Math.exp(-1 / (0.2 * sampleRate));
    var hysteresisDb = 3;
    var floorDb = (_a = options === null || options === void 0 ? void 0 : options.reduction) !== null && _a !== void 0 ? _a : -20;
    var thrLin = Math.pow(10, ((_b = options === null || options === void 0 ? void 0 : options.threshold) !== null && _b !== void 0 ? _b : this.threshold) / 20);
    var halfHys = Math.pow(10, hysteresisDb / 2 / 20);
    this.thrOpenLin = thrLin * halfHys;
    this.thrCloseLin = thrLin / halfHys;
    this.kneeWidthLinBase = this.thrOpenLin - this.thrCloseLin;
    this.floorGain = Math.pow(10, floorDb / 20);
    var r = Math.max(1, this.ratio);
    this.kneeScale = 1 / r;
  }
  return _createClass(NoiseGateExpander, [{
    key: "process",
    value: function process(input) {
      var level = Math.abs(input);
      var cEnv = level > this.env ? this.envAtk : this.envRel;
      this.env += (level - this.env) * (1 - cEnv);
      this.env = NoiseGateExpander.clampDenorm(this.env);
      var target = 1.0;
      var kneeWidthLin = Math.max(1e-12, this.kneeWidthLinBase * this.kneeScale);
      if (this.env <= this.thrCloseLin) {
        target = this.floorGain;
      } else if (this.env < this.thrOpenLin) {
        var t = (this.env - this.thrCloseLin) / kneeWidthLin;
        target = this.floorGain + t * (1 - this.floorGain);
      } else {
        target = 1.0;
      }
      var cGain = target < this.gain ? this.gainAtk : this.gainRel;
      this.gain += (target - this.gain) * (1 - cGain);
      var out = input * this.gain;
      return NoiseGateExpander.clampDenorm(out);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.env = 0;
      this.gain = 1;
    }
  }], [{
    key: "clampDenorm",
    value: function clampDenorm(x) {
      return x > -1e-20 && x < 1e-20 ? 0 : x;
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/enhancer/simple_compressor.ts":
/*!*************************************************!*\
  !*** ./src/utils/enhancer/simple_compressor.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleCompressor": () => (/* binding */ SimpleCompressor)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SimpleCompressor = /*#__PURE__*/function () {
  function SimpleCompressor(sampleRate, options) {
    _classCallCheck(this, SimpleCompressor);
    var _a, _b, _c, _d, _e, _f;
    this.envelope = 0;
    this.threshold = -12;
    this.ratio = 4;
    this.attack = 0;
    this.release = 0;
    this.softKnee = 0;
    this.makeupGain = 1;
    this.LUT_SIZE = 2048;
    this.DB_MIN = -80;
    this.DB_MAX = 10;
    var attackMs = (_a = options === null || options === void 0 ? void 0 : options.attackMs) !== null && _a !== void 0 ? _a : 3;
    var releaseMs = (_b = options === null || options === void 0 ? void 0 : options.releaseMs) !== null && _b !== void 0 ? _b : 120;
    this.attack = Math.exp(-1 / (attackMs / 1000 * sampleRate));
    this.release = Math.exp(-1 / (releaseMs / 1000 * sampleRate));
    this.threshold = (_c = options === null || options === void 0 ? void 0 : options.threshold) !== null && _c !== void 0 ? _c : -12;
    this.ratio = (_d = options === null || options === void 0 ? void 0 : options.ratio) !== null && _d !== void 0 ? _d : 4;
    this.softKnee = Math.max(0, (_e = options === null || options === void 0 ? void 0 : options.softKnee) !== null && _e !== void 0 ? _e : 0);
    if (options === null || options === void 0 ? void 0 : options.autoMakeup) {
      var makeupDb = Math.min(6, (1 - 1 / this.ratio) * 6);
      this.makeupGain = this.dbToLinearRaw(makeupDb);
    } else {
      var mk = (_f = options === null || options === void 0 ? void 0 : options.makeupGainDb) !== null && _f !== void 0 ? _f : 1.2;
      this.makeupGain = typeof mk === 'number' && Math.abs(mk) < 24 ? this.dbToLinearRaw(mk) : 1.15;
    }
    this.dbRange = this.DB_MAX - this.DB_MIN;
    this.invDbRange = 1 / this.dbRange;
    this.buildLUT();
  }
  return _createClass(SimpleCompressor, [{
    key: "buildLUT",
    value: function buildLUT() {
      this.dbToLinearLUT = new Float32Array(this.LUT_SIZE);
      for (var i = 0; i < this.LUT_SIZE; i++) {
        var db = this.DB_MIN + i / (this.LUT_SIZE - 1) * this.dbRange;
        this.dbToLinearLUT[i] = Math.pow(10, db / 20);
      }
    }
  }, {
    key: "dbToLinear",
    value: function dbToLinear(db) {
      var clampedDb = db < this.DB_MIN ? this.DB_MIN : db > this.DB_MAX ? this.DB_MAX : db;
      var normalized = (clampedDb - this.DB_MIN) * this.invDbRange;
      var idx = normalized * (this.LUT_SIZE - 1);
      var i0 = idx | 0;
      var i1 = i0 + 1 < this.LUT_SIZE ? i0 + 1 : i0;
      var t = idx - i0;
      return this.dbToLinearLUT[i0] * (1 - t) + this.dbToLinearLUT[i1] * t;
    }
  }, {
    key: "dbToLinearRaw",
    value: function dbToLinearRaw(db) {
      return Math.pow(10, db / 20);
    }
  }, {
    key: "process",
    value: function process(input) {
      var abs = SimpleCompressor.fastAbs(input) + SimpleCompressor.EPS;
      var env = this.envelope;
      this.envelope = abs > env ? abs + (env - abs) * this.attack : abs + (env - abs) * this.release;
      var dbLevel = 20 * Math.log(this.envelope) * SimpleCompressor.INV_LN10;
      var gainDb = 0;
      if (this.softKnee <= 0) {
        if (dbLevel > this.threshold) {
          var over = dbLevel - this.threshold;
          gainDb = -over * (1 - 1 / this.ratio);
        }
      } else {
        var k = this.softKnee;
        var x = dbLevel - this.threshold;
        if (x <= -k / 2) {
          gainDb = 0;
        } else if (x >= k / 2) {
          gainDb = -x * (1 - 1 / this.ratio);
        } else {
          var t = (x + k / 2) / k;
          var hard = -x * (1 - 1 / this.ratio);
          gainDb = hard * t * t;
        }
      }
      var gain = this.dbToLinear(gainDb);
      if (gain < 0) gain = 0;
      if (gain > 1.5) gain = 1.5;
      return input * gain * this.makeupGain;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.envelope = 0;
    }
  }], [{
    key: "fastAbs",
    value: function fastAbs(x) {
      return x < 0 ? -x : x;
    }
  }]);
}();
SimpleCompressor.EPS = 1e-12;
SimpleCompressor.INV_LN10 = 1 / Math.log(10);

/***/ }),

/***/ "./src/utils/enhancer/types.ts":
/*!*************************************!*\
  !*** ./src/utils/enhancer/types.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/utils/resampler.ts":
/*!********************************!*\
  !*** ./src/utils/resampler.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resampler": () => (/* binding */ Resampler)
/* harmony export */ });
/* harmony import */ var _buffers_bufferPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffers/bufferPool */ "./src/utils/buffers/bufferPool.ts");
/* harmony import */ var _buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffers/ringBuffer */ "./src/utils/buffers/ringBuffer.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Resampler = /*#__PURE__*/function () {
  function Resampler(inputSampleRate, outputSampleRate, options) {
    _classCallCheck(this, Resampler);
    var _a, _b;
    this.fractionalIndex = 0;
    this.destroyed = false;
    if (!(inputSampleRate > 0) || !(outputSampleRate > 0)) {
      throw new Error("Sample rates must be > 0");
    }
    this.inputSampleRate = inputSampleRate;
    this.outputSampleRate = outputSampleRate;
    this.ratio = this.inputSampleRate / this.outputSampleRate;
    this.pool = (_a = options === null || options === void 0 ? void 0 : options.pool) !== null && _a !== void 0 ? _a : new _buffers_bufferPool__WEBPACK_IMPORTED_MODULE_0__.BufferPool('resampler');
    var cap = (_b = options === null || options === void 0 ? void 0 : options.ringCapacity) !== null && _b !== void 0 ? _b : Math.ceil(this.inputSampleRate * 0.25);
    this.ring = new _buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_1__.RingBuffer(Math.max(4, cap));
  }
  return _createClass(Resampler, [{
    key: "feed",
    value: function feed(inputBlock, outputPool) {
      this.ensureAlive();
      if (!inputBlock || inputBlock.length === 0) return new Float32Array(0);
      if (this.ratio === 1) return inputBlock.slice();
      this.ring.push(inputBlock);
      if (this.ring.framesAvailable < 2) return new Float32Array(0);
      var available = this.ring.framesAvailable;
      var combined = this.pool.getBuffer("f32", available);
      this.ring.pull(combined);
      var maxOut = Math.floor((combined.length - 1 - this.fractionalIndex) / this.ratio);
      if (maxOut <= 0) {
        this.ring.push(combined);
        this.pool.returnBuffer(combined);
        return new Float32Array(0);
      }
      var out = outputPool ? outputPool.getBuffer('f32', maxOut) : new Float32Array(maxOut);
      var pos = this.fractionalIndex;
      for (var o = 0; o < maxOut; o++) {
        var iPos = Math.floor(pos);
        var alpha = pos - iPos;
        var s0 = combined[iPos];
        var s1 = combined[iPos + 1];
        out[o] = s0 + (s1 - s0) * alpha;
        pos += this.ratio;
      }
      var consumedUpTo = Math.floor(pos);
      if (consumedUpTo < combined.length) {
        this.ring.push(combined.subarray(consumedUpTo));
        this.fractionalIndex = pos - consumedUpTo;
      } else {
        this.fractionalIndex = 0;
      }
      this.pool.returnBuffer(combined);
      return out;
    }
  }, {
    key: "feedBuffer",
    value: function feedBuffer(inputBlock) {
      this.ensureAlive();
      if (!inputBlock || inputBlock.length === 0) return new Float32Array(0);
      if (this.ratio === 1) return inputBlock.slice();
      if (inputBlock.length < 2) return new Float32Array(0);
      var maxOut = Math.floor((inputBlock.length - 1) / this.ratio);
      if (maxOut <= 0) return new Float32Array(0);
      var out = new Float32Array(maxOut);
      var pos = 0;
      for (var o = 0; o < maxOut; o++) {
        var iPos = Math.floor(pos);
        var alpha = pos - iPos;
        var s0 = inputBlock[iPos];
        var s1 = inputBlock[iPos + 1];
        out[o] = s0 + (s1 - s0) * alpha;
        pos += this.ratio;
      }
      return out;
    }
  }, {
    key: "flush",
    value: function flush() {
      var zeroPadTail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _a, _b;
      this.ensureAlive();
      if (this.ratio === 1) {
        var _available = this.ring.framesAvailable;
        var _out = new Float32Array(_available);
        this.ring.pull(_out);
        this.resetState();
        return _out;
      }
      var available = this.ring.framesAvailable;
      var combined = this.pool.getBuffer("f32", available);
      this.ring.pull(combined);
      var theoretical = (combined.length - 1 - this.fractionalIndex) / this.ratio;
      var maxOut = Math.floor(Math.max(0, theoretical));
      var allowPaddedLast = false;
      if (zeroPadTail) {
        var canMakeOneMore = this.fractionalIndex + maxOut * this.ratio <= combined.length - 0.000001;
        var posAfter = this.fractionalIndex + maxOut * this.ratio;
        if (posAfter > combined.length - 1 - 1e-6 && posAfter <= combined.length - 1 + 1e-6) {
          allowPaddedLast = true;
        }
      }
      var outLen = maxOut + (allowPaddedLast ? 1 : 0);
      var out = new Float32Array(outLen);
      var pos = this.fractionalIndex;
      var o = 0;
      for (; o < maxOut; o++) {
        var iPos = Math.floor(pos);
        var alpha = pos - iPos;
        var s0 = combined[iPos];
        var s1 = combined[iPos + 1];
        out[o] = s0 + (s1 - s0) * alpha;
        pos += this.ratio;
      }
      if (allowPaddedLast) {
        var _iPos = Math.min(Math.floor(pos), Math.max(0, combined.length - 1));
        var _alpha = pos - _iPos;
        var _s = (_a = combined[_iPos]) !== null && _a !== void 0 ? _a : 0;
        var _s2 = (_b = combined[_iPos + 1]) !== null && _b !== void 0 ? _b : 0;
        out[o++] = _s + (_s2 - _s) * _alpha;
        pos += this.ratio;
      }
      this.resetState();
      this.pool.returnBuffer(combined);
      return out;
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.fractionalIndex = 0;
      var n = this.ring.framesAvailable;
      if (n > 0) {
        var tmp = this.pool.getBuffer("f32", n);
        this.ring.pull(tmp);
        this.pool.returnBuffer(tmp);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.destroyed) return;
      this.resetState();
      this.destroyed = true;
    }
  }, {
    key: "ensureAlive",
    value: function ensureAlive() {
      if (this.destroyed) throw new Error("Resampler is destroyed");
    }
  }]);
}();

/***/ }),

/***/ "./src/utils/speedup_speech.ts":
/*!*************************************!*\
  !*** ./src/utils/speedup_speech.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpeedupSpeech": () => (/* binding */ SpeedupSpeech)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SpeedupSpeech = /*#__PURE__*/function () {
  function SpeedupSpeech(windowSize, overlapSize) {
    _classCallCheck(this, SpeedupSpeech);
    this.storageFill = 0;
    this.storagePos = 0;
    this.currentSampleIndex = 0;
    this.droppedCounter = 0;
    this.windowSize = windowSize;
    this._overlapSize = overlapSize;
    this.storageBuffer = new Float32Array(overlapSize);
    this.tempBuffer = new Float32Array(windowSize);
  }
  return _createClass(SpeedupSpeech, [{
    key: "overlapSize",
    get: function get() {
      return this._overlapSize;
    }
  }, {
    key: "process",
    value: function process(input, output) {
      if (output.length < input.length) {
        throw Error("Output buffer must not be shorter than input buffer");
      }
      this.currentInput = input;
      this.currentInputPos = 0;
      this.droppedCounter = 0;
      var written = 0;
      while (true) {
        var lastWritten = this.processChunk(output, written);
        written += lastWritten;
        if (lastWritten < 1) {
          break;
        }
      }
      if (this.inInput > 0) {
        var remainder = this.readInput(this.inInput, true);
        this.putStorage(remainder);
      }
      this.currentInput = null;
      return written;
    }
  }, {
    key: "droppedByLastRun",
    get: function get() {
      return this.droppedCounter;
    }
  }, {
    key: "flush",
    value: function flush() {
      var leftovers = this.readStorage(this.inStorage, true);
      this.reset();
      return leftovers;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.storageFill = 0;
      this.storagePos = 0;
      this.currentSampleIndex = 0;
      this.droppedCounter = 0;
    }
  }, {
    key: "processChunk",
    value: function processChunk(output, outputPos) {
      if (this.isWithinOverlapPos) {
        return this.crossfadeChunk(output, outputPos);
      }
      var beforeNextWindow = this.windowSize - this.windowPos;
      var availableToCopy = Math.min(beforeNextWindow, this.available);
      var remainedOutputCapacity = output.length - outputPos;
      var copySize = Math.min(availableToCopy, remainedOutputCapacity);
      if (copySize < 1) {
        return 0;
      }
      var samples = this.pull(copySize);
      output.set(samples, outputPos);
      this.onProcessed(copySize);
      return copySize;
    }
  }, {
    key: "crossfadeChunk",
    value: function crossfadeChunk(output, outputPos) {
      if (this.available < this.overlapSize + 1) {
        return 0;
      }
      var overlapStart = this.windowPos;
      var overlapCount = Math.min(this.available - this.overlapSize, this.overlapSize - overlapStart);
      var isOverlapFinished = overlapStart + overlapCount >= this.overlapSize;
      var first = this.pull(overlapCount);
      var second = isOverlapFinished ? this.pull(this.overlapSize) : this.peek(this.overlapSize);
      var secondOffset = this.overlapSize - overlapCount;
      for (var i = 0; i < overlapCount; ++i) {
        var fadeIn = (i + overlapStart) / this.overlapSize;
        var fadeOut = 1 - fadeIn;
        output[outputPos++] = first[i] * fadeOut + second[i + secondOffset] * fadeIn;
      }
      this.droppedCounter += overlapCount;
      this.onProcessed(overlapCount);
      if (isOverlapFinished) {
        this.onProcessed(this.overlapSize);
      }
      return overlapCount;
    }
  }, {
    key: "windowPos",
    get: function get() {
      return this.currentSampleIndex % this.windowSize;
    }
  }, {
    key: "isWithinOverlapPos",
    get: function get() {
      return this.windowPos < this.overlapSize * 2;
    }
  }, {
    key: "onProcessed",
    value: function onProcessed(num) {
      this.currentSampleIndex += num;
    }
  }, {
    key: "available",
    get: function get() {
      return this.inStorage + this.inInput;
    }
  }, {
    key: "pull",
    value: function pull(num) {
      return this.read(num, true);
    }
  }, {
    key: "peek",
    value: function peek(num) {
      return this.read(num, false);
    }
  }, {
    key: "read",
    value: function read(num, pullMode) {
      if (this.inStorage < 1) {
        return this.readInput(num, pullMode);
      }
      var first = this.readStorage(num, pullMode);
      if (first.length >= num) {
        return first;
      }
      var second = this.readInput(num - first.length, pullMode);
      this.tempBuffer.set(first);
      this.tempBuffer.set(second, first.length);
      return this.tempBuffer.subarray(0, first.length + second.length);
    }
  }, {
    key: "inInput",
    get: function get() {
      return this.currentInput.length - this.currentInputPos;
    }
  }, {
    key: "readInput",
    value: function readInput(num, pullMode) {
      var pos = this.currentInputPos;
      var endPos = Math.min(pos + num, this.currentInput.length);
      if (pullMode) {
        this.currentInputPos = endPos;
      }
      return this.currentInput.subarray(pos, endPos);
    }
  }, {
    key: "inStorage",
    get: function get() {
      return this.storageFill - this.storagePos;
    }
  }, {
    key: "readStorage",
    value: function readStorage(num, pullMode) {
      var pos = this.storagePos;
      var endPos = Math.min(this.storagePos + num, this.storageFill);
      if (pullMode) {
        this.storagePos = endPos;
      }
      return this.storageBuffer.subarray(pos, endPos);
    }
  }, {
    key: "putStorage",
    value: function putStorage(samples) {
      var remainder = this.inStorage;
      this.storageBuffer.copyWithin(0, this.storagePos, remainder);
      this.storageBuffer.set(samples, remainder);
      this.storagePos = 0;
      this.storageFill = remainder + samples.length;
    }
  }], [{
    key: "makeForSampleRate",
    value: function makeForSampleRate(sampleRate) {
      var windowSize = Math.round(sampleRate / 16000 * 2048);
      var overlapSize = Math.round(windowSize / 5);
      return new SpeedupSpeech(windowSize, overlapSize);
    }
  }]);
}();

/***/ }),

/***/ "./src/workers/postmessageTypes.ts":
/*!*****************************************!*\
  !*** ./src/workers/postmessageTypes.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/workers/worklet_processor.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/buffers/ringBuffer */ "./src/utils/buffers/ringBuffer.ts");
/* harmony import */ var _utils_buffers_bufferPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/buffers/bufferPool */ "./src/utils/buffers/bufferPool.ts");
/* harmony import */ var _utils_resampler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/resampler */ "./src/utils/resampler.ts");
/* harmony import */ var _utils_speedup_speech__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/speedup_speech */ "./src/utils/speedup_speech.ts");
/* harmony import */ var _utils_enhancer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/enhancer */ "./src/utils/enhancer/index.ts");
/* harmony import */ var _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./postmessageTypes */ "./src/workers/postmessageTypes.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }






var WorkletProcessor = /*#__PURE__*/function (_AudioWorkletProcesso) {
  function WorkletProcessor(options) {
    var _this;
    _classCallCheck(this, WorkletProcessor);
    _this = _callSuper(this, WorkletProcessor);
    _this._studioSoundEnabled = false;
    _this._needProcessing = false;
    _this._modelSampleRate = 48000;
    _this._processingChunkInMs = 64;
    _this._processingChunk = 512;
    _this._delayedFramesThreshold = 0;
    _this._prevDelayCheckTimestamp = 0;
    _this._delayCheckIntervalSecs = 3;
    _this._minAvailableFramesForInterval = 0;
    _this._samplesToReduce = 0;
    _this._samplesInWorker = 0;
    _this._lastMetricsTimestamp = 0;
    _this._metricsIntervalSecs = 0.1;
    _this._needResampling = false;
    _this._speedupSpeechDroppedSum = 0;
    _this._fadeInOutSize = 64;
    _this._fadeSampleIndex = 0;
    _this._returnBuffers = [];
    if (options.processorOptions.processingChunk) {
      _this._processingChunkInMs = options.processorOptions.processingChunk;
    }
    if (options.processorOptions.studioSound) {
      _this._studioSoundEnabled = true;
    }
    _this._metricsCalculator = new _utils_enhancer__WEBPACK_IMPORTED_MODULE_4__.MetricsCalculator(sampleRate);
    _this._enhancer = new _utils_enhancer__WEBPACK_IMPORTED_MODULE_4__.AudioEnhancer(sampleRate);
    _this._enhancer.setMetricsCalculator(_this._metricsCalculator);
    _this._modelSampleRate = sampleRate;
    _this._processingChunk = Math.round(_this._processingChunkInMs / 1000 * sampleRate);
    _this.updateResampling();
    _this.initBuffers();
    _this.port.onmessage = _this.onMessage.bind(_this);
    _this._bufferPool = new _utils_buffers_bufferPool__WEBPACK_IMPORTED_MODULE_1__.BufferPool('worklet');
    _this.port.postMessage({
      type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.INFO,
      message: 'Worklet Processor is enabled from smaple rate: ' + sampleRate + 'Hz, processing chunk: ' + _this._processingChunkInMs + 'ms.'
    });
    return _this;
  }
  _inherits(WorkletProcessor, _AudioWorkletProcesso);
  return _createClass(WorkletProcessor, [{
    key: "updateResampling",
    value: function updateResampling() {
      this._needResampling = false;
      this._speedupSpeech = _utils_speedup_speech__WEBPACK_IMPORTED_MODULE_3__.SpeedupSpeech.makeForSampleRate(sampleRate);
      this._speedupSpeechBuffer = new Float32Array(0);
      if (this._modelSampleRate !== sampleRate) {
        this._needResampling = true;
        this._inputResampler = new _utils_resampler__WEBPACK_IMPORTED_MODULE_2__.Resampler(sampleRate, this._modelSampleRate);
        this._outputResampler = new _utils_resampler__WEBPACK_IMPORTED_MODULE_2__.Resampler(this._modelSampleRate, sampleRate);
        this.port.postMessage({
          type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.INFO,
          message: 'Resampling is enabled from ' + sampleRate + 'Hz to ' + this._modelSampleRate + 'Hz.'
        });
      }
    }
  }, {
    key: "initBuffers",
    value: function initBuffers() {
      this._inputRingBuffer = new _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__.RingBuffer(this.maxRingBufferSize);
      this._outputRingBuffer = new _utils_buffers_ringBuffer__WEBPACK_IMPORTED_MODULE_0__.RingBuffer(this.maxRingBufferSize);
    }
  }, {
    key: "onMessage",
    value: function onMessage(event) {
      if (!event.data.type) return;
      switch (event.data.type) {
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.START_PROCESSING:
          this._samplesInWorker = 0;
          this._minAvailableFramesForInterval = 0;
          this.initBuffers();
          this._needProcessing = true;
          break;
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.STOP_PROCESSING:
          this._needProcessing = false;
          this.initBuffers();
          this._fadeSampleIndex = 0;
          this._samplesToReduce = 0;
          this._speedupSpeechDroppedSum = 0;
          this._samplesInWorker = 0;
          this._minAvailableFramesForInterval = 0;
          this._inputResampler.resetState();
          this._outputResampler.resetState();
          break;
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.MODEL_SAMPLE_RATE:
          this._modelSampleRate = event.data.sampleRate;
          this.updateResampling();
          break;
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.WORKER_PORT:
          if (this._workerPort) this._workerPort.close();
          this._workerPort = event.data.workerPort;
          this._workerPort.onmessage = this.onWorkerMessage.bind(this);
          break;
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.STUDIO_SOUND_OPTIONS:
          if (event.data.options.enabled !== undefined) {
            this._studioSoundEnabled = event.data.options.enabled;
          }
          if (event.data.options.options !== undefined) {
            this._enhancer.setOptions(event.data.options.options);
          }
          break;
        case _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.DBG_PUSH_SILENCE:
          var sampleCount = Math.ceil(event.data.durationMs * sampleRate / 1000);
          var silence = new Float32Array(sampleCount);
          this._outputRingBuffer.push(silence);
          break;
        default:
          console.log("Not supported message type: ".concat(event.data.type));
      }
    }
  }, {
    key: "onWorkerMessage",
    value: function onWorkerMessage(event) {
      if (!event.data.frames) return;
      var _event$data = event.data,
        frames = _event$data.frames,
        returnBuffers = _event$data.returnBuffers;
      if (returnBuffers === null || returnBuffers === void 0 ? void 0 : returnBuffers.length) {
        for (var i = 0; i < (returnBuffers === null || returnBuffers === void 0 ? void 0 : returnBuffers.length); i++) {
          this._bufferPool.returnBuffer(returnBuffers[i]);
        }
      }
      if (this._needResampling) {
        var resampledChunk = this._outputResampler.feed(event.data.frames, this._bufferPool);
        this.onReceivedSamples(resampledChunk);
        this._bufferPool.returnBuffer(resampledChunk);
      } else {
        this.onReceivedSamples(frames);
      }
      this._returnBuffers.push(frames);
    }
  }, {
    key: "onReceivedSamples",
    value: function onReceivedSamples(samples) {
      this._samplesInWorker -= samples.length;
      if (!this._needProcessing) return;
      if (this._samplesToReduce >= this.minAcceptableReduceSize) {
        if (this._speedupSpeechBuffer.length < samples.length) {
          this._speedupSpeechBuffer = new Float32Array(samples.length);
        }
        var size = this._speedupSpeech.process(samples, this._speedupSpeechBuffer);
        this._outputRingBuffer.push(this._speedupSpeechBuffer.subarray(0, size));
        this._samplesToReduce = Math.max(this._samplesToReduce - this._speedupSpeech.droppedByLastRun, 0);
        this._speedupSpeechDroppedSum += this._speedupSpeech.droppedByLastRun;
      } else {
        this._outputRingBuffer.push(samples);
      }
      var isSpeedupSpeechFinished = this._speedupSpeechDroppedSum > 0 && this._samplesToReduce < this.minAcceptableReduceSize;
      if (isSpeedupSpeechFinished) {
        var leftovers = this._speedupSpeech.flush();
        this._outputRingBuffer.push(leftovers);
        this.port.postMessage({
          type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.SPEEDUP_VOICE,
          time: Math.round(this._speedupSpeechDroppedSum / sampleRate * 1000)
        });
        this._speedupSpeechDroppedSum = 0;
      }
    }
  }, {
    key: "process",
    value: function process(inputs, outputs) {
      var _a;
      if (!inputs || inputs[0].length === 0 || inputs[0][0].length === 0) {
        if ((_a = outputs === null || outputs === void 0 ? void 0 : outputs[0]) === null || _a === void 0 ? void 0 : _a[0]) outputs[0][0].fill(0);
        return true;
      }
      var input = inputs[0][0];
      var output = outputs[0][0];
      if (!this._needProcessing) {
        if (output && input) {
          if (this._studioSoundEnabled && this._enhancer) {
            output.set(this._enhancer.process(input));
          } else {
            output.set(input);
          }
        }
        if (this._metricsCalculator) {
          this._metricsCalculator.updateBuffer(output);
        }
        this.sendMetricsIfNeeded();
        return true;
      }
      this._inputRingBuffer.push(input);
      this.tryPostNextChunk();
      this.pullOutputAudio(output);
      this._minAvailableFramesForInterval = Math.min(this._outputRingBuffer.framesAvailable, this._minAvailableFramesForInterval);
      var currentTimeStamp = currentTime;
      if (currentTimeStamp - this._prevDelayCheckTimestamp > this._delayCheckIntervalSecs) {
        this._samplesToReduce = Math.max(this._minAvailableFramesForInterval - this.irreducibleDelaySize, 0);
        this._prevDelayCheckTimestamp = currentTimeStamp;
        this._minAvailableFramesForInterval = this._outputRingBuffer.framesAvailable;
      }
      if (this._samplesInWorker > this.delayedFramesThreshold) {
        this._needProcessing = false;
        this.port.postMessage({
          type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.PERFORMANCE_STOP,
          latency: this.delayedFrameNum * 1000 / sampleRate,
          sampleRate: sampleRate
        });
      }
      this.sendMetricsIfNeeded();
      return true;
    }
  }, {
    key: "pullOutputAudio",
    value: function pullOutputAudio(output) {
      var available = this._outputRingBuffer.framesAvailable;
      if (available < 1) {
        output.fill(0);
        return;
      }
      this._outputRingBuffer.pull(output);
      var remainedSamples = this._outputRingBuffer.framesAvailable;
      var maxFadeIn = Math.max(this._fadeInOutSize - remainedSamples, 0);
      var fadeInStartOffset = Math.max(available - this._fadeInOutSize, 0);
      var toFadeIn = Math.min(maxFadeIn, this._fadeInOutSize - this._fadeSampleIndex, output.length - fadeInStartOffset);
      var fadeMul = 1 / (this._fadeInOutSize - 1);
      for (var i = 0; i < toFadeIn; ++i) {
        var fadeIndex = this._fadeSampleIndex++;
        output[i + fadeInStartOffset] *= 1 - fadeIndex * fadeMul;
      }
      var isFadingIn = remainedSamples < this._fadeInOutSize;
      var isNeedToFillRemainder = isFadingIn && toFadeIn + fadeInStartOffset < output.length;
      if (isNeedToFillRemainder) {
        output.fill(0, toFadeIn + fadeInStartOffset);
      }
      var toFadeOut = Math.min(remainedSamples - this._fadeInOutSize, this._fadeSampleIndex, output.length);
      for (var i = 0; i < toFadeOut; ++i) {
        var _fadeIndex = this._fadeSampleIndex--;
        output[i] *= 1 - _fadeIndex * fadeMul;
      }
      if (this._studioSoundEnabled && this._enhancer) {
        output.set(this._enhancer.process(output));
      }
      this._metricsCalculator.updateBuffer(output);
    }
  }, {
    key: "sendMetricsIfNeeded",
    value: function sendMetricsIfNeeded() {
      if (!this._metricsCalculator) return;
      var currentTimeStamp = currentTime;
      if (currentTimeStamp - this._lastMetricsTimestamp > this._metricsIntervalSecs) {
        var metrics = this._metricsCalculator.getMetrics();
        this.port.postMessage({
          type: _postmessageTypes__WEBPACK_IMPORTED_MODULE_5__.WORKLET_PROCESSOR_POSTMESSAGE_TYPE.STUDIO_AUDIO_METRICS,
          metrics: metrics
        });
        this._lastMetricsTimestamp = currentTimeStamp;
      }
    }
  }, {
    key: "tryPostNextChunk",
    value: function tryPostNextChunk() {
      if (!this._workerPort) return;
      if (this._inputRingBuffer.framesAvailable < this._processingChunk) {
        return;
      }
      if (this._samplesInWorker + this._processingChunk > this.maxRingBufferSize) {
        this._inputRingBuffer.drop(this._processingChunk);
        return;
      }
      var chunk = this._bufferPool.getBuffer('f32', this._processingChunk);
      this._inputRingBuffer.pull(chunk);
      this._samplesInWorker += chunk.length;
      if (this._needResampling) {
        var resampledChunk = this._inputResampler.feed(chunk, this._bufferPool);
        this._bufferPool.returnBuffer(chunk);
        chunk = resampledChunk;
      }
      if (this._returnBuffers.length) {
        this._workerPort.postMessage({
          frames: chunk,
          returnBuffers: this._returnBuffers
        }, [chunk.buffer].concat(_toConsumableArray(this._returnBuffers.map(function (v) {
          return v.buffer;
        }))));
        this._returnBuffers = [];
      } else {
        this._workerPort.postMessage({
          frames: chunk
        }, [chunk.buffer]);
      }
    }
  }, {
    key: "maxRingBufferSize",
    get: function get() {
      var chunkCount = Math.ceil(2 * sampleRate / this._processingChunk);
      chunkCount = Math.max(16, chunkCount);
      return chunkCount * this._processingChunk;
    }
  }, {
    key: "delayedFramesThreshold",
    get: function get() {
      return sampleRate;
    }
  }, {
    key: "irreducibleDelaySize",
    get: function get() {
      return 128 * 5;
    }
  }, {
    key: "minAcceptableReduceSize",
    get: function get() {
      return this._speedupSpeech.overlapSize;
    }
  }, {
    key: "delayedFrameNum",
    get: function get() {
      return this._inputRingBuffer.framesAvailable + this._outputRingBuffer.framesAvailable + this._samplesInWorker;
    }
  }, {
    key: "workerBufferSize",
    get: function get() {
      return Math.max(96000, this._processingChunk * 20);
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(AudioWorkletProcessor));
registerProcessor("effectssdk-worklet-processor", WorkletProcessor);
})();

/******/ })()
;