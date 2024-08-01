let startTime = 0;
let currentTime = 0;
let elapsedTime = 0; 
let isRunning = false;
let lapTimes = [];
let intervalId = null;

const displayElement = document.getElementById('display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapTimesList = document.getElementById('lap-times');

startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime; 
        isRunning = true;
        intervalId = setInterval(() => {
            currentTime = new Date().getTime() - startTime;
            displayTime(currentTime);
        }, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false; 
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime = currentTime; 
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    startTime = 0;
    currentTime = 0;
    elapsedTime = 0;
    lapTimes = [];
    displayTime(0);
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = false; 
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(currentTime);
        displayLapTimes(lapTimes);
        lapButton.disabled = false;
    }
});

function displayTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    displayElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function displayLapTimes(lapTimes) {
    lapTimesList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const minutes = Math.floor(lapTime / 60000);
        const seconds = Math.floor((lapTime % 60000) / 1000);
        const milliseconds = lapTime % 1000;
        const lapTimeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        const lapTimeElement = document.createElement('li');
        lapTimeElement.textContent = `Lap ${index + 1}: ${lapTimeText}`;
        lapTimesList.appendChild(lapTimeElement);
    });
}