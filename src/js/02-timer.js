import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const deadlinePickerEl = document.querySelector('input[type="text"]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const startButtonEl = document.querySelector('[data-start]');
let intervalID = null;
let deadline = null;

startButtonEl.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] - Date.now() < 0) {
      alert('Please choose a date in the future');

      return;
    }

    deadline = selectedDates[0];
    startButtonEl.removeAttribute('disabled');
  },
};

const onTimerStart = event => {
  startButtonEl.setAttribute('disabled', '');

  intervalID = setInterval(() => {
    const differenceMs = deadline - Date.now();

    if (differenceMs <= 0) {
      stopTimer();

      return;
    }

    let { days, hours, minutes, seconds } = convertMs(differenceMs);
    timerDays.textContent = pad(days);
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(seconds);
  }, 1000);
};

function stopTimer() {
  clearInterval(this.intervalId);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, 0);
}

flatpickr(deadlinePickerEl, options);

startButtonEl.addEventListener('click', onTimerStart);
