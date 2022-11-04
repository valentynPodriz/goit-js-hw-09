import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

flatpickr( {
  enableTime: true,
    dateFormat: "Y-m-d H:i",
});

Notiflix.Notify.init({
    position: "center-top",
    clickToClose: true,
});
    
const refs = {
    input: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),

};

refs.btnStart.disabled = true;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } 
      else {
          refs.btnStart.disabled = false;
      } 
  },
};

const calendar = flatpickr("#datetime-picker", options);

refs.btnStart.addEventListener("click", onBtnStartClick);



function onBtnStartClick() {
    refs.input.addEventListener("click", () => {
        clearInterval(idInterval);
        clearTimers();
    },
        { once: true }
    )
    const idInterval = setInterval(() => {
        const ms = calendar.selectedDates[0].getTime() - Date.now();
        console.log(calendar.selectedDates[0]);
        if (calendar.selectedDates[0].getTime() / 1000 ===
            parseInt(Date.now() / 1000)
        ) {
            clearInterval(idInterval);
            Notiflix.Notify.info("Time is out!");
            return;
        }
        updateTimer(convertMs(ms));
        
    }, 1000
    );
};

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
    
}

function clearTimers() {
    refs.days.textContent = "00";
    refs.hours.textContent = "00";
    refs.minutes.textContent = "00";
    refs.seconds.textContent = "00";
};


function pad(value) {
    return String(value).padStart(2, 0);
};




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


