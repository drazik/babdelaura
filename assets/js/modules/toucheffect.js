var jQuery = require('jquery');

(function($) {

    'use strict';

    function TouchEffect() {
        this.$articles = $('.grid-item-article');

        if (this.$articles.length > 0 && Modernizr.touch) {
            this.initEvents();
        }
    }

    TouchEffect.prototype.initEvents = function() {
        this.$articles.on('click', '.grid-item-article-read', function(event) {
            event.stopPropagation();
        });

        this.$articles.on('click', this.toggleArticle);
    };

    TouchEffect.prototype.toggleArticle = function() {
        $(this).toggleClass('hover');
    };

    module.exports = TouchEffect;
})(jQuery);
