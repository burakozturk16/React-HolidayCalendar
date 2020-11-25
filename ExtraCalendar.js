import React from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import './style.css';

const DAY_TYPE = {
    DISABLED: 'disabled',
    NORMAL: 'day',
    TODAY: 'today',
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable'
}


class ExtraDay extends React.Component{
    constructor(props) {
        super(props);

        this.date = moment().year(this.props.year).month(this.props.month).date(this.props.day).format('YYYY-MM-DD');
    }

    handleDayClick = () => {
        this.props.onDateClick(this.date, this.props.cellText, this.props.cellType);
    };

    render(){
        return(
           <td
               data-dayname={this.props.dayName}
               data-day={this.props.day}
               data-year={this.props.year}
               data-month={this.props.month + 1}
               className={`cell-label ${this.props.cellType}`}
               title={this.props.dayName}
               onClick={this.handleDayClick}
           >{this.props.cellText}</td>
        )
    }
}

class ExtraCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.startDate = moment().year(this.props.startYear).month(this.props.startMonth).date(1);
        this.endDate = moment().year(this.props.endYear).month(this.props.endMonth).date(1);
        this.yearsArr = this.createYears();
        this.today = moment();
    }

    createYears = () => {
        let years = [];
        let monthsCount = this.endDate.diff(this.startDate, 'months');
        let sm = this.props.startMonth;
        let cy = this.props.startYear;

        for(let mc = 0; mc <= monthsCount; mc++){
            years.push({year: cy, month: sm, daysInMonth: moment().year(cy).month(sm).daysInMonth()});

            if(sm === 12){
                sm = 1;
                cy = this.props.endYear;
            }else{
                sm++;
            }
        }

        return years;
    }

    getHeaders = () => {
        let headers = [];

        for (let i = 1; i <= 31; i++) {
            headers.push(<th key={`extraCalendarTh${i}`}>{i}</th>);
        }

        return headers;
    };

    getDays = (year) => {
        let days = [];
        let monthIndex = year.month - 1;

        for (let day = 1; day <= year.daysInMonth; day++) {
            let cell_type = DAY_TYPE.NORMAL;
            let cell_text = "";
            let currentDate = moment().year(year.year).month(monthIndex).date(day);
            let currentDateAsStr = currentDate.format('YYYY-MM-DD').toString();
            let dayName = moment(currentDate).lang(this.props.locale).format('dddd');

            // is today?
            if(this.props.highLightToday && currentDate.isSame(this.today, 'day')){
                cell_type = DAY_TYPE.TODAY;
            }

            // is past?
            if(this.props.disablePast && currentDate.isBefore(this.today)){
                cell_type = DAY_TYPE.DISABLED;
            }

            // is available?
            if(this.props.availableDates.includes(currentDateAsStr)){
                cell_type = DAY_TYPE.AVAILABLE;
            }

            // is unavailable?
            if(this.props.unavailableDates.includes(currentDateAsStr)){
                cell_type = DAY_TYPE.UNAVAILABLE;
            }

            // is disabled?
            if(this.props.disabledDates.includes(currentDateAsStr)){
                cell_type = DAY_TYPE.DISABLED;
            }

            if(this.props.dateValues.filter(d => d.date === currentDateAsStr).length > 0){
                let found = this.props.dateValues.filter(d => d.date === currentDateAsStr)[0];
                cell_text = found.value;
            }

            days.push(<ExtraDay
                key={`extraCalendarDay${currentDateAsStr}`}
                dayName={dayName}
                day={day}
                year={year.year}
                month={monthIndex}
                cellText={cell_text}
                cellType={cell_type}
                onDateClick={this.props.onDateClick}
            />);
        }

        return days;
    };

    getYear = (year) => {
        return <label>{moment().lang(this.props.locale).month(year.month - 1).format("MMMM")} <small>{year.year}</small></label>;
    };

    render() {
        return(
            <div className={this.props.containerClass} id="calendar">
                <table className={this.props.tableClass}>
                        <tr className="headerTr">
                            <th>&nbsp;</th>
                            {this.getHeaders()}
                        </tr>
                        {this.yearsArr.map((year, index) => {
                                return(
                                    <tr key={`extraCalendarYearRow${index}`}>
                                        <td>{this.getYear(year)}</td>
                                        {this.getDays(year)}
                                    </tr>
                                )
                            })
                        }

                </table>
            </div>
        )
    }
}

export default ExtraCalendar;
