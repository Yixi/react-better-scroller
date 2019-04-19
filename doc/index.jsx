import React from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src';

class ScrollA extends React.PureComponent {

  state = {
    data1: new Array(100).fill(true),
    isRefresh: false,
    isLoading: false
  }

  onPullDown = () => {
    this.setState({isRefresh: true})
    setTimeout(() => {
      this.setState({
        data1: new Array(80).fill('refresh'),
        isRefresh: false
      })
    }, 2000)
  }

  onPullUpLoad = () => {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState(prevState => {
        return {
          data1: prevState.data1.concat(new Array(20).fill('more')),
          isLoading: false
        }
      })
    }, 3000)
  }

  renderRefreshPlaceholder = () => {
    return (
      <div className="refresh-placeholder">Loading...</div>
    )
  }

  renderLoadingPlaceholder = () => {
    return (
      <div className="loading-placeholder">
        正在加载.....
      </div>
    )
  }

  render() {
    return (
      <div id="scroll-1">
        <Scroller
          isRefresh={this.state.isRefresh}
          onPullDownRefresh={this.onPullDown}
          refreshPlaceholder={this.renderRefreshPlaceholder()}
          onPullUpLoad={this.onPullUpLoad}
          isLoading={this.state.isLoading}
          loadPlaceholder={this.renderLoadingPlaceholder()}
          options={{
            pullDownRefresh: true,
            pullUpLoad: true
          }}
        >
          {this.state.data1.map((_, index) => {
            return (
              <div key={index}>No. {index} {_}</div>
            )
          })}
        </Scroller>
      </div>
    );
  }
}

ReactDOM.render((
  <div>
    <ScrollA/>
  </div>
), document.getElementById('Main'))
