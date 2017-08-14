class Comment {
  constructor(container, options = {}) {
    this.options = {
      isAnsweringButtonText: "Annuler la réponse",
      isAnsweringButtonClass: "bab-Comment-answerButton--answering",
      normalButtonText: "Répondre",
      ...options
    };

    this.container = container;
    this.answerButton = container.querySelector(".js-comment-answer");
    this.isAnswering = false;
    this.parentId = container.getAttribute("data-parent-id");
  }

  answering() {
    this.isAnswering = true;
    this.answerButton.textContent = this.options.isAnsweringButtonText;
    this.answerButton.classList.add(this.options.isAnsweringButtonClass);
  }

  reset() {
    this.isAnswering = false;
    this.answerButton.textContent = this.options.normalButtonText;
    this.answerButton.classList.remove(this.options.isAnsweringButtonClass);
  }
}

export default Comment;
