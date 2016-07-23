import 'classlist-polyfill';

import Nav from './modules/nav';
import Modal from './modules/modal';
import ImageUploadList from './modules/image-upload-list';
import PreviewModalImagePicker from './modules/preview-modal-image-picker';
import WYSIWYGEditor from './modules/wysiwyg-editor';

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));

const imageUploadListContainers = [...document.querySelectorAll('.js-image-upload-list')];
imageUploadListContainers.forEach(container => new ImageUploadList(container));

const previewModalImagePickerContainers = [...document.querySelectorAll('.js-preview-modal-image-picker')];
previewModalImagePickerContainers.forEach(container => new PreviewModalImagePicker(container));

new WYSIWYGEditor('*[data-editable]', 'data-name');
