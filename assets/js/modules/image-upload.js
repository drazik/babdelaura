import XHRForm from './xhr-form';

class ImageUpload {
    constructor(container) {
        this.container = container;

        this.form = new XHRForm(this.container.querySelector('.js-image-upload-form'), {
            onSuccess: this.handleUploadSuccess.bind(this),
            onError: this.handleUploadError.bind(this)
        });
    }

    handleUploadSuccess() {
        window.location.reload();
    }

    handleUploadError(error) {
        throw new Error(error);
    }
}

export default ImageUpload;
