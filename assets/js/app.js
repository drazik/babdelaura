'use strict';

var jQuery = require('jquery');

window.jQuery = jQuery;
window.$ = jQuery;

var MainNav = require('./modules/main-nav');
var TouchEffect = require('./modules/toucheffect');
var Gallery = require('./modules/gallery');
require('./modules/jquery.cookiebar');
require('./modules/spoiler');

var mainNav = new MainNav();
mainNav.run();

var touchEffect = new TouchEffect();
touchEffect.run();

var gallery = new Gallery();
gallery.initialize();
