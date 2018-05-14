import { hot } from 'react-hot-loader'
import React from 'react';
import { Provider as StateProvider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { get as getpath, isEqual } from 'lodash'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Themes from './theme'

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';



import { store, history } from './store'
import { LanguageProvider, withTranslate } from './components/Language'
import { EventProvider } from 'react-collections/EventHOC'
import HiddenLayout from './layouts/HiddenLayout'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import withSimpleConnect from 'react-collections/withSimpleConnect';
import LanguageEditRoot from './pages/testlang';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = document.getElementById('jss-insertion-point');


function getLang(pathname = '') {
  const first = pathname.split('/')[1]
  if (first == 'ko' || first == 'zh')
    return first
  return ''
}

@withSimpleConnect(({ app = {}, router: { location } }) => {
  const pathname = (location || {}).pathname || ''
  return {
    ...app,
    langname: getLang(pathname)
  }
})
class AppContainer extends React.Component {
  render() {
    const { langname, theme, children } = this.props
    return <LanguageProvider lang={langname || 'en'}>
      <MuiThemeProvider theme={Themes[theme] || Themes.normal}>
        <EventProvider>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <ConnectedRouter history={history}>
              {children}
            </ConnectedRouter>
          </JssProvider>
        </EventProvider>
      </MuiThemeProvider>
    </LanguageProvider>
  }
}

const HiddenLayoutWithLanguage = withTranslate(HiddenLayout)

function RootComponent(props) {
  console.log('[render] RootComponent')
  return (
    <StateProvider store={store}>
      <AppContainer store={store}>
        <React.Fragment>
          <Header />
          {props.children}
          <Footer />
          <HiddenLayoutWithLanguage />
          <LanguageEditRoot/>
        </React.Fragment>
      </AppContainer>
    </StateProvider>
  );
}


export default hot(module)(RootComponent);
