import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

@withTranslate
@withSCSS('../common.scss', './Section1_Headline.scss')
class Section1_Headline extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root}>
      <div className={classes.container}>
        <h1>GIFTO</h1>
        <h3>{_(T.main_headline_title,'b')}</h3>
        <p>{_(T.main_headline_des)}</p>
      </div>
    </div>
  }
}



export default Section1_Headline

