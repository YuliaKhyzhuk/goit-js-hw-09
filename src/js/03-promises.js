const promiseFormEl = document.querySelector('.form');
const submitButtonEl = document.querySelector('[type="submit"]');

const onSubmitBtnClick = event => {
  event.preventDefault();

  const formData = new FormData(promiseFormEl);

  const submittedData = {};
  formData.forEach((value, name) => {
    submittedData[name] = Number(value);
  });

  let { delay, step, amount } = submittedData;

  for (let i = 1; i <= amount; i += 1) {
    submittedData.position = i;
    // console.log(submittedData);
    createPromise(i, delay);
    delay += step;
  }

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

submitButtonEl.addEventListener('click', onSubmitBtnClick);
