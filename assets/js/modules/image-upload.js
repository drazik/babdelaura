import XHRForm from './xhr-form';

/**
 * Gère un formulaire d'upload d'image
 */
class ImageUpload {
    constructor(container) {
        this.container = container;

        this.form = new XHRForm(this.container.querySelector('.js-image-upload-form'), {
            onSuccess: this.handleUploadSuccess.bind(this),
            onError: this.handleUploadError.bind(this)
        });
    }

    /**
     * Rafraichis la page lors du succès
     */
    handleUploadSuccess() {
        window.location.reload(true);
    }

    /**
     * Lève une erreur en cas d'erreur
     */
    handleUploadError(error) {
        throw new Error(error);
    }
}

export default ImageUpload;
