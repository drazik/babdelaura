import delegate from 'dom-delegate';
import getClosestParent from 'closest';

class ArticlesGrid {
    constructor(container) {
        this.container = container;
        this.containerDelegate = delegate(this.container);

        this.initEvents();
    }

    initEvents() {
        if (window.feature.touch) {
            this.containerDelegate.on('click', '.js-articles-grid-item a', event => event.stopPropagation());
            this.containerDelegate.on('click', '.js-articles-grid-item', event => {
                const item = getClosestParent(event.target, '.js-articles-grid-item', true);

                this.toggleDetails(item);
            });
        }
    }

    toggleDetails(item) {
        item.classList.toggle('hover');
    }
}

export default ArticlesGrid;
