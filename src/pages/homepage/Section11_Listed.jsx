/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import withSCSS from 'withsass.macro'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withTranslate, T } from '../../components/Language'


const ListedOnSection = ({ classes, _ }) => <div id="listed-section" className={classes.root}>
	<div className={classes.container}>
		<h2>{_(T.listed_title)}</h2>
		<div className={classes.grid}>
			<a title="Binance" href="https://binance.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "90%"}} src="/images/listed/binance.svg" alt="Binance Logo" />
			</a>
			<a title="Okex" href="https://www.okex.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "90%",  }} src="/images/listed/okex.svg" alt="Okex Logo" />
			</a>
			<a title="Coinnest" href="https://www.coinnest.co.kr/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/coinnest.png" alt="Coinnest Logo" />
			</a>
			<a title="Bibox" href="https://www.bibox.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/bibox.png" alt="Bibox Logo" />
			</a>
			<a title="Cointiger" href="https://www.cointiger.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/cointiger.png" alt="Cointiger Logo" />
			</a>
			<a title="Gatecoin" href="gatecoin" href="https://gatecoin.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/gatecoin.png" alt="GateCoin Logo" />
			</a>
			<a title="KKCoin" href="https://www.kkcoin.com/index" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "75%" }} src="/images/home-partner/kkcoin.png" alt="KKCoin Logo" />
			</a>
			<a title="Cobinhood" href="https://cobinhood.com/home" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/cobinhood.png" alt="Cobinhood Logo" />
			</a>
			<a title="Bancor" href="https://www.bancor.network/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/bancor.jpeg" alt="Bancor Logo" />
			</a>
			<a title="OTCBTC" href="https://otcbtc.com/" target="_blank" rel="noopener">
				<img className={classes.image} style={{ width: "100%",  }} src="/images/listed/OTCBTC LOGO.png" alt="OTCBTC Logo" />
			</a>
			<a title="Kyper Network" href="https://kyber.network/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/home-partner/kyper-network-logo.png" alt="Kyper Network Logo" />
			</a>		
			<a title="CPDAX" href="https://www.cpdax.com/" target="_blank" rel="noopener">
				<img className={classes.image} src="/images/listed/cpdax.svg" alt="CPDAX Logo" />
			</a>		
		</div>
	</div>
</div>


export default withSCSS('../common.scss', './Section11_Partners.scss')(withTranslate(ListedOnSection))


