class WYSIWYGEditor {
    constructor(container) {
        this.container = container;

        const browseUrl = this.container.getAttribute('data-browse-url');
        const cssUrl = this.container.getAttribute('data-css-url');
        const textarea = this.container.querySelector('textarea');
        const {CKEDITOR} = window;

        CKEDITOR.config.entities = false;
        CKEDITOR.config.entities_latin = false;

        CKEDITOR.replace(textarea.id, {
            filebrowserBrowseUrl: browseUrl,
            contentsCss: cssUrl
        });
    }


}

export default WYSIWYGEditor;
