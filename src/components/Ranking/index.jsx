import React from 'react'
import {hashHistory} from 'react-router'
import Dialog from 'rc-dialog';
import './index.scss'

const options = [
  {
    key: 'users',
    text: '排名-人'
  },
  {
    key: 'class',
    text: '排名-班级'
  }
];

class Ranking extends React.Component {

  onClose() {
    this.setState({
      visible: false
    });
  }

  onClick() {
    this.setState({
      visible: true
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    let {params} = this.props;
    let category = _.get(params, 'category');

    let dialog;
    if (this.state.visible) {
      dialog = <Dialog
        wrapClassName="xxxxxxx"
        visible={this.state.visible}
        animation="slide-fade"
        maskAnimation="fade"
        onClose={this.onClose.bind(this)}
      >
        <div className="arrow"></div>
        <ul>
          {
            _.map(options, option=> {
              let {key} = option,
                selected = category == key;

              return (
                <li
                  key={key}
                  className={selected?'active':''}
                  onClick={()=>{
                    this.onClose();
                    hashHistory.push(`/rankings/${key}`);
                  }}
                >
                  {option.text}
                  {
                    selected
                      ? <i className="hui-icon-checked-small"></i>
                      : ''
                  }
                </li>
              )
            })
          }
        </ul>
      </Dialog>
    }

    return (
      <div className="ranking-container">
        <div onClick={this.onClick.bind(this)}>
          {_.get(_.find(options, {key: category}), 'text')}
          <i className="hui-icon-carat-d-small"/>
        </div>
        {dialog}
      </div>
    )
  }
}

export default Ranking;