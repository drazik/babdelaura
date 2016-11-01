/* eslint-disable*/

CKEDITOR.plugins.add('signature', {
    icons: 'signature',
    init: function (editor) {
        editor.addCommand('insertSignature', {
            exec: function (editor) {
                editor.insertHtml('<div class="bab-Article-signature"><img src="/images/new/signature.png" alt="Laura" /></div>')
            }
        })

        editor.ui.addButton('Signature', {
            label: 'Insérer la signature',
            command: 'insertSignature',
            toolbar: 'insert'
        })
    }
});
