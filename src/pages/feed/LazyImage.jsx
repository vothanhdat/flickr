//@ts-check
import * as React from 'react'
import { withTranslate, T } from '../../components/Language'
import { RouteComponentProps } from 'react-router'
import withSCSS from "withsass.macro";
import utils from '../../utils/utils'
import {Link} from 'react-router-dom'
@withSCSS('./StreamItem.scss')
class StreamItem extends React.Component {
    render() {
        const { _, data, classes, className } = this.props
        const imgLinkSmall = utils.getImageURL(data.avatar, '50')
        const imgLink = utils.getImageURL(data.avatar, '300')
        return <Link to={`/live/${data.uid}`} className={`${classes.item} ${className}`}>
            <div className={classes.img} style={{ backgroundImage: `url(${imgLink}), url(${imgLinkSmall})` }}></div>
        </Link>
    }

}

export default StreamItem