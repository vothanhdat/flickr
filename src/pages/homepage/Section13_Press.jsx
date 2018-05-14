import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import AutoVideo from 'react-collections/AutoVideo'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'


import pressItems from './Section13_Press.data'
import withComputeProps from 'react-collections/withComputeProps';


@withComputeProps({
  initData: {width : innerWidth},
  events : {
    "resize" : (e,datas) => datas.width = innerWidth
  },
  computeProps : {
    wide : ({width}) => width > 900 ? 5
      : width > 500 ? 3
      : 2.5,
  }
})
@withTranslate
@withSCSS('../common.scss', './Section13_Press.scss')
class Section13_Press extends React.PureComponent {
  state = { active: 12 }
  onClick = ({ currentTarget: { dataset } }) => {
    this.setState({ active: parseInt(dataset.idx) })
  }

  onNext = () => this.setState(({active},props) => ({active : Math.min(pressItems.length - 1,active + 1)}))

  onPrev = () => this.setState(({active},props) => ({active : Math.max(0,active - 1)}))

  render() {
    const { classes, _, wide } = this.props
    const centerIdx =  (wide - 1) / 2
    const translateX = (100 / wide)

    return <div className={classes.root} id='press'>
      <div className={classes.container}>
        <h2>{_(T.press_title)}</h2>

        <div className={classes.presscontainer} style={{ transform: `translateX(${-translateX * (this.state.active - centerIdx)}%)` }}>
          {
            pressItems.map((e, i) => <div className={classes.pressitem} key={i} data-idx={i} data-state={Math.min(1,Math.max(-1, i - this.state.active))} onClick={this.onClick}>
              <img className={classes.presslogo} src={e.image} alt="scmp" />
              <a className={classes.pressinfo} href={e.link} target="_blank" rel="noopener">
                {e.title}
              </a>
            </div>
            )
          }
        </div>

        <div className={classes.button}>
          <span data-prev onClick={this.onPrev}><i className="material-icons">navigate_before</i></span>        
          <span data-next onClick={this.onNext}><i className="material-icons">navigate_next</i></span>        
        </div>

      </div>

    </div>
  }
}



export default Section13_Press

