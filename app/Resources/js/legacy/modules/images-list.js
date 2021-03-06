import Mustache from "mustache";
import axios from "axios";
import delegate from "dom-delegate";

class ImagesList {
  constructor(container, options = {}) {
    this.options = {
      /* eslint-disable no-empty-function */
      onItemSelect: () => {},
      /* eslint-enable no-empty-function */
      ...options
    };

    this.container = container;
    this.imagesList = this.container.querySelector(
      ".js-images-gallery-images-list"
    );
    this.previousPageButtons = [
      ...this.container.querySelectorAll(".js-images-gallery-previous")
    ];
    this.nextPageButtons = [
      ...this.container.querySelectorAll(".js-images-gallery-next")
    ];

    this.url = this.container.getAttribute("data-url");

    this.template = `<img class="bab-ImageGallery-item js-image-picker-item" src="{{ src }}" alt="" title="Image n°{{ id }}" id="{{ id }}" />`;
    Mustache.parse(this.template);

    this.currentPage = 1;
    this.changeCurrentPage(this.currentPage);

    this.containerDelegate = delegate(this.container);

    this.initEvents();
  }

  initEvents() {
    this.containerDelegate.on("click", "img", event => {
      const imageSelected = event.target;
      const { src } = imageSelected;

      this.options.onItemSelect(src);
    });

    this.containerDelegate.on("click", ".js-images-gallery-previous", () =>
      this.getPreviousPage()
    );
    this.containerDelegate.on("click", ".js-images-gallery-next", () =>
      this.getNextPage()
    );

    window.addEventListener("modal-image-picker-open", () => this.refresh());
  }

  renderImagesList(images) {
    const fragment = document.createDocumentFragment();

    images.forEach(image => {
      const renderedImage = this.renderImage(image);
      fragment.appendChild(renderedImage);
    });

    return fragment;
  }

  renderImage(image) {
    const renderedImage = Mustache.render(this.template, image);
    const imageContainer = document.createElement("div");

    imageContainer.innerHTML = renderedImage;

    return imageContainer.querySelector(":first-child");
  }

  getImages(page) {
    return axios
      .post(`${this.url}?page=${page}`)
      .then(response => response.data)
      .catch(error => {
        throw new Error(error);
      });
  }

  changeCurrentPage(page = this.currentPage) {
    this.loading()
      .then(() => this.getImages(page))
      .then(data => this.update(data.images, data.pagination, page));
  }

  loading() {
    return new Promise(resolve => {
      this.disableAllButtons();
      this.imagesList.innerHTML = "Chargement...";

      resolve();
    });
  }

  update(images, pagination, page) {
    this.updateList(images);
    this.updatePagination(pagination);
    this.currentPage = page;
  }

  updateList(images) {
    const fragment = this.renderImagesList(images);

    this.imagesList.innerHTML = "";
    this.imagesList.appendChild(fragment);
  }

  updatePagination(pagination) {
    if (pagination.hasPreviousResults) {
      this.enablePreviousPageButtons();
    } else {
      this.disablePreviousPageButtons();
    }

    if (pagination.hasNextResults) {
      this.enableNextPageButtons();
    } else {
      this.disableNextPageButtons();
    }
  }

  enablePreviousPageButtons() {
    this.previousPageButtons.forEach(button => {
      button.disabled = false;
    });
  }

  disablePreviousPageButtons() {
    this.previousPageButtons.forEach(button => {
      button.disabled = true;
    });
  }

  enableNextPageButtons() {
    this.nextPageButtons.forEach(button => {
      button.disabled = false;
    });
  }

  disableNextPageButtons() {
    this.nextPageButtons.forEach(button => {
      button.disabled = true;
    });
  }

  disableAllButtons() {
    this.disablePreviousPageButtons();
    this.disableNextPageButtons();
  }

  getPreviousPage() {
    const page = this.currentPage - 1;

    if (page === 0) {
      return;
    }

    this.changeCurrentPage(page);
  }

  getNextPage() {
    const page = this.currentPage + 1;

    this.changeCurrentPage(page);
  }

  refresh() {
    this.changeCurrentPage();
  }
}

export default ImagesList;
