import { parse as parseUrl } from 'url';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUiDefault from 'photoswipe/dist/photoswipe-ui-default';

import delegate from 'dom-delegate';

export default class Gallery {
    constructor(container) {
        this.options = {
            photoSwipe: {
                bgOpacity: 0.85,
                closeOnScroll: false,
                history: false
            }
        };

        this.container = container;
        this.photoSwipeElement = document.querySelector(this.container.getAttribute('data-gallery-pswp-element'));
        this.images = [...this.container.querySelectorAll('img')];

        this.photoSwipeItems = [];
        this.photoSwipe = null;

        this.containerDelegate = delegate(this.container);

        this.initPhotoSwipeItems();
        this.initEvents();
    }

    initPhotoSwipeItems() {
        this.images.forEach(image => {
            const srcParams = parseUrl(image.src, true).query;
            const item = {
                src: image.src,
                w: parseInt(srcParams.width, 10),
                h: parseInt(srcParams.height, 10)
            };

            if (item.w > 0 && item.h > 0) {
                this.photoSwipeItems.push(item);
                return;
            }

            this.loadImage(image);
        });
    }

    loadImage(image) {
        const tmpImage = new Image();

        tmpImage.onload = () => {
            const item = {
                src: tmpImage.src,
                w: tmpImage.width,
                h: tmpImage.height
            };

            this.photoSwipeItems.push(item);
        };

        tmpImage.src = image.src;
    }

    initEvents() {
        this.containerDelegate.on('click', 'img', event => {
            const img = event.target;
            const imgIndex = this.images.indexOf(img);

            this.show(imgIndex);
        });
    }

    show(index) {
        this.options.photoSwipe.index = index;
        this.photoSwipe = new PhotoSwipe(this.photoSwipeElement, PhotoSwipeUiDefault, this.photoSwipeItems, this.options.photoSwipe);
        this.photoSwipe.init();
    }
}

// 'use strict';
//
// var url = require('url');
// var PhotoSwipe = require('photoswipe');
// var PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');
//
// function Gallery() {
//     this.pswpElement = document.querySelector('.pswp');
//     this.itemsContainer = document.querySelector('.gallery');
//
//     if (this.pswpElement == null || this.itemsContainer == null) {
//         return;
//     }
//
//     this.images = this.itemsContainer.querySelectorAll('img');
//     this.images = Array.apply(null, this.images);
//
//     this.photoSwipeItems = [];
//     this.gallery = null;
//     this.options = {
//         bgOpacity: 0.85,
//         closeOnScroll: false,
//         history: false
//     };
// }
//
// Gallery.prototype.initialize = function () {
//     if (this.pswpElement == null || this.itemsContainer == null) {
//         return;
//     }
//
//     this.images.forEach(function(image) {
//         var params = url.parse(image.src, true).query;
//         var item = {
//             src: image.src,
//             w: parseInt(params.width, 10),
//             h: parseInt(params.height, 10)
//         };
//
//         if (item.w > 0 && item.h > 0) {
//             this.photoSwipeItems.push(item);
//             return;
//         }
//
//         this.loadImage(image);
//     }.bind(this))
//
//     this.initEvents();
// };
//
// Gallery.prototype.initEvents = function () {
//     this.images.forEach(function(image, index) {
//         image.addEventListener('click', this.show.bind(this, index));
//     }.bind(this));
// };
//
// Gallery.prototype.show = function (index) {
//     this.options.index = index || 0;
//     this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUiDefault, this.photoSwipeItems, this.options);
//     this.gallery.init();
// };
//
// Gallery.prototype.loadImage = function (image) {
//     var tmpImage = new Image();
//
//     tmpImage.onload = function() {
//         var item = {
//             src: image.src,
//             w: tmpImage.width,
//             h: tmpImage.height
//         };
//
//         this.photoSwipeItems.push(item);
//     }.bind(this);
//
//     tmpImage.src = image.src;
// };
//
// module.exports = Gallery;
