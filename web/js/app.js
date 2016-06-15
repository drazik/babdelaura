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

	__webpack_require__(1);

	__webpack_require__(26);

	var _nav = __webpack_require__(3);

	var _nav2 = _interopRequireDefault(_nav);

	var _gallery = __webpack_require__(27);

	var _gallery2 = _interopRequireDefault(_gallery);

	var _notification = __webpack_require__(37);

	var _notification2 = _interopRequireDefault(_notification);

	var _cookieBar = __webpack_require__(38);

	var _cookieBar2 = _interopRequireDefault(_cookieBar);

	var _articlesGrid = __webpack_require__(39);

	var _articlesGrid2 = _interopRequireDefault(_articlesGrid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var cookieBarContainer = document.querySelector('.js-cookie-bar');
	new _cookieBar2.default(cookieBarContainer);

	var navContainer = document.querySelector('.js-nav');
	new _nav2.default(navContainer);

	var galleryContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-gallery')));
	galleryContainers.forEach(function (container) {
	  return new _gallery2.default(container);
	});

	var notificationContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-notification')));
	notificationContainers.forEach(function (container) {
	  return new _notification2.default(container);
	});

	var articlesGridContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-articles-grid')));
	articlesGridContainers.forEach(function (container) {
	  return new _articlesGrid2.default(container);
	});

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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Nav = function () {
	    function Nav(container) {
	        _classCallCheck(this, Nav);

	        this.options = {
	            itemsContainerOpenClass: 'bab-MainNav--open',
	            toggleIconOpenClass: 'fa-bars',
	            toggleIconCloseClass: 'fa-times'
	        };

	        this.container = container;
	        this.toggleButton = this.container.querySelector('.js-nav-toggle');
	        this.toggleIcon = this.toggleButton.querySelector('.js-nav-toggle-icon');
	        this.itemsContainer = this.container.querySelector('.js-nav-items');

	        this.initEvents();
	    }

	    _createClass(Nav, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.toggleButton.addEventListener('click', function () {
	                return _this.toggle();
	            });
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.container.classList.toggle(this.options.itemsContainerOpenClass);
	            this.toggleIcon.classList.toggle(this.options.toggleIconOpenClass);
	            this.toggleIcon.classList.toggle(this.options.toggleIconCloseClass);
	        }
	    }]);

	    return Nav;
	}();

	exports.default = Nav;

/***/ },
/* 4 */,
/* 5 */
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

	var Delegate = __webpack_require__(6);

	module.exports = function (root) {
	  return new Delegate(root);
	};

	module.exports.Delegate = Delegate;

