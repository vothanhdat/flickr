/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import withSCSS from 'withsass.macro'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withTranslate, T } from '../../components/Language'


const PartnersSection = ({ classes, _ }) => <div id="partner-section" className={classes.root}>
	<div className={classes.container}>
		<h2>{_(T.partners_title)}</h2>
		<div className={classes.grid}>
			<a title="Binance Launchpad" href="https://launchpad.binance.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "110%", margin: "0 -5%" }} src="/images/home-partner/binance-logo.png?r=456" alt="Binance Launchpad Logo" />
			</a>
			<a title="Taylor Vinters Via" href="https://www.taylorvinters.com/" target="_blank" rel="noopener" >
				<img className={classes.image} src="/images/home-partner/taylor-vinters-via.jpg" alt="Taylor Vinters Via" />
			</a>
			<a title="Ogier" href="https://www.ogier.com/" target="_blank" rel="noopener" >
				<img className={classes.image} src="/images/home-partner/ogier-logo.png" alt="Ogier" />
			</a>
			<a title="KKCoin" href="https://www.kkcoin.com/index" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "75%" }} src="/images/home-partner/kkcoin.png" alt="KKCoin Logo" />
			</a>
			<a title="Orichal" href="https://orichal.io/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/orichal-logo.png" alt="Orichal" />
			</a>
			<a title="Kyper Network" href="https://kyber.network/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/kyper-network-logo.png" alt="Kyper Network Logo" />
			</a>			<a title="Preangel" href="http://www.preangelfund.cn/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/preangel-logo.png" alt="Preangel Logo" />
			</a>
			<a title="NodeCapital" href="http://www.nodecap.com/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/nodecapital-logo.png" alt="NodeCapital Logo" />
			</a>
			<a title="Black Dot" href="https://www.blackdot.sg/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "42%"}} src="/images/home-partner/blackdot-logo.png" alt="Black Dot Logo" />
			</a>
			<a title="Nebulas" href="https://nebulas.io/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/nebulaslogo.svg" alt="Nebulas Logo" />
			</a>
			<a title="Asia Model Festival" href="http://amfoc.org/en/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/amf.jpg" alt="Asia Model Festival Logo" />
			</a>
		</div>
	</div>
</div>


export default withSCSS('../common.scss', './Section11_Partners.scss')(withTranslate(PartnersSection))


