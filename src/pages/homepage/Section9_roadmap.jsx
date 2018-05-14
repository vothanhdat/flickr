import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import IframeYoutube from 'react-collections/IframeYoutube'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import Fade from 'react-collections/Fade';
import Hidden from 'material-ui/Hidden';
import withInviewPort from 'react-collections/withInviewPort';
import BgAnimation from 'react-collections/BgAnimation'


const RoadmapMilestone = ({ title, text, active, index, empty }) => <div key={index} className={classNames('time-line-box', { active: active, empty })}>
  <div className='dot'>
    <div className='waves'></div>
  </div>
  <div className='pointer'></div>
  <div className='box-content'>
    <div className='date'>
      {title}
    </div>
    <div className='description'>
      {text}
    </div>
  </div>
</div>

@withTranslate
@withSCSS('../common.scss', './Section9_Roadmap.scss')
class RoadmapSection extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    const RoadmapData = _(T.roadmap_content)
      .split('|')
      .map(e => e.split('^'))
      .map(([e, f]) => ({ title: e, text: f }));

    RoadmapData[0].active = true;

    return <div id="roadmaps" className={classes.root}>
      <div className={classes.container}>
        <h2>{_(T.roadmap_title)}</h2>
        {/* <p/> */}
        {/* <img alt={_(T.roadmap_title)} src="/images/roadmap.png" className={classes.roadmapimage}/> */}
        <div className={classes.timeline}>
          <div className='top'>
            {
              RoadmapData.map((e, i) => <RoadmapMilestone empty={i % 2 == 0} key={i} index={i} {...e} />)
            }
          </div>
          <div className='bar' />
          <div className='bottom'>
            {
              RoadmapData.map((e, i) => <RoadmapMilestone empty={i % 2 > 0} key={i} index={i} {...e} />)
            }
          </div>
        </div>
      </div>
      <BgAnimation />
    </div>
  }
}


export default RoadmapSection




// export default Section9_Roadmap

