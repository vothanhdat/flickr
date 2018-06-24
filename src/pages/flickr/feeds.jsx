//@ts-check
///
import React from 'react'
import flickrConnect from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import { withTranslate } from '@/components/Language'
import { ReactList } from '@/components/ReactList'
import { bind, memoize } from 'lodash-decorators';
import { get as getpath } from 'lodash'
import LazyImage from '@/components/LazyImage'





class FlickPhotoPreload {

  static preloadImageCache = {}
  static preloadImageStack = []
  static preloadImageRunning = []

  static preloadImage(src) {
    if (this.preloadImageCache[src])
      return;

    this.preloadImageStack.push(src);

    if (this.waitForNewTask)
      this.preloadTask();
  }
  static waitForNewTask = true;
  static async preloadTask() {

    this.waitForNewTask = false;
    while (this.preloadImageStack.length
      && this.preloadImageRunning.length < 3) {
      let url = this.preloadImageStack.pop();
      console.log('LOAD URL: ', url)
      let img = new Image
      img.src = url;
      this.preloadImageCache[url] = img;
      let task = new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      }).finally(() => {
        this.preloadImageRunning = this.preloadImageRunning.filter(e => e != task)
      })
      this.preloadImageRunning.push(task);

      if (this.preloadImageRunning.length >= 3)
        await Promise.race(this.preloadImageRunning);
    }
    this.waitForNewTask = true;
  }
}

class FlickPhotoUtil {

  /**
   * 
   * @param {FlickrPhotoObj} img 
   */
  static getImageRatio(img) {
    const width = parseInt(img.width_o || img.width_z || img.width_n || img.width_t)
    const height = parseInt(img.height_o || img.height_z || img.height_n || img.height_t)
    return width / height
  }

  @memoize()
  static getRows(datas, currentRow = []) {
    let lastRow = []
    let ratio = 0
    const max_ratio = 5;

    currentRow.push(lastRow);

    for (let e of datas) {

      ratio += this.getImageRatio(e);

      lastRow.push(e);

      FlickPhotoPreload.preloadImage(e.url_t);

      if (ratio >= max_ratio) {
        lastRow.ratio = ratio;
        lastRow = [];
        currentRow.push(lastRow);
        ratio = 0;
      }
    }

    return currentRow
  }


};


/**
 * @class
 * @extends React.Component<{feeds:{photo:FlickrPhotoObj[]}},{rows:FlickrPhotoObj[][]}>
 */
@withTranslate
@withSCSS('../common.scss', './feeds.scss')
@flickrConnect()
export default class PhotoFeeds extends React.Component {


  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      rows: FlickPhotoUtil.getRows(getpath(nextProps, 'feeds.photo', [])),
    }
  }



  componentDidMount() {
    this.props.getNewFeed();
  }


  @bind()
  itemRender(index, key) {
    const datas = this.datas
    const { _, classes } = this.props
    const item = datas[index]
    return <div className={classes.itemcontainer} key={key} >
      <PhotoItem data={item} className={classes.item} />
    </div>
  }

  @bind()
  renderRows(index, key) {

    const { _, classes } = this.props
    const { rows } = this.state;
    const currentRow = rows[index];
    const ratio = currentRow.ratio;
    const height = 100 / ratio;

    return <div key={key} style={{ fontSize: 0, whiteSpace: "nowrap" }} data-ratio={ratio}>
      {
        currentRow.map((e) => <LazyImage
          small={e.url_t || e.url_z || e.url_s}
          large={e.url_c}
          className={classes.imageitem}
          delay={100}
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
        threshold={100}
        useTranslate3d
      />
    </div>
  }
}