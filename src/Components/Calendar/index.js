import { useState } from "react";
import {
    format,
    startOfWeek,
    addDays,
    isSameDay,
    lastDayOfWeek
} from "date-fns";
import {
    getTimes,
    changeWeekHandle
} from '../../Function/Function';
const Calendar = ({ showDetailsHandle }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [jsonArr, setJsonArr] = useState([]);

    const onDateClickHandle = (day, dayStr) => {
        setSelectedDate(day);
        showDetailsHandle(dayStr);
    };

    const renderHeader = () => {
        const dateFormat = "MMM yyyy";
        return (
            <div className="head_wrapper">
                <div className="header row flex-middle">
                    <div className="col col-start">
                        <div className="icon" onClick={() => changeWeekHandle({
                            btnType: "prev",
                            currentMonth,
                            setCurrentMonth
                        })}>
                            Prev week
                        </div>
                    </div>
                    <div className="col col-center">
                        <span>{format(currentMonth, dateFormat)}</span>
                    </div>
                    <div className="col col-end">
                        <div className="icon" onClick={() => changeWeekHandle({
                            btnType: "next",
                            currentMonth,
                            setCurrentMonth
                        })}>
                            Next week
                        </div>
                    </div>
                </div>
                <div className="DropDown_wrapper">
                    <select className="dropdown">
                        <option>[UTC 0]</option>
                        <option>[UTC 5]</option>
                    </select>
                </div>
            </div>
        );
    };

    const renderCells = () => {
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
        const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        const todayDate = new Date();
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const getCurrentDay = setDateFun(day);
                days.push(
                    <div className="days_check_wrapper">
                        <div
                            className={`days_row col cell ${isSameDay(day, new Date())
                                ? "today"
                                : isSameDay(day, selectedDate)
                                    ? "selected"
                                    : ""
                                }`}
                            key={day}
                            onClick={() => {
                                const dayStr = format(cloneDay, "ccc dd MMM yy");
                                onDateClickHandle(cloneDay, dayStr);
                            }}
                        >
                            <span className="number">
                                {" "}
                                {format(addDays(startDate, i), "EEE")}
                                <br />
                                <span className="cell_date">{getCurrentDay}</span>
                            </span>
                            <span className="bg">{formattedDate}</span>
                        </div>
                        <div className="date_time_check">
                            {todayDate > day && !isSameDay(day, new Date()) ? (
                                "Past Date"
                            ) : (
                                <>
                                    {getTimes("8:00", "23:00")?.map((item) => (
                                        <div className="checkbov_wrapper" key={item?.time}>
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    createJSONFUN({
                                                        name: format(addDays(startDate, i), "EEE"),
                                                        time: item?.time,
                                                        date: getCurrentDay,
                                                    })
                                                }
                                            />
                                            <label>{item?.time}</label>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }

            rows.push(
                <div className="days_row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    };

    const createJSONFUN = (props) => {
        setJsonArr([...jsonArr, props]);
    };

    const setDateFun = (day) => {
        return day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear();
    };
    return (
        <div className="calendar">
            {renderHeader()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
