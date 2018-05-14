import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../components/Language'
import Link from '../components/Link'
import className from 'classnames'
import Button from 'material-ui/Button'
import withScroll from 'react-collections/withScroll';
import { connect } from 'react-redux'
import { CHANGE_LANGUAGE } from '../store/actions'
import { isEqual } from 'lodash'
import { history } from '../store'
import { withEvent } from 'react-collections/EventHOC';
/**
 * @param {React.MouseEvent<HTMLElement>} event 
 */
function onToggleClick(event) {
  const target = event.currentTarget
  if (target) {
    target.classList.toggle('expand')
  }
}

@withEvent
@withTranslate
@connect(
  ({ router: { location: { pathname } = {} } = {} }, { language: { name: langname } }) => ({
    onHomePage: pathname == '/' || pathname == ('/' + langname) || pathname == ('/' + langname + '/')
  }),
  (dispatch, props) => ({
    changeLanguage({ lang: newlang }) {
      var path = (window.location + '').replace(location.origin, '')
      var { language: { name: langname } } = props
      if (langname == 'en' && newlang != 'en') {
        history.replace(('/' + newlang + '/' + path).replace('//', '/'));
      } else if (langname != 'en' && newlang == 'en') {
        history.replace((path).replace('/' + langname, ''));
      } else if (langname != 'en' && newlang != 'en') {
        history.replace((path).replace('/' + langname, '/' + newlang));
      }
    }
  }),
)
@withScroll({
  isOnTop: ({ scroll }, props) => props.onHomePage && scroll < window.innerHeight * 0.1,
  isOnFront: ({ scroll }, props) => props.onHomePage && scroll < window.innerHeight,
  isSlipTop: ({ scroll, threadsot }, props) => {
    if (scroll < window.innerHeight * (props.onHomePage ? 1 : 0.05))
      return false
    if (Math.abs(threadsot) > 100)
      return threadsot > 0
  }
})
@withSCSS('./Header.scss')
class Header extends React.PureComponent {
  scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  changeLanguage = ({ currentTarget: { dataset } }) => {
    console.log(dataset.lang)
    if (dataset.lang == 'editlang') {
      this.props.fireEvent('editlang')
    } else {
      this.props.changeLanguage({ lang: dataset.lang })
    }
  }
  render() {
    const { classes, _, language: { name: langname }, isOnTop, isSlipTop, isOnFront } = this.props
    return <div className={classes.root}>
      <input id='menu' type='checkbox' style={{ display: 'none' }} />
      <div className={classes.header} data-ontop={isOnTop} data-slip={isSlipTop}>
        <div className={classes.headercontainer}>

          <Link className={classes.mainlogo} to='/'>
            <img src='/images/logo.svg' className={classes.logo} alt='logo' />
            <span>GIFTO</span>
          </Link>
          <Button component='label' style={{ order: '2' }} htmlFor='menu' className={classes.label} color='inherit' variant='flat'>
            <i className={className('material-icons', classes.menuicon)}>menu</i>
          </Button>
          {/* <label style={{ order: '2' }} htmlFor='menu'> */}
          {/* </label> */}

          <nav className={classes.nav}>
            <Button component={Link} className={classes.menu} to='/hot'>Hot</Button>
            <Button component={Link} className={classes.menu} to='/follow'>Follow</Button>
            <Button component={Link} className={classes.menu} to='/feed'>Feeds</Button>
          </nav>

          <nav className={className(classes.nav, classes.navlang)}>
            <div className={classes.menu}>
              <Button className={classes.menu} style={{ minWidth: 'auto' }} component='a' data-upper>
                {langname}
                <i className="material-icons">keyboard_arrow_down</i>
              </Button>
              <div className={classes.menucon}>
                <Button className={classes.menu} fullWidth data-lang='en' alt='en' data-active={'en' == langname} onClick={this.changeLanguage}>
                  <img src='/images/flag/EN.png' />
                  English
                </Button>
                <Button className={classes.menu} fullWidth data-lang='zh' alt='zh' data-active={'zh' == langname} onClick={this.changeLanguage}>
                  <img src='/images/flag/CN_.png' />
                  Chinese
                </Button>
                <Button className={classes.menu} fullWidth data-lang='ko' alt='ko' data-active={'ko' == langname} onClick={this.changeLanguage}>
                  <img src='/images/flag/KR_.png' />
                  Korea
                </Button>
                <Button className={classes.menu} fullWidth data-lang='editlang' alt='editlang' data-active={'editlang' == langname} onClick={this.changeLanguage}>
                  {/* <img src='/images/flag/KR_.png' /> */}
                  Edit Language
                </Button>
              </div>
              <span />
            </div>
          </nav>

        </div>
      </div>
      <a href="#" className={classes.toTopButton} data-show={!isOnFront} onClick={this.scrollToTop} >arrow_upward</a>
    </div>
  }
}

export default Header
