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


class ImageColor {

  @memoize()
  static canvas() {
    console.log("RUN CANVAS")
    var canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas
  }

  @memoize()
  static context() {
    console.log("RUN CONTEXT")
    return this.canvas().getContext('2d');
  }


  /**
   * @param {HTMLImageElement} img 
   */
  static getColor(img) {
    if (img._color)
      return img._color;

    var context = this.context()
    if (!context)
      return;

    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    var [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    return "#" + ((r << 16) | (g << 8) | (b << 0)).toString(16)
  }

  static preloadBase64 = {}
  
  static getBase64(src){
    return fetch(`https://images.weserv.nl/?url=${src.replace('https://','')}&w=32&encoding=base64`)
      .then(e => e.text())
  }



}


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
 * @extends React.Component<{feeds:{photo:FlickrPhotoObj[]}} & ClassesProps,{rows:FlickrPhotoObj[][]}>
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