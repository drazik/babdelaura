import delegate from "dom-delegate";
import CommentForm from "./comment-form";
import Comment from "./comment";
import getParent from "closest";

class Comments {
    constructor(container, header) {
        this.container = container;
        this.containerDelegate = delegate(container);

        const formSelector = container.getAttribute("data-comments-form");
        const formContainer = document.querySelector(formSelector);
        this.form = new CommentForm(formContainer, header);

        const commentContainers = [...container.querySelectorAll(".js-comment")];
        this.comments = commentContainers.map(container => new Comment(container));

        this.currentlyAnsweringComment = null;

        this.initEvents();
    }

    initEvents() {
        this.containerDelegate.on("click", ".js-comment-answer", this.handleAnswerClick.bind(this));
    }

    handleAnswerClick(event) {
        const { target } = event;

        const commentContainer = getParent(target, ".js-comment");
        /* eslint-disable eqeqeq */
        const comment = this.comments.filter(comment => comment.container == commentContainer).pop();
        /* eslint-enable eqeqeq */

        if (comment.isAnswering) {
            this.currentlyAnsweringComment && this.currentlyAnsweringComment.reset();
            comment.reset();
            this.form.restore();
        }
        else {
            this.currentlyAnsweringComment && this.currentlyAnsweringComment.reset();
            this.currentlyAnsweringComment = comment;
            comment.answering();
            this.form.appendTo(comment);
        }
    }
}

export default Comments;
