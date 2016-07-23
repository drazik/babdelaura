import delegate from 'dom-delegate';

class ImagePicker {
    constructor(container, options = {}) {
        this.options = {
            onItemSelect: () => {},
            ...options
        };

        this.container = container;

        this.containerDelegate = delegate(this.container);

        this.initEvents();
    }

    initEvents() {
        this.containerDelegate.on('click', '.js-image-picker-item', this.handleItemSelect.bind(this));
    }

    handleItemSelect(event) {
        const {src} = event.target;

        this.options.onItemSelect(src);
    }
}

export default ImagePicker;
