import {ENTER} from './keycodes'

class Autocomplete {
    constructor(container, options = {}) {
        this.options = {
            ...options
        }

        this.container = container

        const selectedChoicesContainer = container.querySelector('.js-autocomplete-selected-choices')
        this.selectedChoicesList = new SelectedChoicesList(selectedChoicesContainer)

        this.input = container.querySelector('.js-autocomplete-input')

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
        this.selectedChoicesList.addItem(item)
    }

    resetInput() {
        this.input.value = ''
    }
}

class SelectedChoicesList {
    constructor(container, options = {}) {
        this.options = {
            ...options
        }

        this.container = container

        this.items = []
    }

    addItem(item) {
        const sanitizedItem = this.sanitizeItem(item)

        if (this.items.indexOf(sanitizedItem) >= 0) {
            return
        }

        this.items.push(sanitizedItem)
        this.updateDOM()
    }

    sanitizeItem(item) {
        const sanitizedItem = item.trim().toLowerCase()

        return sanitizedItem
    }

    updateDOM() {
        const elements = this.items.map(item => this.getItemDOMElement(item))
        const fragment = document.createDocumentFragment()

        elements.forEach(element => fragment.appendChild(element))

        this.container.innerHTML = ''
        this.container.appendChild(fragment)
    }

    getItemDOMElement(item) {
        const template = `
<span class="bab-Autocomplete-selectedChoice">
    ${item}
    <button class="bab-Autocomplete-deleteChoice" type="button"></button>
</span>
`
        const element = document.createElement('div')
        element.innerHTML = template

        const actualElement = element.querySelector(':first-child')

        return actualElement
    }
}

export default Autocomplete
