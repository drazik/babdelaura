(function() {
    var InfoCookies = require('./modules/info-cookies');
    var MainNav = require('./modules/main-nav');

    var infosCookies = new InfoCookies();
    infosCookies.check();

    var mainNav = new MainNav();
})();
