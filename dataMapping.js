function mapData() {
    window.pageData = [];
    const sourceData = safeAccessObj(
        window,
        convertObjPathStringToKeysArray(`data.data`),
    );
    if (!sourceData) {
        console.error('no page data found');
        return null;
    }
    const rowObjects = safeAccessObj(
        sourceData,
        convertObjPathStringToKeysArray(`StandardCollection.containers`),
    );
    if (!rowObjects) {
        console.error('no StandardCollection data to display');
        return null;
    }
    for (let i = 0; i < rowObjects.length; i++) {
        let catagoryTitle =
            rowObjects[i].set.text.title.full.set.default.content;
        if (catagoryTitle && rowObjects[i].set.items) {
            let items = rowObjects[i].set.items;
            if (items.length) {
                let imgItems = [];
                for (let j = 0; j < items.length; j++) {
                    let imgUrl = '';
                    imgUrl = safeAccessObj(
                        items[j],
                        convertObjPathStringToKeysArray(
                            `image.tile['1.78'].series.default.url`,
                        ),
                    );
                    if (!imgUrl) {
                        imgUrl = safeAccessObj(
                            items[j],
                            convertObjPathStringToKeysArray(
                                `image.tile['1.78'].program.default.url`,
                            ),
                        );
                    }
                    if (!imgUrl) {
                        imgUrl = safeAccessObj(
                            items[j],
                            convertObjPathStringToKeysArray(
                                `image.tile['1.78'].default.default.url`,
                            ),
                        );
                    }
                    if (imgUrl) {
                        imgItems.push(imgUrl);
                    }
                }
                window.pageData.push({
                    title: catagoryTitle,
                    items: imgItems,
                });
            }
        }
    }
}
