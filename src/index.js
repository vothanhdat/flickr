import React from 'react';
import ReactDOM from 'react-dom';
import RouteIndex from './routes/index';
import RootComponent from './RootComponent';
import Device from './utils/device'



function render() {

  ReactDOM.render(
      <RootComponent>
        <RouteIndex />
      </RootComponent>
    ,
    document.querySelector('#app')
  );
}

render();


if (module.hot) {
  module.hot.accept(['./routes/index', './RootComponent'], render)
}




if (Device.isSPA) {

  setTimeout(() => {

    [...document.head.querySelectorAll('link[href^="/style"][rel="stylesheet"]')].forEach(async stylesheet => {
      try {
        var css = await fetch(stylesheet.href).then(e => e.text());
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
  
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
  
        head.appendChild(style);
        stylesheet.parentElement.removeChild(stylesheet);
        console.log('DONE')
      } catch (error) {
        console.log(error)
      }

    })
  })

}

//Register Service worker
if (process.env.NODE_ENV === 'production' && true) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }

}