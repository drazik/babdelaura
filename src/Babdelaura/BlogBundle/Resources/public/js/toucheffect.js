(function($) {
    if (Modernizr.touch) {
        var $articles = $('.grid-item-article');

        $articles.on('click', '.grid-item-article-read', function(event) {
            event.stopPropagation();
        });

        $articles.on('click', function(event) {
            var $this = $(this);
            $this.toggleClass('hover');
        });
    }
})(jQuery);