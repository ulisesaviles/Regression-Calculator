/////////////////////// Section 1 ///////////////////////
let ammoutOfInputs = 1;
setListeners();
let inputValues = [
  [
    document.getElementById("input0a").value,
    document.getElementById("input0b").value,
  ],
];

function setListeners() {
  document.getElementById("btn-add-input").onclick = () => {
    inputValues = [];
    for (let i = 0; i < ammoutOfInputs; i++) {
      inputValues.push([
        document.getElementById(`input${i}a`).value,
        document.getElementById(`input${i}b`).value,
      ]);
    }
    ammoutOfInputs += 1;
    renderInputs(inputValues, true);
    setListeners();
  };
  document.getElementById("btn-remove-input").onclick = () => {
    if (ammoutOfInputs > 1) {
      inputValues = [];
      ammoutOfInputs -= 1;
      for (let i = 0; i < ammoutOfInputs; i++) {
        inputValues.push([
          document.getElementById(`input${i}a`).value,
          document.getElementById(`input${i}b`).value,
        ]);
      }
      renderInputs(inputValues, false);
      setListeners();
    }
  };
}

function renderInputs(inputValues, add) {
  document.getElementById("section1-content-container").innerHTML = "";
  if (add) {
    for (let i = 0; i < inputValues.length + 1; i++) {
      if (i == inputValues.length) {
        document.getElementById(
          "section1-content-container"
        ).innerHTML += `<div class="input-row">
        <button class="input-btn shadow negative-btn" id="btn-remove-input">x</button>
        <h3 class="section1-lables">(</h3>
        <input class="input" value="0" id="input${i}a"/>
        <h3 class="section1-lables">,</h3>
        <input class="input" value="0" id="input${i}b"/>
        <h3 class="section1-lables">)</h3>
        <button class="input-btn shadow" id="btn-add-input">+</button>
      </div>`;
      } else {
        document.getElementById(
          "section1-content-container"
        ).innerHTML += `<div class="input-row">
        <h3 class="section1-lables">(</h3>
        <input class="input" value="${inputValues[i][0]}" id="input${i}a" />
        <h3 class="section1-lables">,</h3>
        <input class="input" value="${inputValues[i][1]}" id="input${i}b"/>
        <h3 class="section1-lables">)</h3>
      </div>`;
      }
    }
    inputValues.push([0, 0]);
  } else {
    for (let i = 0; i < inputValues.length; i++) {
      if (i == inputValues.length - 1) {
        document.getElementById(
          "section1-content-container"
        ).innerHTML += `<div class="input-row">
        <button class="input-btn shadow negative-btn" id="btn-remove-input">x</button>
        <h3 class="section1-lables">(</h3>
        <input class="input" value="${inputValues[i][0]}" id="input${i}a"/>
        <h3 class="section1-lables">,</h3>
        <input class="input" value="${inputValues[i][1]}" id="input${i}b"/>
        <h3 class="section1-lables">)</h3>
        <button class="input-btn shadow" id="btn-add-input">+</button>
      </div>`;
      } else {
        document.getElementById(
          "section1-content-container"
        ).innerHTML += `<div class="input-row">
        <h3 class="section1-lables">(</h3>
        <input class="input" value="${inputValues[i][0]}" id="input${i}a" />
        <h3 class="section1-lables">,</h3>
        <input class="input" value="${inputValues[i][1]}" id="input${i}b"/>
        <h3 class="section1-lables">)</h3>
      </div>`;
      }
    }
  }
}

