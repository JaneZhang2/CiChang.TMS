import React from 'react';
import './index.scss';
import Filter from '../../components/Filter'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current: ''
    }
  }

  render() {
    return (
      <div className="homepage">
        <header>
          <Filter defaultValue="全校"
                  options={['全校','一年级','二年级','三年级','四年级','五年级']}
                  active={this.state.current=='1'}
                  trigger={()=>this.setState({current:'1'})}
          />
          <Filter defaultValue="单词最多"
                  options={['单词最多','单词最少']}
                  active={this.state.current=='2'}
                  trigger={()=>this.setState({current:'2'})}
          />
          <Filter defaultValue="昨日" options={['昨日','今日','自选']}
                  active={this.state.current=='3'}
                  trigger={()=>this.setState({current:'3'})}
          />
        </header>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
        <div>ceshi</div>
      </div>
    )
  }
}

export default Home;