// Importing modules
import Attendance from "./scripts/Attendance";
import ui from "./scripts/ui";

// Importing stylesheets
import "./styles/general.css";
import "./styles/form.css";
import "./styles/output.css";

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  let presentSlots = document.getElementById("present-slots").value;
  let totalSlots = document.getElementById("total-slots").value;
  let goal = document.getElementById("goal").value;
  e.preventDefault();

  if (!validateInput(presentSlots, totalSlots, goal)) {
    return;
  }

  const attendance = new Attendance(
    parseInt(presentSlots),
    parseInt(totalSlots),
    parseInt(goal),
  );

  ui.renderOutput(attendance);
});

function validateInput(presentSlots, totalSlots, goal) {
  // goal set to 100 but can't be reached
  if (goal == 100 && presentSlots != totalSlots) {
    alert("You can't hit 100% unless you've attended every class!");
    return false;
  }
  // more present than total
  if (presentSlots > totalSlots) {
    alert("Whoa! You can't attend more classes than exist!");
    return false;
  }
  // goal over 100
  if (goal > 100) {
    alert("Over 100%? Now that's some ambition!");
    return false;
  }
  return true;
}
