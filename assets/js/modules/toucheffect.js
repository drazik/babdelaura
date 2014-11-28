'use strict';

var $ = require('jquery');

function TouchEffect() {
    this.$articles = $('.grid-item-article');
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

TouchEffect.prototype.run = function() {
    if (this.$articles.length > 0 && Modernizr.touch) {
        this.initEvents();
    }
};

module.exports = TouchEffect;
