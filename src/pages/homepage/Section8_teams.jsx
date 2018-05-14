/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes, { func } from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Avatar from 'material-ui/Avatar';
import withSCSS from 'withsass.macro'
import { memoize } from 'lodash'
import { withTranslate, T } from '../../components/Language'


const Linkedin = {
  andy: "https://www.linkedin.com/in/andytian/",
  charle: "https://www.linkedin.com/in/charles-thach-466468/",
  william: "https://www.linkedin.com/in/dathnguyen/",
  minh: "https://www.linkedin.com/in/minhthach/",
  jaekim: "https://www.linkedin.com/in/jae-kim-3b8755146",
  hitters: "https://www.linkedin.com/in/hitters",
  jin: "https://www.linkedin.com/in/hurjinho/",
  addisoin: "https://www.linkedin.com/in/addisonhuegel/",
  justin: "https://www.linkedin.com/in/sunyuchen/",
  sean: "https://www.linkedin.com/in/%E6%AC%A3%E4%BA%9A-%E9%99%B6-68a651145/",
  charles: "https://www.linkedin.com/in/charles-thach-466468/",
  dylan: "https://www.linkedin.com/in/dylan-donghwi-park-pmp-50118221/",

}

const Avatarlink = {
  andy: "/images/home-team/tian.jpg",
  sean: "/images/home-team/seantao.jpg",
  charles: "/images/home-team/charles_thach.jpg",
  william: "/images/home-team/william.jpg",
  daniel: "/images/home-team/daniel_yeh.jpg",
  minh: "/images/home-team/minhthach.jpg",
  boshen: "/images/advisors/bo-shen.jpg",
  loiluu: "/images/advisors/loi-luu.jpg",
  danny: "/images/advisors/danny-yang.jpg",
  rao: "/images/advisors/rao.jpg",
  tom: "/images/advisors/tom-duterme.jpg",
  chris: "/images/advisors/chris-miess.jpg",
  jin: "/images/advisors/jin-ho-hur.jpg",
  hitters: "/images/advisors/hitters-xu.jpg",
  jaekim: "/images/advisors/jae-kim.jpg",
  addisoin: "/images/advisors/addison.jpg",
  justin: "/images/advisors/justin-sun.jpg",
  dylan: "/images/home-team/dylanpark.jpg",
  yubo: "/images/advisors/yubo.jpg",
}


const parseTeam = memoize(
  string => {
    var dataObject = string
      .split('\n')
      .map(e => e.trim().split('|'))
      .filter(e => e && e.length == 2)
      .reduce((o, e) => {
        if (e && e[0]) {
          var [id, type] = e[0].trim().split('_');
          var content = e[1];
          (o[id] || (o[id] = {}))[type] = content;
        }
        return o;
      }, {})

    return Object.entries(dataObject)
      .map(([k, e]) => ({
        ...e,
        id: k,
        avatar: Avatarlink[k],
        linkedin: Linkedin[k],
      }))

  }
)


const TeamMember = ({ id, name, avatar, position, detail, company, linkedin, classes }) => <div className={classes.member}>
  <div className={classes.avatar} tabIndex="-1">
    <img alt={`${name} ${position ? ', ' + position : ""} ${company ? ', ' + company : ""}`} src={avatar} />
    <div className={classes.name}>{name}</div>
    <div className={classes.position}>{position}</div>

  </div>
  <div className={classes.content}>
    <div className={classes.name}>{name}</div>
    <div className={classes.position}>{position}</div>
    <div className={classes.company}>{company}</div>
    <div className={classes.link}>
      {linkedin && <a href={linkedin} title={`${name} Linkedin Profile`}>
        <img src="/images/social/icon-linkedin.svg" alt={`${name} Linkedin Profile`} />
      </a>}
    </div>
    <div className={classes.detail}>{detail}</div>
  </div>
</div>

@withTranslate
@withSCSS('../common.scss', './Section8_Teams.scss')
class Section8_Teams extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    const TEAMS = parseTeam(_(T.team_details))
    const ADVISORS = parseTeam(_(T.advisor_details))

    return <div id="team-section" className={classes.root} id='teams'>
      <div className={classes.container}>
        <Grid container spacing={0} className={classes.teamgrid}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h2>{_(T.team_title)}</h2>
            <div className={classes.teamcontainer}>
              {TEAMS.map((e, i) => <TeamMember {...e} classes={classes} key={i} />)}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h2>{_(T.advisors_title)}</h2>
            <div className={classes.teamcontainer}>
              {ADVISORS.map((e, i) => <TeamMember {...e} classes={classes} key={i} />)}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  }
}



export default Section8_Teams


