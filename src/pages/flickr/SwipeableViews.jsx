import React from 'react'
import SwipeableViews from 'react-swipeable-views';

/**
 * @class 
 * @extends {SwipeableViews}
 */
export default class SwipeableViewsExtends extends React.Component {

  static getDerivedStateFromProps({ index }, state) {
    return {
      index,
      [index]: true,
    }
  }

  _timeout = {}

  componentDidUpdate(oldProps, oldState) {
    if (oldState.index != this.state.index) {
      var oldIndex = oldState.index;
      clearTimeout(this._timeout[this.state.index]);
      this._timeout[oldIndex] = setTimeout(
        () => this.setState({
          [oldIndex]: false,
        }),
        500
      )
    }
  }

  componentWillUnmount() {
    for (var i in this._timeout) {
      clearTimeout(this._timeout[i]);
    }
  }

  render() {
    const state = this.state
    const children = React.Children.map(
      this.props.children,
      (child, indexChild) => <React.Fragment>
        {state[indexChild] ? child : null}
      </React.Fragment>
    )
    return <SwipeableViews
      {...this.props}
      children={children}
    />
  }
}

