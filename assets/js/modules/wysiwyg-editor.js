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
        this.imagePicker = new ModalImagePicker(document.querySelector('.js-wysiwyg-image-picker'), {
            onItemSelect: this.handleItemSelect.bind(this)
        });
    }

    canApply(/*element, selection*/) {
        // TODO

        return true;
    }

    isApplied(/*element, selection*/) {
        // TODO

        return false;
    }

    apply(element, selection) {
        this.element = element;
        this.from = selection._from;
        this.to = selection._to;

        this.element.storeState();

        this.imagePicker.open();
    }

    handleItemSelect(src) {
        console.log(src);

        this.element.restoreState();
    }
}

export default WYSIWYGEditor;
