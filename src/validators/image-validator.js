const imageValidator = (imgSrc) => {
    const img = new Image();

    let promise = new Promise(resolve => {
        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
    }).then(result => {
        return result;
    });

    img.src = imgSrc;
    return promise;
};

export default imageValidator;