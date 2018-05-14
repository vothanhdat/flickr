import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Hidden from 'material-ui/Hidden'

class Desktop_Diagram extends React.PureComponent {
  render() {
    const { classes, _ } = this.props

    return <svg className={classes.giftoproto} data-desktop viewBox="0 0 1054 697">
      <text transform="translate(357.304,263.51)" className={classes.svgtitle}>{_(T.proto_platform)}</text>
      <text transform="translate(716.041,261.845)" className={classes.svgtitle}>{_(T.proto_virtual)}</text>
      <text transform="translate(691.489,404.436)" className={classes.svgtitle}>{_(T.proto_smart)}</text>
      <text transform="translate(677.489,415.898)">
        <tspan x="0" dy="1.2em" textAnchor="middle" >{_(T.proto_create, _, 0)}</tspan>
        <tspan x="0" dy="1.2em" textAnchor="middle" >{_(T.proto_create, _, 1)}</tspan>
        <tspan x="0" dy="1.2em" textAnchor="middle" >{_(T.proto_create, _, 2)}</tspan>
        <tspan x="0" dy="1.2em" textAnchor="middle" >{_(T.proto_create, _, 3)}</tspan>
      </text>
      <text transform="translate(401.485,404.436)" className={classes.svgtitle}>{_(T.proto_virtual_meta)}</text>
      <text transform="translate(311.01,415.898)">
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 0)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 1)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 2)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 3)}</tspan>
      </text>
      <text transform="translate(396.012,415.898)">
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 0)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 1)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 2)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 3)}</tspan>
      </text>
      <text transform="translate(743.12,328.454)" className={classes.svgtitle}> {_(T.proto_blockchain)} </text>
      <text transform="translate(195.112,619.454)" className={classes.svgtitle}>
        {_(T.proto_buy)}
      </text>
      <text transform="translate(856.121,619.454)" className={classes.svgtitle}>
        {_(T.proto_withdraw)}
      </text>
      <text transform="translate(95.11,463.454)" className={classes.svgtitle}>{_(T.proto_fan)}</text>
      <text transform="translate(943.122,463.454)" className={classes.svgtitle}> {_(T.proto_content)} </text>
    </svg>
  }
}

class Mobile_Diagram extends React.PureComponent {
  render() {
    const { classes, _ } = this.props

    return <svg viewBox="0 0 701 660" className={classes.giftoproto} data-mobile fontSize="20">

      <text className={classes.svgtitle} transform="translate(4 -56.073)">{_(T.proto_platform)}</text>
      <text className={classes.svgtitle} transform="translate(526.119 273.454)">
        {_(T.proto_blockchain)}
      </text>
      <text className={classes.svgtitle} transform="translate(195.111 535.454)">
        {_(T.proto_buy)}

      </text>
      <text className={classes.svgtitle} transform="translate(491.121 535.454)">
        {_(T.proto_withdraw)}
      </text>
      <text className={classes.svgtitle} transform="translate(605.806 600.833)"> {_(T.proto_content)}</text>
      <text className={classes.svgtitle} transform="translate(46.11 601.454)">  {_(T.proto_fan)}</text>
      <text className={classes.svgtitle} transform="translate(145.305 194.509)">  {_(T.proto_platform)}</text>
      <text className={classes.svgtitle} transform="translate(557.304 194.509)">  {_(T.proto_virtual)}</text>
      <text className={classes.svgtitle} transform="translate(213.877 322.43)">  {_(T.proto_virtual_meta)} </text>
      <text transform="translate(95.846 351.756)">
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 0)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 1)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 2)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_creator, _, 3)}</tspan>
      </text>
      <text className="cls-10" transform="translate(206.735 351.756)">
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 0)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 1)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 2)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_price, _, 3)}</tspan>
      </text>
      <text className={classes.svgtitle} transform="translate(515.377 322.43)">
        {_(T.proto_smart)}
      </text>
      <text className="cls-10" transform="translate(500.377 351.756)" textAnchor="middle">
        <tspan x="0" dy="1.2em">{_(T.proto_create, _, 0)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_create, _, 1)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_create, _, 2)}</tspan>
        <tspan x="0" dy="1.2em">{_(T.proto_create, _, 3)}</tspan>
      </text>
    </svg>
  }
}


@withTranslate
@withSCSS('./Section4_Protocol_Diagram.scss')
class Section4_Protocol_Diagram extends React.PureComponent {
  render() {
    const { classes, _ } = this.props

    return <div className={classes.imageprotocol}>

      <picture alt={_(T.platfom_image_alt)} className={classes.giftoproto}>
        <source media="(max-width: 900px)" srcSet="/images/protocols/gifto-protocol-mobile.png" />
        <img src="/images/protocols/gifto-protocol.png" alt="Gifto Protocol" />
      </picture>
      <Mobile_Diagram {...{ classes, _ }} />
      <Desktop_Diagram {...{ classes, _ }} />
    </div>

  }
}



export default Section4_Protocol_Diagram

