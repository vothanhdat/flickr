import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import FrontSection from './homepage/FrontSection'
import Section1_Headline from './homepage/Section1_Headline'
import Section2_WhatisVirtualGift from './homepage/Section2_WhatisVirtualGift'
import Section3_WhatisGifto from './homepage/Section3_WhatisGifto'
import Section4_Protocol from './homepage/Section4_Protocol'
import Section5_Video from './homepage/Section5_Video';
import Section6_Product from './homepage/Section6_Product';
import Section7_Testimonials from './homepage/Section7_Testimonials';
import Section8_Teams from './homepage/Section8_Teams';
import Section9_Roadmap from './homepage/Section9_Roadmap';
import Section10_FAQ from './homepage/Section10_FAQ';
import Section11_Partners from './homepage/Section11_Partners';
import Section11_Listed from './homepage/Section11_Listed';
import Section12_Investors from './homepage/Section12_Investors';
import Section13_Press from './homepage/Section13_Press';
import Section14_News from './homepage/Section14_News';
import Section16_Whitepaper from './homepage/Section16_Whitepaper';
import Section17_WeeklyUpdate from './homepage/Section17_WeeklyUpdate';
import Section18_AAA from './homepage/Section18_AAA';
import Section19_Uplive from './homepage/Section19_Uplive';

import withSCSS from "withsass.macro";
import device from '../utils/device'
import withLazyLoad from '../components/withLazyLoad';


let cache = {}

@withLazyLoad({
  Section15_Events: () => import(/* webpackChunkName: "events" */'./homepage/Section15_Events')
})
@withSCSS('./index.scss')
class Index extends React.Component {


  render() {
    const { classes, Section15_Events } = this.props;

    return <div className={classes.root}>
      <FrontSection />
      <Section1_Headline />
      <Section2_WhatisVirtualGift />
      <Section3_WhatisGifto />
      <Section4_Protocol />
      <Section5_Video />
      <Section6_Product />
      <Section7_Testimonials />
      <Section8_Teams />
      <Section9_Roadmap />
      <Section10_FAQ />
      <Section11_Listed />
      <Section11_Partners />
      <Section12_Investors />
      <Section13_Press />
      <Section14_News />
      <Section15_Events />
      <Section16_Whitepaper />
      <Section17_WeeklyUpdate />
      <Section18_AAA />
      <Section19_Uplive />
    </div>
  }
}

export default Index;
