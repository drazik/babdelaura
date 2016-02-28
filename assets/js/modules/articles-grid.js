import delegate from 'dom-delegate';

export default class ArticlesGrid {
    constructor(container) {
        this.container = container;

        this.initEvents();
    }

    initEvents() {
        
    }
}


// var $ = require('jquery');
// require('browsernizr/test/touchevents');
// var modernizr = require('browsernizr');
//
// function TouchEffect() {
//     this.$articles = $('.grid-item-article');
// }
//
// TouchEffect.prototype.initEvents = function() {
//     this.$articles.on('click', '.grid-item-article-read', function(event) {
//         event.stopPropagation();
//     });
//
//     this.$articles.on('click', this.toggleArticle);
// };
//
// TouchEffect.prototype.toggleArticle = function() {
//     $(this).toggleClass('hover');
// };
//
// TouchEffect.prototype.run = function() {
//     if (this.$articles.length > 0 && modernizr.touchevents) {
//         this.initEvents();
//     }
// };
//
// module.exports = TouchEffect;
