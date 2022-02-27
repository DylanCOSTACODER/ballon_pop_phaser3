import { convertMinutesSeconds } from './game.js';

window.onload = function () {
    // Update sliper output values
    var sizeSlider = document.getElementById('sizeRange');
    var sizeOutput = document.getElementById('sizeValue');
    var sizeDisplay = document.getElementById('sizeDisplay');
    sizeDisplay.innerHTML = sizeSlider.value;
    sizeOutput.innerHTML = sizeSlider.value;

    sizeSlider.oninput = function () {
        sizeDisplay.innerHTML = parseInt(this.value * 100) + '%';
        sizeOutput.innerHTML = parseInt(this.value * 100) + '%';
    };

    // Update sliper output values
    var timeSlider = document.getElementById('timeRange');
    var timeOutput = document.getElementById('timeValue');
    timeOutput.innerHTML = convertMinutesSeconds(timeSlider.value);

    timeSlider.oninput = function () {
        timeOutput.innerHTML = convertMinutesSeconds(this.value);
    };

    // Update sliper output values
    var speedSlider = document.getElementById('speedRange');
    var speedOutput = document.getElementById('speedValue');
    var speedDisplay = document.getElementById('speedDisplay');
    speedDisplay.innerHTML = speedSlider.value;
    speedOutput.innerHTML = speedSlider.value;

    speedSlider.oninput = function () {
        speedOutput.innerHTML = this.value;
        speedDisplay.innerHTML = this.value;
    };

    // Update sliper output values
    var chanceSlider = document.getElementById('chanceRange');
    var chanceOutput = document.getElementById('chanceValue');
    var chanceDisplay = document.getElementById('chanceDisplay');
    chanceOutput.innerHTML = chanceSlider.value;
    chanceSlider.oninput = function () {
        chanceOutput.innerHTML = this.value;
    };

    // Update sliper output values
    var scoreSlider = document.getElementById('scoreRange');
    var scoreOutput = document.getElementById('scoreValue');
    scoreOutput.innerHTML = scoreSlider.value;

    scoreSlider.oninput = function () {
        scoreOutput.innerHTML = this.value;
    };

    // Set default displayed color
    var colorOutput = document.getElementById('colorValue');
    if (localStorage.getItem('Color') && localStorage.getItem('Rgb') && localStorage.getItem('Name')) {
        colorOutput.innerHTML = localStorage.getItem('Name');
        document.getElementById('colorDisplay').innerHTML = localStorage.getItem('Name');
        document.getElementById('colorDisplay').style.color = localStorage.getItem('Rgb');
    } else {
        colorOutput.innerHTML = 'Verts';
        document.getElementById('colorDisplay').innerHTML = 'Verts';
        document.getElementById('colorDisplay').style.color = 'rgb(124,252,0)';
    }
};
