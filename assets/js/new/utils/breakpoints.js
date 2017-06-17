const SMALL_VIEWPORT = "screen and (max-width: 430px)";
const MEDIUM_VIEWPORT = "screen and (max-width: 790px)";
const LARGE_VIEWPORT = "screen and (min-width: 791px)";

const viewports = {
  SMALL_VIEWPORT,
  MEDIUM_VIEWPORT,
  LARGE_VIEWPORT
};

const match = viewport => window.matchMedia(viewport).matches;

const getCurrentViewport = () => {
  for (const viewport in viewports) {
    if (match(viewports[viewport])) {
      return viewports[viewport];
    }
  }
};

export { viewports, getCurrentViewport };
