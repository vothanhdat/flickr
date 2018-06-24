import React from 'react'


export default class ImageLazyLoad extends React.Component {

  static defaultProps = {
    delay : 100,
  }

  _timeout = 0

  state = {
    islazy: true,
    small: this.props.small,
    large: this.props.large
  }


  static getDerivedStateFromProps(props, state) {
    return {
      islazy: props.small != state.small || props.large != state.large,
      small: props.small,
      large: props.large,
    }
  }

  componentDidMount() {
    this.lazyUpdate();
  }

  componentDidUpdate(newProps, newState) {
    newState.islazy && this.lazyUpdate();
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  lazyUpdate() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.setState({ islazy: false }), this.props.delay)
  }

  render() {
    const { small, large, style = {}, ...rest } = this.props
    const backgroundImage = this.state.islazy
      ? `url(${small})`
      : `url(${large}),url(${small})`

    return <div style={{ ...style, backgroundImage }} {...rest}></div>
  }
}

