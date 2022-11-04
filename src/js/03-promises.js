import Notiflix from 'notiflix';

const refs = {
  delayFirst: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form')
};

refs.form.addEventListener('submit', onSubmitForm);
 
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
    }, delay)
  })
};


function onSubmitForm(evt) {
  evt.preventDefault();
  let delayTime = Number(refs.delayFirst.value);
  let stepTime = Number(refs.delayStep.value);
  let amountValue = Number(refs.amount.value);
  for (let i = 1; i <= amountValue; i += 1) {
  
  createPromise(i, delayTime)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delayTime += stepTime;
  }
};