import ContentTools from 'ContentTools';

class WYSIWYGEditor {
    constructor(selector, name) {
        this.initTools();

        this.editor = ContentTools.EditorApp.get();
        this.editor.init(selector, name);

        this.initEvents();
    }

    initTools() {
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

export default WYSIWYGEditor;
