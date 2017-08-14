import "babel-polyfill";
import "classlist-polyfill";

import Search from "./modules/search";
import Comments from "./modules/comments";
import Header from "./modules/header";
import ImagesSlideshow from "./modules/images-slideshow";
import CookieBar from "./modules/cookie-bar";

import "../css/main.css";

const searchContainer = document.querySelector(".js-search");

if (searchContainer) {
  const search = new Search(searchContainer);
}

const headerContainer = document.querySelector(".js-header");
const header = new Header(headerContainer);

const commentsContainer = document.querySelector(".js-comments");

if (commentsContainer) {
  const comments = new Comments(commentsContainer, header);
}

const imagesSlideshowContainers = [
  ...document.querySelectorAll(".js-images-slideshow")
];
imagesSlideshowContainers.forEach(container => new ImagesSlideshow(container));

const cookieBarContainer = document.querySelector(".js-cookie-bar");

if (cookieBarContainer) {
  const cookieBar = new CookieBar(cookieBarContainer);
}
