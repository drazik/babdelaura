class Header {
    constructor(container, options = {}) {
        this.options = {
            hiddenClass: 'bab-Header--hidden',
            ...options
        }

        this.container = container
        this.lastScrollPosition = window.scrollY

        this.initEvents()
    }

    initEvents() {
        window.addEventListener('scroll', () => {
            const newScrollPosition = window.scrollY

            if (newScrollPosition < this.lastScrollPosition) {
                this.show()
            } else {
                this.hide()
            }

            this.lastScrollPosition = newScrollPosition
        })
    }

    hide() {
        this.container.classList.add(this.options.hiddenClass)
    }

    show() {
        this.container.classList.remove(this.options.hiddenClass)
    }
}

export default Header
