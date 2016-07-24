import XHRForm from './xhr-form';
import ImagesList from './images-list';

class ImageUploadList {
    constructor(container) {
        this.container = container;

        const imageUploadFormContainer = this.container.querySelector('.js-image-upload-form');
        this.imageUploadForm = new XHRForm(imageUploadFormContainer, {
            onSuccess: this.handleImageUploadSuccess.bind(this),
            onError: this.handleImageUploadError.bind(this)
        });

        const imagesListContainer = this.container.querySelector('.js-images-list');
        this.imagesList = new ImagesList(imagesListContainer);
    }

    handleImageUploadSuccess() {
        this.imagesList.refresh();
    }

    handleImageUploadError(error) {
        throw new Error(error);
    }
}

export default ImageUploadList;
