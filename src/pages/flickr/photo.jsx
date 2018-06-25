//@ts-check
///
import React from 'react'
import flickrConnect from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import { withTranslate } from '@/components/Language'
import { ReactList } from '@/components/ReactList'
import { bind, memoize } from 'lodash-decorators';
import { get as getpath } from 'lodash'
import { PhotoItem } from './PhotoItem';

/**
 * @class
 * @extends React.Component<{photo:FlickrPhotoObj, photo_id: string}>
 */
@withTranslate
@withSCSS('../common.scss', './photo.scss')
@flickrConnect()
export default class PhotoFeeds extends React.Component {


  componentDidMount() {
    this.props.getNewFeed();
  }


  // @bind()
  // itemRender(index, key) {
  //   const datas = this.datas
  //   const { _, classes } = this.props
  //   const item = datas[index]
  //   return <div className={classes.itemcontainer} key={key} >
  //     <PhotoItem data={item} className={classes.item} />
  //   </div>
  // }

  @bind()
  renderRows(index, key) {

    const { _, classes } = this.props
    const { rows } = this.state;
    const currentRow = rows[index];
    const ratio = currentRow.ratio;
    const height = 100 / ratio;

    return <div key={key} style={{ fontSize: 0, whiteSpace: "nowrap" }} data-ratio={ratio}>
      {
        currentRow.map((e) => <PhotoItem
          data={e}
          className={classes.imageitem}
          style={{
            height: `${height}vw`,
            width: `${FlickPhotoUtil.getImageRatio(e) / ratio * 100}vw`,
          }}
        />)
      }
    </div>
  }



  render() {
    const { classes } = this.props
    const { rows } = this.state;

    return <div className={classes.list}>
      <ReactList
        onScrollEnd={this.props.getNewFeed}
        length={rows.length}
        itemRenderer={this.renderRows}
        type='variable'
        threshold={200}
        useTranslate3d
      />
    </div>
  }
}