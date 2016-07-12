import Mustache from 'mustache';
import axios from 'axios';

class ImagesGallery {
    constructor(container) {
        this.container = container;
        this.url = this.container.getAttribute('data-url');

        this.template = `<img class="bab-ImageGallery-item" src="{{ src }}" alt="" id="{{ id }}" />`;
        Mustache.parse(this.template);

        // récupérer en AJAX une liste d'images
        // boucler sur la liste pour afficher les images
        const currentPage = 1;
        this.changeCurrentPage(currentPage);

        this.initEvents();
    }

    initEvents() {}

    renderImagesList(images) {
        const fragment = document.createDocumentFragment();

        images.forEach((image) => {
            const renderedImage = this.renderImage(image);
            fragment.appendChild(renderedImage);
        });

        return fragment;
    }

    renderImage(image) {
        const renderedImage = Mustache.render(this.template, image);
        const imageContainer = document.createElement('div');

        imageContainer.innerHTML = renderedImage;

        return imageContainer.querySelector(':first-child');
    }

    getImages(page) {
        return axios.get(this.url + `?page=${page}`)
            .then((response) => response.data)
            .catch((error) => { throw new Error(error) });
    }

    changeCurrentPage(page) {
        this.loading()
            .then(() => this.getImages(page))
            .then((data) => this.updateList(data))
    }

    loading() {
        return new Promise((resolve) => {
            this.container.innerHTML = 'Chargement...';

            resolve();
        });
    }

    updateList(data) {
        const {page, images} = data;

        this.updatePagination(page);

        const fragment = this.renderImagesList(images);

        this.container.innerHTML = '';
        this.container.appendChild(fragment);
    }

    updatePagination() {

    }
}

export default ImagesGallery;
