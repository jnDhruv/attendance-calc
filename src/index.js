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

  const attendance = new Attendance(
    parseInt(presentSlots),
    parseInt(totalSlots),
    parseInt(goal)
  )
  
  ui.renderOutput(attendance);
  
});