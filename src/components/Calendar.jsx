import React from "react";
import dateFns from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    currentDay: new Date(),
    selectedDate: new Date(),
    selectedHour: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    const hourFormat = "HH mm";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat,hourFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
  renderHours() {
    
    const hourFormat ="H m";
    const hours =[];

    let startHour = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 8; i < 20; i++) {
      hours.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addHours(startHour, i), hourFormat)}
        </div>
      );
    }

    return <div className="hours row">{hours}</div>;
  }


  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells(){
    const { currentMonth,selectedHour } = this.state;
    // const monthStart = dateFns.startOfMonth(currentMonth);
    // const monthEnd = dateFns.endOfMonth(monthStart);
    const dayStart = dateFns.startOfDay(dayStart);
    const dayEnd = dateFns.endOfDay(dayEnd);
    const startHour= dateFns.startOfHour(dayStart);
    const endHour= dateFns.endOfHour(dayEnd);

   
    const rows = [];
    const hourFormat ="H";

    
    let hours = [];
    let hour = startHour;
    let formattedHour = "";
    

    while(hour<=endHour){
      for (let i=8;i<20; i++){
        formattedHour = dateFns.format(hour,hourFormat);
        const cloneHour = hour;
        hours.push(
          <div
          className={`col cell ${
            !dateFns.isSameDay(hour,dayStart)
            ?"disabled"
            :dateFns.isSameHour(hour,selectedHour)?"selected": ""

          }`}
          key ={hour}
          onClick={()=> this.onDateClick(dateFns.parse(cloneHour))}
          >
            <span className="number">{formattedHour}</span>
            <span className="sm">{formattedHour}</span>
            </div>

        );
        hour=dateFns.addHours(hour,8);
      }
      rows.push(
        <div className="row" key={hour}>
          {hours}
          </div>
      );
      hours = [];
    }
    return <div className="body">{rows}</div>;
  }
    
    onDateClick = hour => {
      this.setState({
        selectedDate: hour
      });
    };
  
    nextMonth = () => {
      this.setState({
        currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
      });
    };
  
    prevMonth = () => {
      this.setState({
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
      });
    };
 


  renderCells() {
    const { currentMonth, selectedDate} = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    

    const dateFormat = "D";
    const rows = [];
  

    let days = [];
    let day = startDate;
    let formattedDate = "";
   
   /*Day format loop */

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.renderHours()}
      </div>
    );
  }
}

export default Calendar;