/////////////////////// Section 2 ///////////////////////
function handleClick(selected, checked) {
  const options = [
    "toggle",
    "polinomial",
    "logaritmic",
    "exponential",
    "power",
  ];
  if (checked == false) {
    if (selected != "toggle") {
      document.getElementById("toggle").checked = true;
    } else {
      document.getElementById("polinomial").checked = true;
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      if (options[i] != selected) {
        document.getElementById(options[i]).checked = false;
      }
    }
  }
}
document.getElementById("toggle").onclick = () => {
  handleClick("toggle", document.getElementById("toggle").checked);
};
document.getElementById("polinomial").onclick = () => {
  handleClick("polinomial", document.getElementById("polinomial").checked);
};
document.getElementById("logaritmic").onclick = () => {
  handleClick("logaritmic", document.getElementById("logaritmic").checked);
};
document.getElementById("exponential").onclick = () => {
  handleClick("exponential", document.getElementById("exponential").checked);
};
document.getElementById("power").onclick = () => {
  handleClick("power", document.getElementById("power").checked);
};
document.getElementById("go").onclick = () => {
  run();
};
function run() {
  console.log(inputValues);
  let inputA;
  let inputB;
  for (let i = 0; i < ammoutOfInputs; i++) {
    inputA = parseFloat(document.getElementById(`input${i}a`).value);
    inputB = parseFloat(document.getElementById(`input${i}b`).value);
    if (isNaN(inputA) || isNaN(inputB)) {
      document.getElementById("error").innerHTML = `The row ${
        i + 1
      } of inputs, contains an invalid value.`;
      return;
    }
    if (inputA == "0") {
      inputA = 0.0000000000000000000000000000000000000000000000000000000000000000000001;
    }
    if (inputB == "0") {
      inputB = 0.0000000000000000000000000000000000000000000000000000000000000000000001;
    }
    inputValues[i] = [inputA, inputB];
  }
  document.getElementById("error").innerHTML = "";
  console.log(inputValues);
  inputValues = sort(inputValues);
  console.log(inputValues);
  const options = [
    "toggle",
    "polinomial",
    "exponential",
    "logaritmic",
    "power",
  ];
  let checked;
  for (let i = 0; i < options.length; i++) {
    if (document.getElementById(options[i]).checked) {
      checked = options[i];
    }
  }
  console.log(checked);
  let grade;
  if (checked == "polinomial" || checked == "toggle") {
    grade = parseFloat(document.getElementById("grade").value);
    if (isNaN(grade)) {
      document.getElementById("error").innerHTML =
        "The grade of the polinomial regression is not a valid value.";
      return;
    }
  }

  document.getElementById(
    "section3-content-container"
  ).innerHTML = `<div class="column">
  <div class="function-container">
    <h3 class="function-label">Function:</h3>
    <h3 class="function-result" id="function">y = x</h3>
  </div>
  <div class="function-container">
    <h3 class="error-label">Error:</h3>
    <h3 class="error-result" id="function-error">0</h3>
  </div>
</div>
<div class="chart-container">
  <canvas id="chart" width="400" height="400"> </canvas>
</div>`;
  if (checked == "power") {
    let results = power(inputValues);
    console.log(results);
    document.getElementById("function").innerHTML = results.functionString;
    document.getElementById("function-error").innerHTML = results.error;
    placeChart(inputValues, checked, results.coeficiente, results.exponente);
  } else if (checked == "logaritmic") {
    let results = logaritmic(inputValues);
    console.log(results);
    document.getElementById("function").innerHTML = results.functionString;
    document.getElementById("function-error").innerHTML = results.error;
    placeChart(
      inputValues,
      checked,
      results.independent_term,
      results.coeficiente
    );
  } else if (checked == "exponential") {
    let results = exponential(inputValues);
    console.log(results);
    document.getElementById("function").innerHTML = results.functionString;
    document.getElementById("function-error").innerHTML = results.error;
    placeChart(
      inputValues,
      "exponential",
      results.coeficient,
      results.power,
      0
    );
  } else if (checked == "polinomial") {
    let results = polinomial(inputValues, grade);
    document.getElementById("function").innerHTML = results.functionString;
    document.getElementById("function-error").innerHTML = results.error;
    placeChart(
      inputValues,
      "polinomial",
      0,
      0,
      results.coeficientes_polinomiales
    );
  } else if (checked == "toggle") {
    let results;
    let tempResults;
    let type;
    let tempType;
    for (let i = 1; i < options.length; i++) {
      tempType = options[i];
      if (tempType == "polinomial") {
        let subTempResults;
        for (let j = 0; j < inputValues.length; j++) {
          subTempResults = polinomial(inputValues, j);
          if (j == 0) {
            tempResults = subTempResults;
          } else {
            if (subTempResults.error < tempResults.error) {
              tempResults = subTempResults;
            }
          }
        }
        results = tempResults;
        type = tempType;
      } else if (tempType == "exponential") {
        try {
          tempResults = exponential(inputValues);
        } catch (e) {
          console.log(e);
        }
      } else if (tempType == "logaritmic") {
        try {
          tempResults = logaritmic(inputValues);
        } catch (e) {
          console.log(e);
        }
      } else if (tempType == "power") {
        try {
          tempResults = power(inputValues);
        } catch (e) {
          console.log(e);
        }
      }
      if (!isNaN(tempResults.error) && tempResults.error < results.error) {
        results = tempResults;
        type = tempType;
      }
    }
    document.getElementById("function").innerHTML = results.functionString;
    document.getElementById("function-error").innerHTML = results.error;
    if (type == "logaritmic") {
      placeChart(
        inputValues,
        type,
        results.independent_term,
        results.coeficiente,
        0
      );
    } else if (type == "exponential") {
      placeChart(inputValues, type, results.coeficient, results.power, 0);
    } else if (type == "power") {
      placeChart(inputValues, type, results.coeficiente, results.exponente, 0);
    } else if (type == "polinomial") {
      placeChart(inputValues, type, 0, 0, results.coeficientes_polinomiales);
    }
  }
}

