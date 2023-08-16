let viewportWidth = window.innerWidth;
let currentBrushColor = 'hsl(0, 0%, 0%)';
let currentPaintMode = 2;

const paintingBoard = document.querySelector("#paintingBoard");
const grid = document.createElement("div");
grid.setAttribute("id", "grid");

const colorWheelContainer = document.getElementById("colorWheelContainer");
const colorWheel = document.getElementById("colorWheel");
function generateColorWheel() {
    for (let hue = 0; hue < 360; hue += 10) {
        let color = `hsl(${hue}, 100%, 50%)`;
        let colorBlock = document.createElement("div");
        colorBlock.classList.add("colorBlock");
        colorBlock.style.backgroundColor = color;
        colorWheel.appendChild(colorBlock);
    }
    colorWheelContainer.appendChild(colorWheel);
}

function rgbToHsl(rgbColor) {
    // Extract the RGB components from the computed color string
    const match = rgbColor.match(/\d+/g);
    const r = parseInt(match[0]);
    const g = parseInt(match[1]);
    const b = parseInt(match[2]);

    // Normalize RGB values to the range [0, 1]
    const rNormalized = r / 255;
    const gNormalized = g / 255;
    const bNormalized = b / 255;

    // Calculate maximum and minimum values for HSL calculation
    const max = Math.max(rNormalized, gNormalized, bNormalized);
    const min = Math.min(rNormalized, gNormalized, bNormalized);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case rNormalized:
                h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
                break;
            case gNormalized:
                h = (bNormalized - rNormalized) / d + 2;
                break;
            case bNormalized:
                h = (rNormalized - gNormalized) / d + 4;
                break;
        }

        h /= 6;
    }

    // Convert HSL values to degrees and percentages
    const hDegrees = h * 360;
    const sPercentage = s * 100;
    const lPercentage = l * 100;

    return [hDegrees, sPercentage, lPercentage];
}

function handleResize() {
    viewportWidth = window.innerWidth;
    // Call the function to adjust grid size here
    adjustGridSize();
}

function adjustGridSize(gridSize=32) {
    // Remove all child elements
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Create a new grid based on the viewportWidth
    for (let i = 0; i < gridSize; i++) {
        const line = document.createElement("div"); 
        line.setAttribute("id", `lineNumber${i}`);
        line.classList.add("lines");
        for (let j = 0; j < gridSize; j++) {
            const gridChunk = document.createElement("div");
            gridChunk.setAttribute("id", `chunkNumber${j + i * gridSize}`); 
            gridChunk.classList.add("gridChunk");
            gridChunk.style.width = `${(0.748 * viewportWidth) / gridSize}px`;
            gridChunk.style.height = `${(0.75 * viewportWidth) / gridSize}px`;
            line.appendChild(gridChunk);
        }
        grid.appendChild(line);
    }
    paintingBoard.appendChild(grid);

    // Event listeners for each interactive square (or Grid Chunk)

    const chunkElements = document.querySelectorAll(".gridChunk");
    const chunkArray = [...chunkElements];

    // For items [2, 3, 4, 5]
    chunkArray.forEach(chunk => {
        chunk.addEventListener('mouseenter', () => modifyHoverChunk(chunk, currentBrushColor, currentPaintMode));
    });
    // For items [1] 
    chunkArray.forEach(chunk => {
    chunk.addEventListener('click', () => modifyClickChunk(chunk, currentBrushColor, currentPaintMode));
    });
}

function modifyHoverChunk(chunk, currentBrushColor, currentPaintMode) {
    const lighterTone = 10;
    const darkerTone = 10;
    const currentColor = window.getComputedStyle(chunk).backgroundColor;
    const [currentHue, currentSat, currentLight] = rgbToHsl(currentColor);  
    let newLight;
    let newColor; 
    switch(currentPaintMode) {
        case 2:
            chunk.style.backgroundColor = currentBrushColor;
            break; 
        case 3:
            chunk.style.backgroundColor = 'hsl(0, 0%, 100%)';
            break;
        case 4: 
            newLight = Math.min(currentLight + lighterTone, 100);
            newColor = `hsl(${currentHue}, ${currentSat}%, ${newLight}%)`;
            chunk.style.backgroundColor = newColor;
            break;
        case 5:
            newLight = Math.max(currentLight - darkerTone, 0);
            newColor = `hsl(${currentHue}, ${currentSat}%, ${newLight}%)`;
            chunk.style.backgroundColor = newColor;
            break;
        default: 
            break;
    }
}

function modifyClickChunk(clickedChunk, currentBrushColor, currentPaintMode) {
    const clickedColor = clickedChunk.style.backgroundColor;
    switch(currentPaintMode) {
        case 1:
            chunkArray.forEach(chunkTarget => {
                // You should compare their colors, and not the chunk themselves. 
                if (chunkTarget.style.backgroundColor === clickedColor) {
                    chunkTarget.style.backgroundColor = currentBrushColor;
                }
            });
            break; 
        default: 
            break;
    }
}

// Add the event listener (resize grid)
window.addEventListener('resize', handleResize);
// Initial call to adjustGridSize to set the grid size on page load
adjustGridSize();

// Initial call to generateColorWheel
generateColorWheel();

// Event listeners for each interactive icon
const selectedBar = document.querySelector("#selectedIcon");

