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

	var _nav = __webpack_require__(2);

	var _nav2 = _interopRequireDefault(_nav);

	var _modal = __webpack_require__(3);

	var _modal2 = _interopRequireDefault(_modal);

	var _ContentTools = __webpack_require__(6);

	var _ContentTools2 = _interopRequireDefault(_ContentTools);

	var _imageUploadList = __webpack_require__(7);

	var _imageUploadList2 = _interopRequireDefault(_imageUploadList);

	var _modalImagePicker = __webpack_require__(29);

	var _modalImagePicker2 = _interopRequireDefault(_modalImagePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var navContainer = document.querySelector('.js-nav');
	new _nav2.default(navContainer);

	var modalContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-modal')));
	modalContainers.forEach(function (container) {
	    return new _modal2.default(container);
	});

	var imageUploadListContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-image-upload-list')));
	imageUploadListContainers.forEach(function (container) {
	    return new _imageUploadList2.default(container);
	});

	var modalImagePickerContainers = [].concat(_toConsumableArray(document.querySelectorAll('.js-modal-image-picker')));
	modalImagePickerContainers.forEach(function (container) {
	    return new _modalImagePicker2.default(container);
	});

	var editor = _ContentTools2.default.EditorApp.get();
	editor.init('*[data-editable]', 'data-name');
	editor.addEventListener('saved', function (event) {
	    var regions = event.detail().regions;

	    for (var name in regions) {
	        var formElement = document.getElementById(name);
	        formElement.value = regions[name];
	    }
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
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Gestion de l'affichage du menu en mobile
	 */

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

	    /**
	     * Au click sur le bouton, toggle le menu
	     */


	    _createClass(Nav, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.toggleButton.addEventListener('click', function () {
	                return _this.toggle();
	            });
	        }

	        /**
	         * Ouvre ou ferme le menu selon son état actuel
	         */

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domDelegate = __webpack_require__(4);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Fenêtre modale
	 */

	var Modal = function () {
	    function Modal(container) {
	        _classCallCheck(this, Modal);

	        this.options = {
	            openClass: 'bab-Modal--open',
	            noScrollClass: 'noscroll'
	        };

	        this.container = container;

	        this.bodyDelegate = (0, _domDelegate2.default)(document.body);
	        this.containerDelegate = (0, _domDelegate2.default)(this.container);

	        this.initEvents();
	    }

	    /**
	     * Gestion des événements :
	     *  - Ouverture de la modale
	     *  - Fermeture de la modale (au click sur un bouton)
	     *  - Fermeture de la modale (à l'appui sur la touche ECHAP)
	     */


	    _createClass(Modal, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.bodyDelegate.on('click', '.js-modal-opener[data-target="' + this.container.id + '"]', this.open.bind(this));
	            this.containerDelegate.on('click', '.js-modal-closer', this.close.bind(this));

	            window.addEventListener('keyup', function (event) {
	                var ESCAPE = 27;

	                if (event.keyCode === ESCAPE) {
	                    _this.close();
	                }
	            });
	        }

	        /**
	         * Ouverture de la modale
	         */

	    }, {
	        key: 'open',
	        value: function open() {
	            this.container.classList.add(this.options.openClass);
	            document.documentElement.classList.add(this.options.noScrollClass);
	            document.body.classList.add(this.options.noScrollClass);
	        }

	        /**
	         * Fermeture de la modale
	         */

	    }, {
	        key: 'close',
	        value: function close() {
	            this.container.classList.remove(this.options.openClass);
	            document.documentElement.classList.remove(this.options.noScrollClass);
	            document.body.classList.add(this.options.noScrollClass);
	        }
	    }]);

	    return Modal;
	}();

	exports.default = Modal;

