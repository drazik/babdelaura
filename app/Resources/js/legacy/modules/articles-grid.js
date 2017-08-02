import delegate from "dom-delegate";
import getClosestParent from "closest";

/**
 * Gère le touch sur les grilles d'articles
 */
class ArticlesGrid {
  constructor(container) {
    this.container = container;
    this.containerDelegate = delegate(this.container);

    this.initEvents();
  }

  initEvents() {
    if (window.feature.touch) {
      // Au click sur un lien, on empêche la propagation de l'event aux parents
      this.containerDelegate.on("click", ".js-articles-grid-item a", event =>
        event.stopPropagation()
      );

      // Au click sur un item, on toggle le panneau de détail
      this.containerDelegate.on("click", ".js-articles-grid-item", event => {
        const item = getClosestParent(
          event.target,
          ".js-articles-grid-item",
          true
        );

        this.toggleDetails(item);
      });
    }
  }

  /**
     * Toggle la classe "hover" sur un item de la grille
     */
  toggleDetails(item) {
    item.classList.toggle("hover");
  }
}

export default ArticlesGrid;
