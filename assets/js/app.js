(function() {
    var InfoCookies = require('./modules/info-cookies');
    var MainNav = require('./modules/main-nav');
    var TouchEffect = require('./modules/toucheffect');

    var infosCookies = new InfoCookies();
    infosCookies.check();

    var mainNav = new MainNav();

    var touchEffect = new TouchEffect();
})();
