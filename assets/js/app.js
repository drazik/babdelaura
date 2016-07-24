import 'classlist-polyfill';
import 'feature.js';

import Nav from './modules/nav';
import ImagesSlideshow from './modules/images-slideshow';
import Notification from './modules/notification';
import CookieBar from './modules/cookie-bar';
import ArticlesGrid from './modules/articles-grid';

const cookieBarContainer = document.querySelector('.js-cookie-bar');
new CookieBar(cookieBarContainer);

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const imagesSlideshowContainers = [...document.querySelectorAll('.js-images-slideshow')];
imagesSlideshowContainers.forEach(container => new ImagesSlideshow(container));

const notificationContainers = [...document.querySelectorAll('.js-notification')];
notificationContainers.forEach(container => new Notification(container));

const articlesGridContainers = [...document.querySelectorAll('.js-articles-grid')];
articlesGridContainers.forEach(container => new ArticlesGrid(container));
