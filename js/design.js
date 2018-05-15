// Set variables
let artboard = $('#art-board');
let createArtBoard = $('#submit');
let rows = $('#rows');
let columns = $('#columns');
let color = $('#color');
let brush = $('#brush');
let clear = $('#clear');
let eraser = $('#remove-color');
let bucket = $('#fill');

// TODO: Set r and c to 0 as initial values
let r = 0;
let c = 0;
// TODO: Set action to null
let action = null;

/**
* @description Create art board grid
* @listens click
* @fires makeGrid - The callback that handles the event to do
*/
// createArtBoard.addEventListener('click', makeGrid);
createArtBoard.click(function(e) {
    makeGrid();
    e.preventDefault();
});

/**
* @description Clears art board
* @listens click
* @fires clearArtBoard - The callback that handles the event to do
*/
clear.click(clearArtBoard);

/**
* @description Fills art board
* @listens click
*/
bucket.click(function() {
    /**
    * @listens click listens to a click on the artboard
    * @fires fillArtBoard - The callback that handles the event to do
    */
    artboard.click(fillArtBoard);
});

// TODO: Check if brush element is checked
if (brush.prop('checked')) {
    /**
    * @description Call function clickAndDrag
    * @param {callback} paint - The callback function to paint
    */
    // TODO: Call function to paint
    clickAndDrag(paint);
}

/**
* @description Fills color to cells using click and drag
* @listens click
* @fires clickAndDrag
* @param {callback} paint - The callback to paint
*/
brush.click(clickAndDrag(paint));

/**
* @description Removes color from cells using click and drag
* @listens click
* @fires clickAndDrag
* @param {callback} erase - The callback to erase
*/
eraser.click(clickAndDrag(erase));

/**
* @description Action to be performed on click and drag on artboard area
* @callback clickAndDrag
* @param {callback} func1 - placeholder for callback function paint or erase
*/
function clickAndDrag(func1) {
    /**
    * @listens click
    * @param {event} e 
    */
    artboard.on('click', function(e) {
        // TODO: Apply callback if class name and action match
        if (e.target.className === 'pixel' && action === null) {
            func1(e);
        }
    });
    /**
    * @listens mousedown
    */
    artboard.mousedown(function() {
        // TODO: Set action to click
        action = 'click';
    });
    /**
    * @listens mousemove
    * @param {event} e
    */
    artboard.mousemove(function(e) {
        // TODO: Check if action is set to click
        if (action === 'click') {
            // TODO: Set action to drag
            action = 'drag';
        }
        // TODO: Apply callback if class name and action match
        if (e.target.className === 'pixel' && action === 'drag') {
            func1(e);
        }
    });
    /**
    * @listens mouseup
    */
    artboard.mouseup(function() {
        // TODO: Check if class name and action match
        if (action === 'drag' || action === 'click') {
            // TODO: Set action back to null
            action = null;
        }
    });
}

/**
* @callback paint
* @description Fills color when the action is null
* @param {MouseEvent} e
*/
function paint(e) {
    // TODO: If brush is checked apply color
    if (brush.prop('checked')) {
        $(e.target).css('background', color.val());
    }
}

/**
* @callback erase
* @description Removes color when the action is null
* @param {MouseEvent} e
*/
function erase(e) {
    // TODO: If eraser is checked set color to transparent
    if (eraser.prop('checked')) {
        $(e.target).css('background', 'transparent');
    }
}

/**
* @description Fills entire artboard with selected color
*/
function fillArtBoard() {
    let pixelClass = $('.pixel');
    // TODO: If brush is checked and action is set to null, apply color value
    if (bucket.prop('checked') && action === null) {
        pixelClass.css('background', color.val());
    }
}

/**
* @description Clears artboard
*/
function clearArtBoard() {
    let pixelClass = $('.pixel');
    pixelClass.css('background', 'transparent');
}

/**
* @description Creates grid
*/
function makeGrid() {
    let w = artboard.innerWidth();
    let size = 0;
    // TODO: Set values from input to r and c
    r = rows[0].valueAsNumber;
    c = columns[0].valueAsNumber;
    size = (100/c)/1.1 + '%';
    // TODO: Validate values for r and c
    if (r < 1 || r > 50 || c < 1 || c > 50) {
        alert("Please enter a number between 1 and 50");
    } else {
        // TODO: Set/create elements
        artboard.html('');
        let grid = $('<table></table>');
        grid.appendTo(artboard);
        grid.css({'margin': '0 auto', 'border-collapse': 'collapse', 'border-spacing': '0', 'width': '100%'});
        for (let i = 0; i < r; i++) {
            // TODO: Create rows
            let row = $('<tr></tr>');
            row.appendTo(grid);
            let cell = $('td');
            for (let j = 0; j < c; j++) {
                // TODO: Create column elements
                let pixel = $('<td></td>');
                row.append(pixel);
                pixel.addClass('pixel');
                pixel.css({'border': '1px solid rgba(189, 189, 189,1.0)',  'background': 'transparent', 'box-sizing': 'border-box',  'padding-top': size });
            }
        }
    }
}