let canvas = document.getElementById('art-board');
let rows = document.getElementById('rows');
let columns = document.getElementById('columns');
let color = document.getElementById('color');
let clear = document.getElementById('clear');
let r = 0;
let c = 0;

rows.addEventListener('change', getRow);
columns.addEventListener('change', getCol);
// canvas.addEventListener('click', paint);
canvas.addEventListener('dragover', paint, false);
clear.addEventListener('click', clearArtBoard);


function clicked(e) {
    console.log(e);
}

function paint(e) {
    if (e.target.className === 'pixel') {
        e.target.style.background = color.value;
    } else {
        console.log(false);
    }
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
    
    for (let i = 0; i < r; i++) {
        row = document.createElement('div');
        canvas.appendChild(row);
        row.style.height = '18px';
        row.style.margin = '0 0 1px 0';
        for (let j = 0; j < c; j++) {
            pixel = document.createElement('span');
            row.appendChild(pixel);
            pixel.style.display = 'inline-block';
            pixel.className = 'pixel';
            pixel.style.height = '18px';
            pixel.style.width = '18px';
            pixel.style.margin = '0 -1px 0 0';
            pixel.style.border = '1px solid black';
            pixel.style.background = 'transparent';
        }
    }
}