let canvas = document.getElementById('art-board');
let createArtBoard = document.getElementById('submit');
let rows = document.getElementById('rows');
let columns = document.getElementById('columns');
let color = document.getElementById('color');
let clear = document.getElementById('clear');

let r = 0;
let c = 0;

createArtBoard.addEventListener('click', getValues);
clear.addEventListener('click', clearArtBoard);

let action = null;
canvas.addEventListener('mousedown', function() {
    action = 'click';
}, false);

canvas.addEventListener('mousemove', paint, false);

canvas.addEventListener('mouseup', function() {
    if (action === 'drag' || action === 'click') {   
        action = null;
    }
}, false);


function clicked(e) {
    console.log(e);
}

function paint(e) {
    if (action === 'click') {
        action = 'drag';
    } 
    if (e.target.className === 'pixel' && action === 'drag') {
        e.target.style.background = color.value;
    }
}

function getValues() {
    r = rows.valueAsNumber;
    c = columns.valueAsNumber;
    makeGrid();
}

function getRow(e) {
    r = e.target.valueAsNumber;
    makeGrid();
}

function getCol(e) {
    c = e.target.valueAsNumber;
    makeGrid();
}

function clearArtBoard() {
    let pixelClass = document.getElementsByClassName('pixel');
    let length = pixelClass.length;
    for (let i = 0; i < length; i++) {
        pixelClass[i].style.background = 'transparent';
    }
}

function makeGrid() {
    canvas.innerHTML = "";
    let eachRow = document.createElement('div');
    let pixel = document.createElement('span');
    let size = Math.ceil(650/columns.valueAsNumber) - 2;
    
    for (let i = 0; i < r; i++) {
        row = document.createElement('div');
        canvas.appendChild(row);
        row.style.height = size +'px';
        row.style.boxSizing = 'border-box';
        row.style.margin = '0 0 1px 0';
        for (let j = 0; j < c; j++) {
            pixel = document.createElement('span');
            row.appendChild(pixel);
            row.style.boxSizing = 'border-box';
            pixel.style.display = 'inline-block';
            pixel.className = 'pixel';
            pixel.style.height = size +'px';
            pixel.style.width = size +'px';
            pixel.style.margin = '0 -1px 0 0';
            pixel.style.border = '1px solid rgba(189, 189, 189,1.0)';
            pixel.style.background = 'transparent';
        }
    }
}