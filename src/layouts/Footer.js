import React from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../components/Language'
// import { Link } from 'react-router-dom'
import Link from '../components/Link'
import SocialIconsFull from './SocialIcons'
import classNames from 'classnames'

@withSCSS('../pages/common.scss','./Footer.scss')
@withTranslate
class Footer extends React.PureComponent {
	render() {
		const { classes = {}, _ } = this.props
		return <div className={classes.root}>
			<div className={classes.container}>
				<Grid container id='footer' spacing={0} justify="center" alignContent="center" alignItems="center">
					<Grid item md={3} lg={3} sm={12} xs={12} className={classNames(classes.col, classes.logo)}>
						<img src='/images/logo-wide.png' height="70px"/>
						<br/>
						<br/>
					</Grid  >
					<Grid item md={5} lg={5} sm={12} xs={12} className={classes.col}>
						<Link to='/#home'> {_(T.menu_about)} </Link>| 
						<Link to='/#products'> {_(T.menu_product)} </Link>| 
						<Link to='/#faq-section'> {_(T.menu_faq)} </Link>| 
						<Link to='/#teams'> {_(T.menu_team)} </Link>| 
						<Link to='/#news'> {_(T.menu_news )}</Link>
						<br/>
						<Link to='/blog'> {_(T.menu_blog)} </Link>| 
						<Link to='/#events'> {_(T.menu_events)} </Link>| 
						<Link to='/#roadmaps'> {_(T.menu_roadmap)} </Link>| 
						<Link to='/#press'> {_(T.menu_press)} </Link>| 
						<Link to='/#aaa'> {_(T.menu_aaa)} </Link>| 
						<Link to='/#whitepaper'> {_(T.menu_whitepaper )}</Link>
						<br/>
						<br/>
						<span><b>@2017 GIFTO </b></span>| 
						<Link to='/privacypolicy/'> {_(T.policy) } </Link>|
						<Link to='/termsofuse/'> {_(T.terms) } </Link>|
						<a href='/termsofsale.pdf'> {_(T.saleterms )} </a>
					</Grid>
					<Grid item md={4} lg={4} sm={12} xs={12} className={classes.col}>
						<br/>
						<br/>
						<SocialIconsFull className={classes.social} data-nowrap/>
						<br/>
					</Grid>
				</Grid>
			</div>
		</div>
	}
}

export default Footer

