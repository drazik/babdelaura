import Modal from './modal';
import ImagePicker from './image-picker';

class ModalImagePicker {
    constructor(container, options = {}) {
        this.options = {
            onItemSelect: () => {},
            ...options
        };

        this.container = container;

        this.modal = new Modal(this.container);
        this.imagePicker = new ImagePicker(this.container.querySelector('.js-image-picker'), {
            onItemSelect: this.onItemSelect.bind(this)
        });
    }

    onItemSelect(src) {
        this.options.onItemSelect(src);

        this.close();
    }

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }
}

export default ModalImagePicker;
