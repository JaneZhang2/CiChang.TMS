import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar-format/lib/locale/en_US';
import zhCnPicker from 'rmc-date-picker/lib/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PopPicker from 'rmc-date-picker/lib/Popup';

const getGregorianCalendar = () => new GregorianCalendar(zhCnPicker.calendar);

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(date) {
    this.props.onChange(
      new GregorianCalendarFormat('yyyy-MM-dd').format(date)
    );
  }

  render() {
    let date = getGregorianCalendar();
    date.setTime(moment(this.props.date));

    let minDate;
    if (this.props.minDate) {
      minDate = getGregorianCalendar();
      minDate.setTime(moment(this.props.minDate));
    }

    return (
      <PopPicker
        popupTransitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        date={date}
        minDate={minDate}
        mode='date'
        locale={zhCnPicker}
        onChange={this.onChange.bind(this)}
        dismissText="取消"
        okText="确定"
      >
        <button className="date-picker-trigger">
          {new GregorianCalendarFormat('yyyy.MM.dd').format(date)}
        </button>
      </PopPicker>
    );
  }
}

export default DatePicker