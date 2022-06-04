let t = 0.02; // швидкість навчання
const N = 3; // кількість вхідних даних
let w = []; // вагові коефіцієнти
const THRESHOLD = 1; // порогове значення(O)
const trainigSet = [
  [0, 0, 0, 1],
  [0, 0, 1, 1],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
  [1, 0, 0, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1],
]; // правильні значення операцій для моєї логічної ф-ції(вхідні x та правильний результат операції) (T)
let outputSummator;
let isSetHasError = false;

//рандомна ініціалізація вагових коефіцієнтів
function init() {
  for (let i = 0; i < N; i++) {
    w[i] = +(Math.trunc(Math.random() * 100) / 100).toPrecision(3);
  }
  return w;
}

//функція передбачення - відповідь нейрону
function predict(xValues) {
  if (xValues[0] === 0 && xValues[1] === 0 && xValues[2] === 0) return 1;
  let summator = xValues.reduce((sum, x, i) => (sum += x * w[i]), 0); // сумматор(a)
  outputSummator = summator;
  //порогова функція(функція активація)
  let y = summator >= THRESHOLD ? 1 : 0; //вихід, відповідь нейрону
  return y;
}

//тренування нейрону
function train() {
  let errorCount = 0;
  for (let i = 0; i < trainigSet.length; i++) {
    const setLength = trainigSet[i].length - 1;
    let d =
      trainigSet[i][setLength] - predict(trainigSet[i].slice(0, setLength)); //розрахунок помилки: правильна відповідь - відповідь нейрону

    //корекція вагових коефіцієнтів
    if (d != 0) {
      errorCount++;
      w = w.map(
        (coeff, coeffIndex) =>
          +(coeff + d * trainigSet[i][coeffIndex] * t).toPrecision(3)
      ); // помилка * вхідне значення x * швидкість навчання
    }
  }
  if (errorCount > 0) isSetHasError = true;
  else isSetHasError = false;
}
function showResult() {
  console.log("W1    W2    W3    O     X1  X2  X3  A     Y  T");
  for (let i = 0; i < trainigSet.length; i++) {
    console.log(
      `${w[0].toFixed(2)}  ${w[1].toFixed(2)}  ${w[2].toFixed(
        2
      )}  ${THRESHOLD.toFixed(2)}  ${trainigSet[i][0]}   ${
        trainigSet[i][1]
      }   ${trainigSet[i][2]}   ${outputSummator.toFixed(2)}  ${predict(
        trainigSet[i].slice(0, trainigSet[i].length - 1)
      )}  ${trainigSet[i][trainigSet[i].length - 1]}`
    );
  }
  console.log(`iteration with t = ${t}: ${iterationCount}`);
}

init();

let iterationCount = 0;
console.log("Inital coefficients: ", w);
do {
  iterationCount++;
  train();
} while (isSetHasError);


showResult();
