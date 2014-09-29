require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    },
    map: {
        '*': {'jquery': 'jquery-private'},
        'jquery-private': {'jquery': 'jquery'}
    }
});

require(['jquery'], function($) {
    console.log('test');
});