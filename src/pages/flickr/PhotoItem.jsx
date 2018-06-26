import React from 'react'
import withSCSS from 'withsass.macro'
import ImageLazyLoad from '@/components/LazyImage';
import Link from '@/components/Link';
import { bind } from 'lodash-decorators';





/**
 * @class
 * @extends {React.Component<{data:FlickrPhotoObj} & ClassesProps>}
 */
@withSCSS('./PhotoItem.scss')
export class PhotoItem extends React.Component {
  state = {
    transition: false
  }

  @bind()
  onClick() {
    this.setState({ transition: true })
    this._timeout = setTimeout(() => {
      this.setState({ transition: false })
    }, 300)
  }

  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
  }

  render() {
    const { data, classes, style = {} } = this.props
    return <Link
      style={style}
      className={classes.root}
      to={`/flickr/p/` + data.id}
      onClick={this.onClick}
      {...this.state.transition ? { 'data-transition': "photo" } : {}}>
      <ImageLazyLoad
        data={data}
        className={classes.photoitem}
        small={data.url_t || data.url_z || data.url_s}
        large={data.url_c}
        delay={16}
      />
      <div className={classes.info}>
        <div className={classes.infoleft}>
          <div className={classes.photoname}>{data.title}</div>
          <div className={classes.infoauthor}> {data.username}</div>
        </div>

        <div className={classes.inforight}>
          <span>
            <i className="material-icons">star_border</i>
            {data.count_faves}
          </span>
          &nbsp;
          <i className="material-icons">chat_bubble_outline</i>
        </div>
      </div>
    </Link >
  }
}