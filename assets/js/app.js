'use strict';

var jQuery = require('jquery');
var PhotoSwipe = require('photoswipe');
var PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

window.jQuery = jQuery;
window.$ = jQuery;

var MainNav = require('./modules/main-nav');
var TouchEffect = require('./modules/toucheffect');
require('./modules/jquery.cookiebar');

var mainNav = new MainNav();
mainNav.run();

var touchEffect = new TouchEffect();
touchEffect.run();

var pswpElements = document.querySelectorAll('.pswp');

var photoSwipeItems = [
    {
        src: 'https://placekitten.com/1200/1000',
        w: 1200,
        h: 1000
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
];

var options = {
    index: 0
};

var gallery = new PhotoSwipe(pswpElements[0], PhotoSwipeUiDefault, photoSwipeItems, options);
gallery.init();
