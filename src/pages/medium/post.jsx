/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import { withTranslate } from '@/components/Language'
import blogStateConnect, * as BlogSelector from '@/store/connects/blog'
import withSCSS from 'withsass.macro';
import CircularProgress from '@material-ui/core/CircularProgress'
import ButtonBase from '@material-ui/core/ButtonBase'
import withInviewPort from 'react-collections/withInviewPort';
import Link from '@/components/Link';
import ImageZoom from 'react-medium-image-zoom'

const BlogItems = ({ title, image, des, link, uniqueSlug, classes, langname }) => <div
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


const IframeCache = {}

class LayoutResource extends React.Component {
  static sizes = {
    '1': { margin: "1.5em 0", width: "100%" },
    '2': { margin: "2em -4em", width: "calc(100% + 8em)" },
    '3': { margin: "2em -8em", width: "calc(100% + 16em)" },
    '4': { margin: "2em -12em", width: "calc(100% + 24em)" },
    '5': { margin: "2em calc(50% - 50vw)", width: "100vw" },
  }
  render() {
    const { layout } = this.props
    const { sizes } = this.constructor
    const style = sizes[layout] || sizes['1'];
    return <div style={style}>
      <div style={{ maxWidth: "100vw", margin: "0 auto" }}>
        {this.props.children}
      </div>
    </div>
  }
}

@withInviewPort()
class IframeResource extends React.Component {

  state = {
    src: IframeCache[this.props.thumbnailUrl] || ""
  }

  componentDidMount() {
    const { mediaResourceId } = this.props
    if (!this.state.src) {
      fetch(`https://giftoproxy.herokuapp.com/medium/media/${mediaResourceId}`)
        .then(e => e.json())
        .then(({ response: [{ iframeSrc } = {}] = [] }) => iframeSrc)
        .then(e => {
          IframeCache[this.props.thumbnailUrl] = e;
          this.setState({ src: e });
        })
    }
  }

  render() {
    const { iframeWidth, iframeHeight, thumbnailUrl, classes, hasappred, childref, children, layout } = this.props
    const { src } = this.state
    return <LayoutResource layout={layout}>
      <div ref={childref} className={classes.ratiocontainer} style={{
        paddingTop: `${iframeHeight / iframeWidth * 100}%`,
        backgroundImage: `url(${thumbnailUrl})`,
      }}>
        {hasappred && <iframe
          src={src}
          className={classes.iframe}
          children={children}
        />}
      </div>
    </LayoutResource>
  }
}

class ImageResource extends React.Component {
  render() {
    const { type, text, name, markups, metadata, mixtapeMetadata, iframe, layout } = this.props
    const style = {
      display: "block",
      maxHeight: layout == 5 ? "auto" : "100vh",
      margin: "1.5em auto",
      maxWidth: "100%"
    }
    return <LayoutResource layout={layout}>
      {layout == 5
        ? <img
          src={`https://cdn-images-1.medium.com/max/${Math.max(metadata.originalHeight, 2000)}/${metadata.id}`}
          style={style}
        /> : <ImageZoom zoomMargin={0} image={{
          src: `https://cdn-images-1.medium.com/max/${Math.max(metadata.originalHeight, 700)}/${metadata.id}`,
          style: style
        }} />
      }
    </LayoutResource>
  }
}

@withTranslate
@blogStateConnect({ max: 7, selectFunction: BlogSelector.getPostByLanguage })
@BlogSelector.blogPostConnect({
  getPostID: ({ match: { params: { postid } } }) => postid
})
@withSCSS('../common.scss', './blog.scss')
@withInviewPort({ thredsort: 10 })
class BlogPage extends React.PureComponent {

  componentDidMount() {
    this.props.fetchPost()
    this.props.fetchNewPost()
  }

  componentDidUpdate(oldProps) {
    // console.log(oldProps)
    if (oldProps.postid != this.props.postid)
      this.props.fetchPost();

    if (!oldProps.inviewport && this.props.inviewport && !this.props.end) {
      this.props.fetchNewPost()
    }
  }


