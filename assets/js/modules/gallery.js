'use strict';

var PhotoSwipe = require('photoswipe');
var PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

function Gallery() {
    this.pswpElement = document.querySelector('.pswp');
    this.itemsContainer = document.querySelector('.gallery');

    if (this.pswpElement == null || this.itemsContainer == null) {
        return;
    }

    this.images = this.itemsContainer.querySelectorAll('img');
    this.images = Array.apply(null, this.images);

    this.photoSwipeItems = [];
    this.gallery = null;
    this.options = {
        bgOpacity: 0.85,
        closeOnScroll: false,
        history: false
    };
}

Gallery.prototype.initialize = function () {
    this.images.forEach(function(image) {
        var tmpImage = new Image();

        tmpImage.onload = function() {
            var item = {
                src: image.src,
                w: tmpImage.width,
                h: tmpImage.height
            };

            this.photoSwipeItems.push(item);
        }.bind(this);

        tmpImage.src = image.src;
    }.bind(this))

    this.initEvents();
};

Gallery.prototype.initEvents = function () {
    this.images.forEach(function(image) {
        image.addEventListener('click', this.show.bind(this));
    }.bind(this));
};

Gallery.prototype.show = function (event) {
    this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUiDefault, this.photoSwipeItems, this.options);
    this.gallery.init();
};

module.exports = Gallery;
