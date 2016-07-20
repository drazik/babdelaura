import delegate from 'dom-delegate';

class ImagePicker {
    constructor(container, options = {}) {
        this.options = {
            onItemSelect: () => {},
            ...options
        };

        this.container = container;
        this.preview = document.querySelector(this.container.getAttribute('data-image-picker-preview'));
        this.input = document.querySelector(this.container.getAttribute('data-image-picker-input'));

        this.containerDelegate = delegate(this.container);

        this.initEvents();
    }

    initEvents() {
        this.containerDelegate.on('click', '.js-image-picker-item', this.handleItemSelect.bind(this));
    }

    handleItemSelect(event) {
        const {src} = event.target;

        this.setCurrentImage(src);

        this.options.onItemSelect();
    }

    setCurrentImage(src) {
        this.preview.src = src;
        this.input.value = src;
    }
}

export default ImagePicker;