  renderMarkup(content = '', markups = []) {
    var currentPadding = 0;
    var componenttag = ''
    var length = ''
    var markupinjects = new Array(content.length)
    
    for (var { start, end, type, ...rest } of markups) {
      switch (type) {
        case 10:
          componenttag = ({children}) => <code>{children}</code>;
          break;
        case 3:
          componenttag = ({children}) => <a href={rest.href} rel={rest.rel}>{children}</a>;
          break;
        case 2:
          componenttag = ({children}) => <i>{children}</i>;
          break;
        case 1:
          componenttag = ({children}) => <b>{children}</b>;
          break;
        default:
          continue;
          break;
      }

      (markupinjects[start] || (markupinjects[start] = []))
        .push(componenttag);
      (markupinjects[end] || (markupinjects[end] = []))
        .push(componenttag);
    }

    var childrens = []
    var stack = []
    var pre = 0;

    for(var i in markupinjects){
      var ar = markupinjects[i];
      for(var Com of ar){
        if(stack.length == 0){
          stack.push(Com);
          childrens.push(content.slice(pre,i));
          pre = i;
        }else if(stack[stack.length - 1] == Com){
          stack.pop();
          childrens.push(<Com children={content.slice(pre,i)}/>);
          pre = i;
        }
      }
    }

    childrens.push(content.slice(pre));

    return React.createElement(
      React.Fragment,
      {},
      ...childrens
    )
  }

 
  renderParagraph({ type, text, name, markups, metadata, mixtapeMetadata, iframe, layout }) {

    switch (type) {
      case 1:
        // return <p key={name} dangerouslySetInnerHTML={{ __html: this.renderMarkup(text, markups) }} />
        return <p key={name}>{this.renderMarkup(text, markups)}</p>
      case 3:
        return <h1 key={name}>{text}</h1>
      case 8:
        return <pre key={name}>{text}</pre>
      case 11:
        return <IframeResource key={name} {...iframe} children={text} classes={this.props.classes} layout={layout} />
      case 13:
        return <h2 key={name}>{text}</h2>
      case 14:
        return <div key={name} className={this.props.classes.card}>
          <b>{text}</b>
          <p><a href={mixtapeMetadata.href} rel="noopener" target="_blank"><small>{mixtapeMetadata.href.split('/')[2]}</small></a></p>
          <img src={`https://cdn-images-1.medium.com/max/300/${mixtapeMetadata.thumbnailImageId}`} />
        </div>

      case 9:
        // return [<li key={name} dangerouslySetInnerHTML={{ __html: this.renderMarkup(text, markups) }} />]
        return [<li key={name}>{this.renderMarkup(text, markups)}</li>]
      case 4:
        return <ImageResource key={name} {...{ type, text, name, markups, metadata, mixtapeMetadata, iframe, layout }} />
      case 7:
        // return <blockquote key={name} dangerouslySetInnerHTML={{ __html: this.renderMarkup(text, markups) }} />
        return <blockquote key={name}>{this.renderMarkup(text, markups)}</blockquote>
      case 6:
        return <blockquote key={name}>{this.renderMarkup(text, markups)}</blockquote>
      
        // return <blockquote key={name} dangerouslySetInnerHTML={{ __html: this.renderMarkup(text, markups) }} />
        // return <blockquote key={name} dangerouslySetInnerHTML={{ __html: this.renderMarkup(text, markups) }} />
      default:
        return <div key={name}>{text}</div>

    }
  }


  renderPosts() {
    const { posts, loading, classes, postid } = this.props

    return <div className={classes.posts}>
      {posts
        .filter(e => e.uniqueSlug != postid)
        .splice(0, 6)
        .map((e, i) => <BlogItems key={i} {...e} classes={classes} />)}
    </div>
  }

  render() {
    const { classes, _, post, childref } = this.props
    const { loading, paragraphs = [], previewParagraphs = [], title, des, uniqueSlug, image } = post || {}
    console.log(post)
    return <div className={classes.root}>
      <div className={classes.markdown}>
        {((loading ? previewParagraphs : paragraphs) || [])
          .map(e => this.renderParagraph(e))
          .reduce((o, e) => {
            if (e instanceof Array && o[o.length - 1] instanceof Array) {
              o[o.length - 1].push(e)
            } else {
              o.push(e)
            }
            return o
          }, [])
          .map((e, i) => e instanceof Array ? <ul key={i}>{e}</ul> : e)
        }
        {loading && <CircularProgress className={classes.loadanimation} />}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {this.renderPosts()}
        <p ref={childref} />

      </div>
    </div>
  }
}


export default BlogPage

