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
      for (let i = 0; i < ammoutOfInputs; i++) {
        inputValues.push([
          document.getElementById(`input${i}a`).value,
          document.getElementById(`input${i}b`).value,
        ]);
      }
      ammoutOfInputs -= 1;
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
    for (let i = 0; i < inputValues.length - 1; i++) {
      if (i == inputValues.length - 2) {
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
  console.log("clish");
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
    inputValues[i] = [inputA, inputB];
  }
  document.getElementById("error").innerHTML = "";
  console.log(inputValues);
  const options = [
    "toggle",
    "polinomial",
    "logaritmic",
    "exponential",
    "power",
  ];
  let checked;
  for (let i = 0; i < options.length; i++) {
    if (document.getElementById(options[i]).checked) {
      checked = options[i];
    }
  }
  console.log(checked);
  if (checked == "polinomial" || checked == "toggle") {
    let grade = parseFloat(document.getElementById("grade").value);
    if (isNaN(grade)) {
      document.getElementById("error").innerHTML =
        "The grade of the polinomial regression is not a valid value.";
      return;
    }
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
        data: [
          {
            x: 5,
            y: 5,
            r: 10,
          },
          {
            x: 2,
            y: 2,
            r: 10,
          },
          {
            x: 10,
            y: 10,
            r: 10,
          },
        ],
      },
      {
        label: "Function",
        data: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 1,
            y: 7,
          },
          {
            x: 2,
            y: 2,
          },
          {
            x: 10,
            y: 10,
          },
        ],
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
