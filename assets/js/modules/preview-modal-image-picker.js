import ModalImagePicker from './modal-image-picker';

class PreviewModalImagePicker {
    constructor(container) {
        this.previewElement = document.querySelector(container.getAttribute('data-preview-element'));
        this.input = document.querySelector(container.getAttribute('data-input'));

        this.modalImagePicker = new ModalImagePicker(container, {
            onItemSelect: this.onItemSelect.bind(this)
        });
    }

    onItemSelect(src) {
        this.setPreview(src);
        this.setInputValue(src);
    }

    setPreview(src) {
        this.previewElement.src = src;
    }

    setInputValue(src) {
        this.input.value = src;
    }
}

export default PreviewModalImagePicker;
