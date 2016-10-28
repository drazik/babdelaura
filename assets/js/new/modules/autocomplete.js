import axios from 'axios'
import {ENTER} from './keycodes'
import debounce from 'lodash.debounce'

class Autocomplete {
    constructor(container, options = {}) {
        this.options = {
            minLengthToTrigger: 2,
            ...options
        }

        this.container = container
        this.input = container.querySelector('.js-autocomplete-input')

        const selectedChoicesContainer = container.querySelector('.js-autocomplete-selected-choices')
        this.selectedChoicesList = new SelectedChoicesList(selectedChoicesContainer)

        const sourceUrl = container.getAttribute('data-source-url')
        const availableChoicesContainer = container.querySelector('.js-autocomplete-available-choices')
        this.availableChoicesList = new AvailableChoicesList(availableChoicesContainer, sourceUrl)

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

        this.input.addEventListener('keyup', debounce(event => {
            const {value} = event.target

            if (value.length >= this.options.minLengthToTrigger) {
                this.availableChoicesList.update(value)
            }
        }, 100))

        this.input.addEventListener('focus', () => this.availableChoicesList.show())
        this.input.addEventListener('blur', () => this.availableChoicesList.hide())
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
        const elements = this.items.map(item => this.createItemDOMElement(item))
        const fragment = document.createDocumentFragment()

        elements.forEach(element => fragment.appendChild(element))

        this.container.innerHTML = ''
        this.container.appendChild(fragment)
    }

    createItemDOMElement(item) {
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

class AvailableChoicesList {
    constructor(container, sourceUrl, options = {}) {
        this.options = {
            containerVisibleClass: 'bab-Autocomplete-choices--visible',
            ...options
        }

        this.container = container
        this.sourceUrl = sourceUrl
        this.request = axios.create({
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }

    update(input) {
        console.log(input)
        this.request.get(this.sourceUrl, {
            params: {input}
        }).then(response => response.data)
            .then(items => this.updateDOM(items))
    }

    updateDOM(items) {
        const fragment = document.createDocumentFragment()

        items.forEach(item => {
            const element = this.createItemDOMElement(item)
            fragment.appendChild(element)
        })

        this.container.innerHTML = ''
        this.container.appendChild(fragment)
    }

    createItemDOMElement(item) {
        const template = `
<li class="bab-Autocomplete-choiceItem">
    <button class="bab-Autocomplete-choice" type="button">
        ${item.nom}
    </button>
</li>
`
        const element = document.createElement('ul')
        element.innerHTML = template

        const actualElement = element.querySelector(':first-child')

        return actualElement
    }

    show() {
        this.container.classList.add(this.options.containerVisibleClass)
    }

    hide() {
        this.container.classList.remove(this.options.containerVisibleClass)
    }
}

export default Autocomplete
