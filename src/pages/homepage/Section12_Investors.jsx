/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import withSCSS from 'withsass.macro'
import Grid from 'material-ui/Grid';
import { withTranslate, T } from '../../components/Language'




const InvestorsSection = ({ classes, _ }) => <div id="invest-section" className={classes.root}>
  <div className={classes.container}>
    <h2>{_(T.investors_title)}</h2>
    <div className={classes.grid}>
      <a title="Pantera" href="https://panteracapital.com/" target="_blank" rel="noopener">
        <img className={classes.image} style={{ width: "90%"}} src="/images/home-partner/pantera-logo.png" alt="Pantera Logo" />
      </a>
      <a title="BlockAsset" href="https://blockasset.io/" target="_blank" rel="noopener">
        <img className={classes.image} style={{ width: "90%"}} src="/images/home-investor/blockasset.png" alt="BlockAsset Logo" />
      </a>
      <a title="KPCB KLEINER PERKINS CAUFIELD BYERS" href="https://www.kpcb.com/" target="_blank" rel="noopener">
        <img className={classes.image} style={{ width: "90%"}} src="/images/home-investor/kpcb.png" alt="KPCB KLEINER PERKINS CAUFIELD BYERS" />
      </a>
      <a title="MSA" href="http://www.magicstoneinvest.com/" target="_blank" rel="noopener">
        <img className={classes.image} src="/images/home-investor/msa.png" alt="MSA" />
      </a>
      <a title="Index Ventures" href="https://www.indexventures.com/" target="_blank" rel="noopener">
        <img className={classes.image} src="/images/home-investor/ventures.png" alt="Index Ventures" />
      </a>
      <a title="WICKLOW CAPITAL" >
        <img className={classes.image} style={{ width: "95%"}} src="/images/home-investor/wicklow.png" alt="WICKLOW CAPITAL" />
      </a>
      <a title="WHITE STAR CAPITAL" href="https://whitestarvc.com/" target="_blank" rel="noopener">
        <img className={classes.image} style={{ width: "55%" }} src="/images/home-investor/whitestar.png" alt="WHITE STAR CAPITAL" />
      </a>
      <a title="VENTECH" href="http://www.ventechvc.com/" target="_blank" rel="noopener">
        <img className={classes.image} style={{ width: "55%" }} src="/images/home-investor/ventech.png" alt="VENTECH" />
      </a>
      <a title="Signum Capital" href="http://www.signum.capital/" target="_blank" rel="noopener">
        <img className={classes.image} src="/images/home-investor/signum-capital-logo.jpg" alt="Signum Capital" />
      </a>
    </div>
  </div>
</div>


export default withSCSS('../common.scss', './Section11_Partners.scss')(withTranslate(InvestorsSection))


