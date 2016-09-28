class Header {
    constructor(container, options = {}) {
        this.options = {
            visibleClass: 'bab-Header--visible',
            triggerCrossClass: 'bab-NavigationTrigger--cross',
            ...options
        }

        this.container = container

        const triggerSelector = container.getAttribute('data-header-trigger')
        this.trigger = document.querySelector(triggerSelector)

        this.lastScrollPosition = window.scrollY

        this.initEvents()
    }

    initEvents() {
        /*window.addEventListener('scroll', () => {
            const newScrollPosition = window.scrollY

            if (newScrollPosition < this.lastScrollPosition) {
                this.show()
            } else {
                this.hide()
            }

            this.lastScrollPosition = newScrollPosition
        })*/

        this.trigger.addEventListener('click', this.toggle.bind(this))
    }

    /*hide() {
        this.container.classList.add(this.options.hiddenClass)
    }

    show() {
        this.container.classList.remove(this.options.hiddenClass)
    }*/

    toggle() {
        this.trigger.classList.toggle(this.options.triggerCrossClass)
        this.container.classList.toggle(this.options.visibleClass)
    }
}

export default Header
