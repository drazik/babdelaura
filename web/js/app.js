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

	var _nav = __webpack_require__(1);

	var _nav2 = _interopRequireDefault(_nav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navContainer = document.querySelector('.js-nav'); // 'use strict';
	//
	// var jQuery = require('jquery');
	//
	// window.jQuery = jQuery;
	// window.$ = jQuery;

	// var Gallery = require('./modules/gallery');
	// require('./modules/jquery.cookiebar');

	// var touchEffect = new TouchEffect();
	// touchEffect.run();
	//
	// var gallery = new Gallery();
	// gallery.initialize();

	new _nav2.default(navContainer);

/***/ },
/* 1 */
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

/***/ }
/******/ ]);