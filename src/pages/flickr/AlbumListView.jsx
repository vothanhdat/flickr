//@ts-check
import React from 'react'
import { ReactListLimitRow, ReactList } from '@/components/ReactList'
import { bind } from 'lodash-decorators';
import withSCSS from "withsass.macro";


const getCover = data => `https://farm${data.farm}.staticflickr.com/${data.server}/${data.primary}_${data.secret}.jpg`

const AlbumItem = ({ className, data }) => {
  return <div className={className} style={{
    backgroundImage: `url(${getCover(data)})`
  }} />
}

@withSCSS('./AlbumListView.scss')
class AlbumListView extends React.Component {


  @bind()
  itemRender(index, key) {
    const { _, albums, classes } = this.props
    const item = albums[index]
    return <div className={classes.itemcontainer} key={key} >
      <AlbumItem _={_} data={item} className={classes.item} />
    </div>
  }

  scrollParentGetter(){
    return window
  }

  render() {
    const { albums, limitrow, classes } = this.props
    const Component = limitrow ? ReactListLimitRow : ReactList;

    return <div className={classes.listcontainer}>
      <div className={classes.list}>
        <Component
          limitrow={limitrow}
          onScrollEnd={this.props.onScrollEnd}
          length={albums.length}
          itemRenderer={this.itemRender}
          scrollParentGetter={this.scrollParentGetter}
          type='uniform'
          useTranslate3d
        />
      </div>
    </div>
  }
}

export default AlbumListView