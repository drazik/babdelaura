export default class Nav {
    constructor(container) {
        this.options = {
            itemsContainerOpenClass: 'bab-MainNav--open',
            toggleIconOpenClass: 'fa-bars',
            toggleIconCloseClass: 'fa-times'
        };

        this.container = container;
        this.toggleButton = this.container.querySelector('.js-nav-toggle');
        this.toggleIcon = this.toggleButton.querySelector('.js-nav-toggle-icon');
        this.itemsContainer = this.container.querySelector('.js-nav-items');

        this.initEvents();
    }

    initEvents() {
        this.toggleButton.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.container.classList.toggle(this.options.itemsContainerOpenClass);
        this.toggleIcon.classList.toggle(this.options.toggleIconOpenClass);
        this.toggleIcon.classList.toggle(this.options.toggleIconCloseClass);
    }
}
