const UIController = () => {
  const container = document.querySelector(".container");

  function renderOutput(attendance, isSimulated = false) {
    clearOutput();

    const source = isSimulated ? attendance.current : attendance.initial;

    const percentage = attendance.getPercentage(source);
    const goal = attendance.goal;

    const output = createDiv("", "output");

    const titleH3 = createHeading("Your attendance:", "h3");

    let msgColor, descMsg;

    if (percentage < goal) {
      msgColor = "var(--validation-false-color)";
      descMsg = `You need to attend ${attendance.getNeedToAttend(source)} more classes!`;
    } else {
      msgColor = "var(--validation-true-color)";
      descMsg = `Great! You can miss ${attendance.getCanBeMissed(source)} classes and still keep up.`;
    }
    const percentH1 = createHeading(`${percentage}%`, "h1");
    const msgH3 = createHeading(`${descMsg}`, "h3");

    percentH1.style.color = msgColor;
    msgH3.style.color = msgColor;

    const progressOuter = createDiv("", "progress-bar-outer");
    const progressInner = createDiv("", "progress-bar-inner");

    progressInner.style.width = `${percentage}%`;
    progressInner.style.backgroundColor = msgColor;
    progressOuter.appendChild(progressInner);

    const simulator = createDiv("", "simulator");

    const addAbsent = createDiv("", "sim-absent");
    const absentH3 = createHeading("Mark Absent", "h3");

    const abButtons = createDiv("", "absent-buttons");
    const abAdd1 = createButton("+1");
    abAdd1.addEventListener("click", () => {
      attendance.missSlots(1);
      renderOutput(attendance, true);
    });
    const abAdd5 = createButton("+5");
    abAdd5.addEventListener("click", () => {
      attendance.missSlots(5);
      renderOutput(attendance, true);
    });
    const abAdd10 = createButton("+10");
    abAdd10.addEventListener("click", () => {
      attendance.missSlots(10);
      renderOutput(attendance, true);
    });
    abButtons.append(abAdd1, abAdd5, abAdd10);
    addAbsent.append(absentH3, abButtons);

    const addPresent = createDiv("", "sim-present");
    const presentH3 = createHeading("Mark Present", "h3");

    const prButtons = createDiv("", "present-buttons");
    const prAdd1 = createButton("+1");
    prAdd1.addEventListener("click", () => {
      attendance.attendSlots(1);
      renderOutput(attendance, true);
    });
    const prAdd5 = createButton("+5");
    prAdd5.addEventListener("click", () => {
      attendance.attendSlots(5);
      renderOutput(attendance, true);
    });
    const prAdd10 = createButton("+10");
    prAdd10.addEventListener("click", () => {
      attendance.attendSlots(10);
      renderOutput(attendance, true);
    });
    prButtons.append(prAdd1, prAdd5, prAdd10);
    addPresent.append(presentH3, prButtons);

    const resetButton = createButton("Reset", "sim-reset");
    resetButton.addEventListener("click", () => {
      attendance.resetUpdated();
      renderOutput(attendance);
    });
    simulator.append(addAbsent, addPresent, resetButton);

    if (isSimulated) {
      const currPresent = createPara(
        `Present: ${attendance.current[0]}`,
        "sim-stats",
      );
      const currTotal = createPara(
        `Total: ${attendance.current[1]}`,
        "sim-stats",
      );
      simulator.append(currPresent, currTotal);
    }

    output.append(titleH3, percentH1, progressOuter, msgH3, simulator);
    container.append(output);
  }

  function clearOutput() {
    const output = document.querySelector(".output");
    if (output) {
      container.removeChild(output);
    }
  }

  return {
    renderOutput,
  };
};

function createDiv(content, ...classes) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = content;
  applyClasses(newDiv, classes);
  return newDiv;
}

function createButton(content, ...classes) {
  let newButton = document.createElement("button");
  newButton.textContent = content;
  applyClasses(newButton, classes);
  return newButton;
}

function createHeading(content, type, ...classes) {
  let newHeading = document.createElement(type);
  newHeading.textContent = content;
  applyClasses(newHeading, classes);
  return newHeading;
}

function createPara(content, ...classes) {
  let newPara = document.createElement("p");
  newPara.innerHTML = content;
  applyClasses(newPara, classes);
  return newPara;
}

function applyClasses(element, classes) {
  if (classes.length != 0) {
    classes.forEach((temp) => {
      element.classList.add(temp);
    });
  }
}

export default UIController();
