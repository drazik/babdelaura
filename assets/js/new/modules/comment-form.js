class CommentForm {
    constructor(container) {
        this.container = container
        this.form = container.querySelector('form')
        this.parentSelect = this.form.querySelector('#babdelaura_blogbundle_commentaire_parent')
        this.parentOptions = [...this.parentSelect.querySelectorAll('option')]
    }

    setParent(parentId) {
        const selectedOption = this.parentOptions.filter(option => option.value == parentId).pop()
        this.parentOptions.forEach(option => option.selected = false)

        if (selectedOption) {
            selectedOption.selected = true
        } else {
            this.parentOptions[0].selected = true
        }
    }

    appendTo(comment) {
        comment.container.appendChild(this.form)
        this.setParent(comment.parentId)
    }

    restoreInOriginalContainer() {
        this.container.appendChild(this.form)
    }

    restore() {
        this.restoreInOriginalContainer()
        this.setParent(null)
    }
}

export default CommentForm
