import XHRForm from './xhr-form'
//import Notification from './notification'

class CommentForm {
    constructor(container) {
        this.container = container

        this.form = container.querySelector('form')
        this.xhrForm = new XHRForm(this.form, {
            onSubmit: this.resetErrors.bind(this),
            onSuccess: this.onSuccess.bind(this),
            onError: this.onError.bind(this)
        })

        this.parentSelect = this.form.querySelector('#babdelaura_blogbundle_commentaire_parent')
        this.parentOptions = [...this.parentSelect.querySelectorAll('option')]

        const notificationContainerSelector = container.getAttribute('data-comment-form-notification')
        const notificationContainer = document.querySelector(notificationContainerSelector)
        this.notification = new Notification(notificationContainer)
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

    onSuccess(data) {
        const {
            success,
            errors
        } = data

        if (!success) {
            this.setErrors(errors)
            return
        }

        this.form.reset()

        /*this.notification.hide()

        if (data.success) {
            this.notification.setText(data.successMessage)
            this.notification.setType('success')
        } else {
            this.notification.setText('Erreur')
            this.notification.setType('error')
        }

        this.notification.show()*/
    }

    onError(error) {
        console.log('Error', error)
    }

    setErrors(errors) {
        for (const field in errors) {
            const messages = errors[field]
            this.setError(field, messages)
        }
    }

    setError(field, messages) {
        const message = messages.join(', ')
        const errorContainer = document.getElementById(`error-${field}`)

        errorContainer.textContent = message
    }

    resetErrors() {
        const errorContainers = [...this.container.querySelectorAll('[id^="error-"]')]

        errorContainers.forEach(container => this.resetError(container))
    }

    resetError(errorContainer) {
        errorContainer.textContent = ''
    }
}

export default CommentForm
