import axios from 'axios';

export default class ImageUpload {
    constructor(container) {
        this.container = container;

        this.initEvents();
    }

    initEvents() {
        this.container.addEventListener('submit', event => {
            event.preventDefault();
            this.submit();
        });
    }

    submit() {
        const url = this.container.getAttribute('action');
        const data = new FormData(this.container);
        const config = {};

        axios.post(url, data, config)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}
