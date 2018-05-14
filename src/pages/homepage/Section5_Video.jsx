import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'
import datas from './Section5_Video.data'
import withInviewPort from 'react-collections/withInviewPort';
import IframeYoutube from 'react-collections/IframeYoutube';
import Device from 'react-collections/utils/device'
import { popupContent } from '../../components/Popup'

// import ImageZoom from 'react-medium-image-zoom'

@withTranslate
@withInviewPort()
@withSCSS('../common.scss', './Section5_Video.scss')
class Section5_Video extends React.PureComponent {
  onVideoClick = (e) => {
    const { currentTarget } = e
    const { classes } = this.props
    if(innerWidth < 1100)
      return;

    e.preventDefault();

    const videoData = datas[parseInt(currentTarget.dataset.idx)]

    popupContent({
      title: videoData.title,
      classes: { paper: classes.videopopcon },
      Component: ({onClose}) => <IframeYoutube 
        src={videoData.src.replace('https://youtu.be/', '')} 
        className={classes.videopop} 
        controls 
        autoplay/>
    })
  }

  render() {
    const { classes, _, hasappred, childref } = this.props
    return <div className={classes.root} id='video' ref={childref}>
      <div className={classes.container}>
        <h2>{_(T.main_videotitle)}</h2>
        <Grid container justify="flex-start" className={classes.contribute} spacing={0}>
          {
            datas.map((e, i) => <Grid item md={4} sm={6} xs={12} key={i}>
              <a href={e.src} target="_blank" rel="noopener" data-idx={i} onClick={this.onVideoClick} className={classes.videoitem}>
                {/* <img src={hasappred ? e.thumb : '/images/16-9.png'} className={classes.image} /> */}
                <div className={classes.image} style={{backgroundImage: hasappred ? `url(${e.thumb})` : ``}}/>
                <h4>{e.title}</h4>
              </a>
            </Grid>)
          }

        </Grid>

      </div>
    </div>
  }
}



export default Section5_Video

