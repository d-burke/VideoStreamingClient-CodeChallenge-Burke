function addKeyboardControls() {
    window.controls = {};
    const ctrls = window.controls;
    ctrls.currentElFocus = document.activeElement;
    ctrls.pageElementsGrid = [];
    ctrls.focusCol = 0;
    ctrls.focusRow = 0;
    const containers = document.getElementsByClassName('carousel-container');
    for (let i = 0; i < containers.length; i++) {
        const items = containers[i].getElementsByClassName('tabItem');
        ctrls.pageElementsGrid.push(items);
    }
    document.addEventListener('keydown', handleKeyPress);
}

function findElementCoordinatesInGrid(grid, focusedElement) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === focusedElement) {
                return { row: row, col: col };
            }
        }
    }
    return null;
}

function handleKeyPress(event) {
    const ctrls = window.controls;
    if (event.key === 'ArrowRight') {
        if (
            ctrls.focusCol <
            ctrls.pageElementsGrid[ctrls.focusRow].length - 1
        ) {
            ctrls.focusCol++;
            ctrls.currentElFocus =
                ctrls.pageElementsGrid[ctrls.focusRow][ctrls.focusCol];
            ctrls.currentElFocus.focus();
        } else {
            console.log('Keyboard controls right end');
        }
    } else if (event.key === 'ArrowLeft') {
        if (ctrls.focusCol > 0) {
            ctrls.focusCol--;
            ctrls.currentElFocus =
                ctrls.pageElementsGrid[ctrls.focusRow][ctrls.focusCol];
            ctrls.currentElFocus.focus();
        } else {
            console.log('Keyboard controls left end');
        }
    } else if (event.key === 'ArrowUp') {
        if (ctrls.focusRow > 0) {
            const currentRow = ctrls.pageElementsGrid[ctrls.focusRow];
            ctrls.focusRow--;
            const moveFromRowElement = document.activeElement;
            const moveFromCarouselRow =
                moveFromRowElement.parentNode.parentNode;
            const moveToRowElement = ctrls.pageElementsGrid[ctrls.focusRow][0];
            const moveToCarouselfRow = moveToRowElement.parentNode.parentNode;
            const moveFromScrollPos = moveFromCarouselRow.scrollLeft;
            const moveToScrollPos = moveToCarouselfRow.scrollLeft;
            const rowPositionOffset = moveToScrollPos - moveFromScrollPos;
            const elementWidth =
                moveFromCarouselRow.scrollWidth / currentRow.length;
            const unitsAdjustment =
                Math.round(-rowPositionOffset / elementWidth) * -1;
            ctrls.focusCol += unitsAdjustment;
            if (ctrls.focusCol < 0) {
                ctrls.focusCol = 0;
            }
            if (
                ctrls.focusCol >= ctrls.pageElementsGrid[ctrls.focusRow].length
            ) {
                const rowLength = ctrls.pageElementsGrid[ctrls.focusRow].length;
                ctrls.currentElFocus =
                    ctrls.pageElementsGrid[ctrls.focusRow][rowLength - 1];
            } else {
                ctrls.currentElFocus =
                    ctrls.pageElementsGrid[ctrls.focusRow][ctrls.focusCol];
            }
            ctrls.currentElFocus.focus();
        } else {
            console.log('Keyboard controls end top');
        }
    } else if (event.key === 'ArrowDown') {
        if (ctrls.focusRow < ctrls.pageElementsGrid.length - 1) {
            const currentRow = ctrls.pageElementsGrid[ctrls.focusRow];
            ctrls.focusRow++;
            const moveFromRowElement = document.activeElement;
            const moveFromCarouselRow =
                moveFromRowElement.parentNode.parentNode;
            const moveToRowElement = ctrls.pageElementsGrid[ctrls.focusRow][0];
            const moveToCarouselfRow = moveToRowElement.parentNode.parentNode;
            const moveFromScrollPos = moveFromCarouselRow.scrollLeft;
            const moveToScrollPos = moveToCarouselfRow.scrollLeft;
            const rowPositionOffset = moveToScrollPos - moveFromScrollPos;
            const elementWidth =
                moveFromCarouselRow.scrollWidth / currentRow.length;
            const unitsAdjustment = Math.round(
                rowPositionOffset / elementWidth,
            );
            ctrls.focusCol += unitsAdjustment;
            if (ctrls.focusCol < 0) {
                ctrls.focusCol = 0;
            }
            if (
                ctrls.focusCol >= ctrls.pageElementsGrid[ctrls.focusRow].length
            ) {
                const rowLength = ctrls.pageElementsGrid[ctrls.focusRow].length;
                ctrls.currentElFocus =
                    ctrls.pageElementsGrid[ctrls.focusRow][rowLength - 1];
            } else {
                ctrls.currentElFocus =
                    ctrls.pageElementsGrid[ctrls.focusRow][ctrls.focusCol];
            }
            ctrls.currentElFocus.focus();
        } else {
            console.log('Keyboard controls end bottom');
        }
    } else if (event.key === 'Enter') {
    }
}

document.addEventListener(
    'focus',
    function (event) {
        const ctrls = window.controls;
        const focusedElement = document.activeElement;
        const coordinates = findElementCoordinatesInGrid(
            ctrls.pageElementsGrid,
            focusedElement,
        );
        if (coordinates) {
            ctrls.focusCol = coordinates.col;
            ctrls.focusRow = coordinates.row;
            ctrls.currentElFocus = document.activeElement;
        } else {
            console.log('Focused element not found in the tracking grid.');
        }
    },
    true,
);