const github = document.querySelector("#github");
github.addEventListener('click', () => {
    window.open("https://github.com/Reksee-Firewall", "_blank");
});

const bucket = document.querySelector("#iconOne");
bucket.addEventListener('click', () => {
    currentPaintMode = 1;
    if (selectedBar.classList.contains(selectedBar.classList))
        selectedBar.classList.remove(...selectedBar.classList);
    selectedBar.classList.add("selectFirst");
});

const brush = document.querySelector("#iconTwo");
brush.addEventListener('click', () => {
    currentPaintMode = 2;
    if (selectedBar.classList.contains(selectedBar.classList))
        selectedBar.classList.remove(...selectedBar.classList);
    selectedBar.classList.add("selectSecond");
});

const eraser = document.querySelector("#iconThree");
eraser.addEventListener('click', () => {
    currentPaintMode = 3;
    if (selectedBar.classList.contains(selectedBar.classList))
        selectedBar.classList.remove(...selectedBar.classList);
    selectedBar.classList.add("selectThird");
});

const whiteRoller = document.querySelector("#iconFour");
whiteRoller.addEventListener('click', () => {
    currentPaintMode = 4;
    if (selectedBar.classList.contains(selectedBar.classList))
        selectedBar.classList.remove(...selectedBar.classList);
    selectedBar.classList.add("selectFourth");
});

const blackRoller = document.querySelector("#iconFive");
blackRoller.addEventListener('click', () => {
    currentPaintMode = 5;
    if (selectedBar.classList.contains(selectedBar.classList))
        selectedBar.classList.remove(...selectedBar.classList);
    selectedBar.classList.add("selectFifth");
});

const colorWheelIcon = document.querySelector("#iconSix");
colorWheelIcon.addEventListener('click', () => {
    if (colorWheelContainer.classList.contains("hidden")) {
        colorWheelContainer.classList.remove("hidden");
        colorWheelContainer.style.backgroundColor = "hsl(0, 0%, 13%)";
    } else {
        colorWheelContainer.classList.add("hidden");
        colorWheelContainer.style.backgroundColor = "";
    }
});

// Buttons Sliding Global Variables
let isDragging = false;
let isDraggingGrid = false;
let previousX = 0;
const colorBttn = document.querySelector("#selectedColor");
const gridBttn = document.querySelector("#scroller");
// <--

// Color Button Sliding 

function onDragColor(e) {
    if (isDragging) {
        let movementX = (e.clientX - previousX); // Calculate the movement since the last event
        previousX = (e.clientX); // Update previousX with the current cursor position
        // Gets the element's width and height
        const getStyle = window.getComputedStyle(colorBttn);
        // Those are string values. We've to parse them to int
        const left = parseInt(getStyle.left);
        // Console log(e) shows us that 'e' is able to tell us what direction the object is being dragged to.
        // Then, we may use the event's properties to manipulate it.
        if ((left + movementX - colorBttn.offsetWidth * 0.5) > 0) {
            if ((left + movementX) < (0.185 * viewportWidth)) {
                colorBttn.style.left = `${left + movementX}px`;
                // 1  ->          0                px
                // 36 -> ((0.185) * viewportWidth) px
                let hueValue = ((left + movementX - (colorBttn.offsetWidth / 2)) / (0.185 * viewportWidth)) * 360;
                currentBrushColor = `hsl(${hueValue}, 100%, 50%)`;
            }
        }
    }
}

// Will trigger when you click on button
colorBttn.addEventListener("mousedown", () => {
    isDragging = true;
    previousX = 0;
    colorBttn.classList.add("active");
    document.addEventListener("mousemove", onDragColor); 
});
// Will trigger when you release the mouse button
document.addEventListener("mouseup", () => {
    isDragging = false;
    colorBttn.classList.remove("active");
    document.removeEventListener("mousemove", onDragColor); 
});
// If the user switches tabs or clicks outside the window while dragging, the mousemove event might continue to fire without the user's intent.
// The "blur" event is a type of event that occurs when an HTML element loses focus.
window.addEventListener("blur", () => {
    isDragging = false;
    colorBttn.classList.remove("active");
    document.removeEventListener("mousemove", onDragColor);
});
// <-- 

// Grid Button Sliding 

function onDragGrid(e) {
    if (isDraggingGrid) {
        let movementX = (e.clientX - previousX);
        previousX = (e.clientX); 
        const getStyle = window.getComputedStyle(gridBttn);
        const left = parseInt(getStyle.left);
        if ((left + movementX) > -1) {
            if ((left + movementX) < (131)) {
                gridBttn.style.left = `${left + movementX}px`;
                let gridSize = Math.max(((left + movementX) / (131)), 0.01) * 100;
                adjustGridSize(parseInt(gridSize));
            }
        }
    }
}

gridBttn.addEventListener("mousedown", () => {
    isDraggingGrid = true;
    previousX = 0;
    gridBttn.classList.add("active");
    document.addEventListener("mousemove", onDragGrid); 
});
document.addEventListener("mouseup", () => {
    isDraggingGrid = false;
    gridBttn.classList.remove("active");
    document.removeEventListener("mousemove", onDragGrid); 
});
window.addEventListener("blur", () => {
    isDraggingGrid = false;
    gridBttn.classList.remove("active");
    document.removeEventListener("mousemove", onDragGrid);
});
// <-- 