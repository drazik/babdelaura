import 'classlist-polyfill';

import Search from './new/modules/search'

const searchContainer = document.querySelector('.js-search')

if (searchContainer) {
    new Search(searchContainer)
}
