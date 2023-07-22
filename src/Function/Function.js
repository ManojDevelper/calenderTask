import {
    addWeeks,
    subWeeks,
  } from "date-fns";


  // Handle Week Change
export const changeWeekHandle = (props) => {
    const {
        btnType,
        currentMonth,
        setCurrentMonth
    } = props;
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };
export function getTimes(fromDate, untilDate) {
    //"01/01/2001" is just an arbitrary date
    var until = Date.parse("01/01/2001 " + untilDate);
    var from = Date.parse("01/01/2001 " + fromDate);
    //*2 because because we want every 30 minutes instead of every hour
    var max = (Math.abs(until - from) / (60 * 60 * 1000)) * 2;
    var time = new Date(from);
    let hours = [];
    for (var i = 0; i <= max; i++) {
      //doubleZeros just adds a zero in front of the value if it's smaller than 10.
      var hour = time.getHours();
      var minute = time.getMinutes();
      hours.push({
        name: "",
        date: "",
        time: hour + ":" + minute + getAM_PM(hour, minute),
      });
      time.setMinutes(time.getMinutes() + 30);
    }
    return hours;
  }

  export const getAM_PM = (hour, minute) => {
    const testVar = hour <= 12 && minute < 30 ? "AM" : "PM";
    return testVar;
  };