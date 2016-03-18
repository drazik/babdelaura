import 'classlist-polyfill';

import Nav from './modules/nav';
import Modal from './modules/modal';

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));
