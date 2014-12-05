'use strict';

var MainNav = require('./modules/main-nav');
var TouchEffect = require('./modules/toucheffect');

var mainNav = new MainNav();
mainNav.run();

var touchEffect = new TouchEffect();
touchEffect.run();
