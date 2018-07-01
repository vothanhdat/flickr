import React from 'react'
import { ReactList } from '@/components/ReactList'
import { bind, memoize } from 'lodash-decorators';
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

export class FlickPhotoUtil {

  /**
   * 
   * @param {FlickrPhotoObj} img 
   */
  static getImageRatio(img) {
    const width = parseInt(img.width_o || img.width_z || img.width_n || img.width_t)
    const height = parseInt(img.height_o || img.height_z || img.height_n || img.height_t)
    return width / height
  }

  static lastPhotoSnappsot = []

  static getRows(datas, max_ratio = 4, currentRow = []) {
    this.lastPhotoSnappsot = datas.map(e => e.id);

    let lastRow = []
    let ratio = 0

    currentRow.push(lastRow);

    for (let e of datas) {

      ratio += this.getImageRatio(e);

      lastRow.push(e);
      lastRow.ratio = ratio;

      FlickPhotoPreload.preloadImage(e.url_t);

      if (ratio >= max_ratio) {
        lastRow = [];
        currentRow.push(lastRow);
        ratio = 0;
      }
    }
    if (!lastRow.ratio || lastRow.ratio < max_ratio)
      lastRow.ratio = max_ratio;


    return currentRow.filter(e => e.length > 0)
  }

  /**
   * 
   * @param {FlickrPhotoObj[]} datas 
   * @param {number} ratio 
   */
  static getNearestRatio(datas, ratio = 2.5) {
    var currentImg = undefined
    var currentRatio = 100000
    for (var e of datas) {
      var r = this.getImageRatio(e);
      if (Math.abs(r - ratio) < Math.abs(currentRatio - ratio)) {
        currentRatio = r;
        currentImg = e;
      }
    }
    return currentImg
  }

};



class PhotoListView extends React.Component {

  static defaultProps = {
    classes: {},
    photos: [],
  };

  static getDerivedStateFromProps({ photos = [] }) {
    return {
      rows: FlickPhotoUtil.getRows(photos),
    }
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
    var row = this.state.rows[index];
    return ((innerWidth / (row.ratio || 1.3)) || 0)
  }

  scrollParentGetter() {
    return window
  }


  render() {
    const { classes } = this.props
    const { rows } = this.state;

    return <div className={classes.list}>
      <ReactList
        onScrollEnd={this.props.onScrollEnd}
        length={rows.length}
        itemRenderer={this.renderRows}
        itemSizeGetter={this.renderRowSize}
        scrollParentGetter={this.scrollParentGetter}
        type='variable'
        threshold={200}
        useTranslate3d
      />
    </div>
  }
}

export default PhotoListView
