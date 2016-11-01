import delegate from 'dom-delegate';

/**
 * Fenêtre modale
 */
class Modal {
    constructor(container) {
        this.options = {
            openClass: 'bab-Modal--open',
            noScrollClass: 'noscroll'
        };

        this.container = container;
        this.id = this.container.id;

        this.bodyDelegate = delegate(document.body);
        this.containerDelegate = delegate(this.container);

        this.initEvents();
    }

    /**
     * Gestion des événements :
     *  - Ouverture de la modale
     *  - Fermeture de la modale (au click sur un bouton)
     *  - Fermeture de la modale (à l'appui sur la touche ECHAP)
     */
    initEvents() {
        this.bodyDelegate.on('click', `.js-modal-opener[data-target="${this.id}"]`, this.open.bind(this));
        this.containerDelegate.on('click', '.js-modal-closer', this.close.bind(this));

        window.addEventListener('keyup', event => {
            const ESCAPE = 27;

            if (event.keyCode === ESCAPE) {
                this.close();
            }
        });
    }

    /**
     * Ouverture de la modale
     */
    open() {
        this.container.classList.add(this.options.openClass);
        document.documentElement.classList.add(this.options.noScrollClass);
        document.body.classList.add(this.options.noScrollClass);
    }

    /**
     * Fermeture de la modale
     */
    close() {
        this.container.classList.remove(this.options.openClass);
        document.documentElement.classList.remove(this.options.noScrollClass);
        document.body.classList.add(this.options.noScrollClass);
    }
}

export default Modal;
