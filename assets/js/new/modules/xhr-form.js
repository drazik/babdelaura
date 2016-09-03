import axios from 'axios'

/**
 * Gestion d'un formulaire XHR
 */
class XHRForm {
    constructor(container, options = {}) {
        this.options = {
            onSubmit: () => {},
            onSuccess: () => {},
            onError: () => {},
            ...options
        }

        this.container = container
        this.url = this.container.getAttribute('action')
        this.submitButton = this.container.querySelector('[type="submit"]')

        this.initEvents()
    }

    /**
     *  Bloquage de l'événement submit par défaut
     */
    initEvents() {
        this.container.addEventListener('submit', event => {
            event.preventDefault()
            this.submit()
        });
    }

    /**
     * Gestion de la soumission du formulaire en XHR
     */
    submit() {
        const data = new FormData(this.container)
        const config = {}
        const {
            onSubmit,
            onSuccess,
            onError
        } = this.options

        this.submitButton.disabled = true

        onSubmit()

        axios.post(this.url, data, config)
            .then(response => {
                this.submitButton.disabled = false

                if (response.status === 200) {
                    return response.data
                }

                throw new Error('error')
            })
            .then(data => onSuccess(data))
            .catch(error => {
                this.submitButton.disabled = false

                onError(error)
            })
    }
}

export default XHRForm
