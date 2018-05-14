import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

@withTranslate
@withSCSS('../common.scss', './Section16_Whitepaper.scss')
class Section16_Whitepaper extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='whitepaper'>
      <div className={classes.container}>
        <h1>{_(T.menu_whitepaper_title)}</h1>
        <h3>{_(T.whitepaper_download)}</h3>
        <p className={classes.dowloadarea}>
          <Button className={classes.nope} variant='raised' color='primary'>
            {_(T.language)}
            <i className='material-icons'>navigate_next</i>
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          <Button component='a' target='_blank' href='/GIFTO_Whitepaper_V2.0_20171204.pdf' className={classes.lang}>
            <img src='/images/flag/enus.png' alt='English'/>
            English &nbsp;
          </Button>
          {/* <Button component='a' target='_blank' href='/GIFTO_WHITEPAPER_CN.pdf' className={classes.lang}>
            <img src='/images/flag/kr.png' alt='Korea'/>
            Korea &nbsp;
          </Button> */}
          <Button component='a' target='_blank' href='/GIFTO_WHITEPAPER_CN.pdf' className={classes.lang}>
            <img src='/images/flag/cn.png' alt='Chinese'/>
            Chinese &nbsp;
          </Button>
          <Button component='a' target='_blank' href='/GIFTO_WHITEPAPER_RS.pdf' className={classes.lang}>
            <img src='/images/flag/rs.png' alt='Russia'/>
            Russia &nbsp;
          </Button>

        </p>
      </div>
    </div>
  }
}



export default Section16_Whitepaper

