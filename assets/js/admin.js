import 'classlist-polyfill';

import Nav from './modules/nav';
import Modal from './modules/modal';
import ContentTools from 'ContentTools';
import ImageUploadList from './modules/image-upload-list';

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));

const imageUploadListContainers = [...document.querySelectorAll('.js-image-upload-list')];
imageUploadListContainers.forEach(container => new ImageUploadList(container));

const editor = ContentTools.EditorApp.get();
editor.init('*[data-editable]', 'data-name');
editor.addEventListener('saved', function (event) {
    const regions = event.detail().regions;

    for (let name in regions) {
        const formElement = document.getElementById(name);
        formElement.value = regions[name];
    }
});
