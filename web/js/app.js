/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(41);

	__webpack_require__(1);

	var _search = __webpack_require__(338);

	var _search2 = _interopRequireDefault(_search);

	var _comments = __webpack_require__(339);

	var _comments2 = _interopRequireDefault(_comments);

	var _header = __webpack_require__(348);

	var _header2 = _interopRequireDefault(_header);

	var _imagesSlideshow = __webpack_require__(349);

	var _imagesSlideshow2 = _interopRequireDefault(_imagesSlideshow);

	var _cookieBar = __webpack_require__(358);

	var _cookieBar2 = _interopRequireDefault(_cookieBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var searchContainer = document.querySelector('.js-search');

	if (searchContainer) {
	    new _search2.default(searchContainer);
	}

	var headerContainer = document.querySelector('.js-header');
	var header = new _header2.default(headerContainer);

	var commentsContainer = document.querySelector('.js-comments');

	if (commentsContainer) {
	    new _comments2.default(commentsContainer, header);
	}

	var imagesSlideshowContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-images-slideshow')));
	imagesSlideshowContainers.forEach(function (container) {
	    return new _imagesSlideshow2.default(container);
	});

	var cookieBarContainer = document.querySelector('.js-cookie-bar');

	if (cookieBarContainer) {
	    new _cookieBar2.default(cookieBarContainer);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2014-07-23
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

	/* Copied from MDN:
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
	 */

	if ("document" in window.self) {

	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

	    (function (view) {

	      "use strict";

	      if (!('Element' in view)) return;

	      var classListProp = "classList",
	          protoProp = "prototype",
	          elemCtrProto = view.Element[protoProp],
	          objCtr = Object,
	          strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      },
	          arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var i = 0,
	            len = this.length;
	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }
	        return -1;
	      }
	      // Vendors: please allow content code to instantiate DOMExceptions
	      ,
	          DOMEx = function DOMEx(type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      },
	          checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
	        if (token === "") {
	          throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
	        }
	        if (/\s/.test(token)) {
	          throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
	        }
	        return arrIndexOf.call(classList, token);
	      },
	          ClassList = function ClassList(elem) {
	        var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
	            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
	            i = 0,
	            len = classes.length;
	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      },
	          classListProto = ClassList[protoProp] = [],
	          classListGetter = function classListGetter() {
	        return new ClassList(this);
	      };
	      // Most DOMException implementations don't allow calling DOMException's toString()
	      // on non-DOMExceptions. Error's toString() is sufficient here.
	      DOMEx[protoProp] = Error[protoProp];
	      classListProto.item = function (i) {
	        return this[i] || null;
	      };
	      classListProto.contains = function (token) {
	        token += "";
	        return checkTokenAndGetIndex(this, token) !== -1;
	      };
	      classListProto.add = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false;
	        do {
	          token = tokens[i] + "";
	          if (checkTokenAndGetIndex(this, token) === -1) {
	            this.push(token);
	            updated = true;
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };
	      classListProto.remove = function () {
	        var tokens = arguments,
	            i = 0,
	            l = tokens.length,
	            token,
	            updated = false,
	            index;
	        do {
	          token = tokens[i] + "";
	          index = checkTokenAndGetIndex(this, token);
	          while (index !== -1) {
	            this.splice(index, 1);
	            updated = true;
	            index = checkTokenAndGetIndex(this, token);
	          }
	        } while (++i < l);

	        if (updated) {
	          this._updateClassName();
	        }
	      };
	      classListProto.toggle = function (token, force) {
	        token += "";

	        var result = this.contains(token),
	            method = result ? force !== true && "remove" : force !== false && "add";

	        if (method) {
	          this[method](token);
	        }

	        if (force === true || force === false) {
	          return force;
	        } else {
	          return !result;
	        }
	      };
	      classListProto.toString = function () {
	        return this.join(" ");
	      };

	      if (objCtr.defineProperty) {
	        var classListPropDesc = {
	          get: classListGetter,
	          enumerable: true,
	          configurable: true
	        };
	        try {
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        } catch (ex) {
	          // IE 8 doesn't support enumerable:true
	          if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	          }
	        }
	      } else if (objCtr[protoProp].__defineGetter__) {
	        elemCtrProto.__defineGetter__(classListProp, classListGetter);
	      }
	    })(window.self);
	  } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.

	    (function () {
	      "use strict";

	      var testElement = document.createElement("_");

	      testElement.classList.add("c1", "c2");

	      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.
	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function createMethod(method) {
	          var original = DOMTokenList.prototype[method];

	          DOMTokenList.prototype[method] = function (token) {
	            var i,
	                len = arguments.length;

	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };
	        createMethod('add');
	        createMethod('remove');
	      }

	      testElement.classList.toggle("c3", false);

	      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.
	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;

	        DOMTokenList.prototype.toggle = function (token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };
	      }

	      testElement = null;
	    })();
	  }
	}

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint browser:true, node:true*/

	'use strict';

	/**
	 * @preserve Create and manage a DOM event delegator.
	 *
	 * @version 0.3.0
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	var Delegate = __webpack_require__(5);

	module.exports = function (root) {
	  return new Delegate(root);
	};

	module.exports.Delegate = Delegate;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*jshint browser:true, node:true*/

	'use strict';

	module.exports = Delegate;

	/**
	 * DOM event delegator
	 *
	 * The delegator will listen
	 * for events that bubble up
	 * to the root node.
	 *
	 * @constructor
	 * @param {Node|string} [root] The root node or a selector string matching the root node
	 */
	function Delegate(root) {

	  /**
	   * Maintain a map of listener
	   * lists, keyed by event name.
	   *
	   * @type Object
	   */
	  this.listenerMap = [{}, {}];
	  if (root) {
	    this.root(root);
	  }

	  /** @type function() */
	  this.handle = Delegate.prototype.handle.bind(this);
	}

	/**
	 * Start listening for events
	 * on the provided DOM element
	 *
	 * @param  {Node|string} [root] The root node or a selector string matching the root node
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.root = function (root) {
	  var listenerMap = this.listenerMap;
	  var eventType;

	  // Remove master event listeners
	  if (this.rootElement) {
	    for (eventType in listenerMap[1]) {
	      if (listenerMap[1].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, true);
	      }
	    }
	    for (eventType in listenerMap[0]) {
	      if (listenerMap[0].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, false);
	      }
	    }
	  }

	  // If no root or root is not
	  // a dom node, then remove internal
	  // root reference and exit here
	  if (!root || !root.addEventListener) {
	    if (this.rootElement) {
	      delete this.rootElement;
	    }
	    return this;
	  }

	  /**
	   * The root node at which
	   * listeners are attached.
	   *
	   * @type Node
	   */
	  this.rootElement = root;

	  // Set up master event listeners
	  for (eventType in listenerMap[1]) {
	    if (listenerMap[1].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, true);
	    }
	  }
	  for (eventType in listenerMap[0]) {
	    if (listenerMap[0].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, false);
	    }
	  }

	  return this;
	};

	/**
	 * @param {string} eventType
	 * @returns boolean
	 */
	Delegate.prototype.captureForType = function (eventType) {
	  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
	};

	/**
	 * Attach a handler to one
	 * event for all elements
	 * that match the selector,
	 * now or in the future
	 *
	 * The handler function receives
	 * three arguments: the DOM event
	 * object, the node that matched
	 * the selector while the event
	 * was bubbling and a reference
	 * to itself. Within the handler,
	 * 'this' is equal to the second
	 * argument.
	 *
	 * The node that actually received
	 * the event can be accessed via
	 * 'event.target'.
	 *
	 * @param {string} eventType Listen for these events
	 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
	 * @param {function()} handler Handler function - event data passed here will be in event.data
	 * @param {Object} [eventData] Data to pass in event.data
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
	  var root, listenerMap, matcher, matcherParam;

	  if (!eventType) {
	    throw new TypeError('Invalid event type: ' + eventType);
	  }

	  // handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }

	  // Fallback to sensible defaults
	  // if useCapture not set
	  if (useCapture === undefined) {
	    useCapture = this.captureForType(eventType);
	  }

	  if (typeof handler !== 'function') {
	    throw new TypeError('Handler must be a type of Function');
	  }

	  root = this.rootElement;
	  listenerMap = this.listenerMap[useCapture ? 1 : 0];

	  // Add master handler for type if not created yet
	  if (!listenerMap[eventType]) {
	    if (root) {
	      root.addEventListener(eventType, this.handle, useCapture);
	    }
	    listenerMap[eventType] = [];
	  }

	  if (!selector) {
	    matcherParam = null;

	    // COMPLEX - matchesRoot needs to have access to
	    // this.rootElement, so bind the function to this.
	    matcher = matchesRoot.bind(this);

	    // Compile a matcher for the given selector
	  } else if (/^[a-z]+$/i.test(selector)) {
	    matcherParam = selector;
	    matcher = matchesTag;
	  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
	    matcherParam = selector.slice(1);
	    matcher = matchesId;
	  } else {
	    matcherParam = selector;
	    matcher = matches;
	  }

	  // Add to the list of listeners
	  listenerMap[eventType].push({
	    selector: selector,
	    handler: handler,
	    matcher: matcher,
	    matcherParam: matcherParam
	  });

	  return this;
	};

	/**
	 * Remove an event handler
	 * for elements that match
	 * the selector, forever
	 *
	 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
	 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
	 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
	  var i, listener, listenerMap, listenerList, singleEventType;

	  // Handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }

	  // If useCapture not set, remove
	  // all event listeners
	  if (useCapture === undefined) {
	    this.off(eventType, selector, handler, true);
	    this.off(eventType, selector, handler, false);
	    return this;
	  }

	  listenerMap = this.listenerMap[useCapture ? 1 : 0];
	  if (!eventType) {
	    for (singleEventType in listenerMap) {
	      if (listenerMap.hasOwnProperty(singleEventType)) {
	        this.off(singleEventType, selector, handler);
	      }
	    }

	    return this;
	  }

	  listenerList = listenerMap[eventType];
	  if (!listenerList || !listenerList.length) {
	    return this;
	  }

	  // Remove only parameter matches
	  // if specified
	  for (i = listenerList.length - 1; i >= 0; i--) {
	    listener = listenerList[i];

	    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
	      listenerList.splice(i, 1);
	    }
	  }

	  // All listeners removed
	  if (!listenerList.length) {
	    delete listenerMap[eventType];

	    // Remove the main handler
	    if (this.rootElement) {
	      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
	    }
	  }

	  return this;
	};

	/**
	 * Handle an arbitrary event.
	 *
	 * @param {Event} event
	 */
	Delegate.prototype.handle = function (event) {
	  var i,
	      l,
	      type = event.type,
	      root,
	      phase,
	      listener,
	      returned,
	      listenerList = [],
	      target,
	      /** @const */EVENTIGNORE = 'ftLabsDelegateIgnore';

	  if (event[EVENTIGNORE] === true) {
	    return;
	  }

	  target = event.target;

	  // Hardcode value of Node.TEXT_NODE
	  // as not defined in IE8
	  if (target.nodeType === 3) {
	    target = target.parentNode;
	  }

	  root = this.rootElement;

	  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

	  switch (phase) {
	    case 1:
	      //Event.CAPTURING_PHASE:
	      listenerList = this.listenerMap[1][type];
	      break;
	    case 2:
	      //Event.AT_TARGET:
	      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
	      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
	      break;
	    case 3:
	      //Event.BUBBLING_PHASE:
	      listenerList = this.listenerMap[0][type];
	      break;
	  }

	  // Need to continuously check
	  // that the specific list is
	  // still populated in case one
	  // of the callbacks actually
	  // causes the list to be destroyed.
	  l = listenerList.length;
	  while (target && l) {
	    for (i = 0; i < l; i++) {
	      listener = listenerList[i];

	      // Bail from this loop if
	      // the length changed and
	      // no more listeners are
	      // defined between i and l.
	      if (!listener) {
	        break;
	      }

	      // Check for match and fire
	      // the event if there's one
	      //
	      // TODO:MCG:20120117: Need a way
	      // to check if event#stopImmediatePropagation
	      // was called. If so, break both loops.
	      if (listener.matcher.call(target, listener.matcherParam, target)) {
	        returned = this.fire(event, target, listener);
	      }

	      // Stop propagation to subsequent
	      // callbacks if the callback returned
	      // false
	      if (returned === false) {
	        event[EVENTIGNORE] = true;
	        event.preventDefault();
	        return;
	      }
	    }

	    // TODO:MCG:20120117: Need a way to
	    // check if event#stopPropagation
	    // was called. If so, break looping
	    // through the DOM. Stop if the
	    // delegation root has been reached
	    if (target === root) {
	      break;
	    }

	    l = listenerList.length;
	    target = target.parentElement;
	  }
	};

	/**
	 * Fire a listener on a target.
	 *
	 * @param {Event} event
	 * @param {Node} target
	 * @param {Object} listener
	 * @returns {boolean}
	 */
	Delegate.prototype.fire = function (event, target, listener) {
	  return listener.handler.call(target, event, target);
	};

	/**
	 * Check whether an element
	 * matches a generic selector.
	 *
	 * @type function()
	 * @param {string} selector A CSS selector
	 */
	var matches = function (el) {
	  if (!el) return;
	  var p = el.prototype;
	  return p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
	}(Element);

	/**
	 * Check whether an element
	 * matches a tag selector.
	 *
	 * Tags are NOT case-sensitive,
	 * except in XML (and XML-based
	 * languages such as XHTML).
	 *
	 * @param {string} tagName The tag name to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesTag(tagName, element) {
	  return tagName.toLowerCase() === element.tagName.toLowerCase();
	}

	/**
	 * Check whether an element
	 * matches the root.
	 *
	 * @param {?String} selector In this case this is always passed through as null and not used
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesRoot(selector, element) {
	  /*jshint validthis:true*/
	  if (this.rootElement === window) return element === document;
	  return this.rootElement === element;
	}

	/**
	 * Check whether the ID of
	 * the element in 'this'
	 * matches the given ID.
	 *
	 * IDs are case-sensitive.
	 *
	 * @param {string} id The ID to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesId(id, element) {
	  return id === element.id;
	}

	/**
	 * Short hand for off()
	 * and root(), ie both
	 * with no parameters
	 *
	 * @return void
	 */
	Delegate.prototype.destroy = function () {
	  this.off();
	  this.root();
	};

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);
	var bind = __webpack_require__(11);
	var Axios = __webpack_require__(12);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = module.exports = createInstance();

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return createInstance(defaultConfig);
	};

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(30);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var bind = __webpack_require__(11);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return typeof FormData !== 'undefined' && val instanceof FormData;
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.createElement === 'function';
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge() /* obj1, obj2, obj3, ... */{
	  var result = {};
	  function assignValue(val, key) {
	    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(13);
	var utils = __webpack_require__(10);
	var InterceptorManager = __webpack_require__(15);
	var dispatchRequest = __webpack_require__(16);
	var isAbsoluteURL = __webpack_require__(28);
	var combineURLs = __webpack_require__(29);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 */
	function Axios(defaultConfig) {
	  this.defaults = utils.merge(defaults, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);
	var normalizeHeaderName = __webpack_require__(14);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) {/* Ignore */}
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(10);
	var transformData = __webpack_require__(18);

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(config.data, config.headers, config.transformRequest);

	  // Flatten headers
	  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

	  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
	    delete config.headers[method];
	  });

	  var adapter;

	  if (typeof config.adapter === 'function') {
	    // For custom adapter support
	    adapter = config.adapter;
	  } else if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(19);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(19);
	  }

	  return Promise.resolve(config)
	  // Wrap synchronous adapter errors and pass configuration
	  .then(adapter).then(function onFulfilled(response) {
	    // Transform response data
	    response.data = transformData(response.data, response.headers, config.transformResponse);

	    return response;
	  }, function onRejected(error) {
	    // Transform response data
	    if (error && error.response) {
	      error.response.data = transformData(error.response.data, error.response.headers, config.transformResponse);
	    }

	    return Promise.reject(error);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

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
	function defaultClearTimeout() {
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
	})();
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
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
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
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
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
	    while (len) {
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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(10);
	var settle = __webpack_require__(20);
	var buildURL = __webpack_require__(23);
	var parseHeaders = __webpack_require__(24);
	var isURLSameOrigin = __webpack_require__(25);
	var createError = __webpack_require__(21);
	var btoa = typeof window !== 'undefined' && window.btoa || __webpack_require__(26);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || request.readyState !== 4 && !xDomain) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      if (request.status === 0) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(27);

	      // Add xsrf header
	      var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ? cookies.read(config.xsrfCookieName) : undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.progress === 'function') {
	      if (config.method === 'post' || config.method === 'put') {
	        request.upload.addEventListener('progress', config.progress);
	      } else if (config.method === 'get') {
	        request.addEventListener('progress', config.progress);
	      }
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(21);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError('Request failed with status code ' + response.status, response.config, null, response));
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(22);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */

	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	function encode(val) {
	  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) {
	    return parsed;
	  }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	module.exports = utils.isStandardBrowserEnv() ?

	// Standard browser envs have full support of the APIs needed to test
	// whether the request URL is of the same origin as current location.
	function standardBrowserEnv() {
	  var msie = /(msie|trident)/i.test(navigator.userAgent);
	  var urlParsingNode = document.createElement('a');
	  var originURL;

	  /**
	  * Parse a URL to discover it's components
	  *
	  * @param {String} url The URL to be parsed
	  * @returns {Object}
	  */
	  function resolveURL(url) {
	    var href = url;

	    if (msie) {
	      // IE needs attribute set twice to normalize properties
	      urlParsingNode.setAttribute('href', href);
	      href = urlParsingNode.href;
	    }

	    urlParsingNode.setAttribute('href', href);

	    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	    return {
	      href: urlParsingNode.href,
	      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	      host: urlParsingNode.host,
	      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	      hostname: urlParsingNode.hostname,
	      port: urlParsingNode.port,
	      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
	    };
	  }

	  originURL = resolveURL(window.location.href);

	  /**
	  * Determine if a URL shares the same origin as the current location
	  *
	  * @param {String} requestURL The URL to test
	  * @returns {boolean} True if URL shares the same origin, otherwise false
	  */
	  return function isURLSameOrigin(requestURL) {
	    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
	    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
	  };
	}() :

	// Non standard browser envs (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return function isURLSameOrigin() {
	    return true;
	  };
	}();

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error();
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	  // initialize result and counter
	  var block, charCode, idx = 0, map = chars;
	  // if the next str index does not exist:
	  //   change the mapping table to "="
	  //   check if d has no fractional digits
	  str.charAt(idx | 0) || (map = '=', idx % 1);
	  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(10);

	module.exports = utils.isStandardBrowserEnv() ?

	// Standard browser envs support document.cookie
	function standardBrowserEnv() {
	  return {
	    write: function write(name, value, expires, path, domain, secure) {
	      var cookie = [];
	      cookie.push(name + '=' + encodeURIComponent(value));

	      if (utils.isNumber(expires)) {
	        cookie.push('expires=' + new Date(expires).toGMTString());
	      }

	      if (utils.isString(path)) {
	        cookie.push('path=' + path);
	      }

	      if (utils.isString(domain)) {
	        cookie.push('domain=' + domain);
	      }

	      if (secure === true) {
	        cookie.push('secure');
	      }

	      document.cookie = cookie.join('; ');
	    },

	    read: function read(name) {
	      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	      return match ? decodeURIComponent(match[3]) : null;
	    },

	    remove: function remove(name) {
	      this.write(name, '', Date.now() - 86400000);
	    }
	  };
	}() :

	// Non standard browser env (web workers, react-native) lack needed support.
	function nonStandardBrowserEnv() {
	  return {
	    write: function write() {},
	    read: function read() {
	      return null;
	    },
	    remove: function remove() {}
	  };
	}();

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */

	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
	  );
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */

	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */

	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(42);

	__webpack_require__(333);

	__webpack_require__(335);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(43);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(97);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(110);
	__webpack_require__(112);
	__webpack_require__(114);
	__webpack_require__(116);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(125);
	__webpack_require__(127);
	__webpack_require__(129);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(135);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(215);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(227);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(233);
	__webpack_require__(235);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(251);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(268);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(294);
	__webpack_require__(295);
	__webpack_require__(296);
	__webpack_require__(297);
	__webpack_require__(298);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(309);
	__webpack_require__(310);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(314);
	__webpack_require__(315);
	__webpack_require__(316);
	__webpack_require__(318);
	__webpack_require__(319);
	__webpack_require__(320);
	__webpack_require__(321);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(325);
	__webpack_require__(326);
	__webpack_require__(327);
	__webpack_require__(328);
	__webpack_require__(331);
	__webpack_require__(332);
	module.exports = __webpack_require__(49);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var global = __webpack_require__(44),
	    has = __webpack_require__(45),
	    DESCRIPTORS = __webpack_require__(46),
	    $export = __webpack_require__(48),
	    redefine = __webpack_require__(58),
	    META = __webpack_require__(62).KEY,
	    $fails = __webpack_require__(47),
	    shared = __webpack_require__(63),
	    setToStringTag = __webpack_require__(64),
	    uid = __webpack_require__(59),
	    wks = __webpack_require__(65),
	    wksExt = __webpack_require__(66),
	    wksDefine = __webpack_require__(67),
	    keyOf = __webpack_require__(69),
	    enumKeys = __webpack_require__(82),
	    isArray = __webpack_require__(85),
	    anObject = __webpack_require__(52),
	    toIObject = __webpack_require__(72),
	    toPrimitive = __webpack_require__(56),
	    createDesc = __webpack_require__(57),
	    _create = __webpack_require__(86),
	    gOPNExt = __webpack_require__(89),
	    $GOPD = __webpack_require__(91),
	    $DP = __webpack_require__(51),
	    $keys = __webpack_require__(70),
	    gOPD = $GOPD.f,
	    dP = $DP.f,
	    gOPN = gOPNExt.f,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    PROTOTYPE = 'prototype',
	    HIDDEN = wks('_hidden'),
	    TO_PRIMITIVE = wks('toPrimitive'),
	    isEnum = {}.propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    OPSymbols = shared('op-symbols'),
	    ObjectProto = Object[PROTOTYPE],
	    USE_NATIVE = typeof $Symbol == 'function',
	    QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function get() {
	      return dP(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) {
	    $defineProperty(it, key = keys[i++], P[key]);
	  }return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  }return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto,
	      names = gOPN(IS_OP ? OPSymbols : toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  }return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function _Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function $set(value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(90).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(84).f = $propertyIsEnumerable;
	  __webpack_require__(83).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(68)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var symbols =
	// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), i = 0; symbols.length > i;) {
	  wks(symbols[i++]);
	}for (var symbols = $keys(wks.store), i = 0; symbols.length > i;) {
	  wksDefine(symbols[i++]);
	}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it],
	        i = 1,
	        replacer,
	        $replacer;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(50)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(47)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    core = __webpack_require__(49),
	    hide = __webpack_require__(50),
	    redefine = __webpack_require__(58),
	    ctx = __webpack_require__(60),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(51),
	    createDesc = __webpack_require__(57);
	module.exports = __webpack_require__(46) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(52),
	    IE8_DOM_DEFINE = __webpack_require__(54),
	    toPrimitive = __webpack_require__(56),
	    dP = Object.defineProperty;

	exports.f = __webpack_require__(46) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(53);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = !__webpack_require__(46) && !__webpack_require__(47)(function () {
	  return Object.defineProperty(__webpack_require__(55)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(53),
	    document = __webpack_require__(44).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(53);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    hide = __webpack_require__(50),
	    has = __webpack_require__(45),
	    SRC = __webpack_require__(59)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);

	__webpack_require__(49).inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(61);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var META = __webpack_require__(59)('meta'),
	    isObject = __webpack_require__(53),
	    has = __webpack_require__(45),
	    setDesc = __webpack_require__(51).f,
	    id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(47)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function setMeta(it) {
	  setDesc(it, META, { value: {
	      i: 'O' + ++id, // object ID
	      w: {} // weak collections IDs
	    } });
	};
	var fastKey = function fastKey(it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	    // return object ID
	  }return it[META].i;
	};
	var getWeak = function getWeak(it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	    // return hash weak collections IDs
	  }return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(51).f,
	    has = __webpack_require__(45),
	    TAG = __webpack_require__(65)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(63)('wks'),
	    uid = __webpack_require__(59),
	    _Symbol = __webpack_require__(44).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.f = __webpack_require__(65);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    core = __webpack_require__(49),
	    LIBRARY = __webpack_require__(68),
	    wksExt = __webpack_require__(66),
	    defineProperty = __webpack_require__(51).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	module.exports = false;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getKeys = __webpack_require__(70),
	    toIObject = __webpack_require__(72);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) {
	    if (O[key = keys[index++]] === el) return key;
	  }
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(71),
	    enumBugKeys = __webpack_require__(81);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(45),
	    toIObject = __webpack_require__(72),
	    arrayIndexOf = __webpack_require__(76)(false),
	    IE_PROTO = __webpack_require__(80)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(73),
	    defined = __webpack_require__(75);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(74);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(72),
	    toLength = __webpack_require__(77),
	    toIndex = __webpack_require__(79);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(78),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";

	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(78),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shared = __webpack_require__(63)('keys'),
	    uid = __webpack_require__(59);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(70),
	    gOPS = __webpack_require__(83),
	    pIE = __webpack_require__(84);
	module.exports = function (it) {
	  var result = getKeys(it),
	      getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = pIE.f,
	        i = 0,
	        key;
	    while (symbols.length > i) {
	      if (isEnum.call(it, key = symbols[i++])) result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(74);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(52),
	    dPs = __webpack_require__(87),
	    enumBugKeys = __webpack_require__(81),
	    IE_PROTO = __webpack_require__(80)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(55)('iframe'),
	      i = enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(88).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(51),
	    anObject = __webpack_require__(52),
	    getKeys = __webpack_require__(70);

	module.exports = __webpack_require__(46) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(44).document && document.documentElement;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(72),
	    gOPN = __webpack_require__(90).f,
	    toString = {}.toString;

	var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(71),
	    hiddenKeys = __webpack_require__(81).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pIE = __webpack_require__(84),
	    createDesc = __webpack_require__(57),
	    toIObject = __webpack_require__(72),
	    toPrimitive = __webpack_require__(56),
	    has = __webpack_require__(45),
	    IE8_DOM_DEFINE = __webpack_require__(54),
	    gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(46) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(86) });

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(46), 'Object', { defineProperty: __webpack_require__(51).f });

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(46), 'Object', { defineProperties: __webpack_require__(87) });

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(72),
	    $getOwnPropertyDescriptor = __webpack_require__(91).f;

	__webpack_require__(96)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(48),
	    core = __webpack_require__(49),
	    fails = __webpack_require__(47);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(98),
	    $getPrototypeOf = __webpack_require__(99);

	__webpack_require__(96)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(75);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(45),
	    toObject = __webpack_require__(98),
	    IE_PROTO = __webpack_require__(80)('IE_PROTO'),
	    ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(98),
	    $keys = __webpack_require__(70);

	__webpack_require__(96)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(96)('getOwnPropertyNames', function () {
	  return __webpack_require__(89).f;
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(53),
	    meta = __webpack_require__(62).onFreeze;

	__webpack_require__(96)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(53),
	    meta = __webpack_require__(62).onFreeze;

	__webpack_require__(96)('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(53),
	    meta = __webpack_require__(62).onFreeze;

	__webpack_require__(96)('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(53);

	__webpack_require__(96)('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(53);

	__webpack_require__(96)('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(53);

	__webpack_require__(96)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(48);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(109) });

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)

	var getKeys = __webpack_require__(70),
	    gOPS = __webpack_require__(83),
	    pIE = __webpack_require__(84),
	    toObject = __webpack_require__(98),
	    IObject = __webpack_require__(73),
	    $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(47)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(48);
	$export($export.S, 'Object', { is: __webpack_require__(111) });

/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y) {
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(48);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(113).set });

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(53),
	    anObject = __webpack_require__(52);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = __webpack_require__(60)(Function.call, __webpack_require__(91).f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()

	var classof = __webpack_require__(115),
	    test = {};
	test[__webpack_require__(65)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(58)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(74),
	    TAG = __webpack_require__(65)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(48);

	$export($export.P, 'Function', { bind: __webpack_require__(117) });

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aFunction = __webpack_require__(61),
	    isObject = __webpack_require__(53),
	    invoke = __webpack_require__(118),
	    arraySlice = [].slice,
	    factories = {};

	var construct = function construct(F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) {
	      n[i] = 'a[' + i + ']';
	    }factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }return factories[len](F, args);
	};

	module.exports = Function.bind || function bind(that /*, args... */) {
	  var fn = aFunction(this),
	      partArgs = arraySlice.call(arguments, 1);
	  var bound = function bound() /* args... */{
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(51).f,
	    createDesc = __webpack_require__(57),
	    has = __webpack_require__(45),
	    FProto = Function.prototype,
	    nameRE = /^\s*function ([^ (]*)/,
	    NAME = 'name';

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(46) && dP(FProto, NAME, {
	  configurable: true,
	  get: function get() {
	    try {
	      var that = this,
	          name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch (e) {
	      return '';
	    }
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(53),
	    getPrototypeOf = __webpack_require__(99),
	    HAS_INSTANCE = __webpack_require__(65)('hasInstance'),
	    FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(51).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
	    if (typeof this != 'function' || !isObject(O)) return false;
	    if (!isObject(this.prototype)) return O instanceof this;
	    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	    while (O = getPrototypeOf(O)) {
	      if (this.prototype === O) return true;
	    }return false;
	  } });

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $parseInt = __webpack_require__(122);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $parseInt = __webpack_require__(44).parseInt,
	    $trim = __webpack_require__(123).trim,
	    ws = __webpack_require__(124),
	    hex = /^[\-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    defined = __webpack_require__(75),
	    fails = __webpack_require__(47),
	    spaces = __webpack_require__(124),
	    space = '[' + spaces + ']',
	    non = '\u200B\x85',
	    ltrim = RegExp('^' + space + space + '*'),
	    rtrim = RegExp(space + space + '*$');

	var exporter = function exporter(KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $parseFloat = __webpack_require__(126);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $parseFloat = __webpack_require__(44).parseFloat,
	    $trim = __webpack_require__(123).trim;

	module.exports = 1 / $parseFloat(__webpack_require__(124) + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3),
	      result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    has = __webpack_require__(45),
	    cof = __webpack_require__(74),
	    inheritIfRequired = __webpack_require__(128),
	    toPrimitive = __webpack_require__(56),
	    fails = __webpack_require__(47),
	    gOPN = __webpack_require__(90).f,
	    gOPD = __webpack_require__(91).f,
	    dP = __webpack_require__(51).f,
	    $trim = __webpack_require__(123).trim,
	    NUMBER = 'Number',
	    $Number = global[NUMBER],
	    Base = $Number,
	    proto = $Number.prototype
	// Opera ~12 has broken Object#toString
	,
	    BROKEN_COF = cof(__webpack_require__(86)(proto)) == NUMBER,
	    TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function toNumber(argument) {
	  var it = toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0),
	        third,
	        radix,
	        maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:case 98:
	          radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
	        case 79:case 111:
	          radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
	        default:
	          return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      }return parseInt(digits, radix);
	    }
	  }return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value,
	        that = this;
	    return that instanceof $Number
	    // check on 1..constructor(foo) case
	    && (BROKEN_COF ? fails(function () {
	      proto.valueOf.call(that);
	    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = __webpack_require__(46) ? gOPN(Base) : (
	  // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	  // ES6 (in case, if modules with ES6 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
	    if (has(Base, key = keys[j]) && !has($Number, key)) {
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(58)(global, NUMBER, $Number);
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(53),
	    setPrototypeOf = __webpack_require__(113).set;
	module.exports = function (that, target, C) {
	  var P,
	      S = target.constructor;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  }return that;
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toInteger = __webpack_require__(78),
	    aNumberValue = __webpack_require__(130),
	    repeat = __webpack_require__(131),
	    $toFixed = 1..toFixed,
	    floor = Math.floor,
	    data = [0, 0, 0, 0, 0, 0],
	    ERROR = 'Number.toFixed: incorrect invocation!',
	    ZERO = '0';

	var multiply = function multiply(n, c) {
	  var i = -1,
	      c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function divide(n) {
	  var i = 6,
	      c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor(c / n);
	    c = c % n * 1e7;
	  }
	};
	var numToString = function numToString() {
	  var i = 6,
	      s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  }return s;
	};
	var pow = function pow(x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function log(x) {
	  var n = 0,
	      x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }return n;
	};

	$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128..toFixed(0) !== '1000000000000000128') || !__webpack_require__(47)(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue(this, ERROR),
	        f = toInteger(fractionDigits),
	        s = '',
	        m = ZERO,
	        e,
	        z,
	        j,
	        k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    }return m;
	  }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cof = __webpack_require__(74);
	module.exports = function (it, msg) {
	  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(78),
	    defined = __webpack_require__(75);

	module.exports = function repeat(count) {
	  var str = String(defined(this)),
	      res = '',
	      n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (; n > 0; (n >>>= 1) && (str += str)) {
	    if (n & 1) res += str;
	  }return res;
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $fails = __webpack_require__(47),
	    aNumberValue = __webpack_require__(130),
	    $toPrecision = 1..toPrecision;

	$export($export.P + $export.F * ($fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(48);

	$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.2 Number.isFinite(number)
	var $export = __webpack_require__(48),
	    _isFinite = __webpack_require__(44).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(48);

	$export($export.S, 'Number', { isInteger: __webpack_require__(136) });

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(53),
	    floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(48);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    return number != number;
	  }
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export = __webpack_require__(48),
	    isInteger = __webpack_require__(136),
	    abs = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(48);

	$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(48);

	$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $parseFloat = __webpack_require__(126);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $parseInt = __webpack_require__(122);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(48),
	    log1p = __webpack_require__(144),
	    sqrt = Math.sqrt,
	    $acosh = Math.acosh;

	$export($export.S + $export.F * !($acosh
	// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	&& Math.floor($acosh(Number.MAX_VALUE)) == 710
	// Tor Browser bug: Math.acosh(Infinity) -> NaN 
	&& $acosh(Infinity) == Infinity), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(48),
	    $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(48),
	    $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(48),
	    sign = __webpack_require__(148);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x) {
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(48),
	    exp = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(48),
	    $expm1 = __webpack_require__(152);

	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ },
/* 152 */
/***/ function(module, exports) {

	"use strict";

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = !$expm1
	// Old FF bug
	|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	// Tor Browser bug
	|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.16 Math.fround(x)
	var $export = __webpack_require__(48),
	    sign = __webpack_require__(148),
	    pow = Math.pow,
	    EPSILON = pow(2, -52),
	    EPSILON32 = pow(2, -23),
	    MAX32 = pow(2, 127) * (2 - EPSILON32),
	    MIN32 = pow(2, -126);

	var roundTiesToEven = function roundTiesToEven(n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	$export($export.S, 'Math', {
	  fround: function fround(x) {
	    var $abs = Math.abs(x),
	        $sign = sign(x),
	        a,
	        result;
	    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if (result > MAX32 || result != result) return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(48),
	    abs = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2) {
	    // eslint-disable-line no-unused-vars
	    var sum = 0,
	        i = 0,
	        aLen = arguments.length,
	        larg = 0,
	        arg,
	        div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(48),
	    $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(47)(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff,
	        xn = +x,
	        yn = +y,
	        xl = UINT16 & xn,
	        yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', { log1p: __webpack_require__(144) });

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', { sign: __webpack_require__(148) });

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(48),
	    expm1 = __webpack_require__(152),
	    exp = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(47)(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(48),
	    expm1 = __webpack_require__(152),
	    exp = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x),
	        b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toIndex = __webpack_require__(79),
	    fromCharCode = String.fromCharCode,
	    $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    // eslint-disable-line no-unused-vars
	    var res = [],
	        aLen = arguments.length,
	        i = 0,
	        code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
	    }return res.join('');
	  }
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toIObject = __webpack_require__(72),
	    toLength = __webpack_require__(77);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject(callSite.raw),
	        len = toLength(tpl.length),
	        aLen = arguments.length,
	        res = [],
	        i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    }return res.join('');
	  }
	});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()

	__webpack_require__(123)('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $at = __webpack_require__(167)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(168)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(78),
	    defined = __webpack_require__(75);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(68),
	    $export = __webpack_require__(48),
	    redefine = __webpack_require__(58),
	    hide = __webpack_require__(50),
	    has = __webpack_require__(45),
	    Iterators = __webpack_require__(169),
	    $iterCreate = __webpack_require__(170),
	    setToStringTag = __webpack_require__(64),
	    getPrototypeOf = __webpack_require__(99),
	    ITERATOR = __webpack_require__(65)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 169 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var create = __webpack_require__(86),
	    descriptor = __webpack_require__(57),
	    setToStringTag = __webpack_require__(64),
	    IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(50)(IteratorPrototype, __webpack_require__(65)('iterator'), function () {
	  return this;
	});

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $at = __webpack_require__(167)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';

	var $export = __webpack_require__(48),
	    toLength = __webpack_require__(77),
	    context = __webpack_require__(173),
	    ENDS_WITH = 'endsWith',
	    $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(175)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */) {
	    var that = context(this, searchString, ENDS_WITH),
	        endPosition = arguments.length > 1 ? arguments[1] : undefined,
	        len = toLength(that.length),
	        end = endPosition === undefined ? len : Math.min(toLength(endPosition), len),
	        search = String(searchString);
	    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(174),
	    defined = __webpack_require__(75);

	module.exports = function (that, searchString, NAME) {
	  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(53),
	    cof = __webpack_require__(74),
	    MATCH = __webpack_require__(65)('match');
	module.exports = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MATCH = __webpack_require__(65)('match');
	module.exports = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch (f) {/* empty */}
	  }return true;
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';

	var $export = __webpack_require__(48),
	    context = __webpack_require__(173),
	    INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(175)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */) {
	    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(131)
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';

	var $export = __webpack_require__(48),
	    toLength = __webpack_require__(77),
	    context = __webpack_require__(173),
	    STARTS_WITH = 'startsWith',
	    $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(175)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH),
	        index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length)),
	        search = String(searchString);
	    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)

	__webpack_require__(180)('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    fails = __webpack_require__(47),
	    defined = __webpack_require__(75),
	    quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function createHTML(string, tag, attribute, value) {
	  var S = String(defined(string)),
	      p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()

	__webpack_require__(180)('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()

	__webpack_require__(180)('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()

	__webpack_require__(180)('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()

	__webpack_require__(180)('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)

	__webpack_require__(180)('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)

	__webpack_require__(180)('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()

	__webpack_require__(180)('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)

	__webpack_require__(180)('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()

	__webpack_require__(180)('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()

	__webpack_require__(180)('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()

	__webpack_require__(180)('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()

	__webpack_require__(180)('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(48);

	$export($export.S, 'Date', { now: function now() {
	    return new Date().getTime();
	  } });

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    toPrimitive = __webpack_require__(56);

	$export($export.P + $export.F * __webpack_require__(47)(function () {
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
	      return 1;
	    } }) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key) {
	    var O = toObject(this),
	        pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var $export = __webpack_require__(48),
	    fails = __webpack_require__(47),
	    getTime = Date.prototype.getTime;

	var lz = function lz(num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function () {
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString() {
	    if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	    var d = this,
	        y = d.getUTCFullYear(),
	        m = d.getUTCMilliseconds(),
	        s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateProto = Date.prototype,
	    INVALID_DATE = 'Invalid Date',
	    TO_STRING = 'toString',
	    $toString = DateProto[TO_STRING],
	    getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  __webpack_require__(58)(DateProto, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TO_PRIMITIVE = __webpack_require__(65)('toPrimitive'),
	    proto = Date.prototype;

	if (!(TO_PRIMITIVE in proto)) __webpack_require__(50)(proto, TO_PRIMITIVE, __webpack_require__(198));

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var anObject = __webpack_require__(52),
	    toPrimitive = __webpack_require__(56),
	    NUMBER = 'number';

	module.exports = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(48);

	$export($export.S, 'Array', { isArray: __webpack_require__(85) });

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(60),
	    $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    call = __webpack_require__(201),
	    isArrayIter = __webpack_require__(202),
	    toLength = __webpack_require__(77),
	    createProperty = __webpack_require__(203),
	    getIterFn = __webpack_require__(204);

	$export($export.S + $export.F * !__webpack_require__(205)(function (iter) {
	  Array.from(iter);
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = getIterFn(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(52);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// check on default Array iterator
	var Iterators = __webpack_require__(169),
	    ITERATOR = __webpack_require__(65)('iterator'),
	    ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $defineProperty = __webpack_require__(51),
	    createDesc = __webpack_require__(57);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classof = __webpack_require__(115),
	    ITERATOR = __webpack_require__(65)('iterator'),
	    Iterators = __webpack_require__(169);
	module.exports = __webpack_require__(49).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ITERATOR = __webpack_require__(65)('iterator'),
	    SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    createProperty = __webpack_require__(203);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(47)(function () {
	  function F() {}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of() /* ...args */{
	    var index = 0,
	        aLen = arguments.length,
	        result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) {
	      createProperty(result, index, arguments[index++]);
	    }result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)

	var $export = __webpack_require__(48),
	    toIObject = __webpack_require__(72),
	    arrayJoin = [].join;

	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(73) != Object || !__webpack_require__(208)(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fails = __webpack_require__(47);

	module.exports = function (method, arg) {
	  return !!method && fails(function () {
	    arg ? method.call(null, function () {}, 1) : method.call(null);
	  });
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    html = __webpack_require__(88),
	    cof = __webpack_require__(74),
	    toIndex = __webpack_require__(79),
	    toLength = __webpack_require__(77),
	    arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(47)(function () {
	  if (html) arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength(this.length),
	        klass = cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice.call(this, begin, end);
	    var start = toIndex(begin, len),
	        upTo = toIndex(end, len),
	        size = toLength(upTo - start),
	        cloned = Array(size),
	        i = 0;
	    for (; i < size; i++) {
	      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
	    }return cloned;
	  }
	});

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    aFunction = __webpack_require__(61),
	    toObject = __webpack_require__(98),
	    fails = __webpack_require__(47),
	    $sort = [].sort,
	    test = [1, 2, 3];

	$export($export.P + $export.F * (fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(208)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $forEach = __webpack_require__(212)(0),
	    STRICT = __webpack_require__(208)([].forEach, true);

	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(60),
	    IObject = __webpack_require__(73),
	    toObject = __webpack_require__(98),
	    toLength = __webpack_require__(77),
	    asc = __webpack_require__(213);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1,
	      IS_FILTER = TYPE == 2,
	      IS_SOME = TYPE == 3,
	      IS_EVERY = TYPE == 4,
	      IS_FIND_INDEX = TYPE == 6,
	      NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
	      create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this),
	        self = IObject(O),
	        f = ctx(callbackfn, that, 3),
	        length = toLength(self.length),
	        index = 0,
	        result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
	        val,
	        res;
	    for (; length > index; index++) {
	      if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);
	        if (TYPE) {
	          if (IS_MAP) result[index] = res; // map
	          else if (res) switch (TYPE) {
	              case 3:
	                return true; // some
	              case 5:
	                return val; // find
	              case 6:
	                return index; // findIndex
	              case 2:
	                result.push(val); // filter
	            } else if (IS_EVERY) return false; // every
	        }
	      }
	    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(214);

	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(53),
	    isArray = __webpack_require__(85),
	    SPECIES = __webpack_require__(65)('species');

	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }return C === undefined ? Array : C;
	};

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $map = __webpack_require__(212)(1);

	$export($export.P + $export.F * !__webpack_require__(208)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $filter = __webpack_require__(212)(2);

	$export($export.P + $export.F * !__webpack_require__(208)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $some = __webpack_require__(212)(3);

	$export($export.P + $export.F * !__webpack_require__(208)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $every = __webpack_require__(212)(4);

	$export($export.P + $export.F * !__webpack_require__(208)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $reduce = __webpack_require__(220);

	$export($export.P + $export.F * !__webpack_require__(208)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var aFunction = __webpack_require__(61),
	    toObject = __webpack_require__(98),
	    IObject = __webpack_require__(73),
	    toLength = __webpack_require__(77);

	module.exports = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction(callbackfn);
	  var O = toObject(that),
	      self = IObject(O),
	      length = toLength(O.length),
	      index = isRight ? length - 1 : 0,
	      i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (; isRight ? index >= 0 : length > index; index += i) {
	    if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	  }return memo;
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $reduce = __webpack_require__(220);

	$export($export.P + $export.F * !__webpack_require__(208)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $indexOf = __webpack_require__(76)(false),
	    $native = [].indexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(208)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	    // convert -0 to +0
	    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toIObject = __webpack_require__(72),
	    toInteger = __webpack_require__(78),
	    toLength = __webpack_require__(77),
	    $native = [].lastIndexOf,
	    NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(208)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject(this),
	        length = toLength(O.length),
	        index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (; index >= 0; index--) {
	      if (index in O) if (O[index] === searchElement) return index || 0;
	    }return -1;
	  }
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(48);

	$export($export.P, 'Array', { copyWithin: __webpack_require__(225) });

	__webpack_require__(226)('copyWithin');

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';

	var toObject = __webpack_require__(98),
	    toIndex = __webpack_require__(79),
	    toLength = __webpack_require__(77);

	module.exports = [].copyWithin || function copyWithin(target /*= 0*/, start /*= 0, end = @length*/) {
	  var O = toObject(this),
	      len = toLength(O.length),
	      to = toIndex(target, len),
	      from = toIndex(start, len),
	      end = arguments.length > 2 ? arguments[2] : undefined,
	      count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to),
	      inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }return O;
	};

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(65)('unscopables'),
	    ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(50)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(48);

	$export($export.P, 'Array', { fill: __webpack_require__(228) });

	__webpack_require__(226)('fill');

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';

	var toObject = __webpack_require__(98),
	    toIndex = __webpack_require__(79),
	    toLength = __webpack_require__(77);
	module.exports = function fill(value /*, start = 0, end = @length */) {
	  var O = toObject(this),
	      length = toLength(O.length),
	      aLen = arguments.length,
	      index = toIndex(aLen > 1 ? arguments[1] : undefined, length),
	      end = aLen > 2 ? arguments[2] : undefined,
	      endPos = end === undefined ? length : toIndex(end, length);
	  while (endPos > index) {
	    O[index++] = value;
	  }return O;
	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $export = __webpack_require__(48),
	    $find = __webpack_require__(212)(5),
	    KEY = 'find',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(226)(KEY);

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $export = __webpack_require__(48),
	    $find = __webpack_require__(212)(6),
	    KEY = 'findIndex',
	    forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () {
	  forced = false;
	});
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /*, that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(226)(KEY);

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(232)('Array');

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    dP = __webpack_require__(51),
	    DESCRIPTORS = __webpack_require__(46),
	    SPECIES = __webpack_require__(65)('species');

	module.exports = function (KEY) {
	  var C = global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addToUnscopables = __webpack_require__(226),
	    step = __webpack_require__(234),
	    Iterators = __webpack_require__(169),
	    toIObject = __webpack_require__(72);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(168)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 234 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    inheritIfRequired = __webpack_require__(128),
	    dP = __webpack_require__(51).f,
	    gOPN = __webpack_require__(90).f,
	    isRegExp = __webpack_require__(174),
	    $flags = __webpack_require__(236),
	    $RegExp = global.RegExp,
	    Base = $RegExp,
	    proto = $RegExp.prototype,
	    re1 = /a/g,
	    re2 = /a/g
	// "new" creates a new object, old webkit buggy here
	,
	    CORRECT_NEW = new $RegExp(re1) !== re1;

	if (__webpack_require__(46) && (!CORRECT_NEW || __webpack_require__(47)(function () {
	  re2[__webpack_require__(65)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp,
	        piRE = isRegExp(p),
	        fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function proxy(key) {
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function get() {
	        return Base[key];
	      },
	      set: function set(it) {
	        Base[key] = it;
	      }
	    });
	  };
	  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
	    proxy(keys[i++]);
	  }proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(58)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(232)('RegExp');

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags

	var anObject = __webpack_require__(52);
	module.exports = function () {
	  var that = anObject(this),
	      result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(238);
	var anObject = __webpack_require__(52),
	    $flags = __webpack_require__(236),
	    DESCRIPTORS = __webpack_require__(46),
	    TO_STRING = 'toString',
	    $toString = /./[TO_STRING];

	var define = function define(fn) {
	  __webpack_require__(58)(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (__webpack_require__(47)(function () {
	  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
	})) {
	  define(function toString() {
	    var R = anObject(this);
	    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	  // FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 21.2.5.3 get RegExp.prototype.flags()
	if (__webpack_require__(46) && /./g.flags != 'g') __webpack_require__(51).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(236)
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@match logic
	__webpack_require__(240)('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    'use strict';

	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hide = __webpack_require__(50),
	    redefine = __webpack_require__(58),
	    fails = __webpack_require__(47),
	    defined = __webpack_require__(75),
	    wks = __webpack_require__(65);

	module.exports = function (KEY, length, exec) {
	  var SYMBOL = wks(KEY),
	      fns = exec(defined, SYMBOL, ''[KEY]),
	      strfn = fns[0],
	      rxfn = fns[1];
	  if (fails(function () {
	    var O = {};
	    O[SYMBOL] = function () {
	      return 7;
	    };
	    return ''[KEY](O) != 7;
	  })) {
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return rxfn.call(string, this, arg);
	    }
	    // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return rxfn.call(string, this);
	    });
	  }
	};

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@replace logic
	__webpack_require__(240)('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    'use strict';

	    var O = defined(this),
	        fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@search logic
	__webpack_require__(240)('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    'use strict';

	    var O = defined(this),
	        fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// @@split logic
	__webpack_require__(240)('split', 2, function (defined, SPLIT, $split) {
	  'use strict';

	  var isRegExp = __webpack_require__(174),
	      _split = $split,
	      $push = [].push,
	      $SPLIT = 'split',
	      LENGTH = 'length',
	      LAST_INDEX = 'lastIndex';
	  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function $split(separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) {
	              if (arguments[i] === undefined) match[i] = undefined;
	            }
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	    // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    $split = function $split(separator, limit) {
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this),
	        fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LIBRARY = __webpack_require__(68),
	    global = __webpack_require__(44),
	    ctx = __webpack_require__(60),
	    classof = __webpack_require__(115),
	    $export = __webpack_require__(48),
	    isObject = __webpack_require__(53),
	    aFunction = __webpack_require__(61),
	    anInstance = __webpack_require__(245),
	    forOf = __webpack_require__(246),
	    speciesConstructor = __webpack_require__(247),
	    task = __webpack_require__(248).set,
	    microtask = __webpack_require__(249)(),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(65)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();

	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(250)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(64)($Promise, PROMISE);
	__webpack_require__(232)(PROMISE);
	Wrapper = __webpack_require__(49)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(205)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(60),
	    call = __webpack_require__(201),
	    isArrayIter = __webpack_require__(202),
	    anObject = __webpack_require__(52),
	    toLength = __webpack_require__(77),
	    getIterFn = __webpack_require__(204),
	    BREAK = {},
	    RETURN = {};
	var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator,
	      result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	_exports.BREAK = BREAK;
	_exports.RETURN = RETURN;

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(52),
	    aFunction = __webpack_require__(61),
	    SPECIES = __webpack_require__(65)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ctx = __webpack_require__(60),
	    invoke = __webpack_require__(118),
	    html = __webpack_require__(88),
	    cel = __webpack_require__(55),
	    global = __webpack_require__(44),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(74)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	    // Browsers with postMessage, skip WebWorkers
	    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function defer(id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	    // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function defer(id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	    // Rest old browsers
	  } else {
	    defer = function defer(id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    macrotask = __webpack_require__(248).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(74)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function flush() {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();else last = undefined;
	        throw e;
	      }
	    }last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function notify() {
	      process.nextTick(flush);
	    };
	    // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function notify() {
	      promise.then(flush);
	    };
	    // for other environments - macrotask based on:
	    // - setImmediate
	    // - MessageChannel
	    // - window.postMessag
	    // - onreadystatechange
	    // - setTimeout
	  } else {
	    notify = function notify() {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    }last = task;
	  };
	};

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefine = __webpack_require__(58);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    redefine(target, key, src[key], safe);
	  }return target;
	};

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strong = __webpack_require__(252);

	// 23.1 Map Objects
	module.exports = __webpack_require__(253)('Map', function (get) {
	  return function Map() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dP = __webpack_require__(51).f,
	    create = __webpack_require__(86),
	    redefineAll = __webpack_require__(250),
	    ctx = __webpack_require__(60),
	    anInstance = __webpack_require__(245),
	    defined = __webpack_require__(75),
	    forOf = __webpack_require__(246),
	    $iterDefine = __webpack_require__(168),
	    step = __webpack_require__(234),
	    setSpecies = __webpack_require__(232),
	    DESCRIPTORS = __webpack_require__(46),
	    fastKey = __webpack_require__(62).fastKey,
	    SIZE = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function getEntry(that, key) {
	  // fast case
	  var index = fastKey(key),
	      entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined; // first entry
	      that._l = undefined; // last entry
	      that[SIZE] = 0; // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = this, data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function _delete(key) {
	        var that = this,
	            entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n,
	              prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        }return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */) {
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3),
	            entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) {
	            entry = entry.p;
	          }
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function get() {
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var entry = getEntry(that, key),
	        prev,
	        index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	      // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key, // <- key
	        v: value, // <- value
	        p: prev = that._l, // <- previous entry
	        n: undefined, // <- next entry
	        r: false // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    }return that;
	  },
	  getEntry: getEntry,
	  setStrong: function setStrong(C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = iterated; // target
	      this._k = kind; // kind
	      this._l = undefined; // previous
	    }, function () {
	      var that = this,
	          kind = that._k,
	          entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) {
	        entry = entry.p;
	      } // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    $export = __webpack_require__(48),
	    redefine = __webpack_require__(58),
	    redefineAll = __webpack_require__(250),
	    meta = __webpack_require__(62),
	    forOf = __webpack_require__(246),
	    anInstance = __webpack_require__(245),
	    isObject = __webpack_require__(53),
	    fails = __webpack_require__(47),
	    $iterDetect = __webpack_require__(205),
	    setToStringTag = __webpack_require__(64),
	    inheritIfRequired = __webpack_require__(128);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME],
	      C = Base,
	      ADDER = IS_MAP ? 'set' : 'add',
	      proto = C && C.prototype,
	      O = {};
	  var fixMethod = function fixMethod(KEY) {
	    var fn = proto[KEY];
	    redefine(proto, KEY, KEY == 'delete' ? function (a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'has' ? function has(a) {
	      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'get' ? function get(a) {
	      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	    } : KEY == 'add' ? function add(a) {
	      fn.call(this, a === 0 ? 0 : a);return this;
	    } : function set(a, b) {
	      fn.call(this, a === 0 ? 0 : a, b);return this;
	    });
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance = new C()
	    // early implementations not supports chaining
	    ,
	        HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    ,
	        THROWS_ON_PRIMITIVES = fails(function () {
	      instance.has(1);
	    })
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    ,
	        ACCEPT_ITERABLES = $iterDetect(function (iter) {
	      new C(iter);
	    }) // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    ,
	        BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C(),
	          index = 5;
	      while (index--) {
	        $instance[ADDER](index, index);
	      }return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strong = __webpack_require__(252);

	// 23.2 Set Objects
	module.exports = __webpack_require__(253)('Set', function (get) {
	  return function Set() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var each = __webpack_require__(212)(0),
	    redefine = __webpack_require__(58),
	    meta = __webpack_require__(62),
	    assign = __webpack_require__(109),
	    weak = __webpack_require__(256),
	    isObject = __webpack_require__(53),
	    getWeak = meta.getWeak,
	    isExtensible = Object.isExtensible,
	    uncaughtFrozenStore = weak.ufstore,
	    tmp = {},
	    InternalMap;

	var wrapper = function wrapper(get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(253)('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype,
	        method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	      }return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redefineAll = __webpack_require__(250),
	    getWeak = __webpack_require__(62).getWeak,
	    anObject = __webpack_require__(52),
	    isObject = __webpack_require__(53),
	    anInstance = __webpack_require__(245),
	    forOf = __webpack_require__(246),
	    createArrayMethod = __webpack_require__(212),
	    $has = __webpack_require__(45),
	    arrayFind = createArrayMethod(5),
	    arrayFindIndex = createArrayMethod(6),
	    id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.a = [];
	};
	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.a.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._i = id++; // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function _delete(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function def(that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var weak = __webpack_require__(256);

	// 23.4 WeakSet Objects
	__webpack_require__(253)('WeakSet', function (get) {
	  return function WeakSet() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $typed = __webpack_require__(259),
	    buffer = __webpack_require__(260),
	    anObject = __webpack_require__(52),
	    toIndex = __webpack_require__(79),
	    toLength = __webpack_require__(77),
	    isObject = __webpack_require__(53),
	    ArrayBuffer = __webpack_require__(44).ArrayBuffer,
	    speciesConstructor = __webpack_require__(247),
	    $ArrayBuffer = buffer.ArrayBuffer,
	    $DataView = buffer.DataView,
	    $isView = $typed.ABV && ArrayBuffer.isView,
	    $slice = $ArrayBuffer.prototype.slice,
	    VIEW = $typed.VIEW,
	    ARRAY_BUFFER = 'ArrayBuffer';

	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});

	$export($export.P + $export.U + $export.F * __webpack_require__(47)(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	    var len = anObject(this).byteLength,
	        first = toIndex(start, len),
	        final = toIndex(end === undefined ? len : end, len),
	        result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first)),
	        viewS = new $DataView(this),
	        viewT = new $DataView(result),
	        index = 0;
	    while (first < final) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    }return result;
	  }
	});

	__webpack_require__(232)(ARRAY_BUFFER);

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    hide = __webpack_require__(50),
	    uid = __webpack_require__(59),
	    TYPED = uid('typed_array'),
	    VIEW = uid('view'),
	    ABV = !!(global.ArrayBuffer && global.DataView),
	    CONSTR = ABV,
	    i = 0,
	    l = 9,
	    Typed;

	var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

	while (i < l) {
	  if (Typed = global[TypedArrayConstructors[i++]]) {
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	module.exports = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(44),
	    DESCRIPTORS = __webpack_require__(46),
	    LIBRARY = __webpack_require__(68),
	    $typed = __webpack_require__(259),
	    hide = __webpack_require__(50),
	    redefineAll = __webpack_require__(250),
	    fails = __webpack_require__(47),
	    anInstance = __webpack_require__(245),
	    toInteger = __webpack_require__(78),
	    toLength = __webpack_require__(77),
	    gOPN = __webpack_require__(90).f,
	    dP = __webpack_require__(51).f,
	    arrayFill = __webpack_require__(228),
	    setToStringTag = __webpack_require__(64),
	    ARRAY_BUFFER = 'ArrayBuffer',
	    DATA_VIEW = 'DataView',
	    PROTOTYPE = 'prototype',
	    WRONG_LENGTH = 'Wrong length!',
	    WRONG_INDEX = 'Wrong index!',
	    $ArrayBuffer = global[ARRAY_BUFFER],
	    $DataView = global[DATA_VIEW],
	    Math = global.Math,
	    RangeError = global.RangeError,
	    Infinity = global.Infinity,
	    BaseBuffer = $ArrayBuffer,
	    abs = Math.abs,
	    pow = Math.pow,
	    floor = Math.floor,
	    log = Math.log,
	    LN2 = Math.LN2,
	    BUFFER = 'buffer',
	    BYTE_LENGTH = 'byteLength',
	    BYTE_OFFSET = 'byteOffset',
	    $BUFFER = DESCRIPTORS ? '_b' : BUFFER,
	    $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH,
	    $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function packIEEE754(value, mLen, nBytes) {
	  var buffer = Array(nBytes),
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0,
	      i = 0,
	      s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0,
	      e,
	      m,
	      c;
	  value = abs(value);
	  if (value != value || value === Infinity) {
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = eLen - 7,
	      i = nBytes - 1,
	      s = buffer[i--],
	      e = s & 127,
	      m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  }return (s ? -1 : 1) * m * pow(2, e - mLen);
	};

	var unpackI32 = function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function packI8(it) {
	  return [it & 0xff];
	};
	var packI16 = function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function packF64(it) {
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function packF32(it) {
	  return packIEEE754(it, 23, 4);
	};

	var addGetter = function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function get() {
	      return this[internal];
	    } });
	};

	var get = function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index,
	      intIndex = toInteger(numIndex);
	  if (numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b,
	      start = intIndex + view[$OFFSET],
	      pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) {
	    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	  }
	};

	var validateArrayBufferArguments = function validateArrayBufferArguments(that, length) {
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length,
	      byteLength = toLength(numberLength);
	  if (numberLength != byteLength) throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};

	if (!$typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH],
	        offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (DESCRIPTORS) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	  }) || !fails(function () {
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2)),
	      $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48);
	$export($export.G + $export.W + $export.F * !__webpack_require__(259).ABV, {
	  DataView: __webpack_require__(260).DataView
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (__webpack_require__(46)) {
	  var LIBRARY = __webpack_require__(68),
	      global = __webpack_require__(44),
	      fails = __webpack_require__(47),
	      $export = __webpack_require__(48),
	      $typed = __webpack_require__(259),
	      $buffer = __webpack_require__(260),
	      ctx = __webpack_require__(60),
	      anInstance = __webpack_require__(245),
	      propertyDesc = __webpack_require__(57),
	      hide = __webpack_require__(50),
	      redefineAll = __webpack_require__(250),
	      toInteger = __webpack_require__(78),
	      toLength = __webpack_require__(77),
	      toIndex = __webpack_require__(79),
	      toPrimitive = __webpack_require__(56),
	      has = __webpack_require__(45),
	      same = __webpack_require__(111),
	      classof = __webpack_require__(115),
	      isObject = __webpack_require__(53),
	      toObject = __webpack_require__(98),
	      isArrayIter = __webpack_require__(202),
	      create = __webpack_require__(86),
	      getPrototypeOf = __webpack_require__(99),
	      gOPN = __webpack_require__(90).f,
	      getIterFn = __webpack_require__(204),
	      uid = __webpack_require__(59),
	      wks = __webpack_require__(65),
	      createArrayMethod = __webpack_require__(212),
	      createArrayIncludes = __webpack_require__(76),
	      speciesConstructor = __webpack_require__(247),
	      ArrayIterators = __webpack_require__(233),
	      Iterators = __webpack_require__(169),
	      $iterDetect = __webpack_require__(205),
	      setSpecies = __webpack_require__(232),
	      arrayFill = __webpack_require__(228),
	      arrayCopyWithin = __webpack_require__(225),
	      $DP = __webpack_require__(51),
	      $GOPD = __webpack_require__(91),
	      dP = $DP.f,
	      gOPD = $GOPD.f,
	      RangeError = global.RangeError,
	      TypeError = global.TypeError,
	      Uint8Array = global.Uint8Array,
	      ARRAY_BUFFER = 'ArrayBuffer',
	      SHARED_BUFFER = 'Shared' + ARRAY_BUFFER,
	      BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT',
	      PROTOTYPE = 'prototype',
	      ArrayProto = Array[PROTOTYPE],
	      $ArrayBuffer = $buffer.ArrayBuffer,
	      $DataView = $buffer.DataView,
	      arrayForEach = createArrayMethod(0),
	      arrayFilter = createArrayMethod(2),
	      arraySome = createArrayMethod(3),
	      arrayEvery = createArrayMethod(4),
	      arrayFind = createArrayMethod(5),
	      arrayFindIndex = createArrayMethod(6),
	      arrayIncludes = createArrayIncludes(true),
	      arrayIndexOf = createArrayIncludes(false),
	      arrayValues = ArrayIterators.values,
	      arrayKeys = ArrayIterators.keys,
	      arrayEntries = ArrayIterators.entries,
	      arrayLastIndexOf = ArrayProto.lastIndexOf,
	      arrayReduce = ArrayProto.reduce,
	      arrayReduceRight = ArrayProto.reduceRight,
	      arrayJoin = ArrayProto.join,
	      arraySort = ArrayProto.sort,
	      arraySlice = ArrayProto.slice,
	      arrayToString = ArrayProto.toString,
	      arrayToLocaleString = ArrayProto.toLocaleString,
	      ITERATOR = wks('iterator'),
	      TAG = wks('toStringTag'),
	      TYPED_CONSTRUCTOR = uid('typed_constructor'),
	      DEF_CONSTRUCTOR = uid('def_constructor'),
	      ALL_CONSTRUCTORS = $typed.CONSTR,
	      TYPED_ARRAY = $typed.TYPED,
	      VIEW = $typed.VIEW,
	      WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var strictToLength = function strictToLength(it, SAME) {
	    if (it === undefined) throw TypeError(WRONG_LENGTH);
	    var number = +it,
	        length = toLength(it);
	    if (SAME && !same(number, length)) throw RangeError(WRONG_LENGTH);
	    return length;
	  };

	  var toOffset = function toOffset(it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function validate(it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function allocate(C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    }return new C(length);
	  };

	  var speciesFromList = function speciesFromList(O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function fromList(C, list) {
	    var index = 0,
	        length = list.length,
	        result = allocate(C, length);
	    while (length > index) {
	      result[index] = list[index++];
	    }return result;
	  };

	  var addGetter = function addGetter(it, key, internal) {
	    dP(it, key, { get: function get() {
	        return this._d[internal];
	      } });
	  };

	  var $from = function from(source /*, mapfn, thisArg */) {
	    var O = toObject(source),
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        iterFn = getIterFn(O),
	        i,
	        length,
	        values,
	        result,
	        step,
	        iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      }O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of() /*...items*/{
	    var index = 0,
	        length = arguments.length,
	        result = allocate(this, length);
	    while (length > index) {
	      result[index] = arguments[index++];
	    }return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
	    arrayToLocaleString.call(new Uint8Array(1));
	  });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */) {
	      // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) {
	      // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */) {
	      // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */) {
	      // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this,
	          length = validate(that).length,
	          middle = Math.floor(length / 2),
	          index = 0,
	          value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      }return that;
	    },
	    some: function some(callbackfn /*, thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this),
	          length = O.length,
	          $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toIndex(end, length)) - $begin));
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /*, offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1),
	        length = this.length,
	        src = toObject(arrayLike),
	        len = toLength(src.length),
	        index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) {
	      this[offset + index] = src[index++];
	    }
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function isTAIndex(target, key) {
	    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () {
	    arrayToString.call({});
	  })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function constructor() {/* noop */},
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function get() {
	      return this[TYPED_ARRAY];
	    }
	  });

	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array',
	        ISNT_UINT8 = NAME != 'Uint8Array',
	        GETTER = 'get' + KEY,
	        SETTER = 'set' + KEY,
	        TypedArray = global[NAME],
	        Base = TypedArray || {},
	        TAC = TypedArray && getPrototypeOf(TypedArray),
	        FORCED = !TypedArray || !$typed.ABV,
	        O = {},
	        TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function getter(that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function setter(that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function addElement(that, index) {
	      dP(that, index, {
	        get: function get() {
	          return getter(this, index);
	        },
	        set: function set(value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0,
	            offset = 0,
	            buffer,
	            byteLength,
	            length,
	            klass;
	        if (!isObject(data)) {
	          length = strictToLength(data, true);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) {
	          addElement(that, index++);
	        }
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!$iterDetect(function (iter) {
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(strictToLength(data, ISNT_UINT8));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR],
	        CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined),
	        $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function get() {
	          return NAME;
	        }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, { toString: arrayToString });

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () {/* empty */};

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(263)('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(48),
	    aFunction = __webpack_require__(61),
	    anObject = __webpack_require__(52),
	    rApply = (__webpack_require__(44).Reflect || {}).apply,
	    fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(47)(function () {
	  rApply(function () {});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction(target),
	        L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export = __webpack_require__(48),
	    create = __webpack_require__(86),
	    aFunction = __webpack_require__(61),
	    anObject = __webpack_require__(52),
	    isObject = __webpack_require__(53),
	    fails = __webpack_require__(47),
	    bind = __webpack_require__(117),
	    rConstruct = (__webpack_require__(44).Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() {}
	  return !(rConstruct(function () {}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () {});
	});

	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0:
	          return new Target();
	        case 1:
	          return new Target(args[0]);
	        case 2:
	          return new Target(args[0], args[1]);
	        case 3:
	          return new Target(args[0], args[1], args[2]);
	        case 4:
	          return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype,
	        instance = create(isObject(proto) ? proto : Object.prototype),
	        result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP = __webpack_require__(51),
	    $export = __webpack_require__(48),
	    anObject = __webpack_require__(52),
	    toPrimitive = __webpack_require__(56);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(47)(function () {
	  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export = __webpack_require__(48),
	    gOPD = __webpack_require__(91).f,
	    anObject = __webpack_require__(52);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)

	var $export = __webpack_require__(48),
	    anObject = __webpack_require__(52);
	var Enumerate = function Enumerate(iterated) {
	  this._t = anObject(iterated); // target
	  this._i = 0; // next index
	  var keys = this._k = [] // keys
	  ,
	      key;
	  for (key in iterated) {
	    keys.push(key);
	  }
	};
	__webpack_require__(170)(Enumerate, 'Object', function () {
	  var that = this,
	      keys = that._k,
	      key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD = __webpack_require__(91),
	    getPrototypeOf = __webpack_require__(99),
	    has = __webpack_require__(45),
	    $export = __webpack_require__(48),
	    isObject = __webpack_require__(53),
	    anObject = __webpack_require__(52);

	function get(target, propertyKey /*, receiver*/) {
	  var receiver = arguments.length < 3 ? target : arguments[2],
	      desc,
	      proto;
	  if (anObject(target) === receiver) return target[propertyKey];
	  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
	  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', { get: get });

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD = __webpack_require__(91),
	    $export = __webpack_require__(48),
	    anObject = __webpack_require__(52);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export = __webpack_require__(48),
	    getProto = __webpack_require__(99),
	    anObject = __webpack_require__(52);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(48);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.10 Reflect.isExtensible(target)
	var $export = __webpack_require__(48),
	    anObject = __webpack_require__(52),
	    $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(48);

	$export($export.S, 'Reflect', { ownKeys: __webpack_require__(283) });

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// all object keys, includes non-enumerable and symbols
	var gOPN = __webpack_require__(90),
	    gOPS = __webpack_require__(83),
	    anObject = __webpack_require__(52),
	    Reflect = __webpack_require__(44).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject(it)),
	      getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.12 Reflect.preventExtensions(target)
	var $export = __webpack_require__(48),
	    anObject = __webpack_require__(52),
	    $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = __webpack_require__(51),
	    gOPD = __webpack_require__(91),
	    getPrototypeOf = __webpack_require__(99),
	    has = __webpack_require__(45),
	    $export = __webpack_require__(48),
	    createDesc = __webpack_require__(57),
	    anObject = __webpack_require__(52),
	    isObject = __webpack_require__(53);

	function set(target, propertyKey, V /*, receiver*/) {
	  var receiver = arguments.length < 4 ? target : arguments[3],
	      ownDesc = gOPD.f(anObject(target), propertyKey),
	      existingDescriptor,
	      proto;
	  if (!ownDesc) {
	    if (isObject(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject(receiver)) return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', { set: set });

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export = __webpack_require__(48),
	    setProto = __webpack_require__(113);

	if (setProto) $export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes

	var $export = __webpack_require__(48),
	    $includes = __webpack_require__(76)(true);

	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(226)('includes');

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at

	var $export = __webpack_require__(48),
	    $at = __webpack_require__(167)(true);

	$export($export.P, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end

	var $export = __webpack_require__(48),
	    $pad = __webpack_require__(290);

	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(77),
	    repeat = __webpack_require__(131),
	    defined = __webpack_require__(75);

	module.exports = function (that, maxLength, fillString, left) {
	  var S = String(defined(that)),
	      stringLength = S.length,
	      fillStr = fillString === undefined ? ' ' : String(fillString),
	      intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength,
	      stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end

	var $export = __webpack_require__(48),
	    $pad = __webpack_require__(290);

	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	__webpack_require__(123)('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

	__webpack_require__(123)('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/

	var $export = __webpack_require__(48),
	    defined = __webpack_require__(75),
	    toLength = __webpack_require__(77),
	    isRegExp = __webpack_require__(174),
	    getFlags = __webpack_require__(236),
	    RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};

	__webpack_require__(170)($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});

	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this),
	        flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp),
	        rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(67)('asyncIterator');

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(67)('observable');

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export = __webpack_require__(48),
	    ownKeys = __webpack_require__(283),
	    toIObject = __webpack_require__(72),
	    gOPD = __webpack_require__(91),
	    createProperty = __webpack_require__(203);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object),
	        getDesc = gOPD.f,
	        keys = ownKeys(O),
	        result = {},
	        i = 0,
	        key;
	    while (keys.length > i) {
	      createProperty(result, key = keys[i++], getDesc(O, key));
	    }return result;
	  }
	});

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(48),
	    $values = __webpack_require__(299)(false);

	$export($export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getKeys = __webpack_require__(70),
	    toIObject = __webpack_require__(72),
	    isEnum = __webpack_require__(84).f;
	module.exports = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it),
	        keys = getKeys(O),
	        length = keys.length,
	        i = 0,
	        result = [],
	        key;
	    while (length > i) {
	      if (isEnum.call(O, key = keys[i++])) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }return result;
	  };
	};

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(48),
	    $entries = __webpack_require__(299)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    aFunction = __webpack_require__(61),
	    $defineProperty = __webpack_require__(51);

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(46) && $export($export.P + __webpack_require__(302), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(68) || !__webpack_require__(47)(function () {
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function () {/* empty */});
	  delete __webpack_require__(44)[K];
	});

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    aFunction = __webpack_require__(61),
	    $defineProperty = __webpack_require__(51);

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(46) && $export($export.P + __webpack_require__(302), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	  }
	});

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    toPrimitive = __webpack_require__(56),
	    getPrototypeOf = __webpack_require__(99),
	    getOwnPropertyDescriptor = __webpack_require__(91).f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(46) && $export($export.P + __webpack_require__(302), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    toObject = __webpack_require__(98),
	    toPrimitive = __webpack_require__(56),
	    getPrototypeOf = __webpack_require__(99),
	    getOwnPropertyDescriptor = __webpack_require__(91).f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(46) && $export($export.P + __webpack_require__(302), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this),
	        K = toPrimitive(P, true),
	        D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(48);

	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(307)('Map') });

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(115),
	    from = __webpack_require__(308);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forOf = __webpack_require__(246);

	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(48);

	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(307)('Set') });

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(48);

	$export($export.S, 'System', { global: __webpack_require__(44) });

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(48),
	    cof = __webpack_require__(74);

	$export($export.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0,
	        $x1 = x1 >>> 0,
	        $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >> 16,
	        v1 = $v >> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(48);

	$export($export.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff,
	        $u = +u,
	        $v = +v,
	        u0 = $u & UINT16,
	        v0 = $v & UINT16,
	        u1 = $u >>> 16,
	        v1 = $v >>> 16,
	        t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	  } });

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Map = __webpack_require__(251),
	    $export = __webpack_require__(48),
	    shared = __webpack_require__(63)('metadata'),
	    store = shared.store || (shared.store = new (__webpack_require__(255))());

	var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
	  var targetMetadata = store.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  }return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false),
	      keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) {
	    keys.push(key);
	  });
	  return keys;
	};
	var toMetaKey = function toMetaKey(it) {
	  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
	};
	var exp = function exp(O) {
	  $export($export.S, 'Reflect', O);
	};

	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    toMetaKey = metadata.key,
	    getOrCreateMetadataMap = metadata.map,
	    store = metadata.store;

	metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */) {
	    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]),
	        metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	    if (metadataMap.size) return true;
	    var targetMetadata = store.get(target);
	    targetMetadata['delete'](targetKey);
	    return !!targetMetadata.size || store['delete'](target);
	  } });

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    getPrototypeOf = __webpack_require__(99),
	    ordinaryHasOwnMetadata = metadata.has,
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;

	var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata.exp({ getMetadata: function getMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Set = __webpack_require__(254),
	    from = __webpack_require__(308),
	    metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    getPrototypeOf = __webpack_require__(99),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;

	var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
	  var oKeys = ordinaryOwnMetadataKeys(O, P),
	      parent = getPrototypeOf(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata.exp({ getMetadataKeys: function getMetadataKeys(target /*, targetKey */) {
	    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    ordinaryGetOwnMetadata = metadata.get,
	    toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    ordinaryOwnMetadataKeys = metadata.keys,
	    toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */) {
	    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	  } });

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    getPrototypeOf = __webpack_require__(99),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;

	var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    ordinaryHasOwnMetadata = metadata.has,
	    toMetaKey = metadata.key;

	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */) {
	    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	  } });

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var metadata = __webpack_require__(317),
	    anObject = __webpack_require__(52),
	    aFunction = __webpack_require__(61),
	    toMetaKey = metadata.key,
	    ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	    return function decorator(target, targetKey) {
	      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
	    };
	  } });

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export = __webpack_require__(48),
	    microtask = __webpack_require__(249)(),
	    process = __webpack_require__(44).process,
	    isNode = __webpack_require__(74)(process) == 'process';

	$export($export.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable

	var $export = __webpack_require__(48),
	    global = __webpack_require__(44),
	    core = __webpack_require__(49),
	    microtask = __webpack_require__(249)(),
	    OBSERVABLE = __webpack_require__(65)('observable'),
	    aFunction = __webpack_require__(61),
	    anObject = __webpack_require__(52),
	    anInstance = __webpack_require__(245),
	    redefineAll = __webpack_require__(250),
	    hide = __webpack_require__(50),
	    forOf = __webpack_require__(246),
	    RETURN = forOf.RETURN;

	var getMethod = function getMethod(fn) {
	  return fn == null ? undefined : aFunction(fn);
	};

	var cleanupSubscription = function cleanupSubscription(subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function subscriptionClosed(subscription) {
	  return subscription._o === undefined;
	};

	var closeSubscription = function closeSubscription(subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function Subscription(observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer),
	        subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
	        subscription.unsubscribe();
	      };else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  }if (subscriptionClosed(this)) cleanupSubscription(this);
	};

	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() {
	    closeSubscription(this);
	  }
	});

	var SubscriptionObserver = function SubscriptionObserver(subscription) {
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    }cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};

	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function next(value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
	      items[i] = arguments[i++];
	    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var i = 0; i < items.length; ++i) {
	            observer.next(items[i]);
	            if (done) return;
	          }observer.complete();
	        }
	      });
	      return function () {
	        done = true;
	      };
	    });
	  }
	});

	hide($Observable.prototype, OBSERVABLE, function () {
	  return this;
	});

	$export($export.G, { Observable: $Observable });

	__webpack_require__(232)('Observable');

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// ie9- setTimeout & setInterval additional parameters fix
	var global = __webpack_require__(44),
	    $export = __webpack_require__(48),
	    invoke = __webpack_require__(118),
	    partial = __webpack_require__(329),
	    navigator = global.navigator,
	    MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function wrap(set) {
	  return MSIE ? function (fn, time /*, ...args */) {
	    return set(invoke(partial, [].slice.call(arguments, 2), typeof fn == 'function' ? fn : Function(fn)), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout: wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(330),
	    invoke = __webpack_require__(118),
	    aFunction = __webpack_require__(61);
	module.exports = function () /* ...pargs */{
	  var fn = aFunction(this),
	      length = arguments.length,
	      pargs = Array(length),
	      i = 0,
	      _ = path._,
	      holder = false;
	  while (length > i) {
	    if ((pargs[i] = arguments[i++]) === _) holder = true;
	  }return function () /* ...args */{
	    var that = this,
	        aLen = arguments.length,
	        j = 0,
	        k = 0,
	        args;
	    if (!holder && !aLen) return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if (holder) for (; length > j; j++) {
	      if (args[j] === _) args[j] = arguments[k++];
	    }while (aLen > k) {
	      args.push(arguments[k++]);
	    }return invoke(fn, args, that);
	  };
	};

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(44);

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $export = __webpack_require__(48),
	    $task = __webpack_require__(248);
	$export($export.G + $export.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $iterators = __webpack_require__(233),
	    redefine = __webpack_require__(58),
	    global = __webpack_require__(44),
	    hide = __webpack_require__(50),
	    Iterators = __webpack_require__(169),
	    wks = __webpack_require__(65),
	    ITERATOR = wks('iterator'),
	    TO_STRING_TAG = wks('toStringTag'),
	    ArrayValues = Iterators.Array;

	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype,
	      key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for (key in $iterators) {
	      if (!proto[key]) redefine(proto, key, $iterators[key], true);
	    }
	  }
	}

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!function (global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  runtime.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function (arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError("The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (!info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function () {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function stop() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	}(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(334)(module), __webpack_require__(17)))

/***/ },
/* 334 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(336);
	module.exports = __webpack_require__(49).RegExp.escape;

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(48),
	    $re = __webpack_require__(337)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', { escape: function escape(it) {
	    return $re(it);
	  } });

/***/ },
/* 337 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 338 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Search = function () {
	    function Search(container) {
	        _classCallCheck(this, Search);

	        this.options = {
	            formHiddenClass: 'bab-Search-form--hidden'
	        };

	        this.opener = container.querySelector('.js-search-opener');
	        this.form = container.querySelector('.js-search-form');
	        this.input = this.form.querySelector('.js-search-input');

	        this.initEvents();
	    }

	    _createClass(Search, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            this.opener.addEventListener('click', this.toggle.bind(this));
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.form.classList.toggle(this.options.formHiddenClass);

	            this.input.focus();
	        }
	    }, {
	        key: 'isHidden',
	        value: function isHidden() {
	            return this.form.classList.contains(this.options.formHiddenClass);
	        }
	    }]);

	    return Search;
	}();

	exports.default = Search;

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domDelegate = __webpack_require__(4);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	var _commentForm = __webpack_require__(340);

	var _commentForm2 = _interopRequireDefault(_commentForm);

	var _comment = __webpack_require__(345);

	var _comment2 = _interopRequireDefault(_comment);

	var _closest = __webpack_require__(346);

	var _closest2 = _interopRequireDefault(_closest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Comments = function () {
	    function Comments(container, header) {
	        _classCallCheck(this, Comments);

	        this.container = container;
	        this.containerDelegate = (0, _domDelegate2.default)(container);

	        var formSelector = container.getAttribute('data-comments-form');
	        var formContainer = document.querySelector(formSelector);
	        this.form = new _commentForm2.default(formContainer, header);

	        var commentContainers = [].concat(_toConsumableArray(container.querySelectorAll('.js-comment')));
	        this.comments = commentContainers.map(function (container) {
	            return new _comment2.default(container);
	        });

	        this.currentlyAnsweringComment = null;

	        this.initEvents();
	    }

	    _createClass(Comments, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            this.containerDelegate.on('click', '.js-comment-answer', this.handleAnswerClick.bind(this));
	        }
	    }, {
	        key: 'handleAnswerClick',
	        value: function handleAnswerClick(event) {
	            var target = event.target;


	            var commentContainer = (0, _closest2.default)(target, '.js-comment');
	            var comment = this.comments.filter(function (comment) {
	                return comment.container == commentContainer;
	            }).pop();

	            if (comment.isAnswering) {
	                this.currentlyAnsweringComment && this.currentlyAnsweringComment.reset();
	                comment.reset();
	                this.form.restore();
	            } else {
	                this.currentlyAnsweringComment && this.currentlyAnsweringComment.reset();
	                this.currentlyAnsweringComment = comment;
	                comment.answering();
	                this.form.appendTo(comment);
	            }
	        }
	    }]);

	    return Comments;
	}();

	exports.default = Comments;

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xhrForm = __webpack_require__(341);

	var _xhrForm2 = _interopRequireDefault(_xhrForm);

	var _notification = __webpack_require__(342);

	var _notification2 = _interopRequireDefault(_notification);

	var _naturalScroll = __webpack_require__(343);

	var _breakpoints = __webpack_require__(344);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CommentForm = function () {
	    function CommentForm(container, header) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	        _classCallCheck(this, CommentForm);

	        this.options = _extends({
	            scrollTopDelta: 10
	        }, options);

	        this.container = container;
	        this.header = header;

	        this.form = container.querySelector('form');
	        this.xhrForm = new _xhrForm2.default(this.form, {
	            onSubmit: this.resetErrors.bind(this),
	            onSuccess: this.onSuccess.bind(this),
	            onError: this.onError.bind(this)
	        });

	        this.parentSelect = this.form.querySelector('#babdelaura_blogbundle_commentaire_parent');
	        this.parentOptions = [].concat(_toConsumableArray(this.parentSelect.querySelectorAll('option')));

	        var notificationContainerSelector = container.getAttribute('data-comment-form-notification');
	        var notificationContainer = document.querySelector(notificationContainerSelector);
	        this.notification = new _notification2.default(notificationContainer);
	    }

	    _createClass(CommentForm, [{
	        key: 'setParent',
	        value: function setParent(parentId) {
	            var selectedOption = this.parentOptions.filter(function (option) {
	                return option.value == parentId;
	            }).pop();
	            this.parentOptions.forEach(function (option) {
	                return option.selected = false;
	            });

	            if (selectedOption) {
	                selectedOption.selected = true;
	            } else {
	                this.parentOptions[0].selected = true;
	            }
	        }
	    }, {
	        key: 'appendTo',
	        value: function appendTo(comment) {
	            var _this = this;

	            comment.container.appendChild(this.form);
	            this.setParent(comment.parentId);

	            setTimeout(function () {
	                var offsetTop = comment.container.offsetTop;
	                var offsetHeight = _this.header.container.offsetHeight;


	                var scrollTopLevel = offsetTop - _this.options.scrollTopDelta;

	                var currentViewport = (0, _breakpoints.getCurrentViewport)();

	                if (currentViewport === _breakpoints.viewports.LARGE_VIEWPORT) {
	                    scrollTopLevel -= offsetHeight;
	                }

	                (0, _naturalScroll.scrollTop)(document.documentElement, scrollTopLevel);
	                (0, _naturalScroll.scrollTop)(document.body, scrollTopLevel);
	            }, 100);
	        }
	    }, {
	        key: 'restoreInOriginalContainer',
	        value: function restoreInOriginalContainer() {
	            var _this2 = this;

	            this.container.appendChild(this.form);

	            setTimeout(function () {
	                var offsetTop = _this2.container.offsetTop;
	                var offsetHeight = _this2.header.container.offsetHeight;


	                var scrollTopLevel = offsetTop - offsetHeight - _this2.options.scrollTopDelta - 50;

	                (0, _naturalScroll.scrollTop)(document.documentElement, scrollTopLevel);
	                (0, _naturalScroll.scrollTop)(document.body, scrollTopLevel);
	            }, 100);
	        }
	    }, {
	        key: 'restore',
	        value: function restore() {
	            this.restoreInOriginalContainer();
	            this.setParent(null);
	        }
	    }, {
	        key: 'onSuccess',
	        value: function onSuccess(data) {
	            var _this3 = this;

	            var success = data.success;
	            var errors = data.errors;
	            var message = data.message;


	            if (!success) {
	                this.setErrors(errors);
	                return;
	            }

	            this.form.reset();

	            this.notification.hide().then(function () {
	                _this3.notification.setText(message);
	                _this3.notification.setType('success');
	                _this3.notification.show();
	            });
	        }
	    }, {
	        key: 'onError',
	        value: function onError() {
	            var _this4 = this;

	            this.notification.hide().then(function () {
	                _this4.notification.setText('Une erreur innatendue est survenue');
	                _this4.notification.setType('error');
	                _this4.notification.show();
	            });
	        }
	    }, {
	        key: 'setErrors',
	        value: function setErrors(errors) {
	            for (var field in errors) {
	                var messages = errors[field];
	                this.setError(field, messages);
	            }
	        }
	    }, {
	        key: 'setError',
	        value: function setError(field, messages) {
	            var message = messages.join(', ');
	            var errorContainer = document.getElementById('error-' + field);

	            errorContainer.textContent = message;
	        }
	    }, {
	        key: 'resetErrors',
	        value: function resetErrors() {
	            var _this5 = this;

	            var errorContainers = [].concat(_toConsumableArray(this.container.querySelectorAll('[id^="error-"]')));

	            errorContainers.forEach(function (container) {
	                return _this5.resetError(container);
	            });
	        }
	    }, {
	        key: 'resetError',
	        value: function resetError(errorContainer) {
	            errorContainer.textContent = '';
	        }
	    }]);

	    return CommentForm;
	}();

	exports.default = CommentForm;

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _axios = __webpack_require__(8);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Gestion d'un formulaire XHR
	 */
	var XHRForm = function () {
	    function XHRForm(container) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, XHRForm);

	        this.options = _extends({
	            onSubmit: function onSubmit() {},
	            onSuccess: function onSuccess() {},
	            onError: function onError() {}
	        }, options);

	        this.container = container;
	        this.url = this.container.getAttribute('action');
	        this.submitButton = this.container.querySelector('[type="submit"]');

	        this.initEvents();
	    }

	    /**
	     *  Bloquage de l'événement submit par défaut
	     */


	    _createClass(XHRForm, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.container.addEventListener('submit', function (event) {
	                event.preventDefault();
	                _this.submit();
	            });
	        }

	        /**
	         * Gestion de la soumission du formulaire en XHR
	         */

	    }, {
	        key: 'submit',
	        value: function submit() {
	            var _this2 = this;

	            var data = new FormData(this.container);
	            var config = {};
	            var _options = this.options;
	            var onSubmit = _options.onSubmit;
	            var onSuccess = _options.onSuccess;
	            var onError = _options.onError;


	            this.submitButton.disabled = true;

	            onSubmit();

	            _axios2.default.post(this.url, data, config).then(function (response) {
	                _this2.submitButton.disabled = false;

	                if (response.status === 200) {
	                    return response.data;
	                }

	                throw new Error('error');
	            }).then(function (data) {
	                return onSuccess(data);
	            }).catch(function (error) {
	                _this2.submitButton.disabled = false;

	                onError(error);
	            });
	        }
	    }]);

	    return XHRForm;
	}();

	exports.default = XHRForm;

/***/ },
/* 342 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Notification = function () {
	    function Notification(container) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, Notification);

	        this.options = _extends({
	            baseClassName: 'bab-Notification',
	            visibleClassName: 'bab-Notification--visible',
	            type: 'neutral',
	            isVisible: false,
	            animationDuration: 200
	        }, options);

	        this.container = container;
	        this.closer = container.querySelector('.js-notification-closer');
	        this.content = container.querySelector('.js-notification-content');

	        this.type = this.options.type;
	        this.isVisible = this.options.isVisible;

	        this.updateClassName();

	        this.initEvents();
	    }

	    _createClass(Notification, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            this.closer.addEventListener('click', this.hide.bind(this));
	        }
	    }, {
	        key: 'setText',
	        value: function setText(text) {
	            this.content.textContent = text;
	        }
	    }, {
	        key: 'setType',
	        value: function setType(type) {
	            this.type = type;

	            this.updateClassName();
	        }
	    }, {
	        key: 'updateClassName',
	        value: function updateClassName() {
	            var className = this.options.baseClassName + ' bab-Notification--' + this.type;

	            if (this.isVisible) {
	                className += ' ' + this.options.visibleClassName;
	            }

	            this.container.className = className;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            var _this = this;

	            this.isVisible = false;
	            this.updateClassName();

	            return new Promise(function (resolve) {
	                return setTimeout(resolve, _this.options.animationDuration);
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            var _this2 = this;

	            this.isVisible = true;
	            this.updateClassName();

	            return new Promise(function (resolve) {
	                return setTimeout(resolve, _this2.options.animationDuration);
	            });
	        }
	    }]);

	    return Notification;
	}();

	exports.default = Notification;

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!function (e, n) {
	   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : n("undefined" != typeof exports ? exports : e.naturalScroll = {});
	}(undefined, function (e) {
	  var n = [[], []],
	      f = "scrollTop",
	      t = "scrollLeft",
	      o = function o(e) {
	    return function (o, r, i) {
	      o = o.scroller || o, i = i || 600;for (var u, _c, l = n[e ? 0 : 1], s = e ? f : t, a = 0, p = o[s], d = 0, m = 0; a < l.length; a++) {
	        u = l[a].e == o ? l[a] : u;
	      }u ? (d = u.f[1], m = u.f[2]) : l.push(u = { e: o }), u.t = new Date().getTime() + i;var T = u.n = i,
	          g = T * T,
	          h = g * T,
	          v = p - r;u.f = [p, d, m, -(9 * m * g + (36 * d - 9 * m) * T - 36 * d + 60 * v) / (h - T), 6 * (6 * m * g + (32 * d - 6 * m) * T - 32 * d + 60 * v) / T / (h + 2 * g - T - 2), -60 * (m * g + (6 * d - m) * T - 6 * d + 12 * v) / T / (g * g + 5 * (h + g - T) - 6)], (_c = function c(e) {
	        for (; u.n && u.n > u.t - new Date().getTime();) {
	          for (e = 4; e + 1;) {
	            u.f[e] += u.f[e-- + 1];
	          }u.n--;
	        }o[s] = u.f[0], u.n ? setTimeout(_c, 1) : u.f[1] = u.f[2] = 0;
	      })();
	    };
	  };e[f] = o(e[t] = o());
	});

/***/ },
/* 344 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var SMALL_VIEWPORT = 'screen and (max-width: 430px)';
	var MEDIUM_VIEWPORT = 'screen and (max-width: 790px)';
	var LARGE_VIEWPORT = 'screen and (min-width: 791px)';

	var viewports = {
	    SMALL_VIEWPORT: SMALL_VIEWPORT,
	    MEDIUM_VIEWPORT: MEDIUM_VIEWPORT,
	    LARGE_VIEWPORT: LARGE_VIEWPORT
	};

	var match = function match(viewport) {
	    return window.matchMedia(viewport).matches;
	};

	var getCurrentViewport = function getCurrentViewport() {
	    for (var viewport in viewports) {
	        if (match(viewports[viewport])) {
	            return viewports[viewport];
	        }
	    }
	};

	exports.viewports = viewports;
	exports.getCurrentViewport = getCurrentViewport;

/***/ },
/* 345 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Comment = function () {
	    function Comment(container) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, Comment);

	        this.options = _extends({
	            isAnsweringButtonText: 'Annuler la réponse',
	            isAnsweringButtonClass: 'bab-Comment-answerButton--answering',
	            normalButtonText: 'Répondre'
	        }, options);

	        this.container = container;
	        this.answerButton = container.querySelector('.js-comment-answer');
	        this.isAnswering = false;
	        this.parentId = container.getAttribute('data-parent-id');
	    }

	    _createClass(Comment, [{
	        key: 'answering',
	        value: function answering() {
	            this.isAnswering = true;
	            this.answerButton.textContent = this.options.isAnsweringButtonText;
	            this.answerButton.classList.add(this.options.isAnsweringButtonClass);
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.isAnswering = false;
	            this.answerButton.textContent = this.options.normalButtonText;
	            this.answerButton.classList.remove(this.options.isAnsweringButtonClass);
	        }
	    }]);

	    return Comment;
	}();

	exports.default = Comment;

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var matches = __webpack_require__(347);

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode;

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode;
	  }
	};

/***/ },
/* 347 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _breakpoints = __webpack_require__(344);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Header = function () {
	    function Header(container) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, Header);

	        this.options = _extends({
	            visibleClass: 'bab-Header--visible',
	            triggerCrossClass: 'bab-NavigationTrigger--cross',
	            dropshadowVisibleClass: 'bab-Dropshadow--visible'
	        }, options);

	        this.container = container;

	        var triggerSelector = container.getAttribute('data-header-trigger');
	        this.trigger = document.querySelector(triggerSelector);

	        this.dropshadow = document.querySelector('.js-dropshadow');

	        this.lastScrollPosition = window.scrollY;

	        this.handleScroll = this.handleScroll.bind(this);
	        this.handleResize = this.handleResize.bind(this);

	        this.currentViewport = (0, _breakpoints.getCurrentViewport)();

	        if (this.currentViewport === _breakpoints.viewports.LARGE_VIEWPORT) {
	            this.show();
	        }

	        this.initEvents();
	    }

	    _createClass(Header, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            window.addEventListener('scroll', this.handleScroll);
	            window.addEventListener('resize', this.handleResize);
	            this.trigger.addEventListener('click', this.toggle.bind(this));
	            this.dropshadow.addEventListener('click', this.toggle.bind(this));
	        }
	    }, {
	        key: 'handleScroll',
	        value: function handleScroll() {
	            if (this.currentViewport === _breakpoints.viewports.MEDIUM_VIEWPORT || this.currentViewport === _breakpoints.viewports.SMALL_VIEWPORT) {
	                return;
	            }

	            var newScrollPosition = window.scrollY;

	            newScrollPosition < this.lastScrollPosition ? this.show() : this.hide();

	            this.lastScrollPosition = newScrollPosition;
	        }
	    }, {
	        key: 'handleResize',
	        value: function handleResize() {
	            var newCurrentViewport = (0, _breakpoints.getCurrentViewport)();

	            if (newCurrentViewport === this.currentViewport) {
	                return;
	            }

	            if (this.currentViewport === _breakpoints.viewports.LARGE_VIEWPORT && newCurrentViewport === _breakpoints.viewports.MEDIUM_VIEWPORT || newCurrentViewport === _breakpoints.viewports.SMALL_VIEWPORT) {
	                this.hide();
	            }

	            if ((this.currentViewport === _breakpoints.viewports.SMALL_VIEWPORT || this.currentViewport === _breakpoints.viewports.MEDIUM_VIEWPORT) && newCurrentViewport === _breakpoints.viewports.LARGE_VIEWPORT) {
	                this.show();
	            }

	            this.currentViewport = newCurrentViewport;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.container.classList.remove(this.options.visibleClass);
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.container.classList.add(this.options.visibleClass);
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.trigger.classList.toggle(this.options.triggerCrossClass);
	            this.container.classList.toggle(this.options.visibleClass);
	            this.dropshadow.classList.toggle(this.options.dropshadowVisibleClass);
	        }
	    }]);

	    return Header;
	}();

	exports.default = Header;

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _url = __webpack_require__(350);

	var _photoswipe = __webpack_require__(356);

	var _photoswipe2 = _interopRequireDefault(_photoswipe);

	var _photoswipeUiDefault = __webpack_require__(357);

	var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

	var _domDelegate = __webpack_require__(4);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Slideshow d'images
	 */
	var ImagesSlideshow = function () {
	    function ImagesSlideshow(container) {
	        _classCallCheck(this, ImagesSlideshow);

	        this.options = {
	            photoSwipe: {
	                bgOpacity: 0.85,
	                closeOnScroll: false,
	                history: false
	            }
	        };

	        this.container = container;
	        this.photoSwipeElement = document.querySelector(this.container.getAttribute('data-gallery-pswp-element'));
	        this.images = [].concat(_toConsumableArray(this.container.querySelectorAll('img')));

	        this.photoSwipeItems = [];
	        this.photoSwipe = null;

	        this.containerDelegate = (0, _domDelegate2.default)(this.container);

	        this.initPhotoSwipeItems();
	        this.initEvents();
	    }

	    /**
	     * Initialise les objets à passer à PhotoSwipe
	     * PhotoSwipe a besoin de la src et des dimensions de chaque image
	     */


	    _createClass(ImagesSlideshow, [{
	        key: 'initPhotoSwipeItems',
	        value: function initPhotoSwipeItems() {
	            var _this = this;

	            this.images.forEach(function (image) {
	                var srcParams = (0, _url.parse)(image.src, true).query;
	                var item = {
	                    src: image.src,
	                    w: parseInt(srcParams.width, 10),
	                    h: parseInt(srcParams.height, 10)
	                };

	                _this.photoSwipeItems.push(item);
	            });
	        }

	        /**
	         * Gestion du click sur une image
	         */

	    }, {
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this2 = this;

	            this.containerDelegate.on('click', 'img', function (event) {
	                var img = event.target;
	                var imgIndex = _this2.images.indexOf(img);

	                _this2.show(imgIndex);
	            });
	        }

	        /**
	         * Ouvre le slideshow directement à l'index donné
	         */

	    }, {
	        key: 'show',
	        value: function show(index) {
	            this.options.photoSwipe.index = index;
	            this.photoSwipe = new _photoswipe2.default(this.photoSwipeElement, _photoswipeUiDefault2.default, this.photoSwipeItems, this.options.photoSwipe);
	            this.photoSwipe.init();
	        }
	    }]);

	    return ImagesSlideshow;
	}();

	exports.default = ImagesSlideshow;

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(351);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,


	// RFC 2396: characters reserved for delimiting URLs.
	// We actually just auto-escape these.
	delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],


	// RFC 2396: characters not allowed for various reasons.
	unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),


	// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	autoEscape = ['\''].concat(unwise),

	// Characters that are never ever allowed in a hostname.
	// Note that any invalid chars are also handled, but these
	// are the ones that are *expected* to be seen, so we fast-path
	// them.
	nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,

	// protocols that can allow "unsafe" and "unwise" chars.
	unsafeProtocol = {
	  'javascript': true,
	  'javascript:': true
	},

	// protocols that never have a hostname.
	hostlessProtocol = {
	  'javascript': true,
	  'javascript:': true
	},

	// protocols that always contain a // bit.
	slashedProtocol = {
	  'http': true,
	  'https': true,
	  'ftp': true,
	  'gopher': true,
	  'file': true,
	  'http:': true,
	  'https:': true,
	  'ftp:': true,
	  'gopher:': true,
	  'file:': true
	},
	    querystring = __webpack_require__(353);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url();
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + (typeof url === 'undefined' ? 'undefined' : _typeof(url)));
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ? 'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }

	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function () {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query && isObject(this.query) && Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || query && '?' + query || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function (match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function (relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function (relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function (k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function (k) {
	      if (k !== 'protocol') result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function (k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift())) {}
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
	      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
	      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = relative.host || relative.host === '' ? relative.host : result.host;
	    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (result.host || relative.host) && (last === '.' || last === '..') || last === '';

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || result.host && srcPath.length;

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function () {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return arg == null;
	}

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function (root) {

		/** Detect free variables */
		var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
		var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;
		var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
			root = freeGlobal;
		}

		/**
	  * The `punycode` object.
	  * @name punycode
	  * @type Object
	  */
		var punycode,


		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647,
		    // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		    tMin = 1,
		    tMax = 26,
		    skew = 38,
		    damp = 700,
		    initialBias = 72,
		    initialN = 128,
		    // 0x80
		delimiter = '-',
		    // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		    regexNonASCII = /[^\x20-\x7E]/,
		    // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
		    // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},


		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		    floor = Math.floor,
		    stringFromCharCode = String.fromCharCode,


		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
	  * A generic error utility function.
	  * @private
	  * @param {String} type The error type.
	  * @returns {Error} Throws a `RangeError` with the applicable error message.
	  */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
	  * A generic `Array#map` utility function.
	  * @private
	  * @param {Array} array The array to iterate over.
	  * @param {Function} callback The function that gets called for every array
	  * item.
	  * @returns {Array} A new array of values returned by the callback function.
	  */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
	  * A simple `Array#map`-like wrapper to work with domain name strings or email
	  * addresses.
	  * @private
	  * @param {String} domain The domain name or email address.
	  * @param {Function} callback The function that gets called for every
	  * character.
	  * @returns {Array} A new string of characters returned by the callback
	  * function.
	  */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
	  * Creates an array containing the numeric code points of each Unicode
	  * character in the string. While JavaScript uses UCS-2 internally,
	  * this function will convert a pair of surrogate halves (each of which
	  * UCS-2 exposes as separate characters) into a single code point,
	  * matching UTF-16.
	  * @see `punycode.ucs2.encode`
	  * @see <https://mathiasbynens.be/notes/javascript-encoding>
	  * @memberOf punycode.ucs2
	  * @name decode
	  * @param {String} string The Unicode input string (UCS-2).
	  * @returns {Array} The new array of code points.
	  */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
	  * Creates a string based on an array of numeric code points.
	  * @see `punycode.ucs2.decode`
	  * @memberOf punycode.ucs2
	  * @name encode
	  * @param {Array} codePoints The array of numeric code points.
	  * @returns {String} The new Unicode string (UCS-2).
	  */
		function ucs2encode(array) {
			return map(array, function (value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
	  * Converts a basic code point into a digit/integer.
	  * @see `digitToBasic()`
	  * @private
	  * @param {Number} codePoint The basic numeric code point value.
	  * @returns {Number} The numeric value of a basic code point (for use in
	  * representing integers) in the range `0` to `base - 1`, or `base` if
	  * the code point does not represent a value.
	  */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
	  * Converts a digit/integer into a basic code point.
	  * @see `basicToDigit()`
	  * @private
	  * @param {Number} digit The numeric value of a basic code point.
	  * @returns {Number} The basic code point whose value (when used for
	  * representing integers) is `digit`, which needs to be in the range
	  * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	  * used; else, the lowercase form is used. The behavior is undefined
	  * if `flag` is non-zero and `digit` has no uppercase form.
	  */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
	  * Bias adaptation function as per section 3.4 of RFC 3492.
	  * http://tools.ietf.org/html/rfc3492#section-3.4
	  * @private
	  */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
	  * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	  * symbols.
	  * @memberOf punycode
	  * @param {String} input The Punycode string of ASCII-only symbols.
	  * @returns {String} The resulting string of Unicode symbols.
	  */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,

			/** Cached calculation results */
			baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base;; /* no condition */k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;
				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
			}

			return ucs2encode(output);
		}

		/**
	  * Converts a string of Unicode symbols (e.g. a domain name label) to a
	  * Punycode string of ASCII-only symbols.
	  * @memberOf punycode
	  * @param {String} input The string of Unicode symbols.
	  * @returns {String} The resulting Punycode string of ASCII-only symbols.
	  */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],

			/** `inputLength` will hold the number of code points in `input`. */
			inputLength,

			/** Cached calculation results */
			handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base;; /* no condition */k += base) {
							t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;
			}
			return output.join('');
		}

		/**
	  * Converts a Punycode string representing a domain name or an email address
	  * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	  * it doesn't matter if you call it on a string that has already been
	  * converted to Unicode.
	  * @memberOf punycode
	  * @param {String} input The Punycoded domain name or email address to
	  * convert to Unicode.
	  * @returns {String} The Unicode representation of the given Punycode
	  * string.
	  */
		function toUnicode(input) {
			return mapDomain(input, function (string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		}

		/**
	  * Converts a Unicode string representing a domain name or an email address to
	  * Punycode. Only the non-ASCII parts of the domain name will be converted,
	  * i.e. it doesn't matter if you call it with a domain that's already in
	  * ASCII.
	  * @memberOf punycode
	  * @param {String} input The domain name or email address to convert, as a
	  * Unicode string.
	  * @returns {String} The Punycode representation of the given domain name or
	  * email address.
	  */
		function toASCII(input) {
			return mapDomain(input, function (string) {
				return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
	   * A string representing the current Punycode.js version number.
	   * @memberOf punycode
	   * @type String
	   */
			'version': '1.3.2',
			/**
	   * An object of methods to convert from JavaScript's internal character
	   * representation (UCS-2) to Unicode code points, and back.
	   * @see <https://mathiasbynens.be/notes/javascript-encoding>
	   * @memberOf punycode
	   * @type Object
	   */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if ("function" == 'function' && _typeof(__webpack_require__(352)) == 'object' && __webpack_require__(352)) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(334)(module), (function() { return this; }())))

/***/ },
/* 352 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(354);
	exports.encode = exports.stringify = __webpack_require__(355);

/***/ },
/* 354 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

/***/ },
/* 355 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! PhotoSwipe - v4.1.1 - 2015-12-24
	* http://photoswipe.com
	* Copyright (c) 2015 Dmitry Semenov; */
	(function (root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipe = factory();
		}
	})(undefined, function () {

		'use strict';

		var PhotoSwipe = function PhotoSwipe(template, UiClass, items, options) {

			/*>>framework-bridge*/
			/**
	   *
	   * Set of generic functions used by gallery.
	   * 
	   * You're free to modify anything here as long as functionality is kept.
	   * 
	   */
			var framework = {
				features: null,
				bind: function bind(target, type, listener, unbind) {
					var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
					type = type.split(' ');
					for (var i = 0; i < type.length; i++) {
						if (type[i]) {
							target[methodName](type[i], listener, false);
						}
					}
				},
				isArray: function isArray(obj) {
					return obj instanceof Array;
				},
				createEl: function createEl(classes, tag) {
					var el = document.createElement(tag || 'div');
					if (classes) {
						el.className = classes;
					}
					return el;
				},
				getScrollY: function getScrollY() {
					var yOffset = window.pageYOffset;
					return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
				},
				unbind: function unbind(target, type, listener) {
					framework.bind(target, type, listener, true);
				},
				removeClass: function removeClass(el, className) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
					el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				},
				addClass: function addClass(el, className) {
					if (!framework.hasClass(el, className)) {
						el.className += (el.className ? ' ' : '') + className;
					}
				},
				hasClass: function hasClass(el, className) {
					return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
				},
				getChildByClass: function getChildByClass(parentEl, childClassName) {
					var node = parentEl.firstChild;
					while (node) {
						if (framework.hasClass(node, childClassName)) {
							return node;
						}
						node = node.nextSibling;
					}
				},
				arraySearch: function arraySearch(array, value, key) {
					var i = array.length;
					while (i--) {
						if (array[i][key] === value) {
							return i;
						}
					}
					return -1;
				},
				extend: function extend(o1, o2, preventOverwrite) {
					for (var prop in o2) {
						if (o2.hasOwnProperty(prop)) {
							if (preventOverwrite && o1.hasOwnProperty(prop)) {
								continue;
							}
							o1[prop] = o2[prop];
						}
					}
				},
				easing: {
					sine: {
						out: function out(k) {
							return Math.sin(k * (Math.PI / 2));
						},
						inOut: function inOut(k) {
							return -(Math.cos(Math.PI * k) - 1) / 2;
						}
					},
					cubic: {
						out: function out(k) {
							return --k * k * k + 1;
						}
					}
					/*
	    	elastic: {
	    		out: function ( k ) {
	    				var s, a = 0.1, p = 0.4;
	    			if ( k === 0 ) return 0;
	    			if ( k === 1 ) return 1;
	    			if ( !a || a < 1 ) { a = 1; s = p / 4; }
	    			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
	    			return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
	    			},
	    	},
	    	back: {
	    		out: function ( k ) {
	    			var s = 1.70158;
	    			return --k * k * ( ( s + 1 ) * k + s ) + 1;
	    		}
	    	}
	    */
				},

				/**
	    * 
	    * @return {object}
	    * 
	    * {
	    *  raf : request animation frame function
	    *  caf : cancel animation frame function
	    *  transfrom : transform property key (with vendor), or null if not supported
	    *  oldIE : IE8 or below
	    * }
	    * 
	    */
				detectFeatures: function detectFeatures() {
					if (framework.features) {
						return framework.features;
					}
					var helperEl = framework.createEl(),
					    helperStyle = helperEl.style,
					    vendor = '',
					    features = {};

					// IE8 and below
					features.oldIE = document.all && !document.addEventListener;

					features.touch = 'ontouchstart' in window;

					if (window.requestAnimationFrame) {
						features.raf = window.requestAnimationFrame;
						features.caf = window.cancelAnimationFrame;
					}

					features.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;

					// fix false-positive detection of old Android in new IE
					// (IE11 ua string contains "Android 4.0")

					if (!features.pointerEvent) {

						var ua = navigator.userAgent;

						// Detect if device is iPhone or iPod and if it's older than iOS 8
						// http://stackoverflow.com/a/14223920
						// 
						// This detection is made because of buggy top/bottom toolbars
						// that don't trigger window.resize event.
						// For more info refer to _isFixedPosition variable in core.js

						if (/iP(hone|od)/.test(navigator.platform)) {
							var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
							if (v && v.length > 0) {
								v = parseInt(v[1], 10);
								if (v >= 1 && v < 8) {
									features.isOldIOSPhone = true;
								}
							}
						}

						// Detect old Android (before KitKat)
						// due to bugs related to position:fixed
						// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript

						var match = ua.match(/Android\s([0-9\.]*)/);
						var androidversion = match ? match[1] : 0;
						androidversion = parseFloat(androidversion);
						if (androidversion >= 1) {
							if (androidversion < 4.4) {
								features.isOldAndroid = true; // for fixed position bug & performance
							}
							features.androidVersion = androidversion; // for touchend bug
						}
						features.isMobileOpera = /opera mini|opera mobi/i.test(ua);

						// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
					}

					var styleChecks = ['transform', 'perspective', 'animationName'],
					    vendors = ['', 'webkit', 'Moz', 'ms', 'O'],
					    styleCheckItem,
					    styleName;

					for (var i = 0; i < 4; i++) {
						vendor = vendors[i];

						for (var a = 0; a < 3; a++) {
							styleCheckItem = styleChecks[a];

							// uppercase first letter of property name, if vendor is present
							styleName = vendor + (vendor ? styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : styleCheckItem);

							if (!features[styleCheckItem] && styleName in helperStyle) {
								features[styleCheckItem] = styleName;
							}
						}

						if (vendor && !features.raf) {
							vendor = vendor.toLowerCase();
							features.raf = window[vendor + 'RequestAnimationFrame'];
							if (features.raf) {
								features.caf = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
							}
						}
					}

					if (!features.raf) {
						var lastTime = 0;
						features.raf = function (fn) {
							var currTime = new Date().getTime();
							var timeToCall = Math.max(0, 16 - (currTime - lastTime));
							var id = window.setTimeout(function () {
								fn(currTime + timeToCall);
							}, timeToCall);
							lastTime = currTime + timeToCall;
							return id;
						};
						features.caf = function (id) {
							clearTimeout(id);
						};
					}

					// Detect SVG support
					features.svg = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

					framework.features = features;

					return features;
				}
			};

			framework.detectFeatures();

			// Override addEventListener for old versions of IE
			if (framework.features.oldIE) {

				framework.bind = function (target, type, listener, unbind) {

					type = type.split(' ');

					var methodName = (unbind ? 'detach' : 'attach') + 'Event',
					    evName,
					    _handleEv = function _handleEv() {
						listener.handleEvent.call(listener);
					};

					for (var i = 0; i < type.length; i++) {
						evName = type[i];
						if (evName) {

							if ((typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object' && listener.handleEvent) {
								if (!unbind) {
									listener['oldIE' + evName] = _handleEv;
								} else {
									if (!listener['oldIE' + evName]) {
										return false;
									}
								}

								target[methodName]('on' + evName, listener['oldIE' + evName]);
							} else {
								target[methodName]('on' + evName, listener);
							}
						}
					}
				};
			}

			/*>>framework-bridge*/

			/*>>core*/
			//function(template, UiClass, items, options)

			var self = this;

			/**
	   * Static vars, don't change unless you know what you're doing.
	   */
			var DOUBLE_TAP_RADIUS = 25,
			    NUM_HOLDERS = 3;

			/**
	   * Options
	   */
			var _options = {
				allowPanToNext: true,
				spacing: 0.12,
				bgOpacity: 1,
				mouseUsed: false,
				loop: true,
				pinchToClose: true,
				closeOnScroll: true,
				closeOnVerticalDrag: true,
				verticalDragRange: 0.75,
				hideAnimationDuration: 333,
				showAnimationDuration: 333,
				showHideOpacity: false,
				focus: true,
				escKey: true,
				arrowKeys: true,
				mainScrollEndFriction: 0.35,
				panEndFriction: 0.35,
				isClickableElement: function isClickableElement(el) {
					return el.tagName === 'A';
				},
				getDoubleTapZoom: function getDoubleTapZoom(isMouseClick, item) {
					if (isMouseClick) {
						return 1;
					} else {
						return item.initialZoomLevel < 0.7 ? 1 : 1.33;
					}
				},
				maxSpreadZoom: 1.33,
				modal: true,

				// not fully implemented yet
				scaleMode: 'fit' // TODO
			};
			framework.extend(_options, options);

			/**
	   * Private helper variables & functions
	   */

			var _getEmptyPoint = function _getEmptyPoint() {
				return { x: 0, y: 0 };
			};

			var _isOpen,
			    _isDestroying,
			    _closedByScroll,
			    _currentItemIndex,
			    _containerStyle,
			    _containerShiftIndex,
			    _currPanDist = _getEmptyPoint(),
			    _startPanOffset = _getEmptyPoint(),
			    _panOffset = _getEmptyPoint(),
			    _upMoveEvents,
			    // drag move, drag end & drag cancel events array
			_downEvents,
			    // drag start events array
			_globalEventHandlers,
			    _viewportSize = {},
			    _currZoomLevel,
			    _startZoomLevel,
			    _translatePrefix,
			    _translateSufix,
			    _updateSizeInterval,
			    _itemsNeedUpdate,
			    _currPositionIndex = 0,
			    _offset = {},
			    _slideSize = _getEmptyPoint(),
			    // size of slide area, including spacing
			_itemHolders,
			    _prevItemIndex,
			    _indexDiff = 0,
			    // difference of indexes since last content update
			_dragStartEvent,
			    _dragMoveEvent,
			    _dragEndEvent,
			    _dragCancelEvent,
			    _transformKey,
			    _pointerEventEnabled,
			    _isFixedPosition = true,
			    _likelyTouchDevice,
			    _modules = [],
			    _requestAF,
			    _cancelAF,
			    _initalClassName,
			    _initalWindowScrollY,
			    _oldIE,
			    _currentWindowScrollY,
			    _features,
			    _windowVisibleSize = {},
			    _renderMaxResolution = false,


			// Registers PhotoSWipe module (History, Controller ...)
			_registerModule = function _registerModule(name, module) {
				framework.extend(self, module.publicMethods);
				_modules.push(name);
			},
			    _getLoopedId = function _getLoopedId(index) {
				var numSlides = _getNumItems();
				if (index > numSlides - 1) {
					return index - numSlides;
				} else if (index < 0) {
					return numSlides + index;
				}
				return index;
			},


			// Micro bind/trigger
			_listeners = {},
			    _listen = function _listen(name, fn) {
				if (!_listeners[name]) {
					_listeners[name] = [];
				}
				return _listeners[name].push(fn);
			},
			    _shout = function _shout(name) {
				var listeners = _listeners[name];

				if (listeners) {
					var args = Array.prototype.slice.call(arguments);
					args.shift();

					for (var i = 0; i < listeners.length; i++) {
						listeners[i].apply(self, args);
					}
				}
			},
			    _getCurrentTime = function _getCurrentTime() {
				return new Date().getTime();
			},
			    _applyBgOpacity = function _applyBgOpacity(opacity) {
				_bgOpacity = opacity;
				self.bg.style.opacity = opacity * _options.bgOpacity;
			},
			    _applyZoomTransform = function _applyZoomTransform(styleObj, x, y, zoom, item) {
				if (!_renderMaxResolution || item && item !== self.currItem) {
					zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);
				}

				styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
			},
			    _applyCurrentZoomPan = function _applyCurrentZoomPan(allowRenderResolution) {
				if (_currZoomElementStyle) {

					if (allowRenderResolution) {
						if (_currZoomLevel > self.currItem.fitRatio) {
							if (!_renderMaxResolution) {
								_setImageSize(self.currItem, false, true);
								_renderMaxResolution = true;
							}
						} else {
							if (_renderMaxResolution) {
								_setImageSize(self.currItem);
								_renderMaxResolution = false;
							}
						}
					}

					_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
				}
			},
			    _applyZoomPanToItem = function _applyZoomPanToItem(item) {
				if (item.container) {

					_applyZoomTransform(item.container.style, item.initialPosition.x, item.initialPosition.y, item.initialZoomLevel, item);
				}
			},
			    _setTranslateX = function _setTranslateX(x, elStyle) {
				elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
			},
			    _moveMainScroll = function _moveMainScroll(x, dragging) {

				if (!_options.loop && dragging) {
					var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x,
					    delta = Math.round(x - _mainScrollPos.x);

					if (newSlideIndexOffset < 0 && delta > 0 || newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) {
						x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
					}
				}

				_mainScrollPos.x = x;
				_setTranslateX(x, _containerStyle);
			},
			    _calculatePanOffset = function _calculatePanOffset(axis, zoomLevel) {
				var m = _midZoomPoint[axis] - _offset[axis];
				return _startPanOffset[axis] + _currPanDist[axis] + m - m * (zoomLevel / _startZoomLevel);
			},
			    _equalizePoints = function _equalizePoints(p1, p2) {
				p1.x = p2.x;
				p1.y = p2.y;
				if (p2.id) {
					p1.id = p2.id;
				}
			},
			    _roundPoint = function _roundPoint(p) {
				p.x = Math.round(p.x);
				p.y = Math.round(p.y);
			},
			    _mouseMoveTimeout = null,
			    _onFirstMouseMove = function _onFirstMouseMove() {
				// Wait until mouse move event is fired at least twice during 100ms
				// We do this, because some mobile browsers trigger it on touchstart
				if (_mouseMoveTimeout) {
					framework.unbind(document, 'mousemove', _onFirstMouseMove);
					framework.addClass(template, 'pswp--has_mouse');
					_options.mouseUsed = true;
					_shout('mouseUsed');
				}
				_mouseMoveTimeout = setTimeout(function () {
					_mouseMoveTimeout = null;
				}, 100);
			},
			    _bindEvents = function _bindEvents() {
				framework.bind(document, 'keydown', self);

				if (_features.transform) {
					// don't bind click event in browsers that don't support transform (mostly IE8)
					framework.bind(self.scrollWrap, 'click', self);
				}

				if (!_options.mouseUsed) {
					framework.bind(document, 'mousemove', _onFirstMouseMove);
				}

				framework.bind(window, 'resize scroll', self);

				_shout('bindEvents');
			},
			    _unbindEvents = function _unbindEvents() {
				framework.unbind(window, 'resize', self);
				framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
				framework.unbind(document, 'keydown', self);
				framework.unbind(document, 'mousemove', _onFirstMouseMove);

				if (_features.transform) {
					framework.unbind(self.scrollWrap, 'click', self);
				}

				if (_isDragging) {
					framework.unbind(window, _upMoveEvents, self);
				}

				_shout('unbindEvents');
			},
			    _calculatePanBounds = function _calculatePanBounds(zoomLevel, update) {
				var bounds = _calculateItemSize(self.currItem, _viewportSize, zoomLevel);
				if (update) {
					_currPanBounds = bounds;
				}
				return bounds;
			},
			    _getMinZoomLevel = function _getMinZoomLevel(item) {
				if (!item) {
					item = self.currItem;
				}
				return item.initialZoomLevel;
			},
			    _getMaxZoomLevel = function _getMaxZoomLevel(item) {
				if (!item) {
					item = self.currItem;
				}
				return item.w > 0 ? _options.maxSpreadZoom : 1;
			},


			// Return true if offset is out of the bounds
			_modifyDestPanOffset = function _modifyDestPanOffset(axis, destPanBounds, destPanOffset, destZoomLevel) {
				if (destZoomLevel === self.currItem.initialZoomLevel) {
					destPanOffset[axis] = self.currItem.initialPosition[axis];
					return true;
				} else {
					destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel);

					if (destPanOffset[axis] > destPanBounds.min[axis]) {
						destPanOffset[axis] = destPanBounds.min[axis];
						return true;
					} else if (destPanOffset[axis] < destPanBounds.max[axis]) {
						destPanOffset[axis] = destPanBounds.max[axis];
						return true;
					}
				}
				return false;
			},
			    _setupTransforms = function _setupTransforms() {

				if (_transformKey) {
					// setup 3d transforms
					var allow3dTransform = _features.perspective && !_likelyTouchDevice;
					_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
					_translateSufix = _features.perspective ? ', 0px)' : ')';
					return;
				}

				// Override zoom/pan/move functions in case old browser is used (most likely IE)
				// (so they use left/top/width/height, instead of CSS transform)

				_transformKey = 'left';
				framework.addClass(template, 'pswp--ie');

				_setTranslateX = function _setTranslateX(x, elStyle) {
					elStyle.left = x + 'px';
				};
				_applyZoomPanToItem = function _applyZoomPanToItem(item) {

					var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
					    s = item.container.style,
					    w = zoomRatio * item.w,
					    h = zoomRatio * item.h;

					s.width = w + 'px';
					s.height = h + 'px';
					s.left = item.initialPosition.x + 'px';
					s.top = item.initialPosition.y + 'px';
				};
				_applyCurrentZoomPan = function _applyCurrentZoomPan() {
					if (_currZoomElementStyle) {

						var s = _currZoomElementStyle,
						    item = self.currItem,
						    zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
						    w = zoomRatio * item.w,
						    h = zoomRatio * item.h;

						s.width = w + 'px';
						s.height = h + 'px';

						s.left = _panOffset.x + 'px';
						s.top = _panOffset.y + 'px';
					}
				};
			},
			    _onKeyDown = function _onKeyDown(e) {
				var keydownAction = '';
				if (_options.escKey && e.keyCode === 27) {
					keydownAction = 'close';
				} else if (_options.arrowKeys) {
					if (e.keyCode === 37) {
						keydownAction = 'prev';
					} else if (e.keyCode === 39) {
						keydownAction = 'next';
					}
				}

				if (keydownAction) {
					// don't do anything if special key pressed to prevent from overriding default browser actions
					// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
						if (e.preventDefault) {
							e.preventDefault();
						} else {
							e.returnValue = false;
						}
						self[keydownAction]();
					}
				}
			},
			    _onGlobalClick = function _onGlobalClick(e) {
				if (!e) {
					return;
				}

				// don't allow click event to pass through when triggering after drag or some other gesture
				if (_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			    _updatePageScrollOffset = function _updatePageScrollOffset() {
				self.setScrollOffset(0, framework.getScrollY());
			};

			// Micro animation engine
			var _animations = {},
			    _numAnimations = 0,
			    _stopAnimation = function _stopAnimation(name) {
				if (_animations[name]) {
					if (_animations[name].raf) {
						_cancelAF(_animations[name].raf);
					}
					_numAnimations--;
					delete _animations[name];
				}
			},
			    _registerStartAnimation = function _registerStartAnimation(name) {
				if (_animations[name]) {
					_stopAnimation(name);
				}
				if (!_animations[name]) {
					_numAnimations++;
					_animations[name] = {};
				}
			},
			    _stopAllAnimations = function _stopAllAnimations() {
				for (var prop in _animations) {

					if (_animations.hasOwnProperty(prop)) {
						_stopAnimation(prop);
					}
				}
			},
			    _animateProp = function _animateProp(name, b, endProp, d, easingFn, onUpdate, onComplete) {
				var startAnimTime = _getCurrentTime(),
				    t;
				_registerStartAnimation(name);

				var animloop = function animloop() {
					if (_animations[name]) {

						t = _getCurrentTime() - startAnimTime; // time diff
						//b - beginning (start prop)
						//d - anim duration

						if (t >= d) {
							_stopAnimation(name);
							onUpdate(endProp);
							if (onComplete) {
								onComplete();
							}
							return;
						}
						onUpdate((endProp - b) * easingFn(t / d) + b);

						_animations[name].raf = _requestAF(animloop);
					}
				};
				animloop();
			};

			var publicMethods = {

				// make a few local variables and functions public
				shout: _shout,
				listen: _listen,
				viewportSize: _viewportSize,
				options: _options,

				isMainScrollAnimating: function isMainScrollAnimating() {
					return _mainScrollAnimating;
				},
				getZoomLevel: function getZoomLevel() {
					return _currZoomLevel;
				},
				getCurrentIndex: function getCurrentIndex() {
					return _currentItemIndex;
				},
				isDragging: function isDragging() {
					return _isDragging;
				},
				isZooming: function isZooming() {
					return _isZooming;
				},
				setScrollOffset: function setScrollOffset(x, y) {
					_offset.x = x;
					_currentWindowScrollY = _offset.y = y;
					_shout('updateScrollOffset', _offset);
				},
				applyZoomPan: function applyZoomPan(zoomLevel, panX, panY, allowRenderResolution) {
					_panOffset.x = panX;
					_panOffset.y = panY;
					_currZoomLevel = zoomLevel;
					_applyCurrentZoomPan(allowRenderResolution);
				},

				init: function init() {

					if (_isOpen || _isDestroying) {
						return;
					}

					var i;

					self.framework = framework; // basic functionality
					self.template = template; // root DOM element of PhotoSwipe
					self.bg = framework.getChildByClass(template, 'pswp__bg');

					_initalClassName = template.className;
					_isOpen = true;

					_features = framework.detectFeatures();
					_requestAF = _features.raf;
					_cancelAF = _features.caf;
					_transformKey = _features.transform;
					_oldIE = _features.oldIE;

					self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
					self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');

					_containerStyle = self.container.style; // for fast access

					// Objects that hold slides (there are only 3 in DOM)
					self.itemHolders = _itemHolders = [{ el: self.container.children[0], wrap: 0, index: -1 }, { el: self.container.children[1], wrap: 0, index: -1 }, { el: self.container.children[2], wrap: 0, index: -1 }];

					// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
					_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';

					_setupTransforms();

					// Setup global events
					_globalEventHandlers = {
						resize: self.updateSize,
						scroll: _updatePageScrollOffset,
						keydown: _onKeyDown,
						click: _onGlobalClick
					};

					// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
					// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
					var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
					if (!_features.animationName || !_features.transform || oldPhone) {
						_options.showAnimationDuration = _options.hideAnimationDuration = 0;
					}

					// init modules
					for (i = 0; i < _modules.length; i++) {
						self['init' + _modules[i]]();
					}

					// init
					if (UiClass) {
						var ui = self.ui = new UiClass(self, framework);
						ui.init();
					}

					_shout('firstUpdate');
					_currentItemIndex = _currentItemIndex || _options.index || 0;
					// validate index
					if (isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems()) {
						_currentItemIndex = 0;
					}
					self.currItem = _getItemAt(_currentItemIndex);

					if (_features.isOldIOSPhone || _features.isOldAndroid) {
						_isFixedPosition = false;
					}

					template.setAttribute('aria-hidden', 'false');
					if (_options.modal) {
						if (!_isFixedPosition) {
							template.style.position = 'absolute';
							template.style.top = framework.getScrollY() + 'px';
						} else {
							template.style.position = 'fixed';
						}
					}

					if (_currentWindowScrollY === undefined) {
						_shout('initialLayout');
						_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
					}

					// add classes to root element of PhotoSwipe
					var rootClasses = 'pswp--open ';
					if (_options.mainClass) {
						rootClasses += _options.mainClass + ' ';
					}
					if (_options.showHideOpacity) {
						rootClasses += 'pswp--animate_opacity ';
					}
					rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
					rootClasses += _features.animationName ? ' pswp--css_animation' : '';
					rootClasses += _features.svg ? ' pswp--svg' : '';
					framework.addClass(template, rootClasses);

					self.updateSize();

					// initial update
					_containerShiftIndex = -1;
					_indexDiff = null;
					for (i = 0; i < NUM_HOLDERS; i++) {
						_setTranslateX((i + _containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
					}

					if (!_oldIE) {
						framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
					}

					_listen('initialZoomInEnd', function () {
						self.setContent(_itemHolders[0], _currentItemIndex - 1);
						self.setContent(_itemHolders[2], _currentItemIndex + 1);

						_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';

						if (_options.focus) {
							// focus causes layout, 
							// which causes lag during the animation, 
							// that's why we delay it untill the initial zoom transition ends
							template.focus();
						}

						_bindEvents();
					});

					// set content for center slide (first time)
					self.setContent(_itemHolders[1], _currentItemIndex);

					self.updateCurrItem();

					_shout('afterInit');

					if (!_isFixedPosition) {

						// On all versions of iOS lower than 8.0, we check size of viewport every second.
						// 
						// This is done to detect when Safari top & bottom bars appear, 
						// as this action doesn't trigger any events (like resize). 
						// 
						// On iOS8 they fixed this.
						// 
						// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.

						_updateSizeInterval = setInterval(function () {
							if (!_numAnimations && !_isDragging && !_isZooming && _currZoomLevel === self.currItem.initialZoomLevel) {
								self.updateSize();
							}
						}, 1000);
					}

					framework.addClass(template, 'pswp--visible');
				},

				// Close the gallery, then destroy it
				close: function close() {
					if (!_isOpen) {
						return;
					}

					_isOpen = false;
					_isDestroying = true;
					_shout('close');
					_unbindEvents();

					_showOrHide(self.currItem, null, true, self.destroy);
				},

				// destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
				destroy: function destroy() {
					_shout('destroy');

					if (_showOrHideTimeout) {
						clearTimeout(_showOrHideTimeout);
					}

					template.setAttribute('aria-hidden', 'true');
					template.className = _initalClassName;

					if (_updateSizeInterval) {
						clearInterval(_updateSizeInterval);
					}

					framework.unbind(self.scrollWrap, _downEvents, self);

					// we unbind scroll event at the end, as closing animation may depend on it
					framework.unbind(window, 'scroll', self);

					_stopDragUpdateLoop();

					_stopAllAnimations();

					_listeners = null;
				},

				/**
	    * Pan image to position
	    * @param {Number} x     
	    * @param {Number} y     
	    * @param {Boolean} force Will ignore bounds if set to true.
	    */
				panTo: function panTo(x, y, force) {
					if (!force) {
						if (x > _currPanBounds.min.x) {
							x = _currPanBounds.min.x;
						} else if (x < _currPanBounds.max.x) {
							x = _currPanBounds.max.x;
						}

						if (y > _currPanBounds.min.y) {
							y = _currPanBounds.min.y;
						} else if (y < _currPanBounds.max.y) {
							y = _currPanBounds.max.y;
						}
					}

					_panOffset.x = x;
					_panOffset.y = y;
					_applyCurrentZoomPan();
				},

				handleEvent: function handleEvent(e) {
					e = e || window.event;
					if (_globalEventHandlers[e.type]) {
						_globalEventHandlers[e.type](e);
					}
				},

				goTo: function goTo(index) {

					index = _getLoopedId(index);

					var diff = index - _currentItemIndex;
					_indexDiff = diff;

					_currentItemIndex = index;
					self.currItem = _getItemAt(_currentItemIndex);
					_currPositionIndex -= diff;

					_moveMainScroll(_slideSize.x * _currPositionIndex);

					_stopAllAnimations();
					_mainScrollAnimating = false;

					self.updateCurrItem();
				},
				next: function next() {
					self.goTo(_currentItemIndex + 1);
				},
				prev: function prev() {
					self.goTo(_currentItemIndex - 1);
				},

				// update current zoom/pan objects
				updateCurrZoomItem: function updateCurrZoomItem(emulateSetContent) {
					if (emulateSetContent) {
						_shout('beforeChange', 0);
					}

					// itemHolder[1] is middle (current) item
					if (_itemHolders[1].el.children.length) {
						var zoomElement = _itemHolders[1].el.children[0];
						if (framework.hasClass(zoomElement, 'pswp__zoom-wrap')) {
							_currZoomElementStyle = zoomElement.style;
						} else {
							_currZoomElementStyle = null;
						}
					} else {
						_currZoomElementStyle = null;
					}

					_currPanBounds = self.currItem.bounds;
					_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;

					_panOffset.x = _currPanBounds.center.x;
					_panOffset.y = _currPanBounds.center.y;

					if (emulateSetContent) {
						_shout('afterChange');
					}
				},

				invalidateCurrItems: function invalidateCurrItems() {
					_itemsNeedUpdate = true;
					for (var i = 0; i < NUM_HOLDERS; i++) {
						if (_itemHolders[i].item) {
							_itemHolders[i].item.needsUpdate = true;
						}
					}
				},

				updateCurrItem: function updateCurrItem(beforeAnimation) {

					if (_indexDiff === 0) {
						return;
					}

					var diffAbs = Math.abs(_indexDiff),
					    tempHolder;

					if (beforeAnimation && diffAbs < 2) {
						return;
					}

					self.currItem = _getItemAt(_currentItemIndex);
					_renderMaxResolution = false;

					_shout('beforeChange', _indexDiff);

					if (diffAbs >= NUM_HOLDERS) {
						_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
						diffAbs = NUM_HOLDERS;
					}
					for (var i = 0; i < diffAbs; i++) {
						if (_indexDiff > 0) {
							tempHolder = _itemHolders.shift();
							_itemHolders[NUM_HOLDERS - 1] = tempHolder; // move first to last

							_containerShiftIndex++;
							_setTranslateX((_containerShiftIndex + 2) * _slideSize.x, tempHolder.el.style);
							self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
						} else {
							tempHolder = _itemHolders.pop();
							_itemHolders.unshift(tempHolder); // move last to first

							_containerShiftIndex--;
							_setTranslateX(_containerShiftIndex * _slideSize.x, tempHolder.el.style);
							self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
						}
					}

					// reset zoom/pan on previous item
					if (_currZoomElementStyle && Math.abs(_indexDiff) === 1) {

						var prevItem = _getItemAt(_prevItemIndex);
						if (prevItem.initialZoomLevel !== _currZoomLevel) {
							_calculateItemSize(prevItem, _viewportSize);
							_setImageSize(prevItem);
							_applyZoomPanToItem(prevItem);
						}
					}

					// reset diff after update
					_indexDiff = 0;

					self.updateCurrZoomItem();

					_prevItemIndex = _currentItemIndex;

					_shout('afterChange');
				},

				updateSize: function updateSize(force) {

					if (!_isFixedPosition && _options.modal) {
						var windowScrollY = framework.getScrollY();
						if (_currentWindowScrollY !== windowScrollY) {
							template.style.top = windowScrollY + 'px';
							_currentWindowScrollY = windowScrollY;
						}
						if (!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
							return;
						}
						_windowVisibleSize.x = window.innerWidth;
						_windowVisibleSize.y = window.innerHeight;

						//template.style.width = _windowVisibleSize.x + 'px';
						template.style.height = _windowVisibleSize.y + 'px';
					}

					_viewportSize.x = self.scrollWrap.clientWidth;
					_viewportSize.y = self.scrollWrap.clientHeight;

					_updatePageScrollOffset();

					_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
					_slideSize.y = _viewportSize.y;

					_moveMainScroll(_slideSize.x * _currPositionIndex);

					_shout('beforeResize'); // even may be used for example to switch image sources


					// don't re-calculate size on inital size update
					if (_containerShiftIndex !== undefined) {

						var holder, item, hIndex;

						for (var i = 0; i < NUM_HOLDERS; i++) {
							holder = _itemHolders[i];
							_setTranslateX((i + _containerShiftIndex) * _slideSize.x, holder.el.style);

							hIndex = _currentItemIndex + i - 1;

							if (_options.loop && _getNumItems() > 2) {
								hIndex = _getLoopedId(hIndex);
							}

							// update zoom level on items and refresh source (if needsUpdate)
							item = _getItemAt(hIndex);

							// re-render gallery item if `needsUpdate`,
							// or doesn't have `bounds` (entirely new slide object)
							if (item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds)) {

								self.cleanSlide(item);

								self.setContent(holder, hIndex);

								// if "center" slide
								if (i === 1) {
									self.currItem = item;
									self.updateCurrZoomItem(true);
								}

								item.needsUpdate = false;
							} else if (holder.index === -1 && hIndex >= 0) {
								// add content first time
								self.setContent(holder, hIndex);
							}
							if (item && item.container) {
								_calculateItemSize(item, _viewportSize);
								_setImageSize(item);
								_applyZoomPanToItem(item);
							}
						}
						_itemsNeedUpdate = false;
					}

					_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
					_currPanBounds = self.currItem.bounds;

					if (_currPanBounds) {
						_panOffset.x = _currPanBounds.center.x;
						_panOffset.y = _currPanBounds.center.y;
						_applyCurrentZoomPan(true);
					}

					_shout('resize');
				},

				// Zoom current item to
				zoomTo: function zoomTo(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
					/*
	    	if(destZoomLevel === 'fit') {
	    		destZoomLevel = self.currItem.fitRatio;
	    	} else if(destZoomLevel === 'fill') {
	    		destZoomLevel = self.currItem.fillRatio;
	    	}
	    */

					if (centerPoint) {
						_startZoomLevel = _currZoomLevel;
						_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x;
						_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y;
						_equalizePoints(_startPanOffset, _panOffset);
					}

					var destPanBounds = _calculatePanBounds(destZoomLevel, false),
					    destPanOffset = {};

					_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
					_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);

					var initialZoomLevel = _currZoomLevel;
					var initialPanOffset = {
						x: _panOffset.x,
						y: _panOffset.y
					};

					_roundPoint(destPanOffset);

					var onUpdate = function onUpdate(now) {
						if (now === 1) {
							_currZoomLevel = destZoomLevel;
							_panOffset.x = destPanOffset.x;
							_panOffset.y = destPanOffset.y;
						} else {
							_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
							_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
							_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
						}

						if (updateFn) {
							updateFn(now);
						}

						_applyCurrentZoomPan(now === 1);
					};

					if (speed) {
						_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
					} else {
						onUpdate(1);
					}
				}

			};

			/*>>core*/

			/*>>gestures*/
			/**
	   * Mouse/touch/pointer event handlers.
	   * 
	   * separated from @core.js for readability
	   */

			var MIN_SWIPE_DISTANCE = 30,
			    DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe

			var _gestureStartTime,
			    _gestureCheckSpeedTime,


			// pool of objects that are used during dragging of zooming
			p = {},
			    // first point
			p2 = {},
			    // second point (for zoom gesture)
			delta = {},
			    _currPoint = {},
			    _startPoint = {},
			    _currPointers = [],
			    _startMainScrollPos = {},
			    _releaseAnimData,
			    _posPoints = [],
			    // array of points during dragging, used to determine type of gesture
			_tempPoint = {},
			    _isZoomingIn,
			    _verticalDragInitiated,
			    _oldAndroidTouchEndTimeout,
			    _currZoomedItemIndex = 0,
			    _centerPoint = _getEmptyPoint(),
			    _lastReleaseTime = 0,
			    _isDragging,
			    // at least one pointer is down
			_isMultitouch,
			    // at least two _pointers are down
			_zoomStarted,
			    // zoom level changed during zoom gesture
			_moved,
			    _dragAnimFrame,
			    _mainScrollShifted,
			    _currentPoints,
			    // array of current touch points
			_isZooming,
			    _currPointsDistance,
			    _startPointsDistance,
			    _currPanBounds,
			    _mainScrollPos = _getEmptyPoint(),
			    _currZoomElementStyle,
			    _mainScrollAnimating,
			    // true, if animation after swipe gesture is running
			_midZoomPoint = _getEmptyPoint(),
			    _currCenterPoint = _getEmptyPoint(),
			    _direction,
			    _isFirstMove,
			    _opacityChanged,
			    _bgOpacity,
			    _wasOverInitialZoom,
			    _isEqualPoints = function _isEqualPoints(p1, p2) {
				return p1.x === p2.x && p1.y === p2.y;
			},
			    _isNearbyPoints = function _isNearbyPoints(touch0, touch1) {
				return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
			},
			    _calculatePointsDistance = function _calculatePointsDistance(p1, p2) {
				_tempPoint.x = Math.abs(p1.x - p2.x);
				_tempPoint.y = Math.abs(p1.y - p2.y);
				return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
			},
			    _stopDragUpdateLoop = function _stopDragUpdateLoop() {
				if (_dragAnimFrame) {
					_cancelAF(_dragAnimFrame);
					_dragAnimFrame = null;
				}
			},
			    _dragUpdateLoop = function _dragUpdateLoop() {
				if (_isDragging) {
					_dragAnimFrame = _requestAF(_dragUpdateLoop);
					_renderMovement();
				}
			},
			    _canPan = function _canPan() {
				return !(_options.scaleMode === 'fit' && _currZoomLevel === self.currItem.initialZoomLevel);
			},


			// find the closest parent DOM element
			_closestElement = function _closestElement(el, fn) {
				if (!el || el === document) {
					return false;
				}

				// don't search elements above pswp__scroll-wrap
				if (el.getAttribute('class') && el.getAttribute('class').indexOf('pswp__scroll-wrap') > -1) {
					return false;
				}

				if (fn(el)) {
					return el;
				}

				return _closestElement(el.parentNode, fn);
			},
			    _preventObj = {},
			    _preventDefaultEventBehaviour = function _preventDefaultEventBehaviour(e, isDown) {
				_preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);

				_shout('preventDragEvent', e, isDown, _preventObj);
				return _preventObj.prevent;
			},
			    _convertTouchToPoint = function _convertTouchToPoint(touch, p) {
				p.x = touch.pageX;
				p.y = touch.pageY;
				p.id = touch.identifier;
				return p;
			},
			    _findCenterOfPoints = function _findCenterOfPoints(p1, p2, pCenter) {
				pCenter.x = (p1.x + p2.x) * 0.5;
				pCenter.y = (p1.y + p2.y) * 0.5;
			},
			    _pushPosPoint = function _pushPosPoint(time, x, y) {
				if (time - _gestureCheckSpeedTime > 50) {
					var o = _posPoints.length > 2 ? _posPoints.shift() : {};
					o.x = x;
					o.y = y;
					_posPoints.push(o);
					_gestureCheckSpeedTime = time;
				}
			},
			    _calculateVerticalDragOpacityRatio = function _calculateVerticalDragOpacityRatio() {
				var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
				return 1 - Math.abs(yOffset / (_viewportSize.y / 2));
			},


			// points pool, reused during touch events
			_ePoint1 = {},
			    _ePoint2 = {},
			    _tempPointsArr = [],
			    _tempCounter,
			    _getTouchPoints = function _getTouchPoints(e) {
				// clean up previous points, without recreating array
				while (_tempPointsArr.length > 0) {
					_tempPointsArr.pop();
				}

				if (!_pointerEventEnabled) {
					if (e.type.indexOf('touch') > -1) {

						if (e.touches && e.touches.length > 0) {
							_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
							if (e.touches.length > 1) {
								_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
							}
						}
					} else {
						_ePoint1.x = e.pageX;
						_ePoint1.y = e.pageY;
						_ePoint1.id = '';
						_tempPointsArr[0] = _ePoint1; //_ePoint1;
					}
				} else {
					_tempCounter = 0;
					// we can use forEach, as pointer events are supported only in modern browsers
					_currPointers.forEach(function (p) {
						if (_tempCounter === 0) {
							_tempPointsArr[0] = p;
						} else if (_tempCounter === 1) {
							_tempPointsArr[1] = p;
						}
						_tempCounter++;
					});
				}
				return _tempPointsArr;
			},
			    _panOrMoveMainScroll = function _panOrMoveMainScroll(axis, delta) {

				var panFriction,
				    overDiff = 0,
				    newOffset = _panOffset[axis] + delta[axis],
				    startOverDiff,
				    dir = delta[axis] > 0,
				    newMainScrollPosition = _mainScrollPos.x + delta.x,
				    mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
				    newPanPos,
				    newMainScrollPos;

				// calculate fdistance over the bounds and friction
				if (newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
					panFriction = _options.panEndFriction;
					// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
					// Looks not as nice as was expected. Left for history.
					// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
				} else {
					panFriction = 1;
				}

				newOffset = _panOffset[axis] + delta[axis] * panFriction;

				// move main scroll or start panning
				if (_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {

					if (!_currZoomElementStyle) {

						newMainScrollPos = newMainScrollPosition;
					} else if (_direction === 'h' && axis === 'x' && !_zoomStarted) {

						if (dir) {
							if (newOffset > _currPanBounds.min[axis]) {
								panFriction = _options.panEndFriction;
								overDiff = _currPanBounds.min[axis] - newOffset;
								startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
							}

							// drag right
							if ((startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1) {
								newMainScrollPos = newMainScrollPosition;
								if (mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
									newMainScrollPos = _startMainScrollPos.x;
								}
							} else {
								if (_currPanBounds.min.x !== _currPanBounds.max.x) {
									newPanPos = newOffset;
								}
							}
						} else {

							if (newOffset < _currPanBounds.max[axis]) {
								panFriction = _options.panEndFriction;
								overDiff = newOffset - _currPanBounds.max[axis];
								startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
							}

							if ((startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1) {
								newMainScrollPos = newMainScrollPosition;

								if (mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
									newMainScrollPos = _startMainScrollPos.x;
								}
							} else {
								if (_currPanBounds.min.x !== _currPanBounds.max.x) {
									newPanPos = newOffset;
								}
							}
						}

						//
					}

					if (axis === 'x') {

						if (newMainScrollPos !== undefined) {
							_moveMainScroll(newMainScrollPos, true);
							if (newMainScrollPos === _startMainScrollPos.x) {
								_mainScrollShifted = false;
							} else {
								_mainScrollShifted = true;
							}
						}

						if (_currPanBounds.min.x !== _currPanBounds.max.x) {
							if (newPanPos !== undefined) {
								_panOffset.x = newPanPos;
							} else if (!_mainScrollShifted) {
								_panOffset.x += delta.x * panFriction;
							}
						}

						return newMainScrollPos !== undefined;
					}
				}

				if (!_mainScrollAnimating) {

					if (!_mainScrollShifted) {
						if (_currZoomLevel > self.currItem.fitRatio) {
							_panOffset[axis] += delta[axis] * panFriction;
						}
					}
				}
			},


			// Pointerdown/touchstart/mousedown handler
			_onDragStart = function _onDragStart(e) {

				// Allow dragging only via left mouse button.
				// As this handler is not added in IE8 - we ignore e.which
				// 
				// http://www.quirksmode.org/js/events_properties.html
				// https://developer.mozilla.org/en-US/docs/Web/API/event.button
				if (e.type === 'mousedown' && e.button > 0) {
					return;
				}

				if (_initialZoomRunning) {
					e.preventDefault();
					return;
				}

				if (_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
					return;
				}

				if (_preventDefaultEventBehaviour(e, true)) {
					e.preventDefault();
				}

				_shout('pointerDown');

				if (_pointerEventEnabled) {
					var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
					if (pointerIndex < 0) {
						pointerIndex = _currPointers.length;
					}
					_currPointers[pointerIndex] = { x: e.pageX, y: e.pageY, id: e.pointerId };
				}

				var startPointsList = _getTouchPoints(e),
				    numPoints = startPointsList.length;

				_currentPoints = null;

				_stopAllAnimations();

				// init drag
				if (!_isDragging || numPoints === 1) {

					_isDragging = _isFirstMove = true;
					framework.bind(window, _upMoveEvents, self);

					_isZoomingIn = _wasOverInitialZoom = _opacityChanged = _verticalDragInitiated = _mainScrollShifted = _moved = _isMultitouch = _zoomStarted = false;

					_direction = null;

					_shout('firstTouchStart', startPointsList);

					_equalizePoints(_startPanOffset, _panOffset);

					_currPanDist.x = _currPanDist.y = 0;
					_equalizePoints(_currPoint, startPointsList[0]);
					_equalizePoints(_startPoint, _currPoint);

					//_equalizePoints(_startMainScrollPos, _mainScrollPos);
					_startMainScrollPos.x = _slideSize.x * _currPositionIndex;

					_posPoints = [{
						x: _currPoint.x,
						y: _currPoint.y
					}];

					_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();

					//_mainScrollAnimationEnd(true);
					_calculatePanBounds(_currZoomLevel, true);

					// Start rendering
					_stopDragUpdateLoop();
					_dragUpdateLoop();
				}

				// init zoom
				if (!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
					_startZoomLevel = _currZoomLevel;
					_zoomStarted = false; // true if zoom changed at least once

					_isZooming = _isMultitouch = true;
					_currPanDist.y = _currPanDist.x = 0;

					_equalizePoints(_startPanOffset, _panOffset);

					_equalizePoints(p, startPointsList[0]);
					_equalizePoints(p2, startPointsList[1]);

					_findCenterOfPoints(p, p2, _currCenterPoint);

					_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
					_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
					_currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
				}
			},


			// Pointermove/touchmove/mousemove handler
			_onDragMove = function _onDragMove(e) {

				e.preventDefault();

				if (_pointerEventEnabled) {
					var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
					if (pointerIndex > -1) {
						var p = _currPointers[pointerIndex];
						p.x = e.pageX;
						p.y = e.pageY;
					}
				}

				if (_isDragging) {
					var touchesList = _getTouchPoints(e);
					if (!_direction && !_moved && !_isZooming) {

						if (_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
							// if main scroll position is shifted – direction is always horizontal
							_direction = 'h';
						} else {
							var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
							// check the direction of movement
							if (Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
								_direction = diff > 0 ? 'h' : 'v';
								_currentPoints = touchesList;
							}
						}
					} else {
						_currentPoints = touchesList;
					}
				}
			},

			// 
			_renderMovement = function _renderMovement() {

				if (!_currentPoints) {
					return;
				}

				var numPoints = _currentPoints.length;

				if (numPoints === 0) {
					return;
				}

				_equalizePoints(p, _currentPoints[0]);

				delta.x = p.x - _currPoint.x;
				delta.y = p.y - _currPoint.y;

				if (_isZooming && numPoints > 1) {
					// Handle behaviour for more than 1 point

					_currPoint.x = p.x;
					_currPoint.y = p.y;

					// check if one of two points changed
					if (!delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2)) {
						return;
					}

					_equalizePoints(p2, _currentPoints[1]);

					if (!_zoomStarted) {
						_zoomStarted = true;
						_shout('zoomGestureStarted');
					}

					// Distance between two points
					var pointsDistance = _calculatePointsDistance(p, p2);

					var zoomLevel = _calculateZoomLevel(pointsDistance);

					// slightly over the of initial zoom level
					if (zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
						_wasOverInitialZoom = true;
					}

					// Apply the friction if zoom level is out of the bounds
					var zoomFriction = 1,
					    minZoomLevel = _getMinZoomLevel(),
					    maxZoomLevel = _getMaxZoomLevel();

					if (zoomLevel < minZoomLevel) {

						if (_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
							// fade out background if zooming out
							var minusDiff = minZoomLevel - zoomLevel;
							var percent = 1 - minusDiff / (minZoomLevel / 1.2);

							_applyBgOpacity(percent);
							_shout('onPinchClose', percent);
							_opacityChanged = true;
						} else {
							zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
							if (zoomFriction > 1) {
								zoomFriction = 1;
							}
							zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
						}
					} else if (zoomLevel > maxZoomLevel) {
						// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
						zoomFriction = (zoomLevel - maxZoomLevel) / (minZoomLevel * 6);
						if (zoomFriction > 1) {
							zoomFriction = 1;
						}
						zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
					}

					if (zoomFriction < 0) {
						zoomFriction = 0;
					}

					// distance between touch points after friction is applied
					_currPointsDistance = pointsDistance;

					// _centerPoint - The point in the middle of two pointers
					_findCenterOfPoints(p, p2, _centerPoint);

					// paning with two pointers pressed
					_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
					_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
					_equalizePoints(_currCenterPoint, _centerPoint);

					_panOffset.x = _calculatePanOffset('x', zoomLevel);
					_panOffset.y = _calculatePanOffset('y', zoomLevel);

					_isZoomingIn = zoomLevel > _currZoomLevel;
					_currZoomLevel = zoomLevel;
					_applyCurrentZoomPan();
				} else {

					// handle behaviour for one point (dragging or panning)

					if (!_direction) {
						return;
					}

					if (_isFirstMove) {
						_isFirstMove = false;

						// subtract drag distance that was used during the detection direction  

						if (Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
							delta.x -= _currentPoints[0].x - _startPoint.x;
						}

						if (Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
							delta.y -= _currentPoints[0].y - _startPoint.y;
						}
					}

					_currPoint.x = p.x;
					_currPoint.y = p.y;

					// do nothing if pointers position hasn't changed
					if (delta.x === 0 && delta.y === 0) {
						return;
					}

					if (_direction === 'v' && _options.closeOnVerticalDrag) {
						if (!_canPan()) {
							_currPanDist.y += delta.y;
							_panOffset.y += delta.y;

							var opacityRatio = _calculateVerticalDragOpacityRatio();

							_verticalDragInitiated = true;
							_shout('onVerticalDrag', opacityRatio);

							_applyBgOpacity(opacityRatio);
							_applyCurrentZoomPan();
							return;
						}
					}

					_pushPosPoint(_getCurrentTime(), p.x, p.y);

					_moved = true;
					_currPanBounds = self.currItem.bounds;

					var mainScrollChanged = _panOrMoveMainScroll('x', delta);
					if (!mainScrollChanged) {
						_panOrMoveMainScroll('y', delta);

						_roundPoint(_panOffset);
						_applyCurrentZoomPan();
					}
				}
			},


			// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
			_onDragRelease = function _onDragRelease(e) {

				if (_features.isOldAndroid) {

					if (_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
						return;
					}

					// on Android (v4.1, 4.2, 4.3 & possibly older) 
					// ghost mousedown/up event isn't preventable via e.preventDefault,
					// which causes fake mousedown event
					// so we block mousedown/up for 600ms
					if (e.type.indexOf('touch') > -1) {
						clearTimeout(_oldAndroidTouchEndTimeout);
						_oldAndroidTouchEndTimeout = setTimeout(function () {
							_oldAndroidTouchEndTimeout = 0;
						}, 600);
					}
				}

				_shout('pointerUp');

				if (_preventDefaultEventBehaviour(e, false)) {
					e.preventDefault();
				}

				var releasePoint;

				if (_pointerEventEnabled) {
					var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');

					if (pointerIndex > -1) {
						releasePoint = _currPointers.splice(pointerIndex, 1)[0];

						if (navigator.pointerEnabled) {
							releasePoint.type = e.pointerType || 'mouse';
						} else {
							var MSPOINTER_TYPES = {
								4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
								2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
								3: 'pen' // event.MSPOINTER_TYPE_PEN
							};
							releasePoint.type = MSPOINTER_TYPES[e.pointerType];

							if (!releasePoint.type) {
								releasePoint.type = e.pointerType || 'mouse';
							}
						}
					}
				}

				var touchList = _getTouchPoints(e),
				    gestureType,
				    numPoints = touchList.length;

				if (e.type === 'mouseup') {
					numPoints = 0;
				}

				// Do nothing if there were 3 touch points or more
				if (numPoints === 2) {
					_currentPoints = null;
					return true;
				}

				// if second pointer released
				if (numPoints === 1) {
					_equalizePoints(_startPoint, touchList[0]);
				}

				// pointer hasn't moved, send "tap release" point
				if (numPoints === 0 && !_direction && !_mainScrollAnimating) {
					if (!releasePoint) {
						if (e.type === 'mouseup') {
							releasePoint = { x: e.pageX, y: e.pageY, type: 'mouse' };
						} else if (e.changedTouches && e.changedTouches[0]) {
							releasePoint = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type: 'touch' };
						}
					}

					_shout('touchRelease', e, releasePoint);
				}

				// Difference in time between releasing of two last touch points (zoom gesture)
				var releaseTimeDiff = -1;

				// Gesture completed, no pointers left
				if (numPoints === 0) {
					_isDragging = false;
					framework.unbind(window, _upMoveEvents, self);

					_stopDragUpdateLoop();

					if (_isZooming) {
						// Two points released at the same time
						releaseTimeDiff = 0;
					} else if (_lastReleaseTime !== -1) {
						releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
					}
				}
				_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;

				if (releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
					gestureType = 'zoom';
				} else {
					gestureType = 'swipe';
				}

				if (_isZooming && numPoints < 2) {
					_isZooming = false;

					// Only second point released
					if (numPoints === 1) {
						gestureType = 'zoomPointerUp';
					}
					_shout('zoomGestureEnded');
				}

				_currentPoints = null;
				if (!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
					// nothing to animate
					return;
				}

				_stopAllAnimations();

				if (!_releaseAnimData) {
					_releaseAnimData = _initDragReleaseAnimationData();
				}

				_releaseAnimData.calculateSwipeSpeed('x');

				if (_verticalDragInitiated) {

					var opacityRatio = _calculateVerticalDragOpacityRatio();

					if (opacityRatio < _options.verticalDragRange) {
						self.close();
					} else {
						var initalPanY = _panOffset.y,
						    initialBgOpacity = _bgOpacity;

						_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function (now) {

							_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;

							_applyBgOpacity((1 - initialBgOpacity) * now + initialBgOpacity);
							_applyCurrentZoomPan();
						});

						_shout('onVerticalDrag', 1);
					}

					return;
				}

				// main scroll 
				if ((_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
					var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
					if (itemChanged) {
						return;
					}
					gestureType = 'zoomPointerUp';
				}

				// prevent zoom/pan animation when main scroll animation runs
				if (_mainScrollAnimating) {
					return;
				}

				// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
				if (gestureType !== 'swipe') {
					_completeZoomGesture();
					return;
				}

				// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
				if (!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
					_completePanGesture(_releaseAnimData);
				}
			},


			// Returns object with data about gesture
			// It's created only once and then reused
			_initDragReleaseAnimationData = function _initDragReleaseAnimationData() {
				// temp local vars
				var lastFlickDuration, tempReleasePos;

				// s = this
				var s = {
					lastFlickOffset: {},
					lastFlickDist: {},
					lastFlickSpeed: {},
					slowDownRatio: {},
					slowDownRatioReverse: {},
					speedDecelerationRatio: {},
					speedDecelerationRatioAbs: {},
					distanceOffset: {},
					backAnimDestination: {},
					backAnimStarted: {},
					calculateSwipeSpeed: function calculateSwipeSpeed(axis) {

						if (_posPoints.length > 1) {
							lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
							tempReleasePos = _posPoints[_posPoints.length - 2][axis];
						} else {
							lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
							tempReleasePos = _startPoint[axis];
						}
						s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
						s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
						if (s.lastFlickDist[axis] > 20) {
							s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
						} else {
							s.lastFlickSpeed[axis] = 0;
						}
						if (Math.abs(s.lastFlickSpeed[axis]) < 0.1) {
							s.lastFlickSpeed[axis] = 0;
						}

						s.slowDownRatio[axis] = 0.95;
						s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
						s.speedDecelerationRatio[axis] = 1;
					},

					calculateOverBoundsAnimOffset: function calculateOverBoundsAnimOffset(axis, speed) {
						if (!s.backAnimStarted[axis]) {

							if (_panOffset[axis] > _currPanBounds.min[axis]) {
								s.backAnimDestination[axis] = _currPanBounds.min[axis];
							} else if (_panOffset[axis] < _currPanBounds.max[axis]) {
								s.backAnimDestination[axis] = _currPanBounds.max[axis];
							}

							if (s.backAnimDestination[axis] !== undefined) {
								s.slowDownRatio[axis] = 0.7;
								s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
								if (s.speedDecelerationRatioAbs[axis] < 0.05) {

									s.lastFlickSpeed[axis] = 0;
									s.backAnimStarted[axis] = true;

									_animateProp('bounceZoomPan' + axis, _panOffset[axis], s.backAnimDestination[axis], speed || 300, framework.easing.sine.out, function (pos) {
										_panOffset[axis] = pos;
										_applyCurrentZoomPan();
									});
								}
							}
						}
					},

					// Reduces the speed by slowDownRatio (per 10ms)
					calculateAnimOffset: function calculateAnimOffset(axis) {
						if (!s.backAnimStarted[axis]) {
							s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + s.slowDownRatioReverse[axis] - s.slowDownRatioReverse[axis] * s.timeDiff / 10);

							s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
							s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
							_panOffset[axis] += s.distanceOffset[axis];
						}
					},

					panAnimLoop: function panAnimLoop() {
						if (_animations.zoomPan) {
							_animations.zoomPan.raf = _requestAF(s.panAnimLoop);

							s.now = _getCurrentTime();
							s.timeDiff = s.now - s.lastNow;
							s.lastNow = s.now;

							s.calculateAnimOffset('x');
							s.calculateAnimOffset('y');

							_applyCurrentZoomPan();

							s.calculateOverBoundsAnimOffset('x');
							s.calculateOverBoundsAnimOffset('y');

							if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {

								// round pan position
								_panOffset.x = Math.round(_panOffset.x);
								_panOffset.y = Math.round(_panOffset.y);
								_applyCurrentZoomPan();

								_stopAnimation('zoomPan');
								return;
							}
						}
					}
				};
				return s;
			},
			    _completePanGesture = function _completePanGesture(animData) {
				// calculate swipe speed for Y axis (paanning)
				animData.calculateSwipeSpeed('y');

				_currPanBounds = self.currItem.bounds;

				animData.backAnimDestination = {};
				animData.backAnimStarted = {};

				// Avoid acceleration animation if speed is too low
				if (Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05) {
					animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;

					// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
					animData.calculateOverBoundsAnimOffset('x');
					animData.calculateOverBoundsAnimOffset('y');
					return true;
				}

				// Animation loop that controls the acceleration after pan gesture ends
				_registerStartAnimation('zoomPan');
				animData.lastNow = _getCurrentTime();
				animData.panAnimLoop();
			},
			    _finishSwipeMainScrollGesture = function _finishSwipeMainScrollGesture(gestureType, _releaseAnimData) {
				var itemChanged;
				if (!_mainScrollAnimating) {
					_currZoomedItemIndex = _currentItemIndex;
				}

				var itemsDiff;

				if (gestureType === 'swipe') {
					var totalShiftDist = _currPoint.x - _startPoint.x,
					    isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;

					// if container is shifted for more than MIN_SWIPE_DISTANCE, 
					// and last flick gesture was in right direction
					if (totalShiftDist > MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20)) {
						// go to prev item
						itemsDiff = -1;
					} else if (totalShiftDist < -MIN_SWIPE_DISTANCE && (isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20)) {
						// go to next item
						itemsDiff = 1;
					}
				}

				var nextCircle;

				if (itemsDiff) {

					_currentItemIndex += itemsDiff;

					if (_currentItemIndex < 0) {
						_currentItemIndex = _options.loop ? _getNumItems() - 1 : 0;
						nextCircle = true;
					} else if (_currentItemIndex >= _getNumItems()) {
						_currentItemIndex = _options.loop ? 0 : _getNumItems() - 1;
						nextCircle = true;
					}

					if (!nextCircle || _options.loop) {
						_indexDiff += itemsDiff;
						_currPositionIndex -= itemsDiff;
						itemChanged = true;
					}
				}

				var animateToX = _slideSize.x * _currPositionIndex;
				var animateToDist = Math.abs(animateToX - _mainScrollPos.x);
				var finishAnimDuration;

				if (!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
					// "return to current" duration, e.g. when dragging from slide 0 to -1
					finishAnimDuration = 333;
				} else {
					finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 333;

					finishAnimDuration = Math.min(finishAnimDuration, 400);
					finishAnimDuration = Math.max(finishAnimDuration, 250);
				}

				if (_currZoomedItemIndex === _currentItemIndex) {
					itemChanged = false;
				}

				_mainScrollAnimating = true;

				_shout('mainScrollAnimStart');

				_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, _moveMainScroll, function () {
					_stopAllAnimations();
					_mainScrollAnimating = false;
					_currZoomedItemIndex = -1;

					if (itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
						self.updateCurrItem();
					}

					_shout('mainScrollAnimComplete');
				});

				if (itemChanged) {
					self.updateCurrItem(true);
				}

				return itemChanged;
			},
			    _calculateZoomLevel = function _calculateZoomLevel(touchesDistance) {
				return 1 / _startPointsDistance * touchesDistance * _startZoomLevel;
			},


			// Resets zoom if it's out of bounds
			_completeZoomGesture = function _completeZoomGesture() {
				var destZoomLevel = _currZoomLevel,
				    minZoomLevel = _getMinZoomLevel(),
				    maxZoomLevel = _getMaxZoomLevel();

				if (_currZoomLevel < minZoomLevel) {
					destZoomLevel = minZoomLevel;
				} else if (_currZoomLevel > maxZoomLevel) {
					destZoomLevel = maxZoomLevel;
				}

				var destOpacity = 1,
				    onUpdate,
				    initialOpacity = _bgOpacity;

				if (_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
					//_closedByScroll = true;
					self.close();
					return true;
				}

				if (_opacityChanged) {
					onUpdate = function onUpdate(now) {
						_applyBgOpacity((destOpacity - initialOpacity) * now + initialOpacity);
					};
				}

				self.zoomTo(destZoomLevel, 0, 200, framework.easing.cubic.out, onUpdate);
				return true;
			};

			_registerModule('Gestures', {
				publicMethods: {

					initGestures: function initGestures() {

						// helper function that builds touch/pointer/mouse events
						var addEventNames = function addEventNames(pref, down, move, up, cancel) {
							_dragStartEvent = pref + down;
							_dragMoveEvent = pref + move;
							_dragEndEvent = pref + up;
							if (cancel) {
								_dragCancelEvent = pref + cancel;
							} else {
								_dragCancelEvent = '';
							}
						};

						_pointerEventEnabled = _features.pointerEvent;
						if (_pointerEventEnabled && _features.touch) {
							// we don't need touch events, if browser supports pointer events
							_features.touch = false;
						}

						if (_pointerEventEnabled) {
							if (navigator.pointerEnabled) {
								addEventNames('pointer', 'down', 'move', 'up', 'cancel');
							} else {
								// IE10 pointer events are case-sensitive
								addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
							}
						} else if (_features.touch) {
							addEventNames('touch', 'start', 'move', 'end', 'cancel');
							_likelyTouchDevice = true;
						} else {
							addEventNames('mouse', 'down', 'move', 'up');
						}

						_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent + ' ' + _dragCancelEvent;
						_downEvents = _dragStartEvent;

						if (_pointerEventEnabled && !_likelyTouchDevice) {
							_likelyTouchDevice = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1;
						}
						// make variable public
						self.likelyTouchDevice = _likelyTouchDevice;

						_globalEventHandlers[_dragStartEvent] = _onDragStart;
						_globalEventHandlers[_dragMoveEvent] = _onDragMove;
						_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken

						if (_dragCancelEvent) {
							_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
						}

						// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
						if (_features.touch) {
							_downEvents += ' mousedown';
							_upMoveEvents += ' mousemove mouseup';
							_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
							_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
							_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
						}

						if (!_likelyTouchDevice) {
							// don't allow pan to next slide from zoomed state on Desktop
							_options.allowPanToNext = false;
						}
					}

				}
			});

			/*>>gestures*/

			/*>>show-hide-transition*/
			/**
	   * show-hide-transition.js:
	   *
	   * Manages initial opening or closing transition.
	   *
	   * If you're not planning to use transition for gallery at all,
	   * you may set options hideAnimationDuration and showAnimationDuration to 0,
	   * and just delete startAnimation function.
	   * 
	   */

			var _showOrHideTimeout,
			    _showOrHide = function _showOrHide(item, img, out, completeFn) {

				if (_showOrHideTimeout) {
					clearTimeout(_showOrHideTimeout);
				}

				_initialZoomRunning = true;
				_initialContentSet = true;

				// dimensions of small thumbnail {x:,y:,w:}.
				// Height is optional, as calculated based on large image.
				var thumbBounds;
				if (item.initialLayout) {
					thumbBounds = item.initialLayout;
					item.initialLayout = null;
				} else {
					thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
				}

				var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;

				var onComplete = function onComplete() {
					_stopAnimation('initialZoom');
					if (!out) {
						_applyBgOpacity(1);
						if (img) {
							img.style.display = 'block';
						}
						framework.addClass(template, 'pswp--animated-in');
						_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
					} else {
						self.template.removeAttribute('style');
						self.bg.removeAttribute('style');
					}

					if (completeFn) {
						completeFn();
					}
					_initialZoomRunning = false;
				};

				// if bounds aren't provided, just open gallery without animation
				if (!duration || !thumbBounds || thumbBounds.x === undefined) {

					_shout('initialZoom' + (out ? 'Out' : 'In'));

					_currZoomLevel = item.initialZoomLevel;
					_equalizePoints(_panOffset, item.initialPosition);
					_applyCurrentZoomPan();

					template.style.opacity = out ? 0 : 1;
					_applyBgOpacity(1);

					if (duration) {
						setTimeout(function () {
							onComplete();
						}, duration);
					} else {
						onComplete();
					}

					return;
				}

				var startAnimation = function startAnimation() {
					var closeWithRaf = _closedByScroll,
					    fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;

					// apply hw-acceleration to image
					if (item.miniImg) {
						item.miniImg.style.webkitBackfaceVisibility = 'hidden';
					}

					if (!out) {
						_currZoomLevel = thumbBounds.w / item.w;
						_panOffset.x = thumbBounds.x;
						_panOffset.y = thumbBounds.y - _initalWindowScrollY;

						self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
						_applyCurrentZoomPan();
					}

					_registerStartAnimation('initialZoom');

					if (out && !closeWithRaf) {
						framework.removeClass(template, 'pswp--animated-in');
					}

					if (fadeEverything) {
						if (out) {
							framework[(closeWithRaf ? 'remove' : 'add') + 'Class'](template, 'pswp--animate_opacity');
						} else {
							setTimeout(function () {
								framework.addClass(template, 'pswp--animate_opacity');
							}, 30);
						}
					}

					_showOrHideTimeout = setTimeout(function () {

						_shout('initialZoom' + (out ? 'Out' : 'In'));

						if (!out) {

							// "in" animation always uses CSS transitions (instead of rAF).
							// CSS transition work faster here, 
							// as developer may also want to animate other things, 
							// like ui on top of sliding area, which can be animated just via CSS

							_currZoomLevel = item.initialZoomLevel;
							_equalizePoints(_panOffset, item.initialPosition);
							_applyCurrentZoomPan();
							_applyBgOpacity(1);

							if (fadeEverything) {
								template.style.opacity = 1;
							} else {
								_applyBgOpacity(1);
							}

							_showOrHideTimeout = setTimeout(onComplete, duration + 20);
						} else {

							// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
							var destZoomLevel = thumbBounds.w / item.w,
							    initialPanOffset = {
								x: _panOffset.x,
								y: _panOffset.y
							},
							    initialZoomLevel = _currZoomLevel,
							    initalBgOpacity = _bgOpacity,
							    onUpdate = function onUpdate(now) {

								if (now === 1) {
									_currZoomLevel = destZoomLevel;
									_panOffset.x = thumbBounds.x;
									_panOffset.y = thumbBounds.y - _currentWindowScrollY;
								} else {
									_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
									_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
									_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
								}

								_applyCurrentZoomPan();
								if (fadeEverything) {
									template.style.opacity = 1 - now;
								} else {
									_applyBgOpacity(initalBgOpacity - now * initalBgOpacity);
								}
							};

							if (closeWithRaf) {
								_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
							} else {
								onUpdate(1);
								_showOrHideTimeout = setTimeout(onComplete, duration + 20);
							}
						}
					}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
					// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
					// Which avoids lag at the beginning of scale transition.
				};
				startAnimation();
			};

			/*>>show-hide-transition*/

			/*>>items-controller*/
			/**
	  *
	  * Controller manages gallery items, their dimensions, and their content.
	  * 
	  */

			var _items,
			    _tempPanAreaSize = {},
			    _imagesToAppendPool = [],
			    _initialContentSet,
			    _initialZoomRunning,
			    _controllerDefaultOptions = {
				index: 0,
				errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
				forceProgressiveLoading: false, // TODO
				preload: [1, 1],
				getNumItemsFn: function getNumItemsFn() {
					return _items.length;
				}
			};

			var _getItemAt,
			    _getNumItems,
			    _initialIsLoop,
			    _getZeroBounds = function _getZeroBounds() {
				return {
					center: { x: 0, y: 0 },
					max: { x: 0, y: 0 },
					min: { x: 0, y: 0 }
				};
			},
			    _calculateSingleItemPanBounds = function _calculateSingleItemPanBounds(item, realPanElementW, realPanElementH) {
				var bounds = item.bounds;

				// position of element when it's centered
				bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
				bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;

				// maximum pan position
				bounds.max.x = realPanElementW > _tempPanAreaSize.x ? Math.round(_tempPanAreaSize.x - realPanElementW) : bounds.center.x;

				bounds.max.y = realPanElementH > _tempPanAreaSize.y ? Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : bounds.center.y;

				// minimum pan position
				bounds.min.x = realPanElementW > _tempPanAreaSize.x ? 0 : bounds.center.x;
				bounds.min.y = realPanElementH > _tempPanAreaSize.y ? item.vGap.top : bounds.center.y;
			},
			    _calculateItemSize = function _calculateItemSize(item, viewportSize, zoomLevel) {

				if (item.src && !item.loadError) {
					var isInitial = !zoomLevel;

					if (isInitial) {
						if (!item.vGap) {
							item.vGap = { top: 0, bottom: 0 };
						}
						// allows overriding vertical margin for individual items
						_shout('parseVerticalMargin', item);
					}

					_tempPanAreaSize.x = viewportSize.x;
					_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;

					if (isInitial) {
						var hRatio = _tempPanAreaSize.x / item.w;
						var vRatio = _tempPanAreaSize.y / item.h;

						item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
						//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;

						var scaleMode = _options.scaleMode;

						if (scaleMode === 'orig') {
							zoomLevel = 1;
						} else if (scaleMode === 'fit') {
							zoomLevel = item.fitRatio;
						}

						if (zoomLevel > 1) {
							zoomLevel = 1;
						}

						item.initialZoomLevel = zoomLevel;

						if (!item.bounds) {
							// reuse bounds object
							item.bounds = _getZeroBounds();
						}
					}

					if (!zoomLevel) {
						return;
					}

					_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);

					if (isInitial && zoomLevel === item.initialZoomLevel) {
						item.initialPosition = item.bounds.center;
					}

					return item.bounds;
				} else {
					item.w = item.h = 0;
					item.initialZoomLevel = item.fitRatio = 1;
					item.bounds = _getZeroBounds();
					item.initialPosition = item.bounds.center;

					// if it's not image, we return zero bounds (content is not zoomable)
					return item.bounds;
				}
			},
			    _appendImage = function _appendImage(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {

				if (item.loadError) {
					return;
				}

				if (img) {

					item.imageAppended = true;
					_setImageSize(item, img, item === self.currItem && _renderMaxResolution);

					baseDiv.appendChild(img);

					if (keepPlaceholder) {
						setTimeout(function () {
							if (item && item.loaded && item.placeholder) {
								item.placeholder.style.display = 'none';
								item.placeholder = null;
							}
						}, 500);
					}
				}
			},
			    _preloadImage = function _preloadImage(item) {
				item.loading = true;
				item.loaded = false;
				var img = item.img = framework.createEl('pswp__img', 'img');
				var onComplete = function onComplete() {
					item.loading = false;
					item.loaded = true;

					if (item.loadComplete) {
						item.loadComplete(item);
					} else {
						item.img = null; // no need to store image object
					}
					img.onload = img.onerror = null;
					img = null;
				};
				img.onload = onComplete;
				img.onerror = function () {
					item.loadError = true;
					onComplete();
				};

				img.src = item.src; // + '?a=' + Math.random();

				return img;
			},
			    _checkForError = function _checkForError(item, cleanUp) {
				if (item.src && item.loadError && item.container) {

					if (cleanUp) {
						item.container.innerHTML = '';
					}

					item.container.innerHTML = _options.errorMsg.replace('%url%', item.src);
					return true;
				}
			},
			    _setImageSize = function _setImageSize(item, img, maxRes) {
				if (!item.src) {
					return;
				}

				if (!img) {
					img = item.container.lastChild;
				}

				var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
				    h = maxRes ? item.h : Math.round(item.h * item.fitRatio);

				if (item.placeholder && !item.loaded) {
					item.placeholder.style.width = w + 'px';
					item.placeholder.style.height = h + 'px';
				}

				img.style.width = w + 'px';
				img.style.height = h + 'px';
			},
			    _appendImagesPool = function _appendImagesPool() {

				if (_imagesToAppendPool.length) {
					var poolItem;

					for (var i = 0; i < _imagesToAppendPool.length; i++) {
						poolItem = _imagesToAppendPool[i];
						if (poolItem.holder.index === poolItem.index) {
							_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
						}
					}
					_imagesToAppendPool = [];
				}
			};

			_registerModule('Controller', {

				publicMethods: {

					lazyLoadItem: function lazyLoadItem(index) {
						index = _getLoopedId(index);
						var item = _getItemAt(index);

						if (!item || (item.loaded || item.loading) && !_itemsNeedUpdate) {
							return;
						}

						_shout('gettingData', index, item);

						if (!item.src) {
							return;
						}

						_preloadImage(item);
					},
					initController: function initController() {
						framework.extend(_options, _controllerDefaultOptions, true);
						self.items = _items = items;
						_getItemAt = self.getItemAt;
						_getNumItems = _options.getNumItemsFn; //self.getNumItems;


						_initialIsLoop = _options.loop;
						if (_getNumItems() < 3) {
							_options.loop = false; // disable loop if less then 3 items
						}

						_listen('beforeChange', function (diff) {

							var p = _options.preload,
							    isNext = diff === null ? true : diff >= 0,
							    preloadBefore = Math.min(p[0], _getNumItems()),
							    preloadAfter = Math.min(p[1], _getNumItems()),
							    i;

							for (i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
								self.lazyLoadItem(_currentItemIndex + i);
							}
							for (i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
								self.lazyLoadItem(_currentItemIndex - i);
							}
						});

						_listen('initialLayout', function () {
							self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
						});

						_listen('mainScrollAnimComplete', _appendImagesPool);
						_listen('initialZoomInEnd', _appendImagesPool);

						_listen('destroy', function () {
							var item;
							for (var i = 0; i < _items.length; i++) {
								item = _items[i];
								// remove reference to DOM elements, for GC
								if (item.container) {
									item.container = null;
								}
								if (item.placeholder) {
									item.placeholder = null;
								}
								if (item.img) {
									item.img = null;
								}
								if (item.preloader) {
									item.preloader = null;
								}
								if (item.loadError) {
									item.loaded = item.loadError = false;
								}
							}
							_imagesToAppendPool = null;
						});
					},

					getItemAt: function getItemAt(index) {
						if (index >= 0) {
							return _items[index] !== undefined ? _items[index] : false;
						}
						return false;
					},

					allowProgressiveImg: function allowProgressiveImg() {
						// 1. Progressive image loading isn't working on webkit/blink 
						//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
						//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
						//    
						// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
						//    That's why it's disabled on touch devices (mainly because of swipe transition)
						//    
						// 3. Progressive image loading sometimes doesn't work in IE (up to 11).

						// Don't allow progressive loading on non-large touch devices
						return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200;
						// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
					},

					setContent: function setContent(holder, index) {

						if (_options.loop) {
							index = _getLoopedId(index);
						}

						var prevItem = self.getItemAt(holder.index);
						if (prevItem) {
							prevItem.container = null;
						}

						var item = self.getItemAt(index),
						    img;

						if (!item) {
							holder.el.innerHTML = '';
							return;
						}

						// allow to override data
						_shout('gettingData', index, item);

						holder.index = index;
						holder.item = item;

						// base container DIV is created only once for each of 3 holders
						var baseDiv = item.container = framework.createEl('pswp__zoom-wrap');

						if (!item.src && item.html) {
							if (item.html.tagName) {
								baseDiv.appendChild(item.html);
							} else {
								baseDiv.innerHTML = item.html;
							}
						}

						_checkForError(item);

						_calculateItemSize(item, _viewportSize);

						if (item.src && !item.loadError && !item.loaded) {

							item.loadComplete = function (item) {

								// gallery closed before image finished loading
								if (!_isOpen) {
									return;
								}

								// check if holder hasn't changed while image was loading
								if (holder && holder.index === index) {
									if (_checkForError(item, true)) {
										item.loadComplete = item.img = null;
										_calculateItemSize(item, _viewportSize);
										_applyZoomPanToItem(item);

										if (holder.index === _currentItemIndex) {
											// recalculate dimensions
											self.updateCurrZoomItem();
										}
										return;
									}
									if (!item.imageAppended) {
										if (_features.transform && (_mainScrollAnimating || _initialZoomRunning)) {
											_imagesToAppendPool.push({
												item: item,
												baseDiv: baseDiv,
												img: item.img,
												index: index,
												holder: holder,
												clearPlaceholder: true
											});
										} else {
											_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
										}
									} else {
										// remove preloader & mini-img
										if (!_initialZoomRunning && item.placeholder) {
											item.placeholder.style.display = 'none';
											item.placeholder = null;
										}
									}
								}

								item.loadComplete = null;
								item.img = null; // no need to store image element after it's added

								_shout('imageLoadComplete', index, item);
							};

							if (framework.features.transform) {

								var placeholderClassName = 'pswp__img pswp__img--placeholder';
								placeholderClassName += item.msrc ? '' : ' pswp__img--placeholder--blank';

								var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
								if (item.msrc) {
									placeholder.src = item.msrc;
								}

								_setImageSize(item, placeholder);

								baseDiv.appendChild(placeholder);
								item.placeholder = placeholder;
							}

							if (!item.loading) {
								_preloadImage(item);
							}

							if (self.allowProgressiveImg()) {
								// just append image
								if (!_initialContentSet && _features.transform) {
									_imagesToAppendPool.push({
										item: item,
										baseDiv: baseDiv,
										img: item.img,
										index: index,
										holder: holder
									});
								} else {
									_appendImage(index, item, baseDiv, item.img, true, true);
								}
							}
						} else if (item.src && !item.loadError) {
							// image object is created every time, due to bugs of image loading & delay when switching images
							img = framework.createEl('pswp__img', 'img');
							img.style.opacity = 1;
							img.src = item.src;
							_setImageSize(item, img);
							_appendImage(index, item, baseDiv, img, true);
						}

						if (!_initialContentSet && index === _currentItemIndex) {
							_currZoomElementStyle = baseDiv.style;
							_showOrHide(item, img || item.img);
						} else {
							_applyZoomPanToItem(item);
						}

						holder.el.innerHTML = '';
						holder.el.appendChild(baseDiv);
					},

					cleanSlide: function cleanSlide(item) {
						if (item.img) {
							item.img.onload = item.img.onerror = null;
						}
						item.loaded = item.loading = item.img = item.imageAppended = false;
					}

				}
			});

			/*>>items-controller*/

			/*>>tap*/
			/**
	   * tap.js:
	   *
	   * Displatches tap and double-tap events.
	   * 
	   */

			var tapTimer,
			    tapReleasePoint = {},
			    _dispatchTapEvent = function _dispatchTapEvent(origEvent, releasePoint, pointerType) {
				var e = document.createEvent('CustomEvent'),
				    eDetail = {
					origEvent: origEvent,
					target: origEvent.target,
					releasePoint: releasePoint,
					pointerType: pointerType || 'touch'
				};

				e.initCustomEvent('pswpTap', true, true, eDetail);
				origEvent.target.dispatchEvent(e);
			};

			_registerModule('Tap', {
				publicMethods: {
					initTap: function initTap() {
						_listen('firstTouchStart', self.onTapStart);
						_listen('touchRelease', self.onTapRelease);
						_listen('destroy', function () {
							tapReleasePoint = {};
							tapTimer = null;
						});
					},
					onTapStart: function onTapStart(touchList) {
						if (touchList.length > 1) {
							clearTimeout(tapTimer);
							tapTimer = null;
						}
					},
					onTapRelease: function onTapRelease(e, releasePoint) {
						if (!releasePoint) {
							return;
						}

						if (!_moved && !_isMultitouch && !_numAnimations) {
							var p0 = releasePoint;
							if (tapTimer) {
								clearTimeout(tapTimer);
								tapTimer = null;

								// Check if taped on the same place
								if (_isNearbyPoints(p0, tapReleasePoint)) {
									_shout('doubleTap', p0);
									return;
								}
							}

							if (releasePoint.type === 'mouse') {
								_dispatchTapEvent(e, releasePoint, 'mouse');
								return;
							}

							var clickedTagName = e.target.tagName.toUpperCase();
							// avoid double tap delay on buttons and elements that have class pswp__single-tap
							if (clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap')) {
								_dispatchTapEvent(e, releasePoint);
								return;
							}

							_equalizePoints(tapReleasePoint, p0);

							tapTimer = setTimeout(function () {
								_dispatchTapEvent(e, releasePoint);
								tapTimer = null;
							}, 300);
						}
					}
				}
			});

			/*>>tap*/

			/*>>desktop-zoom*/
			/**
	   *
	   * desktop-zoom.js:
	   *
	   * - Binds mousewheel event for paning zoomed image.
	   * - Manages "dragging", "zoomed-in", "zoom-out" classes.
	   *   (which are used for cursors and zoom icon)
	   * - Adds toggleDesktopZoom function.
	   * 
	   */

			var _wheelDelta;

			_registerModule('DesktopZoom', {

				publicMethods: {

					initDesktopZoom: function initDesktopZoom() {

						if (_oldIE) {
							// no zoom for old IE (<=8)
							return;
						}

						if (_likelyTouchDevice) {
							// if detected hardware touch support, we wait until mouse is used,
							// and only then apply desktop-zoom features
							_listen('mouseUsed', function () {
								self.setupDesktopZoom();
							});
						} else {
							self.setupDesktopZoom(true);
						}
					},

					setupDesktopZoom: function setupDesktopZoom(onInit) {

						_wheelDelta = {};

						var events = 'wheel mousewheel DOMMouseScroll';

						_listen('bindEvents', function () {
							framework.bind(template, events, self.handleMouseWheel);
						});

						_listen('unbindEvents', function () {
							if (_wheelDelta) {
								framework.unbind(template, events, self.handleMouseWheel);
							}
						});

						self.mouseZoomedIn = false;

						var hasDraggingClass,
						    updateZoomable = function updateZoomable() {
							if (self.mouseZoomedIn) {
								framework.removeClass(template, 'pswp--zoomed-in');
								self.mouseZoomedIn = false;
							}
							if (_currZoomLevel < 1) {
								framework.addClass(template, 'pswp--zoom-allowed');
							} else {
								framework.removeClass(template, 'pswp--zoom-allowed');
							}
							removeDraggingClass();
						},
						    removeDraggingClass = function removeDraggingClass() {
							if (hasDraggingClass) {
								framework.removeClass(template, 'pswp--dragging');
								hasDraggingClass = false;
							}
						};

						_listen('resize', updateZoomable);
						_listen('afterChange', updateZoomable);
						_listen('pointerDown', function () {
							if (self.mouseZoomedIn) {
								hasDraggingClass = true;
								framework.addClass(template, 'pswp--dragging');
							}
						});
						_listen('pointerUp', removeDraggingClass);

						if (!onInit) {
							updateZoomable();
						}
					},

					handleMouseWheel: function handleMouseWheel(e) {

						if (_currZoomLevel <= self.currItem.fitRatio) {
							if (_options.modal) {

								if (!_options.closeOnScroll || _numAnimations || _isDragging) {
									e.preventDefault();
								} else if (_transformKey && Math.abs(e.deltaY) > 2) {
									// close PhotoSwipe
									// if browser supports transforms & scroll changed enough
									_closedByScroll = true;
									self.close();
								}
							}
							return true;
						}

						// allow just one event to fire
						e.stopPropagation();

						// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
						_wheelDelta.x = 0;

						if ('deltaX' in e) {
							if (e.deltaMode === 1 /* DOM_DELTA_LINE */) {
									// 18 - average line height
									_wheelDelta.x = e.deltaX * 18;
									_wheelDelta.y = e.deltaY * 18;
								} else {
								_wheelDelta.x = e.deltaX;
								_wheelDelta.y = e.deltaY;
							}
						} else if ('wheelDelta' in e) {
							if (e.wheelDeltaX) {
								_wheelDelta.x = -0.16 * e.wheelDeltaX;
							}
							if (e.wheelDeltaY) {
								_wheelDelta.y = -0.16 * e.wheelDeltaY;
							} else {
								_wheelDelta.y = -0.16 * e.wheelDelta;
							}
						} else if ('detail' in e) {
							_wheelDelta.y = e.detail;
						} else {
							return;
						}

						_calculatePanBounds(_currZoomLevel, true);

						var newPanX = _panOffset.x - _wheelDelta.x,
						    newPanY = _panOffset.y - _wheelDelta.y;

						// only prevent scrolling in nonmodal mode when not at edges
						if (_options.modal || newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x && newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y) {
							e.preventDefault();
						}

						// TODO: use rAF instead of mousewheel?
						self.panTo(newPanX, newPanY);
					},

					toggleDesktopZoom: function toggleDesktopZoom(centerPoint) {
						centerPoint = centerPoint || { x: _viewportSize.x / 2 + _offset.x, y: _viewportSize.y / 2 + _offset.y };

						var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
						var zoomOut = _currZoomLevel === doubleTapZoomLevel;

						self.mouseZoomedIn = !zoomOut;

						self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
						framework[(!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
					}

				}
			});

			/*>>desktop-zoom*/

			/*>>history*/
			/**
	   *
	   * history.js:
	   *
	   * - Back button to close gallery.
	   * 
	   * - Unique URL for each slide: example.com/&pid=1&gid=3
	   *   (where PID is picture index, and GID and gallery index)
	   *   
	   * - Switch URL when slides change.
	   * 
	   */

			var _historyDefaultOptions = {
				history: true,
				galleryUID: 1
			};

			var _historyUpdateTimeout,
			    _hashChangeTimeout,
			    _hashAnimCheckTimeout,
			    _hashChangedByScript,
			    _hashChangedByHistory,
			    _hashReseted,
			    _initialHash,
			    _historyChanged,
			    _closedFromURL,
			    _urlChangedOnce,
			    _windowLoc,
			    _supportsPushState,
			    _getHash = function _getHash() {
				return _windowLoc.hash.substring(1);
			},
			    _cleanHistoryTimeouts = function _cleanHistoryTimeouts() {

				if (_historyUpdateTimeout) {
					clearTimeout(_historyUpdateTimeout);
				}

				if (_hashAnimCheckTimeout) {
					clearTimeout(_hashAnimCheckTimeout);
				}
			},


			// pid - Picture index
			// gid - Gallery index
			_parseItemIndexFromURL = function _parseItemIndexFromURL() {
				var hash = _getHash(),
				    params = {};

				if (hash.length < 5) {
					// pid=1
					return params;
				}

				var i,
				    vars = hash.split('&');
				for (i = 0; i < vars.length; i++) {
					if (!vars[i]) {
						continue;
					}
					var pair = vars[i].split('=');
					if (pair.length < 2) {
						continue;
					}
					params[pair[0]] = pair[1];
				}
				if (_options.galleryPIDs) {
					// detect custom pid in hash and search for it among the items collection
					var searchfor = params.pid;
					params.pid = 0; // if custom pid cannot be found, fallback to the first item
					for (i = 0; i < _items.length; i++) {
						if (_items[i].pid === searchfor) {
							params.pid = i;
							break;
						}
					}
				} else {
					params.pid = parseInt(params.pid, 10) - 1;
				}
				if (params.pid < 0) {
					params.pid = 0;
				}
				return params;
			},
			    _updateHash = function _updateHash() {

				if (_hashAnimCheckTimeout) {
					clearTimeout(_hashAnimCheckTimeout);
				}

				if (_numAnimations || _isDragging) {
					// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
					// that's why we update hash only when no animations running
					_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
					return;
				}

				if (_hashChangedByScript) {
					clearTimeout(_hashChangeTimeout);
				} else {
					_hashChangedByScript = true;
				}

				var pid = _currentItemIndex + 1;
				var item = _getItemAt(_currentItemIndex);
				if (item.hasOwnProperty('pid')) {
					// carry forward any custom pid assigned to the item
					pid = item.pid;
				}
				var newHash = _initialHash + '&' + 'gid=' + _options.galleryUID + '&' + 'pid=' + pid;

				if (!_historyChanged) {
					if (_windowLoc.hash.indexOf(newHash) === -1) {
						_urlChangedOnce = true;
					}
					// first time - add new hisory record, then just replace
				}

				var newURL = _windowLoc.href.split('#')[0] + '#' + newHash;

				if (_supportsPushState) {

					if ('#' + newHash !== window.location.hash) {
						history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
					}
				} else {
					if (_historyChanged) {
						_windowLoc.replace(newURL);
					} else {
						_windowLoc.hash = newHash;
					}
				}

				_historyChanged = true;
				_hashChangeTimeout = setTimeout(function () {
					_hashChangedByScript = false;
				}, 60);
			};

			_registerModule('History', {

				publicMethods: {
					initHistory: function initHistory() {

						framework.extend(_options, _historyDefaultOptions, true);

						if (!_options.history) {
							return;
						}

						_windowLoc = window.location;
						_urlChangedOnce = false;
						_closedFromURL = false;
						_historyChanged = false;
						_initialHash = _getHash();
						_supportsPushState = 'pushState' in history;

						if (_initialHash.indexOf('gid=') > -1) {
							_initialHash = _initialHash.split('&gid=')[0];
							_initialHash = _initialHash.split('?gid=')[0];
						}

						_listen('afterChange', self.updateURL);
						_listen('unbindEvents', function () {
							framework.unbind(window, 'hashchange', self.onHashChange);
						});

						var returnToOriginal = function returnToOriginal() {
							_hashReseted = true;
							if (!_closedFromURL) {

								if (_urlChangedOnce) {
									history.back();
								} else {

									if (_initialHash) {
										_windowLoc.hash = _initialHash;
									} else {
										if (_supportsPushState) {

											// remove hash from url without refreshing it or scrolling to top
											history.pushState('', document.title, _windowLoc.pathname + _windowLoc.search);
										} else {
											_windowLoc.hash = '';
										}
									}
								}
							}

							_cleanHistoryTimeouts();
						};

						_listen('unbindEvents', function () {
							if (_closedByScroll) {
								// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
								// this is done to keep the scroll position
								returnToOriginal();
							}
						});
						_listen('destroy', function () {
							if (!_hashReseted) {
								returnToOriginal();
							}
						});
						_listen('firstUpdate', function () {
							_currentItemIndex = _parseItemIndexFromURL().pid;
						});

						var index = _initialHash.indexOf('pid=');
						if (index > -1) {
							_initialHash = _initialHash.substring(0, index);
							if (_initialHash.slice(-1) === '&') {
								_initialHash = _initialHash.slice(0, -1);
							}
						}

						setTimeout(function () {
							if (_isOpen) {
								// hasn't destroyed yet
								framework.bind(window, 'hashchange', self.onHashChange);
							}
						}, 40);
					},
					onHashChange: function onHashChange() {

						if (_getHash() === _initialHash) {

							_closedFromURL = true;
							self.close();
							return;
						}
						if (!_hashChangedByScript) {

							_hashChangedByHistory = true;
							self.goTo(_parseItemIndexFromURL().pid);
							_hashChangedByHistory = false;
						}
					},
					updateURL: function updateURL() {

						// Delay the update of URL, to avoid lag during transition, 
						// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often

						_cleanHistoryTimeouts();

						if (_hashChangedByHistory) {
							return;
						}

						if (!_historyChanged) {
							_updateHash(); // first time
						} else {
							_historyUpdateTimeout = setTimeout(_updateHash, 800);
						}
					}

				}
			});

			/*>>history*/
			framework.extend(self, publicMethods);
		};
		return PhotoSwipe;
	});

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
	* http://photoswipe.com
	* Copyright (c) 2015 Dmitry Semenov; */
	/**
	*
	* UI on top of main sliding area (caption, arrows, close button, etc.).
	* Built just using public methods/properties of PhotoSwipe.
	* 
	*/
	(function (root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipeUI_Default = factory();
		}
	})(undefined, function () {

		'use strict';

		var PhotoSwipeUI_Default = function PhotoSwipeUI_Default(pswp, framework) {

			var ui = this;
			var _overlayUIUpdated = false,
			    _controlsVisible = true,
			    _fullscrenAPI,
			    _controls,
			    _captionContainer,
			    _fakeCaptionContainer,
			    _indexIndicator,
			    _shareButton,
			    _shareModal,
			    _shareModalHidden = true,
			    _initalCloseOnScrollValue,
			    _isIdle,
			    _listen,
			    _loadingIndicator,
			    _loadingIndicatorHidden,
			    _loadingIndicatorTimeout,
			    _galleryHasOneSlide,
			    _options,
			    _defaultUIOptions = {
				barsSize: { top: 44, bottom: 'auto' },
				closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
				timeToIdle: 4000,
				timeToIdleOutside: 1000,
				loadingIndicatorDelay: 1000, // 2s

				addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl /*, isFake */) {
					if (!item.title) {
						captionEl.children[0].innerHTML = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title;
					return true;
				},

				closeEl: true,
				captionEl: true,
				fullscreenEl: true,
				zoomEl: true,
				shareEl: true,
				counterEl: true,
				arrowEl: true,
				preloaderEl: true,

				tapToClose: false,
				tapToToggleControls: true,

				clickToCloseNonZoomable: true,

				shareButtons: [{ id: 'facebook', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}' }, { id: 'twitter', label: 'Tweet', url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}' }, { id: 'pinterest', label: 'Pin it', url: 'http://www.pinterest.com/pin/create/button/' + '?url={{url}}&media={{image_url}}&description={{text}}' }, { id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true }],
				getImageURLForShare: function getImageURLForShare() /* shareButtonData */{
					return pswp.currItem.src || '';
				},
				getPageURLForShare: function getPageURLForShare() /* shareButtonData */{
					return window.location.href;
				},
				getTextForShare: function getTextForShare() /* shareButtonData */{
					return pswp.currItem.title || '';
				},

				indexIndicatorSep: ' / ',
				fitControlsWidth: 1200

			},
			    _blockControlsTap,
			    _blockControlsTapTimeout;

			var _onControlsTap = function _onControlsTap(e) {
				if (_blockControlsTap) {
					return true;
				}

				e = e || window.event;

				if (_options.timeToIdle && _options.mouseUsed && !_isIdle) {
					// reset idle timer
					_onIdleMouseMove();
				}

				var target = e.target || e.srcElement,
				    uiElement,
				    clickedClass = target.getAttribute('class') || '',
				    found;

				for (var i = 0; i < _uiElements.length; i++) {
					uiElement = _uiElements[i];
					if (uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name) > -1) {
						uiElement.onTap();
						found = true;
					}
				}

				if (found) {
					if (e.stopPropagation) {
						e.stopPropagation();
					}
					_blockControlsTap = true;

					// Some versions of Android don't prevent ghost click event 
					// when preventDefault() was called on touchstart and/or touchend.
					// 
					// This happens on v4.3, 4.2, 4.1, 
					// older versions strangely work correctly, 
					// but just in case we add delay on all of them)	
					var tapDelay = framework.features.isOldAndroid ? 600 : 30;
					_blockControlsTapTimeout = setTimeout(function () {
						_blockControlsTap = false;
					}, tapDelay);
				}
			},
			    _fitControlsInViewport = function _fitControlsInViewport() {
				return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
			},
			    _togglePswpClass = function _togglePswpClass(el, cName, add) {
				framework[(add ? 'add' : 'remove') + 'Class'](el, 'pswp__' + cName);
			},


			// add class when there is just one item in the gallery
			// (by default it hides left/right arrows and 1ofX counter)
			_countNumItems = function _countNumItems() {
				var hasOneSlide = _options.getNumItemsFn() === 1;

				if (hasOneSlide !== _galleryHasOneSlide) {
					_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
					_galleryHasOneSlide = hasOneSlide;
				}
			},
			    _toggleShareModalClass = function _toggleShareModalClass() {
				_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
			},
			    _toggleShareModal = function _toggleShareModal() {

				_shareModalHidden = !_shareModalHidden;

				if (!_shareModalHidden) {
					_toggleShareModalClass();
					setTimeout(function () {
						if (!_shareModalHidden) {
							framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
						}
					}, 30);
				} else {
					framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
					setTimeout(function () {
						if (_shareModalHidden) {
							_toggleShareModalClass();
						}
					}, 300);
				}

				if (!_shareModalHidden) {
					_updateShareURLs();
				}
				return false;
			},
			    _openWindowPopup = function _openWindowPopup(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				pswp.shout('shareLinkClick', e, target);

				if (!target.href) {
					return false;
				}

				if (target.hasAttribute('download')) {
					return true;
				}

				window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,' + 'location=yes,width=550,height=420,top=100,left=' + (window.screen ? Math.round(screen.width / 2 - 275) : 100));

				if (!_shareModalHidden) {
					_toggleShareModal();
				}

				return false;
			},
			    _updateShareURLs = function _updateShareURLs() {
				var shareButtonOut = '',
				    shareButtonData,
				    shareURL,
				    image_url,
				    page_url,
				    share_text;

				for (var i = 0; i < _options.shareButtons.length; i++) {
					shareButtonData = _options.shareButtons[i];

					image_url = _options.getImageURLForShare(shareButtonData);
					page_url = _options.getPageURLForShare(shareButtonData);
					share_text = _options.getTextForShare(shareButtonData);

					shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url)).replace('{{image_url}}', encodeURIComponent(image_url)).replace('{{raw_image_url}}', image_url).replace('{{text}}', encodeURIComponent(share_text));

					shareButtonOut += '<a href="' + shareURL + '" target="_blank" ' + 'class="pswp__share--' + shareButtonData.id + '"' + (shareButtonData.download ? 'download' : '') + '>' + shareButtonData.label + '</a>';

					if (_options.parseShareButtonOut) {
						shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
					}
				}
				_shareModal.children[0].innerHTML = shareButtonOut;
				_shareModal.children[0].onclick = _openWindowPopup;
			},
			    _hasCloseClass = function _hasCloseClass(target) {
				for (var i = 0; i < _options.closeElClasses.length; i++) {
					if (framework.hasClass(target, 'pswp__' + _options.closeElClasses[i])) {
						return true;
					}
				}
			},
			    _idleInterval,
			    _idleTimer,
			    _idleIncrement = 0,
			    _onIdleMouseMove = function _onIdleMouseMove() {
				clearTimeout(_idleTimer);
				_idleIncrement = 0;
				if (_isIdle) {
					ui.setIdle(false);
				}
			},
			    _onMouseLeaveWindow = function _onMouseLeaveWindow(e) {
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if (!from || from.nodeName === 'HTML') {
					clearTimeout(_idleTimer);
					_idleTimer = setTimeout(function () {
						ui.setIdle(true);
					}, _options.timeToIdleOutside);
				}
			},
			    _setupFullscreenAPI = function _setupFullscreenAPI() {
				if (_options.fullscreenEl && !framework.features.isOldAndroid) {
					if (!_fullscrenAPI) {
						_fullscrenAPI = ui.getFullscreenAPI();
					}
					if (_fullscrenAPI) {
						framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
						ui.updateFullscreen();
						framework.addClass(pswp.template, 'pswp--supports-fs');
					} else {
						framework.removeClass(pswp.template, 'pswp--supports-fs');
					}
				}
			},
			    _setupLoadingIndicator = function _setupLoadingIndicator() {
				// Setup loading indicator
				if (_options.preloaderEl) {

					_toggleLoadingIndicator(true);

					_listen('beforeChange', function () {

						clearTimeout(_loadingIndicatorTimeout);

						// display loading indicator with delay
						_loadingIndicatorTimeout = setTimeout(function () {

							if (pswp.currItem && pswp.currItem.loading) {

								if (!pswp.allowProgressiveImg() || pswp.currItem.img && !pswp.currItem.img.naturalWidth) {
									// show preloader if progressive loading is not enabled, 
									// or image width is not defined yet (because of slow connection)
									_toggleLoadingIndicator(false);
									// items-controller.js function allowProgressiveImg
								}
							} else {
								_toggleLoadingIndicator(true); // hide preloader
							}
						}, _options.loadingIndicatorDelay);
					});
					_listen('imageLoadComplete', function (index, item) {
						if (pswp.currItem === item) {
							_toggleLoadingIndicator(true);
						}
					});
				}
			},
			    _toggleLoadingIndicator = function _toggleLoadingIndicator(hide) {
				if (_loadingIndicatorHidden !== hide) {
					_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
					_loadingIndicatorHidden = hide;
				}
			},
			    _applyNavBarGaps = function _applyNavBarGaps(item) {
				var gap = item.vGap;

				if (_fitControlsInViewport()) {

					var bars = _options.barsSize;
					if (_options.captionEl && bars.bottom === 'auto') {
						if (!_fakeCaptionContainer) {
							_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
							_fakeCaptionContainer.appendChild(framework.createEl('pswp__caption__center'));
							_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
							framework.addClass(_controls, 'pswp__ui--fit');
						}
						if (_options.addCaptionHTMLFn(item, _fakeCaptionContainer, true)) {

							var captionSize = _fakeCaptionContainer.clientHeight;
							gap.bottom = parseInt(captionSize, 10) || 44;
						} else {
							gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
						}
					} else {
						gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
					}

					// height of top bar is static, no need to calculate it
					gap.top = bars.top;
				} else {
					gap.top = gap.bottom = 0;
				}
			},
			    _setupIdle = function _setupIdle() {
				// Hide controls when mouse is used
				if (_options.timeToIdle) {
					_listen('mouseUsed', function () {

						framework.bind(document, 'mousemove', _onIdleMouseMove);
						framework.bind(document, 'mouseout', _onMouseLeaveWindow);

						_idleInterval = setInterval(function () {
							_idleIncrement++;
							if (_idleIncrement === 2) {
								ui.setIdle(true);
							}
						}, _options.timeToIdle / 2);
					});
				}
			},
			    _setupHidingControlsDuringGestures = function _setupHidingControlsDuringGestures() {

				// Hide controls on vertical drag
				_listen('onVerticalDrag', function (now) {
					if (_controlsVisible && now < 0.95) {
						ui.hideControls();
					} else if (!_controlsVisible && now >= 0.95) {
						ui.showControls();
					}
				});

				// Hide controls when pinching to close
				var pinchControlsHidden;
				_listen('onPinchClose', function (now) {
					if (_controlsVisible && now < 0.9) {
						ui.hideControls();
						pinchControlsHidden = true;
					} else if (pinchControlsHidden && !_controlsVisible && now > 0.9) {
						ui.showControls();
					}
				});

				_listen('zoomGestureEnded', function () {
					pinchControlsHidden = false;
					if (pinchControlsHidden && !_controlsVisible) {
						ui.showControls();
					}
				});
			};

			var _uiElements = [{
				name: 'caption',
				option: 'captionEl',
				onInit: function onInit(el) {
					_captionContainer = el;
				}
			}, {
				name: 'share-modal',
				option: 'shareEl',
				onInit: function onInit(el) {
					_shareModal = el;
				},
				onTap: function onTap() {
					_toggleShareModal();
				}
			}, {
				name: 'button--share',
				option: 'shareEl',
				onInit: function onInit(el) {
					_shareButton = el;
				},
				onTap: function onTap() {
					_toggleShareModal();
				}
			}, {
				name: 'button--zoom',
				option: 'zoomEl',
				onTap: pswp.toggleDesktopZoom
			}, {
				name: 'counter',
				option: 'counterEl',
				onInit: function onInit(el) {
					_indexIndicator = el;
				}
			}, {
				name: 'button--close',
				option: 'closeEl',
				onTap: pswp.close
			}, {
				name: 'button--arrow--left',
				option: 'arrowEl',
				onTap: pswp.prev
			}, {
				name: 'button--arrow--right',
				option: 'arrowEl',
				onTap: pswp.next
			}, {
				name: 'button--fs',
				option: 'fullscreenEl',
				onTap: function onTap() {
					if (_fullscrenAPI.isFullscreen()) {
						_fullscrenAPI.exit();
					} else {
						_fullscrenAPI.enter();
					}
				}
			}, {
				name: 'preloader',
				option: 'preloaderEl',
				onInit: function onInit(el) {
					_loadingIndicator = el;
				}
			}];

			var _setupUIElements = function _setupUIElements() {
				var item, classAttr, uiElement;

				var loopThroughChildElements = function loopThroughChildElements(sChildren) {
					if (!sChildren) {
						return;
					}

					var l = sChildren.length;
					for (var i = 0; i < l; i++) {
						item = sChildren[i];
						classAttr = item.className;

						for (var a = 0; a < _uiElements.length; a++) {
							uiElement = _uiElements[a];

							if (classAttr.indexOf('pswp__' + uiElement.name) > -1) {

								if (_options[uiElement.option]) {
									// if element is not disabled from options

									framework.removeClass(item, 'pswp__element--disabled');
									if (uiElement.onInit) {
										uiElement.onInit(item);
									}

									//item.style.display = 'block';
								} else {
									framework.addClass(item, 'pswp__element--disabled');
									//item.style.display = 'none';
								}
							}
						}
					}
				};
				loopThroughChildElements(_controls.children);

				var topBar = framework.getChildByClass(_controls, 'pswp__top-bar');
				if (topBar) {
					loopThroughChildElements(topBar.children);
				}
			};

			ui.init = function () {

				// extend options
				framework.extend(pswp.options, _defaultUIOptions, true);

				// create local link for fast access
				_options = pswp.options;

				// find pswp__ui element
				_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

				// create local link
				_listen = pswp.listen;

				_setupHidingControlsDuringGestures();

				// update controls when slides change
				_listen('beforeChange', ui.update);

				// toggle zoom on double-tap
				_listen('doubleTap', function (point) {
					var initialZoomLevel = pswp.currItem.initialZoomLevel;
					if (pswp.getZoomLevel() !== initialZoomLevel) {
						pswp.zoomTo(initialZoomLevel, point, 333);
					} else {
						pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
					}
				});

				// Allow text selection in caption
				_listen('preventDragEvent', function (e, isDown, preventObj) {
					var t = e.target || e.srcElement;
					if (t && t.getAttribute('class') && e.type.indexOf('mouse') > -1 && (t.getAttribute('class').indexOf('__caption') > 0 || /(SMALL|STRONG|EM)/i.test(t.tagName))) {
						preventObj.prevent = false;
					}
				});

				// bind events for UI
				_listen('bindEvents', function () {
					framework.bind(_controls, 'pswpTap click', _onControlsTap);
					framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

					if (!pswp.likelyTouchDevice) {
						framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
					}
				});

				// unbind events for UI
				_listen('unbindEvents', function () {
					if (!_shareModalHidden) {
						_toggleShareModal();
					}

					if (_idleInterval) {
						clearInterval(_idleInterval);
					}
					framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
					framework.unbind(document, 'mousemove', _onIdleMouseMove);
					framework.unbind(_controls, 'pswpTap click', _onControlsTap);
					framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
					framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

					if (_fullscrenAPI) {
						framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
						if (_fullscrenAPI.isFullscreen()) {
							_options.hideAnimationDuration = 0;
							_fullscrenAPI.exit();
						}
						_fullscrenAPI = null;
					}
				});

				// clean up things when gallery is destroyed
				_listen('destroy', function () {
					if (_options.captionEl) {
						if (_fakeCaptionContainer) {
							_controls.removeChild(_fakeCaptionContainer);
						}
						framework.removeClass(_captionContainer, 'pswp__caption--empty');
					}

					if (_shareModal) {
						_shareModal.children[0].onclick = null;
					}
					framework.removeClass(_controls, 'pswp__ui--over-close');
					framework.addClass(_controls, 'pswp__ui--hidden');
					ui.setIdle(false);
				});

				if (!_options.showAnimationDuration) {
					framework.removeClass(_controls, 'pswp__ui--hidden');
				}
				_listen('initialZoomIn', function () {
					if (_options.showAnimationDuration) {
						framework.removeClass(_controls, 'pswp__ui--hidden');
					}
				});
				_listen('initialZoomOut', function () {
					framework.addClass(_controls, 'pswp__ui--hidden');
				});

				_listen('parseVerticalMargin', _applyNavBarGaps);

				_setupUIElements();

				if (_options.shareEl && _shareButton && _shareModal) {
					_shareModalHidden = true;
				}

				_countNumItems();

				_setupIdle();

				_setupFullscreenAPI();

				_setupLoadingIndicator();
			};

			ui.setIdle = function (isIdle) {
				_isIdle = isIdle;
				_togglePswpClass(_controls, 'ui--idle', isIdle);
			};

			ui.update = function () {
				// Don't update UI if it's hidden
				if (_controlsVisible && pswp.currItem) {

					ui.updateIndexIndicator();

					if (_options.captionEl) {
						_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

						_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
					}

					_overlayUIUpdated = true;
				} else {
					_overlayUIUpdated = false;
				}

				if (!_shareModalHidden) {
					_toggleShareModal();
				}

				_countNumItems();
			};

			ui.updateFullscreen = function (e) {

				if (e) {
					// some browsers change window scroll position during the fullscreen
					// so PhotoSwipe updates it just in case
					setTimeout(function () {
						pswp.setScrollOffset(0, framework.getScrollY());
					}, 50);
				}

				// toogle pswp--fs class on root element
				framework[(_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class'](pswp.template, 'pswp--fs');
			};

			ui.updateIndexIndicator = function () {
				if (_options.counterEl) {
					_indexIndicator.innerHTML = pswp.getCurrentIndex() + 1 + _options.indexIndicatorSep + _options.getNumItemsFn();
				}
			};

			ui.onGlobalTap = function (e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				if (_blockControlsTap) {
					return;
				}

				if (e.detail && e.detail.pointerType === 'mouse') {

					// close gallery if clicked outside of the image
					if (_hasCloseClass(target)) {
						pswp.close();
						return;
					}

					if (framework.hasClass(target, 'pswp__img')) {
						if (pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
							if (_options.clickToCloseNonZoomable) {
								pswp.close();
							}
						} else {
							pswp.toggleDesktopZoom(e.detail.releasePoint);
						}
					}
				} else {

					// tap anywhere (except buttons) to toggle visibility of controls
					if (_options.tapToToggleControls) {
						if (_controlsVisible) {
							ui.hideControls();
						} else {
							ui.showControls();
						}
					}

					// tap to close gallery
					if (_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target))) {
						pswp.close();
						return;
					}
				}
			};
			ui.onMouseOver = function (e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				// add class when mouse is over an element that should close the gallery
				_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
			};

			ui.hideControls = function () {
				framework.addClass(_controls, 'pswp__ui--hidden');
				_controlsVisible = false;
			};

			ui.showControls = function () {
				_controlsVisible = true;
				if (!_overlayUIUpdated) {
					ui.update();
				}
				framework.removeClass(_controls, 'pswp__ui--hidden');
			};

			ui.supportsFullscreen = function () {
				var d = document;
				return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
			};

			ui.getFullscreenAPI = function () {
				var dE = document.documentElement,
				    api,
				    tF = 'fullscreenchange';

				if (dE.requestFullscreen) {
					api = {
						enterK: 'requestFullscreen',
						exitK: 'exitFullscreen',
						elementK: 'fullscreenElement',
						eventK: tF
					};
				} else if (dE.mozRequestFullScreen) {
					api = {
						enterK: 'mozRequestFullScreen',
						exitK: 'mozCancelFullScreen',
						elementK: 'mozFullScreenElement',
						eventK: 'moz' + tF
					};
				} else if (dE.webkitRequestFullscreen) {
					api = {
						enterK: 'webkitRequestFullscreen',
						exitK: 'webkitExitFullscreen',
						elementK: 'webkitFullscreenElement',
						eventK: 'webkit' + tF
					};
				} else if (dE.msRequestFullscreen) {
					api = {
						enterK: 'msRequestFullscreen',
						exitK: 'msExitFullscreen',
						elementK: 'msFullscreenElement',
						eventK: 'MSFullscreenChange'
					};
				}

				if (api) {
					api.enter = function () {
						// disable close-on-scroll in fullscreen
						_initalCloseOnScrollValue = _options.closeOnScroll;
						_options.closeOnScroll = false;

						if (this.enterK === 'webkitRequestFullscreen') {
							pswp.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT);
						} else {
							return pswp.template[this.enterK]();
						}
					};
					api.exit = function () {
						_options.closeOnScroll = _initalCloseOnScrollValue;

						return document[this.exitK]();
					};
					api.isFullscreen = function () {
						return document[this.elementK];
					};
				}

				return api;
			};
		};
		return PhotoSwipeUI_Default;
	});

