//@ts-check
import * as React from 'react'
import withSCSS from "withsass.macro";
import utils from '@/utils/utils'
import { Link } from 'react-router-dom'

class ImageLazyLoad extends React.Component {

    state = { 
        islazy: true, 
        small: this.props.small, 
        large: this.props.large 
    }

    _timeout = 0

    static getDerivedStateFromProps(props, state) {
        return {
            islazy: props.small != state.small || props.large != state.large,
            small: props.small,
            large: props.large,
        }
    }

    componentDidMount(){
        this.lazyUpdate();
    }

    componentDidUpdate(newProps,newState) {
        newState.islazy && this.lazyUpdate();
    }

    componentWillUnmount() {
        clearTimeout(this._timeout);
    }

    lazyUpdate() {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => this.setState({ islazy: false }), 50)
    }

    render() {
        const { small, large, style = {}, ...rest } = this.props
        return this.state.islazy
            ? <div style={{ backgroundImage: `url(${small})`, ...style }} {...rest}></div>
            : <div style={{ backgroundImage: `url(${large}),url(${small})`, ...style }} {...rest}></div>
    }
}

@withSCSS('./StreamItem.scss')
class StreamItem extends React.Component {
    render() {
        const { _, data, classes, className } = this.props
        const imgLinkSmall = utils.getImageURL(data.avatar, '50')
        const imgLink = utils.getImageURL(data.avatar, '300')
        return <Link to={`/live/${data.uid}`} className={`${classes.item} ${className}`}>
            <ImageLazyLoad className={classes.img} small={imgLinkSmall} large={imgLink}/>
        </Link>
    }

}

export default StreamItem