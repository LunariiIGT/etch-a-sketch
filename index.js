const gridSize = "550";
let cellsPerSide = "16";
let amountOfCells;

let erasing = false;
let rainbow = false;
let color = true;

let penColor = 'black';
let gridEnabled = true;

const grid = document.querySelector(".container");
grid.style.width = grid.style.height = `${gridSize}px`;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// START

amountOfCells = cellsPerSide * cellsPerSide;
setGrid(amountOfCells);

// SET GRID FUNCTION

function setGrid(amount){
    for (i = 0; i < amount; i++) {
        let addCell = document.createElement("div");

        grid.appendChild(addCell);

        addCell.className = "cell";
        addCell.id = `cell${i}`;
        addCell.style.width = addCell.style.height = `${(gridSize/cellsPerSide)-2}px`;

         let cell = document.querySelector(".cell");
    }

    // PAINT CELLS EVENT
    
    for (i = 0; i < amountOfCells; i++) {
        let cell = document.querySelector(`#cell${i}`)

        cell.addEventListener('mouseover', paintCell)
        cell.addEventListener('mousedown', paintCell)

        cell.addEventListener('click', paintCell)

        cell.addEventListener('drag', function() {
            e.preventDefault();
        })
    }

    gridEnabled = !gridEnabled;    
    toggleGrid();
}

// PAINT CELLS FUNCTION

let r;
let g;
let b;

function generateColor() {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
}

function paintCell(e) {
    if (e.type === 'mouseover' && !mouseDown) return
        if (erasing) {
            this.style.backgroundColor = "#ededed";
        } else if (color) {
            this.style.backgroundColor = penColor;
        } else if (rainbow) {
            generateColor()
            this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
}

// REMOVE CELLS FUNCTION

function removeCells(amount){
    for (i = 0; i < amount; i++) {
        document.querySelector(`#cell${i}`).remove();
    }
}

// ADJUST GRID SIZE

const slideSize = document.querySelector(".slider");

slideSize.addEventListener('input', function() {
    removeCells(amountOfCells);
    cellsPerSide = Math.round(slideSize.value);
    amountOfCells = cellsPerSide * cellsPerSide;
    setGrid(amountOfCells);

    document.querySelector(".sliderText").innerHTML = `${cellsPerSide} x ${cellsPerSide}`
})

// CLEAR GRID

document.querySelector("#clear").addEventListener("click", clearGrid)

function clearGrid() {
    removeCells(amountOfCells);
    setGrid(amountOfCells);

    gridEnabled = !gridEnabled;    
    toggleGrid();
}

// TOGGLE GRID

document.querySelector("#grid").addEventListener("click", toggleGrid)

function toggleGrid() {
    if (gridEnabled) {
        gridEnabled = false;
        for (i = 0; i < amountOfCells; i++) {
            let cell = document.querySelector(`#cell${i}`);

            cell.style.border = "none";
            cell.style.width = cell.style.height = `${(gridSize/cellsPerSide)}px`;
        }
    } else {
        gridEnabled = true;
        for (i = 0; i < amountOfCells; i++) {
            let cell = document.querySelector(`#cell${i}`);

            cell.style.border = '1px solid rgba(224, 224, 224, 0.75)';
            cell.style.width = cell.style.height = `${(gridSize/cellsPerSide) - 2}px`;
        }
    }
}

// TOGGLE MODES 

const eraserButton = document.querySelector("#eraser")
const colorButton = document.querySelector("#color")
const colorPicker = document.querySelector("#colorPicker")
const rainbowButton = document.querySelector("#rainbow")

eraserButton.addEventListener("click", function() {
    toggleMode("eraser")
})
colorPicker.addEventListener("click", function() {
    toggleMode("color");
});
rainbowButton.addEventListener("click", function() {
    toggleMode("rainbow")
})

function toggleMode(mode) {
    switch (mode) {
        case "eraser":
            erasing = true;
            rainbow = false;
            color = false;
        
            eraserButton.classList.add("enabled");
            colorButton.classList.remove("enabled");
            rainbowButton.classList.remove("enabled");
            break;
        case "rainbow":
            erasing = false;
            rainbow = true;
            color = false;
        
            eraserButton.classList.remove("enabled");
            colorButton.classList.remove("enabled");
            rainbowButton.classList.add("enabled");
            break;
        case "color":
            erasing = false;
            rainbow = false;
            color = true;
        
            eraserButton.classList.remove("enabled");
            colorButton.classList.add("enabled");
            rainbowButton.classList.remove("enabled");
            break;
    }
}

colorButton.classList.add("enabled");

// COLOR INPUT

colorPicker.addEventListener('input', function() {
    penColor = colorPicker.value;
})