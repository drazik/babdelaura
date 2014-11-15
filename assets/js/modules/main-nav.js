var jQuery = require('jquery');

(function($) {

    'use strict';

    function MainNav() {
        this.$mainNav = $('#main-nav');
        this.$mainNavToggleButton = this.$mainNav.find('#main-nav-toggle');
        this.$mainNavToggleIcon = this.$mainNavToggleButton.find('.fa');
        this.$mainNavContainer = this.$mainNav.find('#main-nav-container');
    }

    MainNav.prototype.initEvents = function() {
        this.$mainNavToggleButton.on('click', this.toggleNavigation.bind(this));
    };

    MainNav.prototype.toggleNavigation = function() {
        this.$mainNav.toggleClass('open');
        this.$mainNavToggleIcon.toggleClass('fa-bars');
        this.$mainNavToggleIcon.toggleClass('fa-times');
    };

    MainNav.prototype.run = function() {
        this.initEvents();
    };

    module.exports = MainNav;
})(jQuery);
