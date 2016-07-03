import axios from 'axios';

class XHRForm {
    constructor(container, options = {}) {
        this.options = {
            onSuccess: () => {},
            onError: () => {},
            ...options
        };

        this.container = container;
        this.url = this.container.getAttribute('action');

        this.initEvents();
    }

    initEvents() {
        this.container.addEventListener('submit', event => {
            event.preventDefault();
            this.submit();
        });
    }

    submit() {
        const data = new FormData(this.container);
        const config = {};
        const {onSuccess, onError} = this.options;

        axios.post(this.url, data, config)
            .then(response => response.data)
            .then(response => {

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
