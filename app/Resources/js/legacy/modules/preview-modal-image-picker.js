import ModalImagePicker from "./modal-image-picker";

class PreviewModalImagePicker {
  constructor(container) {
    this.previewElement = document.querySelector(
      container.getAttribute("data-preview-element")
    );
    this.input = document.querySelector(container.getAttribute("data-input"));

    this.modalImagePicker = new ModalImagePicker(container, {
      onItemSelect: this.onItemSelect.bind(this)
    });
  }

  onItemSelect({ id, src }) {
    this.setPreview(src);
    this.setInputValue(id);
  }

  setPreview(src) {
    this.previewElement.src = src;
  }

  setInputValue(id) {
    this.input.value = id;
  }
}

export default PreviewModalImagePicker;
