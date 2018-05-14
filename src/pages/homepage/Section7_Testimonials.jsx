import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T, dynamicCombine } from '../../components/Language'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'
import { memoize } from 'lodash';
import Slider from 'react-collections/Slider';
// import Slider from '../../components/Slider';


const avatarLinks = {
  jason: "/images/home_testimo/jason_zhao.jpg",
  joe: "/images/home_testimo/joe-lonsdale.jpg",
  justin: "/images/home_testimo/justin_waldron.jpg",
  fritz: "/images/home_testimo/fritz_demopoulos.jpg",
}

const parseTestimonials = memoize(
  function (string) {
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
        avatar: avatarLinks[k],
        content : dynamicCombine(e.content),
      }))
  }
)


const QuoteItem = ({ classes, author = '', content, avatar }) => {
  var [athor_name,...authorpos] = author.split(',')
  return <div className={classes.quote}>
    <img className={classes.avatar} src={avatar} alt={author} />
    <div className={classes.content}>
      <div className={classes.quotetext}>
        <p />
        {content('b')}
      </div>
      <div className={classes.quoteauthor}>
        <p/>
        <div className={classes.name}>{athor_name}</div>
        {authorpos.join(',')}
      </div>
    </div>
  </div>
}

const CustomSlide = withSCSS('./Section7_Testimonials.slide.scss')(Slider)



@withTranslate
@withSCSS('../common.scss', './Section7_Testimonials.scss')
class Section7_Testimonials extends React.PureComponent {
  render() {
    const { classes, _ } = this.props
    const QUOTES = parseTestimonials(_(T.testimonials_detail))

    return <div className={classes.root} id='testimonials'>
      <div className={classes.container}>
        <h2>{_(T.testimonials_title)}</h2>
        <CustomSlide circle className={classes.slide}>
          {QUOTES.map((e, i) => <QuoteItem {...e} key={i} classes={classes} />)}
        </CustomSlide>
        <br />
      </div>
    </div>
  }
}



export default Section7_Testimonials

