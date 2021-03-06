import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import TermsPage from '../pages/terms'
import PrivacyPage from '../pages/privacy'
import BlogPage from '../pages/blog'
import BlogPost from '../pages/post'
import TestForm from '../pages/testform'
import TestStreams from '../pages/hot'
import TestStreamsTags from '../pages/hotTags'
import Paralax from '../pages/paralax/doc'
import Live from '../pages/live'
import { withTranslate } from '../components/Language';





const RouteIndex = withTranslate(
    ({ language: { name: langname } }) => {
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
        </React.Fragment>
    }
)

export default hot(module)(RouteIndex);
// export default (RouteIndex);

