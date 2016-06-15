import delegate from 'dom-delegate';

export default class Modal {
    constructor(container) {
        this.options = {
            openClass: 'bab-Modal--open',
            noScrollClass: 'noscroll'
        };

        this.container = container;

        this.bodyDelegate = delegate(document.body);
        this.containerDelegate = delegate(this.container);

        this.initEvents();
    }

    initEvents() {
        this.bodyDelegate.on('click', `.js-modal-opener[data-target="${this.container.id}"]`, this.open.bind(this));
        this.containerDelegate.on('click', '.js-modal-closer', this.close.bind(this));

        window.addEventListener('keyup', event => {
            const ESCAPE = 27;

            if (event.keyCode === ESCAPE) {
                this.close();
            }
        });
    }

    open() {
        this.container.classList.add(this.options.openClass);
        document.documentElement.classList.add(this.options.noScrollClass);
        document.body.classList.add(this.options.noScrollClass);
    }

    close() {
        this.container.classList.remove(this.options.openClass);
        document.documentElement.classList.remove(this.options.noScrollClass);
        document.body.classList.add(this.options.noScrollClass);
    }
}
