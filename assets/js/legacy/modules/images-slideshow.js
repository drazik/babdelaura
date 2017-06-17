import { parse as parseUrl } from "url";

import PhotoSwipe from "photoswipe";
import PhotoSwipeUiDefault from "photoswipe/dist/photoswipe-ui-default";

import delegate from "dom-delegate";

/**
 * Slideshow d'images
 */
class ImagesSlideshow {
  constructor(container) {
    this.options = {
      photoSwipe: {
        bgOpacity: 0.85,
        closeOnScroll: false,
        history: false
      }
    };

    this.container = container;
    this.photoSwipeElement = document.querySelector(
      this.container.getAttribute("data-gallery-pswp-element")
    );
    this.images = [...this.container.querySelectorAll("img")];

    this.photoSwipeItems = [];
    this.photoSwipe = null;

    this.containerDelegate = delegate(this.container);

    this.initPhotoSwipeItems();
    this.initEvents();
  }

  /**
     * Initialise les objets à passer à PhotoSwipe
     * PhotoSwipe a besoin de la src et des dimensions de chaque image
     */
  initPhotoSwipeItems() {
    this.images.forEach(image => {
      const srcParams = parseUrl(image.src, true).query;
      const item = {
        src: image.src,
        w: parseInt(srcParams.width, 10),
        h: parseInt(srcParams.height, 10)
      };

      this.photoSwipeItems.push(item);
    });
  }

  /**
     * Gestion du click sur une image
     */
  initEvents() {
    this.containerDelegate.on("click", "img", event => {
      const img = event.target;
      const imgIndex = this.images.indexOf(img);

      this.show(imgIndex);
    });
  }

  /**
     * Ouvre le slideshow directement à l'index donné
     */
  show(index) {
    this.options.photoSwipe.index = index;
    this.photoSwipe = new PhotoSwipe(
      this.photoSwipeElement,
      PhotoSwipeUiDefault,
      this.photoSwipeItems,
      this.options.photoSwipe
    );
    this.photoSwipe.init();
  }
}

export default ImagesSlideshow;
