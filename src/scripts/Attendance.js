export default class Attendance {
  constructor(presentSlots = 0, totalSlots = 0, goal = 75) {
    this.initial = [presentSlots, totalSlots];
    this.current = [presentSlots, totalSlots];
    this.goal = goal;
    this.addedAbsents = 0;
    this.addedPresents = 0;
  }

  attendSlots(x = 1) {
    this.updateAttendance(this.current[0] + x, this.current[1] + x);
    this.addedPresents += x;
  }

  missSlots(x = 1) {
    this.updateAttendance(this.current[0], this.current[1] + x);
    this.addedAbsents += x;
  }

  updateAttendance(newPresent, newTotal) {
    this.current = [newPresent, newTotal];
  }

  resetUpdated() {
    this.current[0] = this.initial[0];
    this.current[1] = this.initial[1];
    this.addedAbsents = 0;
    this.addedPresents = 0;
  }

  getPercentage(fromArr = this.current) {
    return Math.round((fromArr[0] / fromArr[1]) * 100 * 100) / 100;
  }

  getCanBeMissed(fromArr = this.initial) {
    let skipped = 0;
    let present = fromArr[0];
    let total = fromArr[1];
    while ((present / total) * 100 >= this.goal) {
      total++;
      skipped++;
    }
    return skipped - 1;
  }

  getNeedToAttend(fromArr = this.initial) {
    let attended = 0;
    let present = fromArr[0];
    let total = fromArr[1];
    while ((present / total) * 100 < this.goal) {
      present++;
      total++;
      attended++;
    }
    return attended;
  }
}