/////////////////////// Section 3 ///////////////////////
function calculateError(points, type, a, b, coeficientes_polinomiales) {
  let sumOfDistances = 0;
  let temp;
  for (let i = 0; i < points.length; i++) {
    if (type == "power") {
      sumOfDistances += Math.abs(a * Math.pow(points[i][0], b) - points[i][1]);
    } else if (type == "logaritmic") {
      console.log(parseFloat(a) + b * Math.log(points[i][0]) - points[i][1]);
      sumOfDistances += Math.abs(
        parseFloat(a) + b * Math.log(points[i][0]) - points[i][1]
      );
    } else if (type == "exponential") {
      sumOfDistances += Math.abs(a * Math.exp(b * points[i][0]) - points[i][1]);
    } else if (type == "polinomial") {
      temp = 0;
      for (let j = 0; j < coeficientes_polinomiales._size[0]; j++) {
        temp +=
          coeficientes_polinomiales.subset(math.index(j)) *
          Math.pow(points[i][0], j);
      }
      sumOfDistances += Math.abs(temp - points[i][1]);
    }
  }
  return sumOfDistances / points.length;
}

function power(points) {
  // Get X //
  let sumOfLnX = 0;
  let sumOfSqLnX = 0;
  for (let i = 0; i < points.length; i++) {
    sumOfLnX += Math.log(points[i][0]);
    sumOfSqLnX += Math.pow(Math.log(points[i][0]), 2);
  }
  let x = math.matrix([
    [points.length, sumOfLnX],
    [sumOfLnX, sumOfSqLnX],
  ]);
  // Get Y //
  let sumOfLnY = 0;
  let sumOfLnXLnY = 0;
  for (let i = 0; i < points.length; i++) {
    sumOfLnY += Math.log(points[i][1]);
    sumOfLnXLnY += Math.log(points[i][0]) * Math.log(points[i][1]);
  }
  let y = math.matrix([sumOfLnY, sumOfLnXLnY]);
  // Solve //
  let w = math.multiply(math.inv(x), y);
  let coeficiente = Math.pow(Math.E, w.subset(math.index(0)));
  let exponente = w.subset(math.index(1));
  let error_ = calculateError(
    points,
    "power",
    coeficiente.toFixed(3),
    exponente.toFixed(3),
    0
  );
  let functionString = `${coeficiente.toFixed(3)}x^${exponente.toFixed(3)}`;
  return {
    error: error_,
    functionString: functionString.toString(),
    coeficiente: parseFloat(coeficiente).toFixed(3),
    exponente: parseFloat(exponente).toFixed(3),
  };
}

function logaritmic(points) {
  // Get X & Y //
  let sumOfLnX = 0;
  let sumOfSqLnX = 0;
  let sumOfY = 0;
  let sumOfYLnX = 0;
  for (let i = 0; i < points.length; i++) {
    sumOfLnX += Math.log(points[i][0]);
    sumOfSqLnX += Math.pow(Math.log(points[i][0]), 2);
    sumOfY += points[i][1];
    sumOfYLnX += points[i][1] * Math.log(points[i][0]);
  }
  let x = math.matrix([
    [points.length, sumOfLnX],
    [sumOfLnX, sumOfSqLnX],
  ]);
  let y = math.matrix([sumOfY, sumOfYLnX]);
  // Solve //
  let w = math.multiply(math.inv(x), y);
  let independent_term = w.subset(math.index(0));
  let coeficient = w.subset(math.index(1));
  let error_ = calculateError(
    points,
    "logaritmic",
    parseFloat(independent_term).toFixed(3),
    parseFloat(coeficient).toFixed(3),
    0
  );
  let functionString = `${independent_term.toFixed(3)} + ${coeficient.toFixed(
    3
  )}ln(x)`;
  return {
    error: error_,
    functionString: functionString,
    coeficiente: coeficient.toFixed(3),
    independent_term: independent_term.toFixed(3),
  };
}

