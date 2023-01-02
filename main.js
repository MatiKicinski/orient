const MAP = [
    {
        'x': 1,
        'y': 1,
    }, {
        'x': 2,
        'y': 4,
    }, {
        'x': 7,
        'y': 1,
    }, {
        'x': 4,
        'y': 9,
    },
];

const GRID_SIZE = 10;
const GRID_GAP_PX = 5;
const TILE_SIZE_PX = 50;
const PLAYER_SIZE_PX = 40;
const POINT_BORDER_PX = 3;
const POINT_SIZE_PX = TILE_SIZE_PX;
const POINT_INNER_SIZE_PX = POINT_SIZE_PX - 2 * POINT_BORDER_PX;

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
        grid.appendChild(tile);
    }

    window.container.appendChild(grid);
};

const createPlayer = () => {
    const texture = 'runner.png';
    window.player = document.createElement('img');
    window.player.src = texture;
    window.player.style.position = 'absolute';
    window.player.style.width = `${PLAYER_SIZE_PX}px`;
    window.player.style.height = `${PLAYER_SIZE_PX}px`;
    window.player.style.top = 0;
    window.playerCoordinates = {x: 0, y: 0};
    window.player.style.zIndex = 2;

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
        updatePlayerPosition(window.player, window.playerCoordinates);
    };
};

const updatePlayerPosition = (element, coordinates) => {
    const {x, y} = coordinates;
    element.style.left = `${x * PLAYER_POSITION_INCREMENT + PLAYER_POSITION_CONSTANT}px`;
    element.style.top = `${y * PLAYER_POSITION_INCREMENT + PLAYER_POSITION_CONSTANT}px`;

    if (!!window.pointToTrack && coordinates.x == window.pointToTrack.x && coordinates.y == window.pointToTrack.y) {
        trackPoint(window.pointToTrackIndex + 1);
    }
};

const updatePointPosition = (element, coordinates) => {
    const {x, y} = coordinates;
    element.style.left = `${x * 55 + 5}px`;
    element.style.top = `${y * 55 + 5}px`;
};

const createPoint = (coordinates) => {
    const circle = document.createElement('div');
    circle.style.height = `${POINT_INNER_SIZE_PX}px`;
    circle.style.width = `${POINT_INNER_SIZE_PX}px`;
    circle.style.border = `${POINT_BORDER_PX}px solid #b457f7`;
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.background = 'white';
    circle.style.zIndex = 1;

    updatePointPosition(circle, coordinates);

    window.container.appendChild(circle);
};

const createLine = (pointA, pointB) => {
    const line = document.createElement('div');
    line.style.height = '3px';
    line.style.background = '#b457f7';
    line.style.position = 'absolute';

    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    const distance = TILE_SIZE_PX * Math.sqrt(dx * dx + dy * dy) + 28;
    line.style.width = `${distance}px`;

    const {x, y} = pointA;
    line.style.left = `${x * 55 + 28}px`;
    line.style.top = `${y * 55 + 28}px`;

    const theta = Math.atan2(dy, dx);
    line.style.transformOrigin = 0;
    line.style.rotate = `${theta}rad`;

    window.container.appendChild(line);
};

const loadMap = () => {
    MAP.forEach((point, index) => {
        createPoint(point);


        const nextIndex = index + 1;
        const nextPoint = MAP[nextIndex];

        if (nextPoint) {
            createLine(point, nextPoint);
        }
    });
};

const trackPoint = (pointToTrackIndex = 0) => {
    window.pointToTrackIndex = pointToTrackIndex;
    const pointToTrack = MAP[pointToTrackIndex];

    if (!pointToTrack) {
        document.getElementById('tracker').textContent = `FINISHED!!!`;
        setTimeout(() => {
            if (window.confirm('Well done! You finished the course. Click OK to restart the game.')) {
                location.reload();
            }
        }, 0);
        return;
    }

    window.pointToTrack = pointToTrack;
    document.getElementById('tracker').textContent = `Go to (${pointToTrack.x}, ${pointToTrack.y})`;
};

window.addEventListener('DOMContentLoaded', (event) => {
    window.container = document.getElementById('container');

    createGrid(GRID_SIZE);
    createPlayer();
    updatePlayerPosition(window.player, {x: 0, y: 0});
    loadMap();
    listenOnArrows();
    trackPoint();
});



