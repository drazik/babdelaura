(function() {
    'use strict';

    var InfoCookies = require('./modules/info-cookies');
    var MainNav = require('./modules/main-nav');
    var TouchEffect = require('./modules/toucheffect');

    var infosCookies = new InfoCookies();
    infosCookies.check();

    var mainNav = new MainNav();
    mainNav.run();

    var touchEffect = new TouchEffect();
    touchEffect.run();
})();