/***/ },
/* 6 */
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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	"use strict";

	/*!
	 * FEATURE.JS 1.0.0, A Fast, simple and lightweight browser feature
	 * detection library in just 1kb.
	 *
	 * http://featurejs.com
	 *
	 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
	 * addEventListener, querySelectorAll, matchMedia, classList API,
	 * placeholder, localStorage, History API, Viewport Units, REM Units,
	 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
	 * Device Motion, Device Orientation, Touch, Async, Defer,
	 * Srcset, Sizes & Picture Element.
	 *
	 *
	 * USAGE EXAMPLE:
	 * if (feature.webGL) {
	 *   console.log("webGL supported!");
	 * }
	 *
	 * Author: @viljamis, https://viljamis.com
	 */

	/* globals DocumentTouch */
	;(function (window, document, undefined) {
	  "use strict";

	  // For minification only

	  var docEl = document.documentElement;

	  /**
	   * Utilities
	   */
	  var util = {

	    /**
	     * Simple create element method
	     */
	    create: function create(el) {
	      return document.createElement(el);
	    },

	    /**
	     * Test if it's an old device that we want to filter out
	     */
	    old: !!/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent),

	    /**
	     * Function that takes a standard CSS property name as a parameter and
	     * returns it's prefixed version valid for current browser it runs in
	     */
	    pfx: function () {
	      var style = document.createElement("dummy").style;
	      var prefixes = ["Webkit", "Moz", "O", "ms"];
	      var memory = {};
	      return function (prop) {
	        if (typeof memory[prop] === "undefined") {
	          var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
	              props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
	          memory[prop] = null;
	          for (var i in props) {
	            if (style[props[i]] !== undefined) {
	              memory[prop] = props[i];
	              break;
	            }
	          }
	        }
	        return memory[prop];
	      };
	    }()

	  };

	  /**
	   * The Feature.js object
	   */

	  var Feature = {
	    // Test if CSS 3D transforms are supported
	    css3Dtransform: function () {
	      var test = !util.old && util.pfx("perspective") !== null;
	      return !!test;
	    }(),

	    // Test if CSS transforms are supported
	    cssTransform: function () {
	      var test = !util.old && util.pfx("transformOrigin") !== null;
	      return !!test;
	    }(),

	    // Test if CSS transitions are supported
	    cssTransition: function () {
	      var test = util.pfx("transition") !== null;
	      return !!test;
	    }(),

	    // Test if addEventListener is supported
	    addEventListener: !!window.addEventListener,

	    // Test if querySelectorAll is supported
	    querySelectorAll: !!document.querySelectorAll,

	    // Test if matchMedia is supported
	    matchMedia: !!window.matchMedia,

	    // Test if Device Motion is supported
	    deviceMotion: "DeviceMotionEvent" in window,

	    // Test if Device Orientation is supported
	    deviceOrientation: "DeviceOrientationEvent" in window,

	    // Test if Context Menu is supported
	    contextMenu: "contextMenu" in docEl && "HTMLMenuItemElement" in window,

	    // Test if classList API is supported
	    classList: "classList" in docEl,

	    // Test if placeholder attribute is supported
	    placeholder: "placeholder" in util.create("input"),

	    // Test if localStorage is supported
	    localStorage: function () {
	      var test = "x";
	      try {
	        localStorage.setItem(test, test);
	        localStorage.removeItem(test);
	        return true;
	      } catch (err) {
	        return false;
	      }
	    }(),

	    // Test if History API is supported
	    historyAPI: window.history && "pushState" in window.history,

	    // Test if ServiceWorkers are supported
	    serviceWorker: "serviceWorker" in navigator,

	    // Test if viewport units are supported
	    viewportUnit: function (el) {
	      try {
	        el.style.width = "1vw";
	        var test = el.style.width !== "";
	        return !!test;
	      } catch (err) {
	        return false;
	      }
	    }(util.create("dummy")),

	    // Test if REM units are supported
	    remUnit: function (el) {
	      try {
	        el.style.width = "1rem";
	        var test = el.style.width !== "";
	        return !!test;
	      } catch (err) {
	        return false;
	      }
	    }(util.create("dummy")),

	    // Test if Canvas is supported
	    canvas: function (el) {
	      return !!(el.getContext && el.getContext("2d"));
	    }(util.create("canvas")),

	    // Test if SVG is supported
	    svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,

	    // Test if WebGL is supported
	    webGL: function (el) {
	      try {
	        return !!(window.WebGLRenderingContext && (el.getContext("webgl") || el.getContext("experimental-webgl")));
	      } catch (err) {
	        return false;
	      }
	    }(util.create("canvas")),

	    // Test if cors is supported
	    cors: "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest(),

	    // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
	    touch: !!("ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),

	    // Test if async attribute is supported
	    async: "async" in util.create("script"),

	    // Test if defer attribute is supported
	    defer: "defer" in util.create("script"),

	    // Test if Geolocation is supported
	    geolocation: "geolocation" in navigator,

	    // Test if img srcset attribute is supported
	    srcset: "srcset" in util.create("img"),

	    // Test if img sizes attribute is supported
	    sizes: "sizes" in util.create("img"),

	    // Test if Picture element is supported
	    pictureElement: "HTMLPictureElement" in window,

	    // Run all the tests and add supported classes
	    testAll: function testAll() {
	      var classes = " js";
	      for (var test in this) {
	        if (test !== "testAll" && test !== "constructor" && this[test]) {
	          classes += " " + test;
	        }
	      }
	      docEl.className += classes.toLowerCase();
	    }

	  };

	  /**
	   * Expose a public-facing API
	   */
	  window.feature = Feature;
	})(window, document);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _url = __webpack_require__(28);

	var _photoswipe = __webpack_require__(35);

	var _photoswipe2 = _interopRequireDefault(_photoswipe);

	var _photoswipeUiDefault = __webpack_require__(36);

	var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

	var _domDelegate = __webpack_require__(5);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Gallery = function () {
	    function Gallery(container) {
	        _classCallCheck(this, Gallery);

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

	    _createClass(Gallery, [{
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

	                if (item.w > 0 && item.h > 0) {
	                    _this.photoSwipeItems.push(item);
	                    return;
	                }

	                _this.loadImage(image);
	            });
	        }
	    }, {
	        key: 'loadImage',
	        value: function loadImage(image) {
	            var _this2 = this;

	            var tmpImage = new Image();

	            tmpImage.onload = function () {
	                var item = {
	                    src: tmpImage.src,
	                    w: tmpImage.width,
	                    h: tmpImage.height
	                };

	                _this2.photoSwipeItems.push(item);
	            };

	            tmpImage.src = image.src;
	        }
	    }, {
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this3 = this;

	            this.containerDelegate.on('click', 'img', function (event) {
	                var img = event.target;
	                var imgIndex = _this3.images.indexOf(img);

	                _this3.show(imgIndex);
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show(index) {
	            this.options.photoSwipe.index = index;
	            this.photoSwipe = new _photoswipe2.default(this.photoSwipeElement, _photoswipeUiDefault2.default, this.photoSwipeItems, this.options.photoSwipe);
	            this.photoSwipe.init();
	        }
	    }]);

	    return Gallery;
	}();

	exports.default = Gallery;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

	var punycode = __webpack_require__(29);

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
	    querystring = __webpack_require__(32);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
		if ("function" == 'function' && _typeof(__webpack_require__(31)) == 'object' && __webpack_require__(31)) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)(module), (function() { return this; }())))

