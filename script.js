document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const blockContainer = document.querySelector(".block-container");
    
    const GRID_SIZE = 8;
    const BLOCK_SIZE = 50;
    const blocks = [];
    
    function createGrid() {
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${BLOCK_SIZE}px`;
            cell.style.height = `${BLOCK_SIZE}px`;
            grid.appendChild(cell);
        }
    }
    
    function createBlocks() {
        for (let i = 0; i < 3; i++) {
            const block = document.createElement("div");
            block.classList.add("block");
            block.draggable = true;
            block.addEventListener("dragstart", handleDragStart);
            blockContainer.appendChild(block);
            blocks.push(block);
        }
    }
    
    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.outerHTML);
        setTimeout(() => {
            event.target.style.display = "none";
        }, 0);
    }
    
    function handleDragOver(event) {
        event.preventDefault();
    }
    
    function handleDrop(event) {
        event.preventDefault();
        const blockHTML = event.dataTransfer.getData("text/plain");
        event.target.insertAdjacentHTML("beforeend", blockHTML);
        document.querySelector(".block:last-child").style.display = "block";
    }
    
    function addEventListeners() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("dragover", handleDragOver);
            cell.addEventListener("drop", handleDrop);
        });
    }
    
    createGrid();
    createBlocks();
    addEventListeners();
});
