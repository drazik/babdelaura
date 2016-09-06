import scrollDirection from 'bloody-scroll-direction'

class Header {
    constructor(container, options = {}) {
        this.options = {
            hiddenClass: 'bab-Header--hidden',
            ...options
        }

        this.container = container
        this.scrollDirection = scrollDirection.create()

        this.initEvents()
    }

    initEvents() {
        this.scrollDirection.on('change', this.onScrollDirectionChange.bind(this))
    }

    onScrollDirectionChange({direction}) {
        if (direction === 1) {
            this.hide()
        } else if (direction === -1) {
            this.show()
        }
    }

    hide() {
        this.container.classList.add(this.options.hiddenClass)
    }

    show() {
        this.container.classList.remove(this.options.hiddenClass)
    }
}

export default Header
