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
        const data = new FormData(this.container);
        const url = this.container.getAttribute('action');

        fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
}
