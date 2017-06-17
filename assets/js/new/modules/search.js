class Search {
  constructor(container) {
    this.options = {
      formHiddenClass: "bab-Search-form--hidden"
    };

    this.opener = container.querySelector(".js-search-opener");
    this.form = container.querySelector(".js-search-form");
    this.input = this.form.querySelector(".js-search-input");

    this.initEvents();
  }

  initEvents() {
    this.opener.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    this.form.classList.toggle(this.options.formHiddenClass);

    this.input.focus();
  }

  isHidden() {
    return this.form.classList.contains(this.options.formHiddenClass);
  }
}

export default Search;
