import { init } from './engine.js';

window.addEventListener('DOMContentLoaded', (event) => {
    window.container = document.getElementById('container');
    window.cost = 0;

    init();
});



