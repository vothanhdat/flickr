import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import AutoVideo from 'react-collections/AutoVideo'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { debounce, memoize } from "lodash-decorators"
import { memoize as memoizeDec } from "lodash"
import classNames from 'classnames'
import HiddenLayout from '../../layouts/HiddenLayout'
import ContactForm from '../../components/ContactForm'
import withDebounceProps from 'react-collections/withDebounceProps';


const parseFAQs = memoizeDec(
  function (text) {
    return text.split('|')
      .map(e => e.split('^'))
      .filter(e => e && e[0] && e[1])
      .map(e => ({
        question: e[0],
        answer: e[1],
      }))
  }
)


@withDebounceProps(50)
class FAQListReact extends React.PureComponent {


  // @memoize()
  getTextArray(text, languageName) {
    var textArr = text
      .toLowerCase()
      .split(languageName == 'zh' ? '' : " ")
      .filter(e => e)

    if (languageName == 'zh') {
      textArr = textArr.reduce((o, e) => {
        var length1 = o.length - 1
        if (length1 > 1 && /^[A-Za-z0-9]$/.test(e) && /^[A-Za-z0-9]+$/.test(o[length1]))
          o[length1] += e;
        else
          o.push(e.trim());
        return o
      }, []).filter(e => e)
      console.log(textArr)
    }
    return textArr;
  }

  // @memoize()
  getResults(list, textArr, max = 4) {

    if (textArr.length == 0) {
      return list.slice(0, max)
    }

    var result = []
    var replaceRegex = new RegExp(`(${textArr.join('|')})`, 'gi')

    for (var { answer, question } of list) {
      if(list >= max)
        break;
      if (textArr.every(e => answer.toLowerCase().indexOf(e) > -1 || question.toLowerCase().indexOf(e) > -1)) {
        result.push({
          answer: answer.replace(replaceRegex, e => `<mark>${e}</mark>`),
          question: question.replace(replaceRegex, e => `<mark>${e}</mark>`),
        })
      }
    }
    return result;
  }


  render() {
    const { classes, filterText, _, expand } = this.props

    const result = this.getResults(
      parseFAQs(_(T.faq_detail)),
      this.getTextArray(filterText,this.props.language.name),
      expand ? Infinity : 4,
    )

    return <div>  {
      result.map(
        ({ answer, question }, i) => <div key={i} className={classes.item}>
          {/* <div className={classes.Q}>Q</div>
          <div className={classes.plus} onClick={this.onClickToggle}></div> */}
          <h4 className={classes.question} tabIndex="-1" dangerouslySetInnerHTML={{ __html: question.trim() }} onClick={this.onClickExpand} />
          <p className={classes.anwser} tabIndex="-1" dangerouslySetInnerHTML={{ __html: answer.trim() }} />
        </div>
      )
    } </div>
  }
};

@withTranslate
@withSCSS('../common.scss', './Section10_FAQ.scss')
class FAQSection extends React.PureComponent {

  state = { text: "", expand: false }

  onInput = (event) => {
    this.setState({ text: event.target.value })
  }

  onContact = () => {
    try {
      const { submitpromise } = HiddenLayout.addPopup(ContactForm, 'contactus');
    } catch (error) {
      console.error(error)
    }
  }

  onClickExpand = () => {
    this.setState({ expand: true })
  }

  render() {
    const { classes, _, language } = this.props
    const { expand } = this.state
    return <div id="faq-section" className={classes.root}>
      <div className={classes.container}>
        <h2>{_(T.faq_title)}</h2>
        <div style={{ textAlign: "right" }}>
          <TextField value={this.state.text} onChange={this.onInput} placeholder={_(T.faq_search)}  /*inputClassName={classes.search}*/ />
          <i className="material-icons" style={{ fontSize: "2em", verticalAlign: "bottom" }}>search</i>
        </div>
        <FAQListReact expand={expand} classes={classes} filterText={this.state.text} _={_} language={language} />
        <p>
          {!expand && <Button variant="raised" color="primary" style={{backgroundColor:"#444"}} fullWidth onClick={this.onClickExpand}>
            {_(T.view_more)}
            <i className="material-icons">keyboard_arrow_down</i>
          </Button>}
        </p>
        <p className={classes.more}>
          {_(T.main_morequestion)}
          &nbsp;
          <Button variant="raised" color="primary" onClick={this.onContact}>{_(T.contact_title)}</Button>
        </p>
      </div>
    </div>
  }
}


export default FAQSection


