/**
 * Gestion de l'affichage des notifications
 */
class Notification {
    constructor(container, options = {}) {
        this.options = {
            baseClassName: 'Notification',
            ...options
        }

        this.container = container
        this.type = this.options.type
    }

    setText(text) {
        // TODO modifier le texte de la notification
    }

    setType(type) {
        // TODO modifier le type de la notification, puis mettre à jour son style
    }

    updateClassName() {
        const className = `${this.options.baseClassName} Notification-${this.type}`

        this.container.className = className
    }
}

export default Notification;
