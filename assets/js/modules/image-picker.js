import delegate from 'dom-delegate';
import getUrlParam from '../utils/get-url-param';

class ImagePicker {
    constructor(container, options = {}) {
        this.options = {
            onItemSelect: () => {},
            ...options
        };

        this.container = container;

        this.containerDelegate = delegate(this.container);

        this.CKEditorFuncNum = getUrlParam('CKEditorFuncNum');

        this.initEvents();
    }

    initEvents() {
        this.containerDelegate.on('click', '.js-image-picker-item', this.handleItemSelect.bind(this));
    }

    handleItemSelect(event) {
        const {id, src} = event.target;

        if (this.CKEditorFuncNum) {
            if (window.opener) {
                window.opener.CKEDITOR.tools.callFunction(this.CKEditorFuncNum, src);
                window.close();
            }
        } else {
            this.options.onItemSelect({id, src});
        }
    }
}

export default ImagePicker;
