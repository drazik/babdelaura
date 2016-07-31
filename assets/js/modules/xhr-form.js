import axios from 'axios';

/**
 * Gestion d'un formulaire XHR
 */
class XHRForm {
    constructor(container, options = {}) {
        this.options = {
            onSuccess: () => {},
            onError: () => {},
            ...options
        };

        this.container = container;
        this.url = this.container.getAttribute('action');
        this.submitButton = this.container.querySelector('[type="submit"]');

        console.log(this.url);

        this.initEvents();
    }

    /**
     *  Bloquage de l'événement submit par défaut
     */
    initEvents() {
        this.container.addEventListener('submit', event => {
            event.preventDefault();
            this.submit();
        });
    }

    /**
     * Gestion de la soumission du formulaire en XHR
     */
    submit() {
        const data = new FormData(this.container);
        const config = {};
        const {onSuccess, onError} = this.options;

        this.submitButton.disabled = true;

        axios.post(this.url, data, config)
            .then(response => response.data)
            .then(response => {

                this.submitButton.disabled = false;
                this.container.reset();

                if (response.success) {
                    return response.data;
                }

                throw new Error(response.error);
            })
            .then(data => onSuccess(data))
            .catch(error => onError(error));
    }
}

export default XHRForm;
