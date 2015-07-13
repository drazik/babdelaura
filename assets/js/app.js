'use strict';

var jQuery = require('jquery');
window.jQuery = jQuery;
window.$ = jQuery;

var MainNav = require('./modules/main-nav');
var TouchEffect = require('./modules/toucheffect');
require('./modules/jquery.cookiebar');

var mainNav = new MainNav();
mainNav.run();

var touchEffect = new TouchEffect();
touchEffect.run();
