import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import TermsPage from '../pages/terms'
import PrivacyPage from '../pages/privacy'
import BlogPage from '../pages/medium/blog'
import BlogPost from '../pages/medium/post'
import TestForm from '../pages/test/testform'
import TestStreams from '../pages/uplive/hot'
import TestStreamsTags from '../pages/uplive/hotTags'
import Paralax from '../pages/paralax/doc'
import Flickr from '../pages/flickr'
import FlickrPhoto from '../pages/flickr/photo'
import Live from '../pages/uplive/live'
import { withTranslate } from '../components/Language';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import withSCSS from 'withsass.macro';




const RouteIndex = withTranslate(
  ({ language: { name: langname }, location }) => {
    const prefix = langname == 'en' ? '/' : '/' + langname + '/'
    return <React.Fragment>

      <Route exact path={prefix + ''} component={TestStreams} />
      <Route exact path={prefix + 'hot'} component={TestStreams} />
      <Route exact path={prefix + 'live/:uid'} component={Live} />
      <Route exact path={prefix + 'live/:uid/:roomid'} component={Live} />
      <Route exact path={prefix + 'hot/:tags'} component={TestStreamsTags} />

      <Route exact path={prefix + "termsofuse/"} component={TermsPage} />
      <Route exact path={prefix + "privacypolicy/"} component={PrivacyPage} />
      <Route exact path={prefix + "blog/"} component={BlogPage} />
      <Route exact path={prefix + "blog/:postid/"} component={BlogPost} />
      <Route exact path={prefix + 'testform'} component={TestForm} />
      <Route exact path={prefix + 'paralax'} component={Paralax} />
      {/* <Switch location={location}>
      </Switch> */}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={{ enter: 300, exit: 300 }}>
          <Switch location={location}>
            <Route exact path={prefix + 'flickr'} component={Flickr} />
            <Route exact path={prefix + 'flickr/p/:photoid'} component={FlickrPhoto} />
            <Route exact path={prefix + 'flickr/u/:userid'} component={FlickrPhoto} />
          </Switch>
         </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  }
)

export default hot(module)(withRouter(withSCSS('./index.scss')(RouteIndex)));
// export default (RouteIndex);

