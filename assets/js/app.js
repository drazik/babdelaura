import 'classlist-polyfill';

import Search from './new/modules/search'
import Comments from './new/modules/comments'
import Header from './new/modules/header'

const searchContainer = document.querySelector('.js-search')

if (searchContainer) {
    new Search(searchContainer)
}

const commentsContainer = document.querySelector('.js-comments')

if (commentsContainer) {
    new Comments(commentsContainer)
}


const headerContainer = document.querySelector('.js-header')

if (headerContainer) {
    new Header(headerContainer)
}
