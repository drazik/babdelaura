export default class CookieBar {
    constructor(container) {
        this.options = {
            containerOpenClass: 'bab-CookieBar--open',
            cookieName: 'bab-accept-cookies',
            cookieValue: 'true',
            cookieDuration: 365
        };

        this.container = container;
        this.button = this.container.querySelector('.js-cookie-bar-button');

        const cookie = this.getCookie(this.options.cookieName);

        if (cookie !== this.options.cookieValue) {
            this.open();
        }

        this.initEvents();
    }

    initEvents() {
        this.button.addEventListener('click', () => this.accept());
    }

    accept() {
        this.close();

        this.setCookie(this.options.cookieName, this.options.cookieValue, this.options.cookieDuration);
    }

    open() {
        this.container.classList.add(this.options.containerOpenClass);
    }

    close() {
        this.container.classList.remove(this.options.containerOpenClass);
    }

    getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    setCookie(name, value, days) {
	    var d = new Date;
	    d.setTime(d.getTime() + 24*60*60*1000*days);
	    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	}
}
