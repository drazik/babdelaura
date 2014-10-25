var jQuery = require('jquery');
require('./jquery.cookie');

(function($) {

    'use strict';

    function InfoCookies() {}

    InfoCookies.prototype.check = function() {
        if (!this.viewed()) {
            this.show();
        }
    };

    InfoCookies.prototype.viewed = function() {
        return $.cookie('infocookies');
    };

    InfoCookies.prototype.show = function() {
        $('body').append('<div class="notification notification-info" id="info-cookies"><div class="notification-content">En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies afin de réaliser des statistiques de visites anonymes. <button class="button button-small" id="info-cookies-confirm" type="button">OK</button></div></div>');

        $('#info-cookies-confirm').on('click', this.close);
    };

    InfoCookies.prototype.close = function(event) {
        event.preventDefault();

        $.cookie('infocookies', 'viewed', {expire: 30 * 12});
        $('#info-cookies').fadeOut();
    };

    module.exports = InfoCookies;
})(jQuery);