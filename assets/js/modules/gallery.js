'use strict';

var url = require('url');
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
        var params = url.parse(image.src, true).query;
        var item = {
            src: image.src,
            w: parseInt(params.width, 10),
            h: parseInt(params.height, 10)
        };

        if (item.w > 0 && item.h > 0) {
            this.photoSwipeItems.push(item);
            return;
        }

        this.loadImage(image);
    }.bind(this))

    this.initEvents();
};

Gallery.prototype.initEvents = function () {
    this.images.forEach(function(image, index) {
        image.addEventListener('click', this.show.bind(this, index));
    }.bind(this));
};

Gallery.prototype.show = function (index) {
    this.options.index = index || 0;
    this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUiDefault, this.photoSwipeItems, this.options);
    this.gallery.init();
};

Gallery.prototype.loadImage = function (image) {
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
};

module.exports = Gallery;
