import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

@withTranslate
@withSCSS('../common.scss', './Section19_Uplive.scss')
class Section19_Uplive extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='uplive'>
      <div className={classes.container}>
        <img
          className={classes.largelogo}
          src="/images/liveitup.png"
          alt="Live it up"
          style={{ width: "90%", maxWidth: '800px' }} />

        <div className={classes.storelink}>
          <a href="https://itunes.apple.com/app/id1102727568" title="Uplive Apple store Link" rel="noopener" target="_blank">
            <img className={classes.image} src="/images/appstore.png" alt="Apple store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.asiainno.uplive" title="Uplive Google store Link" rel="noopener" target="_blank">
            <img className={classes.image} src="/images/googleplay.png" alt="Google store" />
          </a>
        </div>
      </div>
    </div>
  }
}


export default Section19_Uplive

