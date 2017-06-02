/**
 * Gestion de l'affichage du menu en mobile
 */
class Nav {
    constructor(container) {
        this.options = {
            itemsContainerOpenClass: "bab-MainNav--open",
            toggleIconOpenClass: "fa-bars",
            toggleIconCloseClass: "fa-times",
        };

        this.container = container;
        this.toggleButton = this.container.querySelector(".js-nav-toggle");
        this.toggleIcon = this.toggleButton.querySelector(".js-nav-toggle-icon");
        this.itemsContainer = this.container.querySelector(".js-nav-items");

        this.initEvents();
    }

    /**
     * Au click sur le bouton, toggle le menu
     */
    initEvents() {
        this.toggleButton.addEventListener("click", () => this.toggle());
    }

    /**
     * Ouvre ou ferme le menu selon son état actuel
     */
    toggle() {
        this.container.classList.toggle(this.options.itemsContainerOpenClass);
        this.toggleIcon.classList.toggle(this.options.toggleIconOpenClass);
        this.toggleIcon.classList.toggle(this.options.toggleIconCloseClass);
    }
}

export default Nav;
