import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import blogStateConnect , * as BlogSelector from '../../store/connects/blog'
import Link from '../../components/Link'

@withTranslate
@blogStateConnect({selectFunction : BlogSelector.getWeeklyUpdate })
@withSCSS('../common.scss', './Section17_WeeklyUpdate.scss')
class Section17_WeeklyUpdate extends React.PureComponent {
  render() {
    const { classes, _, posts = [] } = this.props
    
    return <div className={classes.root} id='weeklyupdate'>
      <div className={classes.container}>
        <h2>{_(T.main_weeklyupdate)}</h2>
        {posts.map((e,i) => <Button key={i} className={classes.item} component={Link} to={`/blog/${e.uniqueSlug}`}>
          <div className={classes.badge}>{e.lang}</div>
          <div className={classes.des}>{e.title}</div>
        </Button>)}
      </div>
    </div>
  }
}



export default Section17_WeeklyUpdate

