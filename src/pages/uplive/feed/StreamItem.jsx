//@ts-check
import * as React from 'react'
import withSCSS from "withsass.macro";
import utils from '@/utils/utils'
import LazyImage from '@/components/LazyImage'
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase'

@withSCSS('./StreamItem.scss')
class StreamItem extends React.Component {
    render() {
        const { _, data, classes, className } = this.props
        const imgLinkSmall = utils.getImageURL(data.avatar, '50')
        const imgLink = utils.getImageURL(data.avatar, '300')
        return <ButtonBase component={Link} to={`/live/${data.uid}`} className={`${classes.item} ${className}`}>
            <LazyImage className={classes.img} small={imgLinkSmall} large={imgLink}/>
        </ButtonBase>
    }

}

export default StreamItem