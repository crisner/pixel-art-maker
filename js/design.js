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
createArtBoard.click(makeGrid);

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
if (brush.checked) {
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
    artboard.on('mousedown', function() {
        // TODO: Set action to click
        action = 'click';
    }, false);
    /**
    * @listens mousemove
    * @param {event} e
    */
    artboard.on('mousemove', function(e) {
        // TODO: Check if action is set to click
        if (action === 'click') {
            // TODO: Set action to drag
            action = 'drag';
        }
        // TODO: Apply callback if class name and action match
        if (e.target.className === 'pixel' && action === 'drag') {
            func1(e);
        }
    }, false);
    /**
    * @listens mouseup
    */
    artboard.on('mouseup', function() {
        // TODO: Check if class name and action match
        if (action === 'drag' || action === 'click') {
            // TODO: Set action back to null
            action = null;
        }
    }, false);
}

/**
* @callback paint
* @description Fills color when the action is null
* @param {MouseEvent} e
*/
function paint(e) {
    // TODO: If brush is checked apply color
    if (brush.checked) {
        e.target.style.background = color.value;
    }
}

/**
* @callback erase
* @description Removes color when the action is null
* @param {MouseEvent} e
*/
function erase(e) {
    // TODO: If eraser is checked set color to transparent
    if (eraser.checked) {
        e.target.style.background = 'transparent';
    }
}

/**
* @description Fills entire artboard with selected color
*/
function fillArtBoard() {
    let pixelClass = document.getElementsByClassName('pixel');
    let length = pixelClass.length;
    // TODO: If brush is checked and action is set to null, apply color value
    if (bucket.checked && action === null) {
        for (let i = 0; i < length; i++) {
            pixelClass[i].style.background = color.value;
        }
    }
}

/**
* @description Clears artboard
*/
function clearArtBoard() {
    let pixelClass = document.getElementsByClassName('pixel');
    let length = pixelClass.length;
    for (let i = 0; i < length; i++) {
        // TODO: Set color to transparent
        pixelClass[i].style.background = 'transparent';
    }
}

/**
* @description Creates grid
*/
function makeGrid() {
    // TODO: Set values from input to r and c
    r = rows[0].valueAsNumber;
    c = columns[0].valueAsNumber;
    // TODO: Validate values for r and c
    if (r < 1 || r > 50 || c < 1 || c > 50) {
        alert("Please enter a number between 1 and 50");
    } else {
        // TODO: Set/create elements
        artboard.html('');
        let size = Math.ceil(500/columns[0].valueAsNumber) + 'px';
        
        for (let i = 0; i < r; i++) {
            // TODO: Create rows
            let row = $('<div></div>');
            row.appendTo(artboard);
            row.css({'box-sizing': 'border-box', 'margin': '0 0 1px 0', 'height': size});
            for (let j = 0; j < c; j++) {
                // TODO: Create column elements
                let pixel = $('<span></span>');
                row.append(pixel);
                row.css('box-sizing', 'border-box');
                pixel.addClass('pixel');
                pixel.css({'display': 'inline-block', 'margin': '0 -1px 0 0', 'border': '1px solid rgba(189, 189, 189,1.0)', 'background': 'transparent', 'height': size, 'width': size});
            }
        }
    }
}