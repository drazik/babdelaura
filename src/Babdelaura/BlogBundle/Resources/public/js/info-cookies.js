(function($) {
    if (!$.cookie('infocookies')) {
        $('body').append('<div class="notification notification-info" id="info-cookies"><div class="notification-content">En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de cookies afin de réaliser des statistiques de visites anonymes. <button class="button button-small" id="info-cookies-confirm" type="button">OK</button></div></div>');
    }

    $('#info-cookies-confirm').on('click', function(event) {
        event.preventDefault();

        $.cookie('infocookies', 'viewed', {expires: 30 * 12});
        $('#info-cookies').fadeOut();
    })
})(jQuery);