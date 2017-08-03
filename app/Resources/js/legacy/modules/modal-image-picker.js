import Modal from "./modal";
import ImagePicker from "./image-picker";

class ModalImagePicker {
  constructor(container, options = {}) {
    this.options = {
      /* eslint-disable no-empty-function */
      onItemSelect: () => {},
      /* eslint-enable no-empty-function */
      ...options
    };

    this.container = container;

    this.modal = new Modal(this.container, {
      onOpen: this.onOpen.bind(this)
    });
    this.imagePicker = new ImagePicker(
      this.container.querySelector(".js-preview-modal-image-picker-picker"),
      {
        onItemSelect: this.onItemSelect.bind(this)
      }
    );
  }

  onItemSelect({ id, src }) {
    this.options.onItemSelect({
      id,
      src
    });

    this.close();
  }

  onOpen() {
    window.dispatchEvent(new Event("modal-image-picker-open"));
  }

  close() {
    this.modal.close();
  }
}

export default ModalImagePicker;
