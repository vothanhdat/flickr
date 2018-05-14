import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import AutoVideo from 'react-collections/AutoVideo'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Device from 'react-collections/utils/device'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import Link from 'react-collections/Link'
import blogStateConnect from '../../store/connects/blog'
import withInviewPort from 'react-collections/withInviewPort';
import withForm from 'react-collections/withForm';
import validateFun from '../../utils/validate.new';
import { popupWatingBox, popupMessageBox } from '../../components/Popup';

@withForm({
  email: validateFun.validateEmail()
})
class SignUpForm extends React.PureComponent {

  onSignUp = (e) => {
    e.preventDefault();
    this.props.validate();

    const data = new FormData()
    Object
      .entries(this.props.getCleanValues())
      .forEach(([key, value]) => data.append(key, value));

    popupWatingBox(
      fetch(
        'https://thanhdat.gifto.io/server/save-email.php',
        { method: 'POST', body: data }
      ).then(e => e.json()),
      T.please_wating,
      500,
    ).then(
      (e) => popupMessageBox({
        title: (e.status + '').replace(/^[a-z]/, e => e.toUpperCase()),
        message: e.message,
      })
    )
  }

  render() {
    const { formfield, formref, _, classes } = this.props
    const { error, helperText, ...rest } = formfield('email')
    return <form ref={formref} className={classes.form} onSubmit={this.onSignUp} encType="multipart/form-data">
      <input {...rest} className={classes.email} type="email" placeholder={_(T.contact_email)} />
      <Button variant="raised" color="primary" type="submit">{_(T.signup)}</Button>
      <br />
      <small className={classes.error}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{helperText || ''}</small>
    </form>
  }
}


@withTranslate
@blogStateConnect({ max: 3 })
@withInviewPort()
@withSCSS('../common.scss', './Section14_News.scss')
class Section14_News extends React.PureComponent {

  componentDidMount() {
    this.props.fetchNewPost()
  }

  componentDidUpdate(oldProps) {
    this.props.autoFetchMore(oldProps, this.props)
  }

  render() {
    const { classes, _, posts, loading, hasappred, childref } = this.props

    return <div className={classes.root} id='news' ref={childref} >
      <div className={classes.container}>
        <h2>{_(T.main_news)}</h2>
        <p style={{ textAlign: "right" }}>
          <Button color="primary" variant="raised" component={Link} to='/blog'>View all</Button>
        </p>
        {/* <Paper className={classes.paper} elevation={20}> */}
        <div className={classes.news}>
          {posts.map((e, i) => <div className={classes.newitem} key={i}>
            <ButtonBase to={`/blog/${e.uniqueSlug}`} component={Link} className={classes.img} style={hasappred ? { backgroundImage: `url(${e.thumb})` } : {}} />
            <h4 className={classes.title}>{e.title}</h4>
            <p className={classes.content}><small>{e.des}</small></p>
            <Button className={classes.blackbut} variant="raised" component={Link} to={`/blog/${e.uniqueSlug}`} >{_(T.read)}</Button>
          </div>)}
          {loading && <CircularProgress className={classes.loadanimation} />}
        </div>
        <div className={classes.newslester}>
          <div className={classes.text}>
            <div className={classes.big}>{_(T.gifto_newslester)}</div>
            <div className={classes.des}>{_(T.main_news_join)}</div>
          </div>
          <SignUpForm _={_} classes={classes} />
        </div>
      </div>
    </div>
  }
}



export default Section14_News

