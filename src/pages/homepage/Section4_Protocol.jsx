import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Hidden from 'material-ui/Hidden'
import Section4_Protocol_Diagram from './Section4_Protocol_Diagram';
import Section4_Cross_Plaform from './Section4_Cross_Plaform';
@withTranslate
@withSCSS('../common.scss', './Section4_Protocol.scss')
class Section4_Protocol extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='giftoprotocol'>
      <div className={classes.container}>
        <h2>{_(T.platfom_title)}</h2>
        <div className={classes.diagram}>
          <Section4_Protocol_Diagram  {...{ classes, _ }} />
          <Section4_Cross_Plaform {...{ classes, _ }} />
        </div>
      </div>
    </div>
  }
}



export default Section4_Protocol