/***/ },
/* 30 */
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
/* 31 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(33);
	exports.encode = exports.stringify = __webpack_require__(34);

/***/ },
/* 33 */
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
/* 34 */
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Notification = function () {
	    function Notification(container) {
	        var _this = this;

	        _classCallCheck(this, Notification);

	        this.options = {
	            timeBeforeClose: 10000
	        };

	        this.container = container;

	        setTimeout(function () {
	            return _this.close;
	        }, this.options.timeBeforeClose);
	    }

	    _createClass(Notification, [{
	        key: "close",
	        value: function close() {
	            this.container.parentNode.removeChild(this.container);
	        }
	    }]);

	    return Notification;
	}();

	exports.default = Notification;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	    }, {
	        key: 'accept',
	        value: function accept() {
	            this.close();

	            this.setCookie(this.options.cookieName, this.options.cookieValue, this.options.cookieDuration);
	        }
	    }, {
	        key: 'open',
	        value: function open() {
	            this.container.classList.add(this.options.containerOpenClass);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            this.container.classList.remove(this.options.containerOpenClass);
	        }
	    }, {
	        key: 'getCookie',
	        value: function getCookie(name) {
	            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	            return v ? v[2] : null;
	        }
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

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domDelegate = __webpack_require__(5);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	var _closest = __webpack_require__(40);

	var _closest2 = _interopRequireDefault(_closest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ArticlesGrid = function () {
	    function ArticlesGrid(container) {
	        _classCallCheck(this, ArticlesGrid);

	        this.container = container;
	        this.containerDelegate = (0, _domDelegate2.default)(this.container);

	        this.initEvents();
	    }

	    _createClass(ArticlesGrid, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            if (window.feature.touch) {
	                this.containerDelegate.on('click', '.js-articles-grid-item a', function (event) {
	                    return event.stopPropagation();
	                });
	                this.containerDelegate.on('click', '.js-articles-grid-item', function (event) {
	                    var item = (0, _closest2.default)(event.target, '.js-articles-grid-item', true);

	                    _this.toggleDetails(item);
	                });
	            }
	        }
	    }, {
	        key: 'toggleDetails',
	        value: function toggleDetails(item) {
	            item.classList.toggle('hover');
	        }
	    }]);

	    return ArticlesGrid;
	}();

	exports.default = ArticlesGrid;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var matches = __webpack_require__(41);

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode;

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode;
	  }
	};

/***/ },
/* 41 */
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

/***/ }
/******/ ]);