/***/ },
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
/* 6 */
/***/ function(module, exports) {

	"use strict";(function(){var FSM,exports;FSM={};FSM.Machine=function(){function Machine(context){this.context=context;this._stateTransitions={};this._stateTransitionsAny={};this._defaultTransition=null;this._initialState=null;this._currentState=null;}Machine.prototype.addTransition=function(action,state,nextState,callback){if(!nextState){nextState=state;}return this._stateTransitions[[action,state]]=[nextState,callback];};Machine.prototype.addTransitions=function(actions,state,nextState,callback){var action,_i,_len,_results;if(!nextState){nextState=state;}_results=[];for(_i=0,_len=actions.length;_i<_len;_i++){action=actions[_i];_results.push(this.addTransition(action,state,nextState,callback));}return _results;};Machine.prototype.addTransitionAny=function(state,nextState,callback){if(!nextState){nextState=state;}return this._stateTransitionsAny[state]=[nextState,callback];};Machine.prototype.setDefaultTransition=function(state,callback){return this._defaultTransition=[state,callback];};Machine.prototype.getTransition=function(action,state){if(this._stateTransitions[[action,state]]){return this._stateTransitions[[action,state]];}else if(this._stateTransitionsAny[state]){return this._stateTransitionsAny[state];}else if(this._defaultTransition){return this._defaultTransition;}throw new Error("Transition is undefined: ("+action+", "+state+")");};Machine.prototype.getCurrentState=function(){return this._currentState;};Machine.prototype.setInitialState=function(state){this._initialState=state;if(!this._currentState){return this.reset();}};Machine.prototype.reset=function(){return this._currentState=this._initialState;};Machine.prototype.process=function(action){var result;result=this.getTransition(action,this._currentState);if(result[1]){result[1].call(this.context||(this.context=this),action);}return this._currentState=result[0];};return Machine;}();window.FSM=FSM;if(typeof module!=='undefined'&&module.exports){exports=module.exports=FSM;}}).call(undefined);(function(){var ALPHA_CHARS,ALPHA_NUMERIC_CHARS,ATTR_DELIM,ATTR_ENTITY_DOUBLE_DELIM,ATTR_ENTITY_NO_DELIM,ATTR_ENTITY_SINGLE_DELIM,ATTR_NAME,ATTR_NAME_CHARS,ATTR_NAME_FIND_VALUE,ATTR_OR_TAG_END,ATTR_VALUE_DOUBLE_DELIM,ATTR_VALUE_NO_DELIM,ATTR_VALUE_SINGLE_DELIM,CHAR_OR_ENTITY_OR_TAG,CLOSING_TAG,ENTITY,ENTITY_CHARS,HTMLString,OPENING_TAG,OPENNING_OR_CLOSING_TAG,TAG_NAME_CHARS,TAG_NAME_CLOSING,TAG_NAME_MUST_CLOSE,TAG_NAME_OPENING,TAG_OPENING_SELF_CLOSING,exports,_Parser,__slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i;}return -1;};HTMLString={};if(typeof window!=='undefined'){window.HTMLString=HTMLString;}if(typeof module!=='undefined'&&module.exports){exports=module.exports=HTMLString;}HTMLString.String=function(){String._parser=null;function String(html,preserveWhitespace){if(preserveWhitespace==null){preserveWhitespace=false;}this._preserveWhitespace=preserveWhitespace;if(html){if(HTMLString.String._parser===null){HTMLString.String._parser=new _Parser();}this.characters=HTMLString.String._parser.parse(html,this._preserveWhitespace).characters;}else {this.characters=[];}}String.prototype.isWhitespace=function(){var c,_i,_len,_ref;_ref=this.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];if(!c.isWhitespace()){return false;}}return true;};String.prototype.length=function(){return this.characters.length;};String.prototype.preserveWhitespace=function(){return this._preserveWhitespace;};String.prototype.capitalize=function(){var c,newString;newString=this.copy();if(newString.length()){c=newString.characters[0]._c.toUpperCase();newString.characters[0]._c=c;}return newString;};String.prototype.charAt=function(index){return this.characters[index].copy();};String.prototype.concat=function(){var c,indexChar,inheritFormat,inheritedTags,newString,string,strings,tail,_i,_j,_k,_l,_len,_len1,_len2,_ref,_ref1;strings=2<=arguments.length?__slice.call(arguments,0,_i=arguments.length-1):(_i=0,[]),inheritFormat=arguments[_i++];if(!(typeof inheritFormat==='undefined'||typeof inheritFormat==='boolean')){strings.push(inheritFormat);inheritFormat=true;}newString=this.copy();for(_j=0,_len=strings.length;_j<_len;_j++){string=strings[_j];if(string.length===0){continue;}tail=string;if(typeof string==='string'){tail=new HTMLString.String(string,this._preserveWhitespace);}if(inheritFormat&&newString.length()){indexChar=newString.charAt(newString.length()-1);inheritedTags=indexChar.tags();if(indexChar.isTag()){inheritedTags.shift();}if(typeof string!=='string'){tail=tail.copy();}_ref=tail.characters;for(_k=0,_len1=_ref.length;_k<_len1;_k++){c=_ref[_k];c.addTags.apply(c,inheritedTags);}}_ref1=tail.characters;for(_l=0,_len2=_ref1.length;_l<_len2;_l++){c=_ref1[_l];newString.characters.push(c);}}return newString;};String.prototype.contains=function(substring){var c,found,from,i,_i,_len,_ref;if(typeof substring==='string'){return this.text().indexOf(substring)>-1;}from=0;while(from<=this.length()-substring.length()){found=true;_ref=substring.characters;for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){c=_ref[i];if(!c.eq(this.characters[i+from])){found=false;break;}}if(found){return true;}from++;}return false;};String.prototype.endsWith=function(substring){var c,characters,i,_i,_len,_ref;if(typeof substring==='string'){return substring===''||this.text().slice(-substring.length)===substring;}characters=this.characters.slice().reverse();_ref=substring.characters.slice().reverse();for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){c=_ref[i];if(!c.eq(characters[i])){return false;}}return true;};String.prototype.format=function(){var c,from,i,newString,tags,to,_i;from=arguments[0],to=arguments[1],tags=3<=arguments.length?__slice.call(arguments,2):[];if(to<0){to=this.length()+to+1;}if(from<0){from=this.length()+from;}newString=this.copy();for(i=_i=from;from<=to?_i<to:_i>to;i=from<=to?++_i:--_i){c=newString.characters[i];c.addTags.apply(c,tags);}return newString;};String.prototype.hasTags=function(){var c,found,strict,tags,_i,_j,_len,_ref;tags=2<=arguments.length?__slice.call(arguments,0,_i=arguments.length-1):(_i=0,[]),strict=arguments[_i++];if(!(typeof strict==='undefined'||typeof strict==='boolean')){tags.push(strict);strict=false;}found=false;_ref=this.characters;for(_j=0,_len=_ref.length;_j<_len;_j++){c=_ref[_j];if(c.hasTags.apply(c,tags)){found=true;}else {if(strict){return false;}}}return found;};String.prototype.html=function(){var c,closingTag,closingTags,head,html,openHeads,openTag,openTags,tag,_i,_j,_k,_l,_len,_len1,_len2,_len3,_len4,_m,_ref,_ref1,_ref2,_ref3;html='';openTags=[];openHeads=[];closingTags=[];_ref=this.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];closingTags=[];_ref1=openTags.slice().reverse();for(_j=0,_len1=_ref1.length;_j<_len1;_j++){openTag=_ref1[_j];closingTags.push(openTag);if(!c.hasTags(openTag)){for(_k=0,_len2=closingTags.length;_k<_len2;_k++){closingTag=closingTags[_k];html+=closingTag.tail();openTags.pop();openHeads.pop();}closingTags=[];}}_ref2=c._tags;for(_l=0,_len3=_ref2.length;_l<_len3;_l++){tag=_ref2[_l];if(openHeads.indexOf(tag.head())===-1){if(!tag.selfClosing()){head=tag.head();html+=head;openTags.push(tag);openHeads.push(head);}}}if(c._tags.length>0&&c._tags[0].selfClosing()){html+=c._tags[0].head();}html+=c.c();}_ref3=openTags.reverse();for(_m=0,_len4=_ref3.length;_m<_len4;_m++){tag=_ref3[_m];html+=tag.tail();}return html;};String.prototype.indexOf=function(substring,from){var c,found,i,_i,_len,_ref;if(from==null){from=0;}if(from<0){from=0;}if(typeof substring==='string'){return this.text().indexOf(substring,from);}while(from<=this.length()-substring.length()){found=true;_ref=substring.characters;for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){c=_ref[i];if(!c.eq(this.characters[i+from])){found=false;break;}}if(found){return from;}from++;}return -1;};String.prototype.insert=function(index,substring,inheritFormat){var c,head,indexChar,inheritedTags,middle,newString,tail,_i,_j,_k,_len,_len1,_len2,_ref,_ref1,_ref2;if(inheritFormat==null){inheritFormat=true;}head=this.slice(0,index);tail=this.slice(index);if(index<0){index=this.length()+index;}middle=substring;if(typeof substring==='string'){middle=new HTMLString.String(substring,this._preserveWhitespace);}if(inheritFormat&&index>0){indexChar=this.charAt(index-1);inheritedTags=indexChar.tags();if(indexChar.isTag()){inheritedTags.shift();}if(typeof substring!=='string'){middle=middle.copy();}_ref=middle.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];c.addTags.apply(c,inheritedTags);}}newString=head;_ref1=middle.characters;for(_j=0,_len1=_ref1.length;_j<_len1;_j++){c=_ref1[_j];newString.characters.push(c);}_ref2=tail.characters;for(_k=0,_len2=_ref2.length;_k<_len2;_k++){c=_ref2[_k];newString.characters.push(c);}return newString;};String.prototype.lastIndexOf=function(substring,from){var c,characters,found,i,skip,_i,_j,_len,_len1;if(from==null){from=0;}if(from<0){from=0;}characters=this.characters.slice(from).reverse();from=0;if(typeof substring==='string'){if(!this.contains(substring)){return -1;}substring=substring.split('').reverse();while(from<=characters.length-substring.length){found=true;skip=0;for(i=_i=0,_len=substring.length;_i<_len;i=++_i){c=substring[i];if(characters[i+from].isTag()){skip+=1;}if(c!==characters[skip+i+from].c()){found=false;break;}}if(found){return from;}from++;}return -1;}substring=substring.characters.slice().reverse();while(from<=characters.length-substring.length){found=true;for(i=_j=0,_len1=substring.length;_j<_len1;i=++_j){c=substring[i];if(!c.eq(characters[i+from])){found=false;break;}}if(found){return from;}from++;}return -1;};String.prototype.optimize=function(){var c,closingTag,closingTags,head,lastC,len,openHeads,openTag,openTags,runLength,runLengthSort,runLengths,run_length,t,tag,_i,_j,_k,_l,_len,_len1,_len2,_len3,_len4,_len5,_len6,_m,_n,_o,_ref,_ref1,_ref2,_ref3,_ref4,_ref5,_results;openTags=[];openHeads=[];lastC=null;_ref=this.characters.slice().reverse();for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];c._runLengthMap={};c._runLengthMapSize=0;closingTags=[];_ref1=openTags.slice().reverse();for(_j=0,_len1=_ref1.length;_j<_len1;_j++){openTag=_ref1[_j];closingTags.push(openTag);if(!c.hasTags(openTag)){for(_k=0,_len2=closingTags.length;_k<_len2;_k++){closingTag=closingTags[_k];openTags.pop();openHeads.pop();}closingTags=[];}}_ref2=c._tags;for(_l=0,_len3=_ref2.length;_l<_len3;_l++){tag=_ref2[_l];if(openHeads.indexOf(tag.head())===-1){if(!tag.selfClosing()){openTags.push(tag);openHeads.push(tag.head());}}}for(_m=0,_len4=openTags.length;_m<_len4;_m++){tag=openTags[_m];head=tag.head();if(!lastC){c._runLengthMap[head]=[tag,1];continue;}if(!c._runLengthMap[head]){c._runLengthMap[head]=[tag,0];}run_length=0;if(lastC._runLengthMap[head]){run_length=lastC._runLengthMap[head][1];}c._runLengthMap[head][1]=run_length+1;}lastC=c;}runLengthSort=function runLengthSort(a,b){return b[1]-a[1];};_ref3=this.characters;_results=[];for(_n=0,_len5=_ref3.length;_n<_len5;_n++){c=_ref3[_n];len=c._tags.length;if(len>0&&c._tags[0].selfClosing()&&len<3||len<2){continue;}runLengths=[];_ref4=c._runLengthMap;for(tag in _ref4){runLength=_ref4[tag];runLengths.push(runLength);}runLengths.sort(runLengthSort);_ref5=c._tags.slice();for(_o=0,_len6=_ref5.length;_o<_len6;_o++){tag=_ref5[_o];if(!tag.selfClosing()){c.removeTags(tag);}}_results.push(c.addTags.apply(c,function(){var _len7,_p,_results1;_results1=[];for(_p=0,_len7=runLengths.length;_p<_len7;_p++){t=runLengths[_p];_results1.push(t[0]);}return _results1;}()));}return _results;};String.prototype.slice=function(from,to){var c,newString;newString=new HTMLString.String('',this._preserveWhitespace);newString.characters=function(){var _i,_len,_ref,_results;_ref=this.characters.slice(from,to);_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c.copy());}return _results;}.call(this);return newString;};String.prototype.split=function(separator,limit){var count,i,index,indexes,lastIndex,substrings,_i,_ref;if(separator==null){separator='';}if(limit==null){limit=0;}lastIndex=0;count=0;indexes=[0];while(true){if(limit>0&&count>limit){break;}index=this.indexOf(separator,lastIndex);if(index===-1||index===this.length()-1){break;}indexes.push(index);lastIndex=index+1;}indexes.push(this.length());substrings=[];for(i=_i=0,_ref=indexes.length-2;0<=_ref?_i<=_ref:_i>=_ref;i=0<=_ref?++_i:--_i){substrings.push(this.slice(indexes[i],indexes[i+1]));}return substrings;};String.prototype.startsWith=function(substring){var c,i,_i,_len,_ref;if(typeof substring==='string'){return this.text().slice(0,substring.length)===substring;}_ref=substring.characters;for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){c=_ref[i];if(!c.eq(this.characters[i])){return false;}}return true;};String.prototype.substr=function(from,length){if(length<=0){return new HTMLString.String('',this._preserveWhitespace);}if(from<0){from=this.length()+from;}if(length===void 0){length=this.length()-from;}return this.slice(from,from+length);};String.prototype.substring=function(from,to){if(to===void 0){to=this.length();}return this.slice(from,to);};String.prototype.text=function(){var c,text,_i,_len,_ref;text='';_ref=this.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];if(c.isTag()){if(c.isTag('br')){text+='\n';}continue;}if(c.c()==='&nbsp;'){text+=c.c();continue;}text+=c.c();}return this.constructor.decode(text);};String.prototype.toLowerCase=function(){var c,newString,_i,_len,_ref;newString=this.copy();_ref=newString.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];if(c._c.length===1){c._c=c._c.toLowerCase();}}return newString;};String.prototype.toUpperCase=function(){var c,newString,_i,_len,_ref;newString=this.copy();_ref=newString.characters;for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];if(c._c.length===1){c._c=c._c.toUpperCase();}}return newString;};String.prototype.trim=function(){var c,from,newString,to,_i,_j,_len,_len1,_ref,_ref1;_ref=this.characters;for(from=_i=0,_len=_ref.length;_i<_len;from=++_i){c=_ref[from];if(!c.isWhitespace()){break;}}_ref1=this.characters.slice().reverse();for(to=_j=0,_len1=_ref1.length;_j<_len1;to=++_j){c=_ref1[to];if(!c.isWhitespace()){break;}}to=this.length()-to-1;newString=new HTMLString.String('',this._preserveWhitespace);newString.characters=function(){var _k,_len2,_ref2,_results;_ref2=this.characters.slice(from,+to+1||9e9);_results=[];for(_k=0,_len2=_ref2.length;_k<_len2;_k++){c=_ref2[_k];_results.push(c.copy());}return _results;}.call(this);return newString;};String.prototype.trimLeft=function(){var c,from,newString,to,_i,_len,_ref;to=this.length()-1;_ref=this.characters;for(from=_i=0,_len=_ref.length;_i<_len;from=++_i){c=_ref[from];if(!c.isWhitespace()){break;}}newString=new HTMLString.String('',this._preserveWhitespace);newString.characters=function(){var _j,_len1,_ref1,_results;_ref1=this.characters.slice(from,+to+1||9e9);_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){c=_ref1[_j];_results.push(c.copy());}return _results;}.call(this);return newString;};String.prototype.trimRight=function(){var c,from,newString,to,_i,_len,_ref;from=0;_ref=this.characters.slice().reverse();for(to=_i=0,_len=_ref.length;_i<_len;to=++_i){c=_ref[to];if(!c.isWhitespace()){break;}}to=this.length()-to-1;newString=new HTMLString.String('',this._preserveWhitespace);newString.characters=function(){var _j,_len1,_ref1,_results;_ref1=this.characters.slice(from,+to+1||9e9);_results=[];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){c=_ref1[_j];_results.push(c.copy());}return _results;}.call(this);return newString;};String.prototype.unformat=function(){var c,from,i,newString,tags,to,_i;from=arguments[0],to=arguments[1],tags=3<=arguments.length?__slice.call(arguments,2):[];if(to<0){to=this.length()+to+1;}if(from<0){from=this.length()+from;}newString=this.copy();for(i=_i=from;from<=to?_i<to:_i>to;i=from<=to?++_i:--_i){c=newString.characters[i];c.removeTags.apply(c,tags);}return newString;};String.prototype.copy=function(){var c,stringCopy;stringCopy=new HTMLString.String('',this._preserveWhitespace);stringCopy.characters=function(){var _i,_len,_ref,_results;_ref=this.characters;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c.copy());}return _results;}.call(this);return stringCopy;};String.encode=function(string){var textarea;textarea=document.createElement('textarea');textarea.textContent=string;return textarea.innerHTML;};String.decode=function(string){var textarea;textarea=document.createElement('textarea');textarea.innerHTML=string;return textarea.textContent;};return String;}();ALPHA_CHARS='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz-_$'.split('');ALPHA_NUMERIC_CHARS=ALPHA_CHARS.concat('1234567890'.split(''));ATTR_NAME_CHARS=ALPHA_NUMERIC_CHARS.concat([':']);ENTITY_CHARS=ALPHA_NUMERIC_CHARS.concat(['#']);TAG_NAME_CHARS=ALPHA_NUMERIC_CHARS.concat([':']);CHAR_OR_ENTITY_OR_TAG=1;ENTITY=2;OPENNING_OR_CLOSING_TAG=3;OPENING_TAG=4;CLOSING_TAG=5;TAG_NAME_OPENING=6;TAG_NAME_CLOSING=7;TAG_OPENING_SELF_CLOSING=8;TAG_NAME_MUST_CLOSE=9;ATTR_OR_TAG_END=10;ATTR_NAME=11;ATTR_NAME_FIND_VALUE=12;ATTR_DELIM=13;ATTR_VALUE_SINGLE_DELIM=14;ATTR_VALUE_DOUBLE_DELIM=15;ATTR_VALUE_NO_DELIM=16;ATTR_ENTITY_NO_DELIM=17;ATTR_ENTITY_SINGLE_DELIM=18;ATTR_ENTITY_DOUBLE_DELIM=19;_Parser=function(){function _Parser(){this.fsm=new FSM.Machine(this);this.fsm.setInitialState(CHAR_OR_ENTITY_OR_TAG);this.fsm.addTransitionAny(CHAR_OR_ENTITY_OR_TAG,null,function(c){return this._pushChar(c);});this.fsm.addTransition('<',CHAR_OR_ENTITY_OR_TAG,OPENNING_OR_CLOSING_TAG);this.fsm.addTransition('&',CHAR_OR_ENTITY_OR_TAG,ENTITY);this.fsm.addTransitions(ENTITY_CHARS,ENTITY,null,function(c){return this.entity+=c;});this.fsm.addTransition(';',ENTITY,CHAR_OR_ENTITY_OR_TAG,function(){this._pushChar("&"+this.entity+";");return this.entity='';});this.fsm.addTransitions([' ','\n'],OPENNING_OR_CLOSING_TAG);this.fsm.addTransitions(ALPHA_CHARS,OPENNING_OR_CLOSING_TAG,OPENING_TAG,function(){return this._back();});this.fsm.addTransition('/',OPENNING_OR_CLOSING_TAG,CLOSING_TAG);this.fsm.addTransitions([' ','\n'],OPENING_TAG);this.fsm.addTransitions(ALPHA_CHARS,OPENING_TAG,TAG_NAME_OPENING,function(){return this._back();});this.fsm.addTransitions([' ','\n'],CLOSING_TAG);this.fsm.addTransitions(ALPHA_CHARS,CLOSING_TAG,TAG_NAME_CLOSING,function(){return this._back();});this.fsm.addTransitions(TAG_NAME_CHARS,TAG_NAME_OPENING,null,function(c){return this.tagName+=c;});this.fsm.addTransitions([' ','\n'],TAG_NAME_OPENING,ATTR_OR_TAG_END);this.fsm.addTransition('/',TAG_NAME_OPENING,TAG_OPENING_SELF_CLOSING,function(){return this.selfClosing=true;});this.fsm.addTransition('>',TAG_NAME_OPENING,CHAR_OR_ENTITY_OR_TAG,function(){return this._pushTag();});this.fsm.addTransitions([' ','\n'],TAG_OPENING_SELF_CLOSING);this.fsm.addTransition('>',TAG_OPENING_SELF_CLOSING,CHAR_OR_ENTITY_OR_TAG,function(){return this._pushTag();});this.fsm.addTransitions([' ','\n'],ATTR_OR_TAG_END);this.fsm.addTransition('/',ATTR_OR_TAG_END,TAG_OPENING_SELF_CLOSING,function(){return this.selfClosing=true;});this.fsm.addTransition('>',ATTR_OR_TAG_END,CHAR_OR_ENTITY_OR_TAG,function(){return this._pushTag();});this.fsm.addTransitions(ALPHA_CHARS,ATTR_OR_TAG_END,ATTR_NAME,function(){return this._back();});this.fsm.addTransitions(TAG_NAME_CHARS,TAG_NAME_CLOSING,null,function(c){return this.tagName+=c;});this.fsm.addTransitions([' ','\n'],TAG_NAME_CLOSING,TAG_NAME_MUST_CLOSE);this.fsm.addTransition('>',TAG_NAME_CLOSING,CHAR_OR_ENTITY_OR_TAG,function(){return this._popTag();});this.fsm.addTransitions([' ','\n'],TAG_NAME_MUST_CLOSE);this.fsm.addTransition('>',TAG_NAME_MUST_CLOSE,CHAR_OR_ENTITY_OR_TAG,function(){return this._popTag();});this.fsm.addTransitions(ATTR_NAME_CHARS,ATTR_NAME,null,function(c){return this.attributeName+=c;});this.fsm.addTransitions([' ','\n'],ATTR_NAME,ATTR_NAME_FIND_VALUE);this.fsm.addTransition('=',ATTR_NAME,ATTR_DELIM);this.fsm.addTransitions([' ','\n'],ATTR_NAME_FIND_VALUE);this.fsm.addTransition('=',ATTR_NAME_FIND_VALUE,ATTR_DELIM);this.fsm.addTransitions('>',ATTR_NAME,ATTR_OR_TAG_END,function(){this._pushAttribute();return this._back();});this.fsm.addTransitionAny(ATTR_NAME_FIND_VALUE,ATTR_OR_TAG_END,function(){this._pushAttribute();return this._back();});this.fsm.addTransitions([' ','\n'],ATTR_DELIM);this.fsm.addTransition('\'',ATTR_DELIM,ATTR_VALUE_SINGLE_DELIM);this.fsm.addTransition('"',ATTR_DELIM,ATTR_VALUE_DOUBLE_DELIM);this.fsm.addTransitions(ALPHA_NUMERIC_CHARS.concat(['&'],ATTR_DELIM,ATTR_VALUE_NO_DELIM,function(){return this._back();}));this.fsm.addTransition(' ',ATTR_VALUE_NO_DELIM,ATTR_OR_TAG_END,function(){return this._pushAttribute();});this.fsm.addTransitions(['/','>'],ATTR_VALUE_NO_DELIM,ATTR_OR_TAG_END,function(){this._back();return this._pushAttribute();});this.fsm.addTransition('&',ATTR_VALUE_NO_DELIM,ATTR_ENTITY_NO_DELIM);this.fsm.addTransitionAny(ATTR_VALUE_NO_DELIM,null,function(c){return this.attributeValue+=c;});this.fsm.addTransition('\'',ATTR_VALUE_SINGLE_DELIM,ATTR_OR_TAG_END,function(){return this._pushAttribute();});this.fsm.addTransition('&',ATTR_VALUE_SINGLE_DELIM,ATTR_ENTITY_SINGLE_DELIM);this.fsm.addTransitionAny(ATTR_VALUE_SINGLE_DELIM,null,function(c){return this.attributeValue+=c;});this.fsm.addTransition('"',ATTR_VALUE_DOUBLE_DELIM,ATTR_OR_TAG_END,function(){return this._pushAttribute();});this.fsm.addTransition('&',ATTR_VALUE_DOUBLE_DELIM,ATTR_ENTITY_DOUBLE_DELIM);this.fsm.addTransitionAny(ATTR_VALUE_DOUBLE_DELIM,null,function(c){return this.attributeValue+=c;});this.fsm.addTransitions(ENTITY_CHARS,ATTR_ENTITY_NO_DELIM,null,function(c){return this.entity+=c;});this.fsm.addTransitions(ENTITY_CHARS,ATTR_ENTITY_SINGLE_DELIM,function(c){return this.entity+=c;});this.fsm.addTransitions(ENTITY_CHARS,ATTR_ENTITY_DOUBLE_DELIM,null,function(c){return this.entity+=c;});this.fsm.addTransition(';',ATTR_ENTITY_NO_DELIM,ATTR_VALUE_NO_DELIM,function(){this.attributeValue+="&"+this.entity+";";return this.entity='';});this.fsm.addTransition(';',ATTR_ENTITY_SINGLE_DELIM,ATTR_VALUE_SINGLE_DELIM,function(){this.attributeValue+="&"+this.entity+";";return this.entity='';});this.fsm.addTransition(';',ATTR_ENTITY_DOUBLE_DELIM,ATTR_VALUE_DOUBLE_DELIM,function(){this.attributeValue+="&"+this.entity+";";return this.entity='';});}_Parser.prototype._back=function(){return this.head--;};_Parser.prototype._pushAttribute=function(){this.attributes[this.attributeName]=this.attributeValue;this.attributeName='';return this.attributeValue='';};_Parser.prototype._pushChar=function(c){var character,lastCharacter;character=new HTMLString.Character(c,this.tags);if(this._preserveWhitespace){this.string.characters.push(character);return;}if(this.string.length()&&!character.isTag()&&!character.isEntity()&&character.isWhitespace()){lastCharacter=this.string.characters[this.string.length()-1];if(lastCharacter.isWhitespace()&&!lastCharacter.isTag()&&!lastCharacter.isEntity()){return;}}return this.string.characters.push(character);};_Parser.prototype._pushTag=function(){var tag,_ref;tag=new HTMLString.Tag(this.tagName,this.attributes);this.tags.push(tag);if(tag.selfClosing()){this._pushChar('');this.tags.pop();if(!this.selfClosed&&(_ref=this.tagName,__indexOf.call(HTMLString.Tag.SELF_CLOSING,_ref)>=0)){this.fsm.reset();}}this.tagName='';this.selfClosed=false;return this.attributes={};};_Parser.prototype._popTag=function(){var character,tag;while(true){tag=this.tags.pop();if(this.string.length()){character=this.string.characters[this.string.length()-1];if(!character.isTag()&&!character.isEntity()&&character.isWhitespace()){character.removeTags(tag);}}if(tag.name()===this.tagName.toLowerCase()){break;}}return this.tagName='';};_Parser.prototype.parse=function(html,preserveWhitespace){var character,error;this._preserveWhitespace=preserveWhitespace;this.reset();html=this.preprocess(html);this.fsm.parser=this;while(this.head<html.length){character=html[this.head];try{this.fsm.process(character);}catch(_error){error=_error;throw new Error("Error at char "+this.head+" >> "+error);}this.head++;}return this.string;};_Parser.prototype.preprocess=function(html){html=html.replace(/\r\n/g,'\n').replace(/\r/g,'\n');html=html.replace(/<!--[\s\S]*?-->/g,'');if(!this._preserveWhitespace){html=html.replace(/\s+/g,' ');}return html;};_Parser.prototype.reset=function(){this.fsm.reset();this.head=0;this.string=new HTMLString.String();this.entity='';this.tags=[];this.tagName='';this.selfClosing=false;this.attributes={};this.attributeName='';return this.attributeValue='';};return _Parser;}();HTMLString.Tag=function(){function Tag(name,attributes){var k,v;this._name=name.toLowerCase();this._selfClosing=HTMLString.Tag.SELF_CLOSING[this._name]===true;this._head=null;this._attributes={};for(k in attributes){v=attributes[k];this._attributes[k]=v;}}Tag.SELF_CLOSING={'area':true,'base':true,'br':true,'hr':true,'img':true,'input':true,'link meta':true,'wbr':true};Tag.prototype.head=function(){var components,k,v,_ref;if(!this._head){components=[];_ref=this._attributes;for(k in _ref){v=_ref[k];if(v){components.push(""+k+"=\""+v+"\"");}else {components.push(""+k);}}components.sort();components.unshift(this._name);this._head="<"+components.join(' ')+">";}return this._head;};Tag.prototype.name=function(){return this._name;};Tag.prototype.selfClosing=function(){return this._selfClosing;};Tag.prototype.tail=function(){if(this._selfClosing){return '';}return "</"+this._name+">";};Tag.prototype.attr=function(name,value){if(value===void 0){return this._attributes[name];}this._attributes[name]=value;return this._head=null;};Tag.prototype.removeAttr=function(name){if(this._attributes[name]===void 0){return;}return delete this._attributes[name];};Tag.prototype.copy=function(){return new HTMLString.Tag(this._name,this._attributes);};return Tag;}();HTMLString.Character=function(){function Character(c,tags){this._c=c;if(c.length>1){this._c=c.toLowerCase();}this._tags=[];this.addTags.apply(this,tags);}Character.prototype.c=function(){return this._c;};Character.prototype.isEntity=function(){return this._c.length>1;};Character.prototype.isTag=function(tagName){if(this._tags.length===0||!this._tags[0].selfClosing()){return false;}if(tagName&&this._tags[0].name()!==tagName){return false;}return true;};Character.prototype.isWhitespace=function(){var _ref;return (_ref=this._c)===' '||_ref==='\n'||_ref==='&nbsp;'||this.isTag('br');};Character.prototype.tags=function(){var t;return function(){var _i,_len,_ref,_results;_ref=this._tags;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){t=_ref[_i];_results.push(t.copy());}return _results;}.call(this);};Character.prototype.addTags=function(){var tag,tags,_i,_len,_results;tags=1<=arguments.length?__slice.call(arguments,0):[];_results=[];for(_i=0,_len=tags.length;_i<_len;_i++){tag=tags[_i];if(tag.selfClosing()){if(!this.isTag()){this._tags.unshift(tag.copy());}continue;}_results.push(this._tags.push(tag.copy()));}return _results;};Character.prototype.eq=function(c){var tag,tags,_i,_j,_len,_len1,_ref,_ref1;if(this.c()!==c.c()){return false;}if(this._tags.length!==c._tags.length){return false;}tags={};_ref=this._tags;for(_i=0,_len=_ref.length;_i<_len;_i++){tag=_ref[_i];tags[tag.head()]=true;}_ref1=c._tags;for(_j=0,_len1=_ref1.length;_j<_len1;_j++){tag=_ref1[_j];if(!tags[tag.head()]){return false;}}return true;};Character.prototype.hasTags=function(){var tag,tagHeads,tagNames,tags,_i,_j,_len,_len1,_ref;tags=1<=arguments.length?__slice.call(arguments,0):[];tagNames={};tagHeads={};_ref=this._tags;for(_i=0,_len=_ref.length;_i<_len;_i++){tag=_ref[_i];tagNames[tag.name()]=true;tagHeads[tag.head()]=true;}for(_j=0,_len1=tags.length;_j<_len1;_j++){tag=tags[_j];if(typeof tag==='string'){if(tagNames[tag]===void 0){return false;}}else {if(tagHeads[tag.head()]===void 0){return false;}}}return true;};Character.prototype.removeTags=function(){var heads,names,newTags,tag,tags,_i,_len;tags=1<=arguments.length?__slice.call(arguments,0):[];if(tags.length===0){this._tags=[];return;}names={};heads={};for(_i=0,_len=tags.length;_i<_len;_i++){tag=tags[_i];if(typeof tag==='string'){names[tag]=tag;}else {heads[tag.head()]=tag;}}newTags=[];return this._tags=this._tags.filter(function(tag){if(!heads[tag.head()]&&!names[tag.name()]){return tag;}});};Character.prototype.copy=function(){var t;return new HTMLString.Character(this._c,function(){var _i,_len,_ref,_results;_ref=this._tags;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){t=_ref[_i];_results.push(t.copy());}return _results;}.call(this));};return Character;}();}).call(undefined);(function(){var ContentSelect,SELF_CLOSING_NODE_NAMES,exports,_containedBy,_getChildNodeAndOffset,_getNodeRange,_getOffsetOfChildNode,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i;}return -1;};ContentSelect={};ContentSelect.Range=function(){function Range(from,to){this.set(from,to);}Range.prototype.isCollapsed=function(){return this._from===this._to;};Range.prototype.span=function(){return this._to-this._from;};Range.prototype.collapse=function(){return this._to=this._from;};Range.prototype.eq=function(range){return this.get()[0]===range.get()[0]&&this.get()[1]===range.get()[1];};Range.prototype.get=function(){return [this._from,this._to];};Range.prototype.select=function(element){var docRange,endNode,endNodeLen,endOffset,startNode,startNodeLen,startOffset,_ref,_ref1;ContentSelect.Range.unselectAll();docRange=document.createRange();_ref=_getChildNodeAndOffset(element,this._from),startNode=_ref[0],startOffset=_ref[1];_ref1=_getChildNodeAndOffset(element,this._to),endNode=_ref1[0],endOffset=_ref1[1];startNodeLen=startNode.length||0;endNodeLen=endNode.length||0;docRange.setStart(startNode,Math.min(startOffset,startNodeLen));docRange.setEnd(endNode,Math.min(endOffset,endNodeLen));return window.getSelection().addRange(docRange);};Range.prototype.set=function(from,to){from=Math.max(0,from);to=Math.max(0,to);this._from=Math.min(from,to);return this._to=Math.max(from,to);};Range.prepareElement=function(element){var i,node,selfClosingNodes,_i,_len,_results;selfClosingNodes=element.querySelectorAll(SELF_CLOSING_NODE_NAMES.join(', '));_results=[];for(i=_i=0,_len=selfClosingNodes.length;_i<_len;i=++_i){node=selfClosingNodes[i];node.parentNode.insertBefore(document.createTextNode(''),node);if(i<selfClosingNodes.length-1){_results.push(node.parentNode.insertBefore(document.createTextNode(''),node.nextSibling));}else {_results.push(void 0);}}return _results;};Range.query=function(element){var docRange,endNode,endOffset,range,startNode,startOffset,_ref;range=new ContentSelect.Range(0,0);try{docRange=window.getSelection().getRangeAt(0);}catch(_error){return range;}if(element.firstChild===null&&element.lastChild===null){return range;}if(!_containedBy(docRange.startContainer,element)){return range;}if(!_containedBy(docRange.endContainer,element)){return range;}_ref=_getNodeRange(element,docRange),startNode=_ref[0],startOffset=_ref[1],endNode=_ref[2],endOffset=_ref[3];range.set(_getOffsetOfChildNode(element,startNode)+startOffset,_getOffsetOfChildNode(element,endNode)+endOffset);return range;};Range.rect=function(){var docRange,marker,rect;try{docRange=window.getSelection().getRangeAt(0);}catch(_error){return null;}if(docRange.collapsed){marker=document.createElement('span');docRange.insertNode(marker);rect=marker.getBoundingClientRect();marker.parentNode.removeChild(marker);return rect;}else {return docRange.getBoundingClientRect();}};Range.unselectAll=function(){if(window.getSelection()){return window.getSelection().removeAllRanges();}};return Range;}();SELF_CLOSING_NODE_NAMES=['br','img','input'];_containedBy=function _containedBy(nodeA,nodeB){while(nodeA){if(nodeA===nodeB){return true;}nodeA=nodeA.parentNode;}return false;};_getChildNodeAndOffset=function _getChildNodeAndOffset(parentNode,parentOffset){var childNode,childOffset,childStack,n,_ref;if(parentNode.childNodes.length===0){return [parentNode,parentOffset];}childNode=null;childOffset=parentOffset;childStack=function(){var _i,_len,_ref,_results;_ref=parentNode.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){n=_ref[_i];_results.push(n);}return _results;}();while(childStack.length>0){childNode=childStack.shift();switch(childNode.nodeType){case Node.TEXT_NODE:if(childNode.textContent.length>=childOffset){return [childNode,childOffset];}childOffset-=childNode.textContent.length;break;case Node.ELEMENT_NODE:if(_ref=childNode.nodeName.toLowerCase(),__indexOf.call(SELF_CLOSING_NODE_NAMES,_ref)>=0){if(childOffset===0){return [childNode,0];}else {childOffset=Math.max(0,childOffset-1);}}else {if(childNode.childNodes){Array.prototype.unshift.apply(childStack,function(){var _i,_len,_ref1,_results;_ref1=childNode.childNodes;_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){n=_ref1[_i];_results.push(n);}return _results;}());}}}}return [childNode,childOffset];};_getOffsetOfChildNode=function _getOffsetOfChildNode(parentNode,childNode){var childStack,n,offset,otherChildNode,_ref,_ref1;if(parentNode.childNodes.length===0){return 0;}offset=0;childStack=function(){var _i,_len,_ref,_results;_ref=parentNode.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){n=_ref[_i];_results.push(n);}return _results;}();while(childStack.length>0){otherChildNode=childStack.shift();if(otherChildNode===childNode){if(_ref=otherChildNode.nodeName.toLowerCase(),__indexOf.call(SELF_CLOSING_NODE_NAMES,_ref)>=0){return offset+1;}return offset;}switch(otherChildNode.nodeType){case Node.TEXT_NODE:offset+=otherChildNode.textContent.length;break;case Node.ELEMENT_NODE:if(_ref1=otherChildNode.nodeName.toLowerCase(),__indexOf.call(SELF_CLOSING_NODE_NAMES,_ref1)>=0){offset+=1;}else {if(otherChildNode.childNodes){Array.prototype.unshift.apply(childStack,function(){var _i,_len,_ref2,_results;_ref2=otherChildNode.childNodes;_results=[];for(_i=0,_len=_ref2.length;_i<_len;_i++){n=_ref2[_i];_results.push(n);}return _results;}());}}}}return offset;};_getNodeRange=function _getNodeRange(element,docRange){var childNode,childNodes,endNode,endOffset,endRange,i,startNode,startOffset,startRange,_i,_j,_len,_len1,_ref;childNodes=element.childNodes;startRange=docRange.cloneRange();startRange.collapse(true);endRange=docRange.cloneRange();endRange.collapse(false);startNode=startRange.startContainer;startOffset=startRange.startOffset;endNode=endRange.endContainer;endOffset=endRange.endOffset;if(!startRange.comparePoint){return [startNode,startOffset,endNode,endOffset];}if(startNode===element){startNode=childNodes[childNodes.length-1];startOffset=startNode.textContent.length;for(i=_i=0,_len=childNodes.length;_i<_len;i=++_i){childNode=childNodes[i];if(startRange.comparePoint(childNode,0)!==1){continue;}if(i===0){startNode=childNode;startOffset=0;}else {startNode=childNodes[i-1];startOffset=childNode.textContent.length;}if(_ref=startNode.nodeName.toLowerCase,__indexOf.call(SELF_CLOSING_NODE_NAMES,_ref)>=0){startOffset=1;}break;}}if(docRange.collapsed){return [startNode,startOffset,startNode,startOffset];}if(endNode===element){endNode=childNodes[childNodes.length-1];endOffset=endNode.textContent.length;for(i=_j=0,_len1=childNodes.length;_j<_len1;i=++_j){childNode=childNodes[i];if(endRange.comparePoint(childNode,0)!==1){continue;}if(i===0){endNode=childNode;}else {endNode=childNodes[i-1];}endOffset=childNode.textContent.length+1;}}return [startNode,startOffset,endNode,endOffset];};if(typeof window!=='undefined'){window.ContentSelect=ContentSelect;}if(typeof module!=='undefined'&&module.exports){exports=module.exports=ContentSelect;}}).call(undefined);(function(){var ContentEdit,exports,_Root,_TagNames,_mergers,__slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i;}return -1;},__hasProp={}.hasOwnProperty,__extends=function __extends(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key];}function ctor(){this.constructor=child;}ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;},__bind=function __bind(fn,me){return function(){return fn.apply(me,arguments);};};ContentEdit={ALIGNMENT_CLASS_NAMES:{'left':'align-left','right':'align-right'},DEFAULT_MAX_ELEMENT_WIDTH:800,DEFAULT_MIN_ELEMENT_WIDTH:80,DRAG_HOLD_DURATION:500,DROP_EDGE_SIZE:50,HELPER_CHAR_LIMIT:250,INDENT:'    ',LANGUAGE:'en',PREFER_LINE_BREAKS:false,RESIZE_CORNER_SIZE:15,_translations:{},_:function _(s){var lang;lang=ContentEdit.LANGUAGE;if(ContentEdit._translations[lang]&&ContentEdit._translations[lang][s]){return ContentEdit._translations[lang][s];}return s;},addTranslations:function addTranslations(language,translations){return ContentEdit._translations[language]=translations;},addCSSClass:function addCSSClass(domElement,className){var c,classAttr,classNames;if(domElement.classList){domElement.classList.add(className);return;}classAttr=domElement.getAttribute('class');if(classAttr){classNames=function(){var _i,_len,_ref,_results;_ref=classAttr.split(' ');_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();if(classNames.indexOf(className)===-1){return domElement.setAttribute('class',""+classAttr+" "+className);}}else {return domElement.setAttribute('class',className);}},attributesToString:function attributesToString(attributes){var attributeStrings,name,names,value,_i,_len;if(!attributes){return '';}names=function(){var _results;_results=[];for(name in attributes){_results.push(name);}return _results;}();names.sort();attributeStrings=[];for(_i=0,_len=names.length;_i<_len;_i++){name=names[_i];value=attributes[name];if(value===''){attributeStrings.push(name);}else {value=HTMLString.String.encode(value);value=value.replace(/"/g,'&quot;');attributeStrings.push(""+name+"=\""+value+"\"");}}return attributeStrings.join(' ');},removeCSSClass:function removeCSSClass(domElement,className){var c,classAttr,classNameIndex,classNames;if(domElement.classList){domElement.classList.remove(className);if(domElement.classList.length===0){domElement.removeAttribute('class');}return;}classAttr=domElement.getAttribute('class');if(classAttr){classNames=function(){var _i,_len,_ref,_results;_ref=classAttr.split(' ');_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();classNameIndex=classNames.indexOf(className);if(classNameIndex>-1){classNames.splice(classNameIndex,1);if(classNames.length){return domElement.setAttribute('class',classNames.join(' '));}else {return domElement.removeAttribute('class');}}}}};if(typeof window!=='undefined'){window.ContentEdit=ContentEdit;}if(typeof module!=='undefined'&&module.exports){exports=module.exports=ContentEdit;}_TagNames=function(){function _TagNames(){this._tagNames={};}_TagNames.prototype.register=function(){var cls,tagName,tagNames,_i,_len,_results;cls=arguments[0],tagNames=2<=arguments.length?__slice.call(arguments,1):[];_results=[];for(_i=0,_len=tagNames.length;_i<_len;_i++){tagName=tagNames[_i];_results.push(this._tagNames[tagName.toLowerCase()]=cls);}return _results;};_TagNames.prototype.match=function(tagName){if(this._tagNames[tagName.toLowerCase()]){return this._tagNames[tagName.toLowerCase()];}return ContentEdit.Static;};return _TagNames;}();ContentEdit.TagNames=function(){var instance;function TagNames(){}instance=null;TagNames.get=function(){return instance!=null?instance:instance=new _TagNames();};return TagNames;}();ContentEdit.Node=function(){function Node(){this._bindings={};this._parent=null;this._modified=null;}Node.prototype.lastModified=function(){return this._modified;};Node.prototype.parent=function(){return this._parent;};Node.prototype.parents=function(){var parent,parents;parents=[];parent=this._parent;while(parent){parents.push(parent);parent=parent._parent;}return parents;};Node.prototype.type=function(){return 'Node';};Node.prototype.html=function(indent){if(indent==null){indent='';}throw new Error('`html` not implemented');};Node.prototype.bind=function(eventName,callback){if(this._bindings[eventName]===void 0){this._bindings[eventName]=[];}this._bindings[eventName].push(callback);return callback;};Node.prototype.trigger=function(){var args,callback,eventName,_i,_len,_ref,_results;eventName=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[];if(!this._bindings[eventName]){return;}_ref=this._bindings[eventName];_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){callback=_ref[_i];if(!callback){continue;}_results.push(callback.call.apply(callback,[this].concat(__slice.call(args))));}return _results;};Node.prototype.unbind=function(eventName,callback){var i,suspect,_i,_len,_ref,_results;if(!eventName){this._bindings={};return;}if(!callback){this._bindings[eventName]=void 0;return;}if(!this._bindings[eventName]){return;}_ref=this._bindings[eventName];_results=[];for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){suspect=_ref[i];if(suspect===callback){_results.push(this._bindings[eventName].splice(i,1));}else {_results.push(void 0);}}return _results;};Node.prototype.commit=function(){this._modified=null;return ContentEdit.Root.get().trigger('commit',this);};Node.prototype.taint=function(){var now,parent,root,_i,_len,_ref;now=Date.now();this._modified=now;_ref=this.parents();for(_i=0,_len=_ref.length;_i<_len;_i++){parent=_ref[_i];parent._modified=now;}root=ContentEdit.Root.get();root._modified=now;return root.trigger('taint',this);};Node.prototype.closest=function(testFunc){var parent;parent=this.parent();while(parent&&!testFunc(parent)){if(parent.parent){parent=parent.parent();}else {parent=null;}}return parent;};Node.prototype.next=function(){var children,index,node,_i,_len,_ref;if(this.children&&this.children.length>0){return this.children[0];}_ref=[this].concat(this.parents());for(_i=0,_len=_ref.length;_i<_len;_i++){node=_ref[_i];if(!node.parent()){return null;}children=node.parent().children;index=children.indexOf(node);if(index<children.length-1){return children[index+1];}}};Node.prototype.nextContent=function(){return this.nextWithTest(function(node){return node.content!==void 0;});};Node.prototype.nextSibling=function(){var index;index=this.parent().children.indexOf(this);if(index===this.parent().children.length-1){return null;}return this.parent().children[index+1];};Node.prototype.nextWithTest=function(testFunc){var node;node=this;while(node){node=node.next();if(node&&testFunc(node)){return node;}}};Node.prototype.previous=function(){var children,node;if(!this.parent()){return null;}children=this.parent().children;if(children[0]===this){return this.parent();}node=children[children.indexOf(this)-1];while(node.children&&node.children.length){node=node.children[node.children.length-1];}return node;};Node.prototype.previousContent=function(){var node;return node=this.previousWithTest(function(node){return node.content!==void 0;});};Node.prototype.previousSibling=function(){var index;index=this.parent().children.indexOf(this);if(index===0){return null;}return this.parent().children[index-1];};Node.prototype.previousWithTest=function(testFunc){var node;node=this;while(node){node=node.previous();if(node&&testFunc(node)){return node;}}};Node.extend=function(cls){var key,value,_ref;_ref=cls.prototype;for(key in _ref){value=_ref[key];if(key==='constructor'){continue;}this.prototype[key]=value;}for(key in cls){value=cls[key];if(__indexOf.call('__super__',key)>=0){continue;}this.prototype[key]=value;}return this;};Node.fromDOMElement=function(domElement){throw new Error('`fromDOMElement` not implemented');};return Node;}();ContentEdit.NodeCollection=function(_super){__extends(NodeCollection,_super);function NodeCollection(){NodeCollection.__super__.constructor.call(this);this.children=[];}NodeCollection.prototype.descendants=function(){var descendants,node,nodeStack;descendants=[];nodeStack=this.children.slice();while(nodeStack.length>0){node=nodeStack.shift();descendants.push(node);if(node.children&&node.children.length>0){nodeStack=node.children.slice().concat(nodeStack);}}return descendants;};NodeCollection.prototype.isMounted=function(){return false;};NodeCollection.prototype.type=function(){return 'NodeCollection';};NodeCollection.prototype.attach=function(node,index){if(node.parent()){node.parent().detach(node);}node._parent=this;if(index!==void 0){this.children.splice(index,0,node);}else {this.children.push(node);}if(node.mount&&this.isMounted()){node.mount();}this.taint();return ContentEdit.Root.get().trigger('attach',this,node);};NodeCollection.prototype.commit=function(){var descendant,_i,_len,_ref;_ref=this.descendants();for(_i=0,_len=_ref.length;_i<_len;_i++){descendant=_ref[_i];descendant._modified=null;}this._modified=null;return ContentEdit.Root.get().trigger('commit',this);};NodeCollection.prototype.detach=function(node){var nodeIndex;nodeIndex=this.children.indexOf(node);if(nodeIndex===-1){return;}if(node.unmount&&this.isMounted()&&node.isMounted()){node.unmount();}this.children.splice(nodeIndex,1);node._parent=null;this.taint();return ContentEdit.Root.get().trigger('detach',this,node);};return NodeCollection;}(ContentEdit.Node);ContentEdit.Element=function(_super){__extends(Element,_super);function Element(tagName,attributes){Element.__super__.constructor.call(this);this._tagName=tagName.toLowerCase();this._attributes=attributes?attributes:{};this._domElement=null;this._behaviours={drag:true,drop:true,merge:true,remove:true,resize:true,spawn:true};}Element.prototype.attributes=function(){var attributes,name,value,_ref;attributes={};_ref=this._attributes;for(name in _ref){value=_ref[name];attributes[name]=value;}return attributes;};Element.prototype.cssTypeName=function(){return 'element';};Element.prototype.domElement=function(){return this._domElement;};Element.prototype.isFixed=function(){return this.parent()&&this.parent().type()==='Fixture';};Element.prototype.isFocused=function(){return ContentEdit.Root.get().focused()===this;};Element.prototype.isMounted=function(){return this._domElement!==null;};Element.prototype.type=function(){return 'Element';};Element.prototype.typeName=function(){return 'Element';};Element.prototype.addCSSClass=function(className){var modified;modified=false;if(!this.hasCSSClass(className)){modified=true;if(this.attr('class')){this.attr('class',""+this.attr('class')+" "+className);}else {this.attr('class',className);}}this._addCSSClass(className);if(modified){return this.taint();}};Element.prototype.attr=function(name,value){name=name.toLowerCase();if(value===void 0){return this._attributes[name];}this._attributes[name]=value;if(this.isMounted()&&name.toLowerCase()!=='class'){this._domElement.setAttribute(name,value);}return this.taint();};Element.prototype.blur=function(){var root;root=ContentEdit.Root.get();if(this.isFocused()){this._removeCSSClass('ce-element--focused');root._focused=null;return root.trigger('blur',this);}};Element.prototype.can=function(behaviour,allowed){if(allowed===void 0){return !this.isFixed()&&this._behaviours[behaviour];}return this._behaviours[behaviour]=allowed;};Element.prototype.createDraggingDOMElement=function(){var helper;if(!this.isMounted()){return;}helper=document.createElement('div');helper.setAttribute('class',"ce-drag-helper ce-drag-helper--type-"+this.cssTypeName());helper.setAttribute('data-ce-type',ContentEdit._(this.typeName()));return helper;};Element.prototype.drag=function(x,y){var root;if(!(this.isMounted()&&this.can('drag'))){return;}root=ContentEdit.Root.get();root.startDragging(this,x,y);return root.trigger('drag',this);};Element.prototype.drop=function(element,placement){var root;if(!this.can('drop')){return;}root=ContentEdit.Root.get();if(element){element._removeCSSClass('ce-element--drop');element._removeCSSClass("ce-element--drop-"+placement[0]);element._removeCSSClass("ce-element--drop-"+placement[1]);if(this.constructor.droppers[element.type()]){this.constructor.droppers[element.type()](this,element,placement);root.trigger('drop',this,element,placement);return;}else if(element.constructor.droppers[this.type()]){element.constructor.droppers[this.type()](this,element,placement);root.trigger('drop',this,element,placement);return;}}return root.trigger('drop',this,null,null);};Element.prototype.focus=function(supressDOMFocus){var root;root=ContentEdit.Root.get();if(this.isFocused()){return;}if(root.focused()){root.focused().blur();}this._addCSSClass('ce-element--focused');root._focused=this;if(this.isMounted()&&!supressDOMFocus){this.domElement().focus();}return root.trigger('focus',this);};Element.prototype.hasCSSClass=function(className){var c,classNames;if(this.attr('class')){classNames=function(){var _i,_len,_ref,_results;_ref=this.attr('class').split(' ');_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}.call(this);if(classNames.indexOf(className)>-1){return true;}}return false;};Element.prototype.merge=function(element){if(!(this.can('merge')&&this.can('remove'))){return false;}if(this.constructor.mergers[element.type()]){return this.constructor.mergers[element.type()](element,this);}else if(element.constructor.mergers[this.type()]){return element.constructor.mergers[this.type()](element,this);}};Element.prototype.mount=function(){var sibling;if(!this._domElement){this._domElement=document.createElement(this.tagName());}sibling=this.nextSibling();if(sibling){this.parent().domElement().insertBefore(this._domElement,sibling.domElement());}else {if(this.isFixed()){this.parent().domElement().parentNode.replaceChild(this._domElement,this.parent().domElement());this.parent()._domElement=this._domElement;}else {this.parent().domElement().appendChild(this._domElement);}}this._addDOMEventListeners();this._addCSSClass('ce-element');this._addCSSClass("ce-element--type-"+this.cssTypeName());if(this.isFocused()){this._addCSSClass('ce-element--focused');}return ContentEdit.Root.get().trigger('mount',this);};Element.prototype.removeAttr=function(name){name=name.toLowerCase();if(!this._attributes[name]){return;}delete this._attributes[name];if(this.isMounted()&&name.toLowerCase()!=='class'){this._domElement.removeAttribute(name);}return this.taint();};Element.prototype.removeCSSClass=function(className){var c,classNameIndex,classNames;if(!this.hasCSSClass(className)){return;}classNames=function(){var _i,_len,_ref,_results;_ref=this.attr('class').split(' ');_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}.call(this);classNameIndex=classNames.indexOf(className);if(classNameIndex>-1){classNames.splice(classNameIndex,1);}if(classNames.length){this.attr('class',classNames.join(' '));}else {this.removeAttr('class');}this._removeCSSClass(className);return this.taint();};Element.prototype.tagName=function(name){if(name===void 0){return this._tagName;}this._tagName=name.toLowerCase();if(this.isMounted()){this.unmount();this.mount();}return this.taint();};Element.prototype.unmount=function(){this._removeDOMEventListeners();if(this.isFixed()){this._removeCSSClass('ce-element');this._removeCSSClass("ce-element--type-"+this.cssTypeName());this._removeCSSClass('ce-element--focused');return;}if(this._domElement.parentNode){this._domElement.parentNode.removeChild(this._domElement);}this._domElement=null;return ContentEdit.Root.get().trigger('unmount',this);};Element.prototype._addDOMEventListeners=function(){var eventHandler,eventName,_ref,_results;this._domEventHandlers={'dragstart':function(_this){return function(ev){return ev.preventDefault();};}(this),'focus':function(_this){return function(ev){return ev.preventDefault();};}(this),'keydown':function(_this){return function(ev){return _this._onKeyDown(ev);};}(this),'keyup':function(_this){return function(ev){return _this._onKeyUp(ev);};}(this),'mousedown':function(_this){return function(ev){if(ev.button===0){return _this._onMouseDown(ev);}};}(this),'mousemove':function(_this){return function(ev){return _this._onMouseMove(ev);};}(this),'mouseover':function(_this){return function(ev){return _this._onMouseOver(ev);};}(this),'mouseout':function(_this){return function(ev){return _this._onMouseOut(ev);};}(this),'mouseup':function(_this){return function(ev){if(ev.button===0){return _this._onMouseUp(ev);}};}(this),'dragover':function(_this){return function(ev){return ev.preventDefault();};}(this),'drop':function(_this){return function(ev){return _this._onNativeDrop(ev);};}(this),'paste':function(_this){return function(ev){return _this._onPaste(ev);};}(this)};_ref=this._domEventHandlers;_results=[];for(eventName in _ref){eventHandler=_ref[eventName];_results.push(this._domElement.addEventListener(eventName,eventHandler));}return _results;};Element.prototype._onKeyDown=function(ev){};Element.prototype._onKeyUp=function(ev){};Element.prototype._onMouseDown=function(ev){if(this.focus){return this.focus(true);}};Element.prototype._onMouseMove=function(ev){return this._onOver(ev);};Element.prototype._onMouseOver=function(ev){return this._onOver(ev);};Element.prototype._onMouseOut=function(ev){var dragging,root;this._removeCSSClass('ce-element--over');root=ContentEdit.Root.get();dragging=root.dragging();if(dragging){this._removeCSSClass('ce-element--drop');this._removeCSSClass('ce-element--drop-above');this._removeCSSClass('ce-element--drop-below');this._removeCSSClass('ce-element--drop-center');this._removeCSSClass('ce-element--drop-left');this._removeCSSClass('ce-element--drop-right');return root._dropTarget=null;}};Element.prototype._onMouseUp=function(ev){};Element.prototype._onNativeDrop=function(ev){ev.preventDefault();ev.stopPropagation();return ContentEdit.Root.get().trigger('native-drop',this,ev);};Element.prototype._onPaste=function(ev){ev.preventDefault();ev.stopPropagation();return ContentEdit.Root.get().trigger('paste',this,ev);};Element.prototype._onOver=function(ev){var dragging,root;this._addCSSClass('ce-element--over');root=ContentEdit.Root.get();dragging=root.dragging();if(!dragging){return;}if(dragging===this){return;}if(root._dropTarget){return;}if(!this.can('drop')){return;}if(!(this.constructor.droppers[dragging.type()]||dragging.constructor.droppers[this.type()])){return;}this._addCSSClass('ce-element--drop');return root._dropTarget=this;};Element.prototype._removeDOMEventListeners=function(){var eventHandler,eventName,_ref,_results;_ref=this._domEventHandlers;_results=[];for(eventName in _ref){eventHandler=_ref[eventName];_results.push(this._domElement.removeEventListener(eventName,eventHandler));}return _results;};Element.prototype._addCSSClass=function(className){if(!this.isMounted()){return;}return ContentEdit.addCSSClass(this._domElement,className);};Element.prototype._attributesToString=function(){if(!(Object.getOwnPropertyNames(this._attributes).length>0)){return '';}return ' '+ContentEdit.attributesToString(this._attributes);};Element.prototype._removeCSSClass=function(className){if(!this.isMounted()){return;}return ContentEdit.removeCSSClass(this._domElement,className);};Element.droppers={};Element.mergers={};Element.placements=['above','below'];Element.getDOMElementAttributes=function(domElement){var attribute,attributes,_i,_len,_ref;if(!domElement.hasAttributes()){return {};}attributes={};_ref=domElement.attributes;for(_i=0,_len=_ref.length;_i<_len;_i++){attribute=_ref[_i];attributes[attribute.name.toLowerCase()]=attribute.value;}return attributes;};Element._dropVert=function(element,target,placement){var insertIndex;element.parent().detach(element);insertIndex=target.parent().children.indexOf(target);if(placement[0]==='below'){insertIndex+=1;}return target.parent().attach(element,insertIndex);};Element._dropBoth=function(element,target,placement){var aClassNames,alignLeft,alignRight,className,insertIndex,_i,_len,_ref;element.parent().detach(element);insertIndex=target.parent().children.indexOf(target);if(placement[0]==='below'&&placement[1]==='center'){insertIndex+=1;}alignLeft=ContentEdit.ALIGNMENT_CLASS_NAMES['left'];alignRight=ContentEdit.ALIGNMENT_CLASS_NAMES['right'];if(element.a){element._removeCSSClass(alignLeft);element._removeCSSClass(alignRight);if(element.a['class']){aClassNames=[];_ref=element.a['class'].split(' ');for(_i=0,_len=_ref.length;_i<_len;_i++){className=_ref[_i];if(className===alignLeft||className===alignRight){continue;}aClassNames.push(className);}if(aClassNames.length){element.a['class']=aClassNames.join(' ');}else {delete element.a['class'];}}}else {element.removeCSSClass(alignLeft);element.removeCSSClass(alignRight);}if(placement[1]==='left'){if(element.a){if(element.a['class']){element.a['class']+=' '+alignLeft;}else {element.a['class']=alignLeft;}element._addCSSClass(alignLeft);}else {element.addCSSClass(alignLeft);}}if(placement[1]==='right'){if(element.a){if(element.a['class']){element.a['class']+=' '+alignRight;}else {element.a['class']=alignRight;}element._addCSSClass(alignRight);}else {element.addCSSClass(alignRight);}}return target.parent().attach(element,insertIndex);};return Element;}(ContentEdit.Node);ContentEdit.ElementCollection=function(_super){__extends(ElementCollection,_super);ElementCollection.extend(ContentEdit.NodeCollection);function ElementCollection(tagName,attributes){ElementCollection.__super__.constructor.call(this,tagName,attributes);ContentEdit.NodeCollection.prototype.constructor.call(this);}ElementCollection.prototype.cssTypeName=function(){return 'element-collection';};ElementCollection.prototype.isMounted=function(){return this._domElement!==null;};ElementCollection.prototype.type=function(){return 'ElementCollection';};ElementCollection.prototype.createDraggingDOMElement=function(){var helper,text;if(!this.isMounted()){return;}helper=ElementCollection.__super__.createDraggingDOMElement.call(this);text=this._domElement.textContent;if(text.length>ContentEdit.HELPER_CHAR_LIMIT){text=text.substr(0,ContentEdit.HELPER_CHAR_LIMIT);}helper.innerHTML=text;return helper;};ElementCollection.prototype.detach=function(element){ContentEdit.NodeCollection.prototype.detach.call(this,element);if(this.children.length===0&&this.parent()){return this.parent().detach(this);}};ElementCollection.prototype.html=function(indent){var c,children;if(indent==null){indent='';}children=function(){var _i,_len,_ref,_results;_ref=this.children;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c.html(indent+ContentEdit.INDENT));}return _results;}.call(this);if(this.isFixed()){return children.join('\n');}else {return ""+indent+"<"+this.tagName()+this._attributesToString()+">\n"+(""+children.join('\n')+"\n")+(""+indent+"</"+this.tagName()+">");}};ElementCollection.prototype.mount=function(){var child,name,value,_i,_len,_ref,_ref1,_results;this._domElement=document.createElement(this._tagName);_ref=this._attributes;for(name in _ref){value=_ref[name];this._domElement.setAttribute(name,value);}ElementCollection.__super__.mount.call(this);_ref1=this.children;_results=[];for(_i=0,_len=_ref1.length;_i<_len;_i++){child=_ref1[_i];_results.push(child.mount());}return _results;};ElementCollection.prototype.unmount=function(){var child,_i,_len,_ref;_ref=this.children;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];child.unmount();}return ElementCollection.__super__.unmount.call(this);};ElementCollection.prototype.blur=void 0;ElementCollection.prototype.focus=void 0;return ElementCollection;}(ContentEdit.Element);ContentEdit.ResizableElement=function(_super){__extends(ResizableElement,_super);function ResizableElement(tagName,attributes){ResizableElement.__super__.constructor.call(this,tagName,attributes);this._domSizeInfoElement=null;this._aspectRatio=1;}ResizableElement.prototype.aspectRatio=function(){return this._aspectRatio;};ResizableElement.prototype.maxSize=function(){var maxWidth;maxWidth=parseInt(this.attr('data-ce-max-width')||0);if(!maxWidth){maxWidth=ContentEdit.DEFAULT_MAX_ELEMENT_WIDTH;}maxWidth=Math.max(maxWidth,this.size()[0]);return [maxWidth,maxWidth*this.aspectRatio()];};ResizableElement.prototype.minSize=function(){var minWidth;minWidth=parseInt(this.attr('data-ce-min-width')||0);if(!minWidth){minWidth=ContentEdit.DEFAULT_MIN_ELEMENT_WIDTH;}minWidth=Math.min(minWidth,this.size()[0]);return [minWidth,minWidth*this.aspectRatio()];};ResizableElement.prototype.type=function(){return 'ResizableElement';};ResizableElement.prototype.mount=function(){ResizableElement.__super__.mount.call(this);return this._domElement.setAttribute('data-ce-size',this._getSizeInfo());};ResizableElement.prototype.resize=function(corner,x,y){if(!(this.isMounted()&&this.can('resize'))){return;}return ContentEdit.Root.get().startResizing(this,corner,x,y,true);};ResizableElement.prototype.size=function(newSize){var height,maxSize,minSize,width;if(!newSize){width=parseInt(this.attr('width')||1);height=parseInt(this.attr('height')||1);return [width,height];}newSize[0]=parseInt(newSize[0]);newSize[1]=parseInt(newSize[1]);minSize=this.minSize();newSize[0]=Math.max(newSize[0],minSize[0]);newSize[1]=Math.max(newSize[1],minSize[1]);maxSize=this.maxSize();newSize[0]=Math.min(newSize[0],maxSize[0]);newSize[1]=Math.min(newSize[1],maxSize[1]);this.attr('width',parseInt(newSize[0]));this.attr('height',parseInt(newSize[1]));if(this.isMounted()){this._domElement.style.width=""+newSize[0]+"px";this._domElement.style.height=""+newSize[1]+"px";return this._domElement.setAttribute('data-ce-size',this._getSizeInfo());}};ResizableElement.prototype._onMouseDown=function(ev){var corner;ResizableElement.__super__._onMouseDown.call(this,ev);corner=this._getResizeCorner(ev.clientX,ev.clientY);if(corner){return this.resize(corner,ev.clientX,ev.clientY);}else {clearTimeout(this._dragTimeout);return this._dragTimeout=setTimeout(function(_this){return function(){return _this.drag(ev.pageX,ev.pageY);};}(this),150);}};ResizableElement.prototype._onMouseMove=function(ev){var corner;ResizableElement.__super__._onMouseMove.call(this);if(!this.can('resize')){return;}this._removeCSSClass('ce-element--resize-top-left');this._removeCSSClass('ce-element--resize-top-right');this._removeCSSClass('ce-element--resize-bottom-left');this._removeCSSClass('ce-element--resize-bottom-right');corner=this._getResizeCorner(ev.clientX,ev.clientY);if(corner){return this._addCSSClass("ce-element--resize-"+corner[0]+"-"+corner[1]);}};ResizableElement.prototype._onMouseOut=function(ev){ResizableElement.__super__._onMouseOut.call(this);this._removeCSSClass('ce-element--resize-top-left');this._removeCSSClass('ce-element--resize-top-right');this._removeCSSClass('ce-element--resize-bottom-left');return this._removeCSSClass('ce-element--resize-bottom-right');};ResizableElement.prototype._onMouseUp=function(ev){ResizableElement.__super__._onMouseUp.call(this);if(this._dragTimeout){return clearTimeout(this._dragTimeout);}};ResizableElement.prototype._getResizeCorner=function(x,y){var corner,cornerSize,rect,size,_ref;rect=this._domElement.getBoundingClientRect();_ref=[x-rect.left,y-rect.top],x=_ref[0],y=_ref[1];size=this.size();cornerSize=ContentEdit.RESIZE_CORNER_SIZE;cornerSize=Math.min(cornerSize,Math.max(parseInt(size[0]/4),1));cornerSize=Math.min(cornerSize,Math.max(parseInt(size[1]/4),1));corner=null;if(x<cornerSize){if(y<cornerSize){corner=['top','left'];}else if(y>rect.height-cornerSize){corner=['bottom','left'];}}else if(x>rect.width-cornerSize){if(y<cornerSize){corner=['top','right'];}else if(y>rect.height-cornerSize){corner=['bottom','right'];}}return corner;};ResizableElement.prototype._getSizeInfo=function(){var size;size=this.size();return "w "+size[0]+" × h "+size[1];};return ResizableElement;}(ContentEdit.Element);ContentEdit.Region=function(_super){__extends(Region,_super);function Region(domElement){var c,childNode,childNodes,cls,element,tagNames,_i,_len;Region.__super__.constructor.call(this);this._domElement=domElement;tagNames=ContentEdit.TagNames.get();childNodes=function(){var _i,_len,_ref,_results;_ref=this._domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}.call(this);for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType!==1){continue;}if(childNode.getAttribute("data-ce-tag")){cls=tagNames.match(childNode.getAttribute("data-ce-tag"));}else {cls=tagNames.match(childNode.tagName);}element=cls.fromDOMElement(childNode);this._domElement.removeChild(childNode);if(element){this.attach(element);}ContentEdit.Root.get().trigger('ready',this);}}Region.prototype.domElement=function(){return this._domElement;};Region.prototype.isMounted=function(){return true;};Region.prototype.type=function(){return 'Region';};Region.prototype.html=function(indent){var c;if(indent==null){indent='';}return function(){var _i,_len,_ref,_results;_ref=this.children;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c.html(indent));}return _results;}.call(this).join('\n').trim();};return Region;}(ContentEdit.NodeCollection);ContentEdit.Fixture=function(_super){__extends(Fixture,_super);function Fixture(domElement){var cls,element,tagNames;Fixture.__super__.constructor.call(this);this._domElement=domElement;tagNames=ContentEdit.TagNames.get();if(this._domElement.getAttribute("data-ce-tag")){cls=tagNames.match(this._domElement.getAttribute("data-ce-tag"));}else {cls=tagNames.match(this._domElement.tagName);}element=cls.fromDOMElement(this._domElement);this.children=[element];element._parent=this;element.mount();ContentEdit.Root.get().trigger('ready',this);}Fixture.prototype.domElement=function(){return this._domElement;};Fixture.prototype.isMounted=function(){return true;};Fixture.prototype.type=function(){return 'Fixture';};Fixture.prototype.html=function(indent){var c;if(indent==null){indent='';}return function(){var _i,_len,_ref,_results;_ref=this.children;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c.html(indent));}return _results;}.call(this).join('\n').trim();};return Fixture;}(ContentEdit.NodeCollection);_Root=function(_super){__extends(_Root,_super);function _Root(){this._onStopResizing=__bind(this._onStopResizing,this);this._onResize=__bind(this._onResize,this);this._onStopDragging=__bind(this._onStopDragging,this);this._onDrag=__bind(this._onDrag,this);_Root.__super__.constructor.call(this);this._focused=null;this._dragging=null;this._dropTarget=null;this._draggingDOMElement=null;this._resizing=null;this._resizingInit=null;}_Root.prototype.dragging=function(){return this._dragging;};_Root.prototype.dropTarget=function(){return this._dropTarget;};_Root.prototype.focused=function(){return this._focused;};_Root.prototype.resizing=function(){return this._resizing;};_Root.prototype.type=function(){return 'Root';};_Root.prototype.cancelDragging=function(){if(!this._dragging){return;}document.body.removeChild(this._draggingDOMElement);document.removeEventListener('mousemove',this._onDrag);document.removeEventListener('mouseup',this._onStopDragging);this._dragging._removeCSSClass('ce-element--dragging');this._dragging=null;this._dropTarget=null;return ContentEdit.removeCSSClass(document.body,'ce--dragging');};_Root.prototype.startDragging=function(element,x,y){if(this._dragging){return;}this._dragging=element;this._dragging._addCSSClass('ce-element--dragging');this._draggingDOMElement=this._dragging.createDraggingDOMElement();document.body.appendChild(this._draggingDOMElement);this._draggingDOMElement.style.left=""+x+"px";this._draggingDOMElement.style.top=""+y+"px";document.addEventListener('mousemove',this._onDrag);document.addEventListener('mouseup',this._onStopDragging);return ContentEdit.addCSSClass(document.body,'ce--dragging');};_Root.prototype._getDropPlacement=function(x,y){var horz,rect,vert,_ref;if(!this._dropTarget){return null;}rect=this._dropTarget.domElement().getBoundingClientRect();_ref=[x-rect.left,y-rect.top],x=_ref[0],y=_ref[1];horz='center';if(x<ContentEdit.DROP_EDGE_SIZE){horz='left';}else if(x>rect.width-ContentEdit.DROP_EDGE_SIZE){horz='right';}vert='above';if(y>rect.height/2){vert='below';}return [vert,horz];};_Root.prototype._onDrag=function(ev){var placement,_ref,_ref1;ContentSelect.Range.unselectAll();this._draggingDOMElement.style.left=""+ev.pageX+"px";this._draggingDOMElement.style.top=""+ev.pageY+"px";if(this._dropTarget){placement=this._getDropPlacement(ev.clientX,ev.clientY);this._dropTarget._removeCSSClass('ce-element--drop-above');this._dropTarget._removeCSSClass('ce-element--drop-below');this._dropTarget._removeCSSClass('ce-element--drop-center');this._dropTarget._removeCSSClass('ce-element--drop-left');this._dropTarget._removeCSSClass('ce-element--drop-right');if(_ref=placement[0],__indexOf.call(this._dragging.constructor.placements,_ref)>=0){this._dropTarget._addCSSClass("ce-element--drop-"+placement[0]);}if(_ref1=placement[1],__indexOf.call(this._dragging.constructor.placements,_ref1)>=0){return this._dropTarget._addCSSClass("ce-element--drop-"+placement[1]);}}};_Root.prototype._onStopDragging=function(ev){var placement;placement=this._getDropPlacement(ev.clientX,ev.clientY);this._dragging.drop(this._dropTarget,placement);return this.cancelDragging();};_Root.prototype.startResizing=function(element,corner,x,y,fixed){var measureDom,parentDom;if(this._resizing){return;}this._resizing=element;this._resizingInit={corner:corner,fixed:fixed,origin:[x,y],size:element.size()};this._resizing._addCSSClass('ce-element--resizing');parentDom=this._resizing.parent().domElement();measureDom=document.createElement('div');measureDom.setAttribute('class','ce-measure');parentDom.appendChild(measureDom);this._resizingParentWidth=measureDom.getBoundingClientRect().width;parentDom.removeChild(measureDom);document.addEventListener('mousemove',this._onResize);document.addEventListener('mouseup',this._onStopResizing);return ContentEdit.addCSSClass(document.body,'ce--resizing');};_Root.prototype._onResize=function(ev){var height,width,x,y;ContentSelect.Range.unselectAll();x=this._resizingInit.origin[0]-ev.clientX;if(this._resizingInit.corner[1]==='right'){x=-x;}width=this._resizingInit.size[0]+x;width=Math.min(width,this._resizingParentWidth);if(this._resizingInit.fixed){height=width*this._resizing.aspectRatio();}else {y=this._resizingInit.origin[1]-ev.clientY;if(this._resizingInit.corner[0]==='bottom'){y=-y;}height=this._resizingInit.size[1]+y;}return this._resizing.size([width,height]);};_Root.prototype._onStopResizing=function(ev){document.removeEventListener('mousemove',this._onResize);document.removeEventListener('mouseup',this._onStopResizing);this._resizing._removeCSSClass('ce-element--resizing');this._resizing=null;this._resizingInit=null;this._resizingParentWidth=null;return ContentEdit.removeCSSClass(document.body,'ce--resizing');};return _Root;}(ContentEdit.Node);ContentEdit.Root=function(){var instance;function Root(){}instance=null;Root.get=function(){return instance!=null?instance:instance=new _Root();};return Root;}();ContentEdit.Static=function(_super){__extends(Static,_super);function Static(tagName,attributes,content){Static.__super__.constructor.call(this,tagName,attributes);this._content=content;}Static.prototype.cssTypeName=function(){return 'static';};Static.prototype.type=function(){return 'Static';};Static.prototype.typeName=function(){return 'Static';};Static.prototype.createDraggingDOMElement=function(){var helper,text;if(!this.isMounted()){return;}helper=Static.__super__.createDraggingDOMElement.call(this);text=this._domElement.textContent;if(text.length>ContentEdit.HELPER_CHAR_LIMIT){text=text.substr(0,ContentEdit.HELPER_CHAR_LIMIT);}helper.innerHTML=text;return helper;};Static.prototype.html=function(indent){if(indent==null){indent='';}if(HTMLString.Tag.SELF_CLOSING[this._tagName]){return ""+indent+"<"+this._tagName+this._attributesToString()+">";}return ""+indent+"<"+this._tagName+this._attributesToString()+">"+(""+this._content)+(""+indent+"</"+this._tagName+">");};Static.prototype.mount=function(){var name,value,_ref;this._domElement=document.createElement(this._tagName);_ref=this._attributes;for(name in _ref){value=_ref[name];this._domElement.setAttribute(name,value);}this._domElement.innerHTML=this._content;return Static.__super__.mount.call(this);};Static.prototype.blur=void 0;Static.prototype.focus=void 0;Static.prototype._onMouseDown=function(ev){Static.__super__._onMouseDown.call(this,ev);if(this.attr('data-ce-moveable')!==void 0){clearTimeout(this._dragTimeout);return this._dragTimeout=setTimeout(function(_this){return function(){return _this.drag(ev.pageX,ev.pageY);};}(this),150);}};Static.prototype._onMouseOver=function(ev){Static.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};Static.prototype._onMouseUp=function(ev){Static.__super__._onMouseUp.call(this,ev);if(this._dragTimeout){return clearTimeout(this._dragTimeout);}};Static.droppers={'Static':ContentEdit.Element._dropVert};Static.fromDOMElement=function(domElement){return new this(domElement.tagName,this.getDOMElementAttributes(domElement),domElement.innerHTML);};return Static;}(ContentEdit.Element);ContentEdit.TagNames.get().register(ContentEdit.Static,'static');ContentEdit.Text=function(_super){__extends(Text,_super);function Text(tagName,attributes,content){Text.__super__.constructor.call(this,tagName,attributes);if(content instanceof HTMLString.String){this.content=content;}else {this.content=new HTMLString.String(content).trim();}}Text.prototype.cssTypeName=function(){return 'text';};Text.prototype.type=function(){return 'Text';};Text.prototype.typeName=function(){return 'Text';};Text.prototype.blur=function(){var error;if(this.isMounted()){this._syncContent();}if(this.content.isWhitespace()&&this.can('remove')){if(this.parent()){this.parent().detach(this);}}else if(this.isMounted()){try{this._domElement.blur();}catch(_error){error=_error;}this._domElement.removeAttribute('contenteditable');}return Text.__super__.blur.call(this);};Text.prototype.createDraggingDOMElement=function(){var helper,text;if(!this.isMounted()){return;}helper=Text.__super__.createDraggingDOMElement.call(this);text=HTMLString.String.encode(this._domElement.textContent);if(text.length>ContentEdit.HELPER_CHAR_LIMIT){text=text.substr(0,ContentEdit.HELPER_CHAR_LIMIT);}helper.innerHTML=text;return helper;};Text.prototype.drag=function(x,y){this.storeState();this._domElement.removeAttribute('contenteditable');return Text.__super__.drag.call(this,x,y);};Text.prototype.drop=function(element,placement){Text.__super__.drop.call(this,element,placement);return this.restoreState();};Text.prototype.focus=function(supressDOMFocus){if(this.isMounted()){this._domElement.setAttribute('contenteditable','');}return Text.__super__.focus.call(this,supressDOMFocus);};Text.prototype.html=function(indent){var content;if(indent==null){indent='';}if(!this._lastCached||this._lastCached<this._modified){content=this.content.copy().trim();content.optimize();this._lastCached=Date.now();this._cached=content.html();}if(this.isFixed()){return this._cached;}else {return ""+indent+"<"+this._tagName+this._attributesToString()+">\n"+(""+indent+ContentEdit.INDENT+this._cached+"\n")+(""+indent+"</"+this._tagName+">");}};Text.prototype.mount=function(){var name,value,_ref;this._domElement=document.createElement(this._tagName);_ref=this._attributes;for(name in _ref){value=_ref[name];this._domElement.setAttribute(name,value);}this.updateInnerHTML();return Text.__super__.mount.call(this);};Text.prototype.restoreState=function(){if(!this._savedSelection){return;}if(!(this.isMounted()&&this.isFocused())){this._savedSelection=void 0;return;}this._domElement.setAttribute('contenteditable','');this._addCSSClass('ce-element--focused');if(document.activeElement!==this.domElement()){this.domElement().focus();}this._savedSelection.select(this._domElement);return this._savedSelection=void 0;};Text.prototype.selection=function(selection){if(selection===void 0){if(this.isMounted()){return ContentSelect.Range.query(this._domElement);}else {return new ContentSelect.Range(0,0);}}return selection.select(this._domElement);};Text.prototype.storeState=function(){if(!(this.isMounted()&&this.isFocused())){return;}return this._savedSelection=ContentSelect.Range.query(this._domElement);};Text.prototype.unmount=function(){this._domElement.removeAttribute('contenteditable');return Text.__super__.unmount.call(this);};Text.prototype.updateInnerHTML=function(){this._domElement.innerHTML=this.content.html();ContentSelect.Range.prepareElement(this._domElement);return this._flagIfEmpty();};Text.prototype._onKeyDown=function(ev){switch(ev.keyCode){case 40:return this._keyDown(ev);case 37:return this._keyLeft(ev);case 39:return this._keyRight(ev);case 38:return this._keyUp(ev);case 9:return this._keyTab(ev);case 8:return this._keyBack(ev);case 46:return this._keyDelete(ev);case 13:return this._keyReturn(ev);}};Text.prototype._onKeyUp=function(ev){Text.__super__._onKeyUp.call(this,ev);return this._syncContent();};Text.prototype._onMouseDown=function(ev){Text.__super__._onMouseDown.call(this,ev);clearTimeout(this._dragTimeout);this._dragTimeout=setTimeout(function(_this){return function(){return _this.drag(ev.pageX,ev.pageY);};}(this),ContentEdit.DRAG_HOLD_DURATION);if(this.content.length()===0&&ContentEdit.Root.get().focused()===this){ev.preventDefault();if(document.activeElement!==this._domElement){this._domElement.focus();}return new ContentSelect.Range(0,0).select(this._domElement);}};Text.prototype._onMouseMove=function(ev){if(this._dragTimeout){clearTimeout(this._dragTimeout);}return Text.__super__._onMouseMove.call(this,ev);};Text.prototype._onMouseOut=function(ev){if(this._dragTimeout){clearTimeout(this._dragTimeout);}return Text.__super__._onMouseOut.call(this,ev);};Text.prototype._onMouseUp=function(ev){if(this._dragTimeout){clearTimeout(this._dragTimeout);}return Text.__super__._onMouseUp.call(this,ev);};Text.prototype._keyBack=function(ev){var previous,selection;selection=ContentSelect.Range.query(this._domElement);if(!(selection.get()[0]===0&&selection.isCollapsed())){return;}ev.preventDefault();previous=this.previousContent();this._syncContent();if(previous){return previous.merge(this);}};Text.prototype._keyDelete=function(ev){var next,selection;selection=ContentSelect.Range.query(this._domElement);if(!(this._atEnd(selection)&&selection.isCollapsed())){return;}ev.preventDefault();next=this.nextContent();if(next){return this.merge(next);}};Text.prototype._keyDown=function(ev){return this._keyRight(ev);};Text.prototype._keyLeft=function(ev){var previous,selection;selection=ContentSelect.Range.query(this._domElement);if(!(selection.get()[0]===0&&selection.isCollapsed())){return;}ev.preventDefault();previous=this.previousContent();if(previous){previous.focus();selection=new ContentSelect.Range(previous.content.length(),previous.content.length());return selection.select(previous.domElement());}else {return ContentEdit.Root.get().trigger('previous-region',this.closest(function(node){return node.type()==='Region';}));}};Text.prototype._keyReturn=function(ev){var element,insertAt,lineBreakStr,selection,tail,tip;ev.preventDefault();if(this.content.isWhitespace()){return;}selection=ContentSelect.Range.query(this._domElement);tip=this.content.substring(0,selection.get()[0]);tail=this.content.substring(selection.get()[1]);if(ev.shiftKey^ContentEdit.PREFER_LINE_BREAKS){insertAt=selection.get()[0];lineBreakStr='<br>';if(this.content.length()===insertAt){if(!this.content.characters[insertAt-1].isTag('br')){lineBreakStr='<br><br>';}}this.content=this.content.insert(insertAt,new HTMLString.String(lineBreakStr,true),true);this.updateInnerHTML();insertAt+=1;selection=new ContentSelect.Range(insertAt,insertAt);selection.select(this.domElement());this.taint();return;}if(!this.can('spawn')){return;}this.content=tip.trim();this.updateInnerHTML();element=new this.constructor('p',{},tail.trim());this.parent().attach(element,this.parent().children.indexOf(this)+1);if(tip.length()){element.focus();selection=new ContentSelect.Range(0,0);selection.select(element.domElement());}else {selection=new ContentSelect.Range(0,tip.length());selection.select(this._domElement);}return this.taint();};Text.prototype._keyRight=function(ev){var next,selection;selection=ContentSelect.Range.query(this._domElement);if(!(this._atEnd(selection)&&selection.isCollapsed())){return;}ev.preventDefault();next=this.nextContent();if(next){next.focus();selection=new ContentSelect.Range(0,0);return selection.select(next.domElement());}else {return ContentEdit.Root.get().trigger('next-region',this.closest(function(node){return node.type()==='Fixture'||node.type()==='Region';}));}};Text.prototype._keyTab=function(ev){return ev.preventDefault();};Text.prototype._keyUp=function(ev){return this._keyLeft(ev);};Text.prototype._atEnd=function(selection){return selection.get()[0]>=this.content.length();};Text.prototype._flagIfEmpty=function(){if(this.content.length()===0){return this._addCSSClass('ce-element--empty');}else {return this._removeCSSClass('ce-element--empty');}};Text.prototype._syncContent=function(ev){var newSnapshot,snapshot;snapshot=this.content.html();this.content=new HTMLString.String(this._domElement.innerHTML,this.content.preserveWhitespace());newSnapshot=this.content.html();if(snapshot!==newSnapshot){this.taint();}return this._flagIfEmpty();};Text.droppers={'Static':ContentEdit.Element._dropVert,'Text':ContentEdit.Element._dropVert};Text.mergers={'Text':function Text(element,target){var offset;offset=target.content.length();if(element.content.length()){target.content=target.content.concat(element.content);}if(target.isMounted()){target.updateInnerHTML();}target.focus();new ContentSelect.Range(offset,offset).select(target._domElement);if(element.parent()){element.parent().detach(element);}return target.taint();}};Text.fromDOMElement=function(domElement){return new this(domElement.tagName,this.getDOMElementAttributes(domElement),domElement.innerHTML.replace(/^\s+|\s+$/g,''));};return Text;}(ContentEdit.Element);ContentEdit.TagNames.get().register(ContentEdit.Text,'address','blockquote','h1','h2','h3','h4','h5','h6','p');ContentEdit.PreText=function(_super){__extends(PreText,_super);function PreText(tagName,attributes,content){if(content instanceof HTMLString.String){this.content=content;}else {this.content=new HTMLString.String(content,true);}ContentEdit.Element.call(this,tagName,attributes);}PreText.prototype.cssTypeName=function(){return 'pre-text';};PreText.prototype.type=function(){return 'PreText';};PreText.prototype.typeName=function(){return 'Preformatted';};PreText.prototype.blur=function(){if(this.isMounted()){this._domElement.innerHTML=this.content.html();}return PreText.__super__.blur.call(this);};PreText.prototype.html=function(indent){var content;if(indent==null){indent='';}if(!this._lastCached||this._lastCached<this._modified){content=this.content.copy();content.optimize();this._lastCached=Date.now();this._cached=content.html();}return ""+indent+"<"+this._tagName+this._attributesToString()+">"+(""+this._cached+"</"+this._tagName+">");};PreText.prototype.updateInnerHTML=function(){var html;html=this.content.html();this._domElement.innerHTML=html;this._ensureEndZWS();ContentSelect.Range.prepareElement(this._domElement);return this._flagIfEmpty();};PreText.prototype._onKeyUp=function(ev){var html,newSnaphot,snapshot;this._ensureEndZWS();snapshot=this.content.html();html=this._domElement.innerHTML;html=html.replace(/\u200B$/g,'');this.content=new HTMLString.String(html,this.content.preserveWhitespace());newSnaphot=this.content.html();if(snapshot!==newSnaphot){this.taint();}return this._flagIfEmpty();};PreText.prototype._keyBack=function(ev){var selection;selection=ContentSelect.Range.query(this._domElement);if(selection.get()[0]<=this.content.length()){return PreText.__super__._keyBack.call(this,ev);}selection.set(this.content.length(),this.content.length());return selection.select(this._domElement);};PreText.prototype._keyReturn=function(ev){var cursor,selection,tail,tip;ev.preventDefault();selection=ContentSelect.Range.query(this._domElement);cursor=selection.get()[0]+1;if(selection.get()[0]===0&&selection.isCollapsed()){this.content=new HTMLString.String('\n',true).concat(this.content);}else if(this._atEnd(selection)&&selection.isCollapsed()){this.content=this.content.concat(new HTMLString.String('\n',true));}else if(selection.get()[0]===0&&selection.get()[1]===this.content.length()){this.content=new HTMLString.String('\n',true);cursor=0;}else {tip=this.content.substring(0,selection.get()[0]);tail=this.content.substring(selection.get()[1]);this.content=tip.concat(new HTMLString.String('\n',true),tail);}this.updateInnerHTML();selection.set(cursor,cursor);selection.select(this._domElement);return this.taint();};PreText.prototype._ensureEndZWS=function(){if(!this._domElement.lastChild){return;}if(this._domElement.innerHTML[this._domElement.innerHTML.length-1]==="​"){return;}this.storeState();this._domElement.lastChild.textContent+="​";return this.restoreState();};PreText.droppers={'PreText':ContentEdit.Element._dropVert,'Static':ContentEdit.Element._dropVert,'Text':ContentEdit.Element._dropVert};PreText.mergers={};PreText.fromDOMElement=function(domElement){return new this(domElement.tagName,this.getDOMElementAttributes(domElement),domElement.innerHTML);};return PreText;}(ContentEdit.Text);ContentEdit.TagNames.get().register(ContentEdit.PreText,'pre');ContentEdit.Image=function(_super){__extends(Image,_super);function Image(attributes,a){var size;Image.__super__.constructor.call(this,'img',attributes);this.a=a?a:null;size=this.size();this._aspectRatio=size[1]/size[0];}Image.prototype.cssTypeName=function(){return 'image';};Image.prototype.type=function(){return 'Image';};Image.prototype.typeName=function(){return 'Image';};Image.prototype.createDraggingDOMElement=function(){var helper;if(!this.isMounted()){return;}helper=Image.__super__.createDraggingDOMElement.call(this);helper.style.backgroundImage="url("+this._attributes['src']+")";return helper;};Image.prototype.html=function(indent){var attributes,img;if(indent==null){indent='';}img=""+indent+"<img"+this._attributesToString()+">";if(this.a){attributes=ContentEdit.attributesToString(this.a);attributes=""+attributes+" data-ce-tag=\"img\"";return ""+indent+"<a "+attributes+">\n"+(""+ContentEdit.INDENT+img+"\n")+(""+indent+"</a>");}else {return img;}};Image.prototype.mount=function(){var classes,style;this._domElement=document.createElement('div');classes='';if(this.a&&this.a['class']){classes+=' '+this.a['class'];}if(this._attributes['class']){classes+=' '+this._attributes['class'];}this._domElement.setAttribute('class',classes);style=this._attributes['style']?this._attributes['style']:'';style+="background-image:url("+this._attributes['src']+");";if(this._attributes['width']){style+="width:"+this._attributes['width']+"px;";}if(this._attributes['height']){style+="height:"+this._attributes['height']+"px;";}this._domElement.setAttribute('style',style);return Image.__super__.mount.call(this);};Image.prototype.unmount=function(){var domElement,wrapper;if(this.isFixed()){wrapper=document.createElement('div');wrapper.innerHTML=this.html();domElement=wrapper.querySelector('a, img');this._domElement.parentNode.replaceChild(domElement,this._domElement);this._domElement=domElement;}return Image.__super__.unmount.call(this);};Image.droppers={'Image':ContentEdit.Element._dropBoth,'PreText':ContentEdit.Element._dropBoth,'Static':ContentEdit.Element._dropBoth,'Text':ContentEdit.Element._dropBoth};Image.placements=['above','below','left','right','center'];Image.fromDOMElement=function(domElement){var a,attributes,c,childNode,childNodes,_i,_len;a=null;if(domElement.tagName.toLowerCase()==='a'){a=this.getDOMElementAttributes(domElement);childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType===1&&childNode.tagName.toLowerCase()==='img'){domElement=childNode;break;}}if(domElement.tagName.toLowerCase()==='a'){domElement=document.createElement('img');}}attributes=this.getDOMElementAttributes(domElement);if(attributes['width']===void 0){if(attributes['height']===void 0){attributes['width']=domElement.naturalWidth;}else {attributes['width']=domElement.clientWidth;}}if(attributes['height']===void 0){if(attributes['width']===void 0){attributes['height']=domElement.naturalHeight;}else {attributes['height']=domElement.clientHeight;}}return new this(attributes,a);};return Image;}(ContentEdit.ResizableElement);ContentEdit.TagNames.get().register(ContentEdit.Image,'img');ContentEdit.Video=function(_super){__extends(Video,_super);function Video(tagName,attributes,sources){var size;if(sources==null){sources=[];}Video.__super__.constructor.call(this,tagName,attributes);this.sources=sources;size=this.size();this._aspectRatio=size[1]/size[0];}Video.prototype.cssTypeName=function(){return 'video';};Video.prototype.type=function(){return 'Video';};Video.prototype.typeName=function(){return 'Video';};Video.prototype._title=function(){var src;src='';if(this.attr('src')){src=this.attr('src');}else {if(this.sources.length){src=this.sources[0]['src'];}}if(!src){src='No video source set';}if(src.length>80){src=src.substr(0,80)+'...';}return src;};Video.prototype.createDraggingDOMElement=function(){var helper;if(!this.isMounted()){return;}helper=Video.__super__.createDraggingDOMElement.call(this);helper.innerHTML=this._title();return helper;};Video.prototype.html=function(indent){var attributes,source,sourceStrings,_i,_len,_ref;if(indent==null){indent='';}if(this.tagName()==='video'){sourceStrings=[];_ref=this.sources;for(_i=0,_len=_ref.length;_i<_len;_i++){source=_ref[_i];attributes=ContentEdit.attributesToString(source);sourceStrings.push(""+indent+ContentEdit.INDENT+"<source "+attributes+">");}return ""+indent+"<video"+this._attributesToString()+">\n"+sourceStrings.join('\n')+("\n"+indent+"</video>");}else {return ""+indent+"<"+this._tagName+this._attributesToString()+">"+("</"+this._tagName+">");}};Video.prototype.mount=function(){var style;this._domElement=document.createElement('div');if(this.a&&this.a['class']){this._domElement.setAttribute('class',this.a['class']);}else if(this._attributes['class']){this._domElement.setAttribute('class',this._attributes['class']);}style=this._attributes['style']?this._attributes['style']:'';if(this._attributes['width']){style+="width:"+this._attributes['width']+"px;";}if(this._attributes['height']){style+="height:"+this._attributes['height']+"px;";}this._domElement.setAttribute('style',style);this._domElement.setAttribute('data-ce-title',this._title());return Video.__super__.mount.call(this);};Video.prototype.unmount=function(){var domElement,wrapper;if(this.isFixed()){wrapper=document.createElement('div');wrapper.innerHTML=this.html();domElement=wrapper.querySelector('iframe');this._domElement.parentNode.replaceChild(domElement,this._domElement);this._domElement=domElement;}return Video.__super__.unmount.call(this);};Video.droppers={'Image':ContentEdit.Element._dropBoth,'PreText':ContentEdit.Element._dropBoth,'Static':ContentEdit.Element._dropBoth,'Text':ContentEdit.Element._dropBoth,'Video':ContentEdit.Element._dropBoth};Video.placements=['above','below','left','right','center'];Video.fromDOMElement=function(domElement){var c,childNode,childNodes,sources,_i,_len;childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();sources=[];for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType===1&&childNode.tagName.toLowerCase()==='source'){sources.push(this.getDOMElementAttributes(childNode));}}return new this(domElement.tagName,this.getDOMElementAttributes(domElement),sources);};return Video;}(ContentEdit.ResizableElement);ContentEdit.TagNames.get().register(ContentEdit.Video,'iframe','video');ContentEdit.List=function(_super){__extends(List,_super);function List(tagName,attributes){List.__super__.constructor.call(this,tagName,attributes);}List.prototype.cssTypeName=function(){return 'list';};List.prototype.type=function(){return 'List';};List.prototype.typeName=function(){return 'List';};List.prototype._onMouseOver=function(ev){if(this.parent().type()==='ListItem'){return;}List.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};List.droppers={'Image':ContentEdit.Element._dropBoth,'List':ContentEdit.Element._dropVert,'PreText':ContentEdit.Element._dropVert,'Static':ContentEdit.Element._dropVert,'Text':ContentEdit.Element._dropVert,'Video':ContentEdit.Element._dropBoth};List.fromDOMElement=function(domElement){var c,childNode,childNodes,list,_i,_len;list=new this(domElement.tagName,this.getDOMElementAttributes(domElement));childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType!==1){continue;}if(childNode.tagName.toLowerCase()!=='li'){continue;}list.attach(ContentEdit.ListItem.fromDOMElement(childNode));}if(list.children.length===0){return null;}return list;};return List;}(ContentEdit.ElementCollection);ContentEdit.TagNames.get().register(ContentEdit.List,'ol','ul');ContentEdit.ListItem=function(_super){__extends(ListItem,_super);function ListItem(attributes){ListItem.__super__.constructor.call(this,'li',attributes);this._behaviours['indent']=true;}ListItem.prototype.cssTypeName=function(){return 'list-item';};ListItem.prototype.list=function(){if(this.children.length===2){return this.children[1];}return null;};ListItem.prototype.listItemText=function(){if(this.children.length>0){return this.children[0];}return null;};ListItem.prototype.type=function(){return 'ListItem';};ListItem.prototype.html=function(indent){var lines;if(indent==null){indent='';}lines=[""+indent+"<li"+this._attributesToString()+">"];if(this.listItemText()){lines.push(this.listItemText().html(indent+ContentEdit.INDENT));}if(this.list()){lines.push(this.list().html(indent+ContentEdit.INDENT));}lines.push(""+indent+"</li>");return lines.join('\n');};ListItem.prototype.indent=function(){var sibling;if(!this.can('indent')){return;}if(this.parent().children.indexOf(this)===0){return;}sibling=this.previousSibling();if(!sibling.list()){sibling.attach(new ContentEdit.List(sibling.parent().tagName()));}this.listItemText().storeState();this.parent().detach(this);sibling.list().attach(this);return this.listItemText().restoreState();};ListItem.prototype.remove=function(){var child,i,index,_i,_len,_ref;if(!this.parent()){return;}index=this.parent().children.indexOf(this);if(this.list()){_ref=this.list().children.slice();for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){child=_ref[i];child.parent().detach(child);this.parent().attach(child,i+index);}}return this.parent().detach(this);};ListItem.prototype.unindent=function(){var child,grandParent,i,itemIndex,list,parent,parentIndex,selection,sibling,siblings,text,_i,_j,_k,_l,_len,_len1,_len2,_len3,_ref,_ref1;if(!this.can('indent')){return;}parent=this.parent();grandParent=parent.parent();siblings=parent.children.slice(parent.children.indexOf(this)+1,parent.children.length);if(grandParent.type()==='ListItem'){this.listItemText().storeState();parent.detach(this);grandParent.parent().attach(this,grandParent.parent().children.indexOf(grandParent)+1);if(siblings.length&&!this.list()){this.attach(new ContentEdit.List(parent.tagName()));}for(_i=0,_len=siblings.length;_i<_len;_i++){sibling=siblings[_i];sibling.parent().detach(sibling);this.list().attach(sibling);}return this.listItemText().restoreState();}else {text=new ContentEdit.Text('p',this.attr('class')?{'class':this.attr('class')}:{},this.listItemText().content);selection=null;if(this.listItemText().isFocused()){selection=ContentSelect.Range.query(this.listItemText().domElement());}parentIndex=grandParent.children.indexOf(parent);itemIndex=parent.children.indexOf(this);if(itemIndex===0){list=null;if(parent.children.length===1){if(this.list()){list=new ContentEdit.List(parent.tagName());}grandParent.detach(parent);}else {parent.detach(this);}grandParent.attach(text,parentIndex);if(list){grandParent.attach(list,parentIndex+1);}if(this.list()){_ref=this.list().children.slice();for(i=_j=0,_len1=_ref.length;_j<_len1;i=++_j){child=_ref[i];child.parent().detach(child);if(list){list.attach(child);}else {parent.attach(child,i);}}}}else if(itemIndex===parent.children.length-1){parent.detach(this);grandParent.attach(text,parentIndex+1);if(this.list()){grandParent.attach(this.list(),parentIndex+2);}}else {parent.detach(this);grandParent.attach(text,parentIndex+1);list=new ContentEdit.List(parent.tagName());grandParent.attach(list,parentIndex+2);if(this.list()){_ref1=this.list().children.slice();for(_k=0,_len2=_ref1.length;_k<_len2;_k++){child=_ref1[_k];child.parent().detach(child);list.attach(child);}}for(_l=0,_len3=siblings.length;_l<_len3;_l++){sibling=siblings[_l];sibling.parent().detach(sibling);list.attach(sibling);}}if(selection){text.focus();return selection.select(text.domElement());}}};ListItem.prototype._onMouseOver=function(ev){ListItem.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};ListItem.prototype._addDOMEventListeners=function(){};ListItem.prototype._removeDOMEventListners=function(){};ListItem.fromDOMElement=function(domElement){var childNode,content,listDOMElement,listElement,listItem,listItemText,_i,_len,_ref,_ref1;listItem=new this(this.getDOMElementAttributes(domElement));content='';listDOMElement=null;_ref=domElement.childNodes;for(_i=0,_len=_ref.length;_i<_len;_i++){childNode=_ref[_i];if(childNode.nodeType===1){if((_ref1=childNode.tagName.toLowerCase())==='ul'||_ref1==='li'){if(!listDOMElement){listDOMElement=childNode;}}else {content+=childNode.outerHTML;}}else {content+=HTMLString.String.encode(childNode.textContent);}}content=content.replace(/^\s+|\s+$/g,'');listItemText=new ContentEdit.ListItemText(content);listItem.attach(listItemText);if(listDOMElement){listElement=ContentEdit.List.fromDOMElement(listDOMElement);listItem.attach(listElement);}return listItem;};return ListItem;}(ContentEdit.ElementCollection);ContentEdit.ListItemText=function(_super){__extends(ListItemText,_super);function ListItemText(content){ListItemText.__super__.constructor.call(this,'div',{},content);}ListItemText.prototype.cssTypeName=function(){return 'list-item-text';};ListItemText.prototype.type=function(){return 'ListItemText';};ListItemText.prototype.typeName=function(){return 'List item';};ListItemText.prototype.blur=function(){if(this.content.isWhitespace()&&this.can('remove')){this.parent().remove();}else if(this.isMounted()){this._domElement.blur();this._domElement.removeAttribute('contenteditable');}return ContentEdit.Element.prototype.blur.call(this);};ListItemText.prototype.can=function(behaviour,allowed){if(allowed){throw new Error('Cannot set behaviour for ListItemText');}return this.parent().can(behaviour);};ListItemText.prototype.html=function(indent){var content;if(indent==null){indent='';}if(!this._lastCached||this._lastCached<this._modified){content=this.content.copy().trim();content.optimize();this._lastCached=Date.now();this._cached=content.html();}return ""+indent+this._cached;};ListItemText.prototype._onMouseDown=function(ev){var initDrag;ContentEdit.Element.prototype._onMouseDown.call(this,ev);initDrag=function(_this){return function(){var listRoot;if(ContentEdit.Root.get().dragging()===_this){ContentEdit.Root.get().cancelDragging();listRoot=_this.closest(function(node){return node.parent().type()==='Region';});return listRoot.drag(ev.pageX,ev.pageY);}else {_this.drag(ev.pageX,ev.pageY);return _this._dragTimeout=setTimeout(initDrag,ContentEdit.DRAG_HOLD_DURATION*2);}};}(this);clearTimeout(this._dragTimeout);return this._dragTimeout=setTimeout(initDrag,ContentEdit.DRAG_HOLD_DURATION);};ListItemText.prototype._onMouseMove=function(ev){if(this._dragTimeout){clearTimeout(this._dragTimeout);}return ContentEdit.Element.prototype._onMouseMove.call(this,ev);};ListItemText.prototype._onMouseUp=function(ev){if(this._dragTimeout){clearTimeout(this._dragTimeout);}return ContentEdit.Element.prototype._onMouseUp.call(this,ev);};ListItemText.prototype._keyTab=function(ev){ev.preventDefault();if(ev.shiftKey){return this.parent().unindent();}else {return this.parent().indent();}};ListItemText.prototype._keyReturn=function(ev){var grandParent,list,listItem,selection,tail,tip;ev.preventDefault();if(this.content.isWhitespace()){this.parent().unindent();return;}if(!this.can('spawn')){return;}ContentSelect.Range.query(this._domElement);selection=ContentSelect.Range.query(this._domElement);tip=this.content.substring(0,selection.get()[0]);tail=this.content.substring(selection.get()[1]);if(tip.length()+tail.length()===0){this.parent().unindent();return;}this.content=tip.trim();this.updateInnerHTML();grandParent=this.parent().parent();listItem=new ContentEdit.ListItem(this.attr('class')?{'class':this.attr('class')}:{});grandParent.attach(listItem,grandParent.children.indexOf(this.parent())+1);listItem.attach(new ContentEdit.ListItemText(tail.trim()));list=this.parent().list();if(list){this.parent().detach(list);listItem.attach(list);}if(tip.length()){listItem.listItemText().focus();selection=new ContentSelect.Range(0,0);return selection.select(listItem.listItemText().domElement());}else {selection=new ContentSelect.Range(0,tip.length());return selection.select(this._domElement);}};ListItemText.droppers={'ListItemText':function ListItemText(element,target,placement){var elementParent,insertIndex,listItem,targetParent;elementParent=element.parent();targetParent=target.parent();elementParent.remove();elementParent.detach(element);listItem=new ContentEdit.ListItem(elementParent._attributes);listItem.attach(element);if(targetParent.list()&&placement[0]==='below'){targetParent.list().attach(listItem,0);return;}insertIndex=targetParent.parent().children.indexOf(targetParent);if(placement[0]==='below'){insertIndex+=1;}return targetParent.parent().attach(listItem,insertIndex);},'Text':function Text(element,target,placement){var cssClass,insertIndex,listItem,targetParent,text;if(element.type()==='Text'){targetParent=target.parent();element.parent().detach(element);cssClass=element.attr('class');listItem=new ContentEdit.ListItem(cssClass?{'class':cssClass}:{});listItem.attach(new ContentEdit.ListItemText(element.content));if(targetParent.list()&&placement[0]==='below'){targetParent.list().attach(listItem,0);return;}insertIndex=targetParent.parent().children.indexOf(targetParent);if(placement[0]==='below'){insertIndex+=1;}targetParent.parent().attach(listItem,insertIndex);listItem.listItemText().focus();if(element._savedSelection){return element._savedSelection.select(listItem.listItemText().domElement());}}else {cssClass=element.attr('class');text=new ContentEdit.Text('p',cssClass?{'class':cssClass}:{},element.content);element.parent().remove();insertIndex=target.parent().children.indexOf(target);if(placement[0]==='below'){insertIndex+=1;}target.parent().attach(text,insertIndex);text.focus();if(element._savedSelection){return element._savedSelection.select(text.domElement());}}}};ListItemText.mergers={'ListItemText':function ListItemText(element,target){var offset;offset=target.content.length();if(element.content.length()){target.content=target.content.concat(element.content);}if(target.isMounted()){target._domElement.innerHTML=target.content.html();}target.focus();new ContentSelect.Range(offset,offset).select(target._domElement);if(element.type()==='Text'){if(element.parent()){element.parent().detach(element);}}else {element.parent().remove();}return target.taint();}};return ListItemText;}(ContentEdit.Text);_mergers=ContentEdit.ListItemText.mergers;_mergers['Text']=_mergers['ListItemText'];ContentEdit.Table=function(_super){__extends(Table,_super);function Table(attributes){Table.__super__.constructor.call(this,'table',attributes);}Table.prototype.cssTypeName=function(){return 'table';};Table.prototype.typeName=function(){return 'Table';};Table.prototype.type=function(){return 'Table';};Table.prototype.firstSection=function(){var section;if(section=this.thead()){return section;}else if(section=this.tbody()){return section;}else if(section=this.tfoot()){return section;}return null;};Table.prototype.lastSection=function(){var section;if(section=this.tfoot()){return section;}else if(section=this.tbody()){return section;}else if(section=this.thead()){return section;}return null;};Table.prototype.tbody=function(){return this._getChild('tbody');};Table.prototype.tfoot=function(){return this._getChild('tfoot');};Table.prototype.thead=function(){return this._getChild('thead');};Table.prototype._onMouseOver=function(ev){Table.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};Table.prototype._getChild=function(tagName){var child,_i,_len,_ref;_ref=this.children;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(child.tagName()===tagName){return child;}}return null;};Table.droppers={'Image':ContentEdit.Element._dropBoth,'List':ContentEdit.Element._dropVert,'PreText':ContentEdit.Element._dropVert,'Static':ContentEdit.Element._dropVert,'Table':ContentEdit.Element._dropVert,'Text':ContentEdit.Element._dropVert,'Video':ContentEdit.Element._dropBoth};Table.fromDOMElement=function(domElement){var c,childNode,childNodes,orphanRows,row,section,table,tagName,_i,_j,_len,_len1;table=new this(this.getDOMElementAttributes(domElement));childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();orphanRows=[];for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType!==1){continue;}tagName=childNode.tagName.toLowerCase();if(table._getChild(tagName)){continue;}switch(tagName){case 'tbody':case 'tfoot':case 'thead':section=ContentEdit.TableSection.fromDOMElement(childNode);table.attach(section);break;case 'tr':orphanRows.push(ContentEdit.TableRow.fromDOMElement(childNode));}}if(orphanRows.length>0){if(!table._getChild('tbody')){table.attach(new ContentEdit.TableSection('tbody'));}for(_j=0,_len1=orphanRows.length;_j<_len1;_j++){row=orphanRows[_j];table.tbody().attach(row);}}if(table.children.length===0){return null;}return table;};return Table;}(ContentEdit.ElementCollection);ContentEdit.TagNames.get().register(ContentEdit.Table,'table');ContentEdit.TableSection=function(_super){__extends(TableSection,_super);function TableSection(tagName,attributes){TableSection.__super__.constructor.call(this,tagName,attributes);}TableSection.prototype.cssTypeName=function(){return 'table-section';};TableSection.prototype.type=function(){return 'TableSection';};TableSection.prototype._onMouseOver=function(ev){TableSection.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};TableSection.fromDOMElement=function(domElement){var c,childNode,childNodes,section,_i,_len;section=new this(domElement.tagName,this.getDOMElementAttributes(domElement));childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType!==1){continue;}if(childNode.tagName.toLowerCase()!=='tr'){continue;}section.attach(ContentEdit.TableRow.fromDOMElement(childNode));}return section;};return TableSection;}(ContentEdit.ElementCollection);ContentEdit.TableRow=function(_super){__extends(TableRow,_super);function TableRow(attributes){TableRow.__super__.constructor.call(this,'tr',attributes);}TableRow.prototype.cssTypeName=function(){return 'table-row';};TableRow.prototype.isEmpty=function(){var cell,text,_i,_len,_ref;_ref=this.children;for(_i=0,_len=_ref.length;_i<_len;_i++){cell=_ref[_i];text=cell.tableCellText();if(text&&text.content.length()>0){return false;}}return true;};TableRow.prototype.type=function(){return 'TableRow';};TableRow.prototype.typeName=function(){return 'Table row';};TableRow.prototype._onMouseOver=function(ev){TableRow.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};TableRow.droppers={'TableRow':ContentEdit.Element._dropVert};TableRow.fromDOMElement=function(domElement){var c,childNode,childNodes,row,tagName,_i,_len;row=new this(this.getDOMElementAttributes(domElement));childNodes=function(){var _i,_len,_ref,_results;_ref=domElement.childNodes;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){c=_ref[_i];_results.push(c);}return _results;}();for(_i=0,_len=childNodes.length;_i<_len;_i++){childNode=childNodes[_i];if(childNode.nodeType!==1){continue;}tagName=childNode.tagName.toLowerCase();if(!(tagName==='td'||tagName==='th')){continue;}row.attach(ContentEdit.TableCell.fromDOMElement(childNode));}return row;};return TableRow;}(ContentEdit.ElementCollection);ContentEdit.TableCell=function(_super){__extends(TableCell,_super);function TableCell(tagName,attributes){TableCell.__super__.constructor.call(this,tagName,attributes);}TableCell.prototype.cssTypeName=function(){return 'table-cell';};TableCell.prototype.tableCellText=function(){if(this.children.length>0){return this.children[0];}return null;};TableCell.prototype.type=function(){return 'TableCell';};TableCell.prototype.html=function(indent){var lines;if(indent==null){indent='';}lines=[""+indent+"<"+this.tagName()+this._attributesToString()+">"];if(this.tableCellText()){lines.push(this.tableCellText().html(indent+ContentEdit.INDENT));}lines.push(""+indent+"</"+this.tagName()+">");return lines.join('\n');};TableCell.prototype._onMouseOver=function(ev){TableCell.__super__._onMouseOver.call(this,ev);return this._removeCSSClass('ce-element--over');};TableCell.prototype._addDOMEventListeners=function(){};TableCell.prototype._removeDOMEventListners=function(){};TableCell.fromDOMElement=function(domElement){var tableCell,tableCellText;tableCell=new this(domElement.tagName,this.getDOMElementAttributes(domElement));tableCellText=new ContentEdit.TableCellText(domElement.innerHTML.replace(/^\s+|\s+$/g,''));tableCell.attach(tableCellText);return tableCell;};return TableCell;}(ContentEdit.ElementCollection);ContentEdit.TableCellText=function(_super){__extends(TableCellText,_super);function TableCellText(content){TableCellText.__super__.constructor.call(this,'div',{},content);}TableCellText.prototype.cssTypeName=function(){return 'table-cell-text';};TableCellText.prototype.type=function(){return 'TableCellText';};TableCellText.prototype._isInFirstRow=function(){var cell,row,section,table;cell=this.parent();row=cell.parent();section=row.parent();table=section.parent();if(section!==table.firstSection()){return false;}return row===section.children[0];};TableCellText.prototype._isInLastRow=function(){var cell,row,section,table;cell=this.parent();row=cell.parent();section=row.parent();table=section.parent();if(section!==table.lastSection()){return false;}return row===section.children[section.children.length-1];};TableCellText.prototype._isLastInSection=function(){var cell,row,section;cell=this.parent();row=cell.parent();section=row.parent();if(row!==section.children[section.children.length-1]){return false;}return cell===row.children[row.children.length-1];};TableCellText.prototype.blur=function(){if(this.isMounted()){this._domElement.blur();this._domElement.removeAttribute('contenteditable');}return ContentEdit.Element.prototype.blur.call(this);};TableCellText.prototype.can=function(behaviour,allowed){if(allowed){throw new Error('Cannot set behaviour for ListItemText');}return this.parent().can(behaviour);};TableCellText.prototype.html=function(indent){var content;if(indent==null){indent='';}if(!this._lastCached||this._lastCached<this._modified){content=this.content.copy().trim();content.optimize();this._lastCached=Date.now();this._cached=content.html();}return ""+indent+this._cached;};TableCellText.prototype._onMouseDown=function(ev){var initDrag;ContentEdit.Element.prototype._onMouseDown.call(this,ev);initDrag=function(_this){return function(){var cell,table;cell=_this.parent();if(ContentEdit.Root.get().dragging()===cell.parent()){ContentEdit.Root.get().cancelDragging();table=cell.parent().parent().parent();return table.drag(ev.pageX,ev.pageY);}else {cell.parent().drag(ev.pageX,ev.pageY);return _this._dragTimeout=setTimeout(initDrag,ContentEdit.DRAG_HOLD_DURATION*2);}};}(this);clearTimeout(this._dragTimeout);return this._dragTimeout=setTimeout(initDrag,ContentEdit.DRAG_HOLD_DURATION);};TableCellText.prototype._keyBack=function(ev){var cell,previous,row,selection;selection=ContentSelect.Range.query(this._domElement);if(!(selection.get()[0]===0&&selection.isCollapsed())){return;}ev.preventDefault();cell=this.parent();row=cell.parent();if(!(row.isEmpty()&&row.can('remove'))){return;}if(this.content.length()===0&&row.children.indexOf(cell)===0){previous=this.previousContent();if(previous){previous.focus();selection=new ContentSelect.Range(previous.content.length(),previous.content.length());selection.select(previous.domElement());}return row.parent().detach(row);}};TableCellText.prototype._keyDelete=function(ev){var lastChild,nextElement,row,selection;row=this.parent().parent();if(!(row.isEmpty()&&row.can('remove'))){return;}ev.preventDefault();lastChild=row.children[row.children.length-1];nextElement=lastChild.tableCellText().nextContent();if(nextElement){nextElement.focus();selection=new ContentSelect.Range(0,0);selection.select(nextElement.domElement());}return row.parent().detach(row);};TableCellText.prototype._keyDown=function(ev){var cell,cellIndex,lastCell,next,nextRow,row,selection;selection=ContentSelect.Range.query(this._domElement);if(!(this._atEnd(selection)&&selection.isCollapsed())){return;}ev.preventDefault();cell=this.parent();if(this._isInLastRow()){row=cell.parent();lastCell=row.children[row.children.length-1].tableCellText();next=lastCell.nextContent();if(next){return next.focus();}else {return ContentEdit.Root.get().trigger('next-region',this.closest(function(node){return node.type()==='Fixture'||node.type()==='Region';}));}}else {nextRow=cell.parent().nextWithTest(function(node){return node.type()==='TableRow';});cellIndex=cell.parent().children.indexOf(cell);cellIndex=Math.min(cellIndex,nextRow.children.length);return nextRow.children[cellIndex].tableCellText().focus();}};TableCellText.prototype._keyReturn=function(ev){ev.preventDefault();return this._keyTab({'shiftKey':false,'preventDefault':function preventDefault(){}});};TableCellText.prototype._keyTab=function(ev){var cell,child,grandParent,newCell,newCellText,row,section,_i,_len,_ref;ev.preventDefault();cell=this.parent();if(ev.shiftKey){if(this._isInFirstRow()&&cell.parent().children[0]===cell){return;}return this.previousContent().focus();}else {if(!this.can('spawn')){return;}grandParent=cell.parent().parent();if(grandParent.tagName()==='tbody'&&this._isLastInSection()){row=new ContentEdit.TableRow();_ref=cell.parent().children;for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];newCell=new ContentEdit.TableCell(child.tagName(),child._attributes);newCellText=new ContentEdit.TableCellText('');newCell.attach(newCellText);row.attach(newCell);}section=this.closest(function(node){return node.type()==='TableSection';});section.attach(row);return row.children[0].tableCellText().focus();}else {return this.nextContent().focus();}}};TableCellText.prototype._keyUp=function(ev){var cell,cellIndex,previous,previousRow,row,selection;selection=ContentSelect.Range.query(this._domElement);if(!(selection.get()[0]===0&&selection.isCollapsed())){return;}ev.preventDefault();cell=this.parent();if(this._isInFirstRow()){row=cell.parent();previous=row.children[0].previousContent();if(previous){return previous.focus();}else {return ContentEdit.Root.get().trigger('previous-region',this.closest(function(node){return node.type()==='Fixture'||node.type()==='Region';}));}}else {previousRow=cell.parent().previousWithTest(function(node){return node.type()==='TableRow';});cellIndex=cell.parent().children.indexOf(cell);cellIndex=Math.min(cellIndex,previousRow.children.length);return previousRow.children[cellIndex].tableCellText().focus();}};TableCellText.droppers={};TableCellText.mergers={};return TableCellText;}(ContentEdit.Text);}).call(undefined);(function(){var AttributeUI,ContentTools,CropMarksUI,StyleUI,exports,_EditorApp,__hasProp={}.hasOwnProperty,__extends=function __extends(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key];}function ctor(){this.constructor=child;}ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;},__bind=function __bind(fn,me){return function(){return fn.apply(me,arguments);};},__slice=[].slice;ContentTools={Tools:{},CANCEL_MESSAGE:'Your changes have not been saved, do you really want to lose them?'.trim(),DEFAULT_TOOLS:[['bold','italic','link','align-left','align-center','align-right'],['heading','subheading','paragraph','unordered-list','ordered-list','table','indent','unindent','line-break'],['image','video','preformatted'],['undo','redo','remove']],DEFAULT_VIDEO_HEIGHT:300,DEFAULT_VIDEO_WIDTH:400,HIGHLIGHT_HOLD_DURATION:2000,INSPECTOR_IGNORED_ELEMENTS:['Fixture','ListItemText','Region','TableCellText'],IMAGE_UPLOADER:null,MIN_CROP:10,RESTRICTED_ATTRIBUTES:{'*':['style'],'img':['height','src','width','data-ce-max-width','data-ce-min-width'],'iframe':['height','width']},getEmbedVideoURL:function getEmbedVideoURL(url){var domains,id,k,kv,m,netloc,paramStr,params,paramsStr,parser,path,v,_i,_len,_ref;domains={'www.youtube.com':'youtube','youtu.be':'youtube','vimeo.com':'vimeo','player.vimeo.com':'vimeo'};parser=document.createElement('a');parser.href=url;netloc=parser.hostname.toLowerCase();path=parser.pathname;if(path!==null&&path.substr(0,1)!=="/"){path="/"+path;}params={};paramsStr=parser.search.slice(1);_ref=paramsStr.split('&');for(_i=0,_len=_ref.length;_i<_len;_i++){kv=_ref[_i];kv=kv.split("=");if(kv[0]){params[kv[0]]=kv[1];}}switch(domains[netloc]){case 'youtube':if(path.toLowerCase()==='/watch'){if(!params['v']){return null;}id=params['v'];delete params['v'];}else {m=path.match(/\/([A-Za-z0-9_-]+)$/i);if(!m){return null;}id=m[1];}url="https://www.youtube.com/embed/"+id;paramStr=function(){var _results;_results=[];for(k in params){v=params[k];_results.push(""+k+"="+v);}return _results;}().join('&');if(paramStr){url+="?"+paramStr;}return url;case 'vimeo':m=path.match(/\/(\w+\/\w+\/){0,1}(\d+)/i);if(!m){return null;}url="https://player.vimeo.com/video/"+m[2];paramStr=function(){var _results;_results=[];for(k in params){v=params[k];_results.push(""+k+"="+v);}return _results;}().join('&');if(paramStr){url+="?"+paramStr;}return url;}return null;},getRestrictedAtributes:function getRestrictedAtributes(tagName){var restricted;restricted=[];if(ContentTools.RESTRICTED_ATTRIBUTES[tagName]){restricted=restricted.concat(ContentTools.RESTRICTED_ATTRIBUTES[tagName]);}if(ContentTools.RESTRICTED_ATTRIBUTES['*']){restricted=restricted.concat(ContentTools.RESTRICTED_ATTRIBUTES['*']);}return restricted;},getScrollPosition:function getScrollPosition(){var isCSS1Compat,supportsPageOffset;supportsPageOffset=window.pageXOffset!==void 0;isCSS1Compat=(document.compatMode||4)===4;if(supportsPageOffset){return [window.pageXOffset,window.pageYOffset];}else if(isCSS1Compat){return [document.documentElement.scrollLeft,document.documentElement.scrollTop];}else {return [document.body.scrollLeft,document.body.scrollTop];}}};if(typeof window!=='undefined'){window.ContentTools=ContentTools;}if(typeof module!=='undefined'&&module.exports){exports=module.exports=ContentTools;}ContentTools.ComponentUI=function(){function ComponentUI(){this._bindings={};this._parent=null;this._children=[];this._domElement=null;}ComponentUI.prototype.children=function(){return this._children.slice();};ComponentUI.prototype.domElement=function(){return this._domElement;};ComponentUI.prototype.isMounted=function(){return this._domElement!==null;};ComponentUI.prototype.parent=function(){return this._parent;};ComponentUI.prototype.attach=function(component,index){if(component.parent()){component.parent().detach(component);}component._parent=this;if(index!==void 0){return this._children.splice(index,0,component);}else {return this._children.push(component);}};ComponentUI.prototype.addCSSClass=function(className){if(!this.isMounted()){return;}return ContentEdit.addCSSClass(this._domElement,className);};ComponentUI.prototype.detatch=function(component){var componentIndex;componentIndex=this._children.indexOf(component);if(componentIndex===-1){return;}return this._children.splice(componentIndex,1);};ComponentUI.prototype.mount=function(){};ComponentUI.prototype.removeCSSClass=function(className){if(!this.isMounted()){return;}return ContentEdit.removeCSSClass(this._domElement,className);};ComponentUI.prototype.unmount=function(){if(!this.isMounted()){return;}this._removeDOMEventListeners();if(this._domElement.parentNode){this._domElement.parentNode.removeChild(this._domElement);}return this._domElement=null;};ComponentUI.prototype.addEventListener=function(eventName,callback){if(this._bindings[eventName]===void 0){this._bindings[eventName]=[];}this._bindings[eventName].push(callback);};ComponentUI.prototype.createEvent=function(eventName,detail){return new ContentTools.Event(eventName,detail);};ComponentUI.prototype.dispatchEvent=function(ev){var callback,_i,_len,_ref;if(!this._bindings[ev.name()]){return !ev.defaultPrevented();}_ref=this._bindings[ev.name()];for(_i=0,_len=_ref.length;_i<_len;_i++){callback=_ref[_i];if(ev.propagationStopped()){break;}if(!callback){continue;}callback.call(this,ev);}return !ev.defaultPrevented();};ComponentUI.prototype.removeEventListener=function(eventName,callback){var i,suspect,_i,_len,_ref,_results;if(!eventName){this._bindings={};return;}if(!callback){this._bindings[eventName]=void 0;return;}if(!this._bindings[eventName]){return;}_ref=this._bindings[eventName];_results=[];for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){suspect=_ref[i];if(suspect===callback){_results.push(this._bindings[eventName].splice(i,1));}else {_results.push(void 0);}}return _results;};ComponentUI.prototype._addDOMEventListeners=function(){};ComponentUI.prototype._removeDOMEventListeners=function(){};ComponentUI.createDiv=function(classNames,attributes,content){var domElement,name,value;domElement=document.createElement('div');if(classNames&&classNames.length>0){domElement.setAttribute('class',classNames.join(' '));}if(attributes){for(name in attributes){value=attributes[name];domElement.setAttribute(name,value);}}if(content){domElement.innerHTML=content;}return domElement;};return ComponentUI;}();ContentTools.WidgetUI=function(_super){__extends(WidgetUI,_super);function WidgetUI(){return WidgetUI.__super__.constructor.apply(this,arguments);}WidgetUI.prototype.attach=function(component,index){WidgetUI.__super__.attach.call(this,component,index);if(!this.isMounted()){return component.mount();}};WidgetUI.prototype.detatch=function(component){WidgetUI.__super__.detatch.call(this,component);if(this.isMounted()){return component.unmount();}};WidgetUI.prototype.show=function(){var fadeIn;if(!this.isMounted()){this.mount();}fadeIn=function(_this){return function(){return _this.addCSSClass('ct-widget--active');};}(this);return setTimeout(fadeIn,100);};WidgetUI.prototype.hide=function(){var monitorForHidden;this.removeCSSClass('ct-widget--active');monitorForHidden=function(_this){return function(){if(!window.getComputedStyle){_this.unmount();return;}if(parseFloat(window.getComputedStyle(_this._domElement).opacity)<0.01){return _this.unmount();}else {return setTimeout(monitorForHidden,250);}};}(this);if(this.isMounted()){return setTimeout(monitorForHidden,250);}};return WidgetUI;}(ContentTools.ComponentUI);ContentTools.AnchoredComponentUI=function(_super){__extends(AnchoredComponentUI,_super);function AnchoredComponentUI(){return AnchoredComponentUI.__super__.constructor.apply(this,arguments);}AnchoredComponentUI.prototype.mount=function(domParent,before){if(before==null){before=null;}domParent.insertBefore(this._domElement,before);return this._addDOMEventListeners();};return AnchoredComponentUI;}(ContentTools.ComponentUI);ContentTools.Event=function(){function Event(name,detail){this._name=name;this._detail=detail;this._timeStamp=Date.now();this._defaultPrevented=false;this._propagationStopped=false;}Event.prototype.defaultPrevented=function(){return this._defaultPrevented;};Event.prototype.detail=function(){return this._detail;};Event.prototype.name=function(){return this._name;};Event.prototype.propagationStopped=function(){return this._propagationStopped;};Event.prototype.timeStamp=function(){return this._timeStamp;};Event.prototype.preventDefault=function(){return this._defaultPrevented=true;};Event.prototype.stopImmediatePropagation=function(){return this._propagationStopped=true;};return Event;}();ContentTools.FlashUI=function(_super){__extends(FlashUI,_super);function FlashUI(modifier){FlashUI.__super__.constructor.call(this);this.mount(modifier);}FlashUI.prototype.mount=function(modifier){var monitorForHidden;this._domElement=this.constructor.createDiv(['ct-flash','ct-flash--active',"ct-flash--"+modifier,'ct-widget','ct-widget--active']);FlashUI.__super__.mount.call(this,ContentTools.EditorApp.get().domElement());monitorForHidden=function(_this){return function(){if(!window.getComputedStyle){_this.unmount();return;}if(parseFloat(window.getComputedStyle(_this._domElement).opacity)<0.01){return _this.unmount();}else {return setTimeout(monitorForHidden,250);}};}(this);return setTimeout(monitorForHidden,250);};return FlashUI;}(ContentTools.AnchoredComponentUI);ContentTools.IgnitionUI=function(_super){__extends(IgnitionUI,_super);function IgnitionUI(){IgnitionUI.__super__.constructor.call(this);this._revertToState='ready';this._state='ready';}IgnitionUI.prototype.busy=function(busy){if(this.dispatchEvent(this.createEvent('busy',{busy:busy}))){if(busy===(this._state==='busy')){return;}if(busy){this._revertToState=this._state;return this.state('busy');}else {return this.state(this._revertToState);}}};IgnitionUI.prototype.cancel=function(){if(this.dispatchEvent(this.createEvent('cancel'))){return this.state('ready');}};IgnitionUI.prototype.confirm=function(){if(this.dispatchEvent(this.createEvent('confirm'))){return this.state('ready');}};IgnitionUI.prototype.edit=function(){if(this.dispatchEvent(this.createEvent('edit'))){return this.state('editing');}};IgnitionUI.prototype.mount=function(){IgnitionUI.__super__.mount.call(this);this._domElement=this.constructor.createDiv(['ct-widget','ct-ignition','ct-ignition--ready']);this.parent().domElement().appendChild(this._domElement);this._domEdit=this.constructor.createDiv(['ct-ignition__button','ct-ignition__button--edit']);this._domElement.appendChild(this._domEdit);this._domConfirm=this.constructor.createDiv(['ct-ignition__button','ct-ignition__button--confirm']);this._domElement.appendChild(this._domConfirm);this._domCancel=this.constructor.createDiv(['ct-ignition__button','ct-ignition__button--cancel']);this._domElement.appendChild(this._domCancel);this._domBusy=this.constructor.createDiv(['ct-ignition__button','ct-ignition__button--busy']);this._domElement.appendChild(this._domBusy);return this._addDOMEventListeners();};IgnitionUI.prototype.state=function(state){if(state===void 0){return this._state;}if(this._state===state){return;}if(!this.dispatchEvent(this.createEvent('statechange',{state:state}))){return;}this._state=state;this.removeCSSClass('ct-ignition--busy');this.removeCSSClass('ct-ignition--editing');this.removeCSSClass('ct-ignition--ready');if(this._state==='busy'){return this.addCSSClass('ct-ignition--busy');}else if(this._state==='editing'){return this.addCSSClass('ct-ignition--editing');}else if(this._state==='ready'){return this.addCSSClass('ct-ignition--ready');}};IgnitionUI.prototype.unmount=function(){IgnitionUI.__super__.unmount.call(this);this._domEdit=null;this._domConfirm=null;return this._domCancel=null;};IgnitionUI.prototype._addDOMEventListeners=function(){this._domEdit.addEventListener('click',function(_this){return function(ev){ev.preventDefault();return _this.edit();};}(this));this._domConfirm.addEventListener('click',function(_this){return function(ev){ev.preventDefault();return _this.confirm();};}(this));return this._domCancel.addEventListener('click',function(_this){return function(ev){ev.preventDefault();return _this.cancel();};}(this));};return IgnitionUI;}(ContentTools.WidgetUI);ContentTools.InspectorUI=function(_super){__extends(InspectorUI,_super);function InspectorUI(){InspectorUI.__super__.constructor.call(this);this._tagUIs=[];}InspectorUI.prototype.mount=function(){this._domElement=this.constructor.createDiv(['ct-widget','ct-inspector']);this.parent().domElement().appendChild(this._domElement);this._domTags=this.constructor.createDiv(['ct-inspector__tags','ct-tags']);this._domElement.appendChild(this._domTags);this._domCounter=this.constructor.createDiv(['ct-inspector__counter']);this._domElement.appendChild(this._domCounter);this.updateCounter();this._addDOMEventListeners();this._handleFocusChange=function(_this){return function(){return _this.updateTags();};}(this);ContentEdit.Root.get().bind('blur',this._handleFocusChange);ContentEdit.Root.get().bind('focus',this._handleFocusChange);return ContentEdit.Root.get().bind('mount',this._handleFocusChange);};InspectorUI.prototype.unmount=function(){InspectorUI.__super__.unmount.call(this);this._domTags=null;ContentEdit.Root.get().unbind('blur',this._handleFocusChange);ContentEdit.Root.get().unbind('focus',this._handleFocusChange);return ContentEdit.Root.get().unbind('mount',this._handleFocusChange);};InspectorUI.prototype.updateCounter=function(){var column,completeText,element,line,lines,region,sub,word_count,_i,_len,_ref;if(!this.isMounted()){return;}completeText='';_ref=ContentTools.EditorApp.get().orderedRegions();for(_i=0,_len=_ref.length;_i<_len;_i++){region=_ref[_i];if(!region){continue;}completeText+=region.domElement().textContent;}completeText=completeText.trim();completeText=completeText.replace(/<\/?[a-z][^>]*>/gi,'');completeText=completeText.replace(/[\u200B]+/,'');completeText=completeText.replace(/['";:,.?¿\-!¡]+/g,'');word_count=(completeText.match(/\S+/g)||[]).length;word_count=word_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');element=ContentEdit.Root.get().focused();if(!(element&&element.type()==='PreText'&&element.selection().isCollapsed())){this._domCounter.textContent=word_count;return;}line=0;column=0;sub=element.content.substring(0,element.selection().get()[0]);lines=sub.text().split('\n');line=lines.length;column=lines[lines.length-1].length;line=line.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');column=column.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');return this._domCounter.textContent=""+word_count+" / "+line+":"+column;};InspectorUI.prototype.updateTags=function(){var element,elements,tag,_i,_j,_len,_len1,_ref,_results;element=ContentEdit.Root.get().focused();_ref=this._tagUIs;for(_i=0,_len=_ref.length;_i<_len;_i++){tag=_ref[_i];tag.unmount();}this._tagUIs=[];if(!element){return;}elements=element.parents();elements.reverse();elements.push(element);_results=[];for(_j=0,_len1=elements.length;_j<_len1;_j++){element=elements[_j];if(ContentTools.INSPECTOR_IGNORED_ELEMENTS.indexOf(element.type())!==-1){continue;}if(element.isFixed()){continue;}tag=new ContentTools.TagUI(element);this._tagUIs.push(tag);_results.push(tag.mount(this._domTags));}return _results;};InspectorUI.prototype._addDOMEventListeners=function(){return this._updateCounterInterval=setInterval(function(_this){return function(){return _this.updateCounter();};}(this),250);};InspectorUI.prototype._removeDOMEventListeners=function(){return clearInterval(this._updateCounterInterval);};return InspectorUI;}(ContentTools.WidgetUI);ContentTools.TagUI=function(_super){__extends(TagUI,_super);function TagUI(element){this.element=element;this._onMouseDown=__bind(this._onMouseDown,this);TagUI.__super__.constructor.call(this);}TagUI.prototype.mount=function(domParent,before){if(before==null){before=null;}this._domElement=this.constructor.createDiv(['ct-tag']);this._domElement.textContent=this.element.tagName();return TagUI.__super__.mount.call(this,domParent,before);};TagUI.prototype._addDOMEventListeners=function(){return this._domElement.addEventListener('mousedown',this._onMouseDown);};TagUI.prototype._onMouseDown=function(ev){var app,dialog,modal;ev.preventDefault();if(this.element.storeState){this.element.storeState();}app=ContentTools.EditorApp.get();modal=new ContentTools.ModalUI();dialog=new ContentTools.PropertiesDialog(this.element);dialog.addEventListener('cancel',function(_this){return function(){modal.hide();dialog.hide();if(_this.element.restoreState){return _this.element.restoreState();}};}(this));dialog.addEventListener('save',function(_this){return function(ev){var applied,attributes,className,classNames,cssClass,detail,element,innerHTML,name,styles,value,_i,_j,_len,_len1,_ref,_ref1;detail=ev.detail();attributes=detail.changedAttributes;styles=detail.changedStyles;innerHTML=detail.innerHTML;for(name in attributes){value=attributes[name];if(name==='class'){if(value===null){value='';}classNames={};_ref=value.split(' ');for(_i=0,_len=_ref.length;_i<_len;_i++){className=_ref[_i];className=className.trim();if(!className){continue;}classNames[className]=true;if(!_this.element.hasCSSClass(className)){_this.element.addCSSClass(className);}}_ref1=_this.element.attr('class').split(' ');for(_j=0,_len1=_ref1.length;_j<_len1;_j++){className=_ref1[_j];className=className.trim();if(classNames[className]===void 0){_this.element.removeCSSClass(className);}}}else {if(value===null){_this.element.removeAttr(name);}else {_this.element.attr(name,value);}}}for(cssClass in styles){applied=styles[cssClass];if(applied){_this.element.addCSSClass(cssClass);}else {_this.element.removeCSSClass(cssClass);}}if(innerHTML!==null){if(innerHTML!==dialog.getElementInnerHTML()){element=_this.element;if(!element.content){element=element.children[0];}element.content=new HTMLString.String(innerHTML,element.content.preserveWhitespace());element.updateInnerHTML();element.taint();element.selection(new ContentSelect.Range(0,0));element.storeState();}}modal.hide();dialog.hide();if(_this.element.restoreState){return _this.element.restoreState();}};}(this));app.attach(modal);app.attach(dialog);modal.show();return dialog.show();};return TagUI;}(ContentTools.AnchoredComponentUI);ContentTools.ModalUI=function(_super){__extends(ModalUI,_super);function ModalUI(transparent,allowScrolling){ModalUI.__super__.constructor.call(this);this._transparent=transparent;this._allowScrolling=allowScrolling;}ModalUI.prototype.mount=function(){this._domElement=this.constructor.createDiv(['ct-widget','ct-modal']);this.parent().domElement().appendChild(this._domElement);if(this._transparent){this.addCSSClass('ct-modal--transparent');}if(!this._allowScrolling){ContentEdit.addCSSClass(document.body,'ct--no-scroll');}return this._addDOMEventListeners();};ModalUI.prototype.unmount=function(){if(!this._allowScrolling){ContentEdit.removeCSSClass(document.body,'ct--no-scroll');}return ModalUI.__super__.unmount.call(this);};ModalUI.prototype._addDOMEventListeners=function(){return this._domElement.addEventListener('click',function(_this){return function(ev){return _this.dispatchEvent(_this.createEvent('click'));};}(this));};return ModalUI;}(ContentTools.WidgetUI);ContentTools.ToolboxUI=function(_super){__extends(ToolboxUI,_super);function ToolboxUI(tools){this._onStopDragging=__bind(this._onStopDragging,this);this._onStartDragging=__bind(this._onStartDragging,this);this._onDrag=__bind(this._onDrag,this);ToolboxUI.__super__.constructor.call(this);this._tools=tools;this._dragging=false;this._draggingOffset=null;this._domGrip=null;this._toolUIs={};}ToolboxUI.prototype.isDragging=function(){return this._dragging;};ToolboxUI.prototype.hide=function(){this._removeDOMEventListeners();return ToolboxUI.__super__.hide.call(this);};ToolboxUI.prototype.mount=function(){var coord,position,restore;this._domElement=this.constructor.createDiv(['ct-widget','ct-toolbox']);this.parent().domElement().appendChild(this._domElement);this._domGrip=this.constructor.createDiv(['ct-toolbox__grip','ct-grip']);this._domElement.appendChild(this._domGrip);this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));this._domToolGroups=this.constructor.createDiv(['ct-tool-groups']);this._domElement.appendChild(this._domToolGroups);this.tools(this._tools);restore=window.localStorage.getItem('ct-toolbox-position');if(restore&&/^\d+,\d+$/.test(restore)){position=function(){var _i,_len,_ref,_results;_ref=restore.split(',');_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){coord=_ref[_i];_results.push(parseInt(coord));}return _results;}();this._domElement.style.left=""+position[0]+"px";this._domElement.style.top=""+position[1]+"px";this._contain();}return this._addDOMEventListeners();};ToolboxUI.prototype.tools=function(tools){var domToolGroup,i,tool,toolGroup,toolName,toolUI,_i,_len,_ref,_ref1,_results;if(tools===void 0){return this._tools;}this._tools=tools;if(!this.isMounted()){return;}_ref=this._toolUIs;for(toolName in _ref){toolUI=_ref[toolName];toolUI.unmount();}this._toolUIs={};while(this._domToolGroups.lastChild){this._domToolGroups.removeChild(this._domToolGroups.lastChild);}_ref1=this._tools;_results=[];for(i=_i=0,_len=_ref1.length;_i<_len;i=++_i){toolGroup=_ref1[i];domToolGroup=this.constructor.createDiv(['ct-tool-group']);this._domToolGroups.appendChild(domToolGroup);_results.push(function(){var _j,_len1,_results1;_results1=[];for(_j=0,_len1=toolGroup.length;_j<_len1;_j++){toolName=toolGroup[_j];tool=ContentTools.ToolShelf.fetch(toolName);this._toolUIs[toolName]=new ContentTools.ToolUI(tool);this._toolUIs[toolName].mount(domToolGroup);this._toolUIs[toolName].disabled(true);_results1.push(this._toolUIs[toolName].addEventListener('applied',function(_this){return function(){return _this.updateTools();};}(this)));}return _results1;}.call(this));}return _results;};ToolboxUI.prototype.updateTools=function(){var element,name,selection,toolUI,_ref,_results;element=ContentEdit.Root.get().focused();selection=null;if(element&&element.selection){selection=element.selection();}_ref=this._toolUIs;_results=[];for(name in _ref){toolUI=_ref[name];_results.push(toolUI.update(element,selection));}return _results;};ToolboxUI.prototype.unmount=function(){ToolboxUI.__super__.unmount.call(this);return this._domGrip=null;};ToolboxUI.prototype._addDOMEventListeners=function(){this._domGrip.addEventListener('mousedown',this._onStartDragging);this._handleResize=function(_this){return function(ev){var containResize;if(_this._resizeTimeout){clearTimeout(_this._resizeTimeout);}containResize=function containResize(){return _this._contain();};return _this._resizeTimeout=setTimeout(containResize,250);};}(this);window.addEventListener('resize',this._handleResize);this._updateTools=function(_this){return function(){var app,element,name,selection,toolUI,update,_ref,_results;app=ContentTools.EditorApp.get();update=false;element=ContentEdit.Root.get().focused();selection=null;if(element===_this._lastUpdateElement){if(element&&element.selection){selection=element.selection();if(_this._lastUpdateSelection){if(!selection.eq(_this._lastUpdateSelection)){update=true;}}else {update=true;}}}else {update=true;}if(app.history){if(_this._lastUpdateHistoryLength!==app.history.length()){update=true;}_this._lastUpdateHistoryLength=app.history.length();if(_this._lastUpdateHistoryIndex!==app.history.index()){update=true;}_this._lastUpdateHistoryIndex=app.history.index();}_this._lastUpdateElement=element;_this._lastUpdateSelection=selection;if(update){_ref=_this._toolUIs;_results=[];for(name in _ref){toolUI=_ref[name];_results.push(toolUI.update(element,selection));}return _results;}};}(this);this._updateToolsInterval=setInterval(this._updateTools,100);this._handleKeyDown=function(_this){return function(ev){var Paragraph,element,os,redo,undo,version;element=ContentEdit.Root.get().focused();if(element&&!element.content){if(ev.keyCode===46){ev.preventDefault();return ContentTools.Tools.Remove.apply(element,null,function(){});}if(ev.keyCode===13){ev.preventDefault();Paragraph=ContentTools.Tools.Paragraph;return Paragraph.apply(element,null,function(){});}}version=navigator.appVersion;os='linux';if(version.indexOf('Mac')!==-1){os='mac';}else if(version.indexOf('Win')!==-1){os='windows';}redo=false;undo=false;switch(os){case 'linux':if(ev.keyCode===90&&ev.ctrlKey){redo=ev.shiftKey;undo=!redo;}break;case 'mac':if(ev.keyCode===90&&ev.metaKey){redo=ev.shiftKey;undo=!redo;}break;case 'windows':if(ev.keyCode===89&&ev.ctrlKey){redo=true;}if(ev.keyCode===90&&ev.ctrlKey){undo=true;}}if(undo&&ContentTools.Tools.Undo.canApply(null,null)){ContentTools.Tools.Undo.apply(null,null,function(){});}if(redo&&ContentTools.Tools.Redo.canApply(null,null)){return ContentTools.Tools.Redo.apply(null,null,function(){});}};}(this);return window.addEventListener('keydown',this._handleKeyDown);};ToolboxUI.prototype._contain=function(){var rect;if(!this.isMounted()){return;}rect=this._domElement.getBoundingClientRect();if(rect.left+rect.width>window.innerWidth){this._domElement.style.left=""+(window.innerWidth-rect.width)+"px";}if(rect.top+rect.height>window.innerHeight){this._domElement.style.top=""+(window.innerHeight-rect.height)+"px";}if(rect.left<0){this._domElement.style.left='0px';}if(rect.top<0){this._domElement.style.top='0px';}rect=this._domElement.getBoundingClientRect();return window.localStorage.setItem('ct-toolbox-position',""+rect.left+","+rect.top);};ToolboxUI.prototype._removeDOMEventListeners=function(){if(this.isMounted()){this._domGrip.removeEventListener('mousedown',this._onStartDragging);}window.removeEventListener('keydown',this._handleKeyDown);window.removeEventListener('resize',this._handleResize);return clearInterval(this._updateToolsInterval);};ToolboxUI.prototype._onDrag=function(ev){ContentSelect.Range.unselectAll();this._domElement.style.left=""+(ev.clientX-this._draggingOffset.x)+"px";return this._domElement.style.top=""+(ev.clientY-this._draggingOffset.y)+"px";};ToolboxUI.prototype._onStartDragging=function(ev){var rect;ev.preventDefault();if(this.isDragging()){return;}this._dragging=true;this.addCSSClass('ct-toolbox--dragging');rect=this._domElement.getBoundingClientRect();this._draggingOffset={x:ev.clientX-rect.left,y:ev.clientY-rect.top};document.addEventListener('mousemove',this._onDrag);document.addEventListener('mouseup',this._onStopDragging);return ContentEdit.addCSSClass(document.body,'ce--dragging');};ToolboxUI.prototype._onStopDragging=function(ev){if(!this.isDragging()){return;}this._contain();document.removeEventListener('mousemove',this._onDrag);document.removeEventListener('mouseup',this._onStopDragging);this._draggingOffset=null;this._dragging=false;this.removeCSSClass('ct-toolbox--dragging');return ContentEdit.removeCSSClass(document.body,'ce--dragging');};return ToolboxUI;}(ContentTools.WidgetUI);ContentTools.ToolUI=function(_super){__extends(ToolUI,_super);function ToolUI(tool){this._onMouseUp=__bind(this._onMouseUp,this);this._onMouseLeave=__bind(this._onMouseLeave,this);this._onMouseDown=__bind(this._onMouseDown,this);this._addDOMEventListeners=__bind(this._addDOMEventListeners,this);ToolUI.__super__.constructor.call(this);this.tool=tool;this._mouseDown=false;this._disabled=false;}ToolUI.prototype.apply=function(element,selection){var callback,detail;if(!this.tool.canApply(element,selection)){return;}detail={'element':element,'selection':selection};callback=function(_this){return function(applied){if(applied){return _this.dispatchEvent(_this.createEvent('applied',detail));}};}(this);if(this.dispatchEvent(this.createEvent('apply',detail))){return this.tool.apply(element,selection,callback);}};ToolUI.prototype.disabled=function(disabledState){if(disabledState===void 0){return this._disabled;}if(this._disabled===disabledState){return;}this._disabled=disabledState;if(disabledState){this._mouseDown=false;this.addCSSClass('ct-tool--disabled');return this.removeCSSClass('ct-tool--applied');}else {return this.removeCSSClass('ct-tool--disabled');}};ToolUI.prototype.mount=function(domParent,before){if(before==null){before=null;}this._domElement=this.constructor.createDiv(['ct-tool',"ct-tool--"+this.tool.icon]);this._domElement.setAttribute('data-tooltip',ContentEdit._(this.tool.label));return ToolUI.__super__.mount.call(this,domParent,before);};ToolUI.prototype.update=function(element,selection){if(this.tool.requiresElement){if(!(element&&element.isMounted())){this.disabled(true);return;}}if(this.tool.canApply(element,selection)){this.disabled(false);}else {this.disabled(true);return;}if(this.tool.isApplied(element,selection)){return this.addCSSClass('ct-tool--applied');}else {return this.removeCSSClass('ct-tool--applied');}};ToolUI.prototype._addDOMEventListeners=function(){this._domElement.addEventListener('mousedown',this._onMouseDown);this._domElement.addEventListener('mouseleave',this._onMouseLeave);return this._domElement.addEventListener('mouseup',this._onMouseUp);};ToolUI.prototype._onMouseDown=function(ev){ev.preventDefault();if(this.disabled()){return;}this._mouseDown=true;return this.addCSSClass('ct-tool--down');};ToolUI.prototype._onMouseLeave=function(ev){this._mouseDown=false;return this.removeCSSClass('ct-tool--down');};ToolUI.prototype._onMouseUp=function(ev){var element,selection;if(this._mouseDown){element=ContentEdit.Root.get().focused();if(this.tool.requiresElement){if(!(element&&element.isMounted())){return;}}selection=null;if(element&&element.selection){selection=element.selection();}this.apply(element,selection);}this._mouseDown=false;return this.removeCSSClass('ct-tool--down');};return ToolUI;}(ContentTools.AnchoredComponentUI);ContentTools.AnchoredDialogUI=function(_super){__extends(AnchoredDialogUI,_super);function AnchoredDialogUI(){AnchoredDialogUI.__super__.constructor.call(this);this._position=[0,0];}AnchoredDialogUI.prototype.mount=function(){this._domElement=this.constructor.createDiv(['ct-widget','ct-anchored-dialog']);this.parent().domElement().appendChild(this._domElement);this._domElement.style.top=""+this._position[1]+"px";return this._domElement.style.left=""+this._position[0]+"px";};AnchoredDialogUI.prototype.position=function(newPosition){if(newPosition===void 0){return this._position.slice();}this._position=newPosition.slice();if(this.isMounted()){this._domElement.style.top=""+this._position[1]+"px";return this._domElement.style.left=""+this._position[0]+"px";}};return AnchoredDialogUI;}(ContentTools.WidgetUI);ContentTools.DialogUI=function(_super){__extends(DialogUI,_super);function DialogUI(caption){if(caption==null){caption='';}DialogUI.__super__.constructor.call(this);this._busy=false;this._caption=caption;}DialogUI.prototype.busy=function(busy){if(busy===void 0){return this._busy;}if(this._busy===busy){return;}this._busy=busy;if(!this.isMounted()){return;}if(this._busy){return ContentEdit.addCSSClass(this._domElement,'ct-dialog--busy');}else {return ContentEdit.removeCSSClass(this._domElement,'ct-dialog--busy');}};DialogUI.prototype.caption=function(caption){if(caption===void 0){return this._caption;}this._caption=caption;return this._domCaption.textContent=ContentEdit._(caption);};DialogUI.prototype.mount=function(){var dialogCSSClasses,domBody,domHeader;if(!!window.MSInputMethodContext&&!!document.documentMode){if(document.activeElement){document.activeElement.blur();}}dialogCSSClasses=['ct-widget','ct-dialog'];if(this._busy){dialogCSSClasses.push('ct-dialog--busy');}this._domElement=this.constructor.createDiv(dialogCSSClasses);this.parent().domElement().appendChild(this._domElement);domHeader=this.constructor.createDiv(['ct-dialog__header']);this._domElement.appendChild(domHeader);this._domCaption=this.constructor.createDiv(['ct-dialog__caption']);domHeader.appendChild(this._domCaption);this.caption(this._caption);this._domClose=this.constructor.createDiv(['ct-dialog__close']);domHeader.appendChild(this._domClose);domBody=this.constructor.createDiv(['ct-dialog__body']);this._domElement.appendChild(domBody);this._domView=this.constructor.createDiv(['ct-dialog__view']);domBody.appendChild(this._domView);this._domControls=this.constructor.createDiv(['ct-dialog__controls']);domBody.appendChild(this._domControls);this._domBusy=this.constructor.createDiv(['ct-dialog__busy']);return this._domElement.appendChild(this._domBusy);};DialogUI.prototype.unmount=function(){DialogUI.__super__.unmount.call(this);this._domBusy=null;this._domCaption=null;this._domClose=null;this._domControls=null;return this._domView=null;};DialogUI.prototype._addDOMEventListeners=function(){this._handleEscape=function(_this){return function(ev){if(_this._busy){return;}if(ev.keyCode===27){return _this.dispatchEvent(_this.createEvent('cancel'));}};}(this);document.addEventListener('keyup',this._handleEscape);return this._domClose.addEventListener('click',function(_this){return function(ev){ev.preventDefault();if(_this._busy){return;}return _this.dispatchEvent(_this.createEvent('cancel'));};}(this));};DialogUI.prototype._removeDOMEventListeners=function(){return document.removeEventListener('keyup',this._handleEscape);};return DialogUI;}(ContentTools.WidgetUI);ContentTools.ImageDialog=function(_super){__extends(ImageDialog,_super);function ImageDialog(){ImageDialog.__super__.constructor.call(this,'Insert image');this._cropMarks=null;this._imageURL=null;this._imageSize=null;this._progress=0;this._state='empty';if(ContentTools.IMAGE_UPLOADER){ContentTools.IMAGE_UPLOADER(this);}}ImageDialog.prototype.cropRegion=function(){if(this._cropMarks){return this._cropMarks.region();}return [0,0,1,1];};ImageDialog.prototype.addCropMarks=function(){if(this._cropMarks){return;}this._cropMarks=new CropMarksUI(this._imageSize);this._cropMarks.mount(this._domView);return ContentEdit.addCSSClass(this._domCrop,'ct-control--active');};ImageDialog.prototype.clear=function(){if(this._domImage){this._domImage.parentNode.removeChild(this._domImage);this._domImage=null;}this._imageURL=null;this._imageSize=null;return this.state('empty');};ImageDialog.prototype.mount=function(){var domActions,domProgressBar,domTools;ImageDialog.__super__.mount.call(this);ContentEdit.addCSSClass(this._domElement,'ct-image-dialog');ContentEdit.addCSSClass(this._domElement,'ct-image-dialog--empty');ContentEdit.addCSSClass(this._domView,'ct-image-dialog__view');domTools=this.constructor.createDiv(['ct-control-group','ct-control-group--left']);this._domControls.appendChild(domTools);this._domRotateCCW=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--rotate-ccw']);this._domRotateCCW.setAttribute('data-tooltip',ContentEdit._('Rotate')+' -90°');domTools.appendChild(this._domRotateCCW);this._domRotateCW=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--rotate-cw']);this._domRotateCW.setAttribute('data-tooltip',ContentEdit._('Rotate')+' 90°');domTools.appendChild(this._domRotateCW);this._domCrop=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--crop']);this._domCrop.setAttribute('data-tooltip',ContentEdit._('Crop marks'));domTools.appendChild(this._domCrop);domProgressBar=this.constructor.createDiv(['ct-progress-bar']);domTools.appendChild(domProgressBar);this._domProgress=this.constructor.createDiv(['ct-progress-bar__progress']);domProgressBar.appendChild(this._domProgress);domActions=this.constructor.createDiv(['ct-control-group','ct-control-group--right']);this._domControls.appendChild(domActions);this._domUpload=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--upload']);this._domUpload.textContent=ContentEdit._('Upload');domActions.appendChild(this._domUpload);this._domInput=document.createElement('input');this._domInput.setAttribute('class','ct-image-dialog__file-upload');this._domInput.setAttribute('name','file');this._domInput.setAttribute('type','file');this._domInput.setAttribute('accept','image/*');this._domUpload.appendChild(this._domInput);this._domInsert=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--insert']);this._domInsert.textContent=ContentEdit._('Insert');domActions.appendChild(this._domInsert);this._domCancelUpload=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--cancel']);this._domCancelUpload.textContent=ContentEdit._('Cancel');domActions.appendChild(this._domCancelUpload);this._domClear=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--clear']);this._domClear.textContent=ContentEdit._('Clear');domActions.appendChild(this._domClear);this._addDOMEventListeners();return this.dispatchEvent(this.createEvent('imageuploader.mount'));};ImageDialog.prototype.populate=function(imageURL,imageSize){this._imageURL=imageURL;this._imageSize=imageSize;if(!this._domImage){this._domImage=this.constructor.createDiv(['ct-image-dialog__image']);this._domView.appendChild(this._domImage);}this._domImage.style['background-image']="url("+imageURL+")";return this.state('populated');};ImageDialog.prototype.progress=function(progress){if(progress===void 0){return this._progress;}this._progress=progress;if(!this.isMounted()){return;}return this._domProgress.style.width=""+this._progress+"%";};ImageDialog.prototype.removeCropMarks=function(){if(!this._cropMarks){return;}this._cropMarks.unmount();this._cropMarks=null;return ContentEdit.removeCSSClass(this._domCrop,'ct-control--active');};ImageDialog.prototype.save=function(imageURL,imageSize,imageAttrs){return this.dispatchEvent(this.createEvent('save',{'imageURL':imageURL,'imageSize':imageSize,'imageAttrs':imageAttrs}));};ImageDialog.prototype.state=function(state){var prevState;if(state===void 0){return this._state;}if(this._state===state){return;}prevState=this._state;this._state=state;if(!this.isMounted()){return;}ContentEdit.addCSSClass(this._domElement,"ct-image-dialog--"+this._state);return ContentEdit.removeCSSClass(this._domElement,"ct-image-dialog--"+prevState);};ImageDialog.prototype.unmount=function(){ImageDialog.__super__.unmount.call(this);this._domCancelUpload=null;this._domClear=null;this._domCrop=null;this._domInput=null;this._domInsert=null;this._domProgress=null;this._domRotateCCW=null;this._domRotateCW=null;this._domUpload=null;return this.dispatchEvent(this.createEvent('imageuploader.unmount'));};ImageDialog.prototype._addDOMEventListeners=function(){ImageDialog.__super__._addDOMEventListeners.call(this);this._domInput.addEventListener('change',function(_this){return function(ev){var file;file=ev.target.files[0];ev.target.value='';if(ev.target.value){ev.target.type='text';ev.target.type='file';}return _this.dispatchEvent(_this.createEvent('imageuploader.fileready',{file:file}));};}(this));this._domCancelUpload.addEventListener('click',function(_this){return function(ev){return _this.dispatchEvent(_this.createEvent('imageuploader.cancelupload'));};}(this));this._domClear.addEventListener('click',function(_this){return function(ev){_this.removeCropMarks();return _this.dispatchEvent(_this.createEvent('imageuploader.clear'));};}(this));this._domRotateCCW.addEventListener('click',function(_this){return function(ev){_this.removeCropMarks();return _this.dispatchEvent(_this.createEvent('imageuploader.rotateccw'));};}(this));this._domRotateCW.addEventListener('click',function(_this){return function(ev){_this.removeCropMarks();return _this.dispatchEvent(_this.createEvent('imageuploader.rotatecw'));};}(this));this._domCrop.addEventListener('click',function(_this){return function(ev){if(_this._cropMarks){return _this.removeCropMarks();}else {return _this.addCropMarks();}};}(this));return this._domInsert.addEventListener('click',function(_this){return function(ev){return _this.dispatchEvent(_this.createEvent('imageuploader.save'));};}(this));};return ImageDialog;}(ContentTools.DialogUI);CropMarksUI=function(_super){__extends(CropMarksUI,_super);function CropMarksUI(imageSize){CropMarksUI.__super__.constructor.call(this);this._bounds=null;this._dragging=null;this._draggingOrigin=null;this._imageSize=imageSize;}CropMarksUI.prototype.mount=function(domParent,before){if(before==null){before=null;}this._domElement=this.constructor.createDiv(['ct-crop-marks']);this._domClipper=this.constructor.createDiv(['ct-crop-marks__clipper']);this._domElement.appendChild(this._domClipper);this._domRulers=[this.constructor.createDiv(['ct-crop-marks__ruler','ct-crop-marks__ruler--top-left']),this.constructor.createDiv(['ct-crop-marks__ruler','ct-crop-marks__ruler--bottom-right'])];this._domClipper.appendChild(this._domRulers[0]);this._domClipper.appendChild(this._domRulers[1]);this._domHandles=[this.constructor.createDiv(['ct-crop-marks__handle','ct-crop-marks__handle--top-left']),this.constructor.createDiv(['ct-crop-marks__handle','ct-crop-marks__handle--bottom-right'])];this._domElement.appendChild(this._domHandles[0]);this._domElement.appendChild(this._domHandles[1]);CropMarksUI.__super__.mount.call(this,domParent,before);return this._fit(domParent);};CropMarksUI.prototype.region=function(){return [parseFloat(this._domHandles[0].style.top)/this._bounds[1],parseFloat(this._domHandles[0].style.left)/this._bounds[0],parseFloat(this._domHandles[1].style.top)/this._bounds[1],parseFloat(this._domHandles[1].style.left)/this._bounds[0]];};CropMarksUI.prototype.unmount=function(){CropMarksUI.__super__.unmount.call(this);this._domClipper=null;this._domHandles=null;return this._domRulers=null;};CropMarksUI.prototype._addDOMEventListeners=function(){CropMarksUI.__super__._addDOMEventListeners.call(this);this._domHandles[0].addEventListener('mousedown',function(_this){return function(ev){if(ev.button===0){return _this._startDrag(0,ev.clientY,ev.clientX);}};}(this));return this._domHandles[1].addEventListener('mousedown',function(_this){return function(ev){if(ev.button===0){return _this._startDrag(1,ev.clientY,ev.clientX);}};}(this));};CropMarksUI.prototype._drag=function(top,left){var height,minCrop,offsetLeft,offsetTop,width;if(this._dragging===null){return;}ContentSelect.Range.unselectAll();offsetTop=top-this._draggingOrigin[1];offsetLeft=left-this._draggingOrigin[0];height=this._bounds[1];left=0;top=0;width=this._bounds[0];minCrop=Math.min(Math.min(ContentTools.MIN_CROP,height),width);if(this._dragging===0){height=parseInt(this._domHandles[1].style.top)-minCrop;width=parseInt(this._domHandles[1].style.left)-minCrop;}else {left=parseInt(this._domHandles[0].style.left)+minCrop;top=parseInt(this._domHandles[0].style.top)+minCrop;}offsetTop=Math.min(Math.max(top,offsetTop),height);offsetLeft=Math.min(Math.max(left,offsetLeft),width);this._domHandles[this._dragging].style.top=""+offsetTop+"px";this._domHandles[this._dragging].style.left=""+offsetLeft+"px";this._domRulers[this._dragging].style.top=""+offsetTop+"px";return this._domRulers[this._dragging].style.left=""+offsetLeft+"px";};CropMarksUI.prototype._fit=function(domParent){var height,heightScale,left,ratio,rect,top,width,widthScale;rect=domParent.getBoundingClientRect();widthScale=rect.width/this._imageSize[0];heightScale=rect.height/this._imageSize[1];ratio=Math.min(widthScale,heightScale);width=ratio*this._imageSize[0];height=ratio*this._imageSize[1];left=(rect.width-width)/2;top=(rect.height-height)/2;this._domElement.style.width=""+width+"px";this._domElement.style.height=""+height+"px";this._domElement.style.top=""+top+"px";this._domElement.style.left=""+left+"px";this._domHandles[0].style.top='0px';this._domHandles[0].style.left='0px';this._domHandles[1].style.top=""+height+"px";this._domHandles[1].style.left=""+width+"px";this._domRulers[0].style.top='0px';this._domRulers[0].style.left='0px';this._domRulers[1].style.top=""+height+"px";this._domRulers[1].style.left=""+width+"px";return this._bounds=[width,height];};CropMarksUI.prototype._startDrag=function(handleIndex,top,left){var domHandle;domHandle=this._domHandles[handleIndex];this._dragging=handleIndex;this._draggingOrigin=[left-parseInt(domHandle.style.left),top-parseInt(domHandle.style.top)];this._onMouseMove=function(_this){return function(ev){return _this._drag(ev.clientY,ev.clientX);};}(this);document.addEventListener('mousemove',this._onMouseMove);this._onMouseUp=function(_this){return function(ev){return _this._stopDrag();};}(this);return document.addEventListener('mouseup',this._onMouseUp);};CropMarksUI.prototype._stopDrag=function(){document.removeEventListener('mousemove',this._onMouseMove);document.removeEventListener('mouseup',this._onMouseUp);this._dragging=null;return this._draggingOrigin=null;};return CropMarksUI;}(ContentTools.AnchoredComponentUI);ContentTools.LinkDialog=function(_super){var NEW_WINDOW_TARGET;__extends(LinkDialog,_super);NEW_WINDOW_TARGET='_blank';function LinkDialog(href,target){if(href==null){href='';}if(target==null){target='';}LinkDialog.__super__.constructor.call(this);this._href=href;this._target=target;}LinkDialog.prototype.mount=function(){LinkDialog.__super__.mount.call(this);this._domInput=document.createElement('input');this._domInput.setAttribute('class','ct-anchored-dialog__input');this._domInput.setAttribute('name','href');this._domInput.setAttribute('placeholder',ContentEdit._('Enter a link')+'...');this._domInput.setAttribute('type','text');this._domInput.setAttribute('value',this._href);this._domElement.appendChild(this._domInput);this._domTargetButton=this.constructor.createDiv(['ct-anchored-dialog__target-button']);this._domElement.appendChild(this._domTargetButton);if(this._target===NEW_WINDOW_TARGET){ContentEdit.addCSSClass(this._domTargetButton,'ct-anchored-dialog__target-button--active');}this._domButton=this.constructor.createDiv(['ct-anchored-dialog__button']);this._domElement.appendChild(this._domButton);return this._addDOMEventListeners();};LinkDialog.prototype.save=function(){var detail;if(!this.isMounted()){this.dispatchEvent(this.createEvent('save'));return;}detail={href:this._domInput.value.trim()};if(this._target){detail.target=this._target;}return this.dispatchEvent(this.createEvent('save',detail));};LinkDialog.prototype.show=function(){LinkDialog.__super__.show.call(this);this._domInput.focus();if(this._href){return this._domInput.select();}};LinkDialog.prototype.unmount=function(){if(this.isMounted()){this._domInput.blur();}LinkDialog.__super__.unmount.call(this);this._domButton=null;return this._domInput=null;};LinkDialog.prototype._addDOMEventListeners=function(){this._domInput.addEventListener('keypress',function(_this){return function(ev){if(ev.keyCode===13){return _this.save();}};}(this));this._domTargetButton.addEventListener('click',function(_this){return function(ev){ev.preventDefault();if(_this._target===NEW_WINDOW_TARGET){_this._target='';return ContentEdit.removeCSSClass(_this._domTargetButton,'ct-anchored-dialog__target-button--active');}else {_this._target=NEW_WINDOW_TARGET;return ContentEdit.addCSSClass(_this._domTargetButton,'ct-anchored-dialog__target-button--active');}};}(this));return this._domButton.addEventListener('click',function(_this){return function(ev){ev.preventDefault();return _this.save();};}(this));};return LinkDialog;}(ContentTools.AnchoredDialogUI);ContentTools.PropertiesDialog=function(_super){__extends(PropertiesDialog,_super);function PropertiesDialog(element){var _ref;this.element=element;PropertiesDialog.__super__.constructor.call(this,'Properties');this._attributeUIs=[];this._focusedAttributeUI=null;this._styleUIs=[];this._supportsCoding=this.element.content;if((_ref=this.element.type())==='ListItem'||_ref==='TableCell'){this._supportsCoding=true;}}PropertiesDialog.prototype.caption=function(caption){if(caption===void 0){return this._caption;}this._caption=caption;return this._domCaption.textContent=ContentEdit._(caption)+(": "+this.element.tagName());};PropertiesDialog.prototype.changedAttributes=function(){var attributeUI,attributes,changedAttributes,name,restricted,value,_i,_len,_ref,_ref1;attributes={};changedAttributes={};_ref=this._attributeUIs;for(_i=0,_len=_ref.length;_i<_len;_i++){attributeUI=_ref[_i];name=attributeUI.name();value=attributeUI.value();if(name===''){continue;}attributes[name.toLowerCase()]=true;if(this.element.attr(name)!==value){changedAttributes[name]=value;}}restricted=ContentTools.getRestrictedAtributes(this.element.tagName());_ref1=this.element.attributes();for(name in _ref1){value=_ref1[name];if(restricted&&restricted.indexOf(name.toLowerCase())!==-1){continue;}if(attributes[name]===void 0){changedAttributes[name]=null;}}return changedAttributes;};PropertiesDialog.prototype.changedStyles=function(){var cssClass,styleUI,styles,_i,_len,_ref;styles={};_ref=this._styleUIs;for(_i=0,_len=_ref.length;_i<_len;_i++){styleUI=_ref[_i];cssClass=styleUI.style.cssClass();if(this.element.hasCSSClass(cssClass)!==styleUI.applied()){styles[cssClass]=styleUI.applied();}}return styles;};PropertiesDialog.prototype.getElementInnerHTML=function(){if(!this._supportsCoding){return null;}if(this.element.content){return this.element.content.html();}return this.element.children[0].content.html();};PropertiesDialog.prototype.mount=function(){var attributeNames,attributes,domActions,domTabs,lastTab,name,restricted,style,styleUI,value,_i,_j,_len,_len1,_ref;PropertiesDialog.__super__.mount.call(this);ContentEdit.addCSSClass(this._domElement,'ct-properties-dialog');ContentEdit.addCSSClass(this._domView,'ct-properties-dialog__view');this._domStyles=this.constructor.createDiv(['ct-properties-dialog__styles']);this._domStyles.setAttribute('data-ct-empty',ContentEdit._('No styles available for this tag'));this._domView.appendChild(this._domStyles);_ref=ContentTools.StylePalette.styles(this.element);for(_i=0,_len=_ref.length;_i<_len;_i++){style=_ref[_i];styleUI=new StyleUI(style,this.element.hasCSSClass(style.cssClass()));this._styleUIs.push(styleUI);styleUI.mount(this._domStyles);}this._domAttributes=this.constructor.createDiv(['ct-properties-dialog__attributes']);this._domView.appendChild(this._domAttributes);restricted=ContentTools.getRestrictedAtributes(this.element.tagName());attributes=this.element.attributes();attributeNames=[];for(name in attributes){value=attributes[name];if(restricted&&restricted.indexOf(name.toLowerCase())!==-1){continue;}attributeNames.push(name);}attributeNames.sort();for(_j=0,_len1=attributeNames.length;_j<_len1;_j++){name=attributeNames[_j];value=attributes[name];this._addAttributeUI(name,value);}this._addAttributeUI('','');this._domCode=this.constructor.createDiv(['ct-properties-dialog__code']);this._domView.appendChild(this._domCode);this._domInnerHTML=document.createElement('textarea');this._domInnerHTML.setAttribute('class','ct-properties-dialog__inner-html');this._domInnerHTML.setAttribute('name','code');this._domInnerHTML.value=this.getElementInnerHTML();this._domCode.appendChild(this._domInnerHTML);domTabs=this.constructor.createDiv(['ct-control-group','ct-control-group--left']);this._domControls.appendChild(domTabs);this._domStylesTab=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--styles']);this._domStylesTab.setAttribute('data-tooltip',ContentEdit._('Styles'));domTabs.appendChild(this._domStylesTab);this._domAttributesTab=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--attributes']);this._domAttributesTab.setAttribute('data-tooltip',ContentEdit._('Attributes'));domTabs.appendChild(this._domAttributesTab);this._domCodeTab=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--code']);this._domCodeTab.setAttribute('data-tooltip',ContentEdit._('Code'));domTabs.appendChild(this._domCodeTab);if(!this._supportsCoding){ContentEdit.addCSSClass(this._domCodeTab,'ct-control--muted');}this._domRemoveAttribute=this.constructor.createDiv(['ct-control','ct-control--icon','ct-control--remove','ct-control--muted']);this._domRemoveAttribute.setAttribute('data-tooltip',ContentEdit._('Remove'));domTabs.appendChild(this._domRemoveAttribute);domActions=this.constructor.createDiv(['ct-control-group','ct-control-group--right']);this._domControls.appendChild(domActions);this._domApply=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--apply']);this._domApply.textContent=ContentEdit._('Apply');domActions.appendChild(this._domApply);lastTab=window.localStorage.getItem('ct-properties-dialog-tab');if(lastTab==='attributes'){ContentEdit.addCSSClass(this._domElement,'ct-properties-dialog--attributes');ContentEdit.addCSSClass(this._domAttributesTab,'ct-control--active');}else if(lastTab==='code'&&this._supportsCoding){ContentEdit.addCSSClass(this._domElement,'ct-properties-dialog--code');ContentEdit.addCSSClass(this._domCodeTab,'ct-control--active');}else {ContentEdit.addCSSClass(this._domElement,'ct-properties-dialog--styles');ContentEdit.addCSSClass(this._domStylesTab,'ct-control--active');}return this._addDOMEventListeners();};PropertiesDialog.prototype.save=function(){var detail,innerHTML;innerHTML=null;if(this._supportsCoding){innerHTML=this._domInnerHTML.value;}detail={changedAttributes:this.changedAttributes(),changedStyles:this.changedStyles(),innerHTML:innerHTML};return this.dispatchEvent(this.createEvent('save',detail));};PropertiesDialog.prototype._addAttributeUI=function(name,value){var attributeUI,dialog;dialog=this;attributeUI=new AttributeUI(name,value);this._attributeUIs.push(attributeUI);attributeUI.addEventListener('blur',function(ev){var index,lastAttributeUI,length;dialog._focusedAttributeUI=null;ContentEdit.addCSSClass(dialog._domRemoveAttribute,'ct-control--muted');index=dialog._attributeUIs.indexOf(this);length=dialog._attributeUIs.length;if(this.name()===''&&index<length-1){this.unmount();dialog._attributeUIs.splice(index,1);}lastAttributeUI=dialog._attributeUIs[length-1];if(lastAttributeUI){if(lastAttributeUI.name()&&lastAttributeUI.value()){return dialog._addAttributeUI('','');}}});attributeUI.addEventListener('focus',function(ev){dialog._focusedAttributeUI=this;return ContentEdit.removeCSSClass(dialog._domRemoveAttribute,'ct-control--muted');});attributeUI.addEventListener('namechange',function(ev){var element,otherAttributeUI,restricted,valid,_i,_len,_ref;element=dialog.element;name=this.name().toLowerCase();restricted=ContentTools.getRestrictedAtributes(element.tagName());valid=true;if(restricted&&restricted.indexOf(name)!==-1){valid=false;}_ref=dialog._attributeUIs;for(_i=0,_len=_ref.length;_i<_len;_i++){otherAttributeUI=_ref[_i];if(name===''){continue;}if(otherAttributeUI===this){continue;}if(otherAttributeUI.name().toLowerCase()!==name){continue;}valid=false;}this.valid(valid);if(valid){return ContentEdit.removeCSSClass(dialog._domApply,'ct-control--muted');}else {return ContentEdit.addCSSClass(dialog._domApply,'ct-control--muted');}});attributeUI.mount(this._domAttributes);return attributeUI;};PropertiesDialog.prototype._addDOMEventListeners=function(){var selectTab,validateCode;PropertiesDialog.__super__._addDOMEventListeners.call(this);selectTab=function(_this){return function(selected){var selectedCap,tab,tabCap,tabs,_i,_len;tabs=['attributes','code','styles'];for(_i=0,_len=tabs.length;_i<_len;_i++){tab=tabs[_i];if(tab===selected){continue;}tabCap=tab.charAt(0).toUpperCase()+tab.slice(1);ContentEdit.removeCSSClass(_this._domElement,"ct-properties-dialog--"+tab);ContentEdit.removeCSSClass(_this["_dom"+tabCap+"Tab"],'ct-control--active');}selectedCap=selected.charAt(0).toUpperCase()+selected.slice(1);ContentEdit.addCSSClass(_this._domElement,"ct-properties-dialog--"+selected);ContentEdit.addCSSClass(_this["_dom"+selectedCap+"Tab"],'ct-control--active');return window.localStorage.setItem('ct-properties-dialog-tab',selected);};}(this);this._domStylesTab.addEventListener('mousedown',function(_this){return function(){return selectTab('styles');};}(this));this._domAttributesTab.addEventListener('mousedown',function(_this){return function(){return selectTab('attributes');};}(this));if(this._supportsCoding){this._domCodeTab.addEventListener('mousedown',function(_this){return function(){return selectTab('code');};}(this));}this._domRemoveAttribute.addEventListener('mousedown',function(_this){return function(ev){var index,last;ev.preventDefault();if(_this._focusedAttributeUI){index=_this._attributeUIs.indexOf(_this._focusedAttributeUI);last=index===_this._attributeUIs.length-1;_this._focusedAttributeUI.unmount();_this._attributeUIs.splice(index,1);if(last){return _this._addAttributeUI('','');}}};}(this));validateCode=function(_this){return function(ev){var content;try{content=new HTMLString.String(_this._domInnerHTML.value);ContentEdit.removeCSSClass(_this._domInnerHTML,'ct-properties-dialog__inner-html--invalid');return ContentEdit.removeCSSClass(_this._domApply,'ct-control--muted');}catch(_error){ContentEdit.addCSSClass(_this._domInnerHTML,'ct-properties-dialog__inner-html--invalid');return ContentEdit.addCSSClass(_this._domApply,'ct-control--muted');}};}(this);this._domInnerHTML.addEventListener('input',validateCode);this._domInnerHTML.addEventListener('propertychange',validateCode);return this._domApply.addEventListener('click',function(_this){return function(ev){var cssClass;ev.preventDefault();cssClass=_this._domApply.getAttribute('class');if(cssClass.indexOf('ct-control--muted')===-1){return _this.save();}};}(this));};return PropertiesDialog;}(ContentTools.DialogUI);StyleUI=function(_super){__extends(StyleUI,_super);function StyleUI(style,applied){this.style=style;StyleUI.__super__.constructor.call(this);this._applied=applied;}StyleUI.prototype.applied=function(applied){if(applied===void 0){return this._applied;}if(this._applied===applied){return;}this._applied=applied;if(this._applied){return ContentEdit.addCSSClass(this._domElement,'ct-section--applied');}else {return ContentEdit.removeCSSClass(this._domElement,'ct-section--applied');}};StyleUI.prototype.mount=function(domParent,before){var label;if(before==null){before=null;}this._domElement=this.constructor.createDiv(['ct-section']);if(this._applied){ContentEdit.addCSSClass(this._domElement,'ct-section--applied');}label=this.constructor.createDiv(['ct-section__label']);label.textContent=this.style.name();this._domElement.appendChild(label);this._domElement.appendChild(this.constructor.createDiv(['ct-section__switch']));return StyleUI.__super__.mount.call(this,domParent,before);};StyleUI.prototype._addDOMEventListeners=function(){var toggleSection;toggleSection=function(_this){return function(ev){ev.preventDefault();if(_this.applied()){return _this.applied(false);}else {return _this.applied(true);}};}(this);return this._domElement.addEventListener('click',toggleSection);};return StyleUI;}(ContentTools.AnchoredComponentUI);AttributeUI=function(_super){__extends(AttributeUI,_super);function AttributeUI(name,value){AttributeUI.__super__.constructor.call(this);this._initialName=name;this._initialValue=value;}AttributeUI.prototype.name=function(){return this._domName.value.trim();};AttributeUI.prototype.value=function(){return this._domValue.value.trim();};AttributeUI.prototype.mount=function(domParent,before){if(before==null){before=null;}this._domElement=this.constructor.createDiv(['ct-attribute']);this._domName=document.createElement('input');this._domName.setAttribute('class','ct-attribute__name');this._domName.setAttribute('name','name');this._domName.setAttribute('placeholder',ContentEdit._('Name'));this._domName.setAttribute('type','text');this._domName.setAttribute('value',this._initialName);this._domElement.appendChild(this._domName);this._domValue=document.createElement('input');this._domValue.setAttribute('class','ct-attribute__value');this._domValue.setAttribute('name','value');this._domValue.setAttribute('placeholder',ContentEdit._('Value'));this._domValue.setAttribute('type','text');this._domValue.setAttribute('value',this._initialValue);this._domElement.appendChild(this._domValue);return AttributeUI.__super__.mount.call(this,domParent,before);};AttributeUI.prototype.valid=function(valid){if(valid){return ContentEdit.removeCSSClass(this._domName,'ct-attribute__name--invalid');}else {return ContentEdit.addCSSClass(this._domName,'ct-attribute__name--invalid');}};AttributeUI.prototype._addDOMEventListeners=function(){this._domName.addEventListener('blur',function(_this){return function(){var name,nextDomAttribute,nextNameDom;name=_this.name();nextDomAttribute=_this._domElement.nextSibling;_this.dispatchEvent(_this.createEvent('blur'));if(name===''&&nextDomAttribute){nextNameDom=nextDomAttribute.querySelector('.ct-attribute__name');return nextNameDom.focus();}};}(this));this._domName.addEventListener('focus',function(_this){return function(){return _this.dispatchEvent(_this.createEvent('focus'));};}(this));this._domName.addEventListener('input',function(_this){return function(){return _this.dispatchEvent(_this.createEvent('namechange'));};}(this));this._domName.addEventListener('keydown',function(_this){return function(ev){if(ev.keyCode===13){return _this._domValue.focus();}};}(this));this._domValue.addEventListener('blur',function(_this){return function(){return _this.dispatchEvent(_this.createEvent('blur'));};}(this));this._domValue.addEventListener('focus',function(_this){return function(){return _this.dispatchEvent(_this.createEvent('focus'));};}(this));return this._domValue.addEventListener('keydown',function(_this){return function(ev){var nextDomAttribute,nextNameDom;if(ev.keyCode!==13&&(ev.keyCode!==9||ev.shiftKey)){return;}ev.preventDefault();nextDomAttribute=_this._domElement.nextSibling;if(!nextDomAttribute){_this._domValue.blur();nextDomAttribute=_this._domElement.nextSibling;}if(nextDomAttribute){nextNameDom=nextDomAttribute.querySelector('.ct-attribute__name');return nextNameDom.focus();}};}(this));};return AttributeUI;}(ContentTools.AnchoredComponentUI);ContentTools.TableDialog=function(_super){__extends(TableDialog,_super);function TableDialog(table){this.table=table;if(this.table){TableDialog.__super__.constructor.call(this,'Update table');}else {TableDialog.__super__.constructor.call(this,'Insert table');}}TableDialog.prototype.mount=function(){var cfg,domBodyLabel,domControlGroup,domFootLabel,domHeadLabel,footCSSClasses,headCSSClasses;TableDialog.__super__.mount.call(this);cfg={columns:3,foot:false,head:true};if(this.table){cfg={columns:this.table.firstSection().children[0].children.length,foot:this.table.tfoot(),head:this.table.thead()};}ContentEdit.addCSSClass(this._domElement,'ct-table-dialog');ContentEdit.addCSSClass(this._domView,'ct-table-dialog__view');headCSSClasses=['ct-section'];if(cfg.head){headCSSClasses.push('ct-section--applied');}this._domHeadSection=this.constructor.createDiv(headCSSClasses);this._domView.appendChild(this._domHeadSection);domHeadLabel=this.constructor.createDiv(['ct-section__label']);domHeadLabel.textContent=ContentEdit._('Table head');this._domHeadSection.appendChild(domHeadLabel);this._domHeadSwitch=this.constructor.createDiv(['ct-section__switch']);this._domHeadSection.appendChild(this._domHeadSwitch);this._domBodySection=this.constructor.createDiv(['ct-section','ct-section--applied','ct-section--contains-input']);this._domView.appendChild(this._domBodySection);domBodyLabel=this.constructor.createDiv(['ct-section__label']);domBodyLabel.textContent=ContentEdit._('Table body (columns)');this._domBodySection.appendChild(domBodyLabel);this._domBodyInput=document.createElement('input');this._domBodyInput.setAttribute('class','ct-section__input');this._domBodyInput.setAttribute('maxlength','2');this._domBodyInput.setAttribute('name','columns');this._domBodyInput.setAttribute('type','text');this._domBodyInput.setAttribute('value',cfg.columns);this._domBodySection.appendChild(this._domBodyInput);footCSSClasses=['ct-section'];if(cfg.foot){footCSSClasses.push('ct-section--applied');}this._domFootSection=this.constructor.createDiv(footCSSClasses);this._domView.appendChild(this._domFootSection);domFootLabel=this.constructor.createDiv(['ct-section__label']);domFootLabel.textContent=ContentEdit._('Table foot');this._domFootSection.appendChild(domFootLabel);this._domFootSwitch=this.constructor.createDiv(['ct-section__switch']);this._domFootSection.appendChild(this._domFootSwitch);domControlGroup=this.constructor.createDiv(['ct-control-group','ct-control-group--right']);this._domControls.appendChild(domControlGroup);this._domApply=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--apply']);this._domApply.textContent='Apply';domControlGroup.appendChild(this._domApply);return this._addDOMEventListeners();};TableDialog.prototype.save=function(){var detail,footCSSClass,headCSSClass;footCSSClass=this._domFootSection.getAttribute('class');headCSSClass=this._domHeadSection.getAttribute('class');detail={columns:parseInt(this._domBodyInput.value),foot:footCSSClass.indexOf('ct-section--applied')>-1,head:headCSSClass.indexOf('ct-section--applied')>-1};return this.dispatchEvent(this.createEvent('save',detail));};TableDialog.prototype.unmount=function(){TableDialog.__super__.unmount.call(this);this._domBodyInput=null;this._domBodySection=null;this._domApply=null;this._domHeadSection=null;this._domHeadSwitch=null;this._domFootSection=null;return this._domFootSwitch=null;};TableDialog.prototype._addDOMEventListeners=function(){var toggleSection;TableDialog.__super__._addDOMEventListeners.call(this);toggleSection=function toggleSection(ev){ev.preventDefault();if(this.getAttribute('class').indexOf('ct-section--applied')>-1){return ContentEdit.removeCSSClass(this,'ct-section--applied');}else {return ContentEdit.addCSSClass(this,'ct-section--applied');}};this._domHeadSection.addEventListener('click',toggleSection);this._domFootSection.addEventListener('click',toggleSection);this._domBodySection.addEventListener('click',function(_this){return function(ev){return _this._domBodyInput.focus();};}(this));this._domBodyInput.addEventListener('input',function(_this){return function(ev){var valid;valid=/^[1-9]\d{0,1}$/.test(ev.target.value);if(valid){ContentEdit.removeCSSClass(_this._domBodyInput,'ct-section__input--invalid');return ContentEdit.removeCSSClass(_this._domApply,'ct-control--muted');}else {ContentEdit.addCSSClass(_this._domBodyInput,'ct-section__input--invalid');return ContentEdit.addCSSClass(_this._domApply,'ct-control--muted');}};}(this));return this._domApply.addEventListener('click',function(_this){return function(ev){var cssClass;ev.preventDefault();cssClass=_this._domApply.getAttribute('class');if(cssClass.indexOf('ct-control--muted')===-1){return _this.save();}};}(this));};return TableDialog;}(ContentTools.DialogUI);ContentTools.VideoDialog=function(_super){__extends(VideoDialog,_super);function VideoDialog(){VideoDialog.__super__.constructor.call(this,'Insert video');}VideoDialog.prototype.clearPreview=function(){if(this._domPreview){this._domPreview.parentNode.removeChild(this._domPreview);return this._domPreview=void 0;}};VideoDialog.prototype.mount=function(){var domControlGroup;VideoDialog.__super__.mount.call(this);ContentEdit.addCSSClass(this._domElement,'ct-video-dialog');ContentEdit.addCSSClass(this._domView,'ct-video-dialog__preview');domControlGroup=this.constructor.createDiv(['ct-control-group']);this._domControls.appendChild(domControlGroup);this._domInput=document.createElement('input');this._domInput.setAttribute('class','ct-video-dialog__input');this._domInput.setAttribute('name','url');this._domInput.setAttribute('placeholder',ContentEdit._('Paste YouTube or Vimeo URL')+'...');this._domInput.setAttribute('type','text');domControlGroup.appendChild(this._domInput);this._domButton=this.constructor.createDiv(['ct-control','ct-control--text','ct-control--insert','ct-control--muted']);this._domButton.textContent=ContentEdit._('Insert');domControlGroup.appendChild(this._domButton);return this._addDOMEventListeners();};VideoDialog.prototype.preview=function(url){this.clearPreview();this._domPreview=document.createElement('iframe');this._domPreview.setAttribute('frameborder','0');this._domPreview.setAttribute('height','100%');this._domPreview.setAttribute('src',url);this._domPreview.setAttribute('width','100%');return this._domView.appendChild(this._domPreview);};VideoDialog.prototype.save=function(){var embedURL,videoURL;videoURL=this._domInput.value.trim();embedURL=ContentTools.getEmbedVideoURL(videoURL);if(embedURL){return this.dispatchEvent(this.createEvent('save',{'url':embedURL}));}else {return this.dispatchEvent(this.createEvent('save',{'url':videoURL}));}};VideoDialog.prototype.show=function(){VideoDialog.__super__.show.call(this);return this._domInput.focus();};VideoDialog.prototype.unmount=function(){if(this.isMounted()){this._domInput.blur();}VideoDialog.__super__.unmount.call(this);this._domButton=null;this._domInput=null;return this._domPreview=null;};VideoDialog.prototype._addDOMEventListeners=function(){VideoDialog.__super__._addDOMEventListeners.call(this);this._domInput.addEventListener('input',function(_this){return function(ev){var updatePreview;if(ev.target.value){ContentEdit.removeCSSClass(_this._domButton,'ct-control--muted');}else {ContentEdit.addCSSClass(_this._domButton,'ct-control--muted');}if(_this._updatePreviewTimeout){clearTimeout(_this._updatePreviewTimeout);}updatePreview=function updatePreview(){var embedURL,videoURL;videoURL=_this._domInput.value.trim();embedURL=ContentTools.getEmbedVideoURL(videoURL);if(embedURL){return _this.preview(embedURL);}else {return _this.clearPreview();}};return _this._updatePreviewTimeout=setTimeout(updatePreview,500);};}(this));this._domInput.addEventListener('keypress',function(_this){return function(ev){if(ev.keyCode===13){return _this.save();}};}(this));return this._domButton.addEventListener('click',function(_this){return function(ev){var cssClass;ev.preventDefault();cssClass=_this._domButton.getAttribute('class');if(cssClass.indexOf('ct-control--muted')===-1){return _this.save();}};}(this));};return VideoDialog;}(ContentTools.DialogUI);_EditorApp=function(_super){__extends(_EditorApp,_super);function _EditorApp(){_EditorApp.__super__.constructor.call(this);this.history=null;this._state='dormant';this._busy=false;this._namingProp=null;this._fixtureTest=function(domElement){return domElement.hasAttribute('data-fixture');};this._regionQuery=null;this._domRegions=null;this._regions={};this._orderedRegions=[];this._rootLastModified=null;this._regionsLastModified={};this._ignition=null;this._inspector=null;this._toolbox=null;this._emptyRegionsAllowed=false;}_EditorApp.prototype.ctrlDown=function(){return this._ctrlDown;};_EditorApp.prototype.domRegions=function(){return this._domRegions;};_EditorApp.prototype.getState=function(){return this._state;};_EditorApp.prototype.ignition=function(){return this._ignition;};_EditorApp.prototype.inspector=function(){return this._inspector;};_EditorApp.prototype.isDormant=function(){return this._state==='dormant';};_EditorApp.prototype.isReady=function(){return this._state==='ready';};_EditorApp.prototype.isEditing=function(){return this._state==='editing';};_EditorApp.prototype.orderedRegions=function(){var name;return function(){var _i,_len,_ref,_results;_ref=this._orderedRegions;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){name=_ref[_i];_results.push(this._regions[name]);}return _results;}.call(this);};_EditorApp.prototype.regions=function(){return this._regions;};_EditorApp.prototype.shiftDown=function(){return this._shiftDown;};_EditorApp.prototype.toolbox=function(){return this._toolbox;};_EditorApp.prototype.busy=function(busy){if(busy===void 0){this._busy=busy;}this._busy=busy;if(this._ignition){return this._ignition.busy(busy);}};_EditorApp.prototype.createPlaceholderElement=function(region){return new ContentEdit.Text('p',{},'');};_EditorApp.prototype.init=function(queryOrDOMElements,namingProp,fixtureTest,withIgnition){if(namingProp==null){namingProp='id';}if(fixtureTest==null){fixtureTest=null;}if(withIgnition==null){withIgnition=true;}this._namingProp=namingProp;if(fixtureTest){this._fixtureTest=fixtureTest;}this.mount();if(withIgnition){this._ignition=new ContentTools.IgnitionUI();this.attach(this._ignition);this._ignition.addEventListener('edit',function(_this){return function(ev){ev.preventDefault();_this.start();return _this._ignition.state('editing');};}(this));this._ignition.addEventListener('confirm',function(_this){return function(ev){ev.preventDefault();_this._ignition.state('ready');return _this.stop(true);};}(this));this._ignition.addEventListener('cancel',function(_this){return function(ev){ev.preventDefault();_this.stop(false);if(_this.isEditing()){return _this._ignition.state('editing');}else {return _this._ignition.state('ready');}};}(this));}this._toolbox=new ContentTools.ToolboxUI(ContentTools.DEFAULT_TOOLS);this.attach(this._toolbox);this._inspector=new ContentTools.InspectorUI();this.attach(this._inspector);this._state='ready';this._handleDetach=function(_this){return function(element){return _this._preventEmptyRegions();};}(this);this._handleClipboardPaste=function(_this){return function(element,ev){var clipboardData;clipboardData=null;if(ev.clipboardData){clipboardData=ev.clipboardData.getData('text/plain');}if(window.clipboardData){clipboardData=window.clipboardData.getData('TEXT');}return _this.paste(element,clipboardData);};}(this);this._handleNextRegionTransition=function(_this){return function(region){var child,element,index,regions,_i,_len,_ref;regions=_this.orderedRegions();index=regions.indexOf(region);if(index>=regions.length-1){return;}region=regions[index+1];element=null;_ref=region.descendants();for(_i=0,_len=_ref.length;_i<_len;_i++){child=_ref[_i];if(child.content!==void 0){element=child;break;}}if(element){element.focus();element.selection(new ContentSelect.Range(0,0));return;}return ContentEdit.Root.get().trigger('next-region',region);};}(this);this._handlePreviousRegionTransition=function(_this){return function(region){var child,descendants,element,index,length,regions,_i,_len;regions=_this.orderedRegions();index=regions.indexOf(region);if(index<=0){return;}region=regions[index-1];element=null;descendants=region.descendants();descendants.reverse();for(_i=0,_len=descendants.length;_i<_len;_i++){child=descendants[_i];if(child.content!==void 0){element=child;break;}}if(element){length=element.content.length();element.focus();element.selection(new ContentSelect.Range(length,length));return;}return ContentEdit.Root.get().trigger('previous-region',region);};}(this);ContentEdit.Root.get().bind('detach',this._handleDetach);ContentEdit.Root.get().bind('paste',this._handleClipboardPaste);ContentEdit.Root.get().bind('next-region',this._handleNextRegionTransition);ContentEdit.Root.get().bind('previous-region',this._handlePreviousRegionTransition);return this.syncRegions(queryOrDOMElements);};_EditorApp.prototype.destroy=function(){ContentEdit.Root.get().unbind('detach',this._handleDetach);ContentEdit.Root.get().unbind('paste',this._handleClipboardPaste);ContentEdit.Root.get().unbind('next-region',this._handleNextRegionTransition);ContentEdit.Root.get().unbind('previous-region',this._handlePreviousRegionTransition);return this.unmount();};_EditorApp.prototype.highlightRegions=function(highlight){var domRegion,_i,_len,_ref,_results;_ref=this._domRegions;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){domRegion=_ref[_i];if(highlight){_results.push(ContentEdit.addCSSClass(domRegion,'ct--highlight'));}else {_results.push(ContentEdit.removeCSSClass(domRegion,'ct--highlight'));}}return _results;};_EditorApp.prototype.mount=function(){this._domElement=this.constructor.createDiv(['ct-app']);document.body.insertBefore(this._domElement,null);return this._addDOMEventListeners();};_EditorApp.prototype.paste=function(element,clipboardData){var character,content,cursor,encodeHTML,i,insertAt,insertIn,insertNode,item,itemText,lastItem,line,lineLength,lines,replaced,selection,spawn,tags,tail,tip,type,_i,_len;content=clipboardData;lines=content.split('\n');lines=lines.filter(function(line){return line.trim()!=='';});if(!lines){return;}encodeHTML=HTMLString.String.encode;spawn=true;type=element.type();if(lines.length===1){spawn=false;}if(type==='PreText'){spawn=false;}if(!element.can('spawn')){spawn=false;}if(spawn){if(type==='ListItemText'){insertNode=element.parent();insertIn=element.parent().parent();insertAt=insertIn.children.indexOf(insertNode)+1;}else {insertNode=element;if(insertNode.parent().type()!=='Region'){insertNode=element.closest(function(node){return node.parent().type()==='Region';});}insertIn=insertNode.parent();insertAt=insertIn.children.indexOf(insertNode)+1;}for(i=_i=0,_len=lines.length;_i<_len;i=++_i){line=lines[i];line=encodeHTML(line);if(type==='ListItemText'){item=new ContentEdit.ListItem();itemText=new ContentEdit.ListItemText(line);item.attach(itemText);lastItem=itemText;}else {item=new ContentEdit.Text('p',{},line);lastItem=item;}insertIn.attach(item,insertAt+i);}lineLength=lastItem.content.length();lastItem.focus();return lastItem.selection(new ContentSelect.Range(lineLength,lineLength));}else {content=encodeHTML(content);content=new HTMLString.String(content,type==='PreText');selection=element.selection();cursor=selection.get()[0]+content.length();tip=element.content.substring(0,selection.get()[0]);tail=element.content.substring(selection.get()[1]);replaced=element.content.substring(selection.get()[0],selection.get()[1]);if(replaced.length()){character=replaced.characters[0];tags=character.tags();if(character.isTag()){tags.shift();}if(tags.length>=1){content=content.format.apply(content,[0,content.length()].concat(__slice.call(tags)));}}element.content=tip.concat(content);element.content=element.content.concat(tail,false);element.updateInnerHTML();element.taint();selection.set(cursor,cursor);return element.selection(selection);}};_EditorApp.prototype.unmount=function(){if(!this.isMounted()){return;}this._domElement.parentNode.removeChild(this._domElement);this._domElement=null;this._removeDOMEventListeners();this._ignition=null;this._inspector=null;return this._toolbox=null;};_EditorApp.prototype.revert=function(){var confirmMessage;if(!this.dispatchEvent(this.createEvent('revert'))){return;}confirmMessage=ContentEdit._('Your changes have not been saved, do you really want to lose them?');if(ContentEdit.Root.get().lastModified()>this._rootLastModified&&!window.confirm(confirmMessage)){return false;}this.revertToSnapshot(this.history.goTo(0),false);return true;};_EditorApp.prototype.revertToSnapshot=function(snapshot,restoreEditable){var child,name,region,_i,_len,_ref,_ref1;if(restoreEditable==null){restoreEditable=true;}_ref=this._regions;for(name in _ref){region=_ref[name];_ref1=region.children;for(_i=0,_len=_ref1.length;_i<_len;_i++){child=_ref1[_i];child.unmount();}region.domElement().innerHTML=snapshot.regions[name];}if(restoreEditable){if(ContentEdit.Root.get().focused()){ContentEdit.Root.get().focused().blur();}this._regions={};this.syncRegions();this.history.replaceRegions(this._regions);this.history.restoreSelection(snapshot);return this._inspector.updateTags();}};_EditorApp.prototype.save=function(passive){var child,html,modifiedRegions,name,region,root,_i,_len,_ref,_ref1;if(!this.dispatchEvent(this.createEvent('save',{passive:passive}))){return;}root=ContentEdit.Root.get();if(root.lastModified()===this._rootLastModified&&passive){this.dispatchEvent(this.createEvent('saved',{regions:{},passive:passive}));return;}modifiedRegions={};_ref=this._regions;for(name in _ref){region=_ref[name];html=region.html();if(region.children.length===1){child=region.children[0];if(child.content&&!child.content.html()){html='';}}if(!passive){_ref1=region.children;for(_i=0,_len=_ref1.length;_i<_len;_i++){child=_ref1[_i];child.unmount();}region.domElement().innerHTML=html;}if(region.lastModified()===this._regionsLastModified[name]){continue;}modifiedRegions[name]=html;this._regionsLastModified[name]=region.lastModified();}return this.dispatchEvent(this.createEvent('saved',{regions:modifiedRegions,passive:passive}));};_EditorApp.prototype.setRegionOrder=function(regionNames){return this._orderedRegions=regionNames.slice();};_EditorApp.prototype.start=function(){if(!this.dispatchEvent(this.createEvent('start'))){return;}this.busy(true);this.syncRegions();this._initRegions();this._preventEmptyRegions();this._rootLastModified=ContentEdit.Root.get().lastModified();this.history=new ContentTools.History(this._regions);this.history.watch();this._state='editing';this._toolbox.show();this._inspector.show();return this.busy(false);};_EditorApp.prototype.stop=function(save){var focused;if(!this.dispatchEvent(this.createEvent('stop',{save:save}))){return;}focused=ContentEdit.Root.get().focused();if(focused&&focused.isMounted()&&focused._syncContent!==void 0){focused._syncContent();}if(save){this.save();}else {if(!this.revert()){return;}}this.history.stopWatching();this.history=null;this._toolbox.hide();this._inspector.hide();this._regions={};this._state='ready';if(ContentEdit.Root.get().focused()){this._allowEmptyRegions(function(_this){return function(){return ContentEdit.Root.get().focused().blur();};}(this));}};_EditorApp.prototype.syncRegions=function(regionQuery){if(regionQuery!==void 0){this._regionQuery=regionQuery;}if(this._regionQuery.length>0&&this._regionQuery[0].nodeType===Node.ELEMENT_NODE){this._domRegions=this._regionQuery;}else {this._domRegions=document.querySelectorAll(this._regionQuery);}if(this._state==='editing'){this._initRegions();}if(this._ignition){if(this._domRegions.length){return this._ignition.show();}else {return this._ignition.hide();}}};_EditorApp.prototype._addDOMEventListeners=function(){this._handleHighlightOn=function(_this){return function(ev){var _ref;if((_ref=ev.keyCode)===17||_ref===224||_ref===91||_ref===93){_this._ctrlDown=true;return;}if(ev.keyCode===16){if(_this._highlightTimeout){return;}_this._shiftDown=true;_this._highlightTimeout=setTimeout(function(){return _this.highlightRegions(true);},ContentTools.HIGHLIGHT_HOLD_DURATION);return;}clearTimeout(_this._highlightTimeout);return _this.highlightRegions(false);};}(this);this._handleHighlightOff=function(_this){return function(ev){var _ref;if((_ref=ev.keyCode)===17||_ref===224){_this._ctrlDown=false;return;}if(ev.keyCode===16){_this._shiftDown=false;if(_this._highlightTimeout){clearTimeout(_this._highlightTimeout);_this._highlightTimeout=null;}return _this.highlightRegions(false);}};}(this);this._handleVisibility=function(_this){return function(ev){if(!document.hasFocus()){clearTimeout(_this._highlightTimeout);return _this.highlightRegions(false);}};}(this);document.addEventListener('keydown',this._handleHighlightOn);document.addEventListener('keyup',this._handleHighlightOff);document.addEventListener('visibilitychange',this._handleVisibility);window.onbeforeunload=function(_this){return function(ev){if(_this._state==='editing'){return ContentEdit._(ContentTools.CANCEL_MESSAGE);}};}(this);return window.addEventListener('unload',function(_this){return function(ev){return _this.destroy();};}(this));};_EditorApp.prototype._allowEmptyRegions=function(callback){this._emptyRegionsAllowed=true;callback();return this._emptyRegionsAllowed=false;};_EditorApp.prototype._preventEmptyRegions=function(){var child,hasEditableChildren,lastModified,name,placeholder,region,_i,_len,_ref,_ref1,_results;if(this._emptyRegionsAllowed){return;}_ref=this._regions;_results=[];for(name in _ref){region=_ref[name];lastModified=region.lastModified();hasEditableChildren=false;_ref1=region.children;for(_i=0,_len=_ref1.length;_i<_len;_i++){child=_ref1[_i];if(child.type()!=='Static'){hasEditableChildren=true;break;}}if(hasEditableChildren){continue;}placeholder=this.createPlaceholderElement(region);region.attach(placeholder);_results.push(region._modified=lastModified);}return _results;};_EditorApp.prototype._removeDOMEventListeners=function(){document.removeEventListener('keydown',this._handleHighlightOn);return document.removeEventListener('keyup',this._handleHighlightOff);};_EditorApp.prototype._initRegions=function(){var domRegion,found,i,index,name,region,_i,_len,_ref,_ref1,_results;found={};_ref=this._domRegions;for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){domRegion=_ref[i];name=domRegion.getAttribute(this._namingProp);if(!name){name=i;}found[name]=true;if(this._regions[name]&&this._regions[name].domElement()===domRegion){continue;}if(this._fixtureTest(domRegion)){this._regions[name]=new ContentEdit.Fixture(domRegion);}else {this._regions[name]=new ContentEdit.Region(domRegion);}this._orderedRegions.push(name);this._regionsLastModified[name]=this._regions[name].lastModified();}_ref1=this._regions;_results=[];for(name in _ref1){region=_ref1[name];if(found[name]){continue;}delete this._regions[name];delete this._regionsLastModified[name];index=this._orderedRegions.indexOf(name);if(index>-1){_results.push(this._orderedRegions.splice(index,1));}else {_results.push(void 0);}}return _results;};return _EditorApp;}(ContentTools.ComponentUI);ContentTools.EditorApp=function(){var instance;function EditorApp(){}instance=null;EditorApp.get=function(){var cls;cls=ContentTools.EditorApp.getCls();return instance!=null?instance:instance=new cls();};EditorApp.getCls=function(){return _EditorApp;};return EditorApp;}();ContentTools.History=function(){function History(regions){this._lastSnapshotTaken=null;this._regions={};this.replaceRegions(regions);this._snapshotIndex=-1;this._snapshots=[];this._store();}History.prototype.canRedo=function(){return this._snapshotIndex<this._snapshots.length-1;};History.prototype.canUndo=function(){return this._snapshotIndex>0;};History.prototype.index=function(){return this._snapshotIndex;};History.prototype.length=function(){return this._snapshots.length;};History.prototype.snapshot=function(){return this._snapshots[this._snapshotIndex];};History.prototype.goTo=function(index){this._snapshotIndex=Math.min(this._snapshots.length-1,Math.max(0,index));return this.snapshot();};History.prototype.redo=function(){return this.goTo(this._snapshotIndex+1);};History.prototype.replaceRegions=function(regions){var k,v,_results;this._regions={};_results=[];for(k in regions){v=regions[k];_results.push(this._regions[k]=v);}return _results;};History.prototype.restoreSelection=function(snapshot){var element,region;if(!snapshot.selected){return;}region=this._regions[snapshot.selected.region];element=region.descendants()[snapshot.selected.element];element.focus();if(element.selection&&snapshot.selected.selection){return element.selection(snapshot.selected.selection);}};History.prototype.stopWatching=function(){if(this._watchInterval){clearInterval(this._watchInterval);}if(this._delayedStoreTimeout){return clearTimeout(this._delayedStoreTimeout);}};History.prototype.undo=function(){return this.goTo(this._snapshotIndex-1);};History.prototype.watch=function(){var watch;this._lastSnapshotTaken=Date.now();watch=function(_this){return function(){var delayedStore,lastModified;lastModified=ContentEdit.Root.get().lastModified();if(lastModified===null){return;}if(lastModified>_this._lastSnapshotTaken){if(_this._delayedStoreRequested===lastModified){return;}if(_this._delayedStoreTimeout){clearTimeout(_this._delayedStoreTimeout);}delayedStore=function delayedStore(){_this._lastSnapshotTaken=lastModified;return _this._store();};_this._delayedStoreRequested=lastModified;return _this._delayedStoreTimeout=setTimeout(delayedStore,500);}};}(this);return this._watchInterval=setInterval(watch,50);};History.prototype._store=function(){var element,name,other_region,region,snapshot,_ref,_ref1;snapshot={regions:{},selected:null};_ref=this._regions;for(name in _ref){region=_ref[name];snapshot.regions[name]=region.html();}element=ContentEdit.Root.get().focused();if(element){snapshot.selected={};region=element.closest(function(node){return node.type()==='Region'||node.type()==='Fixture';});if(!region){return;}_ref1=this._regions;for(name in _ref1){other_region=_ref1[name];if(region===other_region){snapshot.selected.region=name;break;}}snapshot.selected.element=region.descendants().indexOf(element);if(element.selection){snapshot.selected.selection=element.selection();}}if(this._snapshotIndex<this._snapshots.length-1){this._snapshots=this._snapshots.slice(0,this._snapshotIndex+1);}this._snapshotIndex++;return this._snapshots.splice(this._snapshotIndex,0,snapshot);};return History;}();ContentTools.StylePalette=function(){function StylePalette(){}StylePalette._styles=[];StylePalette.add=function(styles){return this._styles=this._styles.concat(styles);};StylePalette.styles=function(element){var tagName;tagName=element.tagName();if(element===void 0){return this._styles.slice();}return this._styles.filter(function(style){if(!style._applicableTo){return true;}return style._applicableTo.indexOf(tagName)!==-1;});};return StylePalette;}();ContentTools.Style=function(){function Style(name,cssClass,applicableTo){this._name=name;this._cssClass=cssClass;if(applicableTo){this._applicableTo=applicableTo;}else {this._applicableTo=null;}}Style.prototype.applicableTo=function(){return this._applicableTo;};Style.prototype.cssClass=function(){return this._cssClass;};Style.prototype.name=function(){return this._name;};return Style;}();ContentTools.ToolShelf=function(){function ToolShelf(){}ToolShelf._tools={};ToolShelf.stow=function(cls,name){return this._tools[name]=cls;};ToolShelf.fetch=function(name){if(!this._tools[name]){throw new Error("`"+name+"` has not been stowed on the tool shelf");}return this._tools[name];};return ToolShelf;}();ContentTools.Tool=function(){function Tool(){}Tool.label='Tool';Tool.icon='tool';Tool.requiresElement=true;Tool.canApply=function(element,selection){return false;};Tool.isApplied=function(element,selection){return false;};Tool.apply=function(element,selection,callback){throw new Error('Not implemented');};Tool._insertAt=function(element){var insertIndex,insertNode;insertNode=element;if(insertNode.parent().type()!=='Region'){insertNode=element.closest(function(node){return node.parent().type()==='Region';});}insertIndex=insertNode.parent().children.indexOf(insertNode)+1;return [insertNode,insertIndex];};return Tool;}();ContentTools.Tools.Bold=function(_super){__extends(Bold,_super);function Bold(){return Bold.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Bold,'bold');Bold.label='Bold';Bold.icon='bold';Bold.tagName='b';Bold.canApply=function(element,selection){if(!element.content){return false;}return selection&&!selection.isCollapsed();};Bold.isApplied=function(element,selection){var from,to,_ref;if(element.content===void 0||!element.content.length()){return false;}_ref=selection.get(),from=_ref[0],to=_ref[1];if(from===to){to+=1;}return element.content.slice(from,to).hasTags(this.tagName,true);};Bold.apply=function(element,selection,callback){var from,to,_ref;element.storeState();_ref=selection.get(),from=_ref[0],to=_ref[1];if(this.isApplied(element,selection)){element.content=element.content.unformat(from,to,new HTMLString.Tag(this.tagName));}else {element.content=element.content.format(from,to,new HTMLString.Tag(this.tagName));}element.content.optimize();element.updateInnerHTML();element.taint();element.restoreState();return callback(true);};return Bold;}(ContentTools.Tool);ContentTools.Tools.Italic=function(_super){__extends(Italic,_super);function Italic(){return Italic.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Italic,'italic');Italic.label='Italic';Italic.icon='italic';Italic.tagName='i';return Italic;}(ContentTools.Tools.Bold);ContentTools.Tools.Link=function(_super){__extends(Link,_super);function Link(){return Link.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Link,'link');Link.label='Link';Link.icon='link';Link.tagName='a';Link.getAttr=function(attrName,element,selection){var c,from,selectedContent,tag,to,_i,_j,_len,_len1,_ref,_ref1,_ref2;if(element.type()==='Image'){if(element.a){return element.a[attrName];}}else {_ref=selection.get(),from=_ref[0],to=_ref[1];selectedContent=element.content.slice(from,to);_ref1=selectedContent.characters;for(_i=0,_len=_ref1.length;_i<_len;_i++){c=_ref1[_i];if(!c.hasTags('a')){continue;}_ref2=c.tags();for(_j=0,_len1=_ref2.length;_j<_len1;_j++){tag=_ref2[_j];if(tag.name()==='a'){return tag.attr(attrName);}}}}return '';};Link.canApply=function(element,selection){var character;if(element.type()==='Image'){return true;}else {if(!element.content){return false;}if(!selection){return false;}if(selection.isCollapsed()){character=element.content.characters[selection.get()[0]];if(!character||!character.hasTags('a')){return false;}}return true;}};Link.isApplied=function(element,selection){if(element.type()==='Image'){return element.a;}else {return Link.__super__.constructor.isApplied.call(this,element,selection);}};Link.apply=function(element,selection,callback){var allowScrolling,app,applied,characters,dialog,domElement,ends,from,measureSpan,modal,rect,scrollX,scrollY,selectTag,starts,to,transparent,_ref,_ref1;applied=false;if(element.type()==='Image'){rect=element.domElement().getBoundingClientRect();}else {if(selection.isCollapsed()){characters=element.content.characters;starts=selection.get(0)[0];ends=starts;while(starts>0&&characters[starts-1].hasTags('a')){starts-=1;}while(ends<characters.length&&characters[ends].hasTags('a')){ends+=1;}selection=new ContentSelect.Range(starts,ends);selection.select(element.domElement());}element.storeState();selectTag=new HTMLString.Tag('span',{'class':'ct--puesdo-select'});_ref=selection.get(),from=_ref[0],to=_ref[1];element.content=element.content.format(from,to,selectTag);element.updateInnerHTML();domElement=element.domElement();measureSpan=domElement.getElementsByClassName('ct--puesdo-select');rect=measureSpan[0].getBoundingClientRect();}app=ContentTools.EditorApp.get();modal=new ContentTools.ModalUI(transparent=true,allowScrolling=true);modal.addEventListener('click',function(){this.unmount();dialog.hide();if(element.content){element.content=element.content.unformat(from,to,selectTag);element.updateInnerHTML();element.restoreState();}return callback(applied);});dialog=new ContentTools.LinkDialog(this.getAttr('href',element,selection),this.getAttr('target',element,selection));_ref1=ContentTools.getScrollPosition(),scrollX=_ref1[0],scrollY=_ref1[1];dialog.position([rect.left+rect.width/2+scrollX,rect.top+rect.height/2+scrollY]);dialog.addEventListener('save',function(ev){var a,alignmentClassNames,className,detail,linkClasses,_i,_j,_len,_len1;detail=ev.detail();applied=true;if(element.type()==='Image'){alignmentClassNames=['align-center','align-left','align-right'];if(detail.href){element.a={href:detail.href,"class":element.a?element.a['class']:''};if(detail.target){element.a.target=detail.target;}for(_i=0,_len=alignmentClassNames.length;_i<_len;_i++){className=alignmentClassNames[_i];if(element.hasCSSClass(className)){element.removeCSSClass(className);element.a['class']=className;break;}}}else {linkClasses=[];if(element.a['class']){linkClasses=element.a['class'].split(' ');}for(_j=0,_len1=alignmentClassNames.length;_j<_len1;_j++){className=alignmentClassNames[_j];if(linkClasses.indexOf(className)>-1){element.addCSSClass(className);break;}}element.a=null;}element.unmount();element.mount();}else {element.content=element.content.unformat(from,to,'a');if(detail.href){a=new HTMLString.Tag('a',detail);element.content=element.content.format(from,to,a);element.content.optimize();}element.updateInnerHTML();}element.taint();return modal.dispatchEvent(modal.createEvent('click'));});app.attach(modal);app.attach(dialog);modal.show();return dialog.show();};return Link;}(ContentTools.Tools.Bold);ContentTools.Tools.Heading=function(_super){__extends(Heading,_super);function Heading(){return Heading.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Heading,'heading');Heading.label='Heading';Heading.icon='heading';Heading.tagName='h1';Heading.canApply=function(element,selection){if(element.isFixed()){return false;}return element.content!==void 0&&['Text','PreText'].indexOf(element.type())!==-1;};Heading.isApplied=function(element,selection){if(!element.content){return false;}if(['Text','PreText'].indexOf(element.type())===-1){return false;}return element.tagName()===this.tagName;};Heading.apply=function(element,selection,callback){var content,insertAt,parent,textElement;element.storeState();if(element.type()==='PreText'){content=element.content.html().replace(/&nbsp;/g,' ');textElement=new ContentEdit.Text(this.tagName,{},content);parent=element.parent();insertAt=parent.children.indexOf(element);parent.detach(element);parent.attach(textElement,insertAt);element.blur();textElement.focus();textElement.selection(selection);}else {element.attr('class','');if(element.tagName()===this.tagName){element.tagName('p');}else {element.tagName(this.tagName);}element.restoreState();}return callback(true);};return Heading;}(ContentTools.Tool);ContentTools.Tools.Subheading=function(_super){__extends(Subheading,_super);function Subheading(){return Subheading.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Subheading,'subheading');Subheading.label='Subheading';Subheading.icon='subheading';Subheading.tagName='h2';return Subheading;}(ContentTools.Tools.Heading);ContentTools.Tools.Paragraph=function(_super){__extends(Paragraph,_super);function Paragraph(){return Paragraph.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Paragraph,'paragraph');Paragraph.label='Paragraph';Paragraph.icon='paragraph';Paragraph.tagName='p';Paragraph.canApply=function(element,selection){if(element.isFixed()){return false;}return element!==void 0;};Paragraph.apply=function(element,selection,callback){var app,forceAdd,paragraph,region;app=ContentTools.EditorApp.get();forceAdd=app.ctrlDown();if(ContentTools.Tools.Heading.canApply(element)&&!forceAdd){return Paragraph.__super__.constructor.apply.call(this,element,selection,callback);}else {if(element.parent().type()!=='Region'){element=element.closest(function(node){return node.parent().type()==='Region';});}region=element.parent();paragraph=new ContentEdit.Text('p');region.attach(paragraph,region.children.indexOf(element)+1);paragraph.focus();return callback(true);}};return Paragraph;}(ContentTools.Tools.Heading);ContentTools.Tools.Preformatted=function(_super){__extends(Preformatted,_super);function Preformatted(){return Preformatted.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Preformatted,'preformatted');Preformatted.label='Preformatted';Preformatted.icon='preformatted';Preformatted.tagName='pre';Preformatted.apply=function(element,selection,callback){var insertAt,parent,preText,text;if(element.type()==='PreText'){ContentTools.Tools.Paragraph.apply(element,selection,callback);return;}text=element.content.text();preText=new ContentEdit.PreText('pre',{},HTMLString.String.encode(text));parent=element.parent();insertAt=parent.children.indexOf(element);parent.detach(element);parent.attach(preText,insertAt);element.blur();preText.focus();preText.selection(selection);return callback(true);};return Preformatted;}(ContentTools.Tools.Heading);ContentTools.Tools.AlignLeft=function(_super){__extends(AlignLeft,_super);function AlignLeft(){return AlignLeft.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(AlignLeft,'align-left');AlignLeft.label='Align left';AlignLeft.icon='align-left';AlignLeft.className='text-left';AlignLeft.canApply=function(element,selection){return element.content!==void 0;};AlignLeft.isApplied=function(element,selection){var _ref;if(!this.canApply(element)){return false;}if((_ref=element.type())==='ListItemText'||_ref==='TableCellText'){element=element.parent();}return element.hasCSSClass(this.className);};AlignLeft.apply=function(element,selection,callback){var alignmentClassNames,className,_i,_len,_ref;if((_ref=element.type())==='ListItemText'||_ref==='TableCellText'){element=element.parent();}alignmentClassNames=[ContentTools.Tools.AlignLeft.className,ContentTools.Tools.AlignCenter.className,ContentTools.Tools.AlignRight.className];for(_i=0,_len=alignmentClassNames.length;_i<_len;_i++){className=alignmentClassNames[_i];if(element.hasCSSClass(className)){element.removeCSSClass(className);if(className===this.className){return callback(true);}}}element.addCSSClass(this.className);return callback(true);};return AlignLeft;}(ContentTools.Tool);ContentTools.Tools.AlignCenter=function(_super){__extends(AlignCenter,_super);function AlignCenter(){return AlignCenter.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(AlignCenter,'align-center');AlignCenter.label='Align center';AlignCenter.icon='align-center';AlignCenter.className='text-center';return AlignCenter;}(ContentTools.Tools.AlignLeft);ContentTools.Tools.AlignRight=function(_super){__extends(AlignRight,_super);function AlignRight(){return AlignRight.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(AlignRight,'align-right');AlignRight.label='Align right';AlignRight.icon='align-right';AlignRight.className='text-right';return AlignRight;}(ContentTools.Tools.AlignLeft);ContentTools.Tools.UnorderedList=function(_super){__extends(UnorderedList,_super);function UnorderedList(){return UnorderedList.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(UnorderedList,'unordered-list');UnorderedList.label='Bullet list';UnorderedList.icon='unordered-list';UnorderedList.listTag='ul';UnorderedList.canApply=function(element,selection){var _ref;if(element.isFixed()){return false;}return element.content!==void 0&&((_ref=element.parent().type())==='Region'||_ref==='ListItem');};UnorderedList.apply=function(element,selection,callback){var insertAt,list,listItem,listItemText,parent;if(element.parent().type()==='ListItem'){element.storeState();list=element.closest(function(node){return node.type()==='List';});list.tagName(this.listTag);element.restoreState();}else {listItemText=new ContentEdit.ListItemText(element.content.copy());listItem=new ContentEdit.ListItem();listItem.attach(listItemText);list=new ContentEdit.List(this.listTag,{});list.attach(listItem);parent=element.parent();insertAt=parent.children.indexOf(element);parent.detach(element);parent.attach(list,insertAt);listItemText.focus();listItemText.selection(selection);}return callback(true);};return UnorderedList;}(ContentTools.Tool);ContentTools.Tools.OrderedList=function(_super){__extends(OrderedList,_super);function OrderedList(){return OrderedList.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(OrderedList,'ordered-list');OrderedList.label='Numbers list';OrderedList.icon='ordered-list';OrderedList.listTag='ol';return OrderedList;}(ContentTools.Tools.UnorderedList);ContentTools.Tools.Table=function(_super){__extends(Table,_super);function Table(){return Table.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Table,'table');Table.label='Table';Table.icon='table';Table.canApply=function(element,selection){if(element.isFixed()){return false;}return element!==void 0;};Table.apply=function(element,selection,callback){var app,dialog,modal,table;if(element.storeState){element.storeState();}app=ContentTools.EditorApp.get();modal=new ContentTools.ModalUI();table=element.closest(function(node){return node&&node.type()==='Table';});dialog=new ContentTools.TableDialog(table);dialog.addEventListener('cancel',function(_this){return function(){modal.hide();dialog.hide();if(element.restoreState){element.restoreState();}return callback(false);};}(this));dialog.addEventListener('save',function(_this){return function(ev){var index,keepFocus,node,tableCfg,_ref;tableCfg=ev.detail();keepFocus=true;if(table){_this._updateTable(tableCfg,table);keepFocus=element.closest(function(node){return node&&node.type()==='Table';});}else {table=_this._createTable(tableCfg);_ref=_this._insertAt(element),node=_ref[0],index=_ref[1];node.parent().attach(table,index);keepFocus=false;}if(keepFocus){element.restoreState();}else {table.firstSection().children[0].children[0].children[0].focus();}modal.hide();dialog.hide();return callback(true);};}(this));app.attach(modal);app.attach(dialog);modal.show();return dialog.show();};Table._adjustColumns=function(section,columns){var cell,cellTag,cellText,currentColumns,diff,i,row,_i,_len,_ref,_results;_ref=section.children;_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){row=_ref[_i];cellTag=row.children[0].tagName();currentColumns=row.children.length;diff=columns-currentColumns;if(diff<0){_results.push(function(){var _j,_results1;_results1=[];for(i=_j=diff;diff<=0?_j<0:_j>0;i=diff<=0?++_j:--_j){cell=row.children[row.children.length-1];_results1.push(row.detach(cell));}return _results1;}());}else if(diff>0){_results.push(function(){var _j,_results1;_results1=[];for(i=_j=0;0<=diff?_j<diff:_j>diff;i=0<=diff?++_j:--_j){cell=new ContentEdit.TableCell(cellTag);row.attach(cell);cellText=new ContentEdit.TableCellText('');_results1.push(cell.attach(cellText));}return _results1;}());}else {_results.push(void 0);}}return _results;};Table._createTable=function(tableCfg){var body,foot,head,table;table=new ContentEdit.Table();if(tableCfg.head){head=this._createTableSection('thead','th',tableCfg.columns);table.attach(head);}body=this._createTableSection('tbody','td',tableCfg.columns);table.attach(body);if(tableCfg.foot){foot=this._createTableSection('tfoot','td',tableCfg.columns);table.attach(foot);}return table;};Table._createTableSection=function(sectionTag,cellTag,columns){var cell,cellText,i,row,section,_i;section=new ContentEdit.TableSection(sectionTag);row=new ContentEdit.TableRow();section.attach(row);for(i=_i=0;0<=columns?_i<columns:_i>columns;i=0<=columns?++_i:--_i){cell=new ContentEdit.TableCell(cellTag);row.attach(cell);cellText=new ContentEdit.TableCellText('');cell.attach(cellText);}return section;};Table._updateTable=function(tableCfg,table){var columns,foot,head,section,_i,_len,_ref;if(!tableCfg.head&&table.thead()){table.detach(table.thead());}if(!tableCfg.foot&&table.tfoot()){table.detach(table.tfoot());}columns=table.firstSection().children[0].children.length;if(tableCfg.columns!==columns){_ref=table.children;for(_i=0,_len=_ref.length;_i<_len;_i++){section=_ref[_i];this._adjustColumns(section,tableCfg.columns);}}if(tableCfg.head&&!table.thead()){head=this._createTableSection('thead','th',tableCfg.columns);table.attach(head);}if(tableCfg.foot&&!table.tfoot()){foot=this._createTableSection('tfoot','td',tableCfg.columns);return table.attach(foot);}};return Table;}(ContentTools.Tool);ContentTools.Tools.Indent=function(_super){__extends(Indent,_super);function Indent(){return Indent.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Indent,'indent');Indent.label='Indent';Indent.icon='indent';Indent.canApply=function(element,selection){return element.parent().type()==='ListItem'&&element.parent().parent().children.indexOf(element.parent())>0;};Indent.apply=function(element,selection,callback){element.parent().indent();return callback(true);};return Indent;}(ContentTools.Tool);ContentTools.Tools.Unindent=function(_super){__extends(Unindent,_super);function Unindent(){return Unindent.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Unindent,'unindent');Unindent.label='Unindent';Unindent.icon='unindent';Unindent.canApply=function(element,selection){return element.parent().type()==='ListItem';};Unindent.apply=function(element,selection,callback){element.parent().unindent();return callback(true);};return Unindent;}(ContentTools.Tool);ContentTools.Tools.LineBreak=function(_super){__extends(LineBreak,_super);function LineBreak(){return LineBreak.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(LineBreak,'line-break');LineBreak.label='Line break';LineBreak.icon='line-break';LineBreak.canApply=function(element,selection){return element.content;};LineBreak.apply=function(element,selection,callback){var br,cursor,tail,tip;cursor=selection.get()[0]+1;tip=element.content.substring(0,selection.get()[0]);tail=element.content.substring(selection.get()[1]);br=new HTMLString.String('<br>',element.content.preserveWhitespace());element.content=tip.concat(br,tail);element.updateInnerHTML();element.taint();selection.set(cursor,cursor);element.selection(selection);return callback(true);};return LineBreak;}(ContentTools.Tool);ContentTools.Tools.Image=function(_super){__extends(Image,_super);function Image(){return Image.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Image,'image');Image.label='Image';Image.icon='image';Image.canApply=function(element,selection){return !element.isFixed();};Image.apply=function(element,selection,callback){var app,dialog,modal;if(element.storeState){element.storeState();}app=ContentTools.EditorApp.get();modal=new ContentTools.ModalUI();dialog=new ContentTools.ImageDialog();dialog.addEventListener('cancel',function(_this){return function(){modal.hide();dialog.hide();if(element.restoreState){element.restoreState();}return callback(false);};}(this));dialog.addEventListener('save',function(_this){return function(ev){var detail,image,imageAttrs,imageSize,imageURL,index,node,_ref;detail=ev.detail();imageURL=detail.imageURL;imageSize=detail.imageSize;imageAttrs=detail.imageAttrs;if(!imageAttrs){imageAttrs={};}imageAttrs.height=imageSize[1];imageAttrs.src=imageURL;imageAttrs.width=imageSize[0];image=new ContentEdit.Image(imageAttrs);_ref=_this._insertAt(element),node=_ref[0],index=_ref[1];node.parent().attach(image,index);image.focus();modal.hide();dialog.hide();return callback(true);};}(this));app.attach(modal);app.attach(dialog);modal.show();return dialog.show();};return Image;}(ContentTools.Tool);ContentTools.Tools.Video=function(_super){__extends(Video,_super);function Video(){return Video.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Video,'video');Video.label='Video';Video.icon='video';Video.canApply=function(element,selection){return !element.isFixed();};Video.apply=function(element,selection,callback){var app,dialog,modal;if(element.storeState){element.storeState();}app=ContentTools.EditorApp.get();modal=new ContentTools.ModalUI();dialog=new ContentTools.VideoDialog();dialog.addEventListener('cancel',function(_this){return function(){modal.hide();dialog.hide();if(element.restoreState){element.restoreState();}return callback(false);};}(this));dialog.addEventListener('save',function(_this){return function(ev){var index,node,url,video,_ref;url=ev.detail().url;if(url){video=new ContentEdit.Video('iframe',{'frameborder':0,'height':ContentTools.DEFAULT_VIDEO_HEIGHT,'src':url,'width':ContentTools.DEFAULT_VIDEO_WIDTH});_ref=_this._insertAt(element),node=_ref[0],index=_ref[1];node.parent().attach(video,index);video.focus();}else {if(element.restoreState){element.restoreState();}}modal.hide();dialog.hide();return callback(url!=='');};}(this));app.attach(modal);app.attach(dialog);modal.show();return dialog.show();};return Video;}(ContentTools.Tool);ContentTools.Tools.Undo=function(_super){__extends(Undo,_super);function Undo(){return Undo.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Undo,'undo');Undo.label='Undo';Undo.icon='undo';Undo.requiresElement=false;Undo.canApply=function(element,selection){var app;app=ContentTools.EditorApp.get();return app.history&&app.history.canUndo();};Undo.apply=function(element,selection,callback){var app,snapshot;app=ContentTools.EditorApp.get();app.history.stopWatching();snapshot=app.history.undo();app.revertToSnapshot(snapshot);return app.history.watch();};return Undo;}(ContentTools.Tool);ContentTools.Tools.Redo=function(_super){__extends(Redo,_super);function Redo(){return Redo.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Redo,'redo');Redo.label='Redo';Redo.icon='redo';Redo.requiresElement=false;Redo.canApply=function(element,selection){var app;app=ContentTools.EditorApp.get();return app.history&&app.history.canRedo();};Redo.apply=function(element,selection,callback){var app,snapshot;app=ContentTools.EditorApp.get();app.history.stopWatching();snapshot=app.history.redo();app.revertToSnapshot(snapshot);return app.history.watch();};return Redo;}(ContentTools.Tool);ContentTools.Tools.Remove=function(_super){__extends(Remove,_super);function Remove(){return Remove.__super__.constructor.apply(this,arguments);}ContentTools.ToolShelf.stow(Remove,'remove');Remove.label='Remove';Remove.icon='remove';Remove.canApply=function(element,selection){return !element.isFixed();};Remove.apply=function(element,selection,callback){var app,list,row,table;app=ContentTools.EditorApp.get();element.blur();if(element.nextContent()){element.nextContent().focus();}else if(element.previousContent()){element.previousContent().focus();}if(!element.isMounted()){callback(true);return;}switch(element.type()){case 'ListItemText':if(app.ctrlDown()){list=element.closest(function(node){return node.parent().type()==='Region';});list.parent().detach(list);}else {element.parent().parent().detach(element.parent());}break;case 'TableCellText':if(app.ctrlDown()){table=element.closest(function(node){return node.type()==='Table';});table.parent().detach(table);}else {row=element.parent().parent();row.parent().detach(row);}break;default:element.parent().detach(element);break;}return callback(true);};return Remove;}(ContentTools.Tool);}).call(undefined);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xhrForm = __webpack_require__(8);

	var _xhrForm2 = _interopRequireDefault(_xhrForm);

	var _imagesList = __webpack_require__(27);

	var _imagesList2 = _interopRequireDefault(_imagesList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageUploadList = function () {
	    function ImageUploadList(container) {
	        _classCallCheck(this, ImageUploadList);

	        this.container = container;

	        var imageUploadFormContainer = this.container.querySelector('.js-image-upload-form');
	        this.imageUploadForm = new _xhrForm2.default(imageUploadFormContainer, {
	            onSuccess: this.handleImageUploadSuccess.bind(this),
	            onError: this.handleImageUploadError.bind(this)
	        });

	        var imagesListContainer = this.container.querySelector('.js-images-list');
	        this.imagesList = new _imagesList2.default(imagesListContainer);
	    }

	    _createClass(ImageUploadList, [{
	        key: 'handleImageUploadSuccess',
	        value: function handleImageUploadSuccess() {
	            this.imagesList.refresh();
	        }
	    }, {
	        key: 'handleImageUploadError',
	        value: function handleImageUploadError(error) {
	            throw new Error(error);
	        }
	    }]);

	    return ImageUploadList;
	}();

	exports.default = ImageUploadList;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Gestion d'un formulaire XHR
	 */

	var XHRForm = function () {
	    function XHRForm(container) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, XHRForm);

	        this.options = _extends({
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
	            var onSuccess = _options.onSuccess;
	            var onError = _options.onError;


	            this.submitButton.disabled = true;

	            _axios2.default.post(this.url, data, config).then(function (response) {
	                return response.data;
	            }).then(function (response) {

	                _this2.submitButton.disabled = false;
	                _this2.container.reset();

	                if (response.success) {
	                    return response.data;
	                }

	                throw new Error(response.error);
	            }).then(function (data) {
	                return onSuccess(data);
	            }).catch(function (error) {
	                return onError(error);
	            });
	        }
	    }]);

	    return XHRForm;
	}();

	exports.default = XHRForm;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(10);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(11);
	var utils = __webpack_require__(12);
	var dispatchRequest = __webpack_require__(13);
	var InterceptorManager = __webpack_require__(22);
	var isAbsoluteURL = __webpack_require__(23);
	var combineURLs = __webpack_require__(24);
	var bind = __webpack_require__(25);
	var transformData = __webpack_require__(18);

	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

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

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;

	  // Transform request data
	  config.data = transformData(config.data, config.headers, config.transformRequest);

	  // Flatten headers
	  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

	  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
	    delete config.headers[method];
	  });

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

	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};

	// Expose defaults
	axios.defaults = defaultInstance.defaults;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(26);

	// Expose interceptors
	axios.interceptors = defaultInstance.interceptors;

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function (url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
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
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	module.exports = {
	  transformRequest: [function transformResponseJSON(data, headers) {
	    if (utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });

	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponseJSON(data) {
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
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	  return toString.call(val) === '[object FormData]';
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
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */

	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;

	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(15);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(15);
	      }

	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 14 */
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

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);
	var buildURL = __webpack_require__(16);
	var parseHeaders = __webpack_require__(17);
	var transformData = __webpack_require__(18);
	var isURLSameOrigin = __webpack_require__(19);
	var btoa = window.btoa || __webpack_require__(20);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;

	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  var request = new XMLHttpRequest();

	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
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
	  request.onload = function handleLoad() {
	    if (!request) {
	      return;
	    }
	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	    var response = {
	      data: transformData(responseData, responseHeaders, config.transformResponse),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config
	    };

	    // Resolve or reject the Promise based on the status
	    (response.status >= 200 && response.status < 300 || !('status' in request) && response.responseText ? resolve : reject)(response);

	    // Clean up request
	    request = null;
	  };

	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));

	    // Clean up request
	    request = null;
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(21);

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

	  if (utils.isArrayBuffer(requestData)) {
	    requestData = new DataView(requestData);
	  }

	  // Send the request
	  request.send(requestData);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

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

	'use strict';

	var utils = __webpack_require__(12);

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
/* 20 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
	  this.message = message;
	}
	InvalidCharacterError.prototype = new Error();
	InvalidCharacterError.prototype.code = 5;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

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
	      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(12);

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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mustache = __webpack_require__(28);

	var _mustache2 = _interopRequireDefault(_mustache);

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	var _domDelegate = __webpack_require__(4);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImagesList = function () {
	    function ImagesList(container) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, ImagesList);

	        this.options = _extends({
	            onItemSelect: function onItemSelect() {}
	        }, options);

	        this.container = container;
	        this.imagesList = this.container.querySelector('.js-images-gallery-images-list');
	        this.previousPageButtons = [].concat(_toConsumableArray(this.container.querySelectorAll('.js-images-gallery-previous')));
	        this.nextPageButtons = [].concat(_toConsumableArray(this.container.querySelectorAll('.js-images-gallery-next')));

	        this.url = this.container.getAttribute('data-url');

	        this.template = '<img class="bab-ImageGallery-item js-image-picker-item" src="{{ src }}" alt="" id="{{ id }}" />';
	        _mustache2.default.parse(this.template);

	        this.currentPage = 1;
	        this.changeCurrentPage(this.currentPage);

	        this.containerDelegate = (0, _domDelegate2.default)(this.container);

	        this.initEvents();
	    }

	    _createClass(ImagesList, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this = this;

	            this.containerDelegate.on('click', 'img', function (event) {
	                var imageSelected = event.target;
	                var src = imageSelected.src;

	                _this.options.onItemSelect(src);
	            });

	            this.containerDelegate.on('click', '.js-images-gallery-previous', function () {
	                return _this.getPreviousPage();
	            });
	            this.containerDelegate.on('click', '.js-images-gallery-next', function () {
	                return _this.getNextPage();
	            });
	        }
	    }, {
	        key: 'renderImagesList',
	        value: function renderImagesList(images) {
	            var _this2 = this;

	            var fragment = document.createDocumentFragment();

	            images.forEach(function (image) {
	                var renderedImage = _this2.renderImage(image);
	                fragment.appendChild(renderedImage);
	            });

	            return fragment;
	        }
	    }, {
	        key: 'renderImage',
	        value: function renderImage(image) {
	            var renderedImage = _mustache2.default.render(this.template, image);
	            var imageContainer = document.createElement('div');

	            imageContainer.innerHTML = renderedImage;

	            return imageContainer.querySelector(':first-child');
	        }
	    }, {
	        key: 'getImages',
	        value: function getImages(page) {
	            return _axios2.default.get(this.url + ('?page=' + page)).then(function (response) {
	                return response.data;
	            }).catch(function (error) {
	                throw new Error(error);
	            });
	        }
	    }, {
	        key: 'changeCurrentPage',
	        value: function changeCurrentPage() {
	            var _this3 = this;

	            var page = arguments.length <= 0 || arguments[0] === undefined ? this.currentPage : arguments[0];

	            this.loading().then(function () {
	                return _this3.getImages(page);
	            }).then(function (data) {
	                var images = data.images;
	                var pagination = data.pagination;


	                _this3.updateList(images);
	                _this3.updatePagination(pagination);

	                _this3.currentPage = page;
	            });
	        }
	    }, {
	        key: 'loading',
	        value: function loading() {
	            var _this4 = this;

	            return new Promise(function (resolve) {
	                _this4.disableAllButtons();
	                _this4.imagesList.innerHTML = 'Chargement...';

	                resolve();
	            });
	        }
	    }, {
	        key: 'updateList',
	        value: function updateList(images) {
	            var fragment = this.renderImagesList(images);

	            this.imagesList.innerHTML = '';
	            this.imagesList.appendChild(fragment);
	        }
	    }, {
	        key: 'updatePagination',
	        value: function updatePagination(pagination) {
	            if (pagination.hasPreviousResults) {
	                this.enablePreviousPageButtons();
	            } else {
	                this.disablePreviousPageButtons();
	            }

	            if (pagination.hasNextResults) {
	                this.enableNextPageButtons();
	            } else {
	                this.disableNextPageButtons();
	            }
	        }
	    }, {
	        key: 'enablePreviousPageButtons',
	        value: function enablePreviousPageButtons() {
	            this.previousPageButtons.forEach(function (button) {
	                return button.disabled = false;
	            });
	        }
	    }, {
	        key: 'disablePreviousPageButtons',
	        value: function disablePreviousPageButtons() {
	            this.previousPageButtons.forEach(function (button) {
	                return button.disabled = true;
	            });
	        }
	    }, {
	        key: 'enableNextPageButtons',
	        value: function enableNextPageButtons() {
	            this.nextPageButtons.forEach(function (button) {
	                return button.disabled = false;
	            });
	        }
	    }, {
	        key: 'disableNextPageButtons',
	        value: function disableNextPageButtons() {
	            this.nextPageButtons.forEach(function (button) {
	                return button.disabled = true;
	            });
	        }
	    }, {
	        key: 'disableAllButtons',
	        value: function disableAllButtons() {
	            this.disablePreviousPageButtons();
	            this.disableNextPageButtons();
	        }
	    }, {
	        key: 'getPreviousPage',
	        value: function getPreviousPage() {
	            var page = this.currentPage - 1;

	            if (page === 0) {
	                return;
	            }

	            this.changeCurrentPage(page);
	        }
	    }, {
	        key: 'getNextPage',
	        value: function getNextPage() {
	            var page = this.currentPage + 1;

	            this.changeCurrentPage(page);
	        }
	    }, {
	        key: 'refresh',
	        value: function refresh() {
	            this.changeCurrentPage();
	        }
	    }]);

	    return ImagesList;
	}();

	exports.default = ImagesList;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache(global, factory) {
	  if (( false ? 'undefined' : _typeof(exports)) === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	    } else {
	        global.Mustache = {};
	        factory(global.Mustache); // script, wsh, asp
	      }
	})(undefined, function mustacheFactory(mustache) {

	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill(object) {
	    return objectToString.call(object) === '[object Array]';
	  };

	  function isFunction(object) {
	    return typeof object === 'function';
	  }

	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr(obj) {
	    return isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	  }

	  function escapeRegExp(string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }

	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty(obj, propName) {
	    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && propName in obj;
	  }

	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp(re, string) {
	    return regExpTest.call(re, string);
	  }

	  var nonSpaceRe = /\S/;
	  function isWhitespace(string) {
	    return !testRegExp(nonSpaceRe, string);
	  }

	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;',
	    '`': '&#x60;',
	    '=': '&#x3D;'
	  };

	  function escapeHtml(string) {
	    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
	      return entityMap[s];
	    });
	  }

	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;

	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate(template, tags) {
	    if (!template) return [];

	    var sections = []; // Stack to hold section tokens
	    var tokens = []; // Buffer to hold the tokens
	    var spaces = []; // Indices of whitespace tokens on the current line
	    var hasTag = false; // Is there a {{tag}} on the current line?
	    var nonSpace = false; // Is there a non-space char on the current line?

	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace() {
	      if (hasTag && !nonSpace) {
	        while (spaces.length) {
	          delete tokens[spaces.pop()];
	        }
	      } else {
	        spaces = [];
	      }

	      hasTag = false;
	      nonSpace = false;
	    }

	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags(tagsToCompile) {
	      if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);

	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);

	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }

	    compileTags(tags || mustache.tags);

	    var scanner = new Scanner(template);

	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;

	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);

	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);

	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }

	          tokens.push(['text', chr, start, start + 1]);
	          start += 1;

	          // Check for whitespace on the current line.
	          if (chr === '\n') stripSpace();
	        }
	      }

	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe)) break;

	      hasTag = true;

	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);

	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }

	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);

	      token = [type, value, start, scanner.pos];
	      tokens.push(token);

	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();

	        if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);

	        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }

	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();

	    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

	    return nestTokens(squashTokens(tokens));
	  }

	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens(tokens) {
	    var squashedTokens = [];

	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }

	    return squashedTokens;
	  }

	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens(tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];

	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];

	      switch (token[0]) {
	        case '#':
	        case '^':
	          collector.push(token);
	          sections.push(token);
	          collector = token[4] = [];
	          break;
	        case '/':
	          section = sections.pop();
	          section[5] = token[2];
	          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	          break;
	        default:
	          collector.push(token);
	      }
	    }

	    return nestedTokens;
	  }

	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner(string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }

	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos() {
	    return this.tail === '';
	  };

	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan(re) {
	    var match = this.tail.match(re);

	    if (!match || match.index !== 0) return '';

	    var string = match[0];

	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;

	    return string;
	  };

	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil(re) {
	    var index = this.tail.search(re),
	        match;

	    switch (index) {
	      case -1:
	        match = this.tail;
	        this.tail = '';
	        break;
	      case 0:
	        match = '';
	        break;
	      default:
	        match = this.tail.substring(0, index);
	        this.tail = this.tail.substring(index);
	    }

	    this.pos += match.length;

	    return match;
	  };

	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context(view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }

	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push(view) {
	    return new Context(view, this);
	  };

	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup(name) {
	    var cache = this.cache;

	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this,
	          names,
	          index,
	          lookupHit = false;

	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;

	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);

	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }

	        if (lookupHit) break;

	        context = context.parent;
	      }

	      cache[name] = value;
	    }

	    if (isFunction(value)) value = value.call(this.view);

	    return value;
	  };

	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer() {
	    this.cache = {};
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache() {
	    this.cache = {};
	  };

	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse(template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];

	    if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);

	    return tokens;
	  };

	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render(template, view, partials) {
	    var tokens = this.parse(template);
	    var context = view instanceof Context ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };

	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context);else if (symbol === 'text') value = this.rawValue(token);

	      if (value !== undefined) buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender(template) {
	      return self.render(template, context, partials);
	    }

	    if (!value) return;

	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	      if (value != null) buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };

	  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
	  };

	  Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
	  };

	  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null) return value;
	  };

	  Writer.prototype.escapedValue = function escapedValue(token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null) return mustache.escape(value);
	  };

	  Writer.prototype.rawValue = function rawValue(token) {
	    return token[1];
	  };

	  mustache.name = 'mustache.js';
	  mustache.version = '2.2.1';
	  mustache.tags = ['{{', '}}'];

	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();

	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache() {
	    return defaultWriter.clearCache();
	  };

	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse(template, tags) {
	    return defaultWriter.parse(template, tags);
	  };

	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render(template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials);
	  };

	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html(template, view, partials, send) {
	    /*eslint-enable*/

	    var result = mustache.render(template, view, partials);

	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };

	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;

	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _modal = __webpack_require__(3);

	var _modal2 = _interopRequireDefault(_modal);

	var _imagePicker = __webpack_require__(30);

	var _imagePicker2 = _interopRequireDefault(_imagePicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ModalImagePicker = function ModalImagePicker(container) {
	    var _this = this;

	    _classCallCheck(this, ModalImagePicker);

	    this.container = container;
	    this.modal = new _modal2.default(this.container);
	    this.imagePicker = new _imagePicker2.default(this.container.querySelector('.js-image-picker'), {
	        onItemSelect: function onItemSelect() {
	            return _this.modal.close();
	        }
	    });
	};

	exports.default = ModalImagePicker;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domDelegate = __webpack_require__(4);

	var _domDelegate2 = _interopRequireDefault(_domDelegate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImagePicker = function () {
	    function ImagePicker(container) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, ImagePicker);

	        this.options = _extends({
	            onItemSelect: function onItemSelect() {}
	        }, options);

	        this.container = container;
	        this.preview = document.querySelector(this.container.getAttribute('data-image-picker-preview'));
	        this.input = document.querySelector(this.container.getAttribute('data-image-picker-input'));

	        this.containerDelegate = (0, _domDelegate2.default)(this.container);

	        this.initEvents();
	    }

	    _createClass(ImagePicker, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            this.containerDelegate.on('click', '.js-image-picker-item', this.handleItemSelect.bind(this));
	        }
	    }, {
	        key: 'handleItemSelect',
	        value: function handleItemSelect(event) {
	            var src = event.target.src;


	            this.setCurrentImage(src);

	            this.options.onItemSelect();
	        }
	    }, {
	        key: 'setCurrentImage',
	        value: function setCurrentImage(src) {
	            this.preview.src = src;
	            this.input.value = src;
	        }
	    }]);

	    return ImagePicker;
	}();

	exports.default = ImagePicker;

/***/ }
/******/ ]);