import React from 'react';
import ReactDOM from 'react-dom';
import Explosion from './explosion';
import Phone from './phone';
import Links from './links';
import StickyText from './sticky-text';
import Plx from 'react-collections/Plx';
import style from './docs.scss';

const titleData = [
  {
    start: 'self',
    startOffset: 50,
    duration: 200,
    properties: [
      {
        startValue: 1,
        endValue: -360,
        property: 'rotate',
      },
      {
        startValue: '#e34e47',
        endValue: '#995eb2',
        property: 'color',
      },
    ],
  },
];

class Example extends React.Component {

  render() {
    return (
      <div className='Demo'>
        <Links />
        <div className='Content'>
          <Plx
            tagName='h1'
            className='Examples'
            parallaxData={titleData}
          >
            Examples
          </Plx>
          <h3>Make things explode</h3>
          <Explosion />
          <h3>Animate nested elements</h3>
          <Phone />
          <div className='StickyText-trigger' />
          <StickyText />
        </div>

        <div className='Footer'>
          <div className='Content'>
            <h1>Plx</h1>
            <h2>React Parallax component</h2>
            <div>Awesome isn&#39;t it?</div>
            <div className='Footer-links'>
              <a href='https://stanko.github.io'>My blog</a>
              <a href='https://www.npmjs.com/package/react-plx'>npm</a>
              <a href='https://github.com/Stanko/react-plx'>GitHub</a>
            </div>
            <button onClick={() => this.handleScrollTop()}>Back to top</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Example

