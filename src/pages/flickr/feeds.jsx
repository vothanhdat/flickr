//@ts-check
///
import React from 'react'
import { FlickCollection } from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import { ReactList } from '@/components/ReactList'
import { bind, memoize } from 'lodash-decorators';
import { get as getpath } from 'lodash'
import { PhotoItem } from './PhotoItem';

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
    const max_ratio = 4;

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
 * @extends React.Component<{photos:{photo:FlickrPhotoObj[]},collectionName:string} & ClassesProps,{rows:FlickrPhotoObj[][]}>
 */
@withSCSS('../common.scss', './feeds.scss')
@FlickCollection()
export default class PhotoFeeds extends React.Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      rows: FlickPhotoUtil.getRows(getpath(nextProps, 'photos.photo', [])),
    }
  }



  componentDidMount() {
    this.props.getCollection();
  }


  @bind()
  renderRows(index, key) {

    const { classes } = this.props
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
  
  @bind()
  renderRowSize(index) {

    return (innerWidth / (this.state.rows[index].ratio || 1.3)) || 0;
  }



  render() {
    const { classes } = this.props
    const { rows } = this.state;

    return <div className={classes.list}>
      <ReactList
        onScrollEnd={this.props.getCollection}
        length={rows.length}
        itemRenderer={this.renderRows}
        itemSizeGetter={this.renderRowSize}
        type='variable'
        threshold={200}
        useTranslate3d
      />
    </div>
  }
}