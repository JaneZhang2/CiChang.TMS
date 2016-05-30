import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import GregorianCalendarFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar-format/lib/locale/en_US';
import zhCnPicker from 'rmc-date-picker/lib/locale/en_US';
// const zhCnCalendar = null;
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import PopPicker from 'rmc-date-picker/lib/Popup';

const formatter = new GregorianCalendarFormat('yyyy-MM-dd');
// GregorianCalendarFormat.getDateTimeInstance(GregorianCalendarFormat.Style.FULL,
// GregorianCalendarFormat.Style.FULL, zhCn);

function format(v) {
  return formatter.format(v);
}

const now = new GregorianCalendar(zhCnPicker.calendar);
now.setTime(Date.now());

const getGregorianCalendar = () => new GregorianCalendar(zhCnPicker.calendar);
// const minDate = getGregorianCalendar();
// // minDate.set(2015, 0, 1, 0, 0, 0);
// const maxDate = getGregorianCalendar();
// // maxDate.set(2018, 0, 1, 0, 0, 0);

const DatePicker = React.createClass({
  propTypes: {
    mode: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      mode: 'datetime',
      locale: zhCnPicker
    };
  },
  getInitialState() {
    return {
      date: null
    };
  },
  onChange(date) {
    this.props.onChange(format(date));
    this.setState({date});
  },
  render() {
    const props = this.props;
    const {date} = this.state;

    let minDate, maxDate;
    if (this.props.minDate) {
      minDate = getGregorianCalendar();
      minDate.setTime(moment(this.props.minDate, 'YYYY-MM-DD'));
    }

    return (
      <PopPicker
        popupTransitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        date={date || now}
        minDate={minDate}
        maxDate={maxDate}
        mode='date'
        locale={props.locale}
        onChange={this.onChange}
        dismissText="取消"
        okText="确定"
      >
        <button className="date-picker-trigger">
          {date && new GregorianCalendarFormat('yyyy.MM.dd').format(date) || this.props.defaultDate}
        </button>
      </PopPicker>
    );
  }
});

export default DatePicker