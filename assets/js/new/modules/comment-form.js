import XHRForm from './xhr-form'
import Notification from './notification'

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

        setTimeout(() => {
            const {offsetTop} = comment.container

            window.scrollTo(0, offsetTop)
        }, 500)
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
            errors,
            message
        } = data

        if (!success) {
            this.setErrors(errors)
            return
        }

        this.form.reset()

        this.notification.hide()
        this.notification.setText(message)
        this.notification.setType('success')
        this.notification.show()
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
