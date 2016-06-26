import { parse as parseUrl } from 'url';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUiDefault from 'photoswipe/dist/photoswipe-ui-default';

import delegate from 'dom-delegate';

export default class ImagesSlideshow {
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

            // Si on a déjà les dimensions, on push
            if (item.w > 0 && item.h > 0) {
                this.photoSwipeItems.push(item);
                return;
            }

            // Sinon, c'est une vieille image uploadée avant la mise en place
            // de l'ajout automatique des dimensions, il faut les calculer...
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
