import Modal from './modal';
import ImagePicker from './image-picker';

class ModalImagePicker {
    constructor(container) {
        this.container = container;
        this.modal = new Modal(this.container);
        this.imagePicker = new ImagePicker(this.container.querySelector('.js-image-picker'), {
            onItemSelect: () => this.modal.close()
        });
    }
}

export default ModalImagePicker;
