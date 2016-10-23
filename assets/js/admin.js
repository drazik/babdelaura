import 'classlist-polyfill';

import Nav from './legacy/modules/nav';
import Modal from './legacy/modules/modal';
import ImageUploadList from './legacy/modules/image-upload-list';
import PreviewModalImagePicker from './legacy/modules/preview-modal-image-picker';
import WYSIWYGEditor from './legacy/modules/wysiwyg-editor';
import ImagePicker from './legacy/modules/image-picker';
import Autocomplete from './new/modules/autocomplete'

const navContainer = document.querySelector('.js-nav');
new Nav(navContainer);

const modalContainers = [...document.querySelectorAll('.js-modal')];
modalContainers.forEach(container => new Modal(container));

const imageUploadListContainers = [...document.querySelectorAll('.js-image-upload-list')];
imageUploadListContainers.forEach(container => new ImageUploadList(container));

const previewModalImagePickerContainers = [...document.querySelectorAll('.js-preview-modal-image-picker')];
previewModalImagePickerContainers.forEach(container => new PreviewModalImagePicker(container));

const wysiwygEditorContainers = [...document.querySelectorAll('.js-wysiwyg-editor')];
wysiwygEditorContainers.forEach(container => new WYSIWYGEditor(container));

const imagePickerContainers = [...document.querySelectorAll('.js-image-picker')];
imagePickerContainers.forEach(container => new ImagePicker(container));

const autocompleteContainers = [...document.querySelectorAll('.js-autocomplete')];
autocompleteContainers.forEach(container => new Autocomplete(container));
