import 'classlist-polyfill';

import Nav from './modules/nav';
import Modal from './modules/modal';
import ImageUploadList from './modules/image-upload-list';
import ModalImagePicker from './modules/modal-image-picker';
import WYSIWYGEditor from './modules/wysiwyg-editor';

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));

const imageUploadListContainers = [...document.querySelectorAll('.js-image-upload-list')];
imageUploadListContainers.forEach(container => new ImageUploadList(container));

const modalImagePickerContainers = [...document.querySelectorAll('.js-modal-image-picker')];
modalImagePickerContainers.forEach(container => new ModalImagePicker(container));

new WYSIWYGEditor('*[data-editable]', 'data-name');
