import axios from 'axios'
import {ENTER} from './keycodes'
import debounce from 'lodash.debounce'
import delegate from 'dom-delegate'

class Autocomplete {
    constructor(container, options = {}) {
        this.options = {
            minLengthToTrigger: 2,
            ...options
        }

        this.container = container
        this.input = container.querySelector('.js-autocomplete-input')

        const selectedChoicesContainer = container.querySelector('.js-autocomplete-selected-choices')
        this.selectedChoicesList = new SelectedChoicesList(selectedChoicesContainer, {
            onItemDelete: this.onSelectedChoiceDelete.bind(this)
        })

        const sourceUrl = container.getAttribute('data-source-url')
        const availableChoicesContainer = container.querySelector('.js-autocomplete-available-choices')
        this.availableChoicesList = new AvailableChoicesList(availableChoicesContainer, sourceUrl, {
            onItemSelect: this.onAvailableChoiceSelect.bind(this),
            filterItems: this.filterAvailableChoices.bind(this)
        })
        this.availableChoicesList.show()

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
            } else {
                this.availableChoicesList.reset()
            }
        }, 100))
    }

    addItem(item) {
        this.selectedChoicesList.addItem(item)
    }

    resetInput() {
        this.input.value = ''
    }

    onAvailableChoiceSelect(item) {
        this.addItem(item)
        this.resetInput()
        this.input.focus()
    }

    filterAvailableChoices(items) {
        const selectedChoices = this.selectedChoicesList.getItems()
        const filteredItems = items.filter(item => selectedChoices.indexOf(item) === -1);

        return filteredItems
    }

    onSelectedChoiceDelete() {
        this.input.focus()
    }
}

class SelectedChoicesList {
    constructor(container, options = {}) {
        this.options = {
            onItemDelete: () => {},
            ...options
        }

        this.container = container

        this.items = []

        this.initEvents()
    }

    initEvents() {
        const delegation = delegate(this.container)

        delegation.on('click', 'button', event => {
            const item = event.target.parentNode.textContent.trim()

            this.deleteItem(item)
        })
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

    getItems() {
        return this.items
    }

    deleteItem(item) {
        this.items = this.items.filter(i => {
            return i !== item
        })

        this.updateDOM()

        this.options.onItemDelete()
    }
}

class AvailableChoicesList {
    constructor(container, sourceUrl, options = {}) {
        this.options = {
            containerVisibleClass: 'bab-Autocomplete-choices--visible',
            onItemSelect: () => {},
            filterItems: items => items,
            ...options
        }

        this.container = container
        this.sourceUrl = sourceUrl
        this.request = axios.create({
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        this.containerDelegate = delegate(container)

        this.initEvents()
    }

    initEvents() {
        this.containerDelegate.on('click', 'button', event => {
            const item = event.target.textContent.trim().toLowerCase()

            this.onItemSelect(item)
        })
    }

    onItemSelect(item) {
        this.options.onItemSelect(item)
        this.reset()
    }

    update(input) {
        this.request.get(this.sourceUrl, {
            params: {input}
        }).then(response => response.data)
            .then(items => this.filterItems(items))
            .then(filteredItems => this.updateDOM(filteredItems))
    }

    updateDOM(items) {
        const fragment = document.createDocumentFragment()

        items.forEach(item => {
            const element = this.createItemDOMElement(item)
            fragment.appendChild(element)
        })

        this.reset()
        this.container.appendChild(fragment)
    }

    createItemDOMElement(item) {
        const template = `
<li class="bab-Autocomplete-choiceItem">
    <button class="bab-Autocomplete-choice" type="button">
        ${item}
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

    reset() {
        this.container.innerHTML = ''
    }

    filterItems(items) {
        return this.options.filterItems(items)
    }
}

export default Autocomplete
