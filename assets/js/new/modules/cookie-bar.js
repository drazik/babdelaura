/**
 * Gère l'affichage de la cookiebar
 */
class CookieBar {
    constructor(container) {
        this.options = {
            containerOpenClass: "bab-CookieBar--open",
            cookieName: "bab-accept-cookies",
            cookieValue: "true",
            cookieDuration: 365,
        };

        this.container = container;
        this.button = this.container.querySelector(".js-cookie-bar-button");

        // On récupère le cookie, et si il ne vaut pas la valeur attendue,
        // cela veut dire que les cookies n'ont pas été acceptés, donc
        // on affiche la cookiebar
        const cookie = this.getCookie(this.options.cookieName);

        if (cookie !== this.options.cookieValue) {
            this.open();
        }

        this.initEvents();
    }

    initEvents() {
        this.button.addEventListener("click", () => this.accept());
    }

    /**
     * Ajoute un cookie avec la valeur attendue et ferme la cookiebar
     */
    accept() {
        this.close();

        this.setCookie(this.options.cookieName, this.options.cookieValue, this.options.cookieDuration);
    }

    /**
     * Affiche la cookiebar
     */
    open() {
        this.container.classList.add(this.options.containerOpenClass);
    }

    /**
     * Ferme la cookiebar
     */
    close() {
        this.container.classList.remove(this.options.containerOpenClass);
    }

    /**
     * Récupère la valeur d'un cookie
     */
    getCookie(name) {
        const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);

        return v ? v[2] : null;
    }

    /**
     * Attribue une valeur à un cookie pour un nombre de jours donné
     */
    setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
    }
}

export default CookieBar;
