import React from 'react'
import withSCSS from 'withsass.macro';



@withSCSS('./HLSPLayer.scss')
export default class FLVPLayer extends React.Component {
  Flv = null;
  flv = null;
  async componentDidMount() {
    var Flv = this.Flv = await import('flv.js')
      .then(e => e.default)

    var video = this.video

    if (Flv.isSupported()) {
      var flash = this.flv = new Flv.createPlayer({
        type: 'flv',
        url: this.props.src
      });
      flash.attachMediaElement(video);
      flash.load();
      flash.play();
    }
  }

  async componentDidUpdate({ src }) {
    if(this.flv && this.video)
      this.flv.destroy();
      var Flv = this.Flv = await import('flv.js')
      .then(e => e.default)

    var video = this.video

    if (Flv.isSupported()) {
      var flash = this.flv = new Flv.createPlayer({
        type: 'flv',
        url: this.props.src
      });
      flash.attachMediaElement(video);
      flash.load();
      flash.play();
    }
  }
  initVideo() {

  }
  ref = (e) => this.video = e

  render() {
    const { classes, poster = '' } = this.props
    return <video ref={this.ref} className={classes.video} style={{ backgroundImage: `url(${poster})` }}>

    </video>
  }
}