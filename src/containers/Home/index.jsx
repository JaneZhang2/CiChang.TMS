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
        <table>
          <tr>
            <td><small>01</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>02</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>03</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>04</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>05</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>06</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>07</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>08</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>09</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>10</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>11</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>12</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>13</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
          <tr>
            <td><small>14</small> 张小北</td>
            <td>10 <small>词</small></td>
            <td>1 <small>天</small></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Home;

// <header>
//   <Filter defaultValue="全校"
//           options={['全校','一年级','二年级','三年级','四年级','五年级']}
//           active={this.state.current=='1'}
//           trigger={()=>this.setState({current:'1'})}
//   />
//   <Filter defaultValue="单词最多"
//           options={['单词最多','单词最少']}
//           active={this.state.current=='2'}
//           trigger={()=>this.setState({current:'2'})}
//   />
//   <Filter defaultValue="昨日" options={['昨日','今日','自选']}
//           active={this.state.current=='3'}
//           trigger={()=>this.setState({current:'3'})}
//   />
// </header>