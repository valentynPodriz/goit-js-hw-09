const btnStartRef = document.querySelector("button[data-start]");
const btnStopRef = document.querySelector("button[data-stop]");

btnStartRef.addEventListener('click', onStartMadeColor);
btnStopRef.addEventListener('click', onStopMadeColor);
const DELAY = 1000;
let idInterval = null;

function onStartMadeColor() {
    btnStartRef.disabled = true;
    idInterval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, DELAY);
}  

function onStopMadeColor() {
    btnStartRef.disabled = false;
    clearInterval(idInterval);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


