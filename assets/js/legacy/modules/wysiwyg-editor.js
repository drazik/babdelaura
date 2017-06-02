class WYSIWYGEditor {
    constructor(container) {
        this.container = container;

        const browseUrl = this.container.getAttribute("data-browse-url");
        const cssUrl = this.container.getAttribute("data-css-url");
        const textarea = this.container.querySelector("textarea");
        const { CKEDITOR } = window;

        CKEDITOR.config.entities = false;
        /* eslint-disable camelcase */
        CKEDITOR.config.entities_latin = false;
        /* eslint-enable camelcase */

        CKEDITOR.replace(textarea.id, {
            filebrowserBrowseUrl: browseUrl,
            contentsCss: cssUrl,
        });
    }


}

export default WYSIWYGEditor;
