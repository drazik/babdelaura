/**
 * Gestion de l'affichage des notifications
 */
class Notification {
    constructor(container) {
        this.options = {
            timeBeforeClose: 10000,
        };

        this.container = container;

        setTimeout(() => this.close, this.options.timeBeforeClose);
    }

    /**
     * Femerture de la notification
     */
    close() {
        this.container.parentNode.removeChild(this.container);
    }
}

export default Notification;
