import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import IframeYoutube from 'react-collections/IframeYoutube'
import ButtonBase from 'material-ui/ButtonBase';
import device from '../../utils/device'
import Link from '../../components/Link'
import withInviewPort from 'react-collections/withInviewPort';


@withTranslate
@withInviewPort()
@withSCSS('../common.scss', './Section18_AAA.scss')
class Section18_AAA extends React.PureComponent {

  state = { videos: [], active: 0 }

  componentDidMount() {
    if(device.isSPA)
      return;
    // const playlistID = 'PLTVSHuu2RoUj2Zy2MMjlU5VZzPePbsrHP'
    const playlistID = 'PLTVSHuu2RoUj2Zy2MMjlU5VZzPePbsrHP'
    const APIKey = 'AIzaSyCZP3d7XKSFsb8707ixGYoGE555vJsx8Cw'
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${playlistID}&key=${APIKey}`)
      .then(e => e.json())
      .then(e => this.setState({
        videos: e.items.map(({ snippet: { title, resourceId: { videoId }, thumbnails: { standard : {url : image} = {}, medium: { url } } } }) => ({
          videoId,
          url,
          title,
          image,
        }))
      }))
  }

  onSelectVideo = ({currentTarget:{dataset}}) => {
    this.setState({active : parseInt(dataset.idx)})
  }

  render() {
    const { classes, _, hasappred, childref } = this.props
    const { active, videos } = this.state
    const { videoId, url, image, title } = videos[active] || {}


    return <div className={classes.root} id='aaa' ref={childref}>
      <div className={classes.container}>
        <Grid container justify="space-around">
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>

            <h2 data-wrap>
              {_(T.main_aaa_title)}
              <img src="/images/home-team/tian.jpg" className={classes.andy} alt="Group CEO - Asia Innovations Group"/>
            </h2>
            
            <p data-wrap>
              {_(T.main_aaa_des,
                'b',
                <Button component={Link} to="/#faq-section" variant="raised" color="primary">{_(T.menu_faq)}</Button>
              )}
            </p>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.videos}>
            <div className={classes.videocontainer}>
              <IframeYoutube 
                src={videoId} 
                className={classes.video} 
                title={title}
                style={{backgroundImage : hasappred ? `url(${image})` : ''}} />
            </div>
            <h3>{title}</h3>
            <div className={classes.items}>
              {videos.map((e,i) => <div className={classes.item} data-active={i == active} key={i}>
                <ButtonBase className={classes.absolute} onClick={this.onSelectVideo} data-idx={i}>
                  <img src={hasappred ? e.url : ''} className={classes.absolute}/>
                </ButtonBase>
              </div>)}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  }
}



export default Section18_AAA

