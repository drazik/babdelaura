const getUrlParam = (paramName) => {
    /* eslint-disable no-useless-escape */
    const reParam = new RegExp(`(?:[\?&]|&)${paramName}=([^&]+)`, "i");
    /* eslint-enable no-useless-escape */
    const match = window.location.search.match(reParam);

    return (match && match.length > 1) ? match[1] : null;
};

export default getUrlParam;
