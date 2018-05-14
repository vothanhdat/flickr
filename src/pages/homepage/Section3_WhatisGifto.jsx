import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import IframeYoutube from 'react-collections/IframeYoutube'
import AutoVideo from 'react-collections/AutoVideo';
import Grid from 'material-ui/Grid'


@withTranslate
@withSCSS('../common.scss', './Section3_WhatisGifto.scss')
class Section3_WhatisGifto extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='whatisgifto'>
      <div className={classes.container}>
        <Grid container  justify='center' alignItems="center" spacing={8} >
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7} >
            <h2>{_(T.main_whatisgifto)}</h2>
            <p data-wrap style={{fontWeight:300}}>
              {_(T.main_whatisgiftocontent,'big','b')}
            </p>
          </Grid>
          <Grid item xs={8} sm={4} md={4} lg={4} xl={4} style={{position:'relative', padding: "0"}}>
            <img src='/images/overlay/phone.png' className={classes.image} alt='phone background'/>
            <AutoVideo 
              source={[{ src: '/videos/facebook.mp4', type: 'video/mp4' }]}
              className={classes.phonevideo}
              alt={_(T.about_bg_alt)}        
              />
          </Grid>
          <Grid item xs={8} sm={4} md={4} lg={3} xl={3} >
            <div className={classes.box}>
              <img src='/images/icon_gifts/whatisgifto-1.png' alt='GIFTO'/>
              <div className={classes.hovercontent}>
                {_(T.main_whatisgifto_des1,'b')}
              </div>
            </div>
          </Grid>
          <Grid item xs={8} sm={4} md={4} lg={3} xl={3} >
            <div className={classes.box}>
              <img src='/images/icon_gifts/whatisgifto-2.png' alt='GIFTO'/>
              <div className={classes.hovercontent}>
                {_(T.main_whatisgifto_des2,'b')}
              </div>
            </div>
          </Grid>
          <Grid item xs={8} sm={4} md={4} lg={3} xl={3} >
            <div className={classes.box}>
              <img src='/images/icon_gifts/whatisgifto-3.png' alt='GIFTO'/>
              <div className={classes.hovercontent}>
                {_(T.main_whatisgifto_des3,'b')}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  }
}



export default Section3_WhatisGifto

