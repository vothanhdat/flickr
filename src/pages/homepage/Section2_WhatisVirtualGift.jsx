import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import IframeYoutube from 'react-collections/IframeYoutube'
import Grid from 'material-ui/Grid'

@withTranslate
@withSCSS('../common.scss', './Section2_WhatisVirtualGift.scss')
class Section2_WhatisGifto extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='whatisvirtualgift'>
      <div className={classes.container}>
        <h2>{_(T.main_whatisvg)}</h2>
        <div className={classes.videocontainer}>
          <IframeYoutube src='ZzHy0r9NPcU' className={classes.video} title={_(T.main_whatisvg)}/>
        </div>
        <Grid container className={classes.gifts}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <img src="/images/icon_gifts/customize.png" alt={_(T.platfom_1,_, 0)} />
            <h3>{_(T.platfom_1,_, 0)}</h3>
            <p>{_(T.platfom_1,_, 1)}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <img src="/images/icon_gifts/management.png" alt={_(T.platfom_2,_, 0)} />
            <h3>{_(T.platfom_2,_, 0)}</h3>
            <p>{_(T.platfom_2,_, 1)}</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <img src="/images/icon_gifts/user.png" alt={_(T.platfom_3,_, 0)} />
            <h3>{_(T.platfom_3,_, 0)}</h3>
            <p>{_(T.platfom_3,_, 1)}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  }
}



export default Section2_WhatisGifto

