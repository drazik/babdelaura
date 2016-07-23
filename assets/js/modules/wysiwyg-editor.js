import ContentTools from 'ContentTools';
import ModalImagePicker from './modal-image-picker';

class WYSIWYGEditor {
    constructor(selector, name) {
        this.initTools();

        this.editor = ContentTools.EditorApp.get();
        this.editor.init(selector, name);

        this.initEvents();
    }

    initTools() {
        ContentTools.ToolShelf.stow(new ImagePickerTool(), 'image');

        ContentTools.DEFAULT_TOOLS = [
            [
                'bold',
                'italic',
                'link',
                'align-left',
                'align-center',
                'align-right'
            ], [
                'heading',
                'subheading',
                'paragraph',
                'unordered-list',
                'ordered-list',
                'table',
                'indent',
                'unindent',
                'line-break'
            ], [
                'image'
            ], [
                'undo',
                'redo',
                'remove'
            ]
        ];
    }

    initEvents() {
        this.editor.addEventListener('saved', this.handleSave.bind(this));
    }

    handleSave(event) {
        const regions = event.detail().regions;

        for (let name in regions) {
            const formElement = document.getElementById(name);
            formElement.value = regions[name];
        }
    }
}

class ImagePickerTool extends ContentTools.Tool {
    constructor() {
        super();

        this.label = 'Image';
        this.icon = 'image';
        this.imagePicker = new WYSIWYGImagePicker(document.querySelector('.js-wysiwyg-image-picker'));
    }

    canApply(element, selection) {
        if (selection == null || element == null) {
            return false;
        }

        const {_from: from, _to: to} = selection;

        return from === to;
    }

    isApplied(/*element, selection*/) {
        // TODO

        return false;
    }

    apply(/*element, selection, callback*/) {
        this.imagePicker.open();
    }
}

class WYSIWYGImagePicker {
    constructor(container) {
        this.modalImagePicker = new ModalImagePicker(container, {
            onItemSelect: () => {}
        });
    }

    open() {
        this.modalImagePicker.open();
    }

    close() {
        this.modalImagePicker.close();
    }
}

export default WYSIWYGEditor;
