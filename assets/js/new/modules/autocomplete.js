import {ENTER} from './keycodes'

class Autocomplete {
    constructor(container, options = {}) {
        this.options = {
            ...options
        }

        this.container = container
        this.input = container.querySelector('.js-autocomplete-input')

        this.items = []

        this.initEvents()
    }

    initEvents() {
        this.input.addEventListener('keydown', event => {
            if (event.keyCode === ENTER) {
                event.preventDefault()

                this.addItem(this.input.value)
                this.resetInput()
            }
        })
    }

    addItem(item) {
        const sanitizedItem = this.sanitizeItem(item)

        if (this.items.indexOf(sanitizedItem) >= 0) {
            return
        }

        this.items.push(item)
        this.refreshSelectedItems()
    }

    refreshSelectedItems() {
        // TODO implement
    }

    resetInput() {
        this.input.value = ''
    }

    sanitizeItem(item) {
        return item.trim().toLowerCase()
    }
}

export default Autocomplete
