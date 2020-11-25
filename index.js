import React from 'react';
import ReactDOM from 'react-dom';
import ExtraCalendar from "./ExtraCalendar";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDateClick = (date, value, cellType) => {
        alert(date + "," + value + "," + cellType);
    };

    render() {
        return (
            <ExtraCalendar
                locale="tr"
                disablePast={true}
                highLightToday={true}
                startYear={2020}
                startMonth={11}
                endYear={2021}
                endMonth={11}
                containerClass=""
                tableClass=""
                availableDates={['2020-11-25', '2020-11-26', '2020-11-27', '2020-11-29']}
                unavailableDates={['2020-11-28']}
                disabledDates={['2020-11-30']}
                dateValues={[{date:'2020-11-25', value:240}, {date:'2020-11-26', value:200}]}
                onDateClick={this.handleDateClick}
            />
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
