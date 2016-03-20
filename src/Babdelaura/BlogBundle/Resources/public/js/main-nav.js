(function($) {
    var $mainNav = $('#main-nav');
    var $mainNavToggleButton = $mainNav.find('#main-nav-toggle');
    var $mainNavContainer = $mainNav.find('#main-nav-container');

    $mainNavToggleButton.on('click', function(event) {
        var $mainNavToggleIcon = $(this).find('.fa');

        $mainNav.toggleClass('open');

        $mainNavToggleIcon.toggleClass('fa-bars');
        $mainNavToggleIcon.toggleClass('fa-times');
    });
})(jQuery);