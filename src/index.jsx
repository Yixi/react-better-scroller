import React from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'

const wrapperStyle = {
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
}

const refreshStyle = {
  position: 'absolute',
  width: '100%',
  left: '0',
  top: '0'
}

export default class Scroller extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.object,
    isRefresh: PropTypes.bool,
    onPullDownRefresh: PropTypes.func,
    refreshPlaceholder: PropTypes.node,
    isLoading: PropTypes.bool,
    onPullUpLoad: PropTypes.func,
    loadPlaceholder: PropTypes.node
  }

  static defaultProps = {
    options: {}
  }

  scrollInstance = null
  scrollElementRef = React.createRef()

  componentDidMount() {
    this.initScroll()
  }

  componentDidUpdate(prevProps, prevState,) {

    if (this.scrollInstance) {
      if (this.props.isRefresh === false && prevProps.isRefresh === true) {
        this.scrollInstance.finishPullDown()
      }

      if (this.props.isLoading === false && prevProps.isLoading === true) {
        this.scrollInstance.finishPullUp()
      }

      this.scrollInstance.refresh()
    }

  }

  componentWillUnmount() {
    if (this.scrollInstance) {
      // this.scrollInstance.destory()
    }
  }

  initScroll = () => {
    if (!this.scrollInstance) {
      this.scrollInstance = new BScroll(this.scrollElementRef.current, {
        mouseWheel: true,
        scrollbar: {
          fade: true
        },
        ...this.props.options
      })

      this.scrollInstance.on('pullingDown', () => {
        this.props.onPullDownRefresh && this.props.onPullDownRefresh()
      })

      this.scrollInstance.on('pullingUp', () => {
        console.log('pull load')
        this.props.onPullUpLoad && this.props.onPullUpLoad()
      })
    }
  }

  render() {
    return (
      <div style={wrapperStyle} ref={this.scrollElementRef}>
        <div>
          {this.props.children}
          {this.props.isLoading && <div>{this.props.loadPlaceholder}</div>}
        </div>
        {
          this.props.isRefresh &&
          <div style={refreshStyle}>{this.props.refreshPlaceholder}</div>
        }
      </div>
    )
  }
}
