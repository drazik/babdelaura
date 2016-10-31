/* eslint-disable*/

CKEDITOR.plugins.add('signature', {
    icons: 'signature',
    init: function (editor) {
        editor.addCommand('insertSignature', {
            exec: function (editor) {
                editor.insertHtml('<img src="/images/new/signature.png" alt="Laura" />')
            }
        })

        editor.ui.addButton('Signature', {
            label: 'Insérer la signature',
            command: 'insertSignature',
            toolbar: 'insert'
        })
    }
});
