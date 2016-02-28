export default class Notification {
    constructor(container) {
        this.options = {
            timeBeforeClose: 10000
        };

        this.container = container;

        setTimeout(() => this.close, this.options.timeBeforeClose);
    }

    close() {
        this.container.parentNode.removeChild(this.container);
    }
}
