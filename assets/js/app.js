import 'classlist-polyfill';

import Search from './new/modules/search'
import Comments from './new/modules/comments'

const searchContainer = document.querySelector('.js-search')

if (searchContainer) {
    new Search(searchContainer)
}

const commentsContainer = document.querySelector('.js-comments')

if (commentsContainer) {
    new Comments(commentsContainer)
}
