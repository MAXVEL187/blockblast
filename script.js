document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const blockContainer = document.querySelector(".block-container");
    const scoreDisplay = document.getElementById("score");
    
    const GRID_SIZE = 8;
    const BLOCK_SIZE = 50;
    let score = 0;
    let streakMultiplier = 1;

    function createGrid() {
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, ${BLOCK_SIZE}px)`;
        grid.style.gridTemplateRows = `repeat(${GRID_SIZE}, ${BLOCK_SIZE}px)`;
        grid.style.gap = "2px";
        
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            grid.appendChild(cell);
        }
    }

    function createBlocks() {
        const blockShapes = [
            [[1, 1, 1], [0, 1, 0]], // T shape
            [[1, 1, 1, 1]], // Line
            [[1, 1], [1, 1]], // Square
            [[1, 1, 0], [0, 1, 1]], // Z shape
        ];

        blockContainer.innerHTML = "";
        blockShapes.forEach(shape => {
            const block = document.createElement("div");
            block.classList.add("block");
            block.draggable = true;
            block.dataset.shape = JSON.stringify(shape);
            block.addEventListener("dragstart", handleDragStart);
            blockContainer.appendChild(block);
        });
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.shape);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const shape = JSON.parse(event.dataTransfer.getData("text/plain"));
        placeBlock(shape, event.target.dataset.index);
    }

    function placeBlock(shape, index) {
        index = parseInt(index);
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const targetIndex = (row + r) * GRID_SIZE + (col + c);
                    const targetCell = document.querySelector(`[data-index='${targetIndex}']`);
                    if (targetCell) {
                        targetCell.classList.add("filled");
                        score += 1;
                    }
                }
            }
        }
        checkForLines();
        updateScore();
        createBlocks();
    }

    function checkForLines() {
        let linesCleared = 0;
        for (let r = 0; r < GRID_SIZE; r++) {
            let rowFilled = true;
            for (let c = 0; c < GRID_SIZE; c++) {
                const index = r * GRID_SIZE + c;
                if (!document.querySelector(`[data-index='${index}']`).classList.contains("filled")) {
                    rowFilled = false;
                    break;
                }
            }
            if (rowFilled) {
                linesCleared++;
                for (let c = 0; c < GRID_SIZE; c++) {
                    const index = r * GRID_SIZE + c;
                    document.querySelector(`[data-index='${index}']`).classList.remove("filled");
                }
            }
        }
        if (linesCleared > 0) {
            score += linesCleared * GRID_SIZE * streakMultiplier;
            streakMultiplier *= 10;
        } else {
            streakMultiplier = 1;
        }
    }

    function updateScore() {
        scoreDisplay.textContent = score;
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
