import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withTranslate, T, registerLang, LangData } from '../components/Language'
import withSCSS from 'withsass.macro';
import withForm from 'react-collections/withForm';
import ImagePreview from 'react-collections/ImagePreview';
import FileField from 'react-collections/FileField'
import withSuperForm from 'react-collections/withSuperForm'
import SelectField from 'react-collections/SelectField'
import { Grid, Button, Tooltip, IconButton, TextField } from 'material-ui'
import device from '../utils/device'
import ValidateFunction from '../utils/validate.new'
import { mapValues, omit, fromPairs, isEqual } from 'lodash'
import { memoize, bind, debounce } from 'lodash-decorators';
import { withEvent } from 'react-collections/EventHOC';
import Drawer from 'material-ui/Drawer';


function getTextHeight(text = '', cols = 40) {
  return (text || '')
    .split('\n')
    .map(e => (e.length / 40 | 0) + 1)
    .reduce((e, f) => e + f, 0)
}

class LightFormInput extends React.PureComponent {
  state = { enable: true, markedName: '' }
  componentDidMount() {
    this._sub = this.props.regSearch(this.onSearch)
  }

  componentWillUnmount() {
    this._sub();
  }


  @bind()
  onSearch(searchArray = [], replaceRegex) {
    var text = (this.props.name + ' ' + this.props.value).toLocaleLowerCase();
    var enable = searchArray.every(e => text.includes(e))
    var markedName = this.props.name.replace(replaceRegex, e => `<mark>${e}</mark>`)
    if (enable != this.state.enable || markedName != this.state.markedName) {
      this.setState({ enable, markedName })
      return true;
    }
    return false;
  }


  render() {
    const { name = '', value, onChange, onBlur, error, helpText } = this.props
    const { enable, markedName, markedContent } = this.state
    return <div style={{ display: enable ? '' : 'none', position: "relative" }} data-searchitem>
      <div dangerouslySetInnerHTML={{ __html: markedName || name }} />
      <textarea cols={40} style={{
        height: `${1.3 * getTextHeight(value) + 0.5}em`,
        lineHeight: "1.3em",
        overflow: 'hidden',
      }} value={value} onChange={onChange} />
    </div>
  }
}

@withForm()
@withSuperForm
class LanguageEditor extends React.PureComponent {
  render() {
    const { classes, formfield, formref, formgetter, submit, data, values, _, Field, Obser, regSearch } = this.props
    return <div style={{ maxHeight: "calc(100vh - 2em)", overflowY: "auto" }}>
      {
        Object.keys(T).map((e, i) => <Field subs={e} Com={LightFormInput} {...formfield(e)} regSearch={regSearch} />)
      }
    </div>
  }
}

@withEvent
@withTranslate
@withSCSS('./common.scss')
class LanguageEditRoot extends React.Component {
  state = { enable: false, search: "" }
  searchCallbacks = []
  privateClassName = "_private" + (Math.random() * 10000 | 0)

  @bind()
  onToggle() {
    console.log('onToggle')
    this.setState({ enable: !this.state.enable });
  }

  @bind()
  onChange(data) {
    const { language: { name, _forceUpdateLanguage } } = this.props
    Object.assign(LangData[name] || {}, data);
    registerLang(name, data);
    _forceUpdateLanguage();
  }

  componentDidMount() {
    this.props.addEventListener('editlang', this.onToggle)
  }

  componentWillUnmount() {
    this.props.removeEventListener('editlang', this.onToggle)
  }

  @bind()
  registerAsyncSearch(callback) {
    this.searchCallbacks.push(callback)
    return () => {
      this.searchCallbacks = this.searchCallbacks.filter(e => e != callback)
    }
  }

  @debounce(50)
  async onSearchChange() {

    const { search } = this.state
    const searchArray = search.toLowerCase().split(' ').filter(e => e);
    const replaceRegex = new RegExp(`(${searchArray.join('|')})`, 'gi')

    let count = 0, perudpate = 10;
    console.time('Search')
    for (var i in this.searchCallbacks) {
      var e = this.searchCallbacks[i]
      if (search != this.state.search) {
        console.timeEnd('Search')
        console.log('Break')
        return;
      }
      if (e(searchArray, replaceRegex)) {
        count++;
      }
      if (count > perudpate) {
        await new Promise(requestAnimationFrame);
        this.processStyle(i);
        count = 0;
      }
    }
    this.processStyle(i);
    console.timeEnd('Search')
  }

  processStyle(count) {
    if (this.styleE)
      this.styleE.innerHTML = `
        .${this.privateClassName} [data-searchitem]:nth-child(n + ${count}) {display:none;}
      `
  }

  @bind()
  onSearch({ target: { value } }) {
    this.setState({ search: value })
    this.onSearchChange();
  }

  styleRef = e => this.styleE = e

  render() {
    const { privateClassName } = this
    const { language: { name } } = this.props
    const { classes } = this.props
    return <Drawer anchor="right" open={this.state.enable} onClose={this.onToggle} className={privateClassName}>
      <input value={this.state.search} onChange={this.onSearch} />
      <style ref={this.styleRef} />
      <LanguageEditor {...this.props} data={LangData[name] || {}} onChange={this.onChange} regSearch={this.registerAsyncSearch} />
    </Drawer>
  }
}

export default LanguageEditRoot;
