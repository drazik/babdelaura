import {viewports, getCurrentViewport} from '../utils/breakpoints'

class Header {
    constructor(container, options = {}) {
        this.options = {
            visibleClass: 'bab-Header--visible',
            triggerCrossClass: 'bab-NavigationTrigger--cross',
            dropshadowVisibleClass: 'bab-Dropshadow--visible',
            ...options
        }

        this.container = container

        const triggerSelector = container.getAttribute('data-header-trigger')
        this.trigger = document.querySelector(triggerSelector)

        this.dropshadow = document.querySelector('.js-dropshadow')

        this.lastScrollPosition = window.scrollY

        this.handleScroll = this.handleScroll.bind(this)
        this.handleResize = this.handleResize.bind(this)

        this.currentViewport = getCurrentViewport()

        if (this.currentViewport === viewports.LARGE_VIEWPORT) {
            this.show()
        }

        this.initEvents()
    }

    initEvents() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
        this.trigger.addEventListener('click', this.toggle.bind(this))
        this.dropshadow.addEventListener('click', this.toggle.bind(this))
    }

    handleScroll() {
        const newScrollPosition = window.scrollY

        newScrollPosition < this.lastScrollPosition ? this.show() : this.hide()

        this.lastScrollPosition = newScrollPosition
    }

    handleResize() {
        const newCurrentViewport = getCurrentViewport()

        if (newCurrentViewport === this.currentViewport) {
            return
        }

        if (this.currentViewport === viewports.LARGE_VIEWPORT && newCurrentViewport === viewports.MEDIUM_VIEWPORT || newCurrentViewport === viewports.SMALL_VIEWPORT) {
            this.hide()
        }

        if ((this.currentViewport === viewports.SMALL_VIEWPORT || this.currentViewport === viewports.MEDIUM_VIEWPORT) && newCurrentViewport === viewports.LARGE_VIEWPORT) {
            this.show()
        }

        this.currentViewport = newCurrentViewport
    }

    hide() {
        this.container.classList.remove(this.options.visibleClass)
    }

    show() {
        this.container.classList.add(this.options.visibleClass)
    }

    toggle() {
        this.trigger.classList.toggle(this.options.triggerCrossClass)
        this.container.classList.toggle(this.options.visibleClass)
        this.dropshadow.classList.toggle(this.options.dropshadowVisibleClass)
    }
}

export default Header
