import React from 'react'
import {hashHistory} from 'react-router'
import Dialog from 'rc-dialog';
import uuid from 'node-uuid'
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

  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v4()
    }
  }

  render() {
    let {id} = this.state;
    let {params, currentDialogId, closeDialog, setCurrentDialogId} = this.props;

    let dialog;
    let dialogActive = id == currentDialogId;
    let catalog = _.get(params, 'category');

    if (dialogActive) {
      dialog = (
        <Dialog
          wrapClassName="navigation"
          visible={dialogActive}
          animation="slide-fade"
          maskAnimation="fade"
          onClose={closeDialog}
        >
          <div className="arrow"></div>
          <ul>
            {
              _.map(options, option=> {
                let {key} = option,
                  selected = catalog == key;

                return (
                  <li key={key} className={selected?'active':''}
                      onClick={()=>closeDialog(hashHistory.push(`/rankings/${key}`))}>
                    <i className="hui-icon-checked-small"></i>
                    <span>{option.text}</span>
                    <i className="hui-icon-checked-small"></i>
                  </li>
                )
              })
            }
          </ul>
        </Dialog>
      )
    }

    return (
      <div className="navigation">
        <div onClick={()=>setCurrentDialogId(id)}>
          {_.get(_.find(options, {key: catalog}), 'text')}
          <i className="hui-icon-carat-d-small"/>
        </div>
        {dialog}
      </div>
    )
  }
}

export default Ranking;