class Notification {
    constructor(container, options = {}) {
        this.options = {
            baseClassName: 'bab-Notification',
            visibleClassName: 'bab-Notification--visible',
            type: 'neutral',
            isVisible: false,
            ...options
        }

        this.container = container
        this.closer = container.querySelector('.js-notification-closer')
        this.content = container.querySelector('.js-notification-content')

        this.type = this.options.type
        this.isVisible = this.options.isVisible

        this.updateClassName()

        this.initEvents()
    }

    initEvents() {
        this.closer.addEventListener('click', this.hide.bind(this))
    }

    setText(text) {
        this.content.textContent = text
    }

    setType(type) {
        this.type = type

        this.updateClassName()
    }

    updateClassName() {
        let className = `${this.options.baseClassName} bab-Notification--${this.type}`

        if (this.isVisible) {
            className += ' ' + this.options.visibleClassName
        }

        this.container.className = className
    }

    hide() {
        this.isVisible = false
        this.updateClassName()
    }

    show() {
        this.isVisible = true
        this.updateClassName()
    }
}

export default Notification
