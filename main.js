const GRID_SIZE = 10;
const GRID_GAP_PX = 5;
const TILE_SIZE_PX = 50;
const PLAYER_SIZE_PX = 40;
const PLAYER_POSITION_INCREMENT = TILE_SIZE_PX + (TILE_SIZE_PX - PLAYER_SIZE_PX) / 2;
const PLAYER_POSITION_CONSTANT = TILE_SIZE_PX - PLAYER_SIZE_PX;

const createGrid = (size) => {
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.background = 'black';
    grid.style.gap = `${GRID_GAP_PX}px`;
    grid.style.border = `${GRID_GAP_PX}px solid black`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.width = 'fit-content';

    elementsNumber = size * size;

    for (let i = 0; i < elementsNumber; i++) {
        const tile = document.createElement('div');
        tile.style.height = `${TILE_SIZE_PX}px`;
        tile.style.width = `${TILE_SIZE_PX}px`;
        tile.style.backgroundColor = 'white';
        tile.onload = (element) => {
            console.log(element.clientTop);
        };
        grid.appendChild(tile);
    }

    window.container.appendChild(grid);
};

const createPlayer = () => {
    const texture = 'runner.png';
    window.player = document.createElement('img');
    window.player.src = texture;
    window.player.style.position = 'absolute';
    window.player.style.width = '40px';
    window.player.style.height = '40px';
    window.player.style.top = 0;
    window.playerCoordinates = {x: 0, y: 0};

    window.container.appendChild(window.player);
};

const isWithinGrid = (coordinates) => {
    return coordinates.x >= 0 && coordinates.x < GRID_SIZE && coordinates.y >= 0 && coordinates.y < GRID_SIZE;
};

const listenOnArrows = () => {
    const moves = {
        'ArrowUp': {x: 0, y: -1},
        'ArrowDown': {x: 0, y: 1},
        'ArrowLeft': {x: -1, y: 0},
        'ArrowRight': {x: 1, y: 0},
    };

    window.onkeydown = (event) => {
        const move = moves[event.key];

        if (!move) return;

        const result = {
            x: window.playerCoordinates.x + move.x,
            y: window.playerCoordinates.y + move.y,
        };

        if (!isWithinGrid(result)) {
            return;
        }

        window.playerCoordinates = result;
        updatePlayerPosition();
    };
};

const updatePlayerPosition = () => {
    const {x, y} = window.playerCoordinates;
    window.player.style.left = `${x * PLAYER_POSITION_INCREMENT + PLAYER_POSITION_CONSTANT}px`;
    window.player.style.top = `${y * PLAYER_POSITION_INCREMENT + PLAYER_POSITION_CONSTANT}px`;
};

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('123');

    window.container = document.getElementById('container');

    createGrid(GRID_SIZE);
    createPlayer();
    updatePlayerPosition();
    listenOnArrows();
});



