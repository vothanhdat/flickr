import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

@withTranslate
@withSCSS('../common.scss', './Section4_Cross_Plaform.scss')
class Section4_Cross_Plaform extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root}>
      <div className={classes.container}>
        <Grid container justify="center" alignItems="center">
          <Grid item lg={5} md={5} xl={5} sm={5} xs={10}>
            <img src="/images/cross.png" alt={_(T.main_cross_platform)}/>
          </Grid>
          <Grid item lg={6} md={6} xl={6} sm={7} xs={12}>
            <div className={classes.big}>{_(T.main_cross_platform)}</div>
            <div className={classes.small}>{_(T.main_cross_platform_des)}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  }
}



export default Section4_Cross_Plaform

