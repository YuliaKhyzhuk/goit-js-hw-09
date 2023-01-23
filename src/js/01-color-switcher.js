const bodyEl = document.querySelector('body');
const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
let intervalID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onStartButtonClick = event => {
  startButtonEl.setAttribute('disabled', '');
  bodyEl.style.backgroundColor = getRandomHexColor();
  intervalID = setInterval(() => {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
  }, 1000);
};

const onStopButtonClick = event => {
  clearInterval(intervalID);
  startButtonEl.removeAttribute('disabled');
};

startButtonEl.addEventListener('click', onStartButtonClick);
stopButtonEl.addEventListener('click', onStopButtonClick);
