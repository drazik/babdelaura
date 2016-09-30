const SMALL_VIEWPORT = 'screen and (max-width: 400px)'
const MEDIUM_VIEWPORT = 'screen and (max-width: 790px)'
const LARGE_VIEWPORT = 'screen and (min-width: 791px)'

const viewports = {
    SMALL_VIEWPORT,
    MEDIUM_VIEWPORT,
    LARGE_VIEWPORT
}

const match = viewport => {
    return window.matchMedia(viewport).matches
}

const getCurrentViewport = () => {
    for (let viewport in viewports) {
        if (match(viewports[viewport])) {
            return viewports[viewport]
        }
    }
}

export {
    viewports,
    getCurrentViewport
}
