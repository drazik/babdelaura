import 'classlist-polyfill';

import Search from './new/modules/search'
import Comments from './new/modules/comments'
import Header from './new/modules/header'
import ImagesSlideshow from './new/modules/images-slideshow'
import CookieBar from './new/modules/cookie-bar'

const searchContainer = document.querySelector('.js-search')

if (searchContainer) {
    new Search(searchContainer)
}


const headerContainer = document.querySelector('.js-header')
const header = new Header(headerContainer)


const commentsContainer = document.querySelector('.js-comments')

if (commentsContainer) {
    new Comments(commentsContainer, header)
}


const imagesSlideshowContainers = [...document.querySelectorAll('.js-images-slideshow')]
imagesSlideshowContainers.forEach(container => new ImagesSlideshow(container))


const cookieBarContainer = document.querySelector('.js-cookie-bar')

if (cookieBarContainer) {
    new CookieBar(cookieBarContainer)
}
