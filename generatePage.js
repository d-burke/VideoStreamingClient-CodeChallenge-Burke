function createPageRows(data) {
    const mainEl = document.getElementById('main');
    for (let i = 0; i < data.length; i++) {
        let rowId = 'rowId' + i;
        let title = data[i].title;
        const generatedRowElement = createRow(rowId, title);
        mainEl.appendChild(generatedRowElement);
        let imageUrls = data[i].items;
        const generatedCarouselItems = createCarouselContainer(imageUrls);
        const row = document.getElementById(rowId);
        row.appendChild(generatedCarouselItems);
    }
}

function createRow(id, title) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    if (id) {
        rowElement.id = id;
    }
    const titleElement = document.createElement('h2');
    titleElement.classList.add('row-title');
    titleElement.textContent = title;
    rowElement.appendChild(titleElement);
    return rowElement;
}

function createCarouselContainer(imgUrls) {
    if (!imgUrls || !imgUrls.length) {
        return;
    }
    const container = document.createElement('div');
    container.classList.add('carousel-container');
    imgUrls.forEach((imgUrl) => {
        const carouselItem = document.createElement('span');
        carouselItem.classList.add('carousel-item');
        const imgElement = document.createElement('img');
        imgElement.classList.add('thumbnail-img', 'tabItem');
        imgElement.setAttribute('tabindex', '0');
        imgElement.addEventListener('load', function () {
            carouselItem.appendChild(imgElement);
            container.appendChild(carouselItem);
        });
        imgElement.addEventListener('error', function () {
            console.error(`Error loading image: ${imgUrls}`);
        });
        imgElement.src = imgUrl;
    });
    return container;
}

function startPage() {
    mapData();
    createPageRows(window.pageData);
    addKeyboardControls();
}