/***/ },
/* 358 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Gère l'affichage de la cookiebar
	 */
	var CookieBar = function () {
	    function CookieBar(container) {
	        _classCallCheck(this, CookieBar);

	        this.options = {
	            containerOpenClass: 'bab-CookieBar--open',
	            cookieName: 'bab-accept-cookies',
	            cookieValue: 'true',
	            cookieDuration: 365
	        };

	        this.container = container;
	        this.button = this.container.querySelector('.js-cookie-bar-button');

	        // On récupère le cookie, et si il ne vaut pas la valeur attendue,
	        // cela veut dire que les cookies n'ont pas été acceptés, donc
	        // on affiche la cookiebar
	        var cookie = this.getCookie(this.options.cookieName);

	        if (cookie !== this.options.cookieValue) {
	            this.open();
	        }

	        this.initEvents();
	    }

	    _createClass(CookieBar, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.button.addEventListener('click', function () {
	                return _this.accept();
	            });
	        }

	        /**
	         * Ajoute un cookie avec la valeur attendue et ferme la cookiebar
	         */

	    }, {
	        key: 'accept',
	        value: function accept() {
	            this.close();

	            this.setCookie(this.options.cookieName, this.options.cookieValue, this.options.cookieDuration);
	        }

	        /**
	         * Affiche la cookiebar
	         */

	    }, {
	        key: 'open',
	        value: function open() {
	            this.container.classList.add(this.options.containerOpenClass);
	        }

	        /**
	         * Ferme la cookiebar
	         */

	    }, {
	        key: 'close',
	        value: function close() {
	            this.container.classList.remove(this.options.containerOpenClass);
	        }

	        /**
	         * Récupère la valeur d'un cookie
	         */

	    }, {
	        key: 'getCookie',
	        value: function getCookie(name) {
	            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	            return v ? v[2] : null;
	        }

	        /**
	         * Attribue une valeur à un cookie pour un nombre de jours donné
	         */

	    }, {
	        key: 'setCookie',
	        value: function setCookie(name, value, days) {
	            var d = new Date();
	            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	        }
	    }]);

	    return CookieBar;
	}();

	exports.default = CookieBar;

/***/ }
/******/ ]);