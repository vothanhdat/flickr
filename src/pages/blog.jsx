/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import { withTranslate } from '../components/Language'
import blogStateConnect, * as BlogSelector from '../store/connects/blog'
import withSCSS from 'withsass.macro';
import CircularProgress from '@material-ui/core/CircularProgress'
import ButtonBase from '@material-ui/core/ButtonBase'
import withInviewPort from 'react-collections/withInviewPort';
import Link from '../components/Link';

const BlocItems = ({ title, image, des, link, uniqueSlug, classes, langname }) => <div 
  className={classes.article}>
  <ButtonBase
    component={Link}
    to={`/blog/${uniqueSlug}`} 
    className={classes.image} 
    title={title} alt={title}
    style={{ backgroundImage: `url('${image}')` }}>
  </ButtonBase>
  <Link to={`/blog/${uniqueSlug}`} className={classes.content} title={title}>
    <h2 className={classes.title}>{title}</h2>
    <div className={classes.des}>{des}</div>
  </Link>
  <br />
</div>

@withTranslate
@blogStateConnect({ max: Infinity, selectFunction: BlogSelector.getPostByLanguage })
@withSCSS('./common.scss', './blog.scss')
@withInviewPort()
class BlogPage extends React.PureComponent {

  componentDidMount() {
    this.props.fetchNewPost()
  }

  componentDidUpdate(oldProps) {
    // this.props.autoFetchMore(oldProps, this.props)
    if(!oldProps.inviewport && this.props.inviewport && !this.props.end){
      this.props.fetchNewPost()
    }
  }

  render() {
    const { classes, _, posts, loading, childref, inviewport,language:{name : langname} } = this.props
    console.log({inviewport, loading})
    return <div className={classes.root}>
      <div className={classes.markdown}>
        {posts.map((e, i) => <BlocItems key={i} {...e} classes={classes} langname={langname}/>)}
        {loading && <CircularProgress className={classes.loadanimation} />}

        <p ref={childref}/>
      </div>
    </div>
  }
}


export default BlogPage