function exponential(points) {
  // Get X //
  let sumOfX = 0;
  let sumOfSqX = 0;
  let sumOfLnY = 0;
  let sumOfXLnY = 0;
  for (let i = 0; i < points.length; i++) {
    sumOfX += points[i][0];
    sumOfSqX += Math.pow(points[i][0], 2);
    sumOfLnY += Math.log(points[i][1]);
    sumOfXLnY += points[i][0] * Math.log(points[i][1]);
  }
  let x = math.matrix([
    [points.length, sumOfX],
    [sumOfX, sumOfSqX],
  ]);
  let y = math.matrix([sumOfLnY, sumOfXLnY]);
  // Solve //
  let w = math.multiply(math.inv(x), y);
  let coeficient = Math.exp(w.subset(math.index(0)));
  let power = w.subset(math.index(1));
  let functionString = `${coeficient.toFixed(3)}e^${power.toFixed(3)}x`;
  let error_ = calculateError(
    points,
    "exponential",
    coeficient.toFixed(3),
    power.toFixed(3),
    0
  );
  return {
    functionString: functionString,
    coeficient: coeficient.toFixed(3),
    power: power.toFixed(3),
    error: error_,
  };
}

function polinomial(points, grade) {
  console.log(`Grade: ${grade}`);
  // Get X //
  let x = [];
  for (let row = 0; row < points.length; row++) {
    x.push([]);
    for (let exp = 0; exp < grade + 1; exp++) {
      x[row].push(Math.pow(points[row][0], exp));
    }
  }
  x = math.matrix(x);
  // Get Y //
  let y = [];
  for (let i = 0; i < points.length; i++) {
    y.push(points[i][1]);
  }
  y = math.matrix(y);
  // Solve //
  let w = math.multiply(
    math.multiply(
      math.inv(math.multiply(math.transpose(x), x)),
      math.transpose(x)
    ),
    y
  );
  console.log(w);
  // print //
  let functionString = "";
  for (let i = 0; i < w._size[0]; i++) {
    functionString += `+ ${w
      .subset(math.index(w._size[0] - (i + 1)))
      .toFixed(3)}x^${w._size[0] - (i + 1)}`;
  }
  let error_ = calculateError(points, "polinomial", 0, 0, w);
  return {
    error: error_,
    functionString: functionString,
    coeficientes_polinomiales: w,
  };
}

function placeChart(points, functionType, a, b, coeficientes_polinomiales) {
  let bubleData = [];
  for (let i = 0; i < points.length; i++) {
    bubleData.push({
      x: points[i][0],
      y: points[i][1],
      r: 10,
    });
  }
  let functionData = [];
  let temp;
  if (bubleData[bubleData.length - 1].x.toFixed(3) == 0) {
    bubleData[bubleData.length - 1].x = 5;
  }
  for (let i = 0; i < 1.5 * bubleData[bubleData.length - 1].x; i += 0.5) {
    if (functionType == "power") {
      functionData.push({
        x: i,
        y: a * Math.pow(i, b),
      });
    } else if (functionType == "logaritmic") {
      if (i == 0) {
        functionData.push({
          x: i,
          y: parseFloat(a) + b * Math.log(0.000000001),
        });
      } else {
        functionData.push({
          x: i,
          y: parseFloat(a) + b * Math.log(i),
        });
      }
    } else if (functionType == "exponential") {
      functionData.push({
        x: i,
        y: a * Math.exp(b * i),
      });
    } else if (functionType == "polinomial") {
      temp = 0;
      for (let j = 0; j < coeficientes_polinomiales._size[0]; j++) {
        temp +=
          coeficientes_polinomiales.subset(math.index(j)) * Math.pow(i, j);
      }
      functionData.push({
        x: i,
        y: temp,
      });
    }
  }
  let ctx = document.getElementById("chart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: "Inputs",
          borderColor: "rgb(255, 255, 255)",
          backgroundColor: " rgb(95, 95, 232)",
          data: bubleData,
        },
        {
          label: "Function",
          data: functionData,
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgb(255, 100, 0)",
          // Changes this dataset to become a line
          type: "line",
        },
      ],
      labels: ["January", "February", "March", "April"],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function sort(points) {
  let temp;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j + 1 <= i; j++) {
      if (points[i - j][0] < points[i - (j + 1)][0]) {
        temp = points[i - j];
        points[i - j] = points[i - (j + 1)];
        points[i - (j + 1)] = temp;
      }
    }
  }
  return points;
}
