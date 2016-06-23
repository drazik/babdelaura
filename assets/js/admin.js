import 'classlist-polyfill';
import 'whatwg-fetch';

import Nav from './modules/nav';
import Modal from './modules/modal';
import ImageUpload from './modules/image-upload';
import ContentTools from 'ContentTools';

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));

const imageUploadContainers = [...document.querySelectorAll('.js-image-upload')];
imageUploadContainers.forEach(container => new ImageUpload(container));

const editor = ContentTools.EditorApp.get();
editor.init('*[data-editable]', 'data-name');
editor.addEventListener('saved', function (event) {
    const regions = event.detail().regions;

    for (let name in regions) {
        const formElement = document.getElementById(name);
        formElement.value = regions[name];
    }
});
