# React-HolidayCalendar
This component created for a project, anyone can be free for using or fork repo.

- The calendar needs moment library which you can install with npm as "npm install --save moment"
- NPM package is not ready yet


            import ExtraCalendar from 'RELATIVE_PATH_TO_FILE';
            
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
            
            // You can handle day clicks in your view file and open modal or anything you want...
            handleDateClick = (date, value, cellType) => {
               alert(date + "," + value + "," + cellType);
            };            


![Calendar Preview](https://github.com/burakozturk16/React-HolidayCalendar/blob/main/preview.png?raw=true)